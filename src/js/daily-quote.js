import { fetchQuote } from './http.js';

const QUOTE_KEY = 'dailyQuote';

function todayString() {
  return new Date().toDateString();
}

function readFromCache() {
  try {
    const raw = localStorage.getItem(QUOTE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.date !== todayString()) return null;
    return { quote: data.quote, author: data.author };
  } catch {
    return null;
  }
}

function writeToCache(quote, author) {
  try {
    localStorage.setItem(
      QUOTE_KEY,
      JSON.stringify({ quote, author, date: todayString() })
    );
  } catch {
    // storage may be unavailable
  }
}

function renderQuote(quote, author) {
  const textEl = document.querySelector('.quote-card-quote');
  const authorEl = document.querySelector('.quote-card-author');
  if (textEl) textEl.textContent = quote;
  if (authorEl) authorEl.textContent = author;
}

export function initDailyQuote() {
  const cached = readFromCache();
  if (cached) {
    renderQuote(cached.quote, cached.author);
    return;
  }

  fetchQuote()
    .then(data => {
      renderQuote(data.quote, data.author);
      writeToCache(data.quote, data.author);
    })
    .catch(() => {
      // fallback to static HTML content
    });
}