import React, { useEffect, useState } from "react";
import "../styles/PuzzleGame.css";

const PuzzleGame = ({ imagePieces, rows, cols, onPuzzleComplete }) => {
    const [shuffledPieces, setShuffledPieces] = useState([]);

    useEffect(() => {
        // Barajar las piezas al inicio
        const shuffled = [...imagePieces].sort(() => Math.random() - 0.5);
        setShuffledPieces(shuffled);
    }, [imagePieces]);

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData("pieceIndex", index);
    };

    const handleDrop = (e, targetIndex) => {
        const sourceIndex = e.dataTransfer.getData("pieceIndex");

        if (sourceIndex !== undefined && sourceIndex !== targetIndex) {
            const newPieces = [...shuffledPieces];
            [newPieces[sourceIndex], newPieces[targetIndex]] = [newPieces[targetIndex], newPieces[sourceIndex]];
            setShuffledPieces(newPieces);

            // Verificar si el puzzle está completo
            if (newPieces.every((piece, idx) => piece === imagePieces[idx])) {
                onPuzzleComplete(true);
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Permitir soltar la pieza
    };

    return (
        <div
            className="puzzle-container"
            style={{
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
        >
            {shuffledPieces.map((piece, index) => (
                <div
                    key={index}
                    className="puzzle-slot"
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                >
                    <img src={piece} alt={`piece-${index}`} />
                </div>
            ))}
        </div>
    );
};

export default PuzzleGame;