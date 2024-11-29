import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import { useBox, usePlane } from "@react-three/cannon";

const Isla = (props) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models-3d/20_LightHouse.glb");
  const [emissiveIntensity, setEmissiveIntensity] = useState(1);

  const texture1 = useTexture("assets/image/rock_texture.jpg");

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.001; // Ajusta la velocidad de rotación aquí para que sea más suave
    }
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        setEmissiveIntensity(2); // Prender la luz
      } else if (event.key === "ArrowDown") {
        setEmissiveIntensity(0); // Apagar la luz
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Añadir físicas a la isla
  const [refCube] = useBox(() => ({
    mass: 0,
    position: [0, 3.486, 0],
    args: [3.917, 3.917, 3.917], // Tamaño del objeto
  }));

  const [refNewPlane] = usePlane(() => ({
    position: [0, 0, 0], // Ajusta la posición del nuevo plano
    rotation: [-Math.PI / 2, 0.04, 2], // Asegúrate de que el nuevo plano esté horizontal
  }));

  // Añadir físicas a los nuevos cubos
  const [refCube1] = useBox(() => ({
    mass: 1,
    position: [2, 3, 0], // Posición inicial ajustada
    args: [1, 1, 1], // Tamaño del objeto
    restitution: 1, // Añadir rebote continuo
    linearDamping: 0, // Sin amortiguación lineal
    angularDamping: 0, // Sin amortiguación angular
  }));

  const [refCube2] = useBox(() => ({
    mass: 1,
    position: [2, 5, 0], // Posición inicial ajustada
    args: [1, 1, 1], // Tamaño del objeto
    restitution: 1, // Añadir rebote continuo
    linearDamping: 0, // Sin amortiguación lineal
    angularDamping: 0, // Sin amortiguación angular
  }));

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    refCube1.current.position.y = 5 + Math.sin(t * 2) * 0.5; // Movimiento de flotación para Cube1
    refCube2.current.position.y = 5 + Math.sin(t * 2) * 0.5; // Movimiento de flotación para Cube2
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[10, 10, 10]}
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <group name="Scene">
        {/* Isla tierra */}
        <mesh
          ref={refCube}
          name="Cube"
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials.Material}
          position={[0, 3.486, 0]}
          scale={3.917}
        />
        <mesh
          ref={refNewPlane}
          name="NewPlane"
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          position={[0, 0, 0]} // Ajusta la posición del nuevo plano
          rotation={[-Math.PI / 2, 0, 0]} // Asegúrate de que el nuevo plano esté horizontal
          scale={18.54}
        >
          <meshStandardMaterial
            attach="material"
            color="white"
            transparent={true}
            opacity={0} // Ajusta la opacidad para hacer el plano completamente invisible
          />
        </mesh>
        {/* Nuevos cubos */}
        <mesh ref={refCube1} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial map={texture1} />
        </mesh>
        <mesh ref={refCube2} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial map={texture1} />
        </mesh>
        <group
          name="Cylinder"
          position={[-2.186, 2.885, -4.276]}
          rotation={[0, 0.331, 0]}
          scale={[0.567, 0.315, 0.567]}
        >
          {/* las torres */}
          <mesh
            name="Cylinder001"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder001.geometry}
            material={materials.Material}
          />
          {/* Ventanas */}
          <mesh
            name="Cylinder001_1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder001_1.geometry}
            material={materials["Material.001"]}
          >
            <meshStandardMaterial
              attach="material"
              color={materials["Material.001"].color}
              emissive={materials["Material.001"].emissive}
              emissiveIntensity={emissiveIntensity}
              metalness={0.5}
              roughness={0.1}
            />
          </mesh>
        </group>
        <mesh
          name="Cube005"
          castShadow
          receiveShadow
          geometry={nodes.Cube005.geometry}
          material={materials.Material}
          position={[-1.374, 1.063, 6.485]}
          rotation={[-0.208, -1.031, 2.285]}
          scale={[-0.933, -0.754, -1.185]}
        />
        <mesh
          name="Cube006"
          castShadow
          receiveShadow
          geometry={nodes.Cube006.geometry}
          material={materials.Material}
          position={[2.905, 2.04, -1.414]}
          rotation={[-0.109, 0.235, 2.49]}
          scale={[-0.713, -0.576, -0.906]}
        />
        <mesh
          name="Cube007"
          castShadow
          receiveShadow
          geometry={nodes.Cube007.geometry}
          material={materials.Material}
          position={[1.748, 2.898, -5.376]}
          rotation={[-0.128, -0.587, 2.394]}
          scale={[-1.136, -0.918, -1.443]}
        />
        <mesh
          name="Cube008"
          castShadow
          receiveShadow
          geometry={nodes.Cube008.geometry}
          material={materials.Material}
          position={[2.532, 2.656, -4.693]}
          rotation={[-2.136, -1.445, 0.325]}
          scale={[-0.272, -0.219, -0.345]}
        />

        {/* el oceano */}
        <mesh
          name="Plane"
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          material={materials.Material}
          position={[0.028, 0.443, 0.461]}
          scale={18.54}
        />

        <mesh
          name="Cube017"
          castShadow
          receiveShadow
          geometry={nodes.Cube017.geometry}
          material={materials.Material}
          position={[-4.345, 0.422, 6.492]}
          rotation={[-0.314, -0.295, -1.916]}
          scale={[-1.379, -1.086, -2.202]}
        />
        <mesh
          name="Cube018"
          castShadow
          receiveShadow
          geometry={nodes.Cube018.geometry}
          material={materials.Material}
          position={[-4.345, -0.62, -4.837]}
          rotation={[-0.314, -0.295, -1.916]}
          scale={[-1.162, -0.915, -1.856]}
        />
        <mesh
          name="Cube019"
          castShadow
          receiveShadow
          geometry={nodes.Cube019.geometry}
          material={materials.Material}
          position={[12.001, -1.209, 5.409]}
          rotation={[-2.835, 0.194, 1.259]}
          scale={[-1.927, -1.518, -3.077]}
        />
        <mesh
          name="Cube020"
          castShadow
          receiveShadow
          geometry={nodes.Cube020.geometry}
          material={materials.Material}
          position={[5.119, -0.41, 14.529]}
          rotation={[-0.301, 0.082, -1.796]}
          scale={[-1.121, -0.883, -1.79]}
        />
        <group
          name="Area"
          position={[-1.763, 6.513, -3.487]}
          rotation={[0.19, -1.21, 1.356]}
          scale={0.725}
        />
      </group>
    </group>
  );
};

useGLTF.preload("/models-3d/20_LightHouse.glb");
export default Isla;
