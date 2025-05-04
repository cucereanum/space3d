import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber/native";
import * as THREE from "three";

import venusModel from "../../../assets/models/venus.glb";

const Venus = () => {
  const { scene } = useGLTF(venusModel);
  const orbitRef = useRef<THREE.Group>(null);
  const venusRef = useRef<THREE.Object3D>(null);

  useEffect(() => {
    // Scale Venus (already smaller)
    scene.scale.set(0.005, 0.005, 0.005);

    // Position Venus relative to orbit center (Sun is at -200)
    scene.position.set(180, 0, 0); // So actual world position becomes -20
  }, [scene]);

  useFrame((_, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += 0.005 * delta; // Venus orbit speed (slower)
    }
    if (venusRef.current) {
      venusRef.current.rotation.y += -0.0005 * delta; // Retrograde rotation (slower, reversed)
    }
  });

  return (
    <group ref={orbitRef} position={[-200, 0, 0]}>
      <primitive object={scene} ref={venusRef} />
    </group>
  );
};

export default Venus;
