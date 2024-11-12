import React, { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Plane, OrbitControls, Sky, Stars } from "@react-three/drei";

const Terrain = () => {
  const height = useLoader(THREE.TextureLoader, "/textures/elevation.png");
  const normals = useLoader(THREE.TextureLoader, "/textures/normals.png");
  const colors = useLoader(THREE.TextureLoader, "/textures/colors.png");

  console.log("Height Map:", height);
  console.log("Normals Map:", normals);
  console.log("Colors Map:", colors);

  return (
    <group>
      <Plane
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -3, 0]}
        args={[64, 64, 64, 64]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          attach="material"
          color="white"
          map={colors}
          metalness={0.2}
          normalMap={normals}
          displacementMap={height}
          displacementScale={1}
      </Plane>
    </group>
  );
};

const OceanBackground = () => {
  return (
    <div className="ocean-background">
      <Canvas
        shadows
        camera={{ position: [0, 0, 10] }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(window.devicePixelRatio);
          gl.setSize(window.innerWidth, window.innerHeight);
          gl.shadowMap.enabled = true; // Habilitar sombras
          gl.shadowMap.type = THREE.PCFSoftShadowMap; // Tipo de sombra
        }}
      >
        <fog attach="fog" args={["white", 0, 26]} />
        <OrbitControls autoRotate={true} autoRotateSpeed={2} />
        <ambientLight intensity={0.3} /> 
        <pointLight intensity={1} position={[7, 5, 1]} castShadow />
        <Sky sunPosition={[7, 5, 1]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade /> {/* Agrega estrellas */}
        <Suspense fallback={null}>
          <Terrain />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default OceanBackground;