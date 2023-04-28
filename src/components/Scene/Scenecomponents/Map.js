import { React, useEffect, useRef } from "react";
import { extend } from "@react-three/fiber";
import { Instances } from "@react-three/drei";
import * as THREE from "three";
import Planet from "./Planet";
import Sun from "./Sun";
import PlanetName from "./PlanetName";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import BlueGiantImg from "../../../assets/textures/blueGasGiant.png";
import RockyWorldImg from "../../../assets/textures/rocky.png";
import TanGiantImg from "../../../assets/textures/tanGasGiant.png";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
extend({ TextGeometry });


/*https://codesandbox.io/s/floating-instanced-shoes-h8o2d*/
//Converting from celestial coordinates to cartesian coordinates
//https://math.stackexchange.com/questions/2196866/how-to-calculate-spherical-coordinate-x-y-z-of-a-star-from-magnitude-declin
//http://faraday.uwyo.edu/~admyers/ASTR5160/handouts/51605.pdf

const font = new FontLoader().parse(helvetiker);

function Map({ planetSelected, data }) {
  const numPlanets = data.length;

  const textureSelection = Array.from(Array(10), ()=> { return Math.floor(Math.random() * 3)})

  //Textures downloaded under CC0 from OpenGameArt.org
  const textureOptions = useLoader(TextureLoader, [BlueGiantImg, RockyWorldImg, TanGiantImg])
  
  // useEffect(()=>{
  //   for (let i = 0; i < numPlanets; i++){
  //     randNum.push(Math.floor(Math.random() * 3))
  //   }
  //   console.log(randNum)
  // }, [])

  return (
    <>
      <Sun position={[0, 0, 0]} />
      <Instances limit={numPlanets} range={1000}>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshLambertMaterial color="purple" />
        {data.map((props, i) => { return (
          <Planet
            key={i}
            texture={textureOptions[textureSelection[i]]}
            data={data}
            numPlanets={numPlanets}
            planetSelected={planetSelected}
            {...props}
          />
        )})}
      </Instances>

      <Instances limit={numPlanets} range={1000}>
        <textGeometry args={["", { font, size: 0.06, height: 0.001 }]} />
        <meshLambertMaterial color={"white"} />
        {data.map((props, i) => (
          <PlanetName key={i} id={i} {...props} />
        ))}
      </Instances>
    </>
  );
}

export default Map;
