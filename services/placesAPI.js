import { FOURSQUARE_API_KEY, FOURSQUARE_BASE_URL } from '../config.js';

/**
 * Busca lugares de interés cerca de una ubicación.
 * @param {Object} params - { near: string, query: string, limit: number }
 * @returns {Promise<Array>} Lista de lugares
 */
export async function getPlaces({ near, query = '', limit = 10 }) {
    const url = new URL(FOURSQUARE_BASE_URL);
    url.searchParams.append('near', near);
    if (query) url.searchParams.append('query', query);
    url.searchParams.append('limit', limit);

    const response = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Authorization': FOURSQUARE_API_KEY
        }
    });

    if (!response.ok) {
        throw new Error('Error al consultar Foursquare: ' + response.statusText);
    }

    const data = await response.json();
    return data.results || [];
}
