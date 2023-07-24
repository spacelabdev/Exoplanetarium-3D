import HomeButton from '../shared/HomeButton';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';
import { useMultiStepForm } from './useMultiStepForm';
import './Walkthrough.scss';
import Arrow from '../../assets/arrow.png';
import PlanetGroup from '../../assets/planet-group.png';

function Walkthrough() {
  const {
    currentSlideIndex,
    isFirstSlide,
    isLastSlide,
    nextSlide,
    previousSlide,
    slides,
    slide,
  } = useMultiStepForm([
    <Slide1 />,
    <Slide2 />,
    <Slide3 />,
    <Slide4 />,
    <Slide5 />,
  ]);

  return (
    <section>
      <h1> Walkthrough</h1>
      <HomeButton />
    </section>
  );
}

export default Walkthrough;
