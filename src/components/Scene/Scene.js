import React, { useEffect } from 'react'
import "./Scene.scss";
import { Canvas } from "@react-three/fiber";
import { Stars, Stats } from "@react-three/drei";
//import { PointerLockControls } from '@react-three/drei'   Leave this commented out for now, will use orbit controls for setting up scene
import { OrbitControls } from "@react-three/drei";
import Map from "./Scenecomponents/Map";
import planetdata from "./ExoplanetHelper";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import BlueGiantImg from "../../assets/textures/blueGasGiant.png";
import RockyWorldImg from "../../assets/textures/rocky.png";
import TanGiantImg from "../../assets/textures/tanGasGiant.png";


function Scene(props) {

  //Textures downloaded under CC0 from OpenGameArt.org
  const textureOptions = useLoader(TextureLoader, [BlueGiantImg, RockyWorldImg, TanGiantImg])

  const textureSelection = Array.from(Array(10), ()=> { return Math.floor(Math.random() * textureOptions.length)})

  const applyTextures = (planetData) => {
    planetData.forEach((planet, i) => {
      planetdata[i] = {...planet, texture: textureOptions[textureSelection[i]]}
    })
  }

  //Modify data here to include textures before passing down
  useEffect(()=>{
    applyTextures(planetdata)
  }, [])

  return (
    <div id="canvas-wrap">
      <Canvas>
        <color attach="background" args={["#000000"]} />
        {/*<PointerLockControls />*/}
        <hemisphereLight />
        <OrbitControls />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <Map data={planetdata} planetSelected={props.planetSelected} />
        {/*<Stats />*/}
      </Canvas>
    </div>
  );
}

export default Scene;
