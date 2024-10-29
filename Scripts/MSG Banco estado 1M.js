var initMSGBE1M = setInterval(function () {
  if (window.location.pathname.toLowerCase() !== '/v2/payment' || typeof JetSmart === "undefined") return;
  clearInterval(initMSGBE1M);

  var bancoEstado = JetSmart.AppContext.bancoEstadoCategory;
  var culture = bookingData.Culture;

  function addCSSMsg() {
    var css = `
    #msg-be {
      padding: 7px;
      position: relative;
      background-color: #00abcd;
      color: white;
      border: 1px;
      border-radius: 7px;
      align-items: center;
      margin-top: 5px;
      max-width: 100%;
    }

    #msg-be span {
      font-size: 13px;
    }

    @media (max-width: 767px) {
      #msg-be {
        max-width: 100%;
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

  function addMsg() {
    if(!document.querySelector('#msg-be')){
      var container = document.querySelector('.payment-header');
      if (container) {
        var mensaje = 'Recuerda que las compras realizadas en alianza Banco Estado - JetSMART aplican solo para personas naturales. A personas que tienen una compra mayor a 1.000.000';
        var newElement = document.createElement('div');
        newElement.id = 'msg-be';
        newElement.innerHTML = `<span>${mensaje}</span>`;
        container.insertAdjacentElement('afterend', newElement);
      }
    }
    
  }

  
  if (bancoEstado !== '0' && culture === 'es-CL') {
    addMsg();
    addCSSMsg();
  }

}, 600);