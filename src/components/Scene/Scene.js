import React, { useEffect, useRef, useState } from 'react'
import "./Scene.scss";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from 'three'
import { Stars, Stats } from "@react-three/drei";
//import { PointerLockControls } from '@react-three/drei'   Leave this commented out for now, will use orbit controls for setting up scene
import { OrbitControls } from "@react-three/drei";
import Map from "./Scenecomponents/Map";
import System from "./Scenecomponents/System";




const Scene = ({selectedPlanet, planetSelected, planetdata}) => {
  let controlsRef = useRef();
  let [cameraPosition, setCameraPosition] = useState(new THREE.Vector3(25, 0, 25))
  let [controlsActive, setControlsActive] = useState(false)


  
  return (
    <div id="canvas-wrap">
      <Canvas>
      <color attach="background" args={["#000000"]} />
        <hemisphereLight />
        <OrbitControls 
          ref={controlsRef} />
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
          ? <System 
              data={selectedPlanet} 
              planetSelected={planetSelected} 
              cameraPosition={cameraPosition} 
              setCameraPosition={setCameraPosition} 
              controlsRef={controlsRef} 
              controlsActive={controlsActive} 
              setControlsActive={setControlsActive} />
          : <Map 
              data={planetdata} 
              planetSelected={planetSelected} 
              cameraPosition={cameraPosition} 
              setCameraPosition={setCameraPosition} 
              controlsRef={controlsRef} 
              controlsActive={controlsActive} 
              setControlsActive={setControlsActive} />
        }
        {/*<Stats />*/}
      </Canvas>
    </div>
  );
}

export default Scene;
