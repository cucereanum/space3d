import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei/native";

import venusModel from "../../assets/models/venus.glb";

const Venus = () => {
  const { scene } = useGLTF(venusModel);

  scene.scale.set(0.005, 0.005, 0.005);
  scene.position.set(-20, 0, 0);

  return <primitive object={scene} />;
};

export default Venus;
