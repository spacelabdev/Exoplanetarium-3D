import React, { useState } from "react";
import "./InfoPopUp.scss";

function InfoPopUp() {
  const [isOpen, setIsOpen] = useState(false);

  function handleInfoClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="info-Pop-Up">
      <div className={isOpen ? "info-box" : "hidden"}>
        <p className={"info-box-title"}>User Guide</p>
        <ul>
          <li>Left click and drag to rotate the scene</li>
          <li>Middle scroll to Zoom in and out</li>
          <li>Right click and drag to move the scene</li>
          <li>
            Click on an Exoplanet or Star to open the side panel and learn more
            about it!
          </li>
        </ul>
      </div>

      <button className="info-button" onClick={handleInfoClick}>
        i
      </button>
    </div>
  );
}

export default InfoPopUp;
