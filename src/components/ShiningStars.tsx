import React, { useMemo, useRef } from "react";
import { Points, PointMaterial, useGLTF } from "@react-three/drei/native";
import * as THREE from "three";

const ShiningStars = ({ count = 10000 }) => {
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

  return (
    <Points ref={pointsRef} positions={positions} frustumCulled>
      <PointMaterial
        color="yellow"
        size={0.4}
        sizeAttenuation
        transparent
        depthWrite={false}
      />
    </Points>
  );
};

export default ShiningStars;

// import React, { useMemo, useRef } from "react";
// import { useGLTF } from "@react-three/drei/native";
// import { useFrame } from "@react-three/fiber/native";
// import * as THREE from "three";

// import StarGlb from "../../assets/models/star.glb";

// const ShiningStars = ({ count = 200 }) => {
//   const { scene: starModel } = useGLTF(StarGlb);
//   const groupRef = useRef();

//   const stars = useMemo(() => {
//     const arr = [];
//     for (let i = 0; i < count; i++) {
//       const position = new THREE.Vector3(
//         THREE.MathUtils.randFloatSpread(300),
//         THREE.MathUtils.randFloatSpread(300),
//         THREE.MathUtils.randFloatSpread(300)
//       );
//       arr.push(position);
//     }
//     return arr;
//   }, [count]);

//   useFrame((state) => {
//     if (!groupRef.current) return;

//     groupRef.current.rotation.y += 0.001;
//     groupRef.current.rotation.x += 0.0005;
//   });

//   return (
//     <group ref={groupRef}>
//       {stars.map((pos, index) => (
//         <primitive
//           key={index}
//           object={starModel.clone()} // very important: clone it
//           position={pos}
//           scale={[3, 3, 3]}
//         />
//       ))}
//     </group>
//   );
// };

// export default ShiningStars;
