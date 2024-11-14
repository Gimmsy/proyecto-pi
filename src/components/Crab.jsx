import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Componente para el modelo del cangrejo
const Crab = (props) => {
  // Cargar el modelo GLTF
  const { nodes, materials } = useGLTF('/models-3d/Crab.glb');

  // Pre-cargar el modelo para evitar tiempos de espera
 

  // Definir las partes del modelo
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
            castShadow // Permitir que el modelo proyecte sombras
            receiveShadow // Permitir que el modelo reciba sombras
          />
        </group>
      ))}
    </group>
  );
};

// Componente de la escena completa con el modelo
const CrabScene = () => {
  return (
    <div className="crab-background">
      <Canvas
        shadows
        camera={{ position: [0, 2, 6], fov: 60 }}
        style={{ width: '100%', height: '400px' }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance', // Priorizar el rendimiento
          pixelRatio: Math.min(1.5, window.devicePixelRatio), // Limitar el ratio de píxeles
        }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <fog attach="fog" args={['#d6e0f0', 5, 20]} /> {/* Agregar niebla */}
        <ambientLight intensity={0.25} /> {/* Luz ambiental */}
        <directionalLight
          position={[10, 10, 10]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024} // Resolución de sombras
          shadow-mapSize-height={1024}
        />
        <OrbitControls autoRotate autoRotateSpeed={1} /> {/* Control de la cámara */}

        <Suspense fallback={null}>
          <Crab scale={[0.8, 0.8, 0.8]} /> {/* Escalar el modelo */}
        </Suspense>
      </Canvas>
    </div>
  );
};
useGLTF.preload('/models-3d/Crab.glb');
export default CrabScene;
