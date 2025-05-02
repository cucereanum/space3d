import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber/native";
import * as THREE from "three";

import neptuneModel from "../../assets/models/neptune.glb";

const Neptune = () => {
  const { scene } = useGLTF(neptuneModel);
  const orbitRef = useRef<THREE.Group>(null);
  const neptuneRef = useRef<THREE.Object3D>(null);

  useEffect(() => {
    // Set size and initial relative position (from the orbit center)
    scene.scale.set(0.01, 0.01, 0.01);
    scene.position.set(400, 0, 0); // Position relative to orbit center
  }, [scene]);

  useFrame((_, delta) => {
    // Orbit around the Sun (very slow)
    if (orbitRef.current) {
      orbitRef.current.rotation.y += 0.0005 * delta;
    }

    // Neptune's self-rotation
    if (neptuneRef.current) {
      neptuneRef.current.rotation.y += 0.0015 * delta;
    }
  });

  return (
    <group ref={orbitRef} position={[-200, 0, 0]}>
      <primitive object={scene} ref={neptuneRef} />
    </group>
  );
};

export default Neptune;
