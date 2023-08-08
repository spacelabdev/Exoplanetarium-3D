import PlanetScroll from '../shared/PlanetScroll';
import './Walkthrough.scss';

function Slide3() {
  return (
    <section className="slide3">
      <PlanetScroll />
      <button className="walkthrough-button shift">Shift</button>
      <h2>Welcome to Exoplanetarium!</h2>
      <p>Shift + Left Click + Drag to Pan</p>
    </section>
  );
}

export default Slide3;
