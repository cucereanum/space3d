import React, { Suspense, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber/native";
import { useGLTF } from "@react-three/drei/native";
import * as THREE from "three";

import SunGlb from "../../assets/models/sun.glb";

const Sun = () => {
  const { scene } = useGLTF(SunGlb);

  // Optional: scale the sun
  scene.scale.set(2, 2, 2);
  scene.position.set(-200, 0, 0); // left of Earth

  return <primitive object={scene} />;
};

export default Sun;
