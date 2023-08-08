import './Walkthrough.scss';
import PlanetGroup from '../../assets/planet-group.png';

function Slide5() {
  return (
    <section className="slide5">
      <img src={PlanetGroup} alt="group of planets" />
      <div className="content">
        <ul>
          <li>Disposition: PC</li>
          <li>Right Ascension: 112.75</li>
          <li>Declination: -53.05</li>
          <li>Distance: 2.83 Parsecs</li>
        </ul>
      </div>
    </section>
  );
}

export default Slide5;
