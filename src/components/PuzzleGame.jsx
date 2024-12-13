import React, { useEffect, useState, useRef } from "react";
import "../styles/PuzzleGame.css";
import useAuthStore from "../store/use-auth-store"; // Asegúrate de tener el store de autenticación
import usePuzzleStore from "../store/use-puzzle-store"; // Asegúrate de tener el store del puzzle

const PuzzleGame = ({ imagePieces, rows, cols, onPuzzleComplete }) => {
    const [shuffledPieces, setShuffledPieces] = useState([]);
    const pieceBoxRef = useRef(null);

    const { user } = useAuthStore(); // Obtener usuario del store de autenticación
    const { updateUserScore, score } = usePuzzleStore(); // Obtener funciones del store del puzzle

    useEffect(() => {
        // Generar piezas aleatorias similar al método sortPieces()
        const generateRandomPieces = () => {
            const pieces = imagePieces.map((image, index) => ({
                id: `Piece${index + 1}`,
                image,
                alt: index + 1,
                'data-index': index,
            }));
            return pieces.sort(() => Math.random() - 0.5);
        };

        setShuffledPieces(generateRandomPieces());
    }, [imagePieces]);

    const handleDragStart = (e, piece) => {
        e.dataTransfer.clearData();
        e.dataTransfer.setData("text/plain", piece.id);
        e.target.style.opacity = "0.5";
    };

    const handleDragEnd = (e) => {
        e.target.style.opacity = "1";
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetPiece) => {
        e.preventDefault();
        const sourceId = e.dataTransfer.getData("text/plain");

        setShuffledPieces(prevPieces => {
            const newPieces = [...prevPieces];
            const sourceIndex = newPieces.findIndex(p => p.id === sourceId);
            const targetIndex = newPieces.findIndex(p => p.id === targetPiece.id);

            // Intercambiar piezas
            [newPieces[sourceIndex], newPieces[targetIndex]] = [newPieces[targetIndex], newPieces[sourceIndex]];

            // Comprobar si el puzzle está completo
            checkPuzzleCompletion(newPieces);

            return newPieces;
        });
    };

    const checkPuzzleCompletion = (pieces) => {
        const isComplete = pieces.every((piece, index) =>
            parseInt(piece.alt) === index + 1
        );

        if (isComplete) {
            makeAnimationPieces();
            onPuzzleComplete(true);

            // Actualizar la puntuación del usuario
            if (user) {
                updateUserScore(10); // Por ejemplo, añade 10 puntos por completar el puzzle
            }
        }
    };

    const makeAnimationPieces = () => {
        const piecesElements = pieceBoxRef.current.querySelectorAll(".grid-piece");

        piecesElements.forEach((piece, index) => {
            setTimeout(() => {
                piece.style.animation = "2s ease-in-out forwards upPiece";
            }, 100 * index);
        });

        setTimeout(() => {
            resetGame();
        }, 3100);
    };

    const resetGame = () => {
        setShuffledPieces(prevPieces => {
            const newPieces = prevPieces.map(piece => ({
                ...piece,
                id: `Piece${Math.floor(Math.random() * 9999) + 1}`
            }));
            return newPieces;
        });
    };

    return (
        <div
            ref={pieceBoxRef}
            className="puzzle-container"
            style={{
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
        >
            {shuffledPieces.map((piece) => (
                <div
                    key={piece.id}
                    id={piece.id}
                    className="grid-piece"
                    draggable
                    onDragStart={(e) => handleDragStart(e, piece)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, piece)}
                >
                    <img
                        src={piece.image}
                        alt={piece.alt}
                    />
                </div>
            ))}
        </div>
    );
};

export default PuzzleGame;
