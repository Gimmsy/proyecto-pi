import { Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import * as THREE from 'three';

const TitleWaterPollution = () => {
    const textRef = useRef();
    const initialPosition = new Vector3(-5, 5, -10); // Ajusta la posición inicial aquí

    useFrame((state) => {
        if (textRef.current) {
            const t = state.clock.getElapsedTime();
            // Resetea la posición al soltar el clic
            textRef.current.position.lerp(initialPosition, 0.1);
            // Añadir rotación
            textRef.current.rotation.y += 0.005; // Ajusta la velocidad de rotación aquí
            // Añadir animación de flotación
            textRef.current.position.y = initialPosition.y + Math.sin(t * 2) * 0.5;
        }
    });

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
                position={[-5, 5, -10]} // Ajusta la posición aquí
                bevelEnabled
                bevelSize={0.00003}
                bevelThickness={0.02}
                height={0.00002}
                lineHeight={2}
                letterSpacing={0.1}
                size={2}
            >
                Protejamos los océanos!
                <meshStandardMaterial color={new THREE.Color(1, 1, 1)} metalness={0.5} roughness={0.5} />
            </Text3D>
            {/* Agrega luces a la escena */}
            <ambientLight intensity={0.75} />
            <directionalLight intensity={0.8} position={[8, 5, 5]} castShadow />
        </>
    );
};

export default TitleWaterPollution;