const STORAGE_KEY = 'your-energy-favorites';

export function getFavorites() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveFavorite(exercise) {
  const favorites = getFavorites();
  if (favorites.some(item => item._id === exercise._id)) return;

  favorites.push(exercise);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function removeFavorite(id) {
  const favorites = getFavorites().filter(item => item._id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function isFavorite(id) {
  return getFavorites().some(item => item._id === id);
}