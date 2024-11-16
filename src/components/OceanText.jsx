import { Center, Html, Text3D } from "@react-three/drei";
import * as THREE from 'three';

const OceanText = () => {
    return (
        <>
            {/* Texto 3D sobre el modelo */}
            <Center top left position={[18.5, 9, 0]}>
                <Text3D
                    font={"/assets/fonts/baby-bear.json"}
                    bevelEnabled
                    bevelSize={0.03}
                    bevelThickness={0.2}
                    height={0.2}
                    lineHeight={0.2}
                    letterSpacing={0.2}
                    size={2}
                >
                    ACIDIFICACIÓN DE LOS OCEANOS
                    <meshStandardMaterial
                        color={new THREE.Color(0.38, 0.68, 0.98)}
                        metalness={2} // Reducir para evitar brillo excesivo
                        roughness={0.06}
                    />
                </Text3D>
            </Center>
            <ambientLight intensity={0.5} />
            <directionalLight intensity={2} position={[8, 10, 5]} castShadow />
        </>
    );
};

export default OceanText;
