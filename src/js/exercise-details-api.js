const DETAILS_URL = 'https://your-energy.b.goit.study/api/exercises';

export async function fetchExerciseDetails(id) {
  const response = await fetch(`${DETAILS_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch exercise details');
  }
  return response.json();
}