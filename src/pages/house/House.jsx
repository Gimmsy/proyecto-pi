import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import Login from "../login/Login";

const House = () => {
    const houseRef = useRef(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const cosValue = Math.cos(time);
        if (houseRef.current) {
            houseRef.current.rotation.y = cosValue;
            houseRef.current.rotation.x = cosValue * 1; 
        }

    });

    return (
        <mesh ref={houseRef} scale={[3, 2, 2]} position={[0, 0, -1]}>
            <sphereGeometry args={[1, 32, 32]} /> 
            <meshPhongMaterial color="#e74c3c" />
        </mesh>
    );
};

export default House;