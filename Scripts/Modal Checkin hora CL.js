var int_modalcheckinCL = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname !== '/V2Checkin/Passengers') return;
  clearInterval(int_modalcheckinCL);

  var culture = bookingData.Culture;
  var rutasCL = ["SCL", "ARI", "IQQ", "CJC", "ANF", "LSC", "CCP", "ZCO", "ZAL", "PMC", "MHC", "BBA", "PNT", "PUQ"];
  var esCLida = false;
  var esCLvuelta = false;

  var fechaIda = bookingData.OutboundJourney.DepartureDate;
  var fechaViaje = new Date(fechaIda);
  var esVuelta = false;
  var hoy = new Date();

  if (bookingData.OutboundJourney.DepartureStationCode) {
    esCLida = (rutasCL.indexOf(bookingData.OutboundJourney.DepartureStationCode) > -1);
  }

  if(!esCLida){
   if (fechaViaje.getTime() < hoy.getTime()) {
    var esVuelta = true;
  }
  if (bookingData.ReturnJourney.DepartureStationCode) {
    esCLvuelta = (rutasCL.indexOf(bookingData.ReturnJourney.DepartureStationCode) > -1);
  }
}

if (esCLida || (esVuelta && esCLvuelta)) {

  var title = '¡IMPORTANTE!';
  var button = '';
  var lineText1 = ''
  var closebutton = ''
  if(culture === 'pt-BR'){
    lineText1 = 'A mudança de horário não afetará nossos horários de vôo a partir do Chile. Se você estiver viajando a partir de 02/04, seu vôo será ao mesmo tempo que o novo horário oficial.'
    button = 'Aceitar'
    closebutton = 'Fechar'
  }else if(culture === 'en-US'){
    lineText1 = 'The time change will not affect our flight schedules from Chile. If you are traveling from 02/04, your flight will remain at the same time of the new official schedule.'
    button = 'Accept'
    title = '¡IMPORTANT!'
    closebutton = 'Close'
  }else{
    lineText1 = 'El cambio de horario no afectará nuestros horarios de vuelo desde Chile. Si viajas desde el 02/04, tu vuelo se mantendrá a la misma hora del nuevo horario oficial.';
    button = 'Aceptar';
    closebutton = 'Cerrar'
  }

  var modalTemplate = `
  <div id="informationModal" class="modal" style="display: block;">
  <div class="modal-content">
  <div class="modal-header">
  <h4 style="font-weight: bold; text-align: center;">${title}</h4>
  </div>
  <div class="modal-body">
  <p id="modal-body-text">${lineText1}</p>
  </div>
  <div class="modal-footer">
  <button id="acceptButton" class="rounded-primary-btn">${button}</button>
  <a href="#" id="close-modal">${closebutton}</a>
  </div>
  </div>
  </div>
  `;

  var footer = document.querySelector('body > app > footer');
  footer.insertAdjacentHTML('afterend', modalTemplate);

  document.getElementById('informationModal').style.display = 'block';
  var css = `
  #informationModal .modal-content {
    padding: 0;
    width: 50%;
    max-width: 400px;
    margin: auto;
  }

  #informationModal .modal-header h4 {
    font-size: 25px;
  }

  #informationModal {
    z-index: 4!important;
  }

  #informationModal .modal-header {
    position: relative;
    background-color: rgb(185, 34, 52);
    padding: 20px;
    border-radius: 10px 10px 0 0;
    font-family: 'ClanOT-News', 'Lato Medium';
    font-weight: 100;
    line-height: 1.2;
    color: #ffffff;
  }

  #informationModal .modal-body {
    padding: 1.5rem;
    font-family: 'ClanOT-News', "Lato Medium";
    font-size: 18px;
    color: #1C355E;
    line-height: 1.4;
    padding-bottom: 1rem;
  }

  #informationModal .modal-body p {
    margin-bottom: 1rem;
    font-size: 18px;
  }

  #informationModal .modal-body a {
    text-decoration: underline;
  }

  #informationModal .modal-body p:last-child {
    margin-bottom: 0;
  }

  #informationModal .modal-footer {
    padding: 1.5rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 0px;
    padding-top: 0rem;
  }

  #informationModal .modal-footer a#close-modal {
    color: #B3B3B3;
    text-decoration: underline;
    font-size: 18px;
    font-family: 'Lato', sans-serif;
    margin-top: 10px;
  }

  #informationModal .modal-footer a#close-modal:hover {
    color:#8b8989;
  }

  #informationModal .rounded-primary-btn {
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

  #informationModal .rounded-primary-btn:hover {
    color: rgb(185, 34, 52);
    background-color: rgba(255, 255, 255);
  }

  @media (max-width: 768px) {
    #informationModal .modal-header {
      max-height: none;
      padding: 0.5rem;
    }
  }

  @media (max-width: 768px) {
    #informationModal .modal-content {
      width: 90%;
      max-width: 300px;
    }
  }

  @media (max-width: 768px) {
    #informationModal .modal-body {
      font-size: 14px;
      padding: 1rem;
      padding-bottom: 0.5rem;
    }

    #informationModal .modal-body p {
      margin-bottom: 0.2rem;
      font-size: 15px;
    }

    #informationModal .modal-header h4 {
      font-size: 23px;
    }
    #informationModal .modal-footer {
      padding: 0.5rem;
    }

    #informationModal .modal-footer a#close-modal {
      font-size: 14px;
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
  document.getElementById('informationModal').style.display = 'none';
};

document.getElementById('close-modal').addEventListener('click', closeModal);
document.getElementById('acceptButton').addEventListener('click', closeModal);

}
}, 200);