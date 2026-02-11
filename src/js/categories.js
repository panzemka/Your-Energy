import { fetchExercises } from './exercises-api.js';
import { showExercises } from './exercises.js';

const listEl = document.getElementById('categories-list');

export function renderCategories(categories) {
  if (!categories || !categories.length) {
    listEl.innerHTML = '<p>No categories found</p>';
    return;
  }

  listEl.innerHTML = categories
    .map(({ name, imgURL, filter }) => `
      <li>
        <div
          class="Categories__card"
          data-name="${name}"
          data-filter="${filter}">

          <img
            src="${imgURL}"
            alt="${name}" />

          <span class="Categories__name">${name}</span>

        </div>
      </li>
    `)
    .join('');
}

listEl.addEventListener('click', event => {
  const card = event.target.closest('.Categories__card');
  if (!card) return;

  const category = card.dataset.name;
  const filter = card.dataset.filter;

  showExercises(category);
  fetchExercises({ category, filter });
});
