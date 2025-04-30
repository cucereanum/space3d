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
  const baseAngle = useRef(0);
  const wasTouching = useRef(false);

  useFrame((state, delta) => {
    let angle;

    // Detect touch release
    if (wasTouching.current && !isTouching) {
      // Touch just ended: resume from current manual angle
      baseAngle.current = manualAngle;
      elapsed.current = 0; // reset internal timer
    }

    wasTouching.current = isTouching;
    if (isTouching) {
      // While touching: use manual angle
      angle = manualAngle;
    } else {
      // Auto-rotate after release
      elapsed.current += delta;
      angle = baseAngle.current + elapsed.current * 0.05;
    }
    const x = Math.sin(angle) * zoomLevel;
    const z = Math.cos(angle) * zoomLevel;

    camera.position.set(x, 1.5, z);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

export default OrbitCameraController;
