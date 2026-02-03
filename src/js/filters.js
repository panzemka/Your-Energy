import { renderCategories } from './categories';

const FILTERS_URL = 'https://your-energy.b.goit.study/api/filters';

const filtersContainer = document.querySelector('.Filters__buttons');
const buttons = document.querySelectorAll('.Filters__btn');

let activeFilter = 'Muscles';

function setActiveButton(target) {
  buttons.forEach(btn => btn.classList.remove('Filters__btn--active'));
  target.classList.add('Filters__btn--active');
}

async function fetchFilters(filter) {
  try {
    const response = await fetch(`${FILTERS_URL}?filter=${filter}`);
    if (!response.ok) throw new Error('Failed to fetch filters');

    const data = await response.json();

    renderCategories(data);
  } catch (error) {
    console.error(error);
  }
}

filtersContainer.addEventListener('click', event => {
  const button = event.target.closest('.Filters__btn');
  if (!button) return;

  const filter = button.dataset.filter;
  if (filter === activeFilter) return;

  activeFilter = filter;
  setActiveButton(button);
  fetchFilters(filter);
});

export function initFilters() {
  fetchFilters(activeFilter); 
}