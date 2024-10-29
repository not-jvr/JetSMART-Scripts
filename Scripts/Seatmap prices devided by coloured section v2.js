var precioAsientosXCategoria = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/seat/map') return;
  clearInterval(precioAsientosXCategoria);

  var culture = bookingData.Culture;
  var bancoEstado = JetSmart.AppContext.bancoEstadoCategory;

  function addCSS() {
    var css = `
    .priceCategory1, .priceCategory4, .priceCategory6{
      background: #1b3b6d;
    }
    .container-price{
      z-index: 1;
      --bg-opacity: 1;
      max-width: 100%;
      width: 114%;
      max-height: 100%;
      height: 80%;
      text-align: center;
      padding-top: 5px;
    }
    .priceCategory2{
      background-color: #61d6e5;
    }
    .priceCategory5, .priceCategory7{
      background: #5ac1d7;
    }
    .priceCategory3{
      background: #2b7ea3;
    }
    .container-category {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      color: #fff;
    }

    .cf-seatmap-seat-container.cf-offset-backward {
      top: 0;
    }
    `,
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet) {
      // This is required for IE8 and below.
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  function addPrices() {
    setTimeout(function () {
      switch (culture) {
      case 'en-US':
        textSeatmap = 'From';
        break;
      case 'pt-BR':
        textSeatmap = 'De';
        break;
      default:
        textSeatmap = 'Desde'
        break;
      }
      for (let i = 1; i <= 5; i++) {
        var category = document.querySelector(`.cf-seatmap-row .cf-seatmap-seat-container ac-seat .category-${i}`).closest('.cf-seatmap-row');
        var precio = document.querySelector(`.cf-seatmap-row .cf-seatmap-seat-container ac-seat .category-${i} .seat-tooltip span`).childNodes[1].textContent;

        if (category && !document.querySelector(`.container-price.priceCategory${i}`)) {
          category.insertAdjacentHTML('beforebegin',
            `<div class="container-category price-category-${i}">
            <img class="cf-plane-body-image hidden-md-down img-mt" src="/Images/Seatmap/seatmap-body.svg">
            <img class="cf-plane-body-image hidden-lg-up  hidden-xs" src="/Images/Seatmap/seatmap-body-sm.svg">
            <img class="cf-plane-body-image hidden-sm-up" src="/Images/Seatmap/seatmap-body-xs.svg">
            <div class="container-price priceCategory${i}">
            ${textSeatmap} ${precio}
            </div>
            </div>`);
        }
        if (filasOriginales === 42) {
          addExtraCat('.cf-seatmap-row[data-test-value="29"]', '6', '29');
          addExtraCat('.cf-seatmap-row[data-test-value="31"]', '7', '31');
        }
      }
    }, 500);
  }

  function removePrices() {
    var prices = document.querySelectorAll('.container-category');
    prices.forEach(function(price) {
      price.remove();
    });
  }

  function actualizarPrecio() {
    setTimeout(function () {
      for (let i = 1; i <= 5; i++) {
        var precioElemento = document.querySelector(`.container-category.price-category-${i} .container-price.priceCategory${i}`);

        if (precioElemento) {
          var nuevoPrecio = document.querySelector(`.cf-seatmap-row .cf-seatmap-seat-container ac-seat .category-${i} .seat-tooltip span`).childNodes[1].textContent;

          if (precioElemento.innerHTML !== `${textSeatmap} ${nuevoPrecio}`) {
            precioElemento.innerHTML = `${textSeatmap} ${nuevoPrecio}`;
          }
        }
      }
    }, 500);
  }

  function actualizarPrecioExtraSeats() {
    setTimeout(function () {
      for (let i = 6; i <= 7; i++) {
        var precioElemento = document.querySelector(`.container-category.price-category-${i} .container-price.priceCategory${i}`);

        if (precioElemento) {
          var nuevoPrecio = document.querySelector(`.cf-seatmap-row .cf-seatmap-seat-container ac-seat .category-5 .seat-tooltip span`).childNodes[1].textContent;

          if (precioElemento.innerHTML !== `${textSeatmap} ${nuevoPrecio}`) {
            precioElemento.innerHTML = `${textSeatmap} ${nuevoPrecio}`;
          }
        }
      }
    }, 500);
  }

  function testeo() {
    removePrices();
    addPrices();
  }

//CLICKS//

  function clickSeatMapAsientos() {
    var containers = document.querySelectorAll('[data-test-designator]');

    containers.forEach(container => {
      if (container) {
        container.addEventListener('click', () => {
          contarFilasAsientos();
          clickConfirmarAsientoMobile();
        });
      }
    });
  }

  function clickSeatMapEscala() {
    var containers = document.querySelectorAll('.seatmap-pax-route.cursor-pointer');

    containers.forEach(container => {
      if (container) {
        container.addEventListener('click', () => {
          contarFilasAsientos();
        });
      }
    });
  }

  function clickSeatMapIdaVuelta() {
    var container = document.querySelector('.direction-switch-container');
    if (container) {
      container.addEventListener('click', () => {
        contarFilasAsientos();
      });
    }
  }

  function clickContinuar() {
    var container = document.querySelector('[data-test-id="seatmap-continue-button"]');
    if (container) {
      container.addEventListener('click', () => {
        contarFilasAsientos();
        clickContinuarModal();
      });
    }
  }

  function clickRecomendado() {
    var container = document.querySelector('.w-full .rounded-primary-btn.seat-select');
    if (container) {
      container.addEventListener('click', () => {
        contarFilasAsientos();
        clickContinuarModal();
      });
    }
  }

  function clickContinuarModal() {
    var container = document.querySelector('[data-test-id="seatmap-modal-continue-button"]');
    if (container) {
      container.addEventListener('click', () => {
        contarFilasAsientos();
      });
    }
  }

  function clickIdaOVueltaMobile() {
    var container = document.querySelector('.mobile-passenger-container');
    if (container) {
      container.addEventListener('click', () => {
        contarFilasAsientos();
      });
    }
  }

  function clickEscalaMobile() {
    var container = document.querySelector('.cf-mobile-header-segments');
    if (container) {
      container.addEventListener('click', () => {
        contarFilasAsientos();
      });
    }
  }

  function clickConfirmarAsientoMobile() {
    var containers = document.querySelectorAll('.mobile-seat-btn');

    containers.forEach(container => {
      if (container) {
        container.addEventListener('click', () => {
          contarFilasAsientos();
        });
      }
    });
  }

  function clickRecomendadoMobile() {
    var containers = document.querySelectorAll('.seatmap-recommendator-button');

    containers.forEach(container => {
      if (container) {
        container.addEventListener('click', () => {
          contarFilasAsientos();
        });
      }
    });
  }

  function clickContinuarMobile() {
    var container = document.querySelector('.rounded-primary-btn.mobile-seatmap-direction-btn');
    if (container) {
      container.addEventListener('click', () => {
        contarFilasAsientos();
        clickContinuarModal();
      });
    }
  }

  function allClicks() {
    clickSeatMapIdaVuelta();
    clickSeatMapAsientos();
    clickSeatMapEscala();
    clickContinuar();
    clickRecomendado();
    clickIdaOVueltaMobile();
    clickEscalaMobile();
    clickConfirmarAsientoMobile();
    clickRecomendadoMobile();
    clickContinuarMobile();
  }

  var filasOriginales = -1;

  function contarFilasAsientos() {
    setTimeout(function () {
      var filasAsientos = document.querySelectorAll('.cf-seatmap-row');
      var numFilas = filasAsientos.length + 1;

      if (filasOriginales === -1) {
        filasOriginales = numFilas;
      } else {
        if (numFilas !== filasOriginales) {
          console.log("Cambio en el número de filas.");
          testeo();
        } else {
          actualizarPrecio();
          actualizarPrecioExtraSeats();
        }
        filasOriginales = numFilas;
      }
      console.log("Número de filas actual (Y):", filasOriginales);
    }, 500);
  }

  function addExtraCat(targetSelector, categoryClass, dataTestValue) {
    var targetElement = document.querySelector(targetSelector);
    var precio = document.querySelector(`.cf-seatmap-row .cf-seatmap-seat-container ac-seat .category-5 .seat-tooltip span`).childNodes[1].textContent;

    switch (culture) {
    case 'en-US':
      textSeatmap = 'From';
      break;
    case 'pt-BR':
      textSeatmap = 'De';
      break;
    default:
      textSeatmap = 'Desde';
      break;
    }
    if (targetElement && !document.querySelector('.container-price.priceCategory' + categoryClass)) {
      var newHTML = `<div class="container-category price-category-${categoryClass}">
      <img class="cf-plane-body-image hidden-md-down img-mt" src="/Images/Seatmap/seatmap-body.svg">
      <img class="cf-plane-body-image hidden-lg-up  hidden-xs" src="/Images/Seatmap/seatmap-body-sm.svg">
      <img class="cf-plane-body-image hidden-sm-up" src="/Images/Seatmap/seatmap-body-xs.svg">
      <div class="container-price priceCategory${categoryClass}">
      ${textSeatmap} ${precio}
      </div>
      </div>`;

      targetElement.insertAdjacentHTML('afterend', newHTML);
    }
  }

  function clickBack() {
    setTimeout(function () {
      var button = document.querySelector('[data-test-id="common-modify-booking-modal-modify-button"]');

      if (button) {
        button.addEventListener('click', function() {
          console.log("detrocede")
          contarFilasAsientos();
        });
      }
    }, 500);
  }

  function clickBackContainer() {
      var button = document.querySelector('[data-test-id="seatmap-page"]');

      if (button) {
        button.addEventListener('click', function() {
          clickBack();
        });
      }
  }

  function verificarRetroceso() {
    window.addEventListener('popstate', function(event) {
      console.log("detrocede")
      clickBack();
    });
  }

  if (culture && bancoEstado < 1) {
    addCSS();
    contarFilasAsientos();
    addPrices();
    allClicks();
    verificarRetroceso();
    clickBackContainer();
  }
  
}, 600);