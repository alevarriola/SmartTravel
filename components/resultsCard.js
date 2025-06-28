// resultsCard.js - Mostrar destinos sugeridos

    // Lógica para renderizar las tarjetas de resultados
    // Placeholder: console.log('Render results card');

    // components/resultsCards.js

export function renderResultsCard(recomendaciones) {
	const contenedor = document.getElementById('resultado');
	contenedor.innerHTML = ''; // Limpiar resultados anteriores

	recomendaciones.forEach(data => {
		const card = document.createElement('div');
		card.className = 'bg-white p-6 rounded-xl shadow-xl max-w-3xl mx-auto mt-6 space-y-4';

		card.innerHTML = `
			<h2 class="text-2xl font-bold text-gray-800">${data.destino}</h2>
			<p class="text-gray-600">Perfil: <strong>${data.perfil}</strong></p>
			<p class="text-gray-600">Presupuesto: <strong>${data.presupuesto}</strong></p>
			<img src="${data.imagen_destino}" alt="Imagen de ${data.destino}" class="w-full h-64 object-cover rounded-lg shadow-md" />

			<div class="mt-4 space-y-2">
				<h3 class="text-xl font-semibold text-gray-700">Itinerario</h3>
				${data.itinerario.map(dia => `
					<div class="bg-gray-100 p-3 rounded-md">
						<h4 class="font-bold">Día ${dia.día}</h4>
						<ul class="list-disc ml-5 text-gray-700">
							${dia.actividades.map(act => `<li>${act}</li>`).join('')}
						</ul>
						<p class="text-sm text-gray-600 mt-2">Costo estimado: $${dia.coste_estimado}</p>
					</div>
				`).join('')}
			</div>

			<div class="mt-4">
				<h3 class="text-xl font-semibold text-gray-700">Tips locales</h3>
				<ul class="list-disc ml-5 text-gray-700">
					${data.tips_locales.map(tip => `<li>${tip}</li>`).join('')}
				</ul>
			</div>
		`;

		contenedor.appendChild(card);
	});
}


