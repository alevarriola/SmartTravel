// budgetCalc.js - Calcular costo total estimado
export function calculateBudget({ base, travelers = 1, days = 1, extras = 0 }) {
    return (base + extras) * travelers * days;
}
