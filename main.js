// main.js - Lógica principal de Smart Travel Planner

import { renderSearchForm } from './components/searchForm.js';
import { renderResultsCard } from './components/resultsCard.js';
import { renderMapView } from './components/mapView.js';
import { renderWeatherWidget } from './components/weatherWidget.js';
import { getPlaces } from './services/placesAPI.js';
import { renderActivityList } from './components/activityList.js';
import { obtenerRecomendacionesAI } from './services/aiRecommender.js';

// Escucha el evento personalizado del formulario
document.addEventListener('travel-search', async (event) => {
    const datos = event.detail;
    const destino = datos.destino || 'México';
    const dias = datos.dias;
    const viajeros = datos.viajeros;
    const presupuesto = datos.presupuesto;
    const intereses = datos.intereses;

document.getElementById('boton-buscar').addEventListener('click', async () => {
    // Ejemplo: el destino se obtiene de un input o select (ajusta según tu UI)
    const destino = document.getElementById('seleccionar-dias').value; // Cambia esto por el campo correcto
    const perfil = document.getElementById('perfil').value;
	  const presupuesto = document.getElementById('presupuesto').value;

    // Mostrar cargando
    document.getElementById('estado-cargando').classList.remove('hidden');

    try {
        const lugares = await getPlaces({ near: destino, limit: 8 });

        let actividadesContainer = document.getElementById('lista-actividades');
        if (!actividadesContainer) {
            actividadesContainer = document.createElement('div');
            actividadesContainer.id = 'lista-actividades';
            document.getElementById('seccion-resultados').prepend(actividadesContainer);
        }
        renderActivityList(lugares, actividadesContainer);

        const respuesta = await obtenerRecomendacionesAI(destino, intereses.join(', '), presupuesto);

        if (Array.isArray(respuesta)) {
            renderResultsCard(respuesta);
        } else {
            renderResultsCard([respuesta]);
        }

        document.getElementById('estado-cargando').classList.add('hidden');
        document.getElementById('seccion-resultados').classList.remove('hidden');
    } catch (error) {
        alert('Error al buscar lugares: ' + error.message);
        document.getElementById('estado-cargando').classList.add('hidden');
    }
});

// Inicializa el formulario (si tienes lógica de renderizado)
renderSearchForm();
});
