import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

const Beach = (props) => {
    const { nodes, materials } = useGLTF('/models-3d/Beach.glb');
    const object8Ref = useRef();
    const object12Ref = useRef();
    // Guardamos el color original para alternar después
    const originalColorObject8 = materials.surf.color.getHex();
    // Estado para cambiar colores
    const [isObject12OriginalColor, setIsObject12OriginalColor] = useState(true);
    const [originalObject12Color, setOriginalObject12Color] = useState(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key.toLowerCase() === 'w' && object12Ref.current) {
                if (isObject12OriginalColor) {
                    // Store original color if not already stored
                    if (!originalObject12Color) {
                        setOriginalObject12Color(materials.cadeira.color.getHex());
                    }
                    // Change to red
                    object12Ref.current.material.color.set(0xff0000);
                } else {
                    // Revert to original color
                    object12Ref.current.material.color.set(originalObject12Color);
                }
                // Toggle color state
                setIsObject12OriginalColor(!isObject12OriginalColor);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isObject12OriginalColor, originalObject12Color, materials.cadeira.color]);

    const handleObject8Click = () => {
        const newColor = object8Ref.current.material.color.getHex() === originalColorObject8 ? 0xffff00 : originalColorObject8; // Alternar
        if (object8Ref.current) {
            object8Ref.current.material.color.set(newColor);
        }
    };
    return (
        <group {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 5]} scale={9.691}>
                <RigidBody type="fixed" colliders="trimesh">
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Object_5.geometry}
                        material={materials.sand}
                        position={[0.752, 0.046, -0.363]}
                        scale={1.123}
                    />
                </RigidBody>
                <RigidBody name="rbBall" colliders="ball" restitution={1}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Object_4.geometry}
                        material={materials.Sphere}
                        position={[0.22, 2, 0.332]} // Posición elevada para que caiga
                    />
                </RigidBody>
                <RigidBody type="fixed" colliders="trimesh">
                    <mesh
                        ref={object12Ref}
                        castShadow
                        receiveShadow
                        geometry={nodes.Object_12.geometry}
                        material={materials.cadeira}
                        position={[0.887, 0.344, -0.368]}
                        scale={[0.9, 0.9, 1.321]}
                    />
                </RigidBody>
                <RigidBody type="fixed" colliders="trimesh">
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Object_2.geometry}
                        material={materials.boia_01}
                        position={[0.996, 0.363, -0.364]}
                    />
                </RigidBody>
                <RigidBody type="fixed" colliders="trimesh">
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Object_3.geometry}
                        material={materials.boia_02}
                        position={[0.998, 0.359, -0.376]}
                    />
                </RigidBody>
                <RigidBody type="fixed" colliders="trimesh">
                    <mesh
                        ref={object8Ref}
                        castShadow
                        receiveShadow
                        geometry={nodes.Object_8.geometry}
                        material={materials.surf}
                        position={[0, 0, -0.203]}
                        scale={1.103}
                        onClick={handleObject8Click}
                    />
                </RigidBody>
                <RigidBody type="fixed" colliders="trimesh">
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Object_9.geometry}
                        material={materials['sand.castle']}
                        position={[0.315, 0.136, -0.282]}
                    />
                </RigidBody>
            </group>
        </group>
    );
}

useGLTF.preload('/models-3d/Beach.glb');
export default Beach;