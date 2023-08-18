import React, { useEffect, useRef, useState } from "react";
import "./Scene.scss";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Stars, Stats } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import Map from "./Scenecomponents/Map";
import System from "./Scenecomponents/System";

const Scene = ({ selectedPlanet: planet, planetSelected, planetdata }) => {
  const [selectedPlanet, setSelectedPlanet] = useState(planet);
  let controlsRef = useRef();
  let [controlsActive, setControlsActive] = useState(false);
  let destinationCameraPosition = new THREE.Vector3();

  useEffect(() => {
    setSelectedPlanet(planet);
  }, [planet]);

  const moveCameraTo = (context, x, y, z) => {
    context.camera.position.lerp(destinationCameraPosition.set(x, y, z), 0.01);
  };

  // useEffect(()=>{
  //   if (selectedPlanet){
  //     console.log(controlsRef.current)
  //     destinationCameraPosition.set(
  //       controlsRef.current.target.x + .25,
  //       controlsRef.current.target.y,
  //       controlsRef.current.target.z + .25
  //     )
  //   } else{
  //     destinationCameraPosition.set(0, 0, 0)
  //   }
  // }, [selectedPlanet])

  return (
    <div id="canvas-wrap">
      <Canvas>
        <color attach="background" args={["#000000"]} />
        <hemisphereLight />
        <OrbitControls ref={controlsRef} />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        {selectedPlanet ? (
          <System
            data={selectedPlanet}
            planetSelected={planetSelected}
            controlsRef={controlsRef}
            controlsActive={controlsActive}
            setControlsActive={setControlsActive}
            destinationCameraPosition={destinationCameraPosition}
            moveCameraTo={moveCameraTo}
          />
        ) : (
          <Map
            data={planetdata}
            planetSelected={planetSelected}
            controlsRef={controlsRef}
            controlsActive={controlsActive}
            setControlsActive={setControlsActive}
            destinationCameraPosition={destinationCameraPosition}
            moveCameraTo={moveCameraTo}
          />
        )}
        {/*<Stats />*/}
      </Canvas>
    </div>
  );
};

export default Scene;
