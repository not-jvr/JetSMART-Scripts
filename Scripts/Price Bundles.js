var initPriceBundle2 = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
  clearInterval(initPriceBundle2);

  var culture = bookingData.Culture;

  function getCurrentCurrency() {
    const currencyElement = document.querySelector(".flight-currency-select");
    if (currencyElement) {
      return currencyElement.value;
    } else {
      const currencyElementAE = document.querySelector('[data-test-id="sidebar-total-currency"]');
      return currencyElementAE.textContent.trim();
    }
  }

  function formatCurrencyValue(value, currency) {
    if (value === 0) {
      return "+ 0";
    }

    switch (currency) {
    case "CLP":
      return "+ $" + value.toLocaleString();
    case "BRL":
      return "+ R$" + value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    case "COP":
      return "+ $" + value.toLocaleString();
    case "PEN":
      return "+ S/" + value.toLocaleString("es-PE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    case "USD":
      return "+ $" + value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    case "ARS":
      return "+ $" + value.toLocaleString("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    default:
      return "+" + value.toString();
    }
  }

  function updatePrices(index, currency) {
    let noneElement = document.querySelector(`[data-test-id="bundle-price--j|${index}-c|none"]`);
    if (!noneElement) return;

    let value = parseFloat(noneElement.dataset.testValue);

    let elements = [
      noneElement,
      document.querySelector(`[data-test-id="bundle-price--j|${index}-c|simple"]`),
      document.querySelector(`[data-test-id="bundle-non-discounted-price--j|${index}-c|simple"]`),
      document.querySelector(`[data-test-id="bundle-price--j|${index}-c|full"]`),
      document.querySelector(`[data-test-id="bundle-non-discounted-price--j|${index}-c|full"]`),
      ];

    let noneValueMobile = "+ 0";
    let fullValueMobile = "";
    let simpleValueMobile = "";
    let nonDiscountedFullValueMobile = "";
    let nonDiscountedSimpleValueMobile = "";

    elements.forEach((el) => {
      if (el) {
        if (el === noneElement) {
          el.innerText = "+ 0";
          noneValueMobile = el.innerText;
        } else if (el.dataset && el.dataset.testValue) {
          let currentValue = parseFloat(el.dataset.testValue);
          let newValue = currentValue - value;
          if (el.dataset.testId && el.dataset.testId.includes("non-discounted-price")) {
            el.innerText = formatCurrencyValue(Math.abs(newValue), currency).substring(2);
            if (el.dataset.testId.includes("full")) {
              nonDiscountedFullValueMobile = el.innerText;
            } else if (el.dataset.testId.includes("simple")) {
              nonDiscountedSimpleValueMobile = el.innerText;
            }
          } else {
            el.innerText = formatCurrencyValue(newValue, currency);
            if (el.dataset.testId.includes("full")) {
              fullValueMobile = el.innerText;
            } else if (el.dataset.testId.includes("simple")) {
              simpleValueMobile = el.innerText;
            }
          }
        }
      }
    });

    let fullElementMobile = document.querySelector(`[data-test-id="bundle-selector-option--j|${index}-c|full"] .bundle-price`);
    let simpleElementMobile = document.querySelector(`[data-test-id="bundle-selector-option--j|${index}-c|simple"] .bundle-price`);
    let nonDiscountedFullElementMobile = document.querySelector(`[data-test-id="bundle-selector-option--j|${index}-c|full"] .bundle-non-discounted-price`);
    let nonDiscountedSimpleElementMobile = document.querySelector(`[data-test-id="bundle-selector-option--j|${index}-c|simple"] .bundle-non-discounted-price`);

    /* NO ESTAN LOS DISCOUNT
    if (fullElementMobile && simpleElementMobile &&
      nonDiscountedFullElementMobile && nonDiscountedSimpleElementMobile) {
      fullElementMobile.innerText = fullValueMobile;
    simpleElementMobile.innerText = simpleValueMobile;
    nonDiscountedFullElementMobile.innerText = nonDiscountedFullValueMobile;
    nonDiscountedSimpleElementMobile.innerText = nonDiscountedSimpleValueMobile;
  }
  */

    if (fullElementMobile && simpleElementMobile) {
      fullElementMobile.innerText = fullValueMobile;
      simpleElementMobile.innerText = simpleValueMobile;
    }

    let noneElementMobile = document.querySelector(`[data-test-id="bundle-selector-option--j|${index}-c|none"] .bundle-price.no-bundle`);
    if (noneElementMobile) {
      noneElementMobile.innerText = "+ 0";
    }
  }

  function clickButtons(){
    const smartFeeButtons = document.querySelectorAll('.smart-fee.nowrap.big, .discount-fee.nowrap.small, .smart-fee.nowrap.small, .discount-fee.nowrap.big');
    const buttonClickHandler = function () {
      const currency = getCurrentCurrency();
      updatePrices(0, currency);
      updatePrices(1, currency);
    };
    smartFeeButtons.forEach(button => button.addEventListener('click', buttonClickHandler));
  }

  function allFunctions() {
    var currency = getCurrentCurrency();
    clickButtons();
    updatePrices(0, currency);
    updatePrices(1, currency);
  }

  if(culture){
    allFunctions();
    window.eventBus.subscribe({
      name: "currency_change",
      callback: function (e) {
        allFunctions();
      },
    });
  }

}, 600);