import { Html, Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import * as THREE from 'three';

const WelcomeText = () => {
    const [isClicked, setIsClicked] = useState(false);
    const textRef = useRef();
    const initialPosition = new Vector3(-23.6, -3.8, 0);
    const offset = useRef(new Vector3(0, 0, 0));

    useFrame(() => {
        if (textRef.current) {
            // Resetea la posición al soltar el clic
            if (!isClicked) {
                textRef.current.position.lerp(initialPosition, 0.1);
            }
        }
    });

    const handlePointerDown = (event) => {
        setIsClicked(true);
        // Guardar el offset de la posición inicial al hacer clic
        const { x, y } = event.point;
        offset.current.set(x - textRef.current.position.x, y - textRef.current.position.y, 0);
    };

    const handlePointerMove = (event) => {
        if (isClicked) {
            const { x, y } = event.point;
            // Actualizar la posición del texto en función del movimiento del mouse
            textRef.current.position.set(x - offset.current.x, y - offset.current.y, 0);
        }
    };

    const handlePointerUp = () => {
        setIsClicked(false);
    };

    useEffect(() => {
        return () => {
            if (textRef.current) {
                // Liberar recursos de geometría y material
                textRef.current.geometry.dispose();
                textRef.current.material.dispose();
            }
        };
    }, []);

    return (
        <>
            <Text3D
                ref={textRef}
                font={"/assets/fonts/baby-bear.json"}
                bevelEnabled
                bevelSize={0.00003}
                bevelThickness={0.02}
                height={0.00002}
                lineHeight={2}
                letterSpacing={0.1}
                size={2}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove} // Maneja el movimiento mientras se mantiene presionado
                onPointerUp={handlePointerUp}
            >
                EXPLORANDO LOS PROBLEMAS AMBIENTALES
                <meshStandardMaterial color={new THREE.Color(0.35, 0.45, 0.65)} metalness={2} roughness={20} />
            </Text3D>
            <Html
                occlude
                wrapperClass="welcome-text"
                center
                distanceFactor={5.5}
                style={{
                    font: "Monsetrrat",
                    display: "flex",
                    whiteSpace: "nowrap",
                    justifyContent: "center",
                    textAlign: "center",
                    fontSize: "50px",
                    position: "fixed",
                    margin: 0,
                    padding: 0,
                }}
            >
                <h1 style={{ margin: 0 }}>BIENVENIDOS A NUESTRO MUNDO</h1>
            </Html>
            {/* Agrega luces a la escena */}
            <ambientLight intensity={0.75} />
            <directionalLight intensity={0.8} position={[8, 5, 5]} castShadow />
        </>
    );
};

export default WelcomeText;
