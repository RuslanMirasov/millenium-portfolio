import { debounce } from './scripts.js';
import { scrollToBlock } from './scrollToBlock.js';

const slider = document.querySelector('.swiper');

const swiper = new Swiper(slider, {
  effect: 'slide', //fade
  speed: 1000,
  autoHeight: true,
  lazy: {
    loadOnTransitionStart: true,
    loadPrevNext: true,
    loadPrevNextAmount: 1,
  },
  allowTouchMove: false,
  on: {
    slideChange: () => {
      const currentSlide = swiper.slides[swiper.activeIndex];
      const step = currentSlide.dataset.step;

      if (step && window.location.hash !== `#${step}`) {
        history.pushState(null, '', `#${step}`);
      }
    },
  },
});

const onNextBtnClick = e => {
  if (e.target.dataset.js !== 'next') return;
  slideNext();
};

export const slideNext = () => {
  const duration = window.scrollY > 0 ? 600 : 0;
  const timeout = duration === 600 ? 500 : 0;

  scrollToBlock('.body', duration);
  setTimeout(() => {
    swiper.slideNext();
  }, timeout);
};

export const goToSlide = stepName => {
  const allSlides = slider.querySelectorAll('.swiper-slide');
  allSlides.forEach((slide, index) => {
    if (slide.dataset.step === stepName) {
      swiper.slideTo(index, 0);
    }
  });
};

const handleResize = debounce(() => {
  setTimeout(() => {
    swiper.update();
  }, 1000);
}, 300);

const handleHashChange = () => {
  const hash = window.location.hash.replace('#', '');
  if (!hash) return;

  goToSlide(hash);
};

slider.addEventListener('click', onNextBtnClick);
document.addEventListener('DOMContentLoaded', handleHashChange);
window.addEventListener('hashchange', handleHashChange);
window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', handleResize);
