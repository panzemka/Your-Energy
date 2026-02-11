import { getFavorites } from './favorites-storage.js';
import { openExerciseModal } from './modal.js';

const listEl = document.getElementById('favorites-list');

function renderStars(rating = 0) {
  return Array.from({ length: 5 }, (_, i) => `
    <span class="Card__star ${
      i < Math.round(rating) ? 'Card__star--active' : ''
    }">★</span>
  `).join('');
}

function renderFavorites() {
  const favorites = getFavorites();

  if (!favorites.length) {
    listEl.innerHTML = `
      <p class="Favorites__empty">
        It appears that you haven't added any exercises to your favorites yet.
      </p>
    `;
    return;
  }

  listEl.innerHTML = favorites
    .map(
      ({
        _id,
        name,
        bodyPart,
        target,
        caloriesBurned,
        rating = 0,
      }) => `
      <li class="Card">
        <div class="Card__top">
          <span class="Card__badge">WORKOUT</span>
          <div class="Card__rating">
            <span class="Card__rating-value">${rating.toFixed(1)}</span>
            <div class="Card__stars">
              ${renderStars(rating)}
            </div>
          </div>
        </div>

        <h3 class="Card__title">${name}</h3>

        <ul class="Card__meta">
          <li><span>Burned calories:</span>${caloriesBurned} cal</li>
          <li><span>Body part:</span>${bodyPart}</li>
          <li><span>Target:</span>${target}</li>
        </ul>

        <button
          class="Card__btn"
          data-id="${_id}">
          Start →
        </button>
      </li>
    `
    )
    .join('');
}

listEl.addEventListener('click', e => {
  const btn = e.target.closest('.Card__btn');
  if (!btn) return;
  openExerciseModal(btn.dataset.id);
});

document.addEventListener('DOMContentLoaded', renderFavorites);
