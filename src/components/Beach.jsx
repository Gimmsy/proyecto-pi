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
    let isOriginalColor = true; // Flag para alternar colores

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key.toLowerCase() === 'w' && object12Ref.current) {
                const newColor = isOriginalColor ? 0xff0000 : materials.cadeira.color.getHex(); // Rojo o color original
                object12Ref.current.material.color.set(newColor);
                isOriginalColor = !isOriginalColor; // Cambiar flag
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [materials.cadeira.color]);

    // Evento de mouse para cambiar color del objeto 8
    const handleObject8Click = () => {
        const newColor = object8Ref.current.material.color.getHex() === originalColorObject8 ? 0xffff00 : originalColorObject8; // Alternar
        if (object8Ref.current) {
            object8Ref.current.material.color.set(newColor);
        }
    };
    return (
        <group {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 5]} scale={9.691}>
                {/* Suelo sin rebote, solo colisionador */}
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
                {/* Pelota con rebote */}
                <RigidBody name="rbBall" colliders="ball" restitution={0.8}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Object_4.geometry}
                        material={materials.Sphere}
                        position={[0.332, 2, 0.332]} // Posición elevada para que caiga
                    />
                </RigidBody>
                {/* Otros objetos que no rebotan (solo colisionadores) */}
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
                {/* Otros objetos del modelo */}
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