// searchForm.js - Formulario de búsqueda de viajes
import { crearElemento, agregarClase, eliminarClase } from '../utils/domUtils.js';

export function renderizarFormularioBusqueda() {
    const inputPresupuesto = document.getElementById('rango-presupuesto');
    const mostrarPresupuesto = document.getElementById('mostrar-presupuesto');
    const selectDias = document.getElementById('seleccionar-dias');
    const selectViajeros = document.getElementById('seleccionar-viajeros');
    const botonBuscar = document.getElementById('boton-buscar');
    const interesesBtns = document.querySelectorAll('.interest-btn');
    let interesesSeleccionados = new Set();

    // Intereses: selección visual y lógica
    interesesBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const interes = btn.dataset.interest || btn.dataset.interes;
            if (interesesSeleccionados.has(interes)) {
                interesesSeleccionados.delete(interes);
                btn.classList.remove('selected');
            } else {
                interesesSeleccionados.add(interes);
                btn.classList.add('selected');
            }
        });
    });

    // Slider de presupuesto
    if (inputPresupuesto && mostrarPresupuesto) {
        inputPresupuesto.addEventListener('input', e => {
            mostrarPresupuesto.textContent = `$${Number(e.target.value).toLocaleString()} USD`;
        });
        mostrarPresupuesto.textContent = `$${Number(inputPresupuesto.value).toLocaleString()} USD`;
    }

    // Botón buscar: recolecta datos y dispara evento personalizado
    if (botonBuscar) {
        botonBuscar.addEventListener('click', () => {
            const datos = {
                presupuesto: parseInt(inputPresupuesto.value),
                dias: parseInt(selectDias.value),
                viajeros: parseInt(selectViajeros.value),
                intereses: Array.from(interesesSeleccionados)
            };
            if (datos.presupuesto < 500 || datos.intereses.length === 0) {
                alert('Completa todos los campos y selecciona al menos un interés.');
                return;
            }
            const eventoBusqueda = new CustomEvent('travel-search', { detail: datos });
            document.dispatchEvent(eventoBusqueda);
        });
    }
}
