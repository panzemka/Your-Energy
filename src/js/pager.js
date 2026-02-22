import { ICONS } from './assets.js';

export function renderPager(containerEl, currentPage, totalPages, onSelect) {
  containerEl.innerHTML = '';
  if (totalPages <= 1) return;

  const atStart = currentPage === 1;
  const atEnd = currentPage === totalPages;

  const leftGroup = document.createElement('div');
  leftGroup.className = 'pagination-arrows';
  leftGroup.innerHTML = `
    <button class="pagination-arrow" data-page="first" ${atStart ? 'disabled' : ''} aria-label="First page">
      <img src="${atStart ? ICONS.chevronDoubleLeftLight : ICONS.chevronDoubleLeftDark}" alt="" class="pagination-arrow-icon" />
    </button>
    <button class="pagination-arrow" data-page="prev" ${atStart ? 'disabled' : ''} aria-label="Previous page">
      <img src="${atStart ? ICONS.chevronLeftLight : ICONS.chevronLeftDark}" alt="" class="pagination-arrow-icon" />
    </button>
  `;
  containerEl.appendChild(leftGroup);

  const numbersGroup = document.createElement('div');
  numbersGroup.className = 'pagination-numbers';

  buildPageRange(currentPage, totalPages).forEach(entry => {
    if (entry === '...') {
      const dot = document.createElement('span');
      dot.className = 'pagination-ellipsis';
      dot.textContent = '...';
      numbersGroup.appendChild(dot);
    } else {
      const btn = document.createElement('span');
      btn.className = 'pagination-num';
      if (entry === currentPage) btn.classList.add('is-active');
      btn.textContent = entry;
      btn.dataset.page = entry;
      numbersGroup.appendChild(btn);
    }
  });
  containerEl.appendChild(numbersGroup);

  const rightGroup = document.createElement('div');
  rightGroup.className = 'pagination-arrows pagination-arrows--right';
  rightGroup.innerHTML = `
    <button class="pagination-arrow" data-page="next" ${atEnd ? 'disabled' : ''} aria-label="Next page">
      <img src="${atEnd ? ICONS.chevronLeftLight : ICONS.chevronLeftDark}" alt="" class="pagination-arrow-icon" />
    </button>
    <button class="pagination-arrow" data-page="last" ${atEnd ? 'disabled' : ''} aria-label="Last page">
      <img src="${atEnd ? ICONS.chevronDoubleLeftLight : ICONS.chevronDoubleLeftDark}" alt="" class="pagination-arrow-icon" />
    </button>
  `;
  containerEl.appendChild(rightGroup);

  containerEl.onclick = e => {
    e.stopPropagation();
    const target = e.target.closest('[data-page]');
    if (!target || target.disabled) return;

    let next;
    switch (target.dataset.page) {
      case 'first': next = 1; break;
      case 'prev':  next = Math.max(1, currentPage - 1); break;
      case 'next':  next = Math.min(totalPages, currentPage + 1); break;
      case 'last':  next = totalPages; break;
      default:      next = parseInt(target.dataset.page, 10);
    }

    if (next !== currentPage) onSelect(next);
  };
}

function buildPageRange(current, total) {
  if (total <= 4) return Array.from({ length: total }, (_, i) => i + 1);

  const mid = Math.ceil(total / 2);
  let start = Math.max(1, current - 1);
  let end   = Math.min(total, current + 1);

  if (end - start < 2) {
    if (start === 1) end = Math.min(3, total);
    else if (end === total) start = Math.max(1, total - 2);
  }

  const range = [];

  if (current <= mid) {
    for (let i = start; i <= end; i++) range.push(i);
    if (end < total) range.push('...');
  } else {
    if (start > 1) range.push('...');
    for (let i = start; i <= end; i++) range.push(i);
  }

  return range;
}