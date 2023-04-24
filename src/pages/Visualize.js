import Scene from "../components/Scene/Scene";
import SidePanel from "../components/SidePanel/SidePanel";
import { React, useState, useEffect, useRef } from "react";

function Visualize() {
  const selectedPlanet = useRef();
  const planetSelected = (event, planet) => {
    event.stopPropagation()
    console.log("Hitting planetSelected funciton in Visualize component")
    console.log(planet)
    selectedPlanet.current = planet;
  };
  return (
    <div>
      <Scene planetSelected={planetSelected} />
      { selectedPlanet.current !== {}
        ? <SidePanel planet={selectedPlanet.current} />
        : null }
    </div>
  );
}

export default Visualize;
