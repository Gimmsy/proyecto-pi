import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import House from "./House";

const World = ()=>{
    const camerasettings ={
        positions: [2, 0, 5],
        fov: 75,
    }
    return ( 
        <React.Fragment>
            <h1 className="tittle">Hello World</h1>
        <Canvas camera ={camerasettings}>
            <OrbitControls enablePan = {false}/>
            <ambientLight intensity= {1.5}/>
            <directionalLight position= {[0, 10, 10]} intensity={5}/>        
            <House/>
        </Canvas>
        </React.Fragment>
        )
       
};

export default World;