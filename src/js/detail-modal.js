import { fetchWorkoutById } from './http.js';
import { detailModalTemplate } from './templates.js';
import { addToSaved, removeFromSaved, isInSaved } from './saved.js';
import { openReviewModal } from './review-modal.js';
import { ICONS } from './assets.js';

let backdropEl = null;

function onBackdropClick(e) {
  if (e.target === backdropEl || e.target.closest('[data-modal-close]')) {
    closeDetailModal();
  }
}

function onKeydown(e) {
  if (e.key === 'Escape') closeDetailModal();
}

export function initDetailModal() {
  backdropEl = document.querySelector('[data-modal-exercise]');
  if (!backdropEl) return;

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-start-id]');
    if (btn) openDetailModal(btn.dataset.startId);
  });
}

export async function openDetailModal(id) {
  if (!backdropEl) return;

  try {
    const exercise = await fetchWorkoutById(id);
    const saved = isInSaved(id);

    backdropEl.innerHTML = detailModalTemplate(exercise, saved);
    backdropEl.hidden = false;
    document.body.style.overflow = 'hidden';

    backdropEl.addEventListener('click', onBackdropClick);
    document.addEventListener('keydown', onKeydown);

    const favBtn = backdropEl.querySelector('[data-fav-id]');
    if (favBtn) {
      favBtn.addEventListener('click', () => toggleSaved(exercise, favBtn));
    }

    const ratingBtn = backdropEl.querySelector('[data-rating-id]');
    if (ratingBtn) {
      ratingBtn.addEventListener('click', () => {
        closeDetailModal();
        openReviewModal(ratingBtn.dataset.ratingId);
      });
    }
  } catch {
  }
}

function toggleSaved(exercise, btn) {
  const id = exercise._id;
  const labelEl = btn.querySelector('span');
  const iconEl = btn.querySelector('img');

  if (isInSaved(id)) {
    removeFromSaved(id);
    if (labelEl) labelEl.textContent = 'Add to favorites';
    if (iconEl) iconEl.src = ICONS.heartDark;
  } else {
    addToSaved(exercise);
    if (labelEl) labelEl.textContent = 'Remove';
    if (iconEl) iconEl.src = ICONS.heartFilledDark;
  }
}

function closeDetailModal() {
  if (!backdropEl) return;
  backdropEl.removeEventListener('click', onBackdropClick);
  document.removeEventListener('keydown', onKeydown);
  backdropEl.hidden = true;
  backdropEl.innerHTML = '';
  document.body.style.overflow = '';
}