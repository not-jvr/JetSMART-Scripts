var initModalBaggageCheckin = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2checkin/passengers') return;
  clearInterval(initModalBaggageCheckin);

  var culture = bookingData.Culture;
const originalButton = document.querySelector('[data-test-id="checkin-passengers-submit-button"]'); //boton original de continuar

function verificarChecked() {
  const checkboxes = document.querySelectorAll('ac-checkin-passenger .mdl-checkbox');

  if (checkboxes.length > 0) {
    for (const checkbox of checkboxes) {
      if (checkbox.classList.contains('is-checked')) {
        return true;
    }
}
}

return false;
}

function fakeButton(button) { //lo hago para crear un boton encima evitando la funcionalidad del original
    if (button) {
        var clonedButton = button.cloneNode(true);

        clonedButton.addEventListener("click", function(event) {
            if (verificarChecked()) {
                addModal();
            } else {
                button.click();
            }
        });

        button.parentNode.replaceChild(clonedButton, button);
    }
}

///fakeButton();

function haveBaggage() {
  var ssr_to_check = ["BAGC", "BAGD", "BAGP", "LBGC", "LBGD", "LBGP"];
  var contieneSsr = false;

  for (var i = 0; i < bookingData.Passengers.length; i++) {
    var maletas = bookingData.Passengers[i].OutboundJourneySsrs;

    if (ssr_to_check.some(function(ssr) {
      return maletas.includes(ssr);
  })) {
      contieneSsr = true;
      break;
  }
}

return contieneSsr;
}

function addModal() {
    var title, lineText1, buttonText, noQuiero;

    switch (culture) {
    case 'en-US':
        title = 'Important';
        lineText1 = 'You are checking in and you do not have any luggage associated with your reservation. If you want to add luggage, click on add.';
        buttonText = 'Add';
        noQuiero = "I don't want to add";
        break;
    case 'pt-BR':
        title = 'Importante';
        lineText1 = 'Você está fazendo o check-in e não possui bagagem associada à sua reserva. Se você deseja adicionar bagagem, clique em adicionar.';
        buttonText = 'Adicionar';
        noQuiero = 'Não quero adicionar';
        break;
    default:
        title = 'Importante';
        lineText1 = 'Estás realizando tu check-in y no tienes equipajes asociados a tu reserva. Si quieres agregar equipaje, haz clic en agregar.';
        buttonText = 'Agregar';
        noQuiero = 'No quiero agregar';
        break;
    }

    var modalTemplate = `
    <div id="baggageModalCheckin" class="modal" style="display: block;">
    <div class="modal-content">
    <div class="modal-header">
    <h4>${title}</h4>
    <button class="closeButton">×</button>
    </div>
    <div class="modal-body">
    <p>${lineText1}</p>
    <button class="addButton">${buttonText}</button>
    <div class="noWantText">
    <span class="noAddBaggage">${noQuiero}</span>
    </div>
    </div>
    </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalTemplate);

    var addButton = document.querySelector('.addButton');
    addButton.addEventListener('click', function() {
        var modal = document.querySelector('#baggageModalCheckin');
        if (originalButton) {
            modal.style.display = 'none';
            window.location.href = 'https://booking.betauat.dgital.com/V2/Baggage?sh=MQ==';
            //https://booking.jetsmart.com/V2/Baggage?sh=MQ==      PARA PROD
        }
    });

    var closeButton = document.querySelector('.closeButton');
    closeButton.addEventListener('click', function () {
        var modal = document.querySelector('#baggageModalCheckin');
        if (originalButton) {
            modal.style.display = 'none';
            originalButton.click();
        }
    });

    var noQuieroButton = document.querySelector('.noAddBaggage');
    noQuieroButton.addEventListener('click', function () {
        var modal = document.querySelector('#baggageModalCheckin');
        if (originalButton) {
            modal.style.display = 'none';
            originalButton.click();
        }
    });
}

function addCSSModal() {
    var css = `
    #baggageModalCheckin {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #baggageModalCheckin .modal-content {
        background: #ffffff;
        border-radius: 10px;
        padding: 0;
        z-index: 1;
        width: 30%;
    }

    #baggageModalCheckin .modal-header {
        background-color: #59c3d9;
        padding: 20px;
        color: #ffffff;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    #baggageModalCheckin .modal-header h4 {
        font-weight: bold;
        font-size: 23px;
        font-family: Lato, sans-serif;
        text-align: center;
    }

    #baggageModalCheckin .modal-header .closeButton {
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

    #baggageModalCheckin .modal-header .closeButton:hover {
        color: rgb(185, 34, 52);
    }

    #baggageModalCheckin .modal-body {
        padding: 24px;
        font-family: 'Arial', sans-serif;
        font-size: 18px;
        color: #333333;
        text-align: center;
    }

    #baggageModalCheckin .modal-body p {
        margin: 0;
        font-size: 18px;
    }

    #baggageModalCheckin .modal-body .noWantText {
        margin-top: 8px;
        text-align: center;
    }

    #baggageModalCheckin .modal-body .noAddBaggage {
        font-size: 14px;
        color: #75787b;
        cursor: pointer;
        text-decoration: underline;
    }

    #baggageModalCheckin .modal-body .noAddBaggage:hover {
        color: #b2292e;
    }

    #baggageModalCheckin .modal-body .addButton {
        background-color: rgb(185, 34, 52);
        color: #ffffff;
        border-radius: 20px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        font-family: Lato,sans-serif;
        font-weight: bold;
        margin-top: 12px;
        border: 2px solid rgba(178, 41, 46, var(--border-opacity));
        --border-opacity: 1;
    }

    #baggageModalCheckin .addButton:hover {
        color: rgb(185, 34, 52);
        background-color: rgba(255, 255, 255);
    }

    @media (max-width: 767px) {
        #baggageModalCheckin .modal-content {
            width: 90%;
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
}

if (!haveBaggage()) {
    addCSSModal();
    fakeButton(originalButton);
}
}, 600);