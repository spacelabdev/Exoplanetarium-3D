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
  const handleNextSlide = () => {
    nextSlide();
  };

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
    <Slide4 onNextClick={handleNextSlide} />,
    <Slide5 />,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="walkthrough-container">
      <form className="walkthrough-form" onSubmit={handleSubmit}>
        <div className="progressbar">
          <div
            style={{
              width: `${(currentSlideIndex + 1) * 20}%`,
            }}
          ></div>
        </div>
        {slide}
        {isFirstSlide && (
          <button className="walkthrough-button" onClick={nextSlide}>
            Get Started
          </button>
        )}
        {isLastSlide && (
          <button className="walkthrough-button" onClick={previousSlide}>
            Previous
          </button>
        )}

        {!isFirstSlide && !isLastSlide && (
          <div className="buttons">
            <button className="walkthrough-button" onClick={previousSlide}>
              Previous
            </button>
            <button className="walkthrough-button" onClick={nextSlide}>
              Continue
            </button>
          </div>
        )}
      </form>
      <HomeButton />
    </section>
  );
}

export default Walkthrough;
