import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber/native";
import * as THREE from "three";

import marsModel from "../../assets/models/mars.glb";

const Mars = () => {
  const { scene } = useGLTF(marsModel);
  const orbitRef = useRef<THREE.Group>(null);
  const marsRef = useRef<THREE.Object3D>(null);

  useEffect(() => {
    scene.scale.set(0.005, 0.005, 0.005);
    scene.position.set(220, 0, 0); // 220 - 200 = 20 (your original Mars position)
  }, [scene]);

  useFrame((_, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += 0.01 * delta; // Mars orbit speed
    }
    if (marsRef.current) {
      marsRef.current.rotation.y += 0.001 * delta; // Mars self-rotation
    }
  });

  return (
    <group ref={orbitRef} position={[-200, 0, 0]}>
      <primitive object={scene} ref={marsRef} />
    </group>
  );
};

export default Mars;
