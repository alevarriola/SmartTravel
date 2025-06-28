// activityList.js - Lista de actividades recomendadas

/**
 * Renderiza una lista de lugares de interés en el contenedor dado.
 * @param {Array} places - Lugares de interés de Foursquare
 * @param {HTMLElement} container - Elemento donde mostrar la lista
 */
export function renderActivityList(places, container) {
    container.innerHTML = '';
    if (!places.length) {
        container.innerHTML = '<p class="text-gray-500">No se encontraron lugares de interés.</p>';
        return;
    }
    const ul = document.createElement('ul');
    ul.className = 'space-y-2';
    places.forEach(place => {
        const li = document.createElement('li');
        li.className = 'p-3 bg-gray-100 rounded-lg flex flex-col';
        li.innerHTML = `
            <span class="font-semibold text-gray-800">${place.name}</span>
            <span class="text-sm text-gray-600">${place.location?.formatted_address || ''}</span>
            <span class="text-xs text-blue-600">${place.categories?.[0]?.name || ''}</span>
        `;
        ul.appendChild(li);
    });
    container.appendChild(ul);
}
