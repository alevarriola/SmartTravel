# Smart Travel Planner

Proyecto web para planificar viajes inteligentes usando APIs en tiempo real y recomendaciones por IA.

## Estructura del proyecto

```
├── index.html
├── style.css                → Tailwind importado vía CDN
├── main.js                  → Lógica principal
├── assets/                  → Imágenes, íconos
├── components/
│   ├── searchForm.js        → Formulario de búsqueda
│   ├── resultsCard.js       → Mostrar destinos sugeridos
│   ├── mapView.js           → Mapa interactivo con Leaflet
│   ├── weatherWidget.js     → Widget de clima
│   └── activityList.js      → Lista de actividades recomendadas
├── services/
│   ├── flightsAPI.js        → Consultar vuelos (Amadeus/Skyscanner)
│   ├── weatherAPI.js        → OpenWeatherMap
│   ├── placesAPI.js         → Foursquare
│   ├── aiRecommender.js     → OpenAI para recomendaciones
│   └── countriesAPI.js      → REST Countries + GeoNames
├── utils/
│   ├── domUtils.js          → Crear/modificar elementos fácilmente
│   └── budgetCalc.js        → Calcular costo total estimado
├── config.js                → API Keys, URLs base
└── README.md
```

## Instalación y uso

1. Clona el repositorio.
2. Agrega tus claves de API en `config.js`.
3. Abre `index.html` en tu navegador.

## Dependencias
- [Tailwind CSS](https://tailwindcss.com/) vía CDN
- [Leaflet](https://leafletjs.com/) para mapas
- APIs: Amadeus, Skyscanner, OpenWeatherMap, Foursquare, OpenAI, REST Countries, GeoNames

## Licencia
MIT
