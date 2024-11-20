var initToggleSwitchARFake = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
    clearInterval(initToggleSwitchARFake);

    var culture = bookingData.Culture;

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
        
        .newmsgimpuestos {
            display: flex;
            padding: 5px;
            position: relative;
            background-color: #fff;
            line-height: 30px;
            color: #163a70;
            border: 1px;
            border-radius: 10px;
            align-items: center;
            margin: 0 auto;
            width: 1005px;
            max-width: 95%;
            border: 1px solid #163a70;
        }
        
        header.b2-section-header {
            margin-bottom: 0;
        }
        
        .newmsgimpuestos .fa-exclamation-circle {
            color: #163a70;
        }
        
        @media (max-width: 767px) {
            .newmsgimpuestos {
                line-height: 1;
                font-size: 14px;
            }
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
            var container = document.querySelector('[data-test-id="flight-itinerary"]');
            var toggleSwitchHTML = `<div class="switch-wrapper"><h2 class="switch-title">COTIZAR VUELOS EN:</h2><div class="switch-and-text-container"><span id="toggle1" class="switch-text">ARS</span><div class="switch" id="toggleAR"><label><input type="checkbox" class="switch-input"><span class="slider"></span></label></div><span id="toggle2" class="switch-text">USD</span></div></div>`;

            var toggleSwitchContainer = document.createElement('div');
            toggleSwitchContainer.innerHTML = toggleSwitchHTML;

            container.parentNode.insertBefore(toggleSwitchContainer, container);

            var switchInput = toggleSwitchContainer.querySelector('.switch-input');
            switchInput.addEventListener('click', clickToggle);
        }
    }


    function clickToggle() {
        document.querySelector('[data-test-id="common-culture-selector--c|es-uy"]').click();
    }

    function getCurrentCurrency() {
        var currencyElement = document.querySelector(".flight-currency-select");
        if (currencyElement) {
            return currencyElement.value;
        } else {
            var currencyElementAE = document.querySelector('[data-test-id="sidebar-total-currency"]');
            var currencyAE = currencyElementAE.textContent.trim();

            if (currencyAE === 'CLP' || currencyAE === 'COP' || currencyAE === 'SOL' || currencyAE === 'USD' || currencyAE === 'ARS') {
                return currencyAE;
            } else {
                currencyAE = 'BRL'
                return currencyAE;
            }
        }
    }

    function addMsg() {
        if (!document.querySelector(`.newmsgimpuestos`)) {
            var container = document.querySelector('[data-test-id="flight-container"] .ts-error-parent.ts-flight-error-parent');
            if (container) {
                var mensaje = 'Recordá que para poder cotizar y pagar en USD tendrás que utilizar una tarjeta de crédito habilitada para compras en dólares o tener disponible dólares en tu caja de ahorro.';
                var newElement = document.createElement('div');
                newElement.className = 'newmsgimpuestos';
                newElement.innerHTML = `<i class="fas fa-exclamation-circle notification-icon custom-alert" style="margin-right: 10px;"></i><span>${mensaje}</span>`;
                container.insertAdjacentElement('afterend', newElement);
            }
        }
    }

    var currency = getCurrentCurrency();

    if (culture === 'es-AR' && currency === 'ARS' && bookingData.RouteMarket === 'INTER') {
        addCSS();
        addToggleSwitch();
        addMsg();
        window.eventBus.subscribe({
            name: "newPC",
            callback: function (e) {
                addToggleSwitch();
                addMsg();
            }
        });
    }

}, 600);