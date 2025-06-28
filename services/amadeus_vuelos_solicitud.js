// Reemplaza 'TU_ACCESS_TOKEN_AQUI' con el token de acceso real que obtuviste de Amadeus.
// Por ejemplo: 'hOTjpiCJOONtGH5wIXJKeI4Joc2S' si ese es tu token válido.
const accessToken = "g46cqV5CjnHbe7Hzo2A0BYLnjHnw";

const originCode = "PAR"; // Código IATA del origen (en este caso, París)
const maxPrice = 200;     // Precio máximo deseado

const url = `https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${originCode}&maxPrice=${maxPrice}`;

const headers = {
    "Authorization": `Bearer ${accessToken}`
};

async function getFlightDestinations() {
    try {
        const response = await fetch(url, {
            method: 'GET', // Por defecto, fetch usa GET, pero es bueno ser explícito
            headers: headers
        });

        // Verifica si la respuesta fue exitosa (códigos 2xx)
        if (!response.ok) {
            const errorText = await response.text(); // Intenta leer el cuerpo del error
            throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
        }

        const flightDestinationsData = await response.json();
        console.log("Destinos de Vuelo Encontrados:");
        console.log(flightDestinationsData);

        // Opcional: Recorrer y mostrar los destinos de forma más legible
        if (flightDestinationsData.data && flightDestinationsData.data.length > 0) {
            console.log("\n--- Detalles de Destinos ---");
            flightDestinationsData.data.forEach(destination => {
                console.log(`• Destino: ${destination.destination}`);
                console.log(`  Tipo: ${destination.type}`);
                console.log(`  Origen: ${destination.origin}`);
                console.log(`  Precio Mínimo: ${destination.price ? destination.price.total : 'N/A'} ${destination.price ? destination.price.currency : ''}`);
                console.log(`  Fecha de Salida más Temprana: ${destination.departureDate}`);
                console.log(`  Fecha de Regreso más Temprana: ${destination.returnDate}`);
                console.log("-".repeat(30)); // Repite el guion 30 veces
            });
        } else {
            console.log("\nNo se encontraron destinos de vuelo con los criterios especificados.");
        }

    } catch (error) {
        console.error("Error al conectar con la API de Amadeus:", error.message);
        // Puedes agregar más detalles si el error tiene una propiedad 'response' o similar
    }
}

// Llama a la función para ejecutarla
getFlightDestinations();