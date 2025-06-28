    import { obtenerRecomendacionesAI } from './services/aiRecommender.js';
    import { getPlaces } from './services/placesAPI.js';
    import { obtenerClima } from './services/weatherAPI.js';
    import { renderResultsCard } from './components/resultsCard.js';
    import { renderActivityList } from './components/activityList.js';

    // Actualizar valor mostrado del slider presupuesto
    document.getElementById('presupuesto').addEventListener('input', e => {
    document.getElementById('presupuesto-valor').textContent = e.target.value;
    });

    document.getElementById('buscar').addEventListener('click', async () => {
    // Obtener valores de inputs, presupuesto convertido a entero
    const presupuesto = parseInt(document.getElementById('presupuesto').value, 10);
    const dias = parseInt(document.getElementById('dias').value, 10);
    const viajeros = parseInt(document.getElementById('viajeros').value, 10);
    const interes = document.getElementById('interes').value;

    // Validar inputs mínimos (opcional)
    if (isNaN(presupuesto) || presupuesto < 500) {
        alert('Por favor ingresa un presupuesto válido (mínimo 500).');
        return;
    }

    try {
        // Pedir recomendaciones AI
        const recomendaciones = await obtenerRecomendacionesAI(presupuesto, dias, viajeros, interes);

        if (!recomendaciones.length) {
        alert('No se encontraron destinos para esos parámetros.');
        return;
        }

        // Renderizar las tarjetas de resultados
        await renderResultsCard(recomendaciones);

        // Obtener y mostrar lugares sugeridos para la primera ciudad recomendada
        const ciudad = recomendaciones[0].ciudad;
        const lugares = await getPlaces({ near: ciudad });
        renderActivityList(lugares, document.getElementById('lista-actividades'));

        // Mostrar sección de resultados si estaba oculta
        document.getElementById('resultados').classList.remove('hidden');
    } catch (error) {
        alert('Error al buscar recomendaciones: ' + error.message);
    }
    });
