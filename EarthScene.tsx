import React from "react";
import { Gltf, Float } from "@react-three/drei/native";
import { animated, useSpring } from "@react-spring/three";
import Earth from "./assets/models/earth.glb";

const EARTH_SCALE = 1.5;

export default function EarthScene() {
  const { scale } = useSpring({
    from: { scale: 0.5 },
    to: { scale: 1 },
  });
  return (
    <group>
      <Gltf src={Earth} scale={[5, 5, 5]} />
    </group>
  );
}
