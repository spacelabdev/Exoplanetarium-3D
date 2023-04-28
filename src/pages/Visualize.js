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
    setSelectedPlanet(planet);
  };

  // look into Suspense built-in component for async delay on texture load

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
