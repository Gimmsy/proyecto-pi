import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

function Umbrella(props) {
  const umbrellaRef = useRef();
  const { nodes, materials, animations } = useGLTF('models-3d/Umbrella.glb');
  const { actions } = useAnimations(animations, umbrellaRef);
  const [isOpen, setIsOpen] = useState(false); // Estado para alternar entre abrir y cerrar

  const toggleUmbrella = useCallback(() => {
    setIsOpen((prev) => !prev); // Alternar estado al hacer clic
  }, []);

  useEffect(() => {
    const actionName = 'Armature|Armature|ArmatureAction'; // Nombre exacto de la animación

    if (actions[actionName]) {
      if (isOpen) {
        // Abrir la sombrilla
        actions[actionName]?.fadeIn(0.5).play();
      } else {
        // Cerrar la sombrilla
        const action = actions[actionName]?.fadeIn(0.5).play().reset();
        if (action) {
          action.paused = true;
        }
      }
    }

    return () => {
      // Limpiar acciones previas para evitar solapamientos
      actions[actionName]?.fadeOut(0.5).stop();
    };
  }, [actions, isOpen]);

  return (
    <group ref={umbrellaRef} {...props} dispose={null} onClick={toggleUmbrella}>
      <group name="Scene">
        <mesh
          name="Cylinder"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={materials.Color1}
          position={[0.014, 1.54, 0.007]}
          scale={0.745}
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
  );
}

useGLTF.preload('models-3d/Umbrella.glb');
export default Umbrella;
