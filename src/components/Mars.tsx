import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei/native";

import marsModel from "../../assets/models/mars.glb";

const Mars = () => {
  const { scene } = useGLTF(marsModel);

  scene.scale.set(0.005, 0.005, 0.005);
  scene.position.set(20, 0, 0);

  return <primitive object={scene} />;
};

export default Mars;
