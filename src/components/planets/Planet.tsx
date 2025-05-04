import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber/native";
import * as THREE from "three";

type PlanetProps = {
  model: any;
  distance: number; // from sun
  scale: number;
  rotationSpeed: number;
  orbitSpeed: number;
  yOffset?: number;
};

const Planet = ({
  model,
  distance,
  scale,
  rotationSpeed,
  orbitSpeed,
  yOffset = 0,
}: PlanetProps) => {
  const { scene } = useGLTF(model);
  const orbitRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Object3D>(null);

  useEffect(() => {
    scene.scale.set(scale, scale, scale);
    scene.position.set(distance, yOffset, 0);
  }, [scene]);

  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += rotationSpeed * delta;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.y += orbitSpeed * delta;
    }
  });

  return (
    <group ref={orbitRef}>
      <primitive object={scene} ref={planetRef} />
    </group>
  );
};

export default Planet;
