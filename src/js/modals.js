import { fetchWorkoutById, submitRating } from './http.js';
import { detailModalTemplate, reviewModalTemplate } from './templates.js';
import { addToSaved, removeFromSaved, isInSaved } from './saved.js';
import { ICONS } from './assets.js';

/* ================= DETAIL MODAL ================= */

let detailBackdrop = null;

function onDetailBackdropClick(e) {
  if (e.target === detailBackdrop || e.target.closest('[data-modal-close]')) {
    closeDetailModal();
  }
}

function onDetailKeydown(e) {
  if (e.key === 'Escape') closeDetailModal();
}

export function initDetailModal() {
  detailBackdrop = document.querySelector('[data-modal-exercise]');
  if (!detailBackdrop) return;

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-start-id]');
    if (btn) openDetailModal(btn.dataset.startId);
  });
}

export async function openDetailModal(id) {
  if (!detailBackdrop) return;

  try {
    const exercise = await fetchWorkoutById(id);
    const saved = isInSaved(id);

    detailBackdrop.innerHTML = detailModalTemplate(exercise, saved);
    detailBackdrop.hidden = false;
    document.body.style.overflow = 'hidden';

    detailBackdrop.addEventListener('click', onDetailBackdropClick);
    document.addEventListener('keydown', onDetailKeydown);

    const favBtn = detailBackdrop.querySelector('[data-fav-id]');
    if (favBtn) {
      favBtn.addEventListener('click', () => toggleSaved(exercise, favBtn));
    }

    const ratingBtn = detailBackdrop.querySelector('[data-rating-id]');
    if (ratingBtn) {
      ratingBtn.addEventListener('click', () => {
        closeDetailModal();
        openReviewModal(ratingBtn.dataset.ratingId);
      });
    }
  } catch {}
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
  if (!detailBackdrop) return;
  detailBackdrop.removeEventListener('click', onDetailBackdropClick);
  document.removeEventListener('keydown', onDetailKeydown);
  detailBackdrop.hidden = true;
  detailBackdrop.innerHTML = '';
  document.body.style.overflow = '';
}

/* ================= REVIEW MODAL ================= */

let reviewBackdrop = null;
let targetId = null;
let chosenRating = 0;

const EMAIL_RE = /^\w+(\.\w+)?@[a-zA-Z_]+(\.[a-zA-Z_]+)*\.[a-zA-Z]{2,3}$/;

function onReviewBackdropClick(e) {
  if (e.target === reviewBackdrop || e.target.closest('[data-modal-close]')) {
    closeReviewModal();
  }
}

function onReviewKeydown(e) {
  if (e.key === 'Escape') closeReviewModal();
}

export function initReviewModal() {
  reviewBackdrop = document.querySelector('[data-modal-rating]');
}

export function openReviewModal(exerciseId) {
  if (!reviewBackdrop) return;

  targetId = exerciseId;
  chosenRating = 0;

  reviewBackdrop.innerHTML = reviewModalTemplate(exerciseId);
  reviewBackdrop.hidden = false;
  document.body.style.overflow = 'hidden';

  reviewBackdrop.addEventListener('click', onReviewBackdropClick);
  document.addEventListener('keydown', onReviewKeydown);

  bindStars();
  bindForm();
}

function bindStars() {
  const stars = reviewBackdrop.querySelectorAll('[data-star]');
  const valueEl = reviewBackdrop.querySelector('.modal-rating-value');

  stars.forEach(star => {
    const select = () => {
      chosenRating = parseInt(star.dataset.star, 10);
      highlightStars(stars, chosenRating);
      if (valueEl) valueEl.textContent = `${chosenRating}.0`;
    };

    star.addEventListener('click', select);
    star.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        select();
      }
    });
  });
}

function bindForm() {
  const form = reviewBackdrop.querySelector('.modal-rating-form');
  if (form) form.addEventListener('submit', handleSubmit);
}

async function handleSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const msgEl = form.querySelector('.modal-rating-message');
  const email = form.email.value.trim();
  const review = form.review.value.trim();

  if (!chosenRating) return notify(msgEl, 'Please select a rating before submitting.', 'error');
  if (!EMAIL_RE.test(email)) return notify(msgEl, 'Please enter a valid email address.', 'error');
  if (!review) return notify(msgEl, 'Please leave a comment before submitting.', 'error');

  try {
    await submitRating(targetId, { rate: chosenRating, email, review });
    notify(msgEl, 'Thank you for your feedback!', 'success');

    setTimeout(() => {
      const id = targetId;
      closeReviewModal();
      openDetailModal(id);
    }, 1500);
  } catch (err) {
    notify(msgEl, err.message || 'Something went wrong.', 'error');
  }
}

function closeReviewModal() {
  if (!reviewBackdrop) return;
  reviewBackdrop.removeEventListener('click', onReviewBackdropClick);
  document.removeEventListener('keydown', onReviewKeydown);
  reviewBackdrop.hidden = true;
  reviewBackdrop.innerHTML = '';
  document.body.style.overflow = '';
  targetId = null;
  chosenRating = 0;
}

function highlightStars(stars, rating) {
  stars.forEach(star => {
    const val = parseInt(star.dataset.star, 10);
    star.src = val <= rating ? ICONS.starOrange : ICONS.starGrey;
  });
}

function notify(el, text, type) {
  if (!el) return;
  el.textContent = text;
  el.className = `modal-rating-message modal-rating-message--${type}`;
  el.hidden = false;
}