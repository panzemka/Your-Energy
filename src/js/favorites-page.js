import { getFavorites, removeFavorite } from './favorites-storage';
import { openExerciseModal } from './modal';

const listEl = document.getElementById('favorites-list');

function renderFavorites() {
  const favorites = getFavorites();

  if (!favorites.length) {
    listEl.innerHTML = '<p>Favorites list is empty</p>';
    return;
  }

  listEl.innerHTML = favorites
    .map(
      ({ _id, name, bodyPart, target, caloriesBurned }) => `
      <li class="Exercises__card">
        <h3>${name}</h3>
        <p>Body part: ${bodyPart}</p>
        <p>Target: ${target}</p>
        <p>${caloriesBurned} calories</p>

        <button class="Exercises__start" data-id="${_id}">
          Start
        </button>

        <button class="Exercises__remove" data-id="${_id}">
          Remove
        </button>
      </li>
    `
    )
    .join('');
}

listEl.addEventListener('click', event => {
  const startBtn = event.target.closest('.Exercises__start');
  const removeBtn = event.target.closest('.Exercises__remove');

  if (startBtn) {
    openExerciseModal(startBtn.dataset.id);
  }

  if (removeBtn) {
    removeFavorite(removeBtn.dataset.id);
    renderFavorites();
  }
});

renderFavorites();
