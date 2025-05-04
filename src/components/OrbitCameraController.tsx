import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber/native";

const OrbitCameraController = ({
  zoomLevel,
  manualAngle,
  isTouching,
}: {
  zoomLevel: number;
  manualAngle: number;
  isTouching: boolean;
}) => {
  const { camera } = useThree();
  const elapsed = useRef(0);
  const baseAngle = useRef(Math.PI / 4); // starting from top-right
  const wasTouching = useRef(false);

  const fixedY = zoomLevel * 0.6; // elevated view
  const distance = zoomLevel;

  useFrame((_, delta) => {
    let angle;

    if (wasTouching.current && !isTouching) {
      baseAngle.current = manualAngle;
      elapsed.current = 0;
    }

    wasTouching.current = isTouching;

    if (isTouching) {
      angle = manualAngle;
    } else {
      elapsed.current += delta;
      angle = baseAngle.current + elapsed.current * 0.015; // slow orbit
    }

    const x = Math.sin(angle) * distance;
    const z = Math.cos(angle) * distance;

    camera.position.set(x, fixedY, z);
    camera.lookAt(0, 0, 0); // center (Sun)
  });

  return null;
};

export default OrbitCameraController;
