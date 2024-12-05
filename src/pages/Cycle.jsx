import { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Html } from "@react-three/drei";
import { Physics, useBox, useSphere } from '@react-three/cannon';

import Sliderbar from "../components/Slidebar";
import WaterCycle from "../components/shortageWater/WaterCycle";
import CycleText from "../components/shortageWater/CycleText";
import Video from "../components/shortageWater/VideoWater"

const RainDrop = ({ position, onCollision, removeDrop, color }) => {
    const [ref] = useSphere(() => ({
        mass: 0.1,
        position,
        args: [0.05], // tamaño de la esfera
    }));

    const handleCollision = (e) => {
        if (e.contact && e.contact.body) {
            onCollision(position); // Llamar a la función de colisión
            removeDrop(); // Eliminar la gota de lluvia cuando toca el suelo
        }
    };

    useEffect(() => {
        const currentRef = ref.current;
        currentRef.addEventListener('collide', handleCollision);
        return () => {
            currentRef.removeEventListener('collide', handleCollision);
        };
    }, [position]);

    return (
        <mesh ref={ref} castShadow receiveShadow>
            <sphereGeometry args={[0.05, 32, 32]} />
            <meshStandardMaterial
                color={color} // Usar el color pasado como prop
                transparent={true}
                opacity={0.7}
            />
        </mesh>
    );
};

const Ground = () => {
    const [ref] = useBox(() => ({
        args: [200, 1, 200], // el tamaño del suelo
        position: [0, 0, 0],
        receiveShadow: true,
    }));

    return (
        <mesh ref={ref} receiveShadow>
            <boxGeometry args={[100, 1, 100]} />
            <meshStandardMaterial color={0x000000} transparent={true} opacity={0} />
        </mesh>
    );
};

const Rain = ({ rainColor }) => {
    const [rainDrops, setRainDrops] = useState([]);
    const [fragments, setFragments] = useState([]);

    useEffect(() => {
        const dropInterval = setInterval(() => {
            // Cada 100ms, genera una nueva gota de lluvia
            setRainDrops((prev) => [
                ...prev,
                [Math.random() * 2 - 1, 5, Math.random() * 2 - 1], // randomize the position
            ]);
        }, 100);

        return () => clearInterval(dropInterval); // Limpiar interval cuando el componente se desmonte
    }, []);

    const handleCollision = (position) => {
        // Crear pequeñas partículas al colisionar
        const newFragments = [];
        for (let i = 0; i < 10; i++) {
            const fragmentPosition = [
                position[0] + (Math.random() - 0.5) * 0.1, // pequeñas variaciones
                position[1] - 0.1, // ajustamos la posición para que se vea disperso
                position[2] + (Math.random() - 0.5) * 0.1,
            ];
            newFragments.push(fragmentPosition);
        }
        setFragments((prev) => [...prev, ...newFragments]);
    };

    const removeDrop = () => {
        // Eliminar la gota después de colisionar
        setRainDrops((prev) => prev.slice(1)); // Eliminamos la primera gota (la más antigua)
    };

    return (
        <>
            {rainDrops.map((position, index) => (
                <RainDrop
                    scale={[0.1, 0.1, 0.1]}
                    key={index}
                    position={position}
                    onCollision={handleCollision}
                    removeDrop={removeDrop} // Pasar función de eliminación
                    color={rainColor} // Pasar el color de la lluvia
                />
            ))}
            {fragments.map((position, index) => (
                <mesh key={index} position={position} castShadow receiveShadow>
                    <sphereGeometry args={[0.01, 8, 8]} />
                    <meshStandardMaterial color="#CC6CE7" />
                </mesh>
            ))}
        </>
    );
};


const Cycle = () => {
    const [rainColor, setRainColor] = useState("#87CEEB");

    return (
        <>
            <Sliderbar />

            <div className="home-container flex flex-col h-screen w-full" style={{ height: "200vh" }}>
                {/* Agregar tarjetas de información sobre la escasez del agua */}
                <Canvas className="canvas-3d flex-grow w-full h-full" camera={{ position: [0, 0, 10], fov: 75 }} >
                    <CycleText />

                    <group>
                        <Video position={[0, 0, 0]} scale={[10, 5, 1]} camera={{ position: [0, 0, 0], fov: 75 }} />
                    </group>

                    <WaterCycle />
                    <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                    <Sky
                        distance={450000}
                        sunPosition={[100, 20, 100]}
                        inclination={0}
                        azimuth={0.05}
                    />
                    <OrbitControls enableZoom={true} />
                    <Physics>
                        <Ground />
                        <Rain rainColor={rainColor} />
                    </Physics>

                    <Html position="absolute" >
                        <div style={{
                            transform: "translate(30%, 270%)", // Centrar el div
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            padding: "40px",
                            borderRadius: "5px",
                            right: "500px",
                            background: "none",
                            zIndex: 1000,
                            width: "700px",
                            fontSize: "25px",
                            fontWeight: "bold"

                        }}>
                            <p>El agua es un recurso vital para la vida en la Tierra, pero la disponibilidad de agua dulce está disminuyendo rápidamente debido al cambio climático y el uso excesivo. El ciclo del agua es un proceso continuo que involucra la evaporación, condensación, precipitación y escurrimiento. La preservación del ciclo del agua es crucial para evitar la escasez.</p>
                        </div>
                    </Html>


                    <Html position="absolute">
                        <div style={{
                            transform: "translate(600%, 600%)", // Centrar el div
                            padding: "20px",
                            borderRadius: "5px",
                            right: "500px",
                            zIndex: 1000,
                            width: "300px",
                            fontSize: "13px",

                        }}>
                            <h3>Instrucciones </h3>
                            <p><strong>Nota como cambia el color de la tierra </strong> Da Click encima</p>
                            <p><strong>Rueda del ratón:</strong> Zoom in / Zoom out</p>
                            <p><strong>Tecla ↑:</strong> Aumentar velocidad de rotación</p>
                            <p><strong>Tecla ↓:</strong> Reducir velocidad de rotación</p>
                        </div>
                    </Html>

                    <Html position="absolute">
                        <div style={{
                            transform: "translate(195%, 1250%)", // Centrar el div
                            padding: "20px",
                            backgroundColor: "rgba(255, 248, 0, 1)",
                            borderRadius: "5px",
                            zIndex: 1000,
                            width: "700px",
                            fontSize: "30px",
                            fontWeight: "bold"
                        }}>
                            <p>¿Estoy dispuesto(a) a cambiar hábitos para usar el agua de manera más responsable?</p>

                        </div>
                    </Html>
                    <Html position="absolute">
                        <div style={{
                            transform: "translate(195%, 1020%)", // Centrar el div
                            padding: "20px",
                            backgroundColor: "rgba(255, 248, 0, 1)",
                            borderRadius: "5px",
                            zIndex: 1000,
                            width: "700px",
                            fontSize: "30px",
                            fontWeight: "bold"
                        }}>
                            <p>¿Qué emociones surgen al pensar en un futuro con menos agua disponible para todos?</p>

                        </div>
                    </Html>

                    {/* Imagen en la escena */}
                    <Html position="absolute">
                        <div style={{
                            transform: "translate(40%, 66%)",
                            top: "10px",
                            left: "10px",
                            width: "300px",
                            height: "39px",
                            zIndex: -1,
                            scale: [8]
                        }}>
                            <img src="/assets/image/Tierra1.jpg" alt="Descripción de la imagen"
                                style={{
                                    objectFit: "cover",
                                }} />

                            {/* Aquí va el texto sobre la imagen */}
                            <div style={{
                                position: "absolute", // Posiciona el texto de manera absoluta dentro del contenedor
                                top: "50%", // Centra verticalmente el texto
                                left: "50%", // Centra horizontalmente el texto
                                transform: "translate(-50%, -50%)", // Ajuste fino para centrar
                                color: "white", // Color del texto
                                fontSize: "10px", // Tamaño del texto
                                fontFamily: "'BabyBear', sans-serif",
                                textShadow: "2px 2px 5px rgba(0, 0, 0, 0.8)", // Sombra para hacerlo más visible
                                zIndex: 1, // Asegura que el texto esté encima de la imagen
                                whiteSpace: "nowrap",
                                fontWeight: "bold",
                            }}>
                                <span style={{ display: "block" }}>El Agua</span>
                                <span>Un Recurso Escaso en un Mundo Sediento</span>
                            </div>
                            <div style={{
                                position: "absolute", // Posiciona el texto de manera absoluta dentro del contenedor
                                top: "120%", // Centra verticalmente el texto
                                left: "50%", // Centra horizontalmente el texto
                                transform: "translate(-50%, -50%)", // Ajuste fino para centrar
                                color: "white", // Color del texto
                                fontSize: "3.5px", // Tamaño del texto
                                fontFamily: "'BabyBear', sans-serif",
                                textShadow: "2px 2px 5px rgba(0, 0, 0, 0.8)", // Sombra para hacerlo más visible
                                zIndex: 1, // Asegura que el texto esté encima de la imagen
                                whiteSpace: "nowrap",
                                fontWeight: "bold",
                            }}>
                                <span style={{ display: "block" }}>Las fuentes de agua dulce se ven cada vez más amenazadas por la contaminación, el mal uso y el cambio climático. </span>
                                <span>A continuación aprenderemos un poco más sobre como cuidar este recurso.</span>
                            </div>
                        </div>
                    </Html>
                </Canvas >
            </div >
        </>
    );
};

export default Cycle;