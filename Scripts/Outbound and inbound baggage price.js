var initPriceBaggage = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/baggage') return;
  clearInterval(initPriceBaggage);

  var culture = bookingData.Culture;
  var roundtrip = bookingData.Roundtrip;

  function addCSS() {
    var css = `
    .first-container {
      margin: 10px;
    }

    .custom-message-container {
      display: flex;
      justify-content: space-between;
      width: 300px;
      color: white;
      font-size: 14px;
    }

    .price-label {
      flex: 1;
      font-weight: 600;
    }

    .price-value {
      flex: 1;
      text-align: right;
      font-weight: 600;
    }

    .pax {
      color: white;
      font-size: 12px;
      text-align: right;
      font-weight: 600;
    }

    .price-label-mobile {
      font-size: 11px;
    }

    .pax-mobile {
      font-size: 11px;
    }

    .mobile-count-baggage{
      position: absolute;
      bottom: 0;
      margin: 4px 16px 5px 2px !important;
      font-size: 11px;
      color: #1c355e;

    }

    .price-label-mobile {
      font-weight: 600;
    }

    .pax-mobile {
      font-weight: 600;
    }

    ac-per-booking-mobile .b2m-per-booking-section.padded.selected {
      padding-bottom: 60px;
    }
    `;

    var head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  function formatCurrencyValue(value, currency) {
    if (value === 0) {
      return "+ 0";
    }

    switch (currency) {
    case "CLP":
      return ".................. $" + value.toLocaleString();
    case "BRL":
      return ".................. R$" + value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    case "COP":
      return ".................. $" + value.toLocaleString();
    case "SOL":
      return ".................. S/" + value.toLocaleString("es-PE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    case "USD":
      return ".................. $" + value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    case "ARS":
      return ".................. $" + value.toLocaleString("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    default:
      return ".................." + value.toString();
    }
  }

  function formatCurrencyValueMobile(value, currency) {
  if (value === 0) {
    return "+ 0";
  }

  switch (currency) {
    case "CLP":
      return "$" + value.toLocaleString();
    case "BRL":
      return "R$" + value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    case "COP":
      return "$" + value.toLocaleString();
    case "SOL":
      return "S/ " + value.toLocaleString("es-PE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    case "USD":
      return "$" + value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    case "ARS":
      return "$" + value.toLocaleString("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    default:
      return "" + value.toString();
  }
}

  function getCurrentCurrency() {
    var currencyElement = document.querySelector(".flight-currency-select");
    if (currencyElement) {
      return currencyElement.value;
    } else {
      var currencyElementAE = document.querySelector('[data-test-id="sidebar-total-currency"]');
      var currencyAE = currencyElementAE.textContent.trim();

      if (currencyAE === 'CLP' || currencyAE === 'COP' || currencyAE === 'SOL' || currencyAE === 'USD' || currencyAE === 'ARS') {
        return currencyAE;
      } else {
        currencyAE = 'BRL'
        return currencyAE;
      }
    }
  }

  function priceOutboundCabin() {
    var ancillaries = bookingData.Passengers[0].Ancillaries.Outbound.Selected;
    var amountWithLBGD = null;

    for (var i = 0; i < ancillaries.length; i++) {
      var ancillary = ancillaries[i];
      if (ancillary.ChargeCode === "LBGD") {
        amountWithLBGD = ancillary.Amount;
        break;
      }
    }
    return amountWithLBGD;
  }

  function priceReturnCabin() {
    var ancillaries = bookingData.Passengers[0].Ancillaries.Return.Selected;
    var amountWithLBGD = null;

    for (var i = 0; i < ancillaries.length; i++) {
      var ancillary = ancillaries[i];
      if (ancillary.ChargeCode === "LBGD") {
        amountWithLBGD = ancillary.Amount;
        break;
      }
    }
    return amountWithLBGD;
  }

  function addMSGMobile(selector) {
    var msg = document.querySelector('.mobile-count-baggage');
    var container = document.querySelector(selector);
    if (!msg && container) {
      var currency = getCurrentCurrency();
      var idaPrice = formatCurrencyValueMobile(priceOutboundCabin(), currency);
      var textoIda = `Precio vuelo de ida ....................... `;
      var textoVuelta = `Precio vuelo de vuelta ................. `;
      var xPax = '*Por Pasajero';
      var cajaMobile = document.querySelector('ac-per-booking-mobile .b2m-per-booking-section.padded');
      var textMobile = '¿Solo viajarás con mochila? Asegúrate que cumpla con las dimensiones y evita inconvenientes.';

      switch (culture) {
      case "en-US":
        textoIda = `Outbound flight .. `;
        textoVuelta = `Inbound flight .. `;
        textMobile = 'Will you only travel with a backpack? Make sure it complies with the dimensions and avoid inconveniences';
        xPax = '*Per passenger';
        break;
      case "pt-BR":
        textoIda = `Precio voo ida .. `;
        textoVuelta = `Precio voo volta .. `;
        textMobile = 'Vai viajar só com mochila? Certifique-se de que está de acordo com as dimensões e evite transtornos';
        xPax = '*Por passageiro';
        break;
      }
      if (roundtrip) {
        var vueltaPrice = formatCurrencyValueMobile(priceReturnCabin(), currency);
        var mensaje = `
        <div class="mobile-count-baggage" style="display: block;">
        <div class="custom-message-container-mobile">
        <span class="price-label-mobile">${textoIda}${idaPrice}</span>
        </div>
        <div class="custom-message-container-mobile">
        <span class="price-label-mobile">${textoVuelta}${vueltaPrice}</span>
        </div>
        <div class="pax-mobile">${xPax}</div>
        </div>`;
      } else {
        var mensaje = `
        <div class="mobile-count-baggage" style="display: block;">
        <div class="custom-message-container-mobile">
        <span class="price-label-mobile">${textoIda}${idaPrice}</span>
        </div>
        <div class="pax-mobile">${xPax}</div>
        </div>`;
      }
      
      container.insertAdjacentHTML('afterend', mensaje);
    }

    if (msg && msg.style.display === 'none') {
      msg.style.display = 'block';
    }
  }

  function hideElementMobile() {
    var msg = document.querySelector('.mobile-count-baggage');
    if (msg && msg.style.display === 'block') {
      msg.style.display = 'none';
    }
  }
  function clickMobile() {
    var elemento = document.querySelector('ac-per-booking-mobile .b2m-per-booking-section.padded');
    elemento.addEventListener('click', function() {
      setTimeout(function() {
        addMSGMobile('ac-per-booking-mobile .b2m-per-booking-section.padded.selected .b2m-per-booking-selector');
      }, 1500);
    });
  }

  function clickMobileFree() {
    var elemento = document.querySelector('ac-per-booking-mobile .b2m-per-booking-section.free');
    elemento.addEventListener('click', function() {
      hideElementMobile();
    });
  }

  function clickEditMobile1() {
    var button = document.querySelector('[data-test-id="baggage-open-per-journey-per-pax-view-button--c|CabinBaggage-m|1"]');
    if (button) {
      button.addEventListener('click', function () {
        click1EditMobile2();
        console.log("hola")
      });
    }
  }

  function click1EditMobile2() {
    var button = document.querySelector('[data-test-id="baggage-close-per-journey-per-pax-view-button--c|CabinBaggage-m|1"]');
    if (button) {
      button.addEventListener('click', function () {
        clickEditMobile1();
        clickMobile();
        clickMobileFree();
      });
    }
  }

  function addCabinMsgDesktop() {
    var container = document.querySelector('.b2-paid-bag-option.selected .b2-paid-option-btn-container.b2-openable.b2-opened .b2-primary-button');
    if (!document.querySelector('#cabinContainerDesktop') && container) {
      var currency = getCurrentCurrency();
      var idaPrice = formatCurrencyValue(priceOutboundCabin(), currency);
      var textoIda = `Precio vuelo de ida`;
      var textoVuelta = `Precio vuelo de vuelta`;
      var xPax = '*Por Pasajero';

      switch (culture) {
      case "en-US":
        textoIda = `Outbound flight`;
        textoVuelta = `Inbound flight`;
        textMobile = 'Will you only travel with a backpack? Make sure it complies with the dimensions and avoid inconveniences';
        xPax = '*Per passenger';
        break;
      case "pt-BR":
        textoIda = `Precio voo ida`;
        textoVuelta = `Precio voo volta`;
        textMobile = 'Vai viajar só com mochila? Certifique-se de que está de acordo com as dimensões e evite transtornos';
        xPax = '*Por passageiro';
        break;
      }

      if (roundtrip) {
        var vueltaPrice = formatCurrencyValue(priceReturnCabin(), currency);
        var mensaje = `
        <div class="first-container" id="cabinContainerDesktop">
        <div class="custom-message-container">
        <span class="price-label">${textoIda}</span>
        <span class="price-value">${idaPrice}</span>
        </div>
        <div class="custom-message-container">
        <span class="price-label">${textoVuelta}</span>
        <span class="price-value">${vueltaPrice}</span>
        </div>
        <div class="pax">${xPax}</div>
        </div>
        `;
      } else {
        var mensaje = `
        <div class="first-container" id="cabinContainerDesktop">
        <div class="custom-message-container">
        <span class="price-label">${textoIda}</span>
        <span class="price-value">${idaPrice}</span>
        </div>
        <div class="pax">${xPax}</div>
        </div>
        `;
      }
      container.insertAdjacentHTML('afterend', mensaje);
    }
  }

  function clickDesktop() {
    var elemento = document.querySelector('[data-test-id="baggage-per-booking-paid-illustration--c|CabinBaggage"]');
    elemento.addEventListener('click', function() {
      setTimeout(function() {
        addCabinMsgDesktop();
      }, 1500);
    });
  }

  function clickDesktop2() {
    var elemento = document.querySelector('[data-test-id="baggage-per-booking-paid-illustration--c|CabinBaggage"] .b2-primary-button');
    elemento.addEventListener('click', function() {
      setTimeout(function() {
        addCabinMsgDesktop();
      }, 1500);
    });
  }

  function esConexion() {
    var outboundFlight = bookingData.AvailableOutboundJourneys[0];
    var returnFlight = bookingData.AvailableReturnJourneys[0];

    if (returnFlight) {
      var conexionOutbound = outboundFlight.IsConnectedFlight;
      var conexionReturn = returnFlight.IsConnectedFlight;

      if (conexionOutbound || conexionReturn) {
        return true;
      } else {
        return false;
      }
    } else if (outboundFlight) {
      var conexionOutbound = outboundFlight.IsConnectedFlight;

      if (conexionOutbound) {
        return true;
      } else {
        return false;
      }
    }
  }

  if (!esConexion()) {
    addCSS();
    addCabinMsgDesktop();
    clickDesktop();
    clickDesktop2();
    addMSGMobile('ac-per-booking-mobile .b2m-per-booking-section.padded.selected .b2m-per-booking-selector');
    clickMobile();
    clickMobileFree();
    clickEditMobile1();
  }

}, 600);