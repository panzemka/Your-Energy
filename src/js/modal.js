import { fetchExerciseDetails } from './exercise-details-api.js';
import {
  getFavorites,
  saveFavorite,
  removeFavorite,
  isFavorite,
} from './favorites-storage.js';

const modalEl = document.getElementById('exercise-modal');
const modalBody = document.getElementById('modal-body');

function openModal() {
  modalEl.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalEl.classList.add('is-hidden');
  modalBody.innerHTML = '';
  document.body.style.overflow = '';
}

modalEl.addEventListener('click', e => {
  if (e.target.hasAttribute('data-close')) {
    closeModal();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

function renderStars(rating) {
  return Array.from({ length: 5 }, (_, i) => `
    <span class="Modal__star ${i < Math.round(rating) ? 'Modal__star--active' : ''}">
      ★
    </span>
  `).join('');
}

export async function openExerciseModal(id) {
  const data = await fetchExerciseDetails(id);
  const favorite = isFavorite(id);

  modalBody.innerHTML = `
    <div class="Modal__wrapper">
      <div class="Modal__image-wrapper">
        <img src="${data.gifUrl}" alt="${data.name}" class="Modal__image" />
      </div>

      <div>
        <h2 class="Modal__title">${data.name}</h2>

        <div class="Modal__rating-block">
          <span class="Modal__rating-value">${data.rating.toFixed(1)}</span>
          <div class="Modal__stars">
            ${renderStars(data.rating)}
          </div>
        </div>

        <ul class="Modal__stats">
          <li><span>Target</span>${data.target}</li>
          <li><span>Body Part</span>${data.bodyPart}</li>
          <li><span>Equipment</span>${data.equipment}</li>
          <li><span>Calories</span>${data.caloriesBurned}</li>
        </ul>

        <p class="Modal__description">
          ${data.description}
        </p>

        <div class="Modal__actions">
          <button class="Modal__btn Modal__btn--primary" id="favorite-btn">
            ${favorite ? 'Remove from favorites' : 'Add to favorites'}
          </button>
        </div>
      </div>
    </div>
  `;

  const favBtn = document.getElementById('favorite-btn');

  favBtn.addEventListener('click', () => {
    if (isFavorite(id)) {
      removeFavorite(id);
      favBtn.textContent = 'Add to favorites';
    } else {
      saveFavorite(data);
      favBtn.textContent = 'Remove from favorites';
    }
  });

  openModal();
}
