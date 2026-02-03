import { fetchExerciseDetails } from './exercise-details-api';
import {
  saveFavorite,
  removeFavorite,
  isFavorite,
} from './favorites-storage';

const modalEl = document.getElementById('exercise-modal');
const modalBody = document.getElementById('modal-body');

function openModal() {
  modalEl.classList.remove('is-hidden');
  document.addEventListener('keydown', onEsc);
}

function closeModal() {
  modalEl.classList.add('is-hidden');
  modalBody.innerHTML = '';
  document.removeEventListener('keydown', onEsc);
}

function onEsc(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

modalEl.addEventListener('click', event => {
  if (event.target.hasAttribute('data-close')) {
    closeModal();
  }
});

export async function openExerciseModal(id) {
  try {
    const data = await fetchExerciseDetails(id);
    const favorite = isFavorite(id);

    modalBody.innerHTML = `
      <h2>${data.name}</h2>
      <p><strong>Body part:</strong> ${data.bodyPart}</p>
      <p><strong>Target:</strong> ${data.target}</p>
      <p><strong>Calories:</strong> ${data.caloriesBurned}</p>
      <p>${data.description}</p>

      <button
        class="Modal__favorite"
        type="button"
        data-id="${id}"
      >
        ${favorite ? 'Remove from favorites' : 'Add to favorites'}
      </button>
    `;

    const favBtn = modalBody.querySelector('.Modal__favorite');

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
  } catch (error) {
    console.error(error);
  }
}
