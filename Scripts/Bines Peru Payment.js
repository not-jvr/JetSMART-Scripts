 var initBINESPERU = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/payment') return;
  clearInterval(initBINESPERU);

  var culture = bookingData.Culture;

  function addCSSMsg() {
    var css = `
    #msg-ww-peru-bines {
      padding: 5px;
      position: relative;
      background-color: #b92234;
      color: white;
      border: 1px;
      border-radius: 7px;
      align-items: center;
      margin-top: 5px;
      max-width: 100%;
    }

    #msg-ww-peru-bines span {
      font-size: 14px;
    }

    @media (max-width: 767px) {
      #msg-ww-peru-bines {
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
    if(!document.querySelector('#msg-ww-peru-bines')){
      var container = document.querySelector('[data-test-id="payment-card-number--c|WW"]');
      var mensaje = 'Ten en cuenta que pagar a traves de este botón puede generar cargos adicionales en tu tarjeta de crédito. Por favor intenta pagar desde el botón de Mercado Pago.';
      var newElement = document.createElement('div');
      newElement.id = 'msg-ww-peru-bines';
      newElement.innerHTML = `<span>${mensaje}</span>`;
      container.insertAdjacentElement('afterend', newElement);
    }
  }

  function removeMsg() {
    if(document.querySelector('#msg-ww-peru-bines')){
      document.querySelector('#msg-ww-peru-bines').remove() 
    }
  }

  function clickWWButton() {
    var button = document.querySelector('#payment_tab_WW');
    if (button) {
      button.addEventListener("click", function() {
        removeMsg();
        setTimeout(function() {
          inputBines();
          console.log("Hola");
        }, 500);
      });
    }
  }

  function clickButtons() {
    var buttons = document.querySelectorAll('label[for^="payment_tab_"]:not([for="payment_tab_WW"])');
    if (buttons) {
      buttons.forEach(function(button) {
        button.addEventListener("click", function() {
          removeMsg();
        });
      });
    }
  }

  function inputBines() {
    var inputElement = document.querySelector('[data-test-id="payment-card-number--c|WW"]');
    var binList = [
      '421355', '455170', '455103', '447410', '411074'
      ];

    inputElement.addEventListener('input', function() {
      var inputValue = inputElement.value;

      if (inputValue.length >= 6) {
        var firstSixChars = inputValue.substring(0, 6);

        if (binList.includes(firstSixChars)) {
          console.log("igual");
          addMsg(); 
        } else {
          console.log("no");
          removeMsg();
        }
      } else {
        removeMsg();
      }
    });
  }

  if (culture === 'es-PE') {
    clickButtons();
    clickWWButton();
    addCSSMsg();
  }
  
}, 600);