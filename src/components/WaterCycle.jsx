import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const WaterCycle = (props) => {
    const groupRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    const { nodes, materials, animations } = useGLTF('models-3d/CicloA.glb');

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
        <>
            {/* Luz ambiental para iluminar toda la escena */}
            <ambientLight intensity={0.4} />

            {/* Luz direccional para sombras */}
            <directionalLight
                castShadow
                position={[5, 10, 5]} // Posición de la luz
                intensity={2} // Intensidad de la luz
                shadow-mapSize-width={1024} // Tamaño del mapa de sombras
                shadow-mapSize-height={1024}
                shadow-camera-far={50} // Distancia de la cámara de sombras
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />

            {/* Luz puntual para iluminar un área específica */}
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            <group ref={groupRef} {...props} dispose={null} castShadow>
                <group name="Scene">
                    <group name="RootNode0">
                        <group name="geo84">
                            <group name="water_cycle_a85" />
                            <group name="water_cycle_b86" />
                            <group name="water_cycle_c89" />
                        </group>
                        <group name="skeletal1">
                            <skinnedMesh
                                name="arrow191"
                                geometry={nodes.arrow191.geometry}
                                material={materials.Material_5}
                                skeleton={nodes.arrow191.skeleton}
                                onClick={handleClick}  // Agregamos evento de clic
                                onPointerOver={handlePointerOver}  // Evento de hover
                                onPointerOut={handlePointerOut}  // Evento de salir del hover

                            />
                            <skinnedMesh
                                name="arrow292"
                                geometry={nodes.arrow292.geometry}
                                material={materials.Material_6}
                                skeleton={nodes.arrow292.skeleton}
                                onClick={handleClick}
                                onPointerOver={handlePointerOver}
                                onPointerOut={handlePointerOut}
                            />
                            <skinnedMesh
                                name="arrow393"
                                geometry={nodes.arrow393.geometry}
                                material={materials.Material_7}
                                skeleton={nodes.arrow393.skeleton}
                            />
                            <skinnedMesh
                                name="arrow494"
                                geometry={nodes.arrow494.geometry}
                                material={materials.Material_8}
                                skeleton={nodes.arrow494.skeleton}
                                onClick={handleClick}
                                onPointerOver={handlePointerOver}
                                onPointerOut={handlePointerOut}
                            />
                            <skinnedMesh
                                name="arrow595"
                                geometry={nodes.arrow595.geometry}
                                material={materials.Material_9}
                                skeleton={nodes.arrow595.skeleton}
                                onClick={handleClick}
                                onPointerOver={handlePointerOver}
                                onPointerOut={handlePointerOut}
                            />
                            <skinnedMesh
                                name="cloud90"
                                geometry={nodes.cloud90.geometry}
                                material={materials.Material_4}
                                skeleton={nodes.cloud90.skeleton}
                                onClick={handleClick}
                                onPointerOver={handlePointerOver}
                                onPointerOut={handlePointerOut}
                            />
                            <skinnedMesh
                                name="Mesh_0"
                                geometry={nodes.Mesh_0.geometry}
                                material={materials.Material_0}
                                skeleton={nodes.Mesh_0.skeleton}
                                onClick={handleClick}
                                onPointerOver={handlePointerOver}
                                onPointerOut={handlePointerOut}
                                material-color={clicked ? "brown" : "white"}  // Cambia color al clic
                            />
                            <skinnedMesh
                                name="Mesh_1"
                                geometry={nodes.Mesh_1.geometry}
                                material={materials.Material_1}
                                skeleton={nodes.Mesh_1.skeleton}
                                onClick={handleClick}
                                onPointerOver={handlePointerOver}
                                onPointerOut={handlePointerOut}
                            />
                            <skinnedMesh
                                name="side_water_stream87"
                                geometry={nodes.side_water_stream87.geometry}
                                material={materials.Material_2}
                                skeleton={nodes.side_water_stream87.skeleton}
                                onClick={handleClick}
                                onPointerOver={handlePointerOver}
                                onPointerOut={handlePointerOut}
                            />
                            <skinnedMesh
                                name="water_body88"
                                geometry={nodes.water_body88.geometry}
                                material={materials.Material_3}
                                skeleton={nodes.water_body88.skeleton}
                                onClick={handleClick}
                                onPointerOver={handlePointerOver}
                                onPointerOut={handlePointerOut}
                            />
                            <primitive object={nodes.Root2} />
                        </group>
                    </group>
                </group>
            </group>
        </>
    );
};

export default WaterCycle;
useGLTF.preload('models-3d/CicloA.glb');
