var toggleTaxes = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
    clearInterval(toggleTaxes);

    var culture = bookingData.Culture;

    function addCSS() {
        var css = `
        .toggle-container {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            max-width: 95%;
            width: 1005px;
            margin: 15px auto;
        }

        .switch {
            position: relative;
            display: inline-block;
            width: 40px;
            height: 20px;
            margin-right: 10px;
        }

        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .slider-new {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            border-radius: 20px;
            transition: 0.4s;
        }

        .slider-new:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 2px;
            bottom: 2px;
            background-color: white;
            border-radius: 50%;
            transition: 0.4s;
        }

        input:checked + .slider-new {
            background-color: #163a70;
        }

        input:checked + .slider-new:before {
            transform: translateX(20px);
        }

        .toggle-label {
            font-size: 16px;
            color: #163a70;
        }

        /* MARGIN EDITS */
        .ts-flight-error-parent .booking-wrapper.no-bottom-margin.ts-error-container {
            margin-top: 0;
        }

        [data-test-id="flight-weekly-selector--j|0"] {
            margin-top: 0 !important;
        }

        .toggle-price-label {
            font-size: 14px;
            color: #163a70;
            margin-top: -5px;
            display: block;
        }

        [data-test-id^="flight-smart-fee--j"]:hover .toggle-price-label, [data-test-id^="flight-club-fee--j|"][data-test-id*="-i|"]:hover .toggle-price-label {
            color: #fff;
        }

        .selected-flight-container .group {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        /* TOOLTIP */

        .tooltip-container {
            position: relative; /* Necesario para la posición del triángulo */
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 315px;
            margin-left: 10px;
        }

        .tooltip-container::before {
            content: '';
            position: absolute;
            top: 50%;
            left: -17px;
            transform: translateY(-50%);
            border-width: 8px;
            border-style: solid;
            border-color: transparent #CCCCCCCC transparent transparent;
            z-index: 99999;
        }

        .tooltip-text {
            font-size: 14px;
            color: #163a70;
            margin-right: 10px;
        }

        .tooltip-link {
            font-size: 14px;
            color: #00AEC7;
            text-decoration: none;
            cursor: pointer;
            display: inline-flex; /* Alinea el texto y el icono en la misma línea */
            align-items: center;
        }

        .tooltip-link i {
            margin-left: 5px; /* Espacio entre el texto y el icono */
            font-size: 14px;
        }

        .tooltip-link:hover {
            text-decoration: underline;
        }

        .tooltip-hidden {
            display: none;
        }

        .overlayTooltip {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.5); 
            z-index: 99998;
        }

        [data-test-id="flight-itinerary"] {
            margin-bottom: 0px;
        }

        @media (max-width: 767px) {
        
            .tooltip-container {
                margin-left: 5px;
            }

            .toggle-container {
                margin: 15px 20px;
            }

            .toggle-price-label {
                font-size: 12px;
            }
        }

        #mainContentFlight .RTloader, #mainContentFlight .rt-loader-overlay, #mainContentFlight .RTloader-container-svg {
            background-color: transparent !important;
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

        head.appendChild(style);
    }

    function addToggle() {
        if (!document.querySelector('.toggle-container') && document.querySelector('[data-test-id="flight-itinerary"]')) {

            text = 'Ver precios con tasas'

            switch (culture) {
                case 'en-US':
                    text = 'See prices with fees';
                    break;
                case 'pt-BR':
                    text = 'Ver preços com taxas';
                    break;
            }

            var toggleHTML = `
            <div class="toggle-container">
                <label class="switch">
                    <input type="checkbox" id="toggle">
                    <span class="slider-new"></span>
                </label>
                <label for="toggle" class="toggle-label">${text}</label>
            </div>`;

            var flightItineraryElement = document.querySelector('[data-test-id="flight-itinerary"]');
            flightItineraryElement.insertAdjacentHTML('afterend', toggleHTML);

            document.getElementById('toggle').addEventListener('change', togglePrices);
        }
    }

    function addPrices(currency) {
        var smartFeeDivs = document.querySelectorAll('[data-test-id^="flight-smart-fee--j"]');

        smartFeeDivs.forEach(function (smartFeeDiv) {
            if (!smartFeeDiv.hasAttribute('sinTAX') && !smartFeeDiv.hasAttribute('conTAX')) {
                var priceElement = smartFeeDiv.querySelector('.text-new-ui-blue');
                var sinTax = priceElement.innerText.trim();
                var rawValue = smartFeeDiv.getAttribute('data-value');
                var withTax = formatPriceWithCurrency(parseFloat(rawValue), currency); // Formatear el precio con la moneda

                smartFeeDiv.setAttribute('sinTAX', sinTax);
                smartFeeDiv.setAttribute('conTAX', withTax);
            }

            smartFeeDiv.querySelector('.text-new-ui-blue').innerText = smartFeeDiv.getAttribute('sinTAX');
        });
    }

    function addPrices2(currency) {
        var smartFeeDivs = document.querySelectorAll('[data-test-id^="flight-club-fee--j"]');

        smartFeeDivs.forEach(function (smartFeeDiv) {
            if (!smartFeeDiv.hasAttribute('sinTAX') && !smartFeeDiv.hasAttribute('conTAX')) {
                var priceElement = smartFeeDiv.querySelector('.font-bold');
                var sinTax = priceElement.innerText.trim();
                var rawValue = smartFeeDiv.getAttribute('data-value');
                var withTax = formatPriceWithCurrency(parseFloat(rawValue), currency); // Formatear el precio con la moneda

                smartFeeDiv.setAttribute('sinTAX', sinTax);
                smartFeeDiv.setAttribute('conTAX', withTax);
            }

            smartFeeDiv.querySelector('.font-bold').innerText = smartFeeDiv.getAttribute('sinTAX');
        });
    }

    function formatPriceWithCurrency(value, currency) {
        let formattedValue;
        switch (currency) {
            case 'CLP':
                formattedValue = '$ ' + value.toLocaleString('es-CL', { minimumFractionDigits: 0 });
                break;
            case 'BRL':
                formattedValue = 'R$ ' + value.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                break;
            case 'COP':
                formattedValue = '$ ' + value.toLocaleString('es-CO', { minimumFractionDigits: 0 });
                break;
            case 'PEN':
                // Aseguramos que los soles (PEN) usen coma como separador decimal
                formattedValue = 'S/ ' + value.toLocaleString('es-PE', { minimumFractionDigits: 2 }).replace('.', ',');
                break;
            case 'USD':
                // Aseguramos que los dólares (USD) usen coma como separador de miles y punto como separador decimal
                formattedValue = '$ ' + value.toLocaleString('en-US', { minimumFractionDigits: 2 }).replace(',', 'x').replace('.', ',').replace('x', '.');
                break;
            case 'ARS':
                formattedValue = '$ ' + value.toLocaleString('es-AR', { minimumFractionDigits: 2 });
                break;
            default:
                formattedValue = '$ ' + value.toLocaleString(undefined, { minimumFractionDigits: 2 });
        }
        return formattedValue;
    }

    function getCurrentCurrency() {
        var currencyElement = document.querySelector(".flight-currency-select");
        if (currencyElement) {
            return currencyElement.value;
        } else {
            var currencyElementAE = document.querySelector('[data-test-id="sidebar-total-currency"]');
            if (currencyElementAE) {
                return currencyElementAE.textContent.trim();
            }
        }
    }

    function togglePrices() {

        var text = 'Precio normal';
        var text2 = 'Precio normal + tasas';

        switch (culture) {
            case 'en-US':
                text = 'Normal price';
                text2 = 'Normal price + fees';
                break;

            case 'pt-BR':
                text = 'Preço normal';
                text2 = 'Preço normal + taxas';
                break;
        }

        var isChecked = document.getElementById('toggle').checked;
        var smartFeeDivs = document.querySelectorAll('[data-test-id^="flight-smart-fee--j"]');
        var clubFeeDivs = document.querySelectorAll('[data-test-id^="flight-club-fee--j"]');

        var toggleContainer = document.querySelector('.toggle-container');
        if (isChecked) {
            toggleContainer.setAttribute('withtax', 'si');
        } else {
            toggleContainer.setAttribute('withtax', 'no');
        }

        smartFeeDivs.forEach(function (smartFeeDiv) {
            var priceElement = smartFeeDiv.querySelector('.text-new-ui-blue');
            var labelElement = smartFeeDiv.querySelector('.toggle-price-label');

            if (isChecked) {
                priceElement.innerText = smartFeeDiv.getAttribute('conTAX');
                if (!labelElement) {
                    labelElement = document.createElement('div');
                    labelElement.className = 'toggle-price-label';
                    smartFeeDiv.appendChild(labelElement);
                }
                labelElement.innerText = text2;
            } else {
                priceElement.innerText = smartFeeDiv.getAttribute('sinTAX');
                if (!labelElement) {
                    labelElement = document.createElement('div');
                    labelElement.className = 'toggle-price-label';
                    smartFeeDiv.appendChild(labelElement);
                }
                labelElement.innerText = text;
            }
        });

        clubFeeDivs.forEach(function (smartFeeDiv) {
            var priceElement = smartFeeDiv.querySelector('.font-bold');
            var labelElement = smartFeeDiv.querySelector('.toggle-price-label');

            if (isChecked) {
                priceElement.innerText = smartFeeDiv.getAttribute('conTAX');
                if (!labelElement) {
                    labelElement = document.createElement('div');
                    labelElement.className = 'toggle-price-label';
                    smartFeeDiv.appendChild(labelElement);
                }
                labelElement.innerText = text2;
            } else {
                priceElement.innerText = smartFeeDiv.getAttribute('sinTAX');
                if (!labelElement) {
                    labelElement = document.createElement('div');
                    labelElement.className = 'toggle-price-label';
                    smartFeeDiv.appendChild(labelElement);
                }
                labelElement.innerText = text;
            }
        });
    }


    function checkAndSetPrices() {

        var text = 'Precio normal';
        var text2 = 'Precio normal + tasas';

        switch (culture) {
            case 'en-US':
                text = 'Normal price';
                text2 = 'Normal price + fees';
                break;

            case 'pt-BR':
                text = 'Preço normal';
                text2 = 'Preço normal + taxas';
                break;
        }

        var toggleContainer = document.querySelector('.toggle-container');
        var isChecked = toggleContainer && toggleContainer.getAttribute('withtax') === 'si';

        var smartFeeDivs = document.querySelectorAll('[data-test-id^="flight-smart-fee--j"]');
        var clubFeeDivs = document.querySelectorAll('[data-test-id^="flight-club-fee--j"]');

        smartFeeDivs.forEach(function (smartFeeDiv) {
            var priceElement = smartFeeDiv.querySelector('.text-new-ui-blue');
            var labelElement = smartFeeDiv.querySelector('.toggle-price-label');

            if (isChecked) {
                priceElement.innerText = smartFeeDiv.getAttribute('conTAX');
                if (!labelElement) {
                    labelElement = document.createElement('div');
                    labelElement.className = 'toggle-price-label';
                    smartFeeDiv.appendChild(labelElement);
                }
                labelElement.innerText = text2;
            } else {
                priceElement.innerText = smartFeeDiv.getAttribute('sinTAX');
                if (!labelElement) {
                    labelElement = document.createElement('div');
                    labelElement.className = 'toggle-price-label';
                    smartFeeDiv.appendChild(labelElement);
                }
                labelElement.innerText = text;
            }
        });

        clubFeeDivs.forEach(function (smartFeeDiv) {
            var priceElement = smartFeeDiv.querySelector('.font-bold');
            var labelElement = smartFeeDiv.querySelector('.toggle-price-label');

            if (isChecked) {
                priceElement.innerText = smartFeeDiv.getAttribute('conTAX');
                if (!labelElement) {
                    labelElement = document.createElement('div');
                    labelElement.className = 'toggle-price-label';
                    smartFeeDiv.appendChild(labelElement);
                }
                labelElement.innerText = text2;
            } else {
                priceElement.innerText = smartFeeDiv.getAttribute('sinTAX');
                if (!labelElement) {
                    labelElement = document.createElement('div');
                    labelElement.className = 'toggle-price-label';
                    smartFeeDiv.appendChild(labelElement);
                }
                labelElement.innerText = text;
            }
        });
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

        firstChange = 1;
    }

    function createTooltip() {
        var text = '¡Hey, conoce nuestros precios SMART <strong>con tasas</strong>!';
        var text2 = '¡Vamos!';

        switch (culture) {
            case 'en-US':
                text = 'Hey, check out our SMART prices <strong>with fees</strong>!'
                text2 = 'Lets go!'
                break;

            case 'pt-BR':
                text = 'Ei, conheça nossos preços SMART <strong>com taxas</strong>!'
                text2 = 'Vamos!';
                break;
        }

        if (document.querySelector('.toggle-label') && !document.querySelector('.tooltip-container') && firstChange == 1) {
            var tooltipHTML = `
            <div class="tooltip-container tooltip-hidden">
                <span class="tooltip-text">${text}</span>
                <a class="tooltip-link" href="#">${text2} <i class="js-icon js-chevron-right"></i></a>
            </div>
        `;

            var toggleLabel = document.querySelector('.toggle-label');
            toggleLabel.insertAdjacentHTML('afterend', tooltipHTML);

            var tooltip = document.querySelector('.tooltip-container');
            var overlay = document.querySelector('.overlayTooltip');
            var tooltipLink = document.querySelector('.tooltip-link');

            function showTooltip() {
                tooltip.classList.remove('tooltip-hidden');
                overlay.classList.remove('tooltip-hidden');
            }

            tooltipLink.addEventListener('click', function (event) {
                event.preventDefault();
                tooltip.classList.add('tooltip-hidden');
                overlay.classList.add('tooltip-hidden');
            });

            showTooltip();
            firstChange = 2;
        }
    }

    function addOverlay() {
        if (!document.querySelector('.overlayTooltip') && firstChange == 0) {
            var overlayHTML = `
            <div class="overlayTooltip">
            </div>`;
            document.body.insertAdjacentHTML('beforeend', overlayHTML);
        }
    }

    function allFuncions(currency) {
        addToggle();
        addPrices(currency);
        addPrices2(currency);
        checkAndSetPrices();
        createTooltip();
    }

    //TODO: HACER TEXTO X CULTURAS Y AGREGAR TEXTO DE PRECIO NORMAL Y PRECIO + TASAS

    var firstChange = 0;
    let currency = getCurrentCurrency();

    if (currency) {
        addCSS();
        addOverlay();
        handleSwitchToggle(currency);
        if (firstChange > 0) {
            window.eventBus.subscribe({
                name: "newBundleAA",
                callback: function (e) {
                    setTimeout(function () {
                        let currency = getCurrentCurrency();
                        allFuncions(currency);
                    }, 1000);
                }
            });
        }
    }

}, 600);