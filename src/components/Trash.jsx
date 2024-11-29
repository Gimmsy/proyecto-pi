import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useBox } from '@react-three/cannon';

export function Trash(props) {
  const { nodes, materials } = useGLTF('/models-3d/trash.glb');

  // Añadir físicas a los objetos
  const [refA] = useBox(() => ({
    mass: 1,
    position: [-0.5, 0, 0],
    args: [1, 1, 1], // Tamaño del objeto
    restitution: 0.7, // Añadir rebote
  }));

  const [refB] = useBox(() => ({
    mass: 1,
    position: [1.157, -0.365, -1.127],
    rotation: [0, -0.559, 0],
    args: [1.467, 1.467, 1.467], // Tamaño del objeto
    restitution: 0.7, // Añadir rebote
  }));

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={refA}
        castShadow
        receiveShadow
        geometry={nodes.Type_A.geometry}
        material={materials.A}
      />
      <mesh
        ref={refB}
        castShadow
        receiveShadow
        geometry={nodes.Type_B.geometry}
        material={materials.B}
        scale={1.467}
      />
    </group>
  );
}

useGLTF.preload('/models-3d/trash.glb');
export default Trash;