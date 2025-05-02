import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber/native";
import * as THREE from "three";

import mercuryModel from "../../assets/models/mercury.glb";

const Mercury = () => {
  const { scene } = useGLTF(mercuryModel);
  const orbitRef = useRef<THREE.Group>(null);
  const mercuryRef = useRef<THREE.Object3D>(null);

  useEffect(() => {
    // Scale Mercury
    scene.scale.set(0.05, 0.05, 0.05);

    // Position Mercury relative to orbit center (the Sun at -200)
    scene.position.set(100, 0, 0); // 100 units away from orbit center
    // So actual position will become: [-200 + 100 = -100, 0, 0]

    // Improve lighting response
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const oldMat = child.material;
        child.material = new THREE.MeshStandardMaterial({
          map: oldMat.map || null,
          metalness: 0.4,
          roughness: 1,
        });
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += 0.01 * delta; // Mercury orbit speed
    }
    if (mercuryRef.current) {
      mercuryRef.current.rotation.y += 0.002 * delta; // Mercury rotation
    }
  });

  return (
    <group ref={orbitRef} position={[-200, 0, 0]}>
      <primitive object={scene} ref={mercuryRef} />
    </group>
  );
};

export default Mercury;
