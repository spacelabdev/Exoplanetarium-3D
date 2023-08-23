import { React, useRef } from "react";
import * as THREE from 'three'
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
    <group>
      <mesh ref={ref} position={[...position]}> 
        <sphereGeometry args={[0.3, 25]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>
      <mesh rotation-x={Math.PI / 2}>
        <planeGeometry position={[...position]} args={[.4, .4]} />
        <meshStandardMaterial 
          color={"#adadad"}
          transparent={true}
          opacity={.25}
          side={THREE.DoubleSide}
           />
      </mesh>
    </group>
    
  );
}

export default Sun;
