import { React, useRef } from "react";
import * as THREE from 'three'
import { useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import SunImg from "../../../assets/textures/sun.jpg";
import EarthImg from "../../../assets/textures/earth.jpg";

function Sun({ position, rightClickFunction, leftClickFunction, ...props}) {
  let sunRef = useRef()
  const textures = useLoader(TextureLoader, [SunImg, EarthImg]);
  const sunMap = textures[0]
  const earthMap = textures[1]
  
  useFrame(()=> {
    sunRef.current.rotation.y = sunRef.current.rotation.y + .001
  })

  return (
    <group>
      <mesh ref={sunRef} position={[...position]} onClick={leftClickFunction} onContextMenu={rightClickFunction}> 
        <sphereGeometry args={[0.3, 25]} />
        <meshStandardMaterial map={sunMap} />
      </mesh>
      <mesh onContextMenu={rightClickFunction}>
        <sphereGeometry position={[...position]} args={[.1, 30, 30]} />
        <meshStandardMaterial 
          map={earthMap}
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
