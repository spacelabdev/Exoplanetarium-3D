import React from 'react';
import './Walkthrough.scss';
import PlanetGroup from '../../assets/planet-group.png';
import Arrow from '../../assets/arrow.png';

function Slide4() {
  const handleNextClick = ({ onNextClick }) => {
    onNextClick();
  };

  return (
    <section className="slide4">
      <p>Click on any star or planet to view more information</p>

      <div className="planet-images">
        <img
          src={PlanetGroup}
          alt="group of planets"
          className="planet-group"
        />
        <img
          src={Arrow}
          alt="arrow pointing upwards"
          className="arrow"
          onClick={handleNextClick}
        />
      </div>
    </section>
  );
}

export default Slide4;
