import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const Crab = (props) => {
  const groupRef = useRef();
  const [clicked, setClicked] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(0.001);

  const { nodes, materials } = useGLTF('/models-3d/Crab.glb');

  const meshRefs = useRef([]);

  const meshData = [
    { name: 'crab1_Crab_0', geometry: nodes.crab1_Crab_0.geometry, material: materials.CrabMaterial, groupName: 'crab1' },
    { name: 'crab2_Crab_0', geometry: nodes.crab2_Crab_0.geometry, material: materials.CrabMaterial, groupName: 'crab2' },
    { name: 'polySurface4_FIsh_0', geometry: nodes.polySurface4_FIsh_0.geometry, material: materials.FishMaterial, groupName: 'FIsh1' },
    { name: 'Glass1_glass_lowdefaultMat1_0', geometry: nodes.Glass1_glass_lowdefaultMat1_0.geometry, material: materials.GlassDefaultMaterial, groupName: 'Glass1' },
    { name: 'Plant3_Grass_0', geometry: nodes.Plant3_Grass_0.geometry, material: materials.GrassMaterial, groupName: 'Plant3' },
    { name: 'Sand_base_Sand_0', geometry: nodes.Sand_base_Sand_0.geometry, material: materials.SandMaterial, groupName: 'Sand_base' },
    { name: 'Sea1_Sea_0', geometry: nodes.Sea1_Sea_0.geometry, material: materials.SeaMaterial, groupName: 'Sea1' },
  ];

  // Guardar colores originales de los materiales
  useEffect(() => {
    meshRefs.current.forEach((mesh, index) => {
      if (mesh) {
        const material = mesh.material;
        material.userData.originalColor = material.color.getHex(); // Guardar color original
      }
    });
  }, []);

  // Manejar clic para alternar color
  const handleClick = () => {
    setClicked((prevClicked) => !prevClicked);

    meshRefs.current.forEach((mesh) => {
      if (mesh) {
        const material = mesh.material;
        if (!clicked) {
          material.color.set('brown'); // Cambiar a color marrón
        } else {
          material.color.setHex(material.userData.originalColor); // Restaurar color original
        }
      }
    });
  };

  // Evento de teclado para controlar la velocidad de rotación
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        setRotationSpeed((prevSpeed) => prevSpeed + 0.001);
      } else if (event.key === 'ArrowDown') {
        setRotationSpeed((prevSpeed) => Math.max(prevSpeed - 0.001, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // // Evento de rueda del mouse para hacer zoom
  // const handleWheel = (event) => {
  //   if (groupRef.current) {
  //     const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1;
  //     groupRef.current.scale.set(
  //       groupRef.current.scale.x * scaleFactor,
  //       groupRef.current.scale.y * scaleFactor,
  //       groupRef.current.scale.z * scaleFactor
  //     );
  //   }
  // };

  // Rotación automática
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group
      {...props}
      ref={groupRef}
      dispose={null}
      // onWheel={handleWheel}
      onClick={handleClick}
    >
      {meshData.map((mesh, index) => (
        <group key={index} name={mesh.groupName}>
          <mesh
            ref={(el) => (meshRefs.current[index] = el)}
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
