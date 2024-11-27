import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';

function Umbrella(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('models-3d/Umbrella.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={9.691}>
          <group name="beachobjcleanermaterialmergergles">
            <mesh
              name="Object_12"
              castShadow
              receiveShadow
              geometry={nodes.Object_12.geometry}
              material={materials.cadeira}
              position={[0.887, 0.344, -0.368]}
              scale={[0.9, 0.9, 1.321]}
            />
            <mesh
              name="Object_2"
              castShadow
              receiveShadow
              geometry={nodes.Object_2.geometry}
              material={materials.boia_01}
              position={[0.996, 0.363, -0.364]}
            />
            <mesh
              name="Object_3"
              castShadow
              receiveShadow
              geometry={nodes.Object_3.geometry}
              material={materials.boia_02}
              position={[0.998, 0.359, -0.376]}
            />
            <mesh
              name="Object_4"
              castShadow
              receiveShadow
              geometry={nodes.Object_4.geometry}
              material={materials.Sphere}
              position={[0.332, 0.432, -0.366]}
            />
            <mesh
              name="Object_5"
              castShadow
              receiveShadow
              geometry={nodes.Object_5.geometry}
              material={materials.sand}
              position={[0.752, 0.046, -0.363]}
              scale={1.123}
            />
            <mesh
              name="Object_8"
              castShadow
              receiveShadow
              geometry={nodes.Object_8.geometry}
              material={materials.surf}
              position={[0, 0, -0.203]}
              scale={1.103}
            />
            <mesh
              name="Object_9"
              castShadow
              receiveShadow
              geometry={nodes.Object_9.geometry}
              material={materials['sand.castle']}
              position={[0.315, 0.136, -0.282]}
            />
          </group>
        </group>
        <mesh
          name="Cylinder"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={materials.Color1}
          position={[0.017, 0.098, 0.009]}
        />
        <group name="Armature" position={[0, -4.012, 0]}>
          <skinnedMesh
            name="Cylinder001"
            geometry={nodes.Cylinder001.geometry}
            material={materials.Color1}
            skeleton={nodes.Cylinder001.skeleton}
          />
          <skinnedMesh
            name="Cylinder002"
            geometry={nodes.Cylinder002.geometry}
            material={materials.Color1}
            skeleton={nodes.Cylinder002.skeleton}
          />
          <primitive object={nodes['1']} />
          <primitive object={nodes['2']} />
          <primitive object={nodes['3']} />
          <primitive object={nodes['4']} />
          <primitive object={nodes['5']} />
          <primitive object={nodes['6']} />
          <primitive object={nodes['7']} />
          <primitive object={nodes['8']} />
          <primitive object={nodes['1001']} />
          <primitive object={nodes['2001']} />
          <primitive object={nodes['3001']} />
          <primitive object={nodes['4001']} />
          <primitive object={nodes['5001']} />
          <primitive object={nodes['6001']} />
          <primitive object={nodes['7001']} />
          <primitive object={nodes['8001']} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('models-3d/Umbrella.glb');
export default Umbrella;
