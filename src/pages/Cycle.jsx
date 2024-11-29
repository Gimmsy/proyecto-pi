import { useState, useEffect } from 'react';
import Sliderbar from "../components/Slidebar";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Html } from "@react-three/drei";
import WaterCycle from "../components/WaterCycle";
import CycleText from "../components/CycleText";
import { Physics, useBox, useSphere } from '@react-three/cannon';

const RainDrop = ({ position, onCollision, removeDrop, color }) => {
    const [ref] = useSphere(() => ({
        mass: 1,
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
            <div className="home-container flex flex-col h-screen w-full">
                {/* Agregar tarjetas de información sobre la escasez del agua */}
                <Canvas className="canvas-3d flex-grow w-full h-full" camera={{ position: [5, 5, 5], fov: 100 }}>
                    <CycleText />
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

                    {/* Tarjetas de información dentro de la escena */}
                    <Html style={{ position: "absolute", bottom: "1px", right: "600px" }}>
                        <div style={{
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            padding: "10px",
                            borderRadius: "5px",
                            top: "50px",
                            right: "500px",
                            background: "rgba(255, 255, 255, 0.8)",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                            zIndex: 1000,
                            width: "400px",
                            fontSize: "18px"
                        }}>
                            <h3>Escasez de Agua</h3>
                            <p>El agua es un recurso vital para la vida en la Tierra, pero la disponibilidad de agua dulce está disminuyendo rápidamente debido al cambio climático y el uso excesivo. El ciclo del agua es un proceso continuo que involucra la evaporación, condensación, precipitación y escurrimiento. La preservación del ciclo del agua es crucial para evitar la escasez.</p>
                        </div>
                    </Html>
                </Canvas>
            </div>

            <style jsx>{`
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