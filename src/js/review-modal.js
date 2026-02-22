import { submitRating } from './http.js';
import { reviewModalTemplate } from './templates.js';
import { ICONS } from './assets.js';
import { openDetailModal } from './detail-modal.js';

let backdropEl = null;
let targetId = null;
let chosenRating = 0;

const EMAIL_RE = /^\w+(\.\w+)?@[a-zA-Z_]+(\.[a-zA-Z_]+)*\.[a-zA-Z]{2,3}$/;

function onBackdropClick(e) {
  if (e.target === backdropEl || e.target.closest('[data-modal-close]')) {
    closeReviewModal();
  }
}

function onKeydown(e) {
  if (e.key === 'Escape') closeReviewModal();
}

export function initReviewModal() {
  backdropEl = document.querySelector('[data-modal-rating]');
}

export function openReviewModal(exerciseId) {
  if (!backdropEl) return;

  targetId = exerciseId;
  chosenRating = 0;

  backdropEl.innerHTML = reviewModalTemplate(exerciseId);
  backdropEl.hidden = false;
  document.body.style.overflow = 'hidden';

  backdropEl.addEventListener('click', onBackdropClick);
  document.addEventListener('keydown', onKeydown);

  bindStars();
  bindForm();
}

function bindStars() {
  const stars = backdropEl.querySelectorAll('[data-star]');
  const valueEl = backdropEl.querySelector('.modal-rating-value');

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
  const form = backdropEl.querySelector('.modal-rating-form');
  if (form) form.addEventListener('submit', handleSubmit);
}

async function handleSubmit(e) {
  e.preventDefault();

  const form  = e.currentTarget;
  const msgEl = form.querySelector('.modal-rating-message');
  const email = form.email.value.trim();
  const review = form.review.value.trim();

  if (!chosenRating) {
    notify(msgEl, 'Please select a rating before submitting.', 'error');
    return;
  }
  if (!EMAIL_RE.test(email)) {
    notify(msgEl, 'Please enter a valid email address.', 'error');
    return;
  }
  if (!review) {
    notify(msgEl, 'Please leave a comment before submitting.', 'error');
    return;
  }

  try {
    await submitRating(targetId, { rate: chosenRating, email, review });
    notify(msgEl, 'Thank you for your feedback!', 'success');

    setTimeout(() => {
      const id = targetId;
      closeReviewModal();
      openDetailModal(id);
    }, 1500);
  } catch (err) {
    notify(msgEl, err.message || 'Something went wrong. Please try again.', 'error');
  }
}

function closeReviewModal() {
  if (!backdropEl) return;
  backdropEl.removeEventListener('click', onBackdropClick);
  document.removeEventListener('keydown', onKeydown);
  backdropEl.hidden = true;
  backdropEl.innerHTML = '';
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