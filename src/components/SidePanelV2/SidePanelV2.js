import "./SidePanelV2.scss";
import { React, useState, useEffect } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import returnToSpace from "../../assets/emojione-v1_milky-way.svg";
import { PiDatabaseBold } from "react-icons/pi";
// import planetIcon from "../../assets/HighlightedPlanet.svg";
// import starIcon from "../../assets/Star.svg";
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

const SidePanel = ({
  planetdata,
  planet,
  planetSelected,
  selectedPlanet,
  showDatabase,
  setShowDatabase,
}) => {
  const [panel, setPanel] = useState(false);
  const [toolTip, showToolTip] = useState(false);
  const { name, disposition, rightAscension, declination, distance, starData } =
    planet ? planet : defaultValue;
  const { stellarDistance, effectiveTemperature, log, radius } = starData;

  useEffect(() => {
    if (planet) {
      setPanel(true);
    } else {
      setPanel(false);
    }
  }, [planet]);

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
      <aside className={panel ? "side-panel open" : "side-panel"}>
        <p className="sys-name">NAME System</p>

        <section className="panel-title-container">
          <p className="panel-title"> {name}</p>
          <div className="icons-wrap">
            <div
              className="database-button"
              onClick={() => {
                setPanel(false);
                setShowDatabase(true);
              }}
            >
              <PiDatabaseBold
                size={30}
                onMouseEnter={() => showToolTip(true)}
                onMouseLeave={() => showToolTip(false)}
              />
              {toolTip && <div className="tooltip">Database</div>}
            </div>
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
                  className="planet-item"
                  onClick={() => planetSelected({...planetItem})}
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
};

export default SidePanel;
