var initToolTipLogin = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/login') return;
  clearInterval(initToolTipLogin);

  var culture = bookingData.Culture;

  function addDivBox() {
    const inputElement = document.querySelector('[data-test-id="cug2-login-email-or-username-input"]');
    const divElement = document.createElement('div');

    divElement.classList.add('tooltipClass');

    inputElement.parentNode.insertBefore(divElement, inputElement);
    divElement.appendChild(inputElement);
  }

  function addCSSTooltip() {
    var css = `
    .mdl-textfield__label {
      z-index: 1;
    }

    .tooltipClass {
      position: relative;
      cursor: pointer;
    }

    .tooltipClass .tooltip-text {
     visibility: hidden;
     background-color: #333;
     color: #fff;
     text-align: center;
     border-radius: 6px;
     padding: 5px;
     position: absolute;
     z-index: 1;
     bottom: 125%;
     left: 50%;
     transform: translateX(-50%);
     opacity: 0;
     transition: opacity 0.3s;
   }

   .tooltipClass .tooltip-text::after {
     content: '';
     position: absolute;
     width: 0;
     height: 0;
     border-style: solid;
     border-width: 6px 6px 0 6px;
     border-color: #333 transparent transparent transparent;
     bottom: -6px;
     left: 50%;
     transform: translateX(-50%);
   }

   .tooltipClass:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
  `;

  var style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));

  var head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(style);
}

function addTooltip() {
  var element = document.querySelector('.tooltipClass');
  var tooltip = document.createElement('div');
  tooltip.classList.add('tooltip-text');

  switch (culture) {
  case 'pt-BR':
    tooltip.textContent = 'Se você se registrou em 2023, use seu nome de usuário; caso contrário, faça login com seu e-mail de registro.';
    break;
  case 'en-US':
    tooltip.textContent = 'If you registered in 2023, use your username; otherwise, log in with your registration email.';
    break;
  default:
    tooltip.textContent = 'Si te registraste en 2023, usa tu nombre de usuario; de lo contrario, ingresa con tu email de registro.';
  }

  element.addEventListener('mouseover', function() {
    element.appendChild(tooltip);
  });

  element.addEventListener('mouseout', function() {
    tooltip.remove();
  });
}

function allFunctions() {
  addDivBox();
  addCSSTooltip();
  addTooltip();
}

if(document.querySelector('[data-test-id="cug2-login-email-or-username-input"]')){
  allFunctions();
}

}, 600);