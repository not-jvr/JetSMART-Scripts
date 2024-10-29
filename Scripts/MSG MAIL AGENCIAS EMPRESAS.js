var initMSGMAIL = setInterval(function () {
  if (window.location.pathname.toLowerCase() !== '/v2agency/register' || typeof JetSmart === "undefined") return;
  clearInterval(initMSGMAIL);

  var culture = JetSmart.Cug2AppContext.culture;

  function addCSSMsg() {
    var css = `
    #msg-correo {
      padding: 5px;
      position: relative;
      background-color: #2c3438;
      color: white;
      border: 1px;
      border-radius: 7px;
      align-items: center;
      margin-top: 5px;
      max-width: 100%;
    }

    #msg-correo span {
      font-size: 13px;
    }

    @media (max-width: 767px) {
      #msg-correo {
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
  if (!document.querySelector('#msg-correo')) {
    var container = document.querySelector('[data-validation="CompanyForm.Email"]');
    if (container) {
      var mensaje;

      switch (culture) {
        case 'en-US':
          mensaje = 'Please enter an email with the domain of your company/agency; otherwise, it may not pass the approval for activation.';
          break;
        case 'pt-BR':
          mensaje = 'Por favor, insira um endereço de e-mail com o domínio da sua empresa/agência; caso contrário, pode não passar pela aprovação para ativação.';
          break;
        default:
          mensaje = 'Por favor ingresa un correo electrónico con dominio de tu empresa/agencia; de lo contrario, podría no pasar la aprobación para su activación.';
          break;
      }

      var newElement = document.createElement('div');
      newElement.id = 'msg-correo';
      newElement.innerHTML = `<span>${mensaje}</span>`;
      container.insertAdjacentElement('afterend', newElement);
    }
  }
}


  if (culture) {
    console.log("entre")
    addCSSMsg();
    addMsg();
  }


}, 600);