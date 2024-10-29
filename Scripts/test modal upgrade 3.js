// Estructura para almacenar la información de los vuelos
var outboundFlightsInfo = [];
var returnFlightsInfo = [];

function infoFlightsOutbound() {
    bookingData.AvailableOutboundJourneys.forEach(function(journey, index) {
        var flightInfo = {
            id: 'outbound-' + index, // Agregar el índice o ID
            departureDate: journey.DepartureDate,
            fareAmount: journey.FareAmount
        };
        outboundFlightsInfo.push(flightInfo);
    });
}

function infoFlightsReturn() {
    bookingData.AvailableReturnJourneys.forEach(function(journey, index) {
        var flightInfo = {
            id: 'return-' + index, // Agregar el índice o ID
            departureDate: journey.DepartureDate,
            fareAmount: journey.FareAmount
        };
        returnFlightsInfo.push(flightInfo);
    });
}

function countFlightsOutbound() {
  var flightOptions = document.querySelectorAll('[data-test-id="flight-options-list--j|0"] ac-flight-fee-option');

  flightOptions.forEach((option, index) => {
      option.classList.add('outbound-' + index);
  });
}

function countFlightsReturn() {
  var flightOptions = document.querySelectorAll('[data-test-id="flight-options-list--j|1"] ac-flight-fee-option');

  flightOptions.forEach((option, index) => {
      option.classList.add('return-' + index);
  });
}

function printFlights() {
    outboundFlightsInfo.forEach(function(flight) {
        console.log("Vuelo ida " + flight.id + ":"); // Mostrar el índice o ID
        console.log("Fecha de salida: " + flight.departureDate);
        console.log("Precio de la tarifa: " + flight.fareAmount);
        console.log("--------------------------");
    });

    returnFlightsInfo.forEach(function(flight) {
        console.log("Vuelo vuelta " + flight.id + ":"); // Mostrar el índice o ID
        console.log("Fecha de salida: " + flight.departureDate);
        console.log("Precio de la tarifa: " + flight.fareAmount);
        console.log("--------------------------");
    });
}

function findEarliestOutboundFlight() {
    if (outboundFlightsInfo.length === 0) {
        console.log("No se encontraron vuelos de ida.");
        return;
    }

    outboundFlightsInfo.sort(function(a, b) {
        return new Date(a.departureDate) - new Date(b.departureDate);
    });

    console.log("Vuelos de ida ordenados por hora de salida:");

    outboundFlightsInfo.forEach(function(flight, index) {
        console.log("ID: " + flight.id); // Imprimir el ID correspondiente
        console.log("Hora de salida: " + flight.departureDate);
        console.log("--------------------------");
    });
}

function findEarliestReturnFlight() {
    if (returnFlightsInfo.length === 0) {
        console.log("No se encontraron vuelos de ida.");
        return;
    }

    returnFlightsInfo.sort(function(a, b) {
        return new Date(a.departureDate) - new Date(b.departureDate);
    });

    console.log("Vuelos de vuelta ordenados por hora de salida:");

    returnFlightsInfo.forEach(function(flight, index) {
        console.log("ID: " + flight.id); // Imprimir el ID correspondiente
        console.log("Hora de salida: " + flight.departureDate);
        console.log("--------------------------");
    });
}

function getOrderOfEarliestOutboundFlights() {
    if (outboundFlightsInfo.length === 0) {
        console.log("No se encontraron vuelos de ida.");
        return [];
    }

    var sortedFlights = [...outboundFlightsInfo];
    sortedFlights.sort(function(a, b) {
        return new Date(a.departureDate) - new Date(b.departureDate);
    });

    return sortedFlights.map(function(flight) {
        return flight.id;
    });
}

function moveOutboundFlightsToSortedOrder(sortedOrder) {
    var container = document.querySelector('[data-test-id="flight-options-list--j|0"]');
    sortedOrder.reverse(); // Invertir el orden para mover del último al primero

    sortedOrder.forEach(function(id) {
        var flightElement = document.querySelector('.' + id);
        if (flightElement) {
            container.prepend(flightElement);
        }
    });
}

countFlightsOutbound();
infoFlightsOutbound();
var sortedOrder = getOrderOfEarliestOutboundFlights();
moveOutboundFlightsToSortedOrder(sortedOrder);
countFlightsOutbound();
infoFlightsOutbound();
findEarliestOutboundFlight();
reorderOutboundFlights();
//countFlightsReturn();
//infoFlightsReturn();
//printFlights();
//findEarliestReturnFlight();