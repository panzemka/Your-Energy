import { fetchNextPage } from './exercises-api';

const paginationEl = document.getElementById('exercises-pagination');

export function renderPagination(totalPages, currentPage) {
  if (totalPages <= 1) {
    paginationEl.innerHTML = '';
    return;
  }

  paginationEl.innerHTML = Array.from({ length: totalPages }, (_, i) => {
    const page = i + 1;
    const activeClass =
      page === currentPage ? 'Exercises__page--active' : '';

    return `
      <button
        class="Exercises__page ${activeClass}"
        type="button"
        data-page="${page}"
      >
        ${page}
      </button>
    `;
  }).join('');
}

paginationEl.addEventListener('click', event => {
  const btn = event.target.closest('.Exercises__page');
  if (!btn) return;

  fetchNextPage(Number(btn.dataset.page));
});
