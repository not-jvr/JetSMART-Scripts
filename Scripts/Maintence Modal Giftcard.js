var initMaintenceModal = setInterval(function () {
  if (typeof bookingData === "undefined" || !window.location.pathname.toLowerCase().includes('/giftcard/select')) return;
  clearInterval(initMaintenceModal);

  var culture = bookingData.Culture;

  function addMaintenecModal() {
    switch (culture) {
      case 'en-US':
        title = 'Maintenance Page';
        lineText1 = 'Sorry, this page is currently unavailable.<br>Please try again later.';
        buttonText = 'Back';
        break;
      case 'pt-BR':
        title = 'Página em manutenção';
        lineText1 = 'Desculpe, esta página não está disponível no momento.<br>Por favor, volte mais tarde.';
        buttonText = 'Voltar';
        break;
      default:
        title = 'Página en mantenimiento';
        lineText1 = 'Lo sentimos, esta página no está disponible en este momento.<br>Por favor, vuelva más tarde.';
        buttonText = 'Volver';
        break;
    }

    var modalTemplate = `
    <div id="maintenanceModal" class="modal" style="display: block;">
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h4>${title}</h4>
        </div>
        <div class="modal-body">
          <p>${lineText1}</p>
        </div>
        <div class="modal-footer">
          <button id="acceptButton" class="rounded-primary-btn">${buttonText}</button>
        </div>
      </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalTemplate);

    var css = `
    #maintenanceModal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }

    #maintenanceModal .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(10px);
      z-index: -1;
    }

    #maintenanceModal .modal-content {
      background: #ffffff;
      border-radius: 10px;
      padding: 0;
      z-index: 1;
    }

    #maintenanceModal .modal-header {
      background-color: rgb(185, 34, 52);
      padding: 20px;
      color: #ffffff;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    #maintenanceModal .modal-header h4 {
      font-weight: bold;
      font-size: 23px;
      font-family: Lato, sans-serif;  
      text-align: center;
    }

    #maintenanceModal .modal-body {
      padding: 24px;
      padding-bottom: 12px;
      font-family: 'Arial', sans-serif;
      font-size: 18px;
      color: #333333;
      text-align: center;
    }

    #maintenanceModal .modal-body p {
      margin: 0;
      font-size: 18px;
    }

    #maintenanceModal .modal-footer {
      padding: 24px;
      padding-top: 12px;
      display: flex;
      justify-content: center;
    }

    #maintenanceModal .rounded-primary-btn {
      display: flex;
      justify-content: center;
      color: #ffffff;
      border-radius: 9999px;
      font-weight: 700;
      font-size: 18px;
      border: 2px solid rgba(178, 41, 46, 1);
      font-family: Lato, sans-serif;
      text-align: center;
      padding: 10px 35px;
      background-color: rgb(185, 34, 52);
      border-color: rgb(185, 34, 52);
      cursor: pointer;
    }

    #maintenanceModal .rounded-primary-btn:hover {
      color: rgb(185, 34, 52);
      background-color: rgba(255, 255, 255, 1);
    }

    @media (max-width: 767px) {
      #maintenanceModal .modal-content {
        width: 80%; /* Ajusta el valor según tus necesidades */
      }
    }
    `;

    var head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    document.getElementById('acceptButton').addEventListener('click', buttonModal);
  }

  var buttonModal = function () {
    var redirectUrl;

    switch (culture) {
      case 'es-CL':
        redirectUrl = 'https://jetsmart.com/cl/es/';
        break;
      case 'es-AR':
        redirectUrl = 'https://jetsmart.com/ar/es/';
        break;
      case 'es-PE':
        redirectUrl = 'https://jetsmart.com/pe/es/';
        break;
      case 'es-UY':
        redirectUrl = 'https://jetsmart.com/uy/es/';
        break;
      case 'es-PY':
        redirectUrl = 'https://jetsmart.com/py/es/';
        break;
      case 'es-CO':
        redirectUrl = 'https://jetsmart.com/co/es/';
        break;
      case 'pt-BR':
        redirectUrl = 'https://jetsmart.com/br/pt/';
        break;
      case 'en-US':
        redirectUrl = 'https://jetsmart.com/us/en/';
        break;
      default:
        redirectUrl = 'https://jetsmart.com/';
    }

    window.location.href = redirectUrl;
  }

  if (culture) {
    addMaintenecModal();
  }

}, 400);