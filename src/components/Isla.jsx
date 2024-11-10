import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const  Isla =(props)=> {
  const { nodes, materials } = useGLTF('/models-3d/Isla.glb')
  return (
    <group {...props} dispose={null} position={[0, -10, 0]} scale={[1.5, 1.5, 1.5]}>
      <group name="Scene">
        <mesh name="Cube" geometry={nodes.Cube.geometry} material={materials.None} />
        <mesh
          name="Cube001"
          geometry={nodes.Cube001.geometry}
          material={materials['Material.001']}
        />
        <mesh
          name="Cube003"
          geometry={nodes.Cube003.geometry}
          material={materials['Material.002']}
        />
        <mesh name="Cube004" geometry={nodes.Cube004.geometry} material={materials.None} />
        <mesh name="Cube005" geometry={nodes.Cube005.geometry} material={materials.None} />
        <mesh
          name="Cylinder"
          geometry={nodes.Cylinder.geometry}
          material={materials['Material.003']}
        />
        <mesh name="Plane" geometry={nodes.Plane.geometry} material={materials['Material.004']} />
        <mesh name="Sphere" geometry={nodes.Sphere.geometry} material={materials['Material.009']} />
        <mesh
          name="Sphere001"
          geometry={nodes.Sphere001.geometry}
          material={materials['Material.005']}
        />
        <mesh
          name="Sphere002"
          geometry={nodes.Sphere002.geometry}
          material={materials['Material.006']}
        />
        <mesh
          name="Sphere003"
          geometry={nodes.Sphere003.geometry}
          material={materials['Material.007']}
        />
        <mesh
          name="Sphere004"
          geometry={nodes.Sphere004.geometry}
          material={materials['Material.008']}
        />
        <mesh
          name="Sphere005"
          geometry={nodes.Sphere005.geometry}
          material={materials['Material.010']}
        />
      </group>
    </group>
  )
}

export default Isla;
useGLTF.preload('/models-3d/Isla.glb')