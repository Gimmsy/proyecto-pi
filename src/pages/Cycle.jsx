import React from "react";
import Sliderbar from "../components/Slidebar";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import WaterCycle from "../components/WaterCycle";
import "../styles/Cycle.css";

const Cycle = () => {
    return (
        <>
            <Sliderbar />
            <div className="home-container">
                <Canvas className="canvas-3d" camera={{ position: [0, 0, 20], fov: 0.8 }}>
                    <WaterCycle />
                    <OrbitControls enableZoom={false} />
                    <directionalLight position={[5, 5, 5]} intensity={1} castShadow />                  
                </Canvas>
            </div>
        </>
    );
};

export default Cycle;