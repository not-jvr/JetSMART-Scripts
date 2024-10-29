var initMSGRUCEC = setInterval(function () {
  if (window.location.pathname.toLowerCase() !== '/v2agency/register' || typeof JetSmart === "undefined") return;
  clearInterval(initMSGRUCEC);

  var culture = JetSmart.Cug2AppContext.culture;

  function addCSSMsg() {
    var css = `
    #msg-ruc-ec {
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

    #msg-ruc-ec span {
      font-size: 13px;
    }

    @media (max-width: 767px) {
      #msg-ruc-ec {
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

    if(!document.querySelector('#msg-ruc-ec')){
      var container = document.querySelector('[data-validation="AdminForm.AdminId"]');
      if (container) {
        var mensaje = 'Debes ingresar los 10 primero números de tu RUC.';
        var newElement = document.createElement('div');
        newElement.id = 'msg-ruc-ec';
        newElement.innerHTML = `<span>${mensaje}</span>`;
        container.insertAdjacentElement('afterend', newElement);
      }
    }
    
  }

  function clickContinue() {
    var continueButton = document.querySelector('.cug2b-register-btn-container .rounded-primary-btn');

    if (continueButton) {
      continueButton.addEventListener('click', function() {
        setTimeout(function () {
          console.log('Hola2');
          clickBack();
          clickContinue();
          addMsg();
        }, 500);
      });
    }
  }

  function clickBack() {
    var backButton = document.querySelector('.cug2b-register-btn-container .cug2b-register-back-btn');

    if (backButton) {
      backButton.addEventListener('click', function() {
        setTimeout(function () {
          console.log('Hola2');
          clickBack();
          clickContinue();
          addMsg();
        }, 500);
      });
    }
  }

  if (culture === 'es-EC') {
    console.log("entre")
    addCSSMsg();
    clickBack();
    clickContinue();
  }


}, 600);