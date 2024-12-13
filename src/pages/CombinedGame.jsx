import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "@react-three/drei";
import Sidebar from "../components/Slidebar";
import useAuthStore from "../store/use-auth-store";
import "../styles/CombinedGame.css";
import PuzzleGame from "../components/PuzzleGame";
import GameCompletionModal from "../components/GameCompletionModal";
import usePuzzleStore from "../store/use-puzzle-store";

const CombinedGame = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const [puzzleCompleted, setPuzzleCompleted] = useState(false);
    const [conceptsMatched, setConceptsMatched] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [conceptMatchScore, setConceptMatchScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0); // Nuevo estado para totalScore
    const [matches, setMatches] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const { score: puzzleScore, resetPuzzleScore } = usePuzzleStore();

    const [concepts] = useState([
        { id: 3, text: "Conservación del Agua", matched: false },
        { id: 1, text: "Desperdicio de Agua", matched: false },
        { id: 2, text: "Contaminación del Agua", matched: false },
    ]);

    const [definitions] = useState([
        {
            id: 2,
            text: "El agua se ensucia por cosas como basura, productos químicos o desechos que la gente tira.",
        },
        {
            id: 1,
            text: "Usar más agua de la que realmente necesitamos, como dejar el grifo abierto o malgastar agua en riego.",
        },
        {
            id: 3,
            text: "Usar el agua de manera más responsable para no desperdiciarla y asegurarse de que siempre haya suficiente.",
        },
    ]);

    const handleDrop = (conceptId, definitionId) => {
        if (conceptId === definitionId) {
            setMatches((prev) => [...prev, conceptId]);
            setConceptMatchScore((prevScore) => prevScore + 16.67); // Incrementar el puntaje por coincidencia
        }
    };

    const isMatched = (id) => matches.includes(id);

    const imagePieces = () => [
        "/assets/image/piece-0.jpg",
        "/assets/image/piece-1.jpg",
        "/assets/image/piece-2.jpg",
        "/assets/image/piece-3.jpg",
        "/assets/image/piece-4.jpg",
        "/assets/image/piece-5.jpg",
        "/assets/image/piece-6.jpg",
        "/assets/image/piece-7.jpg",
        "/assets/image/piece-8.jpg",
    ];

    // Comprobación de coincidencias completas
    useEffect(() => {
        if (matches.length === concepts.length) {
            setConceptsMatched(true);
        }
    }, [matches]);

    const handleGameCompletion = () => {
        if (puzzleCompleted && conceptsMatched) {
            const finalScore = Math.round(conceptMatchScore + puzzleScore);
            setTotalScore(finalScore); // Actualizar el puntaje total

            // Reiniciar el puntaje del puzzle
            resetPuzzleScore();
            setConceptMatchScore(0); // Reiniciar el puntaje de coincidencia
            setMatches([]); // Limpiar las coincidencias
            setPuzzleCompleted(false); // Reiniciar el estado de juego
            setConceptsMatched(false); // Reiniciar la coincidencia de conceptos

            // Mostrar el modal con la recompensa
            setShowModal(true);

            // Actualizar el puntaje del usuario en el estado global
            useAuthStore.getState().updateUserScore(finalScore);
        }
    };

    useEffect(() => {
        handleGameCompletion();
    }, [conceptsMatched, puzzleCompleted]);

    if (!user) return null;

    return (
        <>
            <Sidebar />
            <div className="w-screen h-screen bg-gray-100">
                {currentLevel === 1 && (
                    <div className="game-container h-full flex flex-col items-center justify-center">
                        <div className="challenge-message">¡Desafía tus conocimientos!</div>
                        <h1>Relaciona los conceptos con sus definiciones</h1>

                        <div className="concepts-and-definitions">
                            <div className="concepts">
                                <h2>Conceptos</h2>
                                {concepts.map((concept) => (
                                    <div
                                        key={concept.id}
                                        className={`concept ${isMatched(concept.id) ? "matched" : ""}`}
                                        draggable={!isMatched(concept.id)}
                                        onDragStart={(e) => e.dataTransfer.setData("conceptId", concept.id.toString())}
                                    >
                                        {concept.text}
                                    </div>
                                ))}
                            </div>

                            <div className="definitions">
                                <h2>Definiciones</h2>
                                {definitions.map((definition) => (
                                    <div
                                        key={definition.id}
                                        className={`definition ${isMatched(definition.id) ? "matched" : ""}`}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => {
                                            const conceptId = parseInt(e.dataTransfer.getData("conceptId"), 10);
                                            handleDrop(conceptId, definition.id);
                                        }}
                                    >
                                        {definition.text}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {matches.length === concepts.length && (
                            <div className="success-message mb-20">
                                ¡Has coincidido con todos los conceptos!
                                <button
                                    className="mt-4 ml-2 p-2 bg-blue-500 text-white rounded"
                                    onClick={() => setCurrentLevel(2)}
                                >
                                    Ir al Puzzle
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {currentLevel === 2 && (
                    <div className="canvas-3d-container w-full h-full relative">
                        <div className="challenge-message-2">¡Desafía tus conocimientos!</div>
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <PuzzleGame
                                imagePieces={imagePieces()}
                                rows={3}
                                cols={3}
                                correctOrder={[0, 3, 6, 1, 4, 7, 2, 5, 8]}
                                onPuzzleComplete={(isComplete) => {
                                    setPuzzleCompleted(isComplete);
                                }}
                            />
                        </div>
                        <Loader />
                    </div>
                )}
            </div>

            {showModal && (
                <GameCompletionModal
                    score={totalScore}
                    onClose={() => {
                        setShowModal(false);
                        navigate("/home");
                    }}
                />
            )}
        </>
    );
};

export default CombinedGame;
