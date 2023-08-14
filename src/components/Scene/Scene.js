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
  let [cameraControlType, setCameraControlType] = useState('perspective')
  let [currentView, setCurrentView] = useState('ground')
  let destinationCameraPosition = new THREE.Vector3()
  const camera = useThree((state)=>state.camera)
  let originCameraLocation = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z)
  // let cameraMovePosition = new THREE.Vector3();
  let controls = controlsRef.current
  let cameraTarget = new THREE.Vector3();
  let planetRef = useRef();
  // let ref = useRef()
  const [showStar, setShowStar] = useState(false)
  const [starPosition, setStarPosition] = useState([0,0,0])
  const [autoPositionActive, setAutoPositionActive] = useState(true)
  let destinationCameraLookAt = new THREE.Vector3()
  const cameraAnchor = new THREE.Vector3(0, 0, 0)

  const moveCameraTo = (context, x, y, z) => {
    // console.log("moving camera")
    context.camera.position.lerp(
      destinationCameraPosition.set(
        x, 
        y, 
        z
      ), 
      .01
    );
  }

  useEffect(()=>{
    cameraTarget.set(0,0,0)
  }, [])

  useEffect(()=>{
    if (currentView === 'ground'){
      originCameraLocation.set(0,0,0)
    }
  }, [currentView])

  useEffect(()=>{
    controls = controlsRef.current
    console.log("Controls: ", controls)
    controls.addEventListener('start', () => {
      setControlsActive(()=>true)
    })
    controls.addEventListener('end', () => {
      setControlsActive(()=>false)
      destinationCameraPosition.set(camera.position.x, camera.position.y, camera.position.z)
    })
    if (!controls.target){
      destinationCameraPosition.set(0,0,0)
    }
  }, [controlsRef.current])

  useEffect(()=>{
    if (selectedPlanet){
      const x =
        planetdata.distance *
        Math.cos(planetdata.declination) *
        Math.cos(planetdata.rightAscension);
      const y =
        planetdata.distance *
        Math.cos(planetdata.declination) *
        Math.sin(planetdata.rightAscension);
      const z = planetdata.distance * Math.sin(planetdata.declination);
      planetRef.current.position.set(x, y, z);
      setStarPosition([x - .5, y, z])
      setShowStar(true)
      setCameraControlType(()=>'orbit')
      setCurrentView(()=> 'system')

    } else {
      setCameraControlType(()=>'perspective')
      setCurrentView(()=> 'ground')
    }
  }, [selectedPlanet])

  useFrame((state, delta) => {
    if (controls.target){
      // Handles updating camera home location and target
      if (controlsActive){
        originCameraLocation.set(camera.position.x, camera.position.y, camera.position.z)
        cameraTarget.set(controls.target.x, controls.target.y, controls.target.z)
      }

      if (currentView !== 'system'){
        // sets target to origin
        if (controls.target.x < 0.01 && controls.target.y < 0.01 && controls.target.z < 0.01 ){
          controls.target.set(0,0,0)
        }
      }
      
      // Handles matching control and camera target locations
      if (cameraTarget.x !== controls.target.x && cameraTarget.y !== controls.target.y && cameraTarget.z !== controls.target.z){
        console.log("Lerp to target, setTarget: ", cameraTarget, " Controls target: ", controls.target)
        controls.target.set(
          THREE.MathUtils.lerp(controls.target.x, cameraTarget.x , .01),
          THREE.MathUtils.lerp(controls.target.y, cameraTarget.y , .01),
          THREE.MathUtils.lerp(controls.target.z, cameraTarget.z , .01)
        )
      }

      if (selectedPlanet){
        // Handles manual camera move
        cameraTarget.set(
          planetRef.current.position.x,
          planetRef.current.position.y, 
          planetRef.current.position.z
        )

        if (controlsActive){
          setAutoPositionActive(() => false)
          destinationCameraPosition = destinationCameraPosition.set(
            state.camera.position.x, 
            state.camera.position.y, 
            state.camera.position.z
          )
          console.log("camera position: ", state.camera.position);
        }
        // Positions camera relative to selection
        if (autoPositionActive && Math.abs(state.camera.position.x - destinationCameraPosition.x) > 0.01 && Math.abs(state.camera.position.y - destinationCameraPosition.y) > 0.01 && Math.abs(state.camera.position.z - destinationCameraPosition.z) > 0.01){
          console.log("setting position to destination")
          moveCameraTo(state,
            planetRef.current.position.x + .5,
            planetRef.current.position.y,
            planetRef.current.position.z + .5
          )
        }       
      
        // Updates camera target on click
        // Can optimize performance a bit here by sacrificing some precision (0.01 => 1+)
        if (controls.target.x < 0.01 && controls.target.y < 0.01 && controls.target.z < 0.01 ){
          controls.target.set(
            planetRef.current.position.x,
            planetRef.current.position.y, 
            planetRef.current.position.z
          )
        }
        planetRef.current.rotation.y = planetRef.current.rotation.y + .01
      }
    }
    
    // Updates camera position toward originLocation until interrupted or arrived
    if (state.camera.position !== originCameraLocation && !controlsActive){
      moveCameraTo(state, 
        originCameraLocation.x, 
        originCameraLocation.y, 
        originCameraLocation.z
      )
    }
    state.camera.updateProjectionMatrix();
  });
  
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <hemisphereLight />
      {cameraControlType === 'orbit'
        ? <OrbitControls
            ref={controlsRef} />
        : <CameraControls
            ref={controlsRef} />
      }
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
        planetSelected={planetSelected}  
        controlsRef={controlsRef} 
        controlsActive={controlsActive} 
        setControlsActive={setControlsActive}
        destinationCameraPosition={destinationCameraPosition}
        moveCameraTo={moveCameraTo} />
      {!selectedPlanet
        ? <Ground 
          data={planetdata} 
          planetSelected={planetSelected} 
          controlsRef={controlsRef}
          moveCameraTo={moveCameraTo}
          destinationCameraPosition={destinationCameraPosition} />
        : <System 
          data={selectedPlanet} 
          planetSelected={planetSelected} 
          planetRef={planetRef}
          showStar={showStar}
          starPosition={starPosition}
          controlsRef={controlsRef} 
          controlsActive={controlsActive} 
          setControlsActive={setControlsActive}
          destinationCameraPosition={destinationCameraPosition}
          moveCameraTo={moveCameraTo} />
      }
      {/*<Stats />*/}
    </>
  );
}

export default Scene;
