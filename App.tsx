import React, { Suspense, useEffect, useRef, useState } from "react";
import { View, StyleSheet, PanResponder, Dimensions } from "react-native";
import { Canvas } from "@react-three/fiber/native";
import * as THREE from "three";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Earth from "./src/components/Earth";
import OrbitCameraController from "./src/components/OrbitCameraController";
import ShiningStars from "./src/components/ShiningStars";
import Header from "./src/components/Header";

export default function App() {
  const [zoomLevel, setZoomLevel] = useState(5);
  const baseZoomRef = useRef(5);
  const initialDistance = useRef(0); // renamed from lastDistance

  const forceUpdate = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (evt) => {
        const touches = evt.nativeEvent.touches;

        if (touches.length === 2) {
          const dx = touches[0].pageX - touches[1].pageX;
          const dy = touches[0].pageY - touches[1].pageY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (initialDistance.current === null) {
            initialDistance.current = distance;
          }

          const scale = distance / initialDistance.current;
          console.log("Scale:", baseZoomRef.current, scale);
          const newZoom = THREE.MathUtils.clamp(
            baseZoomRef.current / scale,
            3,
            15
          );

          setZoomLevel(newZoom);
          console.log("Zoom Level:", newZoom);
        }
      },

      // Triggered when all touches end
      onPanResponderRelease: () => {
        console.log("Released", zoomLevel);
        baseZoomRef.current = zoomLevel;
        forceUpdate.current = !forceUpdate.current;
        initialDistance.current = null;
      },
    })
  ).current;

  useEffect(() => {
    console.log("Zoom Level Updated:", zoomLevel);
    baseZoomRef.current = zoomLevel;
  }, [forceUpdate.current]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header />

        {/* Canvas renders 3D space */}
        <Canvas camera={{ position: [0, 0, zoomLevel], fov: 75 }}>
          <color attach="background" args={["#000011"]} />
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 10]} intensity={2} />
          <Suspense fallback={null}>
            <ShiningStars />
            <Earth />
            <OrbitCameraController zoomLevel={zoomLevel} />
          </Suspense>
        </Canvas>

        {/* Overlay that captures pinch gestures */}
        <View
          {...panResponder.panHandlers}
          style={StyleSheet.absoluteFill}
          pointerEvents="box-only"
        />
      </View>
    </GestureHandlerRootView>
  );
}
