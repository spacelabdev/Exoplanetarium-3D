import { React, useEffect, useRef, useState } from "react";
import { extend, Canvas, useFrame, useThree } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import * as THREE from "three";
import Sun from "./Sun";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
extend({ TextGeometry });

/*https://codesandbox.io/s/floating-instanced-shoes-h8o2d*/
//Converting from celestial coordinates to cartesian coordinates
//https://math.stackexchange.com/questions/2196866/how-to-calculate-spherical-coordinate-x-y-z-of-a-star-from-magnitude-declin
//http://faraday.uwyo.edu/~admyers/ASTR5160/handouts/51605.pdf

const font = new FontLoader().parse(helvetiker);

// data={planetdata} 
//               planetSelected={planetSelected} 
//               cameraPosition={cameraPosition} 
//               setCameraPosition={setCameraPosition} 
//               controlsRef={controlsRef} 
//               controlsActive={controlsActive} 
//               setControlsActive={setControlsActive}

const System = ({ data, planetSelected, cameraPosition, setCameraPosition, controlsRef, controlsActive, setControlsActive }) => {
  let ref = useRef();
  const [showStar, setShowStar] = useState(false)
  const [starPosition, setStarPosition] = useState([0,0,0])
  let cameraMovePosition = new THREE.Vector3();
  let camera = useThree((state)=>state.camera)
  let originCameraLocation = new THREE.Vector3()
  let destinationCameraPosition = new THREE.Vector3()
  let destinationCameraLookAt = new THREE.Vector3()
  
  let controls = controlsRef.current

  useEffect(() => {
    const x =
      data.distance *
      Math.cos(data.declination) *
      Math.cos(data.rightAscension);
    const y =
      data.distance *
      Math.cos(data.declination) *
      Math.sin(data.rightAscension);
    const z = data.distance * Math.sin(data.declination);
    ref.current.position.set(x, y, z);
    console.log("Camera position on load: ", cameraPosition)
    setStarPosition([x - .5, y, z])
    setShowStar(true)
  }, []);

  useEffect(()=>{
    // controls = controlsRef.current
    // console.log("Controls: ", controls)
    // controls.addEventListener('start', () => {
    //   setControlsActive(true)
    // })

    // controls.addEventListener('end', () => {
    //   setControlsActive(false)
    //   destinationCameraPosition.set(camera.position.x, camera.position.y, camera.position.z)
    // })

    // controls.addEventListener('wheel', () => {
    //   setControlsActive(true)
    //   destinationCameraPosition.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)
    // })

    // return () => {
    //   controls.removeEventListener('start', () => {
    //     setControlsActive(true)
    //   })
    //   controls.removeEventListener('end', () => {
    //     setControlsActive(false)
    //     destinationCameraPosition.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)
    //   })
    //   controls.removeEventListener('start', () => {
    //     setControlsActive(true)
    //     destinationCameraPosition.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)
    //   })
    // }
  }, [controlsRef.current])

  useEffect(()=>{
    if (ref.current){
      destinationCameraPosition = new THREE.Vector3(
        ref.current.position.x + .75,
        ref.current.position.y + .15,
        ref.current.position.z)
      console.log("Destination update: ", destinationCameraPosition)
    }
  }, [ref.current])

  useFrame((state, delta) => {
    if (controlsActive){
      destinationCameraPosition = new THREE.Vector3(state.camera.position.x, state.camera.position.y, state.camera.position.z)
      console.log("camera position: ", state.camera.position);
    }
    if (controls.target.x < 0.01 && controls.target.y < 0.01 && controls.target.z < 0.01 ){
      controls.target.set(ref.current.position.x,ref.current.position.y,ref.current.position.z)
    }
    if (controls.target.x !== ref.current.position.x && controls.target.y !== ref.current.position.y && controls.target.z !== ref.current.position.z){
      controls.target.set(
        THREE.MathUtils.lerp(controls.target.x, ref.current.position.x + .25, .01),
        THREE.MathUtils.lerp(controls.target.y, ref.current.position.y, .01),
        THREE.MathUtils.lerp(controls.target.z, ref.current.position.z + .25, .01)
      );
    } 
    if (state.camera.position !== destinationCameraPosition){
      state.camera.position.lerp(
        cameraMovePosition.set(
          destinationCameraPosition.x, 
          destinationCameraPosition.y, 
          destinationCameraPosition.z), 
        .01
      );
    }
    ref.current.rotation.y = ref.current.rotation.y + .01
    state.camera.updateProjectionMatrix();
  });

  return (
    <>
      
      <mesh ref={ref} data={data} onPointerMissed={() => planetSelected(null)}>
        <sphereGeometry args={[0.1, 30, 30]} />
        <meshBasicMaterial color="white" map={data.texture} />
      </mesh>
      <textGeometry args={[data.name, { font, size: 0.06, height: 0.001 }]} />
      <meshLambertMaterial color={"white"} />
      <Sun position={[...starPosition]} />
    </>
  );
};

export default System;
