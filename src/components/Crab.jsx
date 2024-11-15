import React from 'react';
import { useGLTF } from '@react-three/drei';

const Crab = (props) => {
  const { nodes, materials } = useGLTF('/models-3d/Crab.glb');

  const meshData = [
    { name: 'crab1_Crab_0', geometry: nodes.crab1_Crab_0.geometry, material: materials.CrabMaterial, groupName: 'crab1' },
    { name: 'crab2_Crab_0', geometry: nodes.crab2_Crab_0.geometry, material: materials.CrabMaterial, groupName: 'crab2' },
    { name: 'polySurface4_FIsh_0', geometry: nodes.polySurface4_FIsh_0.geometry, material: materials.FishMaterial, groupName: 'FIsh1' },
    { name: 'Glass1_glass_lowdefaultMat1_0', geometry: nodes.Glass1_glass_lowdefaultMat1_0.geometry, material: materials.GlassDefaultMaterial, groupName: 'Glass1' },
    { name: 'Plant3_Grass_0', geometry: nodes.Plant3_Grass_0.geometry, material: materials.GrassMaterial, groupName: 'Plant3' },
    { name: 'Sand_base_Sand_0', geometry: nodes.Sand_base_Sand_0.geometry, material: materials.SandMaterial, groupName: 'Sand_base' },
    { name: 'Sea1_Sea_0', geometry: nodes.Sea1_Sea_0.geometry, material: materials.SeaMaterial, groupName: 'Sea1' },
  ];

  return (
    <group {...props} dispose={null}>
      {meshData.map((mesh, index) => (
        <group key={index} name={mesh.groupName}>
          <mesh
            name={mesh.name}
            geometry={mesh.geometry}
            material={mesh.material}
            castShadow
            receiveShadow
          />
        </group>
      ))}
    </group>
  );
};

useGLTF.preload('/models-3d/Crab.glb');
export default Crab;
