const burger = document.querySelector('[data-js="burger"]');
const navigation = burger.closest('header').querySelector('.navigation');
const portfolioNavigation = document.querySelector('[data-js="portfolio-navigation"]');
const portfolioEl = document.querySelector('.portfolio__collection');
const loadMoreBtn = document.querySelector('.portfolio__load-more');

const portfolio = [
  { category: 'hairdresser', items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
  { category: 'nail', items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] },
  { category: 'brow', items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
  { category: 'mekup', items: [1] },
  { category: 'cosmetology', items: [] },
];

const ITEMS_PER_LOAD = 6;
let currentCategory = null;
let renderedCount = 0;

const toggleMenu = e => {
  burger.classList.toggle('open');
  navigation.classList.toggle('open');
};

const createPortfolioMarkup = ({ category, items }, append = false) => {
  if (!category || !items) return;

  let categoryHTML = '';

  if (!append) {
    portfolioEl.innerHTML = '';
    renderedCount = 0;
  }

  const itemsToRender = items.slice(renderedCount, renderedCount + ITEMS_PER_LOAD);
  renderedCount += itemsToRender.length;

  if (itemsToRender.length === 0 && !append) {
    categoryHTML = '<p>Категория пуста...</p>';
    portfolioEl.innerHTML = categoryHTML;
  } else {
    const markup = itemsToRender
      .map(
        item => `
        <li>
          <a href="./assets/img/portfolio/${category}/${item}.webp" data-fancybox="gallery" data-src="./assets/img/portfolio/${category}/${item}.webp">
            <img src="./assets/img/portfolio/${category}/${item}.webp" width="348" height="396" alt="Салон красоты Миллениум в г. Долгопрудный" />
          </a>
        </li>
      `
      )
      .join('');

    portfolioEl.insertAdjacentHTML('beforeend', markup);
  }

  if (renderedCount >= items.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'flex';
  }
};

const changePrtfolioCategory = async e => {
  if (!e.target.dataset.category) return;

  const activeButton = document.querySelector('.portfolio__button.active');
  const button = e.target;
  const category = button.dataset.category;
  const categoryCollection = portfolio.find(item => item.category === category);

  if (!categoryCollection) return;

  currentCategory = categoryCollection;

  if (activeButton) activeButton.classList.remove('active');
  button.classList.add('active');

  try {
    button.classList.add('loading');
    portfolioEl.classList.remove('active');
    setTimeout(() => {
      createPortfolioMarkup(currentCategory);
      portfolioEl.classList.add('active');
    }, 300);
  } finally {
    setTimeout(() => {
      button.classList.remove('loading');
    }, 300);
  }
};

const loadMore = e => {
  if (!currentCategory) return;
  const loadButton = e.currentTarget;
  loadButton.classList.add('loading');
  setTimeout(() => {
    createPortfolioMarkup(currentCategory, true);
    loadButton.classList.remove('loading');
  }, 300);
};

currentCategory = portfolio[0];
createPortfolioMarkup(currentCategory);

loadMoreBtn.addEventListener('click', loadMore);
portfolioNavigation.addEventListener('click', changePrtfolioCategory);
burger.addEventListener('click', toggleMenu);
