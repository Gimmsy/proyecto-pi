import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

const WaterCycle = (props) => {
    const groupRef = useRef();
    const [clicked, setClicked] = useState(false);
    const [rotationSpeed, setRotationSpeed] = useState(0.001);
    const { nodes, materials, animations } = useGLTF('models-3d/CicloA.glb');
    const { actions } = useAnimations(animations, groupRef);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowUp") {
                setRotationSpeed((prevSpeed) => prevSpeed + 0.001); // Aumentar velocidad de rotación
                console.log("Aumentar velocidad");
            }
            if (event.key === "ArrowDown") {
                setRotationSpeed((prevSpeed) => Math.max(prevSpeed - 0.001, 0)); // Reducir velocidad de rotación
                console.log("Reducir velocidad");
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown); // Limpiar evento
        };
    }, []);
    useEffect(() => {
        console.log("Animaciones disponibles:", animations.map(a => a.name));
    }, [animations]);

    useEffect(() => {
        if (actions) {
            actions["idle"]?.play();
            actions["idle_with_info"]?.play();
        }
    }, [actions]);

    // Rotación automática
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += rotationSpeed; // Ajusta la velocidad de rotación
        }
    });

    const handleWheel = (event) => {
        if (groupRef.current) {
            const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1; // Zoom in (scroll up) o zoom out (scroll down)
            groupRef.current.scale.set(
                groupRef.current.scale.x * scaleFactor,
                groupRef.current.scale.y * scaleFactor,
                groupRef.current.scale.z * scaleFactor
            );
            console.log("Escalando el objeto");
        }
    };

    // Función para manejar el clic
    const handleClick = () => {
        setClicked(!clicked);
        console.log("Objeto clicado");
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

            <group ref={groupRef} {...props} dispose={null} castShadow onWheel={handleWheel} tabIndex={0} position={[3, 2.5, 0]}>
                <group name="Scene">
                    <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={6}>
                        <group name="root">
                            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
                                <group name="RootNode0_0" scale={0.06}>
                                    <group name="skeletal1_1">
                                        <group name="GLTF_created_0">
                                            <group name="_86_correction">
                                                <group name="_86" />
                                            </group>
                                            <group name="_87_correction">
                                                <group name="_87" />
                                            </group>
                                            <group name="arrow191_93_correction">
                                                <group name="arrow191_93" />
                                            </group>
                                            <group name="arrow292_94_correction">
                                                <group name="arrow292_94" />
                                            </group>
                                            <group name="arrow393_95_correction">
                                                <group name="arrow393_95" />
                                            </group>
                                            <group name="arrow494_96_correction">
                                                <group name="arrow494_96" />
                                            </group>
                                            <group name="arrow595_97_correction">
                                                <group name="arrow595_97" />
                                            </group>
                                            <group name="cloud90_92_correction">
                                                <group name="cloud90_92" />
                                            </group>
                                            <skinnedMesh
                                                name="Object_100"
                                                geometry={nodes.Object_100.geometry}
                                                material={materials.material_3}
                                                skeleton={nodes.Object_100.skeleton}

                                            />
                                            <skinnedMesh
                                                name="Object_103"
                                                geometry={nodes.Object_103.geometry}
                                                material={materials.material_4}
                                                skeleton={nodes.Object_103.skeleton}

                                            />
                                            <skinnedMesh
                                                name="Object_106"
                                                geometry={nodes.Object_106.geometry}
                                                material={materials.material_5}
                                                skeleton={nodes.Object_106.skeleton}

                                            />
                                            <skinnedMesh
                                                name="Object_109"
                                                geometry={nodes.Object_109.geometry}
                                                material={materials.material_6}
                                                skeleton={nodes.Object_109.skeleton}

                                            />
                                            <skinnedMesh
                                                name="Object_112"
                                                geometry={nodes.Object_112.geometry}
                                                material={materials.material_7}
                                                skeleton={nodes.Object_112.skeleton}

                                            />
                                            <skinnedMesh
                                                name="Object_115"
                                                geometry={nodes.Object_115.geometry}
                                                material={materials.material_8}
                                                skeleton={nodes.Object_115.skeleton}

                                            />
                                            <skinnedMesh
                                                name="Object_118"
                                                geometry={nodes.Object_118.geometry}
                                                material={materials.material_9}
                                                skeleton={nodes.Object_118.skeleton}

                                            />
                                            <skinnedMesh
                                                name="Object_91"
                                                geometry={nodes.Object_91.geometry}
                                                material={materials.material_0}
                                                skeleton={nodes.Object_91.skeleton}
                                                onClick={handleClick}
                                                material-color={clicked ? "brown" : "white"}
                                            />
                                            <skinnedMesh
                                                name="Object_94"
                                                geometry={nodes.Object_94.geometry}
                                                material={materials.material_1}
                                                skeleton={nodes.Object_94.skeleton}
                                            />
                                            <skinnedMesh
                                                name="Object_97"
                                                geometry={nodes.Object_97.geometry}
                                                material={materials.material_2}
                                                skeleton={nodes.Object_97.skeleton}
                                            />
                                            <group name="side_water_stream87_89_correction">
                                                <group name="side_water_stream87_89" />
                                            </group>
                                            <group name="water_body88_90_correction">
                                                <group name="water_body88_90" />
                                            </group>
                                            <primitive object={nodes.GLTF_created_0_rootJoint} />
                                        </group>
                                    </group>
                                </group>
                            </group>
                        </group>
                    </group>
                </group>
            </group>
        </>
    );
};

export default WaterCycle;
useGLTF.preload('models-3d/CicloA.glb');