import { useState } from 'react';

export function useMultiStepForm(slides) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  function nextSlide() {
    setCurrentSlideIndex((i) => {
      if (i >= slides.length - 1) return i;
      return i + 1;
    });
  }

  function previousSlide() {
    setCurrentSlideIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  return {
    currentSlideIndex,
    slide: slides[currentSlideIndex],
    slides,
    isFirstSlide: currentSlideIndex === 0,
    isLastSlide: currentSlideIndex === slides.length - 1,
    nextSlide,
    previousSlide,
  };
}
