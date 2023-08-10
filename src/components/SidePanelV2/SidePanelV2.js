import "./SidePanelV2.scss";
import { React, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import returnToSpace from '../../assets/emojione-v1_milky-way.svg'
import planetIcon from '../../assets/HighlightedPlanet.svg'
import starIcon from '../../assets/Star.svg'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

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
  const [hovering, setHovering] = useState(false)

  const handleLinkClick = () => {
    setLinkClicked(true)
  }

  const handleCloseClick = () => {
    setLinkClicked(false)
  }

  const handleReturnClick = () => {
    window.location.reload(false)
  }

  const handleHover = () => {
    setHovering(true)
  }

  const handleHoverLeave = () => {
    setHovering(false)
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

  const planetSliderArray = [
    { name: "planet1", image: planetIcon, size: "30%" },
    { name: "planet2", image: planetIcon, size: "70%" },
    { name: "planet3", image: planetIcon, size: "80%" },
    { name: "planet4", image: planetIcon, size: "50%" },
    { name: "planet6", image: starIcon, size: "70%" },
    { name: "planet5", image: planetIcon, size: "70%" },
  ];

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
      <p className={`${planet ? "show-link" : "hide-link"} 
      ${linkClicked ? "hide-link" : "show-link"}`} onClick={handleLinkClick}> Exoplanet {name}</p>

      <aside className={planet && linkClicked ? "side-panel open" : "side-panel"}>
        <p className="sys-name">NAME System</p>

        <section className="panel-title-container">
          <p className="panel-title">Exoplanet {name}</p>

          <div className="button-wrap">
            <button className="return-n-close" onClick={handleReturnClick} onMouseEnter={handleHover} onMouseLeave={handleHoverLeave}>
              <img src={returnToSpace} alt=" returnToSpace" className="return-hover" />
            </button>

            {hovering && <p className="hover-text">Return to space </p>}

            <button className="return-n-close" onClick={handleCloseClick}>
              <IoCloseSharp />
            </button>
          </div>
        </section>

        <section className="panel-content">
          <p className="content-text">
            Vorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
            Vorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
          </p>
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
              {planetSliderArray.map((planetItem) => (
                <div key={planetItem.name} class="planet-item">
                  <img
                    src={planetItem.image}
                    alt={`Image of ${planetItem.name}`}
                    style={{ width: planetItem.size }}
                  />
                </div>
              ))}
            </Carousel>
          </section>
          <p>Exoplanet {name}</p>
        </section>

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