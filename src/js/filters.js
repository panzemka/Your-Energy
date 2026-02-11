import { renderCategories } from './categories';

const FILTERS_URL = 'https://your-energy.b.goit.study/api/filters';

const buttons = document.querySelectorAll('.Filters__btn');

let activeFilter = 'Muscles';

async function fetchFilters(filter) {
  try {
    const response = await fetch(`${FILTERS_URL}?filter=${filter}`);
    const data = await response.json();
    renderCategories(data);
  } catch (error) {
    console.error(error);
  }
}

function setActiveButton(btn) {
  buttons.forEach(b => b.classList.remove('Filters__btn--active'));
  btn.classList.add('Filters__btn--active');
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    activeFilter = filter;
    setActiveButton(btn);
    fetchFilters(filter);
  });
});

export function initFilters() {
  fetchFilters(activeFilter);
}