import React from "react";
import { useFrame, useThree } from "@react-three/fiber/native";

const OrbitCameraController = () => {
  const { camera } = useThree(); // get camera from context

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const radius = 5;
    const x = Math.sin(t * 0.1) * radius;
    const z = Math.cos(t * 0.1) * radius;

    camera.position.set(x, 1.5, z);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

export default OrbitCameraController;
