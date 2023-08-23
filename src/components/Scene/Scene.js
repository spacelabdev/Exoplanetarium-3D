import React, { useEffect, useRef, useState } from 'react'
import "./Scene.scss";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from 'three'
import { Stars, Stats } from "@react-three/drei";
import { OrbitControls, CameraControls } from "@react-three/drei";
import Map from "./Scenecomponents/Map";
import System from "./Scenecomponents/System";
import Ground from "./Scenecomponents/Ground";


const Scene = ({selectedPlanet, planetSelected, planetdata}) => {
  let controlsRef = useRef();
  let [controlsActive, setControlsActive] = useState(false)
  let [cameraControlType, setCameraControlType] = useState('orbit')
  let [currentView, setCurrentView] = useState('map')
  let [desiredCameraPosition, setDesiredCameraPosition] = useState(new THREE.Vector3())
  const [camera, setCamera] = useState(useThree((state)=>state.camera))
  // let originCameraLocation = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z)
  let controls = controlsRef.current
  let [cameraTarget, setCameraTarget] = useState(new THREE.Vector3())
  let planetRef = useRef();
  const [showStar, setShowStar] = useState(false)
  const [starPosition, setStarPosition] = useState([0,0,0])
  const [autoPositionActive, setAutoPositionActive] = useState(true)


  // Only set desired Camera location/position/vector
  const moveCameraTo = (x, y, z) => {
    console.log("moveCameraTo values: ", x, y, z)
    desiredCameraPosition.set(x, y, z)
  }

  // Only set desired Camera.lookAt/target location/position/vector
  const moveTargetTo = (x, y, z) => {
    // console.log("moving target")
    cameraTarget.set(x, y, z)
  }

  // Onload camera target
  useEffect(()=>{
    camera.near = 0.0001
    cameraTarget.set(0,0,0)
    setAutoPositionActive(() => true)
    moveCameraTo(camera.position.x, camera.position.y, camera.position.z)
    controls = controlsRef.current
    console.log("Controls: ", controls)
    controls.addEventListener('start', () => {
      setControlsActive(() => true)
    })
    controls.addEventListener('end', () => {
      setControlsActive(() => false)
    })
  }, [])

  // update camera and target location/position on change
  // useEffect(()=>{
  //   if (currentView === 'ground'){
  //     originCameraLocation.set(0,0,0)
  //   }
  // }, [currentView])

  // define/update controls, event listeners
  // useEffect(()=>{
    
  //   if (!controls.target){
  //     // desiredCameraPosition.set(0,0,0)
  //   }
  // }, [controlsRef.current])

  // define/update reference to selected planet on change
  useEffect(()=>{
    if (selectedPlanet){
      selectedPlanet.position = new THREE.Vector3();
      console.log("Selected Planet: ", selectedPlanet)
      // define x, y, z of selectedPlanet
      const x =
        selectedPlanet.distance *
        Math.cos(selectedPlanet.declination) *
        Math.cos(selectedPlanet.rightAscension);
      const y =
        selectedPlanet.distance *
        Math.cos(selectedPlanet.declination) *
        Math.sin(selectedPlanet.rightAscension);
      const z = selectedPlanet.distance * Math.sin(selectedPlanet.declination);
      // assign x, y, z of selected planet
      // target position of selected planet
      console.log("setting planet position: ", x, y, z)
      selectedPlanet.position.set( x, y, z )
      console.log("Moving target and camera at selectedPlanet", selectedPlanet.position)
      moveTargetTo(x, y, z)
      moveCameraTo(x, y, z - .5)
      // assign position of selected planet's host star & make visible
      setStarPosition(() => [x + .5, y, z])
      setShowStar(true)
      // setCameraControlType(()=>'orbit')
      // setCurrentView(()=> 'system')
    } else {
      selectedPlanet = undefined
      moveTargetTo(0, 0, 0)
      // setCameraControlType(()=>'perspective')
      // setCurrentView(()=> 'ground')
    }
    setAutoPositionActive(()=>true)
  }, [selectedPlanet])

  useFrame((state, delta) => {
    // Handles updating camera home location and target on manual move
    if (controlsActive){
      console.log(controls)
      setAutoPositionActive(() => false)
      moveCameraTo(state.camera.position.x, state.camera.position.y, state.camera.position.z)
      moveTargetTo(controls.target.x, controls.target.y, controls.target.z)
    }


    // if camera location !== desiredCameraPosition, update camera location
    if (state.camera.position.x !== desiredCameraPosition.x || state.camera.position.y !== desiredCameraPosition.y || state.camera.position.z !== desiredCameraPosition.z){
      // Positions camera relative to desiredCameraPosition
      if (!controlsActive && autoPositionActive){
        if (Math.abs(state.camera.position.x - desiredCameraPosition.x) > 0.001 || Math.abs(state.camera.position.y - desiredCameraPosition.y) > 0.001 || Math.abs(state.camera.position.z - desiredCameraPosition.z) > 0.001){
          console.log("setting position to destination", desiredCameraPosition)
          state.camera.position.lerp(
            desiredCameraPosition, 
            .01
          );
        } else {
          // snap camera to exact position
          console.log("snapping position to destination", desiredCameraPosition)
          state.camera.position.x = desiredCameraPosition.x
          state.camera.position.y = desiredCameraPosition.y
          state.camera.position.z = desiredCameraPosition.z
          setAutoPositionActive(() => false)
        }
      }
    } 

    // if camera target/lookAt location !== cameraTarget, update camera target/lookAt location
    if (controls.target.x !== cameraTarget.x || controls.target.y !== cameraTarget.y || controls.target.z !== cameraTarget.z){
      if (Math.abs(controls.target.x - cameraTarget.x) > 0.001 || Math.abs(controls.target.y - cameraTarget.y) > 0.001 || Math.abs(controls.target.z - cameraTarget.z) > 0.001){
        console.log("setting target to new", cameraTarget)
        controls.target.lerp(
          cameraTarget, 
          .02
        );
      } else {
        // snaps controls target to exact target
        console.log("snapping controls to target", cameraTarget)
        controls.target.x = cameraTarget.x
        controls.target.y = cameraTarget.y
        controls.target.z = cameraTarget.z
      }
    }


    controls.update()
    state.camera.updateProjectionMatrix();
  });
  
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <hemisphereLight />
      {/* {cameraControlType === 'orbit'
        ? */}<OrbitControls 
            ref={controlsRef} />
        {/*}: <CameraControls
            ref={controlsRef} />
      } */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <Map 
        data={planetdata} 
        selectedPlanet={selectedPlanet}
        planetSelected={planetSelected}
        starPosition={starPosition}
        moveTargetTo={moveTargetTo}
        moveCameraTo={moveCameraTo}  />
      {/*<Stats />*/}
    </>
  );
}

export default Scene;
