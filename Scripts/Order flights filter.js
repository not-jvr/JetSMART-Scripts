var initFilterOrder = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/flight') return;
    clearInterval(initFilterOrder);

    var culture = bookingData.Culture;

    function addCSS() {
        var css = `
        .recommendedContainer {
            margin: 10px 0 10px 75%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .recommendedText {
            color: #55595c;
            font-weight: 700;
            text-align: center;
            cursor: pointer;
            position: relative;
        }

        .recommendedText:hover {
          text-decoration: underline;
      }

      .dropdownContent {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        padding: 12px 16px;
        z-index: 1;
        border-radius: 5px;
        left: 10%;
    }

    .dropdownContent.show {
        display: block;
    }

    .dropdownOption {
        color: #163a70;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        cursor: pointer;
        margin-bottom: 0;
    }

    .dropdownOption:hover {
        background-color: #f1f1f1;
    }

    .week-selector.open {
        margin: 40px 0 10px 0;
    }

    .booking-wrapper.no-bottom-margin.ts-error-container {
        margin: 10px 0;
    }

    .arrow {
        display: inline-block;
        transition: transform 0.3s ease;
        color: #b92234;
    }

    .arrow-up {
      transform: rotate(180deg);
  }

  #selectedOptionText {
    color: #163a70;
}

@media (max-width: 767px) {
    .recommendedContainer {
        margin: 10px 0 10px 45%;
    }
}
`;

var head = document.head || document.getElementsByTagName('head')[0];
var style = document.createElement('style');
head.appendChild(style);
style.type = 'text/css';
if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}
}

function addRecommended() {
    if (!document.querySelector('.recommendedContainer')) {
        var targetElement = document.querySelector('[data-test-id="flight-weekly-selector--j|0"]');
        var orderby = 'Ordenar por: '
        var option0 = 'Precio';
        var option1 = 'Precio';
        var option2 = 'Más temprano';
        var option3 = 'Más tarde';

        switch (culture) {
        case "en-US":
            orderby = 'Sort by: ';
            option0 = 'Price';
            option1 = 'Price';
            option2 = 'Earlier';
            option3 = 'Later';
            break;
        case "pt-BR":
            orderby = 'Ordenar por: ';
            option0 = 'Preço';
            option1 = 'Preço';
            option2 = 'Mais cedo';
            option3 = 'Mais tarde';
            break;
        }

        var html = `
        <div class="recommendedContainer">
        <div class="recommendedText" id="selectedOption">
        ${orderby} <strong id="selectedOptionText">${option0}</strong>
        <span class="arrow">&#9660;</span>
        <div id="dropdown" class="dropdownContent">
        <p class="dropdownOption">${option1}</p>
        <p class="dropdownOption">${option2}</p>
        <p class="dropdownOption">${option3}</p>
        </div>
        </div>
        </div>
        `;
        targetElement.insertAdjacentHTML('afterend', html);

        var buttonToggle = document.querySelector('#selectedOption');
        var dropdownOptions = document.querySelectorAll('.dropdownOption');

        if (buttonToggle) {
            buttonToggle.addEventListener('click', function () {
                toggleDropdown();
            });
        }

        dropdownOptions.forEach(option => {
            option.addEventListener('click', function () {
                selectOption(option.textContent);
            });
        });

        document.addEventListener('click', function (event) {
            if (!event.target.closest('.recommendedContainer')) {
                var dropdown = document.getElementById('dropdown');
                dropdown.classList.remove('show');
            }
        });
    }
}

function toggleDropdown() {
  var dropdown = document.querySelector('#dropdown');
  dropdown.classList.toggle("show");

  var arrow = document.querySelector('.arrow');
  arrow.classList.toggle("arrow-up");
}

function selectOption(option) {
    var selectedOptionText = document.getElementById('selectedOptionText');
    selectedOptionText.textContent = option;
    if (option === 'Más temprano' || option === 'Earlier' || option === 'Mais cedo') {
        masTempranoIda();
        masTempranoVuelta();
    } else if (option === 'Más tarde' || option === 'Later' || option === 'Mais tarde') {
        masTardeIda();
        masTardeVuelta();
    } else if (option === 'Precio' || option === 'Price' || option === 'Preço') {
        masBaratoIDIda();
        masBaratoIDVuelta();
    }
}

/////////////////////////////////IDA//////////////////////

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
  var openOutbound = document.querySelector('[data-test-id="flight-options-list--j|0"] .fee-selector-header.open');

  if (openOutbound) {
    flightOptions.forEach((option, index) => {
      var newClass = 'outbound-' + index;

      // Verificar si el elemento ya tiene un ID "agregado"
      if (!option.getAttribute('id')) {
        // Si no tiene el ID, agregarlo y la clase
        option.setAttribute('id', 'agregado');
        option.classList.add(newClass);
    }
});
}
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

function moveOutboundFlightsToSortedOrderMasTemprano(sortedOrder) {
    var container = document.querySelector('[data-test-id="flight-options-list--j|0"] .fee-selector ul');
    sortedOrder.reverse(); // Invertir el orden para mover del último al primero

    sortedOrder.forEach(function(id) {
        var flightElement = document.querySelector('.' + id);
        if (flightElement) {
            container.prepend(flightElement);
        }
    });
}

function moveOutboundFlightsToSortedOrderMasTarde(sortedOrder) {
    var container = document.querySelector('[data-test-id="flight-options-list--j|0"] .fee-selector ul');

    sortedOrder.forEach(function(id) {
        var flightElement = document.querySelector('.' + id);
        if (flightElement) {
            container.prepend(flightElement);
        }
    });
}

function moveOutboundFlightsToSortedOrderPorID(sortedOrder) {
    var container = document.querySelector('[data-test-id="flight-options-list--j|0"] .fee-selector ul');
    
    sortedOrder.forEach(function(id) {
        var flightElement = document.querySelector('.' + id);
        if (flightElement) {
            container.appendChild(flightElement);
        }
    });
}

function masBaratoIDIda() {
    var sortedOrder = orderByPrice(outboundFlightsInfo);
    moveOutboundFlightsToSortedOrderPorID(sortedOrder);
}

function masTempranoIda() {
    var sortedOrder = getOrderOfEarliestOutboundFlights();
    moveOutboundFlightsToSortedOrderMasTemprano(sortedOrder);
}

function masTardeIda() {
    var sortedOrder = getOrderOfEarliestOutboundFlights();
    moveOutboundFlightsToSortedOrderMasTarde(sortedOrder);
}

/////////////////////VUELTA//////////////////

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
  var openReturn = document.querySelector('[data-test-id="flight-options-list--j|1"] .fee-selector-header.open');

  if (openReturn) {
    flightOptions.forEach((option, index) => {
      var newClass = 'return-' + index;

      // Verificar si el elemento ya tiene un ID "agregado"
      if (!option.getAttribute('id')) {
        // Si no tiene el ID, agregarlo y la clase
        option.setAttribute('id', 'agregado');
        option.classList.add(newClass);
    }
});
}
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

function moveReturnFlightsToSortedOrderMasTemprano(sortedOrder) {
    var container = document.querySelector('[data-test-id="flight-options-list--j|1"] .fee-selector ul');
    sortedOrder.reverse(); // Invertir el orden para mover del último al primero

    sortedOrder.forEach(function(id) {
        var flightElement = document.querySelector('.' + id);
        if (flightElement) {
            container.prepend(flightElement);
        }
    });
}

function moveReturnFlightsToSortedOrderMasTarde(sortedOrder) {
    var container = document.querySelector('[data-test-id="flight-options-list--j|1"] .fee-selector ul');

    sortedOrder.forEach(function(id) {
        var flightElement = document.querySelector('.' + id);
        if (flightElement) {
            container.prepend(flightElement);
        }
    });
}

function moveReturnFlightsToSortedOrderPorID(sortedOrder) {
    var container = document.querySelector('[data-test-id="flight-options-list--j|1"] .fee-selector ul');
    
    sortedOrder.forEach(function(id) {
        var flightElement = document.querySelector('.' + id);
        if (flightElement) {
            container.appendChild(flightElement);
        }
    });
}

function masBaratoIDVuelta() {
    var sortedOrder = orderByPrice(returnFlightsInfo);
    moveReturnFlightsToSortedOrderPorID(sortedOrder);
}

function masTempranoVuelta() {
    var sortedOrder = getOrderOfEarliestReturnFlights();
    moveReturnFlightsToSortedOrderMasTemprano(sortedOrder);
}

function masTardeVuelta() {
    var sortedOrder = getOrderOfEarliestReturnFlights();
    moveReturnFlightsToSortedOrderMasTarde(sortedOrder);
}

///Original (mas barato primero)///

var originalOrderOutbound = [];
var originalOrderReturn = [];

function saveOriginalOrder() {
    var outboundOptions = document.querySelectorAll('[data-test-id="flight-options-list--j|0"] ac-flight-fee-option');
    var returnOptions = document.querySelectorAll('[data-test-id="flight-options-list--j|1"] ac-flight-fee-option');
    
    outboundOptions.forEach(option => {
        originalOrderOutbound.push(option);
    });

    returnOptions.forEach(option => {
        originalOrderReturn.push(option);
    });
}

function revertToOriginalOrder() {
    var outboundContainer = document.querySelector('[data-test-id="flight-options-list--j|0"] .fee-selector ul');
    var returnContainer = document.querySelector('[data-test-id="flight-options-list--j|1"] .fee-selector ul');

    if (outboundContainer) {

        // Agregar las opciones de vuelo en el orden original
        originalOrderOutbound.forEach(option => {
            outboundContainer.appendChild(option);
        });
    }

    if (returnContainer) {
        originalOrderReturn.forEach(option => {
            returnContainer.appendChild(option);
        });
    }
}

function countFlights() {
    var outboundFlights = document.querySelectorAll('[data-test-id="flight-options-list--j|0"] ac-flight-fee-option');
    var returnFlights = document.querySelectorAll('[data-test-id="flight-options-list--j|1"] ac-flight-fee-option');

    if (outboundFlights.length > 1) {
        return true;
    } else if (returnFlights.length > 1) {
        return true;
    } else {
        return false;
    }
}

function orderByPrice(flightsInfo) {
    if (flightsInfo.length === 0) {
        return [];
    }

    var sortedFlights = [...flightsInfo];
    sortedFlights.sort(function(a, b) {
        return a.fareAmount - b.fareAmount;
    });

    return sortedFlights.map(function(flight) {
        return flight.id;
    });
}

function allFunctions() {
    if (countFlights()) {
    //////////////////////
///mas temprano/tarde ida///
        countFlightsOutbound();
        infoFlightsOutbound();

///mas temprano/tarde vuelta///
        if (bookingData.AvailableReturnJourneys) {
            countFlightsReturn();
            infoFlightsReturn();
        }
        addRecommended();
    }
}

addCSS();
saveOriginalOrder(); 
allFunctions();

window.eventBus.subscribe({
    name: "filter",
    callback: function (e) {
        if (document.querySelector('[data-test-id="flight-weekly-selector--j|0"]')) {
            allFunctions();
        }
    }
});

}, 600);