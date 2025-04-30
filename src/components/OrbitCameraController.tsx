import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber/native";
import { useSharedValue } from "react-native-reanimated";

const OrbitCameraController = ({ zoomLevel }: { zoomLevel: number }) => {
  const { camera } = useThree();
  const baseZoom = useRef(zoomLevel);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const distance = zoomLevel; // use pinch distance

    const x = Math.sin(t * 0.05) * distance;
    const z = Math.cos(t * 0.05) * distance;

    camera.position.set(x, 1.5, z);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

export default OrbitCameraController;
