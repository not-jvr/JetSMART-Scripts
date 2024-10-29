var initBinesIrlanda = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/payment') return;
  clearInterval(initBinesIrlanda);

  function inputBines(i) {
    var inputElement = document.querySelector(`[data-test-id="payment-card-number--c|${i}"]`);
    var binList = [
      '553519', '553397'
      ];
    var selectElement = document.querySelector('select[data-test-id="payment-card-issuer-country"]');
    var selectedValue = selectElement.value;

    if (selectedValue !== "PE" && selectedValue !== "CL" && selectedValue !== "CO" && selectedValue !== "AR") {
      inputElement.addEventListener('input', function() {
      var inputValue = inputElement.value;

      if (inputValue.length >= 6) {
        var firstSixChars = inputValue.substring(0, 6);

        if (binList.includes(firstSixChars)) {
          checkCountry();
        }
      }
    });
    }
  }

  function clickWWButton(i) {
    var button = document.querySelector(`#payment_tab_${i}`);
    if (button) {
      button.addEventListener("click", function() {
        setTimeout(function() {
          inputBines(i);
        }, 500);
      });
    }
  }

  function checkCountry() {
    var selectElement = document.querySelector('select[data-test-id="payment-card-issuer-country"]');
    var selectedValue = selectElement.value;

    if (selectedValue !== "IE") {
      handleSwitchToggle('IE');
    }
  }

  function noEsChile() {
    var noEsChileContainer = document.querySelector('.non-chile-link');

    if (noEsChileContainer) {
      noEsChileContainer.addEventListener('click', function() {
        setTimeout(function() {
          console.log('Hola');
          clickWWButton('WorldPay');
          noEsChile();
          otherCountries();
        }, 500);
      });
    }
  }

  function otherCountries() {
    var noEsChileContainer = document.querySelector('[data-test-id="payment-card-issuer-country"]');

    if (noEsChileContainer) {
      noEsChileContainer.addEventListener('click', function() {
        setTimeout(function() {
          console.log('chao');
          clickWWButton('WorldPay');
          otherCountries();
          noEsChile();
        }, 500);
      });
    }
  }

  function handleSwitchToggle(value) {
    var currencySelect = document.querySelector('[data-test-id="payment-card-issuer-country"]');
    var event = new Event('change');

    currencySelect.value = value;
    currencySelect.dispatchEvent(event);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'switchCountry',
      'currency': value
    });
  }

  noEsChile();
  otherCountries();
  clickWWButton('WorldPay');

}, 600);