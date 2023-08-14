import "./SidePanelV2.scss";
import { React, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import returnToSpace from '../../assets/emojione-v1_milky-way.svg'
import planetIcon from '../../assets/HighlightedPlanet.svg'
import starIcon from '../../assets/Star.svg'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import planetdata from '../../components/Scene/ExoplanetHelper.js'

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

  const [hovering, setHovering] = useState(false)

  const handleReturnClick = () => {
    window.location.reload(false)
  }

  const handleHover = () => {
    setHovering(true)
  }

  const handleHoverLeave = () => {
    setHovering(false)
  }

  const handleCarouselPlanetClick = (e) => {
    const clickedPlanet = e.target.innerText

    const newPlanet = planetdata.find((planet) => planet.name === clickedPlanet)

    planetSelected(newPlanet)
  }


  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 2000, min: 992 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 992, min: 768 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 768, min: 576 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1
    }
  }

  // const planetSliderArray = [
  //   { name: "planet1", image: planetIcon, size: "30%" },
  //   { name: "planet2", image: planetIcon, size: "70%" },
  //   { name: "planet3", image: planetIcon, size: "80%" },
  //   { name: "planet4", image: planetIcon, size: "50%" },
  //   { name: "planet6", image: starIcon, size: "70%" },
  //   { name: "planet5", image: planetIcon, size: "70%" },
  // ];

  const CustomButtonGroupAsArrows = ({ next, previous }) => {
    return (<>
      <div>
        <button onClick={previous} className="carousel-arrow left-arrow"><MdKeyboardArrowLeft /></button>
      </div>
      <div>
        <button onClick={next} className="carousel-arrow right-arrow"><MdKeyboardArrowRight /></button>
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
            <button className="return" onClick={handleReturnClick} onMouseEnter={handleHover} onMouseLeave={handleHoverLeave}>
              <img src={returnToSpace} alt=" returnToSpace" className="return-hover" />
            </button>
            {hovering && <p className="hover-text">Return to space </p>}
          </div>
        </section>

        <section className="panel-content">
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
              {planetdata.map((planetItem) => (
                <div
                  key={planetItem.name}
                  class="planet-item"
                  onClick={handleCarouselPlanetClick}>
                  <p className="planet-item-name">{planetItem.name}</p>
                  <img
                    src={starIcon}
                    alt={`Image of ${planetItem.name}`}
                    style={{ width: '3rem' }}
                  />
                </div>
                // <div key={planetItem.name} class="planet-item">
                //   <img
                //     src={planetItem.image}
                //     alt={`Image of ${planetItem.name}`}
                //     style={{ width: planetItem.size }}
                //   />
                // </div>
              ))}
            </Carousel>
          </section>
        </section>
        <p id="selected-planet-name">Exoplanet {name}</p>
      </aside>
    </>
  );
}

export default SidePanel;