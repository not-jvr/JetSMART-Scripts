var int_modalcheckinEZE = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname !== '/V2Checkin/Passengers') return;
  clearInterval(int_modalcheckinEZE);

  var culture = bookingData.Culture;
  var rutaEZE = ["EZE"];
  var inters = ['SCL', 'LIM', 'GIG', 'ASU'];
  var esEZEida = false;
  var internacional = false;
  var esEZEvuelta = false;
  var fechaIda = bookingData.OutboundJourney.DepartureDate;
  var fechaViaje = new Date(fechaIda);
  var esVuelta = false;
  var hoy = new Date();

  if (fechaViaje.getTime() < hoy.getTime()) {
    esVuelta = true;
  }

  if(!esVuelta){
    if (bookingData.OutboundJourney && bookingData.OutboundJourney.DepartureStationCode) {
      esEZEida = (rutaEZE.indexOf(bookingData.OutboundJourney.DepartureStationCode) > -1);
    }
  }
  
  if(esVuelta){
    if (bookingData.ReturnJourney && bookingData.ReturnJourney.DepartureStationCode) {
      esEZEvuelta = (rutaEZE.indexOf(bookingData.ReturnJourney.DepartureStationCode) > -1);
    }
  }

  if (bookingData.OutboundJourney && bookingData.OutboundJourney.ArrivalStationCode) {
    internacional = (inters.indexOf(bookingData.OutboundJourney.ArrivalStationCode) > -1);
  }

  if (bookingData.ReturnJourney && bookingData.ReturnJourney.ArrivalStationCode){
    internacional = (inters.indexOf(bookingData.ReturnJourney.ArrivalStationCode) > -1);
  }

  if ((esEZEida && !esVuelta) || (esVuelta && esEZEvuelta)) {

    if (internacional) {
      var minutos = 70;
      var horas = 4;
    } else {
      var minutos = 50;
      var horas = 3;
    }

    var title, lineText1, lineText2, lineText3, lineText4, lineText5, button, cerrarmodal;

    switch (culture) {
    case 'en-US':
      title = 'Important information about your flight';
      lineText1 = 'Arrive early. Baggage check will be open ' + horas + ' hrs. before your flight departs.';
      lineText2 = 'Remember that check-in and baggage drop close ' + minutos + ' minutes before your flight departs.';
      lineText3 = "If you don't have checked baggage, go directly to the boarding area. Do it as soon as possible and be at the boarding gate one hour before.";
      lineText4 = 'If you have checked baggage or need to go through check-in, head to Terminal A. If you don\'t need to go to check-in, for domestic flights go to Terminal C and for international flights to NTP. More information <a href="#" id="imageLink" style="color: #f50000;"> HERE </a>';
      lineText5 = "Don't forget that the boarding gate closes 20 minutes before the flight departs.";
      button = 'Accept';
      cerrarmodal = 'Close'
      break;
    case 'pt-BR':
      title = 'Informações importantes sobre o seu voo';
      lineText1 = 'Chegue com antecedência. O check-in de bagagens estará aberto ' + horas + ' hrs. antes da partida do seu voo.';
      lineText2 = 'Lembre-se que o check-in e a entrega de bagagens encerram ' + minutos + ' minutos antes da partida do seu voo.';
      lineText3 = 'Se você não tem bagagem para despachar, vá direto para a área de embarque. Faça isso o quanto antes e esteja no portão de embarque uma hora antes.';
      lineText4 = 'Se você tem bagagem para despachar ou precisa passar pelo check-in, vá para o Terminal A. Se você não precisa ir ao check-in, para voos nacionais vá para o Terminal C e para voos internacionais para NTP. Mais informações <a href="#" id="imageLink" style="color: #f50000;"> AQUI </a>';
      lineText5 = 'Não se esqueça de que o portão de embarque fecha 20 minutos antes da partida do voo.';
      button = 'Aceitar';
      cerrarmodal = 'Fechar'
      break;
    default:
      title = 'Información importante sobre tu vuelo';
      lineText1 = 'Preséntate con anticipación. El despacho de equipajes estará abierto ' + horas + ' hrs. previo a la salida de tu vuelo.';
      lineText2 = 'Recuerda que el check in y entrega de equipajes cierra ' + minutos + ' minutos antes de la salida de tu vuelo.';
      lineText3 = 'Si no vas a despachar equipaje ingresa directamente al área de embarque. Hazlo cuánto antes y preséntate en puerta de embarque una hora antes.';
      lineText4 = 'Si despachás equipaje o necesitás pasar por el checkin, tenés que dirigirte a la terminal A.En caso que no necesites ir al checkin, para vuelos nacionales dirigite a la terminal C y para vuelos internacionales a la NTP. Ver más información <a href="#" id="imageLink" style="color: #f50000;"> AQUÍ </a>';
      lineText5 = 'No olvides que la puerta de embarque cierra 20 minutos antes de la salida del vuelo';
      button = 'Aceptar';
      cerrarmodal = 'Cerrar'
      break;
    }

    var modalTemplate = `
    <div id="informationModalEZE" class="modal" style="display: block;">
    <div class="modal-content">
    <div class="modal-header">
    <h4 style="font-weight: bold; text-align: center;">${title}</h4>
    </div>
    <div class="modal-body">
    <p id="modal-body-text">${lineText1}</p>
    <p>${lineText2}</p>
    <p>${lineText3}</p>
    <p>${lineText4}</p>
    <p>${lineText5}</p>
    </div>
    <div class="modal-footer">
    <button id="acceptButton" class="rounded-primary-btn">${button}</button>
    <a href="#" id="close-modal">${cerrarmodal}</a>
    </div>
    </div>
    </div>
    `;

    var footer = document.querySelector('body > app > footer');
    footer.insertAdjacentHTML('afterend', modalTemplate);

    document.getElementById('informationModalEZE').style.display = 'block';
    var css = `
    #informationModalEZE .modal-content {
      padding: 0;
    }

    #informationModalEZE .modal-header h4 {
      font-size: 23px;
    }

    #informationModalEZE {
      z-index: 4!important;
    }

    #informationModalEZE .modal-header {
      position: relative;
      background-color: rgb(185, 34, 52);
      padding: 20px;
      border-radius: 10px 10px 0 0;
      font-family: 'ClanOT-News', 'Lato Medium';
      font-weight: 100;
      font-size: 22px;
      line-height: 1.2;
      color: #ffffff;
    }

    #informationModalEZE .modal-body {
      padding: 1.5rem;
      font-family: 'ClanOT-News', "Lato Medium";
      font-size: 18px;
      color: #1C355E;
      line-height: 1.4;
      padding-bottom: 0.5rem;
    }

    #informationModalEZE .modal-body p {
      margin-bottom: 1rem;
    }

    #informationModalEZE .modal-body a {
      text-decoration: underline;
    }

    #informationModalEZE .modal-body p:last-child {
      margin-bottom: 0;
    }

    #informationModalEZE .modal-footer {
      padding: 1.5rem;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      gap: 0px;
      padding-top: 0rem;
    }

    #informationModalEZE .modal-footer a#close-modal {
      color: #B3B3B3;
      text-decoration: underline;
      font-size: 18px;
      font-family: 'Lato', sans-serif;
      margin-top: 10px;
    }

    #informationModalEZE .modal-footer a#close-modal:hover {
      color:#8b8989;
    }

    #informationModalEZE .rounded-primary-btn {
      display: flex;
      justify-content: center;
      --bg-opacity: 1;
      --text-opacity: 1;
      color: rgba(255, 255, 255, var(--text-opacity));
      position: relative;
      border-radius: 9999px;
      letter-spacing: 0;
      text-transform: none;
      font-weight: 700;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      --border-opacity: 1;
      border: 2px solid rgba(178, 41, 46, var(--border-opacity));
      line-height: 1;
      font-family: Lato, sans-serif;
      white-space: normal;
      text-align: center;
      padding: 10px 35px 10px 15px;
      background-color: rgb(185, 34, 52);
      border-color: rgb(185, 34, 52);
    }

    #informationModalEZE .rounded-primary-btn:hover {
      color: rgb(185, 34, 52);
      background-color: rgba(255, 255, 255);
    }

    @media (max-width: 768px) {
      #informationModalEZE .modal-header {
        max-height: none;
        padding: 0.5rem;
      }
    }

    @media (max-width: 768px) {
      #informationModalEZE .modal-content {
        width: 90%;
        max-width: 400px;
      }
    }

    @media (max-width: 768px) {
      #informationModalEZE .modal-body {
        font-size: 14px;
        padding: 1rem;
      }

      #informationModalEZE .modal-body p {
        margin-bottom: 0.2rem;
        font-size: 13px;
      }

      #informationModalEZE .modal-header h4 {
        font-size: 16px;
      }
      #informationModalEZE .modal-footer {
        padding: 0.5rem;
      }
    }
  }

}
`,
head = document.head || document.getElementsByTagName('head')[0],
style = document.createElement('style');

head.appendChild(style);

style.type = 'text/css';
if (style.styleSheet){
    // This is required for IE8 and below.
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));  
}

var closeModal = function() {
  document.getElementById('informationModalEZE').style.display = 'none';
};

document.getElementById('close-modal').addEventListener('click', closeModal);
document.getElementById('acceptButton').addEventListener('click', closeModal);

document.getElementById('imageLink').onclick = function (event) {
  event.preventDefault();
  openImageModal();
};

function openImageModal() {
  var cerrarmodal2;
  switch (culture) {
  case 'en-US':
    cerrarmodal2 = 'Close'
    break;
  case 'pt-BR':
    cerrarmodal2 = 'Fechar'
    break;
  default:
    cerrarmodal2 = 'Cerrar'
    break;
  }
  var imageUrl = "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/b32a62df-8710-41a6-bfe4-5285c040374e/mapa-EZE-1.png";
  var imageModalTemplate = `
  <div id="imageModal" class="modal" style="display: block;">
  <div class="modal-content">
  <div class="modal-header">
  <img src="${imageUrl}" alt="Mapa">
  <button id="close-image-modal">${cerrarmodal2}</button>
  </div>
  <div class="modal-body">
  </div>
  </div>
  </div>
  `;
  footer.insertAdjacentHTML('afterend', imageModalTemplate);
  document.getElementById('imageModal').style.display = 'block';

  document.getElementById('close-image-modal').onclick = function () {
    closeImageModal();
  };

  function closeImageModal() {
    var imageModal = document.getElementById('imageModal');
    imageModal.parentNode.removeChild(imageModal);
  }
}

var css2 = `
#imageModal .modal-header {
  position: relative;
  padding: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#imageModal {
  z-index: 999!important;
}

#imageModal .modal-header img {
  display: block;
  height: auto;
}

#imageModal .modal-header button {
  margin-top: 15px;
  color: rgb(185, 34, 52);
  border: 3px solid #ffffff;
  border-radius: 20px;
  padding: 1px 6px;
  font-size: 20px;
  background: transparent;
  cursor: pointer;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  line-height: 1;
  font-weight: bold;
}

#imageModal .modal-header button:hover {
  color: #ffffff;
  background-color: rgb(185, 34, 52);
}

@media (max-width: 768px) {
  #imageModal .modal-header img {
    max-width: 100%;
    height: auto;
    touch-action: pinch-zoom;
  }
  
  #imageModal .modal-content {
    width: 100%;
    height: auto;
  }

  #imageModal .modal-header button {
    font-size: 14px;
    padding: 1px 4px;
  }
}
`,
head = document.head || document.getElementsByTagName('head')[0],
style = document.createElement('style');

head.appendChild(style);

style.type = 'text/css';
if (style.styleSheet){
    // This is required for IE8 and below.
  style.styleSheet.cssText = css2;
} else {
  style.appendChild(document.createTextNode(css2));  
}

}

}, 200);