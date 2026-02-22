const API_URL = 'https://your-energy.b.goit.study/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options);

  if (!response.ok) {
    let payload;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    const message = payload?.message ?? `Request failed: ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export function fetchQuote() {
  return request('/quote');
}

export function fetchCategories(filter, page = 1, limit = 12) {
  const params = new URLSearchParams({ filter, page, limit });
  return request(`/filters?${params}`);
}

export function fetchWorkouts(params = {}) {
  const query = new URLSearchParams(params);
  return request(`/exercises?${query}`);
}

export function fetchWorkoutById(id) {
  return request(`/exercises/${id}`);
}

export function submitRating(id, body) {
  return request(`/exercises/${id}/rating`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export function submitSubscription(email) {
  return request('/subscription', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
}