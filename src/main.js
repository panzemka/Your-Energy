import { initQuote } from './js/quote.js';
import { initFilters } from './js/filters.js';
import './js/search.js';
import './js/subscriptions.js';

document.addEventListener('DOMContentLoaded', () => {
  initQuote();
  initFilters();
});
