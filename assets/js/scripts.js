const burger = document.querySelector('[data-js="burger"]');
const navigation = burger.closest('header').querySelector('.navigation');
const portfolioNavigation = document.querySelector('[data-js="portfolio-navigation"]');
const portfolio = [
  { category: 'hairdresser', items: [1, 2, 3, 4, 5] },
  { category: 'nail', items: [1, 2, 3, 4, 5, 6, 7, 8] },
  { category: 'brow', items: [] },
  { category: 'mekup', items: [] },
  { category: 'cosmetology', items: [] },
];

const toggleMenu = e => {
  burger.classList.toggle('open');
  navigation.classList.toggle('open');
};

const createPortfolioMarkup = ({ category, items }) => {
  let categoryHTML = '';
  const portfolioEl = document.querySelector('.portfolio__collection');
  portfolioEl.classList.remove('active');
  setTimeout(() => {
    if (!items || !category || items.length === 0) {
      categoryHTML = '<p>Категория пуста...</p>';
    } else {
      categoryHTML = items
        .map(
          item => `
            <li>
              <a href="./assets/img/portfolio/${category}/${item}.webp" data-fancybox="gallery" data-src="./assets/img/portfolio/${category}/${item}.webp">
                <img src="./assets/img/portfolio/${category}/${item}.webp" width="200" height="150" alt="" />
              </a>
            </li>
    `
        )
        .join('');
    }

    portfolioEl.innerHTML = categoryHTML;

    portfolioEl.classList.add('active');
  }, 300);
};

const changePrtfolioCategory = async e => {
  if (!e.target.dataset.category) return;

  const activeButton = document.querySelector('.portfolio__button.active');
  const button = e.target;
  const category = button.dataset.category;
  const categoryCollection = portfolio.find(item => item.category === category);

  if (activeButton) activeButton.classList.remove('active');
  if (button) button.classList.add('active');

  try {
    button.classList.add('loading');
    await createPortfolioMarkup(categoryCollection);
  } finally {
    setTimeout(() => {
      button.classList.remove('loading');
    }, 300);
  }
};

createPortfolioMarkup(portfolio[0]);
burger.addEventListener('click', toggleMenu);
portfolioNavigation.addEventListener('click', changePrtfolioCategory);
