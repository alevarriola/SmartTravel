// weatherAPI.js - OpenWeatherMap


import { CONFIG } from '../config';



// mini Pseudo

    // Para tres posibles destinos

// Pronostico del lugar de destino 
    //1. pedimos el pronostico por 5 dias
        // Devuelve 40 bloques (8 por día)
        // agrupar por día
            // promediar y guardar para 1 solo destino. solo del 1 primer dia.




APIKEY = CONFIG.OPENWEATHERMAP_API_KEY;


export async function getWeather(ubicacion) {

    // Lógica para consultar clima
    // Placeholder: return {};


    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(ubicacion)}&units=metric&appid=${API_KEY}`;

    // recibimos respuestas de la API
    try {
    const response = await fetch(url);

    // guardamos de Json a datos pal codigo
    const data = await response.json();

    // Manejo de errores si la ciudad no existe o hay límite de cuota
    if (!response.ok || !data.list) {
        console.error(`Error con ${ubicacion}:`, data.message);
        return { ubicacion, error: true };
    }

    // Primer día: 8 bloques de 3h = 24 horas
    const todayForecast = data.list.slice(0, 8);

    // variables para la suma de temperatura, contar tipos de clima y si llueve o no
    let tempSum = 0;
    let weatherCount = {};
    let rainFound = false;

    // Se suma la temperatura, contamos la cantidad de tipos de climas, y si encuentra lluvia en el dia.
    todayForecast.forEach((entry) => {
        tempSum += entry.main.temp;

        const condition = entry.weather[0].main;
        weatherCount[condition] = (weatherCount[condition] || 0) + 1;

        const rain = entry.rain && entry.rain['3h'];
        if (rain && rain > 0) rainFound = true;
    });



    // calculo de resultados para promediar y si llueve o no.
    const tempAvg = (tempSum / todayForecast.length).toFixed(1);
    const dominantWeather = Object.entries(weatherCount).reduce((a, b) =>
        a[1] > b[1] ? a : b
    )[0];


    // Retorna las variables que vamos a necesitar para el html.
    return {
        ubicacion,
        tempAvg,
        dominantWeather,
        rain: rainFound
    };


    // Por si exixte algun error
    } catch (error) {
        console.error(`Error al obtener el clima de ${ubicacion}:`, error);
        return { ubicacion, error: true };
    }
}