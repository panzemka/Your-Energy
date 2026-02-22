import { fetchWorkouts } from './http.js';
import { workoutCardTemplate } from './templates.js';
import { renderPager } from './pager.js';
import { initFinder, destroyFinder } from './finder.js';

let listEl = null;
let pagerEl = null;
let onBackFn = null;
let queryParams = {};
let currentPage = 1;

export function showWorkouts(categoryName, paramKey, titleEl, _listEl, _pagerEl, onBack) {
  listEl = _listEl;
  pagerEl = _pagerEl;
  onBackFn = onBack;
  currentPage = 1;
  queryParams = { [paramKey]: categoryName, limit: 10 };

  if (titleEl) {
    titleEl.innerHTML = `<span class="exercises-title-back">Exercises</span> / <span class="exercises-title-category">${categoryName}</span>`;
    const backBtn = titleEl.querySelector('.exercises-title-back');
    if (backBtn) {
      backBtn.addEventListener('click', handleBack, { once: true });
    }
  }

  initFinder(keyword => {
    queryParams.keyword = keyword || undefined;
    currentPage = 1;
    fetchAndRender();
  });

  fetchAndRender();
}

function handleBack() {
  hideWorkouts();
  const titleEl = document.querySelector('.exercises-title');
  if (titleEl) titleEl.textContent = 'Exercises';
  if (onBackFn) onBackFn();
}

export function hideWorkouts() {
  destroyFinder();
  if (listEl) listEl.classList.remove('exercises-list--workouts');
}

async function fetchAndRender() {
  if (!listEl) return;

  const params = { ...queryParams, page: currentPage };
  Object.keys(params).forEach(k => params[k] === undefined && delete params[k]);

  try {
    const data = await fetchWorkouts(params);
    const items = data.results ?? [];

    listEl.innerHTML = items.length
      ? items.map(ex => workoutCardTemplate(ex)).join('')
      : '<li class="workout-card"><p class="exercises-empty-msg">No exercises found. Try a different search term.</p></li>';

    listEl.classList.add('exercises-list--workouts');

    const total = parseInt(data.totalPages, 10) || 1;
    if (pagerEl) {
      renderPager(pagerEl, currentPage, total, page => {
        currentPage = page;
        fetchAndRender();
      });
    }
  } catch {
    listEl.innerHTML = '<li class="workout-card"><p class="exercises-empty-msg">Failed to load exercises. Please try again later.</p></li>';
  }
}