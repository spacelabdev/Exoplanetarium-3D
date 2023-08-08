import PlanetIcon from '../../assets/planet-icon.png';
import './Walkthrough.scss';

function Slide1() {
  return (
    <section>
      <img src={PlanetIcon} alt="icon of a planet" />
      <h2>Welcome to Exoplanetarium!</h2>
      <p>Explore the universe with us</p>
    </section>
  );
}

export default Slide1;
