import React from "react";
import Sliderbar from "../components/Slidebar";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import WaterCycle from "../components/WaterCycle";

const Cycle = () => {
    return (
        <>
            <Sliderbar />
            <div className="home-container flex flex-col h-screen w-full">
                <Canvas className="canvas-3d flex-grow w-full h-full" camera={{ position: [0, 0, 20], fov: 0.8 }}>
                    <WaterCycle />
                    <OrbitControls enableZoom={false} />
                    <directionalLight position={[5, 5, 5]} intensity={1} castShadow />                  
                </Canvas>
            </div>
        </>
    );
};

export default Cycle;