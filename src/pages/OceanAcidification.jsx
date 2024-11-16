import React from "react";
import Sliderbar from "../components/Slidebar";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Crab from "../components/Crab";
import "../styles/OceanAcidification.css";
import OceanText from "../components/OceanText";
import Staging from "../components/Staging";

const OceanAcidification = () => {
  return (
    <>
      <Sliderbar />
      <div className="home-container">
        <Canvas
          className="canvas-3d-container"
          camera={{ position: [0, 0, 10], fov: 75 }}
          shadows
        >
          <OceanText />
          <Crab scale={[0.3, 0.25, 0.3]} />
          <OrbitControls
            enableZoom={true}
            minDistance={20}
            maxDistance={20}
            target={[0, 0, 0]}
          />
          <ambientLight
            intensity={1}
          />
          <directionalLight
            position={[10, 10, 10]}
            intensity={1}
            castShadow
          />
          <Staging/>
        </Canvas>
      </div>
    </>
  );
};

export default OceanAcidification;
