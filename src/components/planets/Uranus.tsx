import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber/native";
import * as THREE from "three";

import uranusModel from "../../../assets/models/uranus.glb";

const Uranus = () => {
  const { scene } = useGLTF(uranusModel);
  const orbitRef = useRef<THREE.Group>(null);
  const uranusRef = useRef<THREE.Object3D>(null);

  useEffect(() => {
    scene.scale.set(0.01, 0.01, 0.01);
    scene.position.set(350, 0, 0); // distance from orbit center (Sun at -200)

    // Apply lighting-compatible material
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
      orbitRef.current.rotation.y += 0.001 * delta; // slower orbit
    }

    // Self-rotation (Uranus has an axial tilt, could be enhanced)
    if (uranusRef.current) {
      uranusRef.current.rotation.y += 0.0015 * delta;
    }
  });

  return (
    <group ref={orbitRef} position={[-200, 0, 0]}>
      <primitive object={scene} ref={uranusRef} />
    </group>
  );
};

export default Uranus;
