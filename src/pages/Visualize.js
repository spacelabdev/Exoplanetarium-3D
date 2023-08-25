
import CanvasWrapper from "../components/Scene/CanvasWrapper";
import SidePanelV2 from "../components/SidePanelV2/SidePanelV2";
import { React, useState, useEffect, useRef } from "react";
import planetdata from "../components/Scene/ExoplanetHelper";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import BlueGiantImg from "../assets/textures/blueGasGiant.png";
import RockyWorldImg from "../assets/textures/rocky.png";
import TanGiantImg from "../assets/textures/tanGasGiant.png";
import Database from "../components/Database/Database";

import "./Visualize.scss";

function Visualize({ settings }) {
  const [selectedPlanet, setSelectedPlanet] = useState();
  const [showDatabase, setShowDatabase] = useState(false);

  // look into Suspense built-in component for async delay on texture load

  //Textures downloaded under CC0 from OpenGameArt.org
  const textureOptions = useLoader(TextureLoader, [
    BlueGiantImg,
    RockyWorldImg,
    TanGiantImg,
  ]);

  const textureSelection = Array.from(Array(planetdata.length), () => {
    return Math.floor(Math.random() * textureOptions.length);
  });

  const applyTextures = (planetData) => {
    planetData.forEach((planet, i) => {
      planetdata[i] = {
        ...planet,
        texture: textureOptions[textureSelection[i]],
      };
    });
  };

  //Modify data here to include textures before passing down
  useEffect(() => {
    applyTextures(planetdata);
  }, []);

  return (
    <div>
      <CanvasWrapper 
        planetSelected={setSelectedPlanet} 
        selectedPlanet={selectedPlanet} 
        planetdata={planetdata}
        settings={settings}/>
      <Database
        planetSelected={setSelectedPlanet}
        showDatabase={showDatabase}
        setShowDatabase={setShowDatabase}
      />
      <SidePanelV2
        planet={selectedPlanet}
        planetSelected={setSelectedPlanet}
        selectedPlanet={selectedPlanet}
        showDatabase={showDatabase}
        setShowDatabase={setShowDatabase}
      />
    </div>

  );
}

export default Visualize;
