import React, { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Plane, OrbitControls, Sky } from "@react-three/drei";

const Terrain = () => {
  const height = useLoader(THREE.TextureLoader, "./textures/elevation.png");
  const normals = useLoader(THREE.TextureLoader, "./textures/normals.png");
  const colors = useLoader(THREE.TextureLoader, "./textures/colors.png");

  console.log("Height Map:", height);
  console.log("Normals Map:", normals);
  console.log("Colors Map:", colors);

  return (
    <group>
      <Plane
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -3, 0]}
        args={[64, 64, 256, 256]} // Reducir el número de segmentos
      >
        <meshStandardMaterial
          attach="material"
          color="white"
          map={colors}
          metalness={0.2}
          normalMap={normals}
          displacementMap={height}
          displacementScale={1} // Reducir la escala de desplazamiento
        />
      </Plane>
    </group>
  );
};

const OceanBackground = () => {
  return (
    <div className="ocean-background">
      <Canvas>
        <fog attach="fog" args={["white", 0, 26]} />
        <OrbitControls autoRotate={false} /> {/* Desactivar auto-rotate */}
        <ambientLight intensity={0.3} /> {/* Reducir la intensidad de la luz ambiental */}
        <pointLight intensity={1} position={[7, 5, 1]} /> {/* Reducir la intensidad de la luz puntual */}
        <Sky sunPosition={[7, 5, 1]} />
        <Suspense fallback={null}>
          <Terrain />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default OceanBackground;