import React, { Suspense, useEffect } from "react";
import { useFrame } from "@react-three/fiber/native";
import { useGLTF, Environment } from "@react-three/drei/native";
import * as THREE from "three";
import EarthGlb from "../../assets/models/earth.glb";

const Earth = () => {
  const { scene } = useGLTF(EarthGlb);

  useEffect(() => {
    scene.scale.set(0.1, 0.1, 0.1);
  }, [scene]);

  useFrame(() => {
    scene.rotation.y += 0.005;
  });

  return <primitive object={scene} />;
};

export default Earth;
