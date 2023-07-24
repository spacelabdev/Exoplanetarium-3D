import './PlanetScroll.scss';
import PlanetScrollImage from '../../assets/planet-scroll.png';

function PlanetScroll() {
  return (
    <div className="secondSlide-animation">
      <img
        src={PlanetScrollImage}
        alt="semi filled circle with arrow"
        className="planet-scroll"
      />
      <div className="line"></div>
    </div>
  );
}

export default PlanetScroll;
