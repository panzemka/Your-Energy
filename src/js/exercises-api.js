import { renderExercises } from './exercises.js';
import { renderPagination } from './pagination.js';

const EXERCISES_URL = 'https://your-energy.b.goit.study/api/exercises';

let currentCategory = '';
let currentFilter = '';
let currentPage = 1;
let currentKeyword = '';
const limit = 12;

export async function fetchExercises({
  category,
  filter,
  page = 1,
  keyword = '',
}) {
  currentCategory = category;
  currentFilter = filter;
  currentPage = page;
  currentKeyword = keyword;

  const params = new URLSearchParams({
    page,
    limit,
  });

  if (keyword) {
    params.append('keyword', keyword);
  }

  if (filter === 'Muscles') {
    params.append('muscles', category.toLowerCase());
  }

  if (filter === 'Body parts') {
    params.append('bodypart', category.toLowerCase());
  }

  if (filter === 'Equipment') {
    params.append('equipment', category.toLowerCase());
  }

  try {
    const response = await fetch(
      `${EXERCISES_URL}?${params.toString()}`
    );

    const data = await response.json();

    renderExercises(data.results, category);
    renderPagination(data.totalPages, page);
  } catch (error) {
    console.error(error);
  }
}

export function fetchNextPage(page) {
  fetchExercises({
    category: currentCategory,
    filter: currentFilter,
    page,
    keyword: currentKeyword,
  });
}

export function searchExercises(keyword) {
  fetchExercises({
    category: currentCategory,
    filter: currentFilter,
    page: 1,
    keyword,
  });
}