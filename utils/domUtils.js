// domUtils.js - Utilidades para manipulación del DOM
// utils/domUtils.js

/**
 * Crea un elemento DOM con atributos y contenido especificados
 * @param {string} etiqueta - Nombre de la etiqueta HTML
 * @param {Object} opciones - Propiedades y atributos del elemento
 * @param {Array|string} hijos - Elementos hijos o texto
 * @returns {HTMLElement}
 */
export function crearElemento(etiqueta, opciones = {}, hijos = []) {
    const elemento = document.createElement(etiqueta);
    
    // Asignar propiedades y atributos
    Object.entries(opciones).forEach(([clave, valor]) => {
        if (clave === 'textContent' || clave === 'innerHTML') {
            elemento[clave] = valor;
        } else if (clave === 'dataset') {
            Object.entries(valor).forEach(([dataKey, dataValue]) => {
                elemento.dataset[dataKey] = dataValue;
            });
        } else if (clave === 'style' && typeof valor === 'object') {
            Object.assign(elemento.style, valor);
        } else if (clave === 'className' || clave === 'class') {
            elemento.className = valor;
        } else if (clave.startsWith('on') && typeof valor === 'function') {
            elemento.addEventListener(clave.slice(2).toLowerCase(), valor);
        } else {
            elemento.setAttribute(clave, valor);
        }
    });
    
    // Agregar hijos
    if (typeof hijos === 'string') {
        elemento.textContent = hijos;
    } else if (Array.isArray(hijos)) {
        hijos.forEach(hijo => {
            if (typeof hijo === 'string') {
                elemento.appendChild(document.createTextNode(hijo));
            } else if (hijo instanceof HTMLElement) {
                elemento.appendChild(hijo);
            }
        });
    } else if (hijos instanceof HTMLElement) {
        elemento.appendChild(hijos);
    }
    
    return elemento;
}

/**
 * Selecciona de forma segura un elemento del DOM
 * @param {string} selector - Selector CSS
 * @param {HTMLElement} padre - Elemento padre (opcional)
 * @returns {HTMLElement|null}
 */
export function seleccionarElemento(selector, padre = document) {
    try {
        return padre.querySelector(selector);
    } catch (error) {
        console.warn(`Selector inválido: ${selector}`, error);
        return null;
    }
}

/**
 * Selecciona múltiples elementos del DOM
 * @param {string} selector - Selector CSS
 * @param {HTMLElement} padre - Elemento padre (opcional)
 * @returns {NodeList}
 */
export function seleccionarElementos(selector, padre = document) {
    try {
        return padre.querySelectorAll(selector);
    } catch (error) {
        console.warn(`Selector inválido: ${selector}`, error);
        return [];
    }
}

/**
 * Agrega clase(s) CSS a un elemento
 * @param {HTMLElement} elemento - Elemento objetivo
 * @param {...string} clases - Clases CSS a agregar
 */
export function agregarClase(elemento, ...clases) {
    if (elemento && elemento.classList) {
        elemento.classList.add(...clases);
    }
}

/**
 * Elimina clase(s) CSS de un elemento
 * @param {HTMLElement} elemento - Elemento objetivo
 * @param {...string} clases - Clases CSS a eliminar
 */
export function eliminarClase(elemento, ...clases) {
    if (elemento && elemento.classList) {
        elemento.classList.remove(...clases);
    }
}

/**
 * Alterna una clase CSS en un elemento
 * @param {HTMLElement} elemento - Elemento objetivo
 * @param {string} clase - Clase CSS a alternar
 * @param {boolean} forzar - Forzar agregar (true) o eliminar (false)
 * @returns {boolean} - Si la clase está presente tras alternar
 */
export function alternarClase(elemento, clase, forzar) {
    if (elemento && elemento.classList) {
        return elemento.classList.toggle(clase, forzar);
    }
    return false;
}

/**
 * Verifica si un elemento tiene una clase CSS
 * @param {HTMLElement} elemento - Elemento objetivo
 * @param {string} clase - Clase CSS a verificar
 * @returns {boolean}
 */
export function tieneClase(elemento, clase) {
    return elemento && elemento.classList && elemento.classList.contains(clase);
}

/**
 * Asigna múltiples atributos a un elemento
 * @param {HTMLElement} elemento - Elemento objetivo
 * @param {Object} atributos - Pares clave-valor de atributos
 */
export function asignarAtributos(elemento, atributos) {
    if (!elemento) return;
    
    Object.entries(atributos).forEach(([clave, valor]) => {
        if (valor !== null && valor !== undefined) {
            elemento.setAttribute(clave, valor);
        } else {
            elemento.removeAttribute(clave);
        }
    });
}

/**
 * Elimina un elemento del DOM
 * @param {HTMLElement} elemento - Elemento a eliminar
 */
export function eliminarElemento(elemento) {
    if (elemento && elemento.parentNode) {
        elemento.parentNode.removeChild(elemento);
    }
}

/**
 * Vacía el contenido de un elemento
 * @param {HTMLElement} elemento - Elemento a vaciar
 */
export function vaciarElemento(elemento) {
    if (elemento) {
        while (elemento.firstChild) {
            elemento.removeChild(elemento.firstChild);
        }
    }
}

/**
 * Agrega múltiples hijos a un elemento
 * @param {HTMLElement} padre - Elemento padre
 * @param {...HTMLElement} hijos - Hijos a agregar
 */
export function agregarHijos(padre, ...hijos) {
    if (!padre) return;
    
    hijos.forEach(hijo => {
        if (hijo instanceof HTMLElement) {
            padre.appendChild(hijo);
        } else if (typeof hijo === 'string') {
            padre.appendChild(document.createTextNode(hijo));
        }
    });
}

/**
 * Crea un fragmento de documento con varios elementos
 * @param {...HTMLElement} elementos - Elementos a agregar al fragmento
 * @returns {DocumentFragment}
 */
export function crearFragmento(...elementos) {
    const fragmento = document.createDocumentFragment();
    elementos.forEach(elemento => {
        if (elemento instanceof HTMLElement) {
            fragmento.appendChild(elemento);
        }
    });
    return fragmento;
}

/**
 * Muestra un elemento (elimina la clase 'hidden')
 * @param {HTMLElement} elemento - Elemento a mostrar
 */
export function mostrarElemento(elemento) {
    if (elemento) {
        eliminarClase(elemento, 'hidden');
        elemento.style.display = '';
    }
}

/**
 * Oculta un elemento (agrega la clase 'hidden')
 * @param {HTMLElement} elemento - Elemento a ocultar
 */
export function ocultarElemento(elemento) {
    if (elemento) {
        agregarClase(elemento, 'hidden');
    }
}

/**
 * Asigna visibilidad usando display
 * @param {HTMLElement} elemento - Elemento objetivo
 * @param {boolean} visible - Si debe ser visible
 * @param {string} tipoDisplay - Tipo de display (por defecto: 'block')
 */
export function asignarVisibilidad(elemento, visible, tipoDisplay = 'block') {
    if (!elemento) return;
    
    elemento.style.display = visible ? tipoDisplay : 'none';
}

/**
 * Hace scroll suave a un elemento
 * @param {HTMLElement} elemento - Elemento objetivo
 * @param {Object} opciones - Opciones de scroll
 */
export function desplazarAElemento(elemento, opciones = {}) {
    if (elemento) {
        elemento.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
            ...opciones
        });
    }
}

/**
 * Obtiene la posición de un elemento respecto al viewport
 * @param {HTMLElement} elemento - Elemento objetivo
 * @returns {DOMRect|null}
 */
export function obtenerPosicionElemento(elemento) {
    return elemento ? elemento.getBoundingClientRect() : null;
}

/**
 * Verifica si un elemento está en el viewport
 * @param {HTMLElement} elemento - Elemento objetivo
 * @param {number} umbral - Porcentaje visible (0-1)
 * @returns {boolean}
 */
export function estaEnViewport(elemento, umbral = 0) {
    if (!elemento) return false;
    
    const rect = elemento.getBoundingClientRect();
    const altoVentana = window.innerHeight || document.documentElement.clientHeight;
    const anchoVentana = window.innerWidth || document.documentElement.clientWidth;
    
    const verticalVisible = (rect.top <= altoVentana) && ((rect.top + rect.height * umbral) >= 0);
    const horizontalVisible = (rect.left <= anchoVentana) && ((rect.left + rect.width * umbral) >= 0);
    
    return verticalVisible && horizontalVisible;
}

/**
 * Espera a que un elemento exista en el DOM
 * @param {string} selector - Selector CSS
 * @param {number} timeout - Tiempo máximo en ms
 * @returns {Promise<HTMLElement>}
 */
export function esperarElemento(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const elemento = seleccionarElemento(selector);
        if (elemento) {
            resolve(elemento);
        } else {
            const observer = new MutationObserver((mutaciones, obs) => {
                const elementoEsperado = seleccionarElemento(selector);
                if (elementoEsperado) {
                    obs.disconnect();
                    resolve(elementoEsperado);
                }
            });
            observer.observe(document, {
                childList: true,
                subtree: true
            });
            setTimeout(() => {
                observer.disconnect();
                reject(new Error(`No se encontró el elemento ${selector} en el tiempo límite`));
            }, timeout);
        }
    });
}

// Aquí puedes seguir agregando utilidades DOM en español para mantener coherencia.
