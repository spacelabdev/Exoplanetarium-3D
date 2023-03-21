import "./SidePanel.scss";
import { React, useState, useEffect } from "react";
const defaultValue = {
  name: "",
  disposition: "",
  rightAscension: "",
  declination: "",
  distance: "",
};
function SidePanel({ planet }) {
  const { name, disposition, rightAscension, declination, distance } = planet
    ? planet
    : defaultValue;

  return (
    <aside className={planet ? "side-panel open" : "side-panel"}>
      <h5>Candidate {name}</h5>
      <div className={"info-wrap"}>
        <ul>
          <li>{"Disposition: " + disposition}</li>
          <li>{"Right Ascension: " + rightAscension}</li>
          <li>{"Declination: " + declination}</li>
          <li>{"Distance: " + distance + " Parsecs"}</li>
        </ul>
      </div>
    </aside>
  );
}

export default SidePanel;
