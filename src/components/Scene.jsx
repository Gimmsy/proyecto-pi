import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense } from 'react';

const Scene = () => {
    return (
        <div className="crab-background">
            <Canvas
                shadows
                camera={{ position: [0, 0, 10] }}
                style={{ top: 0, left: 0, width: '100%', height: '1024px' }}
                gl={{
                    antialias: true,
                    powerPreference: 'high-performance', // Priorizar el rendimiento
                    pixelRatio: Math.min(1.5, window.devicePixelRatio), // Limitar el ratio de píxeles
                }}
                onCreated={({ gl }) => {
                    gl.setPixelRatio(window.devicePixelRatio);
                    gl.setSize(window.innerWidth, window.innerHeight);
                    gl.shadowMap.enabled = true; // Habilitar sombras
                    gl.shadowMap.type = THREE.PCFSoftShadowMap;
                }}
            >
                <ambientLight intensity={2} /> {/* Reducir la intensidad de la luz ambiental */}
                <pointLight intensity={0.1} position={[7, 5, 1]} castShadow /> {/* Reducir la intensidad de la luz puntual */}
                <Sky sunPosition={[7, 5, 1]} />
                <Stars radius={50} depth={20} count={5000} factor={4} saturation={0} fade /> {/* Agregar estrellas */}
                <OrbitControls autoRotate autoRotateSpeed={1} /> {/* Control de la cámara */}
                <Suspense fallback={null}>
                    {/* // <Crab scale={[0.4, 0.4, 0.4]} position={[-10, 10, 20]} /> Escalar el modelo */}
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Scene;