var initChangeTextBE = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/payment') return;
  clearInterval(initChangeTextBE);

  function clickButtons() {
    var buttons = document.querySelectorAll('label[for^="be_payment_tab_"]');
    if (buttons) {
      buttons.forEach(function(button) {
        button.addEventListener("click", function() {
          inputText();
        });
      });
    }
  }

  function inputText() {
    setTimeout(function() {
      var inputElements = document.querySelectorAll('[data-test-id^="payment-card-number"]');

      inputElements.forEach(function(inputElement) {
        inputElement.addEventListener('input', function() {
          changeText();
        });
      });
    }, 500);
  }

  function changeText() {
    var elementos = document.querySelectorAll('.form-error-message');

    for (var i = 0; i < elementos.length; i++) {
      if (elementos[i].textContent.includes("Número de tarjeta es inválido. Por favor verifica que el número ingresado sea correcto y que no contenga espacios ni caracteres no numéricos.")) {
        elementos[i].textContent = "Número de tarjeta no es válida o no fue emitida por BancoEstado. Por favor, verifica que el número de tarjeta sea válido, no contenga espacios ni caracteres especiales y sea emitido por BancoEstado";
        break;
      }
    }
  }

  function esBE() {
    var BE = JetSmart.AppContext.bancoEstadoCategory;
    if (BE > 0) {
      return true;
    } else {
      return false;
    }
  }

if (esBE()) {
  clickButtons();
}

}, 600);