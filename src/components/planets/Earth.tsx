import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber/native";
import { useGLTF } from "@react-three/drei/native";
import * as THREE from "three";

import EarthGlb from "../../../assets/models/earth.glb";
import MoonGlb from "../../../assets/models/moon.glb";

const Earth = () => {
  const { scene: earthScene } = useGLTF(EarthGlb);
  const { scene: moonScene } = useGLTF(MoonGlb);

  const earthOrbitRef = useRef<THREE.Group>(null);
  const earthRef = useRef<THREE.Object3D>(null);
  const moonOrbitRef = useRef<THREE.Group>(null);

  useEffect(() => {
    // Earth scale & local position (relative to orbit group)
    earthScene.scale.set(0.15, 0.15, 0.15);
    earthScene.position.set(0, 0, 0);

    // Moon scale & local offset from Earth
    moonScene.scale.set(0.2, 0.2, 0.2);
    moonScene.position.set(3, 0, 0); // Offset from Earth, not global position
  }, [earthScene, moonScene]);

  useFrame((_, delta) => {
    if (earthOrbitRef.current) {
      earthOrbitRef.current.rotation.y += 0.0001; // Earth orbit around Sun
    }

    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0005; // Earth self-rotation
    }

    if (moonOrbitRef.current) {
      moonOrbitRef.current.rotation.y += 0.00003; // Moon orbit around Earth
    }
  });

  return (
    <group ref={earthOrbitRef} position={[-200, 0, 0]}>
      <group ref={earthRef} position={[200, 0, 0]}>
        <primitive object={earthScene} />
        <group ref={moonOrbitRef}>
          <primitive object={moonScene} />
        </group>
      </group>
    </group>
  );
};

export default Earth;
