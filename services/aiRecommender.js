import { CONFIG } from '../config.js';

export async function obtenerRecomendacionesAI(presupuesto, dias, viajeros, interes) {
  const input = { budget: presupuesto, duration: dias, people: viajeros, interest: interes };
  const url = `${CONFIG.MAGICLOOPS_URL}?input=${encodeURIComponent(JSON.stringify(input))}`;
  const res = await fetch(url);
  const datos = await res.json();
  return datos.ciudades || [];
}
