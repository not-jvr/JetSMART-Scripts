var initHistogram = setInterval(function() {
    if (window.location.pathname !== '/ofertas/es-cl/aniversario-jetsmart-chile') return;
    clearInterval(initHistogram);

    function addCSS() {
        var css = `
        .BookingMask {
            display: none;
        }

        .FareTitleHeader {
            display: none;
        }

        .FareDailyHistogram {
            margin-top: -5rem;
        }

        .daily-histogram-container {
            padding: 2rem;
            border-radius: 0.5rem;
            z-index: 1;
            position: relative;
            background: #fff;
            box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.3);
        }

        .FlightsBooking .CO {
            padding: 150px 0 !important;
        }

        .newTitleHistogramContainer {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            text-align: center;
        }

        .newTitleHistogram {
            font-size: 1.5rem;
            font-weight: bold;
            color: #163A70;
        }

        @media (max-width: 767px) {
            /* Puedes agregar estilos adicionales para dispositivos móviles aquí */
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

    function moveItem() {
        var fareDailyHistogram = document.querySelector('.FareDailyHistogram');
        var flightsBooking = document.querySelector('.FlightsBooking');

        if (fareDailyHistogram && flightsBooking) {
          flightsBooking.insertAdjacentElement('afterend', fareDailyHistogram);
      } else {
          console.error('Uno o ambos elementos no se encontraron en el DOM.');
      }
  }

  function addPlaceHolder() {
    var origen = document.querySelector('.FareDailyHistogram #origin-input');
    var destino = document.querySelector('.FareDailyHistogram #destination-input');
    if (origen) {
        origen.placeholder = "INGRESA ORIGEN";
    }
    if (destino) {
        destino.placeholder = 'INGRESA DESTINO';
    }
}

function addTitle() {
    var container = document.querySelector('.daily-histogram-container');
    if (container && !document.querySelector('.newTitleHistogram')) {
        var titleHTML = '<div class="newTitleHistogramContainer"><div class="newTitleHistogram">Encuentra las mejores ofertas de vuelos para tu próximo destino</div></div>';
        container.insertAdjacentHTML('afterbegin', titleHTML);
    }
}

addCSS();
setTimeout(function() {
    moveItem();
}, 500);
setTimeout(function() {
    addPlaceHolder();
}, 500);
setTimeout(function() {
    addTitle();
}, 500);

}, 600);
