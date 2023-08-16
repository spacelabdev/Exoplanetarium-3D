import "./SidePanelV2.scss";
import { React, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import returnToSpace from "../../assets/emojione-v1_milky-way.svg";
import planetIcon from "../../assets/HighlightedPlanet.svg";
import starIcon from "../../assets/Star.svg";
import planetdata from "../../components/Scene/ExoplanetHelper.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

function SidePanel({ planet, planetSelected, selectedPlanet }) {
  const { name, disposition, rightAscension, declination, distance, starData } =
    planet ? planet : defaultValue;
  const { stellarDistance, effectiveTemperature, log, radius } = starData;

  const [hovering, setHovering] = useState(false);

  const handleReturnClick = () => {
    window.location.reload(false);
  };

  const handleHover = () => {
    setHovering(true);
  };

  const handleHoverLeave = () => {
    setHovering(false);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 2000, min: 992 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 992, min: 768 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 768, min: 576 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
    },
  };

  const CustomButtonGroupAsArrows = ({ next, previous }) => {
    return (
      <>
        <div>
          <button onClick={previous} className="carousel-arrow left-arrow">
            <MdKeyboardArrowLeft />
          </button>
        </div>
        <div>
          <button onClick={next} className="carousel-arrow right-arrow">
            <MdKeyboardArrowRight />
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <aside className={planet ? "side-panel open" : "side-panel"}>
        <p className="sys-name">NAME System</p>

        <section className="panel-title-container">
          <p className="panel-title"> {name}</p>

          <div className="button-wrap">
            <button
              className="return"
              onClick={handleReturnClick}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverLeave}
            >
              <img
                src={returnToSpace}
                alt=" returnToSpace"
                className="return-hover"
              />
            </button>
            {hovering && <p className="hover-text">Return to space </p>}
          </div>
        </section>

        <section className="panel-content">
          <div className="planetData-wrap">
            <p>Exoplanet Data</p>
            <ul>
              <li>
                <span className="styled-text">
                  {"Disposition: "} {disposition}
                </span>
              </li>
              <li>
                <span className="styled-text">
                  {"Right Ascension: "} {rightAscension}
                </span>
              </li>
              <li>
                <span className="styled-text">
                  {"Declination: "} {declination}{" "}
                </span>
              </li>
              <li>
                <span className="styled-text">
                  {"Distance: "} {distance + " Parsecs"}
                </span>
              </li>
            </ul>
          </div>

          <div className="stellarData-wrap">
            <p>Stellar Data</p>
            <ul>
              <li>
                <span className="styled-text">
                  {"Stellar Distance: "} {stellarDistance + " Parsecs"}
                </span>
              </li>
              <li>
                <span className="styled-text">
                  {"Effectve Temperature: "}
                  {effectiveTemperature + " K"}
                </span>
              </li>
              <li>
                <span className="styled-text">
                  {"Log: "}
                  {log + " cm/s**2"}
                </span>
              </li>
              <li>
                <span className="styled-text">
                  {"Radius: "}
                  {radius + " R_Sun"}
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className="planet-slider-container">
          <section className="planet-slider">
            <Carousel
              responsive={responsive}
              draggable={false}
              containerClass="cont"
              infinite={true}
              arrows={false}
              customButtonGroup={<CustomButtonGroupAsArrows />}
              renderButtonGroupOutside={true}
            >
              {planetdata.map((planetItem, index) => (
                <div
                  key={planetItem.name}
                  class="planet-item"
                  onClick={() => planetSelected(planetItem)}
                >
                  <p className="planet-item-name">{planetItem.name}</p>
                  <img
                    src={planetItem.photo}
                    alt={`${planetItem.name}`}
                    style={{ width: "3rem", borderRadius: "100%" }}
                  />
                  {/* <div className="planet-sphere"></div> */}
                </div>
              ))}
            </Carousel>
          </section>
        </section>
        <p className="selected-planet-name">Exoplanet {name}</p>
      </aside>
    </>
  );
}

export default SidePanel;
