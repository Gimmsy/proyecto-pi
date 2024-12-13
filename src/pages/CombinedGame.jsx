import React, { useEffect, useState, useCallback } from "react";
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

    // Estados
    const [puzzleCompleted, setPuzzleCompleted] = useState(false);
    const [conceptsMatched, setConceptsMatched] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [conceptMatchScore, setConceptMatchScore] = useState(0);  // Puntaje por coincidencias
    const [totalScore, setTotalScore] = useState(0); // Puntaje total
    const [matches, setMatches] = useState([]); // Coincidencias
    const [showModal, setShowModal] = useState(false);

    const { score: puzzleScore, resetPuzzle } = usePuzzleStore();

    // Conceptos y definiciones
    const [concepts] = useState([
        { id: 3, text: "Conservación del Agua", matched: false },
        { id: 1, text: "Desperdicio de Agua", matched: false },
        { id: 2, text: "Contaminación del Agua", matched: false },
    ]);

    const [definitions] = useState([
        { id: 2, text: "El agua se ensucia por cosas como basura, productos químicos o desechos que la gente tira." },
        { id: 1, text: "Usar más agua de la que realmente necesitamos." },
        { id: 3, text: "Usar el agua de manera más responsable." },
    ]);

    const handleDrop = (conceptId, definitionId) => {
        if (conceptId === definitionId) {
            setMatches((prev) => [...prev, conceptId]);
            setConceptMatchScore((prevScore) => {
                const newScore = Math.round((matches.length + 1) * (100 / concepts.length));  // Calcula el puntaje dinámicamente
                console.log("Nuevo puntaje de coincidencias:", newScore); // Log para ver cómo se calcula
                return newScore;
            });
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

    // Efecto para verificar coincidencias
    useEffect(() => {
        if (matches.length === concepts.length) {
            setConceptsMatched(true);
        }
    }, [matches]);

    // Manejo de la finalización del juego
    const handleGameCompletion = useCallback(() => {
        if (puzzleCompleted && conceptsMatched) {
            console.log("Puzzle Score:", puzzleScore);
            console.log("Concept Match Score:", conceptMatchScore);
            const finalScore = Math.round(conceptMatchScore + puzzleScore);
            console.log("Final Score:", finalScore);
            setTotalScore(finalScore);
            resetPuzzle();
            setConceptMatchScore(0);
            setMatches([]);
            setPuzzleCompleted(false);
            setConceptsMatched(false);
            setShowModal(true);
            useAuthStore.getState().updateUserProgress(finalScore);
        }
    }, [puzzleCompleted, conceptsMatched, puzzleScore, conceptMatchScore, resetPuzzle]);

    // Efecto para manejar la finalización del juego
    useEffect(() => {
        handleGameCompletion();
    }, [handleGameCompletion]);

    // Efecto para reiniciar estados al cerrar el modal
    useEffect(() => {
        if (!showModal) {
            setPuzzleCompleted(false);
            setConceptsMatched(false);
            setCurrentLevel(1);
            setConceptMatchScore(0);
            setMatches([]);
            resetPuzzle();
        }
    }, [showModal, resetPuzzle]);

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
                                    onClick={() => setCurrentLevel(2)} // Aquí se pasa al puzzle
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
