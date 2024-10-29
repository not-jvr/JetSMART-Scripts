var initMsgBaggageImpuestosCO = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/baggage') return;
  clearInterval(initMsgBaggageImpuestosCO);

  var culture = bookingData.Culture;

  function addCSS() {
    var css = `
    .newmsgimpuestos {
      display: flex;
      padding: 5px;
      position: relative;
      background-color: rgb(89, 195, 217);
      line-height: 30px;
      color: white;
      border: 1px;
      border-radius: 5px;
      align-items: center;
      margin: 10px;
    }

    header.b2-section-header {
      margin-bottom: 0;
    }

    @media (max-width: 767px) {
      .newmsgimpuestos {
        line-height: 1;
        font-size: 14px;
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

  function addMsg(selector, index) {
    if (!document.querySelector(`#msg-impuestos-${index}`)) {
      var container = document.querySelector(selector);
      if (container) {
        var mensaje = 'IMPORTANTE: Recuerda que los precios informados no incluyen impuestos.';
        var newElement = document.createElement('div');
        newElement.id = `msg-impuestos-${index}`;
        newElement.className = 'newmsgimpuestos';
        newElement.innerHTML = `<i class="fas fa-exclamation-circle notification-icon custom-alert" style="margin-right: 10px;"></i><span>${mensaje}</span>`;
        container.insertAdjacentElement('afterend', newElement);
      }
    }
  }

  
  var departureStationCode = bookingData.AvailableOutboundJourneys[0].DepartureStationCode;
  var iataCO = ['CUC','CTG','MDE','BOG','CLO','PEI','SMR'];

  if (iataCO.includes(departureStationCode) && culture === 'es-CO') {
    addCSS();
    addMsg('[data-test-id="baggage-page-section-header--c|CabinBaggage"]', 0);
    addMsg('[data-test-id="baggage-page-section-header--c|CheckedBaggage"]', 1);
  }

}, 600);