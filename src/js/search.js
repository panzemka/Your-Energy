import { searchExercises } from './exercises-api';

const formEl = document.getElementById('exercises-search');

formEl.addEventListener('submit', event => {
  event.preventDefault();

  const keyword = event.currentTarget.elements.keyword.value.trim();
  searchExercises(keyword);
});