const sectionEl = document.getElementById('exercises-section');
const titleEl = document.getElementById('exercises-title');
const listEl = document.getElementById('exercises-list');

export function showExercises() {
  sectionEl.classList.remove('is-hidden');
}

export function hideExercises() {
  sectionEl.classList.add('is-hidden');
}

export function renderExercises(exercises = [], title = '') {
  titleEl.textContent = title;

  if (!exercises.length) {
    listEl.innerHTML = '<p>No exercises found</p>';
    return;
  }

  listEl.innerHTML = exercises
    .map(
      ({ name, bodyPart, target, caloriesBurned, time }) => `
      <li class="Exercises__card">
        <h3 class="Exercises__name">${name}</h3>
        <p class="Exercises__meta">Body part: ${bodyPart}</p>
        <p class="Exercises__meta">Target: ${target}</p>
        <p class="Exercises__meta">${caloriesBurned} calories / ${time} min</p>
        <button class="Exercises__start" type="button">Start</button>
      </li>
    `
    )
    .join('');
}
import { openExerciseModal } from './modal';

export function renderExercisesList(exercises = [], title = '') {
  titleEl.textContent = title;

  if (!exercises.length) {
    listEl.innerHTML = '<p>No exercises found</p>';
    return;
  }

  listEl.innerHTML = exercises
    .map(
      ({ _id, name, bodyPart, target, caloriesBurned, time }) => `
      <li class="Exercises__card">
        <h3 class="Exercises__name">${name}</h3>
        <p class="Exercises__meta">Body part: ${bodyPart}</p>
        <p class="Exercises__meta">Target: ${target}</p>
        <p class="Exercises__meta">${caloriesBurned} calories / ${time} min</p>
        <button class="Exercises__start" type="button" data-id="${_id}">
          Start
        </button>
      </li>
    `
    )
    .join('');

  listEl.addEventListener('click', event => {
    const btn = event.target.closest('.Exercises__start');
    if (!btn) return;

    openExerciseModal(btn.dataset.id);
  });
}