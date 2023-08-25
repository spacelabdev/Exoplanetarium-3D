import React, { useEffect, useRef, useState } from "react";
import "./Scene.scss";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Stars, Stats } from "@react-three/drei";
import { OrbitControls, FlyControls, FirstPersonControls } from "@react-three/drei";
import Map from "./Scenecomponents/Map";
import System from "./Scenecomponents/System";
import Ground from "./Scenecomponents/Ground";


const Scene = ({settings, selectedPlanet, planetSelected, planetdata}) => {
  let orbitControlsRef = useRef()
  let firstPersonControlsRef = useRef()
  let controlsRef = useRef();
  let [controlsActive, setControlsActive] = useState(false)
  let [cameraControlType, setCameraControlType] = useState('orbit') // Try this as a ref instead
  let [currentView, setCurrentView] = useState('map')
  let [desiredCameraPosition, setDesiredCameraPosition] = useState(new THREE.Vector3())
  const [camera, setCamera] = useState(useThree((state)=>state.camera))
  // let originCameraLocation = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z)
  // let [controls, setControls] = useState(controlsRef.current)
  let [cameraTarget, setCameraTarget] = useState(new THREE.Vector3())
  let planetRef = useRef();
  const [showStar, setShowStar] = useState(false)
  const [starPosition, setStarPosition] = useState([0,0,0])
  const [autoPositionActive, setAutoPositionActive] = useState(true)
  const [cameraStartPosition, setCameraStartPosition] = useState(new THREE.Vector3())
  const [cameraGroundPosition, setCameraGroundPosition] = useState(new THREE.Vector3())

  // Only set desired Camera location/position/vector
  const moveCameraTo = (x, y, z) => {
    console.log(`moveCameraTo values: ${x}, ${y}, ${z}`)
    desiredCameraPosition.set(x, y, z)
  }

  // Only set desired Camera.lookAt/target location/position/vector
  const moveTargetTo = (x, y, z) => {
    // console.log("moving target")
    cameraTarget.set(x, y, z)
  }

  const swapPerspective = () => {
    console.log("Swapping perspective")
    let swappingFrom = cameraControlType
    if (swappingFrom === 'orbit'){
      console.log("camera postiion @ orbitControls: ", camera.position)
      orbitControlsRef.current.saveState()
      controlsRef.current.reset()
      console.log("camera postiion after orbitControls reset: ", camera.position)
    } else {
      firstPersonControlsRef.current.dragToLook = true
      console.log("camera position @ flyControls: ", camera.position)
    }
    setCameraControlType((control) => control === 'orbit' ? 'fly' : 'orbit')
    console.log("camera position post state change: ", camera.position)
    controlsRef.current = swappingFrom === 'orbit' ? firstPersonControlsRef.current : orbitControlsRef.current
    console.log("camera position post swap: ", camera.position)
  }

  const handlePlanetSelection = () => {
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
}

  // Onload camera target
  useEffect(()=>{
    window.addEventListener('contextmenu', (e)=>{
      e.preventDefault()
    })
    cameraStartPosition.set(camera.position.x, camera.position.y, camera.position.z)
    cameraGroundPosition.set(0, .101, 0)
    camera.near = 0.0001
    cameraTarget.set(0,0,0)
    setAutoPositionActive(() => true)
    moveCameraTo(camera.position.x, camera.position.y, camera.position.z)
    controlsRef.current = orbitControlsRef.current
    console.log("Controls: ", controlsRef.current)
    orbitControlsRef.current.addEventListener('start', () => {
      setControlsActive(() => true)
    })
    orbitControlsRef.current.addEventListener('end', () => {
      setControlsActive(() => false)
    })
  }, [])

  useEffect(()=>{
    if (cameraControlType === "orbit"){
      moveCameraTo(cameraStartPosition.x, cameraStartPosition.y, cameraStartPosition.z)
    } else {
      moveCameraTo(cameraGroundPosition.x, cameraGroundPosition.y, cameraGroundPosition.z)
    }
  }, [controlsRef.current])

  // define/update reference to selected planet on change
  useEffect(()=>{
    if (cameraControlType === 'orbit'){
      if (selectedPlanet){
        handlePlanetSelection()
      } else {
        selectedPlanet = undefined
        moveTargetTo(0, 0, 0)
      }
    } else {
      if (selectedPlanet){
        swapPerspective()
        handlePlanetSelection()
      }
    }
    setAutoPositionActive(()=>true)
  }, [selectedPlanet, cameraControlType, controlsRef.current])

  useFrame((state, delta) => {
    // if camera location !== desiredCameraPosition, update camera location
    if (state.camera.position.x !== desiredCameraPosition.x || state.camera.position.y !== desiredCameraPosition.y || state.camera.position.z !== desiredCameraPosition.z){
      // Positions camera relative to desiredCameraPosition
      if (!controlsActive && autoPositionActive){
        if (Math.abs(state.camera.position.x - desiredCameraPosition.x) > 0.001 || Math.abs(state.camera.position.y - desiredCameraPosition.y) > 0.001 || Math.abs(state.camera.position.z - desiredCameraPosition.z) > 0.001){
          console.log("setting position to destination", desiredCameraPosition)
          state.camera.position.lerp(
            desiredCameraPosition, 
            .02
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
    
    // Orbit Controls active
    if (cameraControlType === 'orbit'){
      // Handles updating camera home location and target on manual move
      if (controlsActive && controlsRef.current.target){
        setAutoPositionActive(() => false)
        moveCameraTo(state.camera.position.x, state.camera.position.y, state.camera.position.z)
        moveTargetTo(controlsRef.current.target.x, controlsRef.current.target.y, controlsRef.current.target.z)
        cameraStartPosition.set(state.camera.position.x, state.camera.position.y, state.camera.position.z)
      }

      

      // if camera target/lookAt location !== cameraTarget, update camera target/lookAt location
      if (controlsRef.current.target.x !== cameraTarget.x || controlsRef.current.target.y !== cameraTarget.y || controlsRef.current.target.z !== cameraTarget.z){
        if (Math.abs(controlsRef.current.target.x - cameraTarget.x) > 0.01 || Math.abs(controlsRef.current.target.y - cameraTarget.y) > 0.01 || Math.abs(controlsRef.current.target.z - cameraTarget.z) > 0.01){
          console.log("setting target to new", cameraTarget)
          controlsRef.current.target.lerp(
            cameraTarget, 
            .02
          );
        } else {
          // snaps controls target to exact target
          console.log("snapping controls to target", cameraTarget, controlsRef.current.target)
          controlsRef.current.target.x = cameraTarget.x
          controlsRef.current.target.y = cameraTarget.y
          controlsRef.current.target.z = cameraTarget.z
        }
      }
      orbitControlsRef.current.update()
    } else {
      camera.getWorldDirection(orbitControlsRef.current.target)
    } 


    
    state.camera.updateProjectionMatrix();
  });
  
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <hemisphereLight />
      <OrbitControls 
        ref={orbitControlsRef}
        enabled={!!(cameraControlType === 'orbit')} />
      {/* <FirstPersonControls
        ref={firstPersonControlsRef}
        movementSpeed={0}
        lookSpeed={.5}
        enabled={!!(cameraControlType !== 'orbit')} /> */}
      <FlyControls
        ref={firstPersonControlsRef}
        movementSpeed={0}
        rollSpeed={.5}
        enabled={!!(cameraControlType !== 'orbit')}
        dragToLook={true} 
        up={new THREE.Vector3()}/>
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
        moveCameraTo={moveCameraTo}
        swapPerspective={swapPerspective}  />
      {settings.stats ? <Stats showPanel={0} /> : null}
    </>
  );
};

export default Scene;
