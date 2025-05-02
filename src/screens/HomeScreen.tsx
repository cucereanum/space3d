import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { Canvas } from "@react-three/fiber/native";
import * as THREE from "three";

import Earth from "../components/Earth";
import OrbitCameraController from "../components/OrbitCameraController";
import ShiningStars from "../components/ShiningStars";
import Header from "../components/Header";
import Sun from "../components/Sun";
import Venus from "../components/Venus";
import Mercury from "../components/Mercury";
import Mars from "../components/Mars";
import Jupiter from "../components/Jupiter";
import Saturn from "../components/Saturn";
import Uranus from "../components/Uranus";
import Neptune from "../components/Neptune";

const HomeScreen = () => {
  const [zoomLevel, setZoomLevel] = useState(5);
  const [angle, setAngle] = useState(0); // camera rotation angle
  const [realisticLighting, setRealisticLighting] = useState(false);
  const baseAngleRef = useRef(0); // renamed from lastAngle
  const baseZoomRef = useRef(5);
  const initialDistance = useRef<number | null>(0); // renamed from lastDistance
  const lastTouchX = useRef<number | null>(0);
  const earthRef = useRef<THREE.Object3D>(null);

  const [isTouching, setIsTouching] = useState(false);

  const forceUpdate = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (evt) => {
        const touches = evt.nativeEvent.touches;
        setIsTouching(true);
        if (touches.length === 1) {
          const x = touches[0].pageX;

          if (lastTouchX.current !== null) {
            const dx = x - lastTouchX.current;
            const deltaAngle = dx * 0.005;

            const newAngle = baseAngleRef.current + deltaAngle;
            setAngle((prevAngle) => {
              const next = prevAngle + deltaAngle;
              return next;
            });
          }

          lastTouchX.current = x;
        } else if (touches.length === 2) {
          const dx = touches[0].pageX - touches[1].pageX;
          const dy = touches[0].pageY - touches[1].pageY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (initialDistance.current === null) {
            initialDistance.current = distance;
          }

          const scale = distance / initialDistance.current;
          const newZoom = THREE.MathUtils.clamp(
            baseZoomRef.current / scale,
            3,
            15
          );

          setZoomLevel(newZoom);
        }
      },

      // Triggered when all touches end
      onPanResponderRelease: () => {
        baseZoomRef.current = zoomLevel;
        setIsTouching(false);
        forceUpdate.current = !forceUpdate.current; // trigger re-render
        if (angle !== null) {
          baseAngleRef.current = angle;
        }

        initialDistance.current = null;
        lastTouchX.current = null;
      },
    })
  ).current;

  useEffect(() => {
    baseZoomRef.current = zoomLevel;
    baseAngleRef.current = angle;
    setIsTouching(false);
  }, [forceUpdate.current]);

  return (
    <View style={{ flex: 1 }}>
      {/* Canvas renders 3D space */}
      <Canvas camera={{ position: [0, 0, zoomLevel], fov: 75 }}>
        <color attach="background" args={["#000011"]} />
        {realisticLighting ? (
          <>
            <ambientLight intensity={0} />
            <directionalLight position={[-20, 0, 0]} intensity={2} />
          </>
        ) : (
          <>
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={0.5} />
          </>
        )}
        <Suspense fallback={null}>
          <ShiningStars />
          <Saturn />
          <Mercury />
          <Earth />
          <Venus />
          <Mars />
          <Jupiter />

          <Uranus />
          <Neptune />

          <Sun />
          <OrbitCameraController
            zoomLevel={zoomLevel}
            manualAngle={angle}
            isTouching={isTouching}
          />
        </Suspense>
      </Canvas>

      {/* Overlay that captures pinch gestures */}
      <View
        {...panResponder.panHandlers}
        style={StyleSheet.absoluteFill}
        pointerEvents="box-only"
      />
      <TouchableOpacity
        onPress={() => setRealisticLighting(!realisticLighting)}
        style={{
          position: "absolute",
          bottom: 40,
          left: 20,
          backgroundColor: "#ffffff33",
          padding: 10,
          borderRadius: 10,
          zIndex: 1000,
        }}
      >
        <Text style={{ color: "white" }}>
          Toggle Lighting: {realisticLighting ? "Realistic" : "Global"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
