import React, { Suspense, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber/native";
import { useGLTF } from "@react-three/drei/native";
import * as THREE from "three";

import EarthGlb from "../../assets/models/earth.glb";
import MoonGlb from "../../assets/models/moon.glb";

const Earth = () => {
  const { scene: earthScene } = useGLTF(EarthGlb);
  const { scene: moonScene } = useGLTF(MoonGlb);
  const moonRef = useRef<THREE.Object3D>();
  const moonOrbitRef = useRef<THREE.Group>();

  useEffect(() => {
    // Scale Earth
    earthScene.scale.set(0.15, 0.15, 0.15);

    // Scale Moon smaller
    moonScene.scale.set(0.2, 0.2, 0.2);

    // Position Moon at some distance along X axis initially
    moonScene.position.set(3, 0, 0);
  }, [earthScene, moonScene]);

  useFrame((state, delta) => {
    // Rotate Earth slowly
    earthScene.rotation.y += 0.005;

    // Rotate Moon Orbit around Earth
    if (moonOrbitRef.current) {
      moonOrbitRef.current.rotation.y += 0.003; // control speed of moon orbit
    }
  });

  return (
    <group>
      {/* Earth */}
      <primitive object={earthScene} />

      {/* Moon orbiting around Earth */}
      <group ref={moonOrbitRef}>
        <primitive object={moonScene} ref={moonRef} />
      </group>
    </group>
  );
};

export default Earth;
