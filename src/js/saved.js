import { workoutCardTemplate } from './templates.js';
import { renderPager } from './pager.js';

const STORAGE_KEY = 'savedWorkouts';
const PER_PAGE = 8;

export function getSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

export function addToSaved(exercise) {
  const list = getSaved();
  if (list.some(item => item._id === exercise._id)) return;
  list.push(exercise);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function removeFromSaved(id) {
  const updated = getSaved().filter(item => item._id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function isInSaved(id) {
  return getSaved().some(item => item._id === id);
}

export function initSavedPage() {
  const listEl  = document.querySelector('.favorites-list');
  const pagerEl = document.querySelector('.favorites-content .pagination');
  if (!listEl) return;

  let page = 1;

  function render(targetPage) {
    page = targetPage;
    const items = getSaved();

    if (items.length === 0) {
      listEl.innerHTML = `<li class="favorites-empty">
        <p>It appears that you haven't added any exercises to your favorites yet.
        Start exploring and add exercises that you enjoy to your favorites for easy access in the future.</p>
      </li>`;
      if (pagerEl) pagerEl.innerHTML = '';
      return;
    }

    const totalPages = Math.ceil(items.length / PER_PAGE);
    if (page > totalPages) page = totalPages;

    const start = (page - 1) * PER_PAGE;
    const slice = items.slice(start, start + PER_PAGE);

    listEl.innerHTML = slice
      .map(ex => workoutCardTemplate(ex, { showTrash: true }))
      .join('');

    if (pagerEl) renderPager(pagerEl, page, totalPages, render);
  }

  listEl.addEventListener('click', e => {
    const btn = e.target.closest('[data-remove-id]');
    if (!btn) return;
    removeFromSaved(btn.dataset.removeId);
    render(page);
  });

  render(1);
}