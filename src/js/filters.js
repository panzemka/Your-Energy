import { renderCategories } from './categories';

const FILTERS_URL = 'https://your-energy.b.goit.study/api/filters';

const buttons = document.querySelectorAll('.Filters__btn');

let activeFilter = 'Muscles';
let currentPage = 1;
const limit = 12;

async function fetchFilters(filter, page = 1) {
  try {
    const params = new URLSearchParams({
      filter,
      page,
      limit,
    });

    const response = await fetch(`${FILTERS_URL}?${params.toString()}`);
    const data = await response.json();

    renderCategories(data.results);
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
    currentPage = 1;
    setActiveButton(btn);
    fetchFilters(filter, currentPage);
  });
});

export function initFilters() {
  fetchFilters(activeFilter, currentPage);
}