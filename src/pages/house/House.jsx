import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import Login from "../login/Login";

const House = () => {
    const houseRef = useRef(null);

    useFrame((state, delta) => {
        houseRef.current.rotation.y += 1 * delta;
        console.log(houseRef);
    })

    return (
        <group ref={houseRef} name="house" scale={[1, 2, 3]}>
            <mesh
                name="roof"
                position-y={1}
                rotation-y={Math.PI * 0.25}
                scale={1.5}
            >
                <coneGeometry args={[1, 1, 4]} />
                <meshStandardMaterial wireframe={false} color={0xFFC300} />
            </mesh>
            <mesh
                name="structure"
            >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial wireframe={false} color="#6c3483" />
            </mesh>
        </group>
    );
};

export default House;