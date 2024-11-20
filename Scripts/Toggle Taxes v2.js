var toggleTaxesv2 = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
    clearInterval(toggleTaxesv2);

    var culture = bookingData.Culture;
    var currency = getCurrentCurrency();
    var currency2 = getCurrentCurrency();
    var role = bookingData.Role;
    var flightData;

    function addCSS() {
        var css = `

        .toggle-containerTax {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            max-width: 95%;
            width: 1005px;
            margin: 15px auto;
        }

        .toggle-containerTax .switchToggle {
            position: relative;
            display: inline-block;
            width: 40px;
            height: 20px;
            margin-right: 10px;
        }

        .toggle-containerTax .switchToggle input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .toggle-containerTax .slider-new {
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

        .toggle-containerTax .slider-new:before {
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

        .toggle-containerTax input:checked + .slider-new {
            background-color: #163a70;
        }

        .toggle-containerTax input:checked + .slider-new:before {
            transform: translateX(20px);
        }

        .toggle-containerTax .toggle-label {
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
            color: #929EB4;
            margin-top: -5px;
            display: block;
        }

        [data-test-id^="flight-club-fee--j"] .toggle-price-label {
            color: #FFD17F;
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

        [data-test-id="bundle-selected-price-currency-sign--j|0"], [data-test-id="bundle-selected-price-currency-sign--j|1"] {
            display: none;
        }

        .selected-flight .toggle-price-label {
            margin-top: -8px;
        }

        .selected-flight [data-test-value="Simple"] .toggle-price-label, .selected-flight [data-test-value="Full"] .toggle-price-label {
            color: #fff;
        }

        @media (max-width: 767px) {

            .tooltip-container {
                margin-left: 5px;
            }

            .toggle-containerTax {
                margin: 15px 20px;
            }

            .toggle-price-label {
                font-size: 12px;
            }

            .selected-bundle-container  .toggle-price-label {
                margin-top: 0;
                position: relative;
                bottom: -19px;
                left: 70%;
            }

            .selected-bundle-container .hidden-sm-up.relative.flex.items-center.justify-between {
                padding-bottom: 0;
            }
        }

        @media (min-width: 768px) and (max-width: 1200px) {

            .selected-bundle-container [data-test-id*="bundle-selected-header--j"] {
                height: 40px;
                padding-left: 0;
            }

            .toggle-price-label {
                font-size: 12px;
            }

            .selected-bundle-container  .toggle-price-label {
                margin-top: -12px;
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

        head.appendChild(style);
    }

    function formatPriceWithCurrency(value, currency) {
        let formattedValue;
        switch (currency) {
            case 'CLP':
                formattedValue = '$ ' + value.toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
                break;
            case 'BRL':
                formattedValue = 'R$ ' + value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                break;
            case 'COP':
                formattedValue = '$ ' + value.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
                break;
            case 'PEN':
                formattedValue = 'S/ ' + value.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace('.', ',');
                break;
            case 'USD':
                formattedValue = '$ ' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', 'x').replace('.', ',').replace('x', '.');
                break;
            case 'ARS':
                formattedValue = '$ ' + value.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                break;
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

    function extractFlightData() {
        const flights = document.querySelectorAll('[data-test-id^="flight-fee-option--j"]');
        const flightDataArray = [];

        flights.forEach(flight => {
            const testId = flight.getAttribute("data-test-id");
            const [direction, flightNumber] = testId.match(/\d+/g).map(Number);
            const type = direction === 0 ? 0 : 1;

            const smartFeeElement = flight.querySelector('[data-test-id^="flight-smart-fee--j"] .text-new-ui-blue');
            const clubFeeElement = flight.querySelector('[data-test-id^="flight-club-fee--j"] .font-bold');
            const dataValue = parseFloat(flight.querySelector('[data-test-id^="flight-smart-fee--j"]').getAttribute("data-value"));

            if (smartFeeElement && clubFeeElement) {
                let smartFee = smartFeeElement.textContent.replace(/[^\d,]/g, '').replace(',', '.');
                let clubFee = clubFeeElement.textContent.replace(/[^\d,]/g, '').replace(',', '.');

                smartFee = parseFloat(smartFee);
                clubFee = parseFloat(clubFee);

                const difference = dataValue - smartFee;

                const smartFeeWithTax = smartFee + difference;
                const clubFeeWithTax = clubFee + difference;

                flightDataArray.push({
                    type: type,
                    flightNumber: flightNumber,
                    smartFee: formatPriceWithCurrency(smartFee, currency),
                    clubFee: formatPriceWithCurrency(clubFee, currency),
                    smartFeeWithTax: formatPriceWithCurrency(smartFeeWithTax, currency),
                    clubFeeWithTax: formatPriceWithCurrency(clubFeeWithTax, currency),
                    dataValue: dataValue,
                    tax: difference,
                });
            }
        });

        return flightDataArray;
    }

    function addToggle() {

        if (document.querySelector('.toggle-containerTax')) {
            return;
        }

        if (!document.querySelector('.toggle-containerTax') && document.querySelector('[data-test-id="flight-itinerary"]')) {
            let text = 'Ver precios con tasas';
            switch (culture) {
                case 'en-US':
                    text = 'See prices with fees';
                    break;
                case 'pt-BR':
                    text = 'Ver preços com taxas';
                    break;
            }

            const toggleHTML = `
            <div class="toggle-containerTax" withtax="no">
            <label class="switchToggle">
            <input type="checkbox" id="toggle">
            <span class="slider-new"></span>
            </label>
            <label for="toggle" class="toggle-label">${text}</label>
            </div>`;

            const flightItineraryElement = document.querySelector('[data-test-id="flight-itinerary"]');
            flightItineraryElement.insertAdjacentHTML('afterend', toggleHTML);

            document.getElementById('toggle').addEventListener('change', (e) => {
                const container = document.querySelector('.toggle-containerTax');
                if (e.target.checked) {
                    container.setAttribute('withtax', 'si');
                } else {
                    container.setAttribute('withtax', 'no');
                }

                updateFlightPrices(e.target.checked);
                updateFlightPrices2(e.target.checked);
            });
        }
    }

    function updateFlightPrices() {
        const toggle = document.querySelector(".toggle-containerTax #toggle");
        if (toggle) {
            var text = 'Precio sin tasas';
            var text2 = 'Precio Total';

            switch (culture) {
                case 'en-US':
                    text = 'Price without taxes';
                    text2 = 'Total Price';
                    break;

                case 'pt-BR':
                    text = 'Preço sem taxas';
                    text2 = 'Preço Total';
                    break;
            }
            flightData.forEach(data => {
                const smartFeeSelector = `[data-test-id="flight-fee-option--j|${data.type}-i|${data.flightNumber}"] [data-test-id^="flight-smart-fee--j"] .text-new-ui-blue`;
                const clubFeeSelector = `[data-test-id="flight-fee-option--j|${data.type}-i|${data.flightNumber}"] [data-test-id^="flight-club-fee--j"] .font-bold`;

                const smartFeeElement = document.querySelector(smartFeeSelector);
                const clubFeeElement = document.querySelector(clubFeeSelector);

                if (smartFeeElement && clubFeeElement) {
                    const priceLabel = toggle.checked ? text2 : text;

                    smartFeeElement.textContent = (toggle.checked ? data.smartFeeWithTax : data.smartFee);
                    clubFeeElement.textContent = (toggle.checked ? data.clubFeeWithTax : data.clubFee);

                    let priceLabelElement = smartFeeElement.nextElementSibling;
                    if (!priceLabelElement || !priceLabelElement.classList.contains('toggle-price-label')) {
                        priceLabelElement = document.createElement('div');
                        priceLabelElement.classList.add('toggle-price-label');
                        smartFeeElement.parentElement.appendChild(priceLabelElement);
                    }

                    priceLabelElement.textContent = priceLabel;

                    priceLabelElement = clubFeeElement.nextElementSibling;
                    if (!priceLabelElement || !priceLabelElement.classList.contains('toggle-price-label')) {
                        priceLabelElement = document.createElement('div');
                        priceLabelElement.classList.add('toggle-price-label');
                        clubFeeElement.parentElement.appendChild(priceLabelElement);
                    }

                    priceLabelElement.textContent = priceLabel;
                }
            });
        }
    }

    function updateFlightPrices2() {
        const toggle = document.querySelector(".toggle-containerTax #toggle");
        if (toggle) {
            let text = 'Precio sin tasas';
            let text2 = 'Precio Total';
    
            switch (culture) {
                case 'en-US':
                    text = 'Price without taxes';
                    text2 = 'Total Price';
                    break;
    
                case 'pt-BR':
                    text = 'Preço sem taxas';
                    text2 = 'Preço Total';
                    break;
            }
    
            const updateFeeElement = (feeElement, mobileElement, tax) => {
                if (!feeElement) return;
    
                let basePrice = parseFloat(feeElement.getAttribute('data-test-value').replace(',', '.'));  // Convertir a número con punto
    
                let finalPrice = basePrice;
    
                if (toggle.checked) {
                    finalPrice += tax;
                }
    
                feeElement.setAttribute('data-with-tax', toggle.checked ? 'yes' : 'no');
    
                // Aplicamos el precio final formateado en feeElement
                feeElement.textContent = formatPriceWithCurrency(finalPrice, currency);
    
                let priceLabelElement = feeElement.nextElementSibling;
                if (!priceLabelElement || !priceLabelElement.classList.contains('toggle-price-label')) {
                    priceLabelElement = document.createElement('div');
                    priceLabelElement.classList.add('toggle-price-label');
                    feeElement.parentElement.appendChild(priceLabelElement);
                }
    
                priceLabelElement.textContent = toggle.checked ? text2 : text;
    
                if (mobileElement) {
                    mobileElement.textContent = formatPriceWithCurrency(finalPrice, currency);  // Insertamos el precio calculado
                    // También puedes actualizar el texto si es necesario
                    let mobilePriceLabel = mobileElement.nextElementSibling.nextElementSibling;
                    if (!mobilePriceLabel || !mobilePriceLabel.classList.contains('toggle-price-label')) {
                        mobilePriceLabel = document.createElement('div');
                        mobilePriceLabel.classList.add('toggle-price-label');
                        mobileElement.parentElement.appendChild(mobilePriceLabel);
                    }
    
                    mobilePriceLabel.textContent = toggle.checked ? text2 : text;
                }
            };
    
            flightData.forEach(data => {
                let smartFeeElement = document.querySelector(`[data-test-id="flight-fee-option--j|${data.type}-i|${data.flightNumber}"] [data-test-id="bundle-selected-price--j|${data.type}"]`);
                let mobile = document.querySelector(`[data-test-id="flight-fee-option--j|${data.type}-i|${data.flightNumber}"] .whitespace-nowrap.text-be-blue`);
    
                if (!smartFeeElement) {
                    var containerVuelo = document.querySelector(`[data-test-id="bundle-selected-per-leg--j|${data.type}"]`);
                    if (containerVuelo) {
                        var flightInfoElement = containerVuelo.querySelector(`[data-test-id="flight-flight-info-content--j|${data.type}-i|${data.flightNumber}"]`);
                    }
                    if (flightInfoElement) {
                        smartFeeElement = containerVuelo.querySelector(`[data-test-id="bundle-selected-price--j|${data.type}"]`);
                        mobile = containerVuelo.querySelector('.whitespace-nowrap.text-be-blue');
                    }
                }
    
                if (!smartFeeElement) {
                    return;
                }
    
                updateFeeElement(smartFeeElement, mobile, data.tax);
            });
        }
    }
    
    function changeCurrency() {
        currency2 = getCurrentCurrency();
        if (currency === currency2) {
            return;
        } else {
            currency = getCurrentCurrency();
            flightData = extractFlightData();
            //console.log(flightData);
        }
    }

    function clickFiltros() {
        const flightOptionElements = document.querySelectorAll('.flight-option-order-opener');

        flightOptionElements.forEach(function (flightOptionElement) {
            flightOptionElement.addEventListener('click', function () {
                updateFlightPrices();
                updateFlightPrices2();
            });
        });
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

        if (document.querySelector('.toggle-label') && !document.querySelector('.tooltip-container')) {
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

            // Cierra tooltip y overlay cuando se hace clic en el link del tooltip
            tooltipLink.addEventListener('click', function (event) {
                event.preventDefault();
                tooltip.classList.add('tooltip-hidden');
                overlay.classList.add('tooltip-hidden');
            });

            // Añadir evento de clic fuera del tooltip
            overlay.addEventListener('click', function (event) {
                // Verificamos si el clic es fuera del tooltip
                if (!tooltip.contains(event.target)) {
                    tooltip.classList.add('tooltip-hidden');
                    overlay.classList.add('tooltip-hidden');
                }
            });

            // Mostrar el tooltip
            showTooltip();
        }
    }

    function addOverlay() {
        if (!document.querySelector('.overlayTooltip')) {
            var overlayHTML = `
            <div class="overlayTooltip">
            </div>`;
            document.body.insertAdjacentHTML('beforeend', overlayHTML);
        }
    }

    function disabledCurrencyChange() {
        const currencyElements = document.querySelectorAll('[data-test-id="sidebar-total-currency"]');
        const selectedFlightElement = document.querySelector('.selected-flight.show-offers');
        
        currencyElements.forEach(currencyElement => {
            if (selectedFlightElement) {
                currencyElement.classList.add('disabled');
            } else {
                currencyElement.classList.remove('disabled');
            }
        });
    }

    function allFunctions() {
        addToggle();
        updateFlightPrices();
        updateFlightPrices2();
        clickFiltros();
        disabledCurrencyChange();
    }

    ///COOKIE SET//
    // Función para obtener el valor de una cookie por su nombre
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    // Función para crear o actualizar una cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Expira en `days` días
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value}; ${expires}; path=/`;
    }

    // Comprobamos si la cookie 'toggleTaxes' existe
    const toggleTaxesCookie = getCookie('toggleTaxesCookie');

    if (!toggleTaxesCookie) {
        setCookie('toggleTaxesCookie', 'true', 30);
    }

    // FIN COOKIE

    if (role === 'WWW Anonymous' && culture !== 'es-PE') {
        flightData = extractFlightData();

        //console.log(flightData);

        addCSS();
        allFunctions();
        if (!toggleTaxesCookie) {
            addOverlay();
            createTooltip();
        }

        window.eventBus.subscribe({
            name: "eventevent",
            callback: function (e) {
                setTimeout(function () {
                    changeCurrency();
                    allFunctions();
                }, 1000);
            }
        });
    }

}, 600);