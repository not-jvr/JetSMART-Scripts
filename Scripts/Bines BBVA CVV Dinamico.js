 var initBINESPERUCVVDINAMICO = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/payment') return;
  clearInterval(initBINESPERUCVVDINAMICO);

  var culture = bookingData.Culture;

  function addCSSMsg() {
    var css = `
    #msg-ww-peru-binesdinamicos {
      padding: 5px;
      position: relative;
      background-color: #59c3d9;
      color: white;
      border: 1px;
      border-radius: 7px;
      align-items: center;
      margin-top: 5px;
      max-width: 100%;
    }

    #msg-ww-peru-binesdinamicos span {
      font-size: 14px;
    }

    @media (max-width: 767px) {
      #msg-ww-peru-binesdinamicos {
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
    if(!document.querySelector('#msg-ww-peru-binesdinamicos')){
      var container = document.querySelector('[data-test-id="payment-card-number--c|WorldPay"]');
      var mensaje = 'Recuerda que tienes que utilizar el CVV dinámico para poder finalizar tu compra';
      var newElement = document.createElement('div');
      newElement.id = 'msg-ww-peru-binesdinamicos';
      newElement.innerHTML = `<span>${mensaje}</span>`;
      container.insertAdjacentElement('afterend', newElement);
    }
  }

  function removeMsg() {
    if(document.querySelector('#msg-ww-peru-binesdinamicos')){
      document.querySelector('#msg-ww-peru-binesdinamicos').remove() 
    }
  }

  function clickWWButton() {
    var button = document.querySelector('#payment_tab_WorldPay');
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
    var buttons = document.querySelectorAll('label[for^="payment_tab_"]:not([for="payment_tab_WorldPay"])');
    if (buttons) {
      buttons.forEach(function(button) {
        button.addEventListener("click", function() {
          removeMsg();
        });
      });
    }
  }

  function inputBines() {
    var inputElement = document.querySelector('[data-test-id="payment-card-number--c|WorldPay"]');
    var binList = [
      '414089', '414089', '414791', '414068', '414068', '491914', '491911', '491910', '414064', '404293', '491931', '491931', '553650', '511578', '512409', '512312', '491909', '414075', '519348', '455103', '455170', '438168', '491913', '491947', '428597', '491912', '491946'
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
    addCSSMsg();
    clickButtons();
    clickWWButton();
  }
  
}, 600);