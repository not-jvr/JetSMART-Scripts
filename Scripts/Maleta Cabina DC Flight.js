var maletaCabinaDCFlight = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
  clearInterval(maletaCabinaDCFlight);

  var staff = JetSmart.AppContext.isStaff;
  var culture = bookingData.Culture;

  function addCSS() {
    var css = `
    .dc [data-test-id="bundle-ssr-item--j|0-c|none|ALLSEATS"], .dc [data-test-id="bundle-ssr-item--j|1-c|none|ALLSEATS"], .selected-flight.dc.show-offers [data-test-id="bundle-ssr-item--j|0-c|none|LBGC|LBGD|LBGC|LBAG|LBG1|LBG2|BAGC|BAGD|BAG1|BAG2"], .selected-flight.dc.show-offers [data-test-id="bundle-ssr-item--j|1-c|none|LBGC|LBGD|LBGC|LBAG|LBG1|LBG2|BAGC|BAGD|BAG1|BAG2"], .selected-flight.discount-club [data-test-id="bundle-ssr-item--j|0-c|none|LBGC|LBGD|LBGC|LBAG|LBG1|LBG2|BAGC|BAGD|BAG1|BAG2"], .selected-flight.discount-club [data-test-id="bundle-ssr-item--j|1-c|none|LBGC|LBGD|LBGC|LBAG|LBG1|LBG2|BAGC|BAGD|BAG1|BAG2"]{
        display: none !important;
    }

    .selected-flight.discount-club .newItem .bundle-tooltip,  .selected-flight.dc.show-offers .newItem .bundle-tooltip{
        display: none !important;
    }

    [data-test-value="Simple"] .newItem, [data-test-value="Full"] .newItem {
        display: none !important;
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

function insertElementAtPosition(targetSelector, position) {

    var titulo, lineText1 = '';

    switch (culture) {
    case 'en-US':
        titulo = 'Hand Luggage';
        lineText1 = 'It is the luggage you can bring on board during the trip and is included in your fare.';
        break;
    case 'pt-BR':
        titulo = 'Bagagem de Mão';
        lineText1 = 'É a bagagem que você pode levar a bordo durante a viagem e que está incluída na sua tarifa.';
        break;
    default:
        titulo = 'Equipaje de Mano';
        lineText1 = 'Es el equipaje que puedes llevar a bordo durante el viaje y que está incluido en tu tarifa.';
        break;
    }

    var newItemHTML = `
    <li class="newItem">
    <div class="ssr-line">
    <i class="js-icon-bundle js-bundle-cabin-and-checked-bags"></i>

    <div class="ssr-line-name" data-test-id="bundle-ssr-item-name--j|0-c|none|none" data-test-value="1">
    ${titulo}
    </div>


    <div class="bundle-tooltip" data-test-id="bundle-tooltip--j|0-c|none">
    <i class="js-icon-bundle js-bundle-cabin-and-checked-bags"></i>
    <div class="bundle-tooltip-text">

    <h3 data-test-id="bundle-tooltip-title--j|0-c|none">
    ${titulo}
    </h3>

    <div data-test-id="bundle-tooltip-info--j|0-c|none">
    ${lineText1}
    </div>
    
    </div>
    </div>

    </div>
    <!---->
    <i class="js-icon js-flight-tick" data-test-id="bundle-ssr-tick--j|0-i|1"></i>
    <!---->
    </li>`;

    var parser = new DOMParser();
    var targetElements = document.querySelectorAll(targetSelector);

    targetElements.forEach(targetElement => {
        var existingItem = targetElement.querySelector('.newItem');
        if (!existingItem) {
            var newItem = parser.parseFromString(newItemHTML, 'text/html').body.firstChild.cloneNode(true);

            var children = targetElement.children;
            if (position >= children.length) {
                targetElement.appendChild(newItem);
            } else {
                targetElement.insertBefore(newItem, children[position]);
            }
        }
    });
}

function all() {
    insertElementAtPosition('.dc [data-test-id="bundle-selector-option--j|0-c|none"] .bundle-ssr-items ul', 2);
    insertElementAtPosition('.dc [data-test-id="bundle-selector-option--j|1-c|none"] .bundle-ssr-items ul', 2);
    insertElementAtPosition('.selected-flight.dc [data-test-value="None"] ul', 2);
    insertElementAtPosition('.selected-flight.discount-club [data-test-value="None"] ul', 2);
}

function checkStations() {
    var arrivalStation = bookingData.AvailableOutboundJourneys[0].ArrivalStationCode;
    var departureStation = bookingData.AvailableOutboundJourneys[0].DepartureStationCode;

    if (arrivalStation && departureStation) {
        if ((arrivalStation === "MVD" && departureStation === "AEP") || (arrivalStation === "AEP" && departureStation === "MVD") || (arrivalStation === "EZE" && departureStation === "MVD") || (arrivalStation === "MVD" && departureStation === "EZE")) {
            return true;
    }
}
return false;
}

function checkDCMembership() {
    var DC1 = JetSmart.AppContext.hasStandardDcMembership;
    var DC2 = JetSmart.AppContext.hasGroupDcMembership;

    if ((DC1 && DC1 === 'True') || (DC2 && DC2 === 'True')) {
        return true;
    } else {
        return false;
    }
}

if (checkStations() && checkDCMembership() && staff === 'False') {
    addCSS();
    all();
    window.eventBus.subscribe({
      name: "maletaDCFlight",
      callback: function (e) {
          all();
      },
  });
}

}, 600);