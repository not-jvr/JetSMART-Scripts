var initToggleSwitch2 = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
    clearInterval(initToggleSwitch2);
    var culture = bookingData.Culture;
    var count = 0;

    function addCSS() {
        var css = `
        .switch-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            background-color: #f2f2f2;
            padding: 0px;
            border-radius: 10px;
            margin: 20px auto;
            max-width: 305px;
            border: 1px solid #163a70;
        }

        .switch-title {
            flex: 1;
            text-align: left;
            margin-left: 10px;
            font-family: Lato, sans-serif;
            line-height: 1rem;
            color: #163a70;
            font-size: 0.85rem;
            font-weight: 900;
        }

        .switch-text {
            margin: 12px;
            color: #163a70;
            font-size: 0.85rem;
            font-weight: 900;
        }

        .switch-and-text-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .switch {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 45px;
            height: 22px;
            position: relative;
            margin: 0 auto;
        }

        .switch input {
            display: none;
        }

        .slider {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            border-radius: 16px;
            box-shadow: 0 0 0 2px #163a70, 0 0 4px #163a70;
            cursor: pointer;
            border: 2px solid transparent;
            overflow: hidden;
            transition: 0.2s;
        }

        .slider:before {
            position: absolute;
            content: "";
            width: 100%;
            height: 100%;
            background-color: #163a70;
            border-radius: 16px;
            transform: translateX(-22px);
            transition: 0.2s;
        }

        input:checked + .slider:before {
            transform: translateX(22px);
        }
        `;

        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        head.appendChild(style);
        style.type = 'text/css';
        if (style.styleSheet) {
          style.styleSheet.cssText = css;
      } else {
          style.appendChild(document.createTextNode(css));
      }
  }

  function addToggleSwitch() {
    if (!document.querySelector('.switch')) {
        var currencySelect = document.querySelector('[data-test-id="sidebar-currency-switch"]');
        if (currencySelect) {
            var currencies = changeCurrency();

            var container = document.querySelector('[data-test-id="flight-itinerary"]');
            var toggleSwitchHTML = `<div class="switch-wrapper"><h2 class="switch-title">COTIZAR VUELOS EN:</h2><div class="switch-and-text-container"><span id="toggle1" class="switch-text">${currencies.currentCurrency}</span><div class="switch"><label><input type="checkbox" class="switch-input"><span class="slider"></span></label></div><span id="toggle2" class="switch-text">${currencies.otherCurrency}</span></div></div>`;

            var toggleSwitchContainer = document.createElement('div');
            toggleSwitchContainer.innerHTML = toggleSwitchHTML;

            container.parentNode.insertBefore(toggleSwitchContainer, container.nextSibling);

            var switchInput = toggleSwitchContainer.querySelector('.switch-input');
            switchInput.addEventListener('change', function () {
                if (currencySelect.value !== 'USD') {
                    handleSwitchToggle('USD');
                } else if (currencySelect.value === 'USD') {
                    handleSwitchToggle('PEN');
                }
            });
        }
    }
}

function changeCurrency() {
    var currencySelect = document.querySelector('[data-test-id="sidebar-currency-switch"]');
    var currentCurrency;
    var otherCurrency;
    if (currencySelect.value !== 'USD') {
        if (currencySelect.value === 'PEN' || currencySelect.value === 'SOL') {
            currentCurrency = 'SOL';
        } else {
            currentCurrency = currencySelect.value;
        }
        otherCurrency = 'USD';
    } else if (currencySelect.value === 'USD') {
        currentCurrency = 'USD';
        otherCurrency = 'SOL';
    }
    return { currentCurrency, otherCurrency };
}

function updateToggleSwitchText() {
    if (document.querySelector('.switch')) {
        console.log("test")
        var currencySelect = document.querySelector('[data-test-id="sidebar-currency-switch"]');
        var currencies = changeCurrency(currencySelect);
        var toggle1 = document.getElementById('toggle1');
        var toggle2 = document.getElementById('toggle2');

        if (toggle1 && toggle2) {
            toggle1.textContent = currencies.currentCurrency;
            toggle2.textContent = currencies.otherCurrency;
        }

        count++;
        if (count < 3) {
            setTimeout(updateToggleSwitchText, 1000);
        } else {
            count = 0;
        }
    }
}

function handleSwitchToggle(value) {
    var currencySelect = document.querySelector('[data-test-id="sidebar-currency-switch"]');
    var event = new Event('change');

    currencySelect.value = value;
    currencySelect.dispatchEvent(event);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'switchToggle',
        'currency': value
    });
}

function esEmpresaAgencia() {
    var agenciaEmpresa = JetSmart.AppContext.isCug2Member;
    if (agenciaEmpresa === 'False') {
        return false;
    } else if (agenciaEmpresa === 'True') {
        return true;
    }
}

if (culture === 'es-PE' && !esEmpresaAgencia()) {
    addCSS();
    addToggleSwitch();
    updateToggleSwitchText();
    window.eventBus.subscribe({
        name: "toggleSwitchUSDvsPEN2", callback: function (e) {
            addToggleSwitch();
            updateToggleSwitchText();
        }
    });
}

}, 600);