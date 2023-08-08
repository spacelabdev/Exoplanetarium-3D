import './Walkthrough.scss';
import PlanetScroll from '../shared/PlanetScroll';

function Slide2() {
  return (
    <section className="slide2">
      <PlanetScroll />
      <button className="walkthrough-button shift">Shift</button>
      <h2>Welcome to Exoplanetarium!</h2>
      <p>Left Click + Drag to Orbit</p>
    </section>
  );
}

export default Slide2;
