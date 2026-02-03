const QUOTE_URL = 'https://your-energy.b.goit.study/api/quote';
const STORAGE_KEY = 'dailyQuote';

const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');

function isSameDay(dateString) {
  const saved = new Date(dateString).toDateString();
  const today = new Date().toDateString();
  return saved === today;
}

async function fetchQuote() {
  try {
    const response = await fetch(QUOTE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }

    const data = await response.json();
    const quoteData = {
      text: data.quote,
      author: data.author,
      date: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(quoteData));
    renderQuote(quoteData);
  } catch (error) {
    quoteText.textContent = 'Stay active and healthy every day';
    quoteAuthor.textContent = '';
  }
}

function renderQuote({ text, author }) {
  quoteText.textContent = text;
  quoteAuthor.textContent = author ? `— ${author}` : '';
}

export function initQuote() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    const parsed = JSON.parse(saved);
    if (isSameDay(parsed.date)) {
      renderQuote(parsed);
      return;
    }
  }

  fetchQuote();
}