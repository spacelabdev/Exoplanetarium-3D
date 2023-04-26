import { React, useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber"
import { Instance } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import BlueGiantImg from "../../../assets/textures/blueGasGiant.png";
import RockyWorldImg from "../../../assets/textures/rocky.png";
import TanGiantImg from "../../../assets/textures/tanGasGiant.png";

function Planet({ data, numPlanets, planetSelected, ...props }) {
  const ref = useRef();

  //Textures downloaded under CC0 from OpenGameArt.org
  const textureOptions = [useLoader(TextureLoader, BlueGiantImg), useLoader(TextureLoader, RockyWorldImg), useLoader(TextureLoader, TanGiantImg)]

  useEffect(() => {
    for (let d = 0; d < numPlanets; ++d) {
      const x =
        props.distance *
        Math.cos(props.declination) *
        Math.cos(props.rightAscension);
      const y =
        props.distance *
        Math.cos(props.declination) *
        Math.sin(props.rightAscension);
      const z = props.distance * Math.sin(props.declination);
      ref.current.position.set(x, y, z);
    }
  }, [data, numPlanets]);

  return (
    <group {...props}>
      <Instance ref={ref} >
        <mesh 
          onClick={() => planetSelected(props)}
          onPointerMissed={() => planetSelected(null)}>
          <sphereGeometry args={[0.1, 30, 30]} />
          <meshBasicMaterial 
            map={textureOptions[Math.floor(Math.random() * 3)]}
            vertexColors={false}
            color="white"
            />
        </mesh>
      </Instance>
    </group>
  );
}

export default Planet;
