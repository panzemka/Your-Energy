import { initDailyQuote }  from './js/daily-quote.js';
import { initCategories }  from './js/categories.js';
import { initSavedPage }   from './js/saved.js';
import { initNewsletter }  from './js/newsletter.js';
import { initDetailModal } from './js/detail-modal.js';
import { initReviewModal } from './js/review-modal.js';

// ── Mobile menu ──────────────────────────────────────────────────────────────
const openBtn   = document.querySelector('[data-menu-open]');
const closeBtn  = document.querySelector('[data-menu-close]');
const menuPanel = document.querySelector('[data-menu]');

function openMenu() {
  menuPanel.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  menuPanel.classList.remove('is-open');
  document.body.style.overflow = '';
}

if (openBtn && closeBtn && menuPanel) {
  openBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menuPanel.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

// ── Footer year ──────────────────────────────────────────────────────────────
const yearEl = document.querySelector('[data-year]');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Init modules ─────────────────────────────────────────────────────────────
initDailyQuote();
initNewsletter();
initDetailModal();
initReviewModal();

if (document.querySelector('.exercises')) {
  initCategories();
}

if (document.querySelector('.favorites')) {
  initSavedPage();
}