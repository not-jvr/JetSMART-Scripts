var initDiscountMascotas = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/extras') return;
  clearInterval(initDiscountMascotas);

  var currency = bookingData.TotalPriceCurrencyLocal;
  var currencyText;

  switch(currency) {
    case 'CLP':
      currencyText = 'CLP';
      break;
    case 'ARS':
      currencyText = 'ARS';
      break;
    case 'PEN':
      currencyText = 'SOL';
      break;
    case 'COP':
      currencyText = 'COP';
      break;
    default:
      currencyText = 'USD';
  }

  function addCSS() {
    var css = `
      .custom-text {
        position: absolute;
        top: 5px;
        right: 5px;
        background-color: #fff; 
        color: #B5104E;
        padding: 5px;
        border-radius: 5px;
        z-index: 1;
        display: flex;
        align-items: center;
        font-weight: 600;
      }
      .custom-text img {
        margin-left: 5px;
        width: 16px;
        height: 16px;
      }
      [data-test-id="extras-pet-in-cabin-container"] header {
        background-image: url(https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/db8ba82d-5911-4fb7-b992-056772a19a87/Fondo%20Mascota%20a%20%241%20Desktop.png);
        background-size: cover;
        background-position: center center;
        padding: 15px 10px 0px 10px;
        margin: -25px -25px 0px -25px;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
      }
      [data-test-id="extras-pet-in-cabin-container"] [data-test-id="extras-pet-in-cabin-title"], [data-test-id="extras-pet-in-cabin-container"] [data-test-id="extras-pet-in-cabin-subtitle"], .js-pet.js-icon.title-icon {
        color: #fff !important;
      }
    `;
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    head.appendChild(style);
    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  function addText() {
  var container = document.querySelector('[data-test-id="extras-pet-in-cabin-container"]');

  if (container) {
    var existingText = container.querySelector('.custom-text');
    if (!existingText) {
      container.insertAdjacentHTML('beforeend', `<div class="custom-text">$1 ${currencyText}<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/c6a5e294-601d-4e44-877a-19cd133dcfab/%3Ficono%20dscto.png" alt="Descuento"></div>`);
    }
  } else {
    console.error('No se encontró el elemento con el atributo data-test-id especificado.');
  }
}


  if (currency) {
    addCSS();
    addText();
  }

}, 600);