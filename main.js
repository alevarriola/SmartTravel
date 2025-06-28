// main.js - Lógica principal de Smart Travel Planner

import { renderSearchForm } from './components/searchForm.js';
import { renderResultsCard } from './components/resultsCard.js';
import { renderMapView } from './components/mapView.js';
import { renderWeatherWidget } from './components/weatherWidget.js';
import { renderActivityList } from './components/activityList.js';
import { obtenerRecomendacionesAI } from './services/aiRecommender.js';


document.getElementById('botonBuscar').addEventListener('click', async () => {
	const destino = document.getElementById('destino').value;
	const perfil = document.getElementById('perfil').value;
	const presupuesto = document.getElementById('presupuesto').value;

	try {
		const respuesta = await obtenerRecomendacionesAI(destino, perfil, presupuesto);

		// Si Magic Loops devuelve 1 sola:
		renderizarResultados([respuesta]);

		// Si devuelve varias:
		// renderizarResultados(respuesta);
	} catch (error) {
		console.error('Error:', error.message);
	}
});


