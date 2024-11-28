import React from "react";
import Sliderbar from "../components/Slidebar";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Stars, Html } from "@react-three/drei";
import WaterCycle from "../components/WaterCycle";
import CycleText from "../components/CycleText";

const Cycle = () => {

    return (
        <>
            <Sliderbar />
            <div className="home-container flex flex-col h-screen w-full">
                <Canvas className="canvas-3d flex-grow w-full h-full" camera={{ position: [0, 0, 20], fov: 0.8 }}>
                    <CycleText />
                    <WaterCycle />
                    <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                    <Stars
                        radius={100}
                        depth={50}
                        count={5000}
                        factor={4}
                        saturation={0}
                        fade
                    />
                    <Sky
                        distance={450000}
                        sunPosition={[100, 20, 100]}
                        inclination={0}
                        azimuth={0.05}
                    />
            
                    
                    <OrbitControls enableZoom={true} />

                </Canvas>
            </div>
        </>
    );
};

export default Cycle;