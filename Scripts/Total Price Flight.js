var initPrecioTotalFlight = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/flight') return;
  clearInterval(initPrecioTotalFlight);

  var culture = bookingData.Culture;

  function addCSS() {
    var css = `
    .contenedor-total-price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 25px 0px 25px;
      background-color: #f5f5f5;
      margin: 20px auto 0 auto;
      max-width: 95%;
      width: 1005px;
      border-radius: 10px;
      border: 1px solid #163a70;
    }

    .contenedor-total-price .izquierda {
      display: flex;
      align-items: center;
      width: 70%;
    }

    .contenedor-total-price .izquierda img {
      max-width: 100px;
      margin-right: 10px;
    }

    .contenedor-total-price .izquierda p {
      margin-top: 10px;
      color: #1c355e;
      font-weight: 700;
      font-size: 16px;
    }

    .contenedor-total-price .derecha p {
      margin-top: 10px;
      color: #1c355e;
      font-weight: 700;
      font-size: 16px;
    }

    .contenedor-total-price .izquierda p strong {
      font-size: 20px;
    }

    .contenedor-total-price .derecha p strong {
      font-size: 20px;
    }

    .contenedor-total-price .derecha {
      text-align: right;
    }

    .container-total-price-mobile {
      overflow: hidden;
      padding: 0px 25px 0px 25px;
      background-color: #f5f5f5;
      margin: 0 auto 0 auto;
      max-width: 95%;
      width: 1005px;
      border-radius: 10px;
      border: 1px solid #163a70;
    }

    .container-total-price-mobile .top-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px 10px 20px;
      border-bottom: 1px solid #ccc;
    }

    .container-total-price-mobile .top-section p{
      margin-bottom: 0;
      color: #1c355e;
      font-weight: 700;
      font-size: 12px;
      line-height: 1.2;
    }

    .container-total-price-mobile .top-section p strong{
      font-size: 18px;
    }

    .container-total-price-mobile .top-section img {
      max-width: 100%;
      height: auto;
      margin-right: 20px;
    }

    .container-total-price-mobile .bottom-section {
      padding: 10px 20px 10px 20px;
    }

    .container-total-price-mobile .bottom-section p{
      margin-bottom: 0;
      color: #1c355e;
      font-weight: 700;
      font-size: 12px;
      line-height: 1.2;
    }

    .container-total-price-mobile .bottom-section p strong{
      font-size: 18px;
    }

    @media (max-width: 767px) {

      .contenedor-total-price {
        display: none;
      }
    }

    @media (min-width: 768px) {
      .container-total-price-mobile {
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


  function addHTMLDesktop() {
    var totalAmountElement = document.querySelector('.total-currency');
    var totalAmountValue = totalAmountElement.textContent.trim();
    var currency = document.querySelector('[data-test-id="sidebar-currency-switch"]');
    var container = document.querySelector('[data-test-id="flight-container"]');

    if (!document.querySelector('.contenedor-total-price') && container) {
      var nuevoElementoHTML = `
      <div class="contenedor-total-price">
      <div class="izquierda">
      <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/99c461e9-3287-4751-a148-b88c35086309/%3F.png">
      <p><strong>¡No te preocupes!</strong><br>Este precio es el total a pagar, ya incluye tasas de embarque e impuestos.</p>
      </div>
      <div class="derecha">
      <p>Total de tu reserva:<br> <strong>${totalAmountValue} ${currency.value}</strong></p>
      </div>
      </div>
      `;

      container.insertAdjacentHTML('afterend', nuevoElementoHTML);
    }
  }

  function addHTMLMobile() {
    var totalAmountElement = document.querySelector('.total-currency');
    var totalAmountValue = totalAmountElement.textContent.trim();
    var currency = document.querySelector('[data-test-id="sidebar-currency-switch"]');
    var container = document.querySelector('[data-test-id="flight-container"]');

    if (!document.querySelector('.container-total-price-mobile') && container) {
      var nuevoElementoHTML = `
      <div class="container-total-price-mobile">
      <div class="top-section">
      <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/99c461e9-3287-4751-a148-b88c35086309/%3F.png">
      <p><strong>¡No te preocupes!</strong><br>Este precio es el total a pagar, ya incluye tasas de embarque e impuestos.</p>
      </div>
      <div class="bottom-section">
      <p>Total de tu reserva:<br> <strong>${totalAmountValue} ${currency.value}</strong></p>
      </div>
      </div>
      `;

      container.insertAdjacentHTML('afterend', nuevoElementoHTML);
    }
  }

  function updatePriceAndCurrency() {
    setTimeout(function() {
      var totalAmountElement = document.querySelector('.total-currency');
      var container = document.querySelector('.contenedor-total-price');

      if (container) {
        var totalAmountValue = totalAmountElement.textContent.trim();
        var currency = document.querySelector('[data-test-id="sidebar-currency-switch"]');
        var priceElement = container.querySelector('.derecha p strong');

        if (priceElement) {
          priceElement.textContent = `${totalAmountValue} ${currency.value}`;
        }
      }
    }, 1000);
  }

  function updatePriceAndCurrencyMobile() {
    setTimeout(function() {
      var totalAmountElement = document.querySelector('.total-currency');
      var container = document.querySelector('.container-total-price-mobile');

      if (container) {
        var totalAmountValue = totalAmountElement.textContent.trim();
        var currency = document.querySelector('[data-test-id="sidebar-currency-switch"]');
        var priceElement = container.querySelector('.bottom-section p strong');

        if (priceElement) {
          priceElement.textContent = `${totalAmountValue} ${currency.value}`;
        }
      }
    }, 1000);
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
    addHTMLMobile();
    updatePriceAndCurrency();
    updatePriceAndCurrencyMobile();
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