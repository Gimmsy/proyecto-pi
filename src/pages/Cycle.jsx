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
        position ,
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
                <Canvas className="canvas-3d flex-grow w-full h-full" camera={{ position: [0, 4, 12], fov: 75 }} >
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
                            transform: "translate(20%, 60%)", // Centrar el div
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            padding: "40px",
                            borderRadius: "5px",
                            right: "500px",
                            background: "rgba(255, 255, 255, 0.8)",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                            zIndex: 1000,
                            width: "600px",
                            fontSize: "20px"
                        }}>
                            <h3>Escasez de Agua</h3>
                            <p>El agua es un recurso vital para la vida en la Tierra, pero la disponibilidad de agua dulce está disminuyendo rápidamente debido al cambio climático y el uso excesivo. El ciclo del agua es un proceso continuo que involucra la evaporación, condensación, precipitación y escurrimiento. La preservación del ciclo del agua es crucial para evitar la escasez.</p>
                        </div>
                    </Html>

                    <Html position="absolute">
                        <div style={{
                            transform: "translate(20%, 250%)", // Centrar el div
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            padding: "40px",
                            borderRadius: "5px",
                            right: "500px",
                            background: "rgba(255, 255, 255, 0.8)",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                            zIndex: 1000,
                            width: "600px",
                            fontSize: "20px"
                        }}>
                            <h3>Instrucciones</h3>
                            <p><strong>Nota como cambia el color de la tierra </strong> Da Click encima</p>
                            <p><strong>Rueda del ratón:</strong> Zoom in / Zoom out</p>
                            <p><strong>Tecla ↑:</strong> Aumentar velocidad de rotación</p>
                            <p><strong>Tecla ↓:</strong> Reducir velocidad de rotación</p>
                        </div>
                    </Html>

                </Canvas>
            </div>

            <style >{`
                .info-card {
                    background-color: rgba(255, 255, 255, 0.8);
                    padding: 20px;
                    margin-bottom: 10px;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    width: 250px;
                    
                }

                .info-card h3 {
                    margin-top: 0;
                    color: #333;
                }

                .info-card p {
                    color: #555;
                    font-size: 14px;
                }
            `}</style>
        </>
    );
};

export default Cycle;