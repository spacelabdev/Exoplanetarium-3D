import { React, useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import SunImg from "../../../assets/textures/sun.jpg";

function Sun({ position, ...props }) {
  let ref = useRef()
  const colorMap = useLoader(TextureLoader, SunImg);
  useFrame(()=> {
    ref.current.rotation.y = ref.current.rotation.y + .001
  })

  return (
    <mesh ref={ref}> 
      <sphereGeometry position={position} args={[0.3, 25]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
}

export default Sun;
