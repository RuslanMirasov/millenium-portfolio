const monthNames = ['январе', 'феврале', 'марте', 'апреле', 'мае', 'июне', 'июле', 'августе', 'сентябре', 'октябре', 'ноябре', 'декабре'];
const monthCurrent = monthNames[new Date().getMonth()];
const burger = document.querySelector('[data-js="burger"]');
const navigation = burger.closest('header').querySelector('.navigation');

document.querySelector('#month').innerText = monthCurrent;

export const debounce = (func, wait = 200) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const toggleMenu = e => {
  burger.classList.toggle('open');
  navigation.classList.toggle('open');
};

burger.addEventListener('click', toggleMenu);
