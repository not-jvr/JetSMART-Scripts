var initMSGTarifaPromocional = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/flight') return;
  clearInterval(initMSGTarifaPromocional);

  var culture = bookingData.Culture;

  function addCSS() {
    var css = `
    .contenedor-msg-tarifa-promocional {
      display: flex;
      align-items: center;
      padding: 0px 25px 0px 25px;
      background-color: #f5f5f5;
      margin: 0 auto 20px;
      max-width: 95%;
      width: 730px;
      border-radius: 10px;
      border: 1px solid #163a70;
      justify-content: center;
    }

    .contenedor-msg-tarifa-promocional .izquierda {
      display: flex;
      align-items: center;
    }

    .contenedor-msg-tarifa-promocional .izquierda p{
      margin-bottom: 0;
      color: #1c355e;
    }

    .contenedor-msg-tarifa-promocional .izquierda img {
      max-width: 100px;
      margin-right: 10px;
    }

    @media (max-width: 767px) {

      .contenedor-msg-tarifa-promocional {
        margin: 0 auto 10px;
      }

      .contenedor-msg-tarifa-promocional .izquierda p{
        font-size: 12px;
        line-height: 1.2;
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


  function addHTML(selector, index) {
    var container = document.querySelector(selector);

    if (!document.querySelector(`#msg-tarifa-${index}`) && container) {
      var nuevoElementoHTML = `
      <div class="contenedor-msg-tarifa-promocional" id="msg-tarifa-${index}">
      <div class="izquierda">
      <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/c76d36f4-9125-480b-ac1c-34fe43175c96/%21.Png.png">
      <p>Tarifa promocional, no aplica derecho a desistimiento.</p>
      </div>
      </div>
      `;

      container.insertAdjacentHTML('afterend', nuevoElementoHTML);
    }
  }

  function removeHTML(selector, index) {
    var container = document.querySelector(selector);
    var msg = document.querySelector(`#msg-tarifa-${index}`);

    if (msg && !container) {
      msg.remove();
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
    addHTML('.fee-selector-header.open[data-test-id="flight-header--j|0"]', 0);
    addHTML('.fee-selector-header.open[data-test-id="flight-header--j|1"]', 1);
    removeHTML('.fee-selector-header.open[data-test-id="flight-header--j|0"]', 0);
    removeHTML('.fee-selector-header.open[data-test-id="flight-header--j|1"]', 1);
  }

  if (culture === 'es-CO' && esColombiaOrigen()) {
    addCSS();
    allFunctions();
    window.eventBus.subscribe({
      name: "MSGTARIFAPROMOCIONAL", callback: function (e) {
        allFunctions();
      }
    });
  }

}, 600);