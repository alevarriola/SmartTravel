import { CONFIG } from '../config.js';

export async function obtenerClima(ciudad) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&units=metric&appid=${CONFIG.OPENWEATHERMAP_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  const today = data.list.slice(0, 8);
  const temp = (today.reduce((sum, e) => sum + e.main.temp, 0) / today.length).toFixed(1);
  const clima = today[0].weather[0].main;
  return { ciudad, temperatura: temp, clima };
}
