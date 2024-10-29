var initHideFactura = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/payment') return;
  clearInterval(initHideFactura);

  var culture = bookingData.Culture;

  function addMsg() {
    if(!document.querySelector('#msg-factura')){
      var mensaje = "*Estamos experimentando intermitencias con las facturas. Si desea pagar utilizando este método, por favor inténtelo más tarde.";
    var container = document.querySelector('[data-test-id="payment-billing-message"]');
    var newElement = document.createElement('div');
    newElement.id = 'msg-factura';
    newElement.innerHTML = `<span>${mensaje}</span>`;
    var css = `
    #msg-factura {
      display: flex;
      padding: 5px;
      position: relative;
      line-height: 30px;
      color: white;
      border: 1px;
      border-radius: 5px;
      align-items: center;
      margin-top: 5px;
      background-color: rgb(89, 195, 217);
    }

    #msg-factura span {
      font-size: 16px;
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
    container.parentNode.insertBefore(newElement, container.nextElementSibling);
    }
  }

  function hideFacturas() {
    var elementos = document.querySelectorAll('.mdl-checkbox__label');

    elementos.forEach(function(elemento) {
      if (elemento.textContent.trim() === 'Factura') {
        var elementoPadre = elemento.closest('.mdl-checkbox-wrapper');
        if (elementoPadre) {
          elementoPadre.style.display = 'none';
        }
      }
    });

  }

  if(culture === 'es-PE'){
    addMsg();
    hideFacturas();
  }

}, 600);