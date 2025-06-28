import { obtenerClima } from '../services/weatherAPI.js';

export async function renderResultsCard(recomendaciones) {
  const contenedor = document.getElementById('cuadricula-resultados');
  contenedor.innerHTML = '';
  for (const data of recomendaciones) {
    const clima = await obtenerClima(data.ciudad);
    const div = document.createElement('div');
    div.className = 'p-4 bg-white shadow rounded';
    div.innerHTML = `
      <h3 class="text-lg font-bold">${data.ciudad}, ${data.pais}</h3>
      <p>${data.descripcion}</p>
      <p><strong>Clima:</strong> ${clima.clima}, ${clima.temperatura}°C</p>
      <p><strong>Costo estimado:</strong> $${data.costo_estimado_por_persona}</p>
    `;
    contenedor.appendChild(div);
  }
}
