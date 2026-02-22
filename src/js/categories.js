import { fetchCategories } from './http.js';
import { categoryCardTemplate } from './templates.js';
import { renderPager } from './pager.js';
import { showWorkouts, hideWorkouts } from './workouts.js';

const FILTER_LABELS = {
  muscles:      'Muscles',
  'body-parts': 'Body parts',
  equipment:    'Equipment',
};

const FILTER_PARAMS = {
  muscles:      'muscles',
  'body-parts': 'bodypart',
  equipment:    'equipment',
};

let activeFilter = 'muscles';
let currentPage = 1;
let inWorkoutsView = false;

export function initCategories() {
  const tabsEl    = document.querySelector('.exercises-tabs');
  const listEl    = document.querySelector('.exercises-list');
  const pagerEl   = document.querySelector('.exercises-grid .pagination');
  const titleEl   = document.querySelector('.exercises-title');

  if (!tabsEl || !listEl) return;

  tabsEl.addEventListener('click', e => {
    const tab = e.target.closest('.exercises-tab');
    if (!tab) return;

    tabsEl.querySelectorAll('.exercises-tab').forEach(t => t.classList.remove('is-active'));
    tab.classList.add('is-active');

    activeFilter = tab.dataset.filter;
    currentPage = 1;
    inWorkoutsView = false;

    hideWorkouts();
    if (titleEl) titleEl.textContent = 'Exercises';
    loadCategories(listEl, pagerEl);
  });

  listEl.addEventListener('click', e => {
    const card = e.target.closest('.exercise-card');
    if (!card || inWorkoutsView) return;
    e.preventDefault();

    inWorkoutsView = true;
    const name = card.dataset.name;
    const paramKey = FILTER_PARAMS[activeFilter];

    showWorkouts(name, paramKey, titleEl, listEl, pagerEl, () => {
      inWorkoutsView = false;
      currentPage = 1;
      loadCategories(listEl, pagerEl);
    });
  });

  loadCategories(listEl, pagerEl);
}

async function loadCategories(listEl, pagerEl) {
  const label = FILTER_LABELS[activeFilter];

  try {
    const data = await fetchCategories(label, currentPage, 12);
    const items = data.results ?? [];

    listEl.innerHTML = items.length
      ? items.map(categoryCardTemplate).join('')
      : '<li class="exercise-card"><p class="exercises-empty-msg">No categories found.</p></li>';

    const total = parseInt(data.totalPages, 10) || 1;
    if (pagerEl) {
      renderPager(pagerEl, currentPage, total, page => {
        currentPage = page;
        loadCategories(listEl, pagerEl);
      });
    }
  } catch {
    listEl.innerHTML = '<li class="exercise-card"><p class="exercises-empty-msg">Failed to load categories. Please try again later.</p></li>';
  }
}