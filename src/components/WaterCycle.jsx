import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const WaterCycle = (props) => {
    const groupRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);

    const { nodes } = useGLTF('models-3d/Ciclo_agua.glb');

    // Rotación automática
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.001; // Ajusta la velocidad de rotación
        }
    });

    // Función para manejar el clic
    const handleClick = () => {
        setClicked(!clicked);
        console.log("Objeto clicado");
    };

    // Función para manejar el hover
    const handlePointerOver = () => {
        setHovered(true);
        console.log("Mouse sobre el objeto");
    };

    const handlePointerOut = () => {
        setHovered(false);
        console.log("Mouse fuera del objeto");
    };
    
    
    return (
        <group {...props} dispose={null} ref={groupRef}>
            <group scale={0.01}> {/* Ajustamos la escala */}
                {/* Skeletal */}
                <group name="skeletal1">
                    <primitive object={nodes.Root2} />
                </group>
                <group name="geo84">
                    {/* Grupo A */}
                    <group name="water_cycle_a85">
                        <skinnedMesh
                            name="mesh_0"
                            geometry={nodes.mesh_0.geometry}
                            material={nodes.mesh_0.material}
                            skeleton={nodes.mesh_0.skeleton}
                            onClick={handleClick}  // Agregamos evento de clic
                            onPointerOver={handlePointerOver}  // Evento de hover
                            onPointerOut={handlePointerOut}  // Evento de salir del hover
                            material-color={clicked ? "blue" : "white"}  // Cambia color al clic
                        />
                        <skinnedMesh
                            name="mesh_1"
                            geometry={nodes.mesh_1.geometry}
                            material={nodes.mesh_1.material}
                            skeleton={nodes.mesh_1.skeleton}
                            onClick={handleClick}
                            onPointerOver={handlePointerOver}
                            onPointerOut={handlePointerOut}
                        />
                    </group>
                    {/* Grupo B */}
                    <group name="water_cycle_b86">
                        <skinnedMesh
                            name="side_water_stream87"
                            geometry={nodes.side_water_stream87.geometry}
                            material={nodes.side_water_stream87.material}
                            skeleton={nodes.side_water_stream87.skeleton}
                            onClick={handleClick}
                            onPointerOver={handlePointerOver}
                            onPointerOut={handlePointerOut}
                        />
                        <skinnedMesh
                            name="water_body88"
                            geometry={nodes.water_body88.geometry}
                            material={nodes.water_body88.material}
                            skeleton={nodes.water_body88.skeleton}
                            onClick={handleClick}
                            onPointerOver={handlePointerOver}
                            onPointerOut={handlePointerOut}
                        />
                    </group>
                    {/* Grupo C */}
                    <group name="water_cycle_c89">
                        <skinnedMesh
                            name="cloud90"
                            geometry={nodes.cloud90.geometry}
                            material={nodes.cloud90.material}
                            skeleton={nodes.cloud90.skeleton}
                            onClick={handleClick}
                            onPointerOver={handlePointerOver}
                            onPointerOut={handlePointerOut}
                        />
                        {/* Flechas */}
                        <skinnedMesh
                            name="arrow191"
                            geometry={nodes.arrow191.geometry}
                            material={nodes.arrow191.material}
                            skeleton={nodes.arrow191.skeleton}
                            onClick={handleClick}
                            onPointerOver={handlePointerOver}
                            onPointerOut={handlePointerOut}
                        />
                        <skinnedMesh
                            name="arrow292"
                            geometry={nodes.arrow292.geometry}
                            material={nodes.arrow292.material}
                            skeleton={nodes.arrow292.skeleton}
                            onClick={handleClick}
                            onPointerOver={handlePointerOver}
                            onPointerOut={handlePointerOut}
                        />
                        <skinnedMesh
                            name="arrow393"
                            geometry={nodes.arrow393.geometry}
                            material={nodes.arrow393.material}
                            skeleton={nodes.arrow393.skeleton}
                            onClick={handleClick}
                            onPointerOver={handlePointerOver}
                            onPointerOut={handlePointerOut}
                        />
                        <skinnedMesh
                            name="arrow494"
                            geometry={nodes.arrow494.geometry}
                            material={nodes.arrow494.material}
                            skeleton={nodes.arrow494.skeleton}
                            onClick={handleClick}
                            onPointerOver={handlePointerOver}
                            onPointerOut={handlePointerOut}
                        />
                        <skinnedMesh
                            name="arrow595"
                            geometry={nodes.arrow595.geometry}
                            material={nodes.arrow595.material}
                            skeleton={nodes.arrow595.skeleton}
                            onClick={handleClick}
                            onPointerOver={handlePointerOver}
                            onPointerOut={handlePointerOut}
                        />
                        
                        
                        {/* Añadimos más flechas aquí si es necesario */}
                    </group>
                </group>
            </group>
        </group>
    );
};

export default WaterCycle;
useGLTF.preload('models-3d/Ciclo_agua.glb');
