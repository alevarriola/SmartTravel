// domUtils.js - Utilidades para manipulación del DOM
export function createElement(tag, options = {}) {
    const el = document.createElement(tag);
    Object.entries(options).forEach(([key, value]) => {
        if (key === 'class') el.className = value;
        else if (key === 'text') el.textContent = value;
        else el.setAttribute(key, value);
    });
    return el;
}

export function clearElement(el) {
    while (el.firstChild) el.removeChild(el.firstChild);
}
