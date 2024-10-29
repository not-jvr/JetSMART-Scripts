var initPCBBVA = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/payment') return;
  clearInterval(initPCBBVA);

  var culture = bookingData.Culture;
  var PC = bookingData.PromotionCode;
  var payButton = document.querySelector('.rounded-primary-btn.locked-btn');

  function isValidPromoCode() {
    if (PC === 'PEBV0622') {
      return true;
    }
    return false;
  }

  function hideOthersPayments(){
    var gc = document.querySelector('.ts-hide-on-credit-only-payment');
    if(gc){
      gc.style.display = 'none';
    }
    var otherCards = document.querySelector('ac-input-issuer-country');
    if(otherCards){
     otherCards.style.display = 'none';
   }
   var otherPaymentLabels = document.querySelectorAll('label[for^="payment_tab_"]:not([for="payment_tab_WW"]):not([for="payment_tab_WorldPay"]):not([for="payment_tab_MZ"])');
   otherPaymentLabels.forEach(function (label) {
    label.style.display = 'none';
  });
 }

 function addCSSMsg() {
  var css = `
  #promo-bbva-msg {
    display: flex;
    padding: 5px;
    position: relative;
    background-color: #b92234;
    line-height: 30px;
    color: white;
    border: 1px;
    border-radius: 5px;
    align-items: center;
    margin-top: 5px;
    max-width: 49.4%;
  }

  @media (max-width: 767px) {
    #promo-bbva-msg {
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
  if(!document.querySelector('#promo-bbva-msg')){
    var container = document.querySelector('ac-input-card');
    var mensaje = 'Recuerda que debes usar una tarjeta BBVA para aplicar esta promoción.';
    var newElement = document.createElement('div');
    newElement.classList.add('col-xs-1', 'col-md-1-2');
    newElement.id = 'promo-bbva-msg';
    newElement.innerHTML = `<i class="fas fa-exclamation-circle notification-icon custom-alert" style="margin-right: 10px;"></i><span>${mensaje}</span>`;
    container.insertAdjacentElement('afterend', newElement);
  }
}

function removeMsg() {
  if(document.querySelector('#promo-bbva-msg')){
    document.querySelector('#promo-bbva-msg').remove() 
  }
}

function inputBines(selector) {
  const inputElement = document.querySelector(selector);
  const payButton = document.querySelector('.rounded-primary-btn.locked-btn');

  inputElement.addEventListener('input', function() {
    const inputValue = inputElement.value;
    
    if (inputValue.length >= 6) {
      const firstSixChars = inputValue.substring(0, 6);
      
      if (firstSixChars === '123456' || firstSixChars === '123456' || firstSixChars === '123456' || firstSixChars === 'firstSixChars') { //BINES
        payButton.style.display = 'inline-flex';
        removeMsg();
      } else {
        payButton.style.display = 'none';
        addMsg();
      }
    } else {
      payButton.style.display = 'none';
      removeMsg();
    }
  });
}

function clickButtons(selector, inputSelector) {
  var button = document.querySelector(selector);
  if (button) {
    button.addEventListener("click", function() {
      payButton.style.display = 'none';
      removeMsg();
      setTimeout(function() {
        inputBines(inputSelector);
        console.log("Hola");
      }, 500);
    });
  }
}

if(!isValidPromoCode() && culture === 'es-PE'){
  payButton.style.display = 'none';
  addCSSMsg();
  clickButtons('#payment_tab_WW', '[data-test-id="payment-card-number--c|WW"]');
  clickButtons('#payment_tab_WorldPay', '[data-test-id="payment-card-number--c|WorldPay"]');
  clickButtons('#payment_tab_MZ', '[data-test-id="payment-card-number--c|MZ"]');
  hideOthersPayments();
}

}, 600);