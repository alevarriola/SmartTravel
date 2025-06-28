// main.js - Lógica principal de Smart Travel Planner

import { renderSearchForm } from './components/searchForm.js';
import { renderResultsCard } from './components/resultsCard.js';
import { renderMapView } from './components/mapView.js';
import { renderWeatherWidget } from './components/weatherWidget.js';
import { renderActivityList } from './components/activityList.js';

// Inicialización de la app
window.addEventListener('DOMContentLoaded', () => {
    renderSearchForm();
    renderResultsCard();
    renderMapView();
    renderWeatherWidget();
    renderActivityList();
});
