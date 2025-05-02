import React, { useMemo, useRef } from "react";
import { Points } from "@react-three/drei/native";
import * as THREE from "three";

const StarColors = ["#ffffff", "#dddddd", "#ffffaa", "#ffaa55", "#ff8888"];

const ShiningStars = ({ count = 8000 }) => {
  const pointsRef = useRef();

  const { positions, colors, sizes, speeds } = useMemo(() => {
    const pos = [];
    const col = [];
    const sizeArr = [];
    const spd = [];

    for (let i = 0; i < count; i++) {
      let x, y, z;

      // Keep stars away from the solar system (e.g., 20+ units from center)
      do {
        x = THREE.MathUtils.randFloatSpread(300);
        y = THREE.MathUtils.randFloatSpread(300);
        z = THREE.MathUtils.randFloatSpread(300);
      } while (Math.sqrt(x * x + y * y + z * z) < 30);

      pos.push(x, y, z);

      // Random color from selection
      const color = new THREE.Color(
        StarColors[Math.floor(Math.random() * StarColors.length)]
      );
      col.push(color.r, color.g, color.b);

      // Random size (small, subtle)
      sizeArr.push(Math.random() * 0.4 + 0.2);

      // Flicker speed
      spd.push(Math.random() * 0.005 + 0.001);
    }

    return {
      positions: new Float32Array(pos),
      colors: new Float32Array(col),
      sizes: new Float32Array(sizeArr),
      speeds: spd,
    };
  }, [count]);

  // Optional: use useFrame to animate flicker/shimmer

  return (
    <Points
      ref={pointsRef}
      positions={positions}
      colors={colors}
      frustumCulled
      stride={3}
    >
      <pointsMaterial
        vertexColors
        size={0.3}
        sizeAttenuation
        transparent
        opacity={0.3}
        depthWrite={false}
      />
    </Points>
  );
};

export default ShiningStars;
