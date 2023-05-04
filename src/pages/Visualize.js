import Scene from "../components/Scene/Scene";
import SidePanel from "../components/SidePanel/SidePanel";
import { React, useState, useEffect, useRef } from "react";
import planetdata from "../components/Scene/ExoplanetHelper";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import BlueGiantImg from "../assets/textures/blueGasGiant.png";
import RockyWorldImg from "../assets/textures/rocky.png";
import TanGiantImg from "../assets/textures/tanGasGiant.png";

function Visualize() {
  const [selectedPlanet, setSelectedPlanet] = useState();
  const planetSelected = (planet) => {
    // if planet
    // record camera position in some variable, galacticCameraPosition
    // Set star position based on planet.position.x - orbital radius
      // may need another variable/piece of state for System -> Sun.position values & might want to look into random application of different color star textures (or just randomly applying a red or blue default color, if it changes the existing sun texture)
    // lerp camera.position to x midpoint between planet and star, neutral y position, z position 1.25x midpoint distance (?)
    // camera.lookAt x midpoint
    // else if !selectedPlanet && galacticCameraPosition
    // lerp camera.position back to galacticCameraPosition
    // no need for an else, you should do nothing and nothing is naturally done at this point
    setSelectedPlanet(planet);
  };

  // look into Suspense built-in component for async delay on texture load

  //Textures downloaded under CC0 from OpenGameArt.org
  const textureOptions = useLoader(TextureLoader, [BlueGiantImg, RockyWorldImg, TanGiantImg])

  const textureSelection = Array.from(Array(planetdata.length), ()=> { return Math.floor(Math.random() * textureOptions.length)})

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
    <div>
      <Scene 
        planetSelected={planetSelected} 
        selectedPlanet={selectedPlanet} 
        planetdata={planetdata} />
      <SidePanel planet={selectedPlanet} />
    </div>
  );
}

export default Visualize;
