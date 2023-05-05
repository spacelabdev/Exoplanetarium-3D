import Scene from "../components/Scene/Scene";
import SidePanel from "../components/SidePanel/SidePanel";
import "./Visualize.scss";
import { React, useState, useEffect } from "react";

function Visualize() {
  const [selectedPlanet, setSelectedPlanet] = useState();
  const planetSelected = (planet) => {
    setSelectedPlanet(planet);
  };
  return (
    <div className="visualize-wrap">
      <Scene planetSelected={planetSelected} />
      <SidePanel planet={selectedPlanet} />
    </div>
  );
}

export default Visualize;
