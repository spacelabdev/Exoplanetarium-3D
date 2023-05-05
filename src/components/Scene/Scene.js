import React, { useEffect } from 'react'
import "./Scene.scss";
import { Canvas } from "@react-three/fiber";
import { Stars, Stats } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import Map from "./Scenecomponents/Map";
import System from "./Scenecomponents/System";




const Scene = ({selectedPlanet, planetSelected, planetdata}) => {
  

  return (
    <div id="canvas-wrap">
      <Canvas>
        <color attach="background" args={["#000000"]} />
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
        { selectedPlanet
          ? <System data={selectedPlanet} planetSelected={planetSelected} />
          : <Map data={planetdata} planetSelected={planetSelected} />
        }
        {/*<Stats />*/}
      </Canvas>
    </div>
  );
}

export default Scene;
