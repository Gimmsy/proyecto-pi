import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const Isla = (props) => {
  const group = useRef();
  const { nodes, materials } = useGLTF('/models-3d/20_LightHouse.glb');
  const [emissiveIntensity, setEmissiveIntensity] = useState(1);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.001; // Ajusta la velocidad de rotación aquí para que sea más suave
    }
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        setEmissiveIntensity(2); // Prender la luz
      } else if (event.key === 'ArrowDown') {
        setEmissiveIntensity(0); // Apagar la luz
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
          name="Cube"
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials.Material}
          position={[0, 3.486, 0]}
          scale={3.917}
        />
        <group
          name="Cylinder"
          position={[-2.186, 2.885, -4.276]}
          rotation={[0, 0.331, 0]}
          scale={[0.567, 0.315, 0.567]}>
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
            material={materials['Material.001']}
          >
            <meshStandardMaterial
              attach="material"
              color={materials['Material.001'].color}
              emissive={materials['Material.001'].emissive}
              emissiveIntensity={emissiveIntensity}
              metalness={0.5}
              roughness={0.1}
            />
          </mesh>
        </group>
        <mesh
          name="Cube001"
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.Material}
          position={[-0.225, 2.501, -2.682]}
          rotation={[-2.458, -1.402, 0]}
          scale={[-0.37, -0.299, -0.471]}
        />
        <mesh
          name="Cube002"
          castShadow
          receiveShadow
          geometry={nodes.Cube002.geometry}
          material={materials.Material}
          position={[-0.746, 2.031, 0.025]}
          rotation={[-2.96, 0.942, -0.824]}
          scale={[-0.37, -0.299, -0.471]}
        />
        <mesh
          name="Cube003"
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={nodes.Cube003.material}
          position={[-4.101, 3.102, -3.118]}
          rotation={[-2.96, 0.942, -0.824]}
          scale={[-0.37, -0.299, -0.471]}
        />
        <mesh
          name="Cube004"
          castShadow
          receiveShadow
          geometry={nodes.Cube004.geometry}
          material={materials.Material}
          position={[-4.044, 3.102, 3.045]}
          rotation={[-2.96, 0.942, -0.824]}
          scale={[-0.641, -0.518, -0.814]}
        />
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
        <mesh
          name="Cube009"
          castShadow
          receiveShadow
          geometry={nodes.Cube009.geometry}
          material={materials.Material}
          position={[0.421, 2.941, -4.358]}
          rotation={[-2.136, -1.445, 0.325]}
          scale={[-0.272, -0.219, -0.345]}
        />
        <mesh
          name="Cube010"
          castShadow
          receiveShadow
          geometry={nodes.Cube010.geometry}
          material={materials.Material}
          position={[0.214, 2.824, -4.051]}
          rotation={[-2.136, -1.445, 0.325]}
          scale={[-0.192, -0.155, -0.244]}
        />
        <mesh
          name="Cube011"
          castShadow
          receiveShadow
          geometry={nodes.Cube011.geometry}
          material={materials.Material}
          position={[0.705, 2.824, -4.051]}
          rotation={[-2.941, 1.008, -0.847]}
          scale={[-0.192, -0.155, -0.244]}
        />
        <mesh
          name="Cube012"
          castShadow
          receiveShadow
          geometry={nodes.Cube012.geometry}
          material={materials.Material}
          position={[-2.423, 2.586, 1.45]}
          rotation={[-0.188, -0.965, 2.31]}
          scale={[-0.641, -0.518, -0.814]}
        />
        <mesh
          name="Cube013"
          castShadow
          receiveShadow
          geometry={nodes.Cube013.geometry}
          material={materials.Material}
          position={[1.962, -0.36, 9.622]}
          rotation={[0.056, -0.473, 2.795]}
          scale={[-0.933, -0.754, -1.185]}
        />
        <mesh
          name="Cube014"
          castShadow
          receiveShadow
          geometry={nodes.Cube014.geometry}
          material={materials.Material}
          position={[3.494, -0.36, 4.545]}
          rotation={[0.056, -0.473, 2.795]}
          scale={[-0.933, -0.754, -1.185]}
        />
        <mesh
          name="Cube015"
          castShadow
          receiveShadow
          geometry={nodes.Cube015.geometry}
          material={materials.Material}
          position={[3.494, 0.422, -7.732]}
          rotation={[-2.835, 0.194, 1.259]}
          scale={[-1.379, -1.086, -2.202]}
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
          name="Cube016"
          castShadow
          receiveShadow
          geometry={nodes.Cube016.geometry}
          material={materials.Material}
          position={[-4.345, 0.422, -6.185]}
          rotation={[-0.314, -0.295, -1.916]}
          scale={[-1.379, -1.086, -2.202]}
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

useGLTF.preload('/models-3d/20_LightHouse.glb');
export default Isla;