import { openExerciseModal } from './modal';

const sectionEl = document.getElementById('exercises-section');
const titleEl = document.getElementById('exercises-title');
const listEl = document.getElementById('exercises-list');

export function showExercises() {
  sectionEl.classList.remove('is-hidden');
}

export function renderExercises(exercises = [], title = '') {
  showExercises();
  titleEl.textContent = `Exercises / ${title}`;

  if (!exercises.length) {
    listEl.innerHTML = '<p>No exercises found</p>';
    return;
  }

  listEl.innerHTML = exercises
    .map(
      ({ _id, name, bodyPart, target, caloriesBurned, time, rating }) => `
      <li class="exercise-card">
        <div class="exercise-card__top">
          <span class="badge">WORKOUT</span>
          <span class="rating">${rating.toFixed(1)} ⭐</span>
        </div>

        <h3 class="exercise-card__title">${name}</h3>

        <p class="meta">
          Burned calories: ${caloriesBurned} / ${time} min
        </p>
        <p class="meta">Body part: ${bodyPart}</p>
        <p class="meta">Target: ${target}</p>

        <button class="exercise-card__btn"
                data-id="${_id}">
          Start →
        </button>
      </li>
    `
    )
    .join('');

  listEl.addEventListener('click', e => {
    const btn = e.target.closest('.exercise-card__btn');
    if (!btn) return;
    openExerciseModal(btn.dataset.id);
  });
}