// searchForm.js - Formulario de búsqueda de viajes
// components/searchForm.js
import { crearElemento, agregarClase, eliminarClase } from '../utils/domUtils.js';

export function renderizarFormularioBusqueda() {
    // Aquí asume que existe un div con id 'formulario-busqueda' en el HTML
    const contenedor = document.getElementById('formulario-busqueda');
    if (!contenedor) return;
    contenedor.innerHTML = '';
    // Crear campos del formulario
    const inputDestino = crearElemento('input', {
        id: 'campo-destino',
        type: 'text',
        placeholder: 'Destino (ej: París, México, Tokio...)',
        className: 'w-full p-3 border border-gray-300 rounded-lg mb-2',
    });
    const inputPresupuesto = crearElemento('input', {
        id: 'rango-presupuesto',
        type: 'range',
        min: 500,
        max: 10000,
        value: 1000,
        className: 'w-full mb-2',
    });
    const mostrarPresupuesto = crearElemento('span', {
        id: 'mostrar-presupuesto',
        textContent: '$1000 USD',
        className: 'ml-2 font-bold',
    });
    const selectDias = crearElemento('select', {
        id: 'seleccionar-dias',
        className: 'w-full mb-2',
    }, [
        ...Array.from({ length: 30 }, (_, i) => crearElemento('option', { value: i + 1, textContent: `${i + 1} días` }))
    ]);
    const selectViajeros = crearElemento('select', {
        id: 'seleccionar-viajeros',
        className: 'w-full mb-2',
    }, [
        ...Array.from({ length: 10 }, (_, i) => crearElemento('option', { value: i + 1, textContent: `${i + 1} viajero${i > 0 ? 's' : ''}` }))
    ]);
    // Intereses
    const intereses = ['cultura', 'aventura', 'gastronomia', 'naturaleza', 'playa', 'lujo'];
    const contenedorIntereses = crearElemento('div', { className: 'flex flex-wrap gap-2 mb-2' },
        intereses.map(interes => {
            const btn = crearElemento('button', {
                type: 'button',
                className: 'interest-btn px-3 py-1 rounded border border-gray-400',
                'data-interes': interes,
                textContent: interes.charAt(0).toUpperCase() + interes.slice(1)
            });
            return btn;
        })
    );
    // Botón buscar
    const botonBuscar = crearElemento('button', {
        id: 'boton-buscar',
        type: 'button',
        className: 'w-full bg-blue-600 text-white py-2 rounded mt-2',
        textContent: 'Buscar viaje'
    });
    // Ensamblar formulario
    contenedor.append(
        inputDestino,
        inputPresupuesto,
        mostrarPresupuesto,
        selectDias,
        selectViajeros,
        contenedorIntereses,
        botonBuscar
    );
    // Lógica de interacción
    let interesesSeleccionados = new Set();
    inputPresupuesto.addEventListener('input', e => {
        mostrarPresupuesto.textContent = `$${e.target.value} USD`;
    });
    contenedorIntereses.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            const interes = btn.dataset.interes;
            if (interesesSeleccionados.has(interes)) {
                interesesSeleccionados.delete(interes);
                eliminarClase(btn, 'bg-blue-600', 'text-white');
            } else {
                interesesSeleccionados.add(interes);
                agregarClase(btn, 'bg-blue-600', 'text-white');
            }
        });
    });
    botonBuscar.addEventListener('click', () => {
        const datos = {
            destino: inputDestino.value,
            presupuesto: parseInt(inputPresupuesto.value),
            dias: parseInt(selectDias.value),
            viajeros: parseInt(selectViajeros.value),
            intereses: Array.from(interesesSeleccionados)
        };
        // Validación básica
        if (!datos.destino || datos.presupuesto < 500 || datos.intereses.length === 0) {
            alert('Completa todos los campos y selecciona al menos un interés.');
            return;
        }
        const eventoBusqueda = new CustomEvent('travel-search', { detail: datos });
        document.dispatchEvent(eventoBusqueda);
    });
}
