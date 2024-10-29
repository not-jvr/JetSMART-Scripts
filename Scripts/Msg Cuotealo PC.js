var initMsgCuotealoPC = setInterval(function () {
  if (typeof bookingData === "undefined" || typeof window.eventBus === "undefined" || window.location.pathname !== '/V2/Payment') return;
  clearInterval(initMsgCuotealoPC);
  var culture = bookingData.Culture;
  var currency = bookingData.TotalPriceCurrency;
  var totalprice = bookingData.TotalPrice;
  var PC = bookingData.PromotionCode;

  function isValidCurrencyAndAmount() {
    if (currency === 'USD' && totalprice >= 105) {
      return true;
    }
    if (currency === 'PEN' && totalprice >= 399) {
      return true;
    }
    return false;
  }

  function isValidPromoCode() {
    if (PC === 'CUO25TBC') {
      return true;
    }
    return false;
  }

  function addUpgradeSuggestionPC() {
    if(!document.querySelector('#cuotealo-text-msg')){
      const container = document.querySelector('.peru-payment-banks');
      const mensaje = `Si quieres acceder a la promoción con Cuotéalo, el monto de tu reserva debe ser superior a 105 USD o 399 Soles.`;
      const newElement = document.createElement('div');
      newElement.id = 'cuotealo-text-msg';
      newElement.innerHTML = `<i class="fas fa-exclamation-circle notification-icon custom-alert" style="margin-right: 10px;"></i><span>${mensaje}</span>`;
      const css = `
      #cuotealo-text-msg {
        display: flex;
        padding: 5px;
        position: relative;
        background-color: #b92234;
        line-height: 30px;
        color: white;
        border: 1px;
        border-radius: 5px;
        align-items: center;
        margin: 10px;
        margin-left: 10px;
      }
      `;
      const head = document.head || document.getElementsByTagName('head')[0];
      const style = document.createElement('style');
      head.appendChild(style);
      style.type = 'text/css';
      if (style.styleSheet){
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
      container.parentNode.appendChild(newElement, container);
    }
  }

  function removeUpgradeSuggestionPC() {
    const element = document.getElementById('cuotealo-text-msg');
    if (element) {
      element.parentNode.removeChild(element);
    }
  }

  function handleCuotealoClick() {
    setTimeout(function () {
      addUpgradeSuggestionPC()
    }, 400);
  }

  function handleOtherPaymentLabelsClick() {
    removeUpgradeSuggestionPC()
  }

  function setupCuotealoButtonClick() {
    var botonCuotealo = document.querySelector('[for="payment_tab_CUOTEALO"]');
    if (botonCuotealo) {
      botonCuotealo.addEventListener('click', handleCuotealoClick);
    }
  }

  function setupOtherPaymentLabelsClick() {
    var otherPaymentLabels = document.querySelectorAll('label[for^="payment_tab_"]:not([for="payment_tab_CUOTEALO"])');
    otherPaymentLabels.forEach(function (label) {
      label.addEventListener('click', handleOtherPaymentLabelsClick);
    });
  }

  function setupClickListenersIfPE() {
    var selectElement = document.querySelector('[data-test-id="payment-card-issuer-country"]');
    if (selectElement) {
      var selectValue = selectElement.value;
      if (selectValue === 'PE') {
        setTimeout(function () {
          setupCuotealoButtonClick();
          setupOtherPaymentLabelsClick();
        }, 400);
      }
    }
  }

  function onInnerDeepBoxClick() {
    setupClickListenersIfPE();
  }

  function setupInnerDeepBoxClick() {
    var innerDeepBox = document.querySelector('.inner-deep-box.ts-hide-on-voucher-only-payment.ts-hide-on-credit-only-payment');
    if (innerDeepBox) {
      innerDeepBox.addEventListener('click', onInnerDeepBoxClick);
    }
  }

// isValidCurrencyAndAmount() debe ser false
// isValidPromoCode() debe ser true

  if (culture === 'es-PE' && !isValidCurrencyAndAmount() && isValidPromoCode()) {
    setupClickListenersIfPE();
    window.eventBus.subscribe({
      name: "khipuButton",
      callback: function (e) {
        setupInnerDeepBoxClick();
      }
    });
  }
}, 400);