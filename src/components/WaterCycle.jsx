import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const WaterCycle = (props) => {

    const groupRef = useRef();
    

    const { nodes, materials } = useGLTF('models-3d/Ciclo_agua.glb');
    const cycle = useGLTF('models-3d/Ciclo_agua.glb');
    console.log(cycle);

    // Rotación automática
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.01; // Ajusta la velocidad de rotación
        }
    });

    return (
        <group {...props} dispose={null}>
            <group>
                <group name="RootNode0" scale={0.01}>
                    <group name="skeletal1">
                        <primitive object={nodes.Root2} />
                    </group>
                    <group name="geo84">
                        <group name="water_cycle_a85">
                            <skinnedMesh
                                name="mesh_0"
                                geometry={nodes.mesh_0.geometry}
                                material={nodes.mesh_0.material}
                                skeleton={nodes.mesh_0.skeleton}
                            />
                            <skinnedMesh
                                name="mesh_1"
                                geometry={nodes.mesh_1.geometry}
                                material={nodes.mesh_1.material}
                                skeleton={nodes.mesh_1.skeleton}
                            />
                        </group>
                        <group name="water_cycle_b86">
                            <skinnedMesh
                                name="side_water_stream87"
                                geometry={nodes.side_water_stream87.geometry}
                                material={nodes.side_water_stream87.material}
                                skeleton={nodes.side_water_stream87.skeleton}
                            />
                            <skinnedMesh
                                name="water_body88"
                                geometry={nodes.water_body88.geometry}
                                material={nodes.water_body88.material}
                                skeleton={nodes.water_body88.skeleton}
                            />
                        </group>
                        <group name="water_cycle_c89">
                            <skinnedMesh
                                name="cloud90"
                                geometry={nodes.cloud90.geometry}
                                material={nodes.cloud90.material}
                                skeleton={nodes.cloud90.skeleton}
                            />
                            <skinnedMesh
                                name="arrow191"
                                geometry={nodes.arrow191.geometry}
                                material={nodes.arrow191.material}
                                skeleton={nodes.arrow191.skeleton}
                            />
                            <skinnedMesh
                                name="arrow292"
                                geometry={nodes.arrow292.geometry}
                                material={nodes.arrow292.material}
                                skeleton={nodes.arrow292.skeleton}
                            />
                            <skinnedMesh
                                name="arrow393"
                                geometry={nodes.arrow393.geometry}
                                material={nodes.arrow393.material}
                                skeleton={nodes.arrow393.skeleton}
                            />
                            <skinnedMesh
                                name="arrow494"
                                geometry={nodes.arrow494.geometry}
                                material={nodes.arrow494.material}
                                skeleton={nodes.arrow494.skeleton}
                            />
                            <skinnedMesh
                                name="arrow595"
                                geometry={nodes.arrow595.geometry}
                                material={nodes.arrow595.material}
                                skeleton={nodes.arrow595.skeleton}
                            />
                        </group>
                    </group>
                </group>
            </group>
        </group>

    );
};

export default WaterCycle;
useGLTF.preload('models-3d/Ciclo_agua.glb');