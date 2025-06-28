import { CONFIG } from '../config.js';

export async function getPlaces({ near, query = '', limit = 6 }) {
  const url = new URL(CONFIG.FOURSQUARE_BASE_URL);
  url.searchParams.append('near', near);
  url.searchParams.append('limit', limit);
  if (query) url.searchParams.append('query', query);

  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: CONFIG.FOURSQUARE_API_KEY
    }
  });
  const data = await res.json();
  return data.results || [];
}
