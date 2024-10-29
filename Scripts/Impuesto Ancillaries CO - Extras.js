var initMsgExtrasImpuestosCO = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/extras') return;
  clearInterval(initMsgExtrasImpuestosCO);

  var culture = bookingData.Culture;

  function addCSS() {
    var css = `
    .newmsgimpuestosextras {
      display: flex;
      padding: 5px;
      position: relative;
      background-color: rgb(89, 195, 217);
      line-height: 1;
      color: white;
      border: 1px;
      border-radius: 5px;
      align-items: center;
      margin: 10px;
      font-size: 14px;
    }

    @media (max-width: 767px) {
      .newmsgimpuestosextras {
        line-height: 1;
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

  function addMsg(selector) {
    if (!document.querySelector(`#msg-impuestos-extras`)) {
      var container = document.querySelector(selector);
      if (container) {
        var mensaje = 'IMPORTANTE: Recuerda que los precios informados no incluyen impuestos.';
        var newElement = document.createElement('div');
        newElement.id = `msg-impuestos-extras`;
        newElement.className = 'newmsgimpuestosextras';
        newElement.innerHTML = `<i class="fas fa-exclamation-circle notification-icon custom-alert" style="margin-right: 10px;"></i><span>${mensaje}</span>`;
        container.insertAdjacentElement('beforebegin', newElement);
      }
    }
  }

  var departureStationCode = bookingData.AvailableOutboundJourneys[0].DepartureStationCode;
  var iataCO = ['CUC','CTG','MDE','BOG','CLO','PEI','SMR'];

  if (iataCO.includes(departureStationCode) && culture === 'es-CO') {
    addCSS();
    addMsg('[data-test-id="extras-flexi-fee-container"]');
  }

}, 600);