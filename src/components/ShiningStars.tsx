import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber/native";
import { Points, PointMaterial, useGLTF } from "@react-three/drei/native";
import * as THREE from "three";

const ShiningStars = ({ count = 2000 }) => {
  const pointsRef = useRef();

  const { positions, speeds } = useMemo(() => {
    const arr = [];
    const spd = [];
    for (let i = 0; i < count; i++) {
      arr.push(
        THREE.MathUtils.randFloatSpread(300),
        THREE.MathUtils.randFloatSpread(300),
        THREE.MathUtils.randFloatSpread(300)
      );
      spd.push(Math.random() * 0.005 + 0.001);
    }
    return { positions: new Float32Array(arr), speeds: spd };
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const t = state.clock.elapsedTime;

    // limit frequency
    if (delta > 0.03) return; // throttle to 30 fps max

    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.attributes.position;

    for (let i = 0; i < posAttr.count; i++) {
      const y = posAttr.getY(i);
      const speed = speeds[i];
      posAttr.setY(i, y + Math.sin(t * speed + i) * 0.01);
    }

    posAttr.needsUpdate = true;

    if (pointsRef.current.material) {
      pointsRef.current.material.opacity = 0.7 + Math.sin(t * 2) * 0.3;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} frustumCulled>
      <PointMaterial
        color="#ffffff"
        size={0.6}
        sizeAttenuation
        transparent
        depthWrite={false}
      />
    </Points>
  );
};

export default ShiningStars;
