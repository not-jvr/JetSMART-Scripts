var initGIFCuotealo = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Payment') return;
  clearInterval(initGIFCuotealo);
  var culture = bookingData.Culture;

  function addGifCuotealo() {
    if(!document.querySelector('#gif-cuotealo')){
      var container = document.querySelector('.payment-message');
      var imageUrl = "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/dc13042f-de70-4231-b22d-fbcd498c57c5/NuevoGif_General.gif";
      var mensaje = "Revisa <a href='" + imageUrl + "' target='_blank'>AQUÍ</a> como pagar con Cuotéalo.";
      var newElement = document.createElement('div');
      newElement.id = 'gif-cuotealo';
      newElement.innerHTML = `<i class="fas fa-question-circle notification-icon custom-alert" style="margin-right: 10px;"></i><span>${mensaje}</span>`;
      var css = `
      #gif-cuotealo {
        display: flex;
        padding: 5px;
        position: relative;
        background-color: rgb(89, 195, 217);
        line-height: 30px;
        color: white;
        border: 1px;
        border-radius: 5px;
        align-items: center;
        margin: 10px;
        margin-left: 10px;
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
      container.parentNode.insertBefore(newElement, container);
    }
  }

  function removeGifCuotealo() {
    var element = document.getElementById('gif-cuotealo');
    if (element) {
      element.parentNode.removeChild(element);
    }
  }

  function setupCuotealoButtonClick() {
    var botonCuotealo = document.querySelector('[for="payment_tab_CUOTEALO"]');
    if (botonCuotealo) {
      botonCuotealo.addEventListener('click', addGifCuotealo);
    }
  }

  function setupOtherPaymentLabelsClick() {
    var otherPaymentLabels = document.querySelectorAll('label[for^="payment_tab_"]:not([for="payment_tab_CUOTEALO"])');
    otherPaymentLabels.forEach(function (label) {
      label.addEventListener('click', removeGifCuotealo);
    });
  }

  function setupClickListenersIfPE() {
    var selectElement = document.querySelector('[data-test-id="payment-card-issuer-country"]');
    setTimeout(function () {
      if (selectElement) {
        var selectValue = selectElement.value;
        if(selectValue !== 'PE' && document.getElementById('gif-cuotealo')){
          removeGifCuotealo();
        }
      }
    }, 400);
  }

  function onInnerDeepBoxClick() {
    setupClickListenersIfPE();
    setupOtherPaymentLabelsClick();
    setupCuotealoButtonClick();
  }

  function setupInnerDeepBoxClick() {
    var innerDeepBox = document.querySelector('.inner-deep-box.ts-hide-on-voucher-only-payment.ts-hide-on-credit-only-payment');
    if (innerDeepBox) {
      innerDeepBox.addEventListener('click', onInnerDeepBoxClick);
    }
  }

  if (culture === 'es-PE') {
    setupCuotealoButtonClick()
    window.eventBus.subscribe({
      name: "khipuButton",
      callback: function (e) {
        setupInnerDeepBoxClick();
      }
    });
  }

}, 400);