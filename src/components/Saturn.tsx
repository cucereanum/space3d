import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei/native";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber/native";

import saturnModel from "../../assets/models/saturn.glb";

const Saturn = () => {
  const { scene } = useGLTF(saturnModel);
  const orbitRef = useRef<THREE.Group>(null);
  const saturnRef = useRef<THREE.Object3D>(null);

  useEffect(() => {
    // Set planet scale
    scene.scale.set(0.1, 0.1, 0.1);

    // Position Saturn relative to orbit center
    scene.position.set(320, 0, 0); // distance from sun (orbit radius)

    // Ensure proper lighting by using a physical material
    scene.traverse((child) => {
      if (child.isMesh) {
        const oldMat = child.material as THREE.MeshStandardMaterial;

        child.material = new THREE.MeshStandardMaterial({
          map: oldMat.map || null,
          metalness: 0.4,
          roughness: 1,
        });
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    // Orbit around sun
    if (orbitRef.current) {
      orbitRef.current.rotation.y += 0.005 * delta; // slower than inner planets
    }

    // Self-rotation
    if (saturnRef.current) {
      saturnRef.current.rotation.y += 0.001 * delta;
    }
  });

  return (
    <group ref={orbitRef} position={[-200, 0, 0]}>
      <primitive object={scene} ref={saturnRef} />
    </group>
  );
};

export default Saturn;
