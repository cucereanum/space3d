import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei/native";
import * as THREE from "three";

import mercuryModel from "../../assets/models/mercury.glb";

const Mercury = () => {
  const { scene } = useGLTF(mercuryModel);

  useEffect(() => {
    scene.scale.set(0.05, 0.05, 0.05); // Smaller than Earth
    scene.position.set(-100, 0, 0);
    // Traverse and fix materials
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const oldMat = child.material;
        child.material = new THREE.MeshStandardMaterial({
          map: oldMat.map || null,
          metalness: 0.4,
          roughness: 1,
        });
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
};

export default Mercury;
