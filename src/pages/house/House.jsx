import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import Login from "../login/Login";

const House = () => {
    const houseRef = useRef(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        /*const cosValue = Math.cos(time);
        const sinValue = Math.sin(time);*/
        const waveSpeed=1;
        const waveAmplitude= 1;
        const waveLegnth= 3;
        if (houseRef.current) {
            houseRef.current.position.x = Math.cos(time * waveSpeed)* 5;
            houseRef.current.position.y = Math.sin(time * waveLegnth)* waveAmplitude;
           /* houseRef.current.rotation.y = cosValue;
            houseRef.current.rotation.x = cosValue * 1; 
            houseRef.current.position.x = cosValue * 5;
            houseRef.current.position.y = sinValue * 2;*/
        }

    });

    return (
        <mesh ref={houseRef} scale={[1, 1, 1]} position={[0, 0, 0]}>
            <sphereGeometry args={[1, 32, 32]} /> 
            <meshPhongMaterial color="#e74c3c" />
        </mesh>
    );
};

export default House;