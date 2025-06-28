// main.js - Lógica principal de Smart Travel Planner

import { renderSearchForm } from './components/searchForm.js';
import { renderResultsCard } from './components/resultsCard.js';
import { renderMapView } from './components/mapView.js';
import { renderWeatherWidget } from './components/weatherWidget.js';
import { getPlaces } from './services/placesAPI.js';
import { renderActivityList } from './components/activityList.js';
import { obtenerRecomendacionesAI } from './services/aiRecommender.js';


document.getElementById('boton-buscar').addEventListener('click', async () => {
    // Ejemplo: el destino se obtiene de un input o select (ajusta según tu UI)
    const destino = document.getElementById('seleccionar-dias').value; // Cambia esto por el campo correcto
    const perfil = document.getElementById('perfil').value;
	  const presupuesto = document.getElementById('presupuesto').value;

    // Mostrar cargando
    document.getElementById('estado-cargando').classList.remove('hidden');

    try {
        // 1. Obtener lugares de interés con Foursquare
        const places = await getPlaces({ near: destino, limit: 8 });

        // 2. Renderizar lugares en la UI
        const actividadesContainer = document.createElement('div');
        actividadesContainer.id = 'lista-actividades';
        document.getElementById('seccion-resultados').prepend(actividadesContainer);
        renderActivityList(places, actividadesContainer);

		const respuesta = await obtenerRecomendacionesAI(destino, perfil, presupuesto);

        // Si Magic Loops devuelve 1 sola:
        renderResultsCard([respuesta]);

        // Si devuelve varias:
        // renderResultsCard(respuesta);
		
        // Ocultar cargando y mostrar resultados
        document.getElementById('estado-cargando').classList.add('hidden');
        document.getElementById('seccion-resultados').classList.remove('hidden');
    } catch (error) {
        alert('Error al buscar lugares: ' + error.message);
        document.getElementById('estado-cargando').classList.add('hidden');
    }
});