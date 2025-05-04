import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber/native";
import * as THREE from "three";

import jupiterModel from "../../../assets/models/jupiter.glb";

const Jupiter = () => {
  const { scene } = useGLTF(jupiterModel);
  const orbitRef = useRef<THREE.Group>(null);
  const jupiterRef = useRef<THREE.Object3D>(null);

  useEffect(() => {
    scene.scale.set(0.2, 0.2, 0.2);
    scene.position.set(260, 0, 0); // 260 - 200 = 60 (world position stays the same)
  }, [scene]);

  useFrame((_, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += 0.001 * delta; // Jupiter's slower orbit
    }
    if (jupiterRef.current) {
      jupiterRef.current.rotation.y += 0.002 * delta; // Fast spin (Jupiter has fast rotation)
    }
  });

  return (
    <group ref={orbitRef} position={[-200, 0, 0]}>
      <primitive object={scene} ref={jupiterRef} />
    </group>
  );
};

export default Jupiter;
