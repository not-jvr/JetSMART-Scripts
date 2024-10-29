//IDA//

var outboundFlightsInfo = [];

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

function countFlightsOutbound() {
  var flightOptions = document.querySelectorAll('[data-test-id="flight-options-list--j|0"] ac-flight-fee-option');

  flightOptions.forEach((option, index) => {
      option.classList.add('outbound-' + index);
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
    var container = document.querySelector('[data-test-id="flight-options-list--j|0"] .fee-selector ul');
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

//VUELTA//

var returnFlightsInfo = [];

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

function countFlightsReturn() {
  var flightOptions = document.querySelectorAll('[data-test-id="flight-options-list--j|1"] ac-flight-fee-option');

  flightOptions.forEach((option, index) => {
      option.classList.add('return-' + index);
  });
}

function getOrderOfEarliestReturnFlights() {
    if (returnFlightsInfo.length === 0) {
        console.log("No se encontraron vuelos de vuelta.");
        return [];
    }

    var sortedFlights = [...returnFlightsInfo];
    sortedFlights.sort(function(a, b) {
        return new Date(a.departureDate) - new Date(b.departureDate);
    });

    return sortedFlights.map(function(flight) {
        return flight.id;
    });
}

function moveReturnFlightsToSortedOrder(sortedOrder) {
    var container = document.querySelector('[data-test-id="flight-options-list--j|1"] .fee-selector ul');
    sortedOrder.reverse(); // Invertir el orden para mover del último al primero

    sortedOrder.forEach(function(id) {
        var flightElement = document.querySelector('.' + id);
        if (flightElement) {
            container.prepend(flightElement);
        }
    });
}

countFlightsReturn();
infoFlightsReturn();
var sortedOrder2 = getOrderOfEarliestReturnFlights();
moveReturnFlightsToSortedOrder(sortedOrder2);