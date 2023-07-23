import "./SidePanelV2.scss";
import { React, useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import exoplanet from '../../assets/exoplanet.png'
import returnToSpace from '../../assets/emojione-v1_milky-way.svg'

const defaultValue = {
  name: "",
  disposition: "",
  rightAscension: "",
  declination: "",
  distance: "",
  starData: {
    stellarDistance: "",
    effectiveTemperature: "",
    log: "",
    radius: "",
  },
};
function SidePanel({ planet }) {
  const { name, disposition, rightAscension, declination, distance, starData } =
    planet ? planet : defaultValue;
  const { stellarDistance, effectiveTemperature, log, radius } = starData;

  const [linkClicked, setLinkClicked] = useState(false)

  const navigate = useNavigate()

  const handleLinkClick = () => {
    setLinkClicked(true)
  }

  const handleCloseClick = () => {
    console.log("close clicked")
    setLinkClicked(false)
  }

  const handleReturnClick = () => {
    console.log("return clicked")
    window.location.reload(false)
  }

  return (
    <>
      <p className={`${planet ? "show-link" : "hide-link"} 
      ${linkClicked ? "hide-link" : "show-link"}`} onClick={handleLinkClick}> Exoplanet {name}</p>

      <aside className={linkClicked ? "side-panel open" : "side-panel"}>
        <section className={"info-wrap"}>
          <p>Exoplanet {name}</p>
          <button onClick={handleReturnClick} className="return-button" >
            <img src={returnToSpace} alt="returnToSpace" className="return-hover" />
          </button>
          <button onClick={handleCloseClick}><IoCloseSharp></IoCloseSharp></button>
        </section>

        {/* <div className={planet ? "exo-img" : "hidden"}>
        <img src={exoplanet} alt="exoplanet" />
      </div> */}

        {/* <div className={"info-wrap"}>
        <div className="planetData-wrap">
          <p>Exoplanet Data</p>
          <ul>
            <li>
              <span className="styled-text">{"Disposition: "}</span>
              {disposition}
            </li>
            <li>
              <span className="styled-text">{"Right Ascension: "}</span>
              {rightAscension}
            </li>
            <li>
              <span className="styled-text">{"Declination: "}</span>
              {declination}
            </li>
            <li>
              <span className="styled-text">{"Distance: "}</span>{" "}
              {distance + " Parsecs"}
            </li>
          </ul>
        </div>
        <div className="stellarData-wrap">
          <p>Stellar Data</p>
          <ul>
            <li>
              <span className="styled-text">{"Stellar Distance: "}</span>{" "}
              {stellarDistance + " Parsecs"}
            </li>
            <li>
              <span className="styled-text">{"Effectve Temperature: "}</span>{" "}
              {effectiveTemperature + " K"}
            </li>
            <li>
              <span className="styled-text">{"Log: "}</span> {log + " cm/s**2"}
            </li>
            <li>
              <span className="styled-text">{"Radius: "}</span>{" "}
              {radius + " R_Sun"}
            </li>
          </ul>
        </div>
      </div> */}
      </aside>
    </>
  );
}

export default SidePanel;
