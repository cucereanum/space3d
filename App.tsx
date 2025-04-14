// App.tsx
import React, { Suspense } from "react";
import { View } from "react-native";
import { Canvas } from "@react-three/fiber/native";
import Earth from "./src/components/Earth";
import { StatusBar } from "expo-status-bar";
import ShiningStars from "./src/components/ShiningStars";
import OrbitCameraController from "./src/components/OrbitCameraController";

// function OrbitCameraController() {
//   const { camera } = useThree();
//   const radius = 5;
//   const angle = useRef({ x: 0, y: 0 });

//   const isDragging = useRef(false);
//   const lastPos = useRef({ x: 0, y: 0 });

//   const handlePointerDown = (e) => {
//     console.log("Pointer Down", e.nativeEvent);
//     isDragging.current = true;
//     lastPos.current = { x: e.nativeEvent.pageX, y: e.nativeEvent.pageY };
//   };

//   const handlePointerUp = () => {
//     console.log("Pointer Up");
//     isDragging.current = false;
//   };

//   const handlePointerMove = (e) => {
//     console.log("Pointer Move", e.nativeEvent);
//     if (!isDragging.current) return;

//     const deltaX = e.nativeEvent.pageX - lastPos.current.x;
//     const deltaY = e.nativeEvent.pageY - lastPos.current.y;

//     angle.current.x -= deltaX * 0.005;
//     angle.current.y += deltaY * 0.005;

//     // Clamp vertical angle
//     angle.current.y = THREE.MathUtils.clamp(
//       angle.current.y,
//       -Math.PI / 2.2,
//       Math.PI / 2.2
//     );

//     lastPos.current = { x: e.nativeEvent.pageX, y: e.nativeEvent.pageY };
//   };

//   useFrame(() => {
//     const x = Math.sin(angle.current.x) * radius;
//     const z = Math.cos(angle.current.x) * radius;
//     const y = Math.sin(angle.current.y) * radius;

//     camera.position.set(x, y, z);
//     camera.lookAt(0, 0, 0);
//   });
//   return (
//     <mesh
//       position={[0, 0, 0]}
//       onPointerDown={handlePointerDown}
//       onPointerMove={handlePointerMove}
//       onPointerUp={handlePointerUp}
//       onPointerLeave={handlePointerUp}
//     >
//       <planeGeometry args={[1000, 1000]} />
//       <meshBasicMaterial transparent opacity={0} />
//     </mesh>
//   );
// }
export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={["#000011"]} />
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <Suspense fallback={null}>
          <ShiningStars />
          <Earth />
          <OrbitCameraController />
        </Suspense>
      </Canvas>
    </View>
  );
}
