var initCuotealoPC = setInterval(function () {
  if (typeof bookingData === "undefined" || typeof window.eventBus === "undefined" || window.location.pathname !== '/V2/Payment') return;
  clearInterval(initCuotealoPC);

  var culture = bookingData.Culture;
  var currency = bookingData.TotalPriceCurrency;
  var totalprice = bookingData.TotalPrice;
  var PC = bookingData.PromotionCode;
  var HASH = JetSmart.AppContext.promoCode;
  var esEmpresaAgencia = JetSmart.AppContext.isCug2Member;

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
      var container = document.querySelector('.inner-deep-box.ts-hide-on-voucher-only-payment.ts-hide-on-credit-only-payment');

      if(esEmpresaAgencia === "False"){
       if(culture === 'es-PE'){
        var mensaje = `Si quieres acceder a la promoción con Cuotéalo, el monto de tu reserva debe ser superior a 105 USD o 399 Soles. Para volver a realizar tu compra pulsa <a href="https://jetsmart.com/pe/es/?pc=${HASH}" style="color: white; text-decoration: underline;">AQUÍ</a>`;
      }
      if(culture === 'en-US'){
        var mensaje = `If you want to access the promotion with Cuotéalo, it must be done through our Peruvian website and by paying with Cuotéalo. To switch to Peru, click <a href="https://jetsmart.com/pe/es/?pc=${HASH}" style="color: white; text-decoration: underline;">HERE</a>`;
      }
      if(culture === 'pt-BR'){
        var mensaje = `Se você deseja acessar a promoção com o Cuotéalo, deve ser feito através do nosso site peruano e pagando com o Cuotéalo. Para mudar para o Peru, clique <a href="https://jetsmart.com/pe/es/?pc=${HASH}" style="color: white; text-decoration: underline;">AQUÍ</a>`;
      }
      if(culture === 'es-CL' || culture === 'es-AR' || culture === 'es-UY' || culture === 'es-PY' || culture === 'es-CO'){
        var mensaje = `Si quieres acceder a la promoción con Cuotéalo debe ser desde nuestro sitio web Perú y pagando con Cuotéalo. Para cambiar a Perú pulsa <a href="https://jetsmart.com/pe/es/?pc=${HASH}" style="color: white; text-decoration: underline;">AQUÍ</a>`;
      }
    }

    if(esEmpresaAgencia === "True"){
      if(culture === 'en-US'){
        var mensaje = `The promotion of Cuotealo is only available for natural persons.`;
      }
      if(culture === 'pt-BR'){
        var mensaje = `A promoção do Cuotealo está disponível apenas para pessoas físicas.`;
      }
      if(culture === 'es-CL' || culture === 'es-AR' || culture === 'es-UY' || culture === 'es-PY' || culture === 'es-CO' || culture === 'es-PE'){
        var mensaje = `La promoción de Cuotealo está solo disponible para personas naturales.`;
      }
    }

    var newElement = document.createElement('div');
    newElement.id = 'cuotealo-text-msg';
    newElement.innerHTML = `<i class="fas fa-exclamation-circle notification-icon custom-alert" style="margin-right: 10px;"></i><span>${mensaje}</span>`;
    var css = `
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
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
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

function hideOthersPayments(){
  var gc = document.querySelector('.ts-hide-on-credit-only-payment');
  if(gc){
    gc.style.display = 'none';
  }
  var carrusel = document.querySelector('[data-test-id="payment-card-issuer-country"]');
  if(carrusel){
   carrusel.style.display = 'none';
 }
 var otherPaymentLabels = document.querySelectorAll('label[for^="payment_tab_"]:not([for="payment_tab_CUOTEALO"])');
 otherPaymentLabels.forEach(function (label) {
  label.style.display = 'none';
});
}

function hideAll(){
  var gc = document.querySelector('.ts-hide-on-credit-only-payment');
  var tarjetas = document.querySelector('.inner-deep-box.ts-hide-on-voucher-only-payment.ts-hide-on-credit-only-payment');
  var msjeseguridad = document.querySelector('#span-seguridad-id');
  if(gc){
    gc.style.display = 'none';
  }
  if(tarjetas){
    tarjetas.style.display = 'none';
  }
  if(msjeseguridad){
    msjeseguridad.style.display = 'none';
  }
}

function noCumple(){
  hideAll()
  addUpgradeSuggestionPC()
}

function siCumple(){
 hideOthersPayments()
}

function otraCultura(){
  hideAll()
  addUpgradeSuggestionPC()
}

function empresaAgencia(){
  hideAll()
  addUpgradeSuggestionPC()
}

if (culture === 'es-PE' && !isValidCurrencyAndAmount() && isValidPromoCode() && esEmpresaAgencia === "False"){
  noCumple()
}

if(culture === 'es-PE' && isValidCurrencyAndAmount() && isValidPromoCode() && esEmpresaAgencia === "False"){
  siCumple()
}

if(culture !== 'es-PE' && isValidPromoCode() && esEmpresaAgencia === "False"){
  otraCultura()
}

if(esEmpresaAgencia === "True" && isValidPromoCode()){
  empresaAgencia()
}

}, 1200);