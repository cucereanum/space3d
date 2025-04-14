// App.tsx
import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { View } from "react-native";
import { Canvas, useFrame } from "@react-three/fiber/native";
import { Points, PointMaterial, useGLTF } from "@react-three/drei/native";
import * as THREE from "three";
import Earth from "./src/components/Earth";
import { StatusBar } from "expo-status-bar";

export function ShiningStars({ count = 2000 }) {
  const pointsRef = useRef();

  // Create random star positions and initial flicker speeds
  const { positions, speeds } = useMemo(() => {
    const arr = [];
    const spd = [];
    for (let i = 0; i < count; i++) {
      arr.push(
        THREE.MathUtils.randFloatSpread(300),
        THREE.MathUtils.randFloatSpread(300),
        THREE.MathUtils.randFloatSpread(300)
      );
      spd.push(Math.random() * 0.005 + 0.001); // each star moves slightly differently
    }
    return { positions: new Float32Array(arr), speeds: spd };
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.attributes.position;

    for (let i = 0; i < posAttr.count; i++) {
      const y = posAttr.getY(i);
      const speed = speeds[i];
      posAttr.setY(i, y + Math.sin(t * speed + i) * 0.01); // vertical shimmer
    }
    posAttr.needsUpdate = true;

    if (pointsRef.current?.material) {
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
}
export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={["#000011"]} />
        {/* <ambientLight intensity={1} /> */}
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <Suspense fallback={null}>
          <ShiningStars />
          <Earth />
        </Suspense>
      </Canvas>
    </View>
  );
}
