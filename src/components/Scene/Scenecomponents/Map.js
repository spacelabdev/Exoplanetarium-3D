import { React, useRef, useState, useEffect } from "react";
import { extend, useThree, useFrame } from "@react-three/fiber";
import * as THREE from 'three'
import { Instances } from "@react-three/drei";
import Planet from "./Planet";
import Sun from "./Sun";
import PlanetName from "./PlanetName";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
extend({ TextGeometry });


/*https://codesandbox.io/s/floating-instanced-shoes-h8o2d*/
//Converting from celestial coordinates to cartesian coordinates
//https://math.stackexchange.com/questions/2196866/how-to-calculate-spherical-coordinate-x-y-z-of-a-star-from-magnitude-declin
//http://faraday.uwyo.edu/~admyers/ASTR5160/handouts/51605.pdf

const font = new FontLoader().parse(helvetiker);

const Map = ({ planetSelected, data, cameraPosition, setCameraPosition, controlsRef, controlsActive, setControlsActive }) => {
  const numPlanets = data.length;
  const camera = useThree((state)=>state.camera)
  let originCameraLocation = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z)
  let destinationCameraPosition = new THREE.Vector3()

  let cameraMovePosition = new THREE.Vector3();
  let controls = controlsRef.current
  let cameraTarget = new THREE.Vector3();
  
  useEffect(()=>{
    cameraTarget.set(0,0,0)
    setCameraPosition(new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z))
  }, [])

  useEffect(()=>{
    controls = controlsRef.current
    console.log("Controls: ", controls)
    controls.addEventListener('start', () => {
      setControlsActive(true)
    })

    controls.addEventListener('end', () => {
      setControlsActive(false)
      destinationCameraPosition.set(camera.position.x, camera.position.y, camera.position.z)
      setCameraPosition(new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z))
    })

  }, [controlsRef.current])

  useFrame((state, delta) => {
    if (controlsActive){
      originCameraLocation.set(camera.position.x, camera.position.y, camera.position.z)
      cameraTarget.set(controls.target.x, controls.target.y, controls.target.z)
    }
    if (controls.target.x < 0.01 && controls.target.y < 0.01 && controls.target.z < 0.01 ){
      controls.target.set(0,0,0)
    }
    if (cameraTarget.x !== controls.target.x && cameraTarget.y !== controls.target.y && cameraTarget.z !== controls.target.z){
      console.log("Lerp to target, setTarget: ", cameraTarget, " Controls target: ", controls.target)
      controls.target.set(
        THREE.MathUtils.lerp(controls.target.x, cameraTarget.x , .01),
        THREE.MathUtils.lerp(controls.target.y, cameraTarget.y , .01),
        THREE.MathUtils.lerp(controls.target.z, cameraTarget.z , .01)
      )
    }
    
    if (state.camera.position !== originCameraLocation && !controlsActive){
      state.camera.position.lerp(cameraMovePosition.set(originCameraLocation.x, originCameraLocation.y, originCameraLocation.z), .01)
      state.camera.updateProjectionMatrix()
    }
})

  return (
    <>
      <Sun position={[0, 0, 0]} />
      <Instances limit={numPlanets} range={1000}>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshLambertMaterial color="purple" />
        {data.map((planet, i) => { return (
          <Planet
            key={i}
            data={data}
            texture={planet.texture}
            numPlanets={numPlanets}
            planetSelected={planetSelected}
            {...planet}
          />
        )})}
      </Instances>

      <Instances limit={numPlanets} range={1000}>
        <textGeometry args={["", { font, size: 0.06, height: 0.001 }]} />
        <meshLambertMaterial color={"white"} />
        {data.map((planet, i) => (
          <PlanetName key={i} id={i} {...planet} />
        ))}
      </Instances>
    </>
  );
}

export default Map;
