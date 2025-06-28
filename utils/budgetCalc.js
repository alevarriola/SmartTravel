// calculoPresupuesto.js - Calcular costo total estimado
// utils/calculoPresupuesto.js

/**
 * Porcentajes de desglose de presupuesto para diferentes categorías
 */
const CATEGORIAS_PRESUPUESTO = {
    vuelos: 0.4,      // 40% para vuelos
    alojamiento: 0.3, // 30% para hoteles/alojamiento
    comida: 0.15,     // 15% para comidas
    actividades: 0.10, // 10% para actividades y atracciones
    transporte: 0.05  // 5% para transporte local
};

/**
 * Costos base diarios por tipo de destino (USD por persona por día)
 */
const COSTOS_DESTINO = {
    economico: {
        alojamiento: 25,
        comida: 15,
        actividades: 10,
        transporte: 5
    },
    medio: {
        alojamiento: 60,
        comida: 35,
        actividades: 25,
        transporte: 15
    },
    lujo: {
        alojamiento: 150,
        comida: 80,
        actividades: 60,
        transporte: 30
    }
};

/**
 * Multiplicadores regionales de costo
 */
const MULTIPLICADORES_REGION = {
    'Sudeste Asiático': 0.7,
    'Centroamérica': 0.8,
    'Sudamérica': 0.85,
    'Europa del Este': 0.9,
    'Europa del Sur': 1.1,
    'Europa Occidental': 1.4,
    'Norteamérica': 1.3,
    'Oceanía': 1.5,
    'Medio Oriente': 1.2,
    'Asia Oriental': 1.1,
    'África': 0.8,
    'Escandinavia': 1.6,
    'Caribe': 1.3
};

/**
 * Calcula el desglose del presupuesto según el total, viajeros y días
 * @param {number} presupuestoTotal - Presupuesto total en USD
 * @param {number} viajeros - Número de viajeros
 * @param {number} dias - Número de días
 * @returns {Object} Desglose del presupuesto
 */
export function obtenerDesglosePresupuesto(presupuestoTotal, viajeros, dias) {
    const desglose = {};
    
    Object.entries(CATEGORIAS_PRESUPUESTO).forEach(([categoria, porcentaje]) => {
        desglose[categoria] = Math.round(presupuestoTotal * porcentaje);
    });
    
    // Calcular por persona por día para alojamiento y comida
    desglose.alojamientoPorNoche = Math.round(desglose.alojamiento / dias);
    desglose.comidaPorPersonaPorDia = Math.round(desglose.comida / (viajeros * dias));
    desglose.actividadesPorPersonaPorDia = Math.round(desglose.actividades / (viajeros * dias));
    desglose.transportePorPersonaPorDia = Math.round(desglose.transporte / (viajeros * dias));
    
    return desglose;
}

/**
 * Calcula el costo total estimado para un destino
 * @param {Object} params - Parámetros de cálculo
 * @returns {Object} Estimación de costos
 */
export function calcularPresupuestoTotal(params) {
    const {
        dias,
        viajeros,
        tipoDestino = 'medio',
        region = 'Europa Occidental',
        costoVuelo = null,
        incluirVuelos = true
    } = params;
    
    const costosBase = COSTOS_DESTINO[tipoDestino];
    const multiplicador = MULTIPLICADORES_REGION[region] || 1;
    
    // Calcular costo diario por persona
    const costoDiarioPorPersona = Object.values(costosBase).reduce((suma, costo) => {
        return suma + (costo * multiplicador);
    }, 0);
    
    // Calcular total para todos los viajeros y días
    const totalCostosDiarios = costoDiarioPorPersona * viajeros * dias;
    
    // Agregar costos de vuelo si se incluye
    let costoTotal = totalCostosDiarios;
    if (incluirVuelos) {
        const estimadoVuelo = costoVuelo || estimarCostoVuelo(region, viajeros);
        costoTotal += estimadoVuelo;
    }
    
    return {
        costoTotal: Math.round(costoTotal),
        costoDiarioPorPersona: Math.round(costoDiarioPorPersona),
        desglose: {
            alojamiento: Math.round(costosBase.alojamiento * multiplicador * viajeros * dias),
            comida: Math.round(costosBase.comida * multiplicador * viajeros * dias),
            actividades: Math.round(costosBase.actividades * multiplicador * viajeros * dias),
            transporte: Math.round(costosBase.transporte * multiplicador * viajeros * dias),
            vuelos: incluirVuelos ? (costoVuelo || estimarCostoVuelo(region, viajeros)) : 0
        },
        region,
        tipoDestino,
        multiplicador
    };
}

/**
 * Estima el costo de vuelo según región y viajeros
 * @param {string} region - Región de destino
 * @param {number} viajeros - Número de viajeros
 * @returns {number} Costo estimado de vuelo
 */
function estimarCostoVuelo(region, viajeros) {
    const costosBaseVuelo = {
        'Sudeste Asiático': 800,
        'Centroamérica': 400,
        'Sudamérica': 600,
        'Europa del Este': 300,
        'Europa del Sur': 250,
        'Europa Occidental': 400,
        'Norteamérica': 500,
        'Oceanía': 1200,
        'Medio Oriente': 600,
        'Asia Oriental': 700,
        'África': 800,
        'Escandinavia': 450,
        'Caribe': 350
    };
    
    const costoBase = costosBaseVuelo[region] || 500;
    return costoBase * viajeros;
}

/**
 * Determina el tipo de destino según presupuesto y días
 * @param {number} presupuesto - Presupuesto total
 * @param {number} viajeros - Número de viajeros
 * @param {number} dias - Número de días
 * @returns {string} Tipo de destino (economico, medio, lujo)
 */
export function obtenerTipoDestino(presupuesto, viajeros, dias) {
    const presupuestoPorPersonaPorDia = presupuesto / (viajeros * dias);
    
    if (presupuestoPorPersonaPorDia < 60) return 'economico';
    if (presupuestoPorPersonaPorDia < 150) return 'medio';
    return 'lujo';
}

/**
 * Sugiere una asignación óptima del presupuesto
 * @param {number} presupuestoTotal - Presupuesto disponible
 * @param {number} viajeros - Número de viajeros
 * @param {number} dias - Número de días
 * @param {Array} prioridades - Array de prioridades del usuario
 * @returns {Object} Asignación optimizada
 */
export function obtenerPresupuestoOptimizado(presupuestoTotal, viajeros, dias, prioridades = []) {
    let asignacion = { ...CATEGORIAS_PRESUPUESTO };
    
    // Ajustar según prioridades
    if (prioridades.includes('comida') || prioridades.includes('gastronomia')) {
        asignacion.comida += 0.05;
        asignacion.actividades -= 0.03;
        asignacion.transporte -= 0.02;
    }
    
    if (prioridades.includes('aventura') || prioridades.includes('adventure')) {
        asignacion.actividades += 0.05;
        asignacion.comida -= 0.03;
        asignacion.alojamiento -= 0.02;
    }
    
    if (prioridades.includes('lujo') || prioridades.includes('luxury')) {
        asignacion.alojamiento += 0.1;
        asignacion.comida += 0.05;
        asignacion.actividades -= 0.05;
        asignacion.transporte -= 0.05;
        asignacion.vuelos -= 0.05;
    }
    
    // Mínimos
    const minimos = {
        vuelos: 0.25,
        alojamiento: 0.2,
        comida: 0.1,
        actividades: 0.05,
        transporte: 0.03
    };
    
    Object.keys(asignacion).forEach(key => {
        if (asignacion[key] < minimos[key]) {
            asignacion[key] = minimos[key];
        }
    });
    
    // Normalizar
    const total = Object.values(asignacion).reduce((suma, val) => suma + val, 0);
    Object.keys(asignacion).forEach(key => {
        asignacion[key] = asignacion[key] / total;
    });
    
    // Calcular montos
    const presupuestoOptimo = {};
    Object.entries(asignacion).forEach(([categoria, porcentaje]) => {
        presupuestoOptimo[categoria] = Math.round(presupuestoTotal * porcentaje);
    });
    
    return {
        asignacion,
        montos: presupuestoOptimo,
        recomendaciones: generarRecomendacionesPresupuesto(presupuestoOptimo, viajeros, dias)
    };
}

/**
 * Genera recomendaciones según la asignación
 * @param {Object} presupuesto - Desglose de presupuesto
 * @param {number} viajeros - Número de viajeros
 * @param {number} dias - Número de días
 * @returns {Array} Recomendaciones
 */
function generarRecomendacionesPresupuesto(presupuesto, viajeros, dias) {
    const recomendaciones = [];
    
    const alojamientoPorNoche = presupuesto.alojamiento / dias;
    const comidaPorPersonaPorDia = presupuesto.comida / (viajeros * dias);
    
    if (alojamientoPorNoche < 50) {
        recomendaciones.push('Considera hostales o alojamientos compartidos para maximizar tu presupuesto');
    } else if (alojamientoPorNoche > 200) {
        recomendaciones.push('Puedes permitirte hoteles de lujo o resorts premium');
    }
    
    if (comidaPorPersonaPorDia < 20) {
        recomendaciones.push('Busca mercados locales y cocina cuando sea posible');
    } else if (comidaPorPersonaPorDia > 50) {
        recomendaciones.push('Puedes disfrutar de restaurantes de alta gama y experiencias gastronómicas');
    }
    
    if (presupuesto.actividades / viajeros < 100) {
        recomendaciones.push('Busca actividades gratuitas como museos con entrada libre o rutas de senderismo');
    }
    
    return recomendaciones;
}

/**
 * Compara el presupuesto con los costos estimados del destino
 * @param {number} presupuesto - Presupuesto del usuario
 * @param {string} destino - Nombre del destino
 * @param {number} viajeros - Número de viajeros
 * @param {number} dias - Número de días
 * @returns {Object} Resultado de la comparación
 */
export function compararPresupuestoConDestino(presupuesto, destino, viajeros, dias) {
    // Aquí normalmente se usarían datos reales del destino
    // Por ahora, estimamos según conocimiento común
    
    const mapaRegiones = {
        'Tailandia': 'Sudeste Asiático',
        'Vietnam': 'Sudeste Asiático',
        'India': 'Sudeste Asiático',
        'México': 'Centroamérica',
        'Costa Rica': 'Centroamérica',
        'Guatemala': 'Centroamérica',
        'Brasil': 'Sudamérica',
        'Argentina': 'Sudamérica',
        'Chile': 'Sudamérica',
        'España': 'Europa del Sur',
        'Italia': 'Europa del Sur',
        'Francia': 'Europa Occidental',
        'Alemania': 'Europa Occidental',
        'Reino Unido': 'Europa Occidental',
        'Estados Unidos': 'Norteamérica',
        'Canadá': 'Norteamérica',
        'Australia': 'Oceanía',
        'Japón': 'Asia Oriental',
        'China': 'Asia Oriental',
        'Egipto': 'África',
        'Sudáfrica': 'África',
        'Suecia': 'Escandinavia',
        'Noruega': 'Escandinavia',
        'Finlandia': 'Escandinavia',
        'Cuba': 'Caribe',
        'República Dominicana': 'Caribe',
        'Puerto Rico': 'Caribe'
    };
    
    const region = mapaRegiones[destino] || 'Europa Occidental';
    const tipoDestino = obtenerTipoDestino(presupuesto, viajeros, dias);
    const resultado = calcularPresupuestoTotal({
        dias,
        viajeros,
        tipoDestino,
        region
    });
    
    return {
        region,
        tipoDestino,
        ...resultado
    };
}