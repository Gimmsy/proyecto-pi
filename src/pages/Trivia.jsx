import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import Staging from "../components/Staging";
import Sidebar from "../components/Slidebar";
import useAuthStore from "../store/use-auth-store";
import ImageDivider from "../components/ImageDivider";
import "../styles/Trivia.css"; // Opcional: para estilos

const CombinedGame = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        // Redirigir a login si no hay usuario
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const [currentLevel, setCurrentLevel] = useState(1); // Nivel actual (1: preguntas, 2: puzzle)
    const [concepts] = useState([
        { id: 3, text: "Conservación del Agua", matched: false },
        { id: 1, text: "Desperdicio de Agua", matched: false },
        { id: 2, text: "Contaminación del Agua", matched: false },
    ]);

    const [definitions] = useState([
        { id: 2, text: "El agua se ensucia por cosas como basura, productos químicos o desechos que la gente tira." },
        { id: 1, text: "Usar más agua de la que realmente necesitamos, como dejar el grifo abierto o malgastar agua en riego." },        
        { id: 3, text: "Usar el agua de manera más responsable para no desperdiciarla y asegurarse de que siempre haya suficiente." },
    ]);

    const [matches, setMatches] = useState([]); // Emparejamientos correctos

    const handleDrop = (conceptId, definitionId) => {
        if (conceptId === definitionId) {
            setMatches((prev) => [...prev, conceptId]);
        }
    };

    const isMatched = (id) => matches.includes(id);

    // Si no hay usuario, no renderizar nada
    if (!user) return null;

    return (
        <>
            <Sidebar />
            <Sidebar />
            <div className="w-screen h-screen bg-gray-100">
                {currentLevel === 1 && (
                    <div className="game-container h-full flex flex-col items-center justify-center">
                        <div className="challenge-message">
                            ¡Desafía tus conocimientos!
                        </div>
                        <h1>Relaciona los conceptos con sus definiciones</h1>

                        <div className="concepts-and-definitions">
                            {/* Contenedor de conceptos */}
                            <div className="concepts">
                                <h2>Conceptos</h2>
                                {concepts.map((concept) => (
                                    <div
                                        key={concept.id}
                                        className={`concept ${isMatched(concept.id) ? "matched" : ""}`}
                                        draggable={!isMatched(concept.id)}
                                        onDragStart={(e) => e.dataTransfer.setData("conceptId", concept.id)}
                                    >
                                        {concept.text}
                                    </div>
                                ))}
                            </div>

                            {/* Contenedor de definiciones */}
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
                            <div className="success-message">
                                ¡Bien hecho! ¡Has coincidido con todos los conceptos!
                                <button
                                    className="mt-4 p-2 bg-blue-500 text-white rounded"
                                    onClick={() => setCurrentLevel(2)}
                                >
                                    Go to Puzzle
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {currentLevel === 2 && (
                    <div className="canvas-3d-container w-full h-full relative">
                        <div className="challenge-message">
                            ¡Desafía tus conocimientos!
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <ImageDivider
                                imageUrl="/assets/image/puzzle.jpg"
                                rows={3}
                                cols={3}
                                difficulty="medium"
                            />
                        </div>
                        <Loader />
                    </div>
                )}
            </div>
        </>
    );
};

export default CombinedGame;
