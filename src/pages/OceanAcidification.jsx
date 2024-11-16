import React from "react";
import Sliderbar from "../components/Slidebar";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Crab from "../components/Crab";
import "../styles/OceanAcidification.css";

const OceanAcidification = () => {
  return (
    <>
      <Sliderbar />
      <div className="home-container">
        <Canvas
          className="canvas-3d"
          camera={{ position: [0, 0, 10], fov: 75 }}
          style={{ position: "absolute", top: 0, left: 0, width: "", height: "150%" }}
          shadows
        >
          <Crab scale={[0.4, 0.4, 0.4]} />
          <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={true} />
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
        </Canvas>
      </div>
    </>
  );
};

export default OceanAcidification;
