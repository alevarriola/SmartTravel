// aiRecommender.js - OpenAI para recomendaciones
// services/aiRecommender.js

export async function obtenerRecomendacionesAI(destino, perfil, presupuesto) {
	const prompt = `Recomienda actividades en ${destino} para perfil ${perfil} con presupuesto ${presupuesto}.`;

	const response = await fetch('https://magicloops.dev/api/loop/8a201ddc-49e3-4b04-ad85-0bfb97a04d8f/run', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ input: prompt })
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error('Error al obtener respuesta de la IA: ' + errorText);
	}

	const data = await response.json();
	return data;
}

