var initModal = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2checkin/print') return;
  clearInterval(initModal);
  var culture = bookingData.Culture;

  function addCSS() {
    var css = `
    #modalSkipPayment {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #modalSkipPayment .modal-content {
      background: #ffffff;
      border-radius: 10px;
      padding: 0;
      z-index: 1;
      max-width: 30%;
    }

    #modalSkipPayment .modal-header {
      background-color: #59c3d9;
      padding: 20px;
      color: #ffffff;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    #modalSkipPayment .modal-header h4 {
      font-weight: bold;
      font-size: 23px;
      font-family: Lato, sans-serif;
      text-align: center;
    }

    #modalSkipPayment .modal-header .closeButton {
      position: absolute;
      top: 0px;
      right: 10px;
      background: none;
      border: none;
      font-size: 30px;
      color: #ffffff;
      cursor: pointer;
      padding: 0;
    }

    #modalSkipPayment .modal-header .closeButton:hover {
      color: rgb(185, 34, 52);
    }

    #modalSkipPayment .modal-body {
      padding: 24px;
      font-family: 'Arial', sans-serif;
      font-size: 18px;
      color: #333333;
      text-align: center;
    }

    #modalSkipPayment .modal-body p {
      margin: 0;
      font-size: 18px;
    }

    @media (max-width: 767px) {
      #modalSkipPayment .modal-content {
        max-width: 90%;
        width: 90%;
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

  function addModal() {
    var title, lineText1, buttonText, noQuiero;

    switch (culture) {
    case 'en-US':
      title = 'Important Notice';
      lineText1 = 'If you have a scheduled flight for today and havent received your boarding pass in your email, we invite you to approach our counter at the airport, and we will assist you.';
      break;
    case 'pt-BR':
      title = 'Aviso Importante';
      lineText1 = 'Se você tem um voo programado para hoje e ainda não recebeu seu cartão de embarque por e-mail, convidamos você a se aproximar do nosso balcão no aeroporto, e iremos ajudar você.';
      break;
    default:
      title = 'Aviso Importante';
      lineText1 = 'Si tienes un vuelo programado para hoy y nos has recibido tu tarjeta de embarque en tu correo electrónico, te invitamos a acercarte a nuestro counter en aeropuerto y te ayudaremos.';
      break;
    }

    var modalTemplate = `
    <div id="modalSkipPayment" class="modal" style="display: block;">
    <div class="modal-content">
    <div class="modal-header">
    <h4>${title}</h4>
    <button class="closeButton">×</button>
    </div>
    <div class="modal-body">
    <p>${lineText1}</p>
    </div>
    </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalTemplate);

    var closeButton = document.querySelector('.closeButton');
    closeButton.addEventListener('click', function () {
      var modal = document.querySelector('#modalSkipPayment');
      modal.remove();
    });
  }

  if (culture) {
    addCSS()
    addModal()
  }

}, 600);