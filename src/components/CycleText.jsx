import { Center, Html, Text3D } from "@react-three/drei";
import * as THREE from 'three';

const CycleText = () => {
    
    return (
        <>
            {/* Texto 3D sobre el modelo */}
            <Center position={[0, -0.05, 0]}scale={[0.1, 0.1, 0.1]} >
                <Text3D
                    font={"/assets/fonts/baby-bear.json"}
                    bevelEnabled
                    bevelSize={0.03}
                    bevelThickness={0.2}
                    height={0.01}
                    lineHeight={0.2}
                    letterSpacing={0.01}
                    size={0.2}
                >
                    CICLO DEL AGUA
                    <meshStandardMaterial
                        color={new THREE.Color(0.1, 0.2, 0.5)}
                        metalness={0.5} // Reducir para evitar brillo excesivo
                        roughness={0.6}
                    />
                </Text3D>
            </Center>
            <ambientLight intensity={0.3} />
            <directionalLight intensity={1} position={[0, 0, 5]} castShadow />
        </>
    );
};

export default CycleText;