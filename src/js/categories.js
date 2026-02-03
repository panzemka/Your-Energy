import { fetchExercises } from './exercises-api';

const listEl = document.getElementById('categories-list');

export function renderCategories(categories = []) {
  if (!categories.length) {
    listEl.innerHTML = '<p>No categories found</p>';
    return;
  }

  listEl.innerHTML = categories
    .map(
      ({ name, filter }) => `
      <li class="Categories__item">
        <button class="Categories__card" type="button">
          <div class="Categories__thumb">
            <div class="Categories__placeholder">IMG</div>
          </div>
          <div class="Categories__info">
            <h3 class="Categories__name">${name}</h3>
            <p class="Categories__type">${filter}</p>
          </div>
        </button>
      </li>
    `
    )
    .join('');
}

listEl.addEventListener('click', event => {
  const card = event.target.closest('.Categories__card');
  if (!card) return;

  const category = card.querySelector('.Categories__name').textContent;
  const filter = card.querySelector('.Categories__type').textContent;

  fetchExercises({ category, filter });
});
