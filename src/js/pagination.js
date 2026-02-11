import { fetchNextPage } from './exercises-api.js';

const paginationEl = document.getElementById('exercises-pagination');

export function renderPagination(totalPages, currentPage) {
  if (!totalPages || totalPages <= 1) {
    paginationEl.innerHTML = '';
    return;
  }

  paginationEl.innerHTML = Array.from(
    { length: totalPages },
    (_, i) => {
      const page = i + 1;

      return `
        <button
          class="Pagination__btn ${
            page === currentPage ? 'Pagination__btn--active' : ''
          }"
          data-page="${page}">
          ${page}
        </button>
      `;
    }
  ).join('');
}

paginationEl.addEventListener('click', e => {
  const btn = e.target.closest('.Pagination__btn');
  if (!btn) return;

  fetchNextPage(Number(btn.dataset.page));
});