let containerEl = null;
let searchCallback = null;

function onKeydown(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    triggerSearch();
  }
}

function onBtnClick() {
  triggerSearch();
}

function triggerSearch() {
  if (!containerEl || !searchCallback) return;
  const input = containerEl.querySelector('.exercises-search-input');
  searchCallback(input.value.trim());
}

export function initFinder(callback) {
  containerEl = document.querySelector('.exercises-search');
  if (!containerEl) return;

  searchCallback = callback;
  containerEl.hidden = false;

  const input = containerEl.querySelector('.exercises-search-input');
  const btn = containerEl.querySelector('.exercises-search-btn');

  input.addEventListener('keydown', onKeydown);
  btn.addEventListener('click', onBtnClick);
}

export function destroyFinder() {
  if (!containerEl) return;

  const input = containerEl.querySelector('.exercises-search-input');
  const btn = containerEl.querySelector('.exercises-search-btn');

  input.removeEventListener('keydown', onKeydown);
  btn.removeEventListener('click', onBtnClick);

  input.value = '';
  containerEl.hidden = true;
  containerEl = null;
  searchCallback = null;
}