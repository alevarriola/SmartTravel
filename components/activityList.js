export function renderActivityList(places, container) {
  container.innerHTML = '<h3 class="text-lg font-semibold mt-4 mb-2">Lugares sugeridos:</h3>';
  const ul = document.createElement('ul');
  ul.className = 'space-y-2';

  places.forEach(place => {
    const li = document.createElement('li');
    li.className = 'bg-white p-4 rounded shadow';
    li.innerHTML = `
      <strong>${place.name}</strong><br>
      <span class="text-sm text-gray-600">${place.location?.formatted_address || ''}</span><br>
      <span class="text-xs text-blue-500">${place.categories?.[0]?.name || ''}</span>
    `;
    ul.appendChild(li);
  });

  container.appendChild(ul);
}

