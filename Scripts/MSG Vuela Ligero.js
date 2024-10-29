var initMSGVuelaLigeroBundle = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/flight') return;
  clearInterval(initMSGVuelaLigeroBundle);

  var culture = bookingData.Culture;

  function addCSS() {
    var css = `
    .contenedor-vuelo-ligero-desktop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 25px 0px 25px;
      background-color: #f0f3f7;
      margin: 20px auto 0 auto;
      max-width: 95%;
      width: 1005px;
      border-radius: 10px;
    }

    .contenedor-vuelo-ligero-desktop .texto-izquierda {
      width: 60%;
    }

    .contenedor-vuelo-ligero-desktop .texto-izquierda p{
      color: #1c355e;
      font-weight: 700;
      font-size: 14px;
      margin-bottom: 0;
    }

    .contenedor-vuelo-ligero-mobile {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px 10px 10px;
      background-color: #f0f3f7;
      margin: 20px auto 0 auto;
      max-width: 95%;
      width: 1005px;
      border-radius: 10px;
    }

    .contenedor-vuelo-ligero-mobile .texto-izquierda {
      width: 70%;
    }

    .contenedor-vuelo-ligero-mobile .texto-izquierda p{
      color: #1c355e;
      font-weight: 700;
      font-size: 12px;
      margin-bottom: 0;
      line-height: 1.2;
    }

    .contenedor-vuelo-ligero-mobile .imagen-derecha img {
      max-width: 23px;
      height: auto;
    }

    @media (max-width: 767px) {

      .contenedor-vuelo-ligero-desktop {
        display: none;
      }
      .selected-flight-container {
        height: auto;
      }
    }

    @media (min-width: 768px) {
      .contenedor-vuelo-ligero-mobile {
        display: none;
      }
    }
    `;
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    head.appendChild(style);
    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  function esVuelaLigero() {
    var ida = document.querySelector('[data-test-id="bundle-selected-header--j|0-c|None"]');
    var vuelta = document.querySelector('[data-test-id="bundle-selected-header--j|1-c|None"]');

    if (ida || vuelta) {
      return true;
    }
    else {
      return false;
    }
  }

  function addHTMLDesktop() {
    var container = document.querySelector('.selected-bundles-container');
    if (container && !document.querySelector('.contenedor-vuelo-ligero-desktop') && esVuelaLigero()) {
      var nuevoElementoHTML = `
      <div class="contenedor-vuelo-ligero-desktop">
      <div class="texto-izquierda">
      <p><strong>Vuela LIGERO</strong> solo incluye mochila y asiento aleatorio. No incluye equipaje de mano, facturado u otros opcionales.</p>
      </div>
      <div class="imagen-derecha">
      <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/93061762-03d8-4092-b72f-5972ca7bde72/Bolso%20de%20mano.png">
      <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/107252d1-d3e5-4d0b-a348-8295164af201/Equipaje%20de%20Mano.png">
      <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/bab3d413-f21d-466b-919d-e032b8fc699b/Equipaje%20Facturado.png">
      </div>
      </div>
      `;

      container.insertAdjacentHTML('afterend', nuevoElementoHTML);
    }
  }

  function addHTMLMobile(selector, index) {
    var container = document.querySelector(selector);
    var vuelaLigero = document.querySelector(`[data-test-id="bundle-selected-header--j|${index}-c|None"]`);

    if (container && vuelaLigero && !document.querySelector(`#vuela-ligero-mobile-${index}`)) {
      var nuevoElementoHTML = `
      <div class="contenedor-vuelo-ligero-mobile" id="vuela-ligero-mobile-${index}">
      <div class="texto-izquierda">
      <p><strong>Vuela LIGERO</strong> solo incluye mochila y asiento aleatorio. No incluye equipaje de mano, facturado u otros opcionales.</p>
      </div>
      <div class="imagen-derecha">
      <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/93061762-03d8-4092-b72f-5972ca7bde72/Bolso%20de%20mano.png">
      <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/107252d1-d3e5-4d0b-a348-8295164af201/Equipaje%20de%20Mano.png">
      <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/bab3d413-f21d-466b-919d-e032b8fc699b/Equipaje%20Facturado.png">
      </div>
      </div>
      `;

      container.insertAdjacentHTML('afterend', nuevoElementoHTML);
    }
  }

  function removeHTMLDesktop() {
    var htmldesktop = document.querySelector('.contenedor-vuelo-ligero-desktop');
    if (!esVuelaLigero() && htmldesktop) {
      htmldesktop.remove();
    }
  }

  function removeHTMLMobile(selector, index) {
    var vuelaLigero = document.querySelector(`[data-test-id="bundle-selected-header--j|${index}-c|None"]`);
    var htmlMobile = document.querySelector(`#vuela-ligero-mobile-${index}`);
    if (!vuelaLigero && htmlMobile) {
      htmlMobile.remove();
    }
  }

  function esColombiaOrigen() {
    var ida = bookingData.AvailableOutboundJourneys[0].DepartureStationCode;
    var codigosPermitidos = ["CUC", "CTG", "MDE", "BOG", "CLO"];

    if (codigosPermitidos.includes(ida)) {
      return true;
    } else {
      return false;
    }
  }

  function allFunctions() {
    addHTMLDesktop();
    addHTMLMobile('[data-test-id="bundle-selected-per-leg--j|0"]', 0);
    addHTMLMobile('[data-test-id="bundle-selected-per-leg--j|1"]', 1);
    removeHTMLDesktop();
    removeHTMLMobile('[data-test-id="bundle-selected-per-leg--j|0"]', 0);
    removeHTMLMobile('[data-test-id="bundle-selected-per-leg--j|1"]', 1);
  }

  if (culture === 'es-CO' && esColombiaOrigen()) {
    addCSS();
    allFunctions();
    window.eventBus.subscribe({
      name: "vuelaLigeroMsg", callback: function (e) {
        allFunctions();
      }
    });
  }

}, 600);