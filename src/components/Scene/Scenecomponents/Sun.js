import { React } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import SunImg from "../../../assets/textures/sun.jpg";

function Sun({ position, ...props }) {
  const colorMap = useLoader(TextureLoader, SunImg);
  return (
    <mesh>
      <sphereGeometry position={position} args={[0.3, 25]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
}

export default Sun;
