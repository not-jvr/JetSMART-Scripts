var newPCPrice = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
    clearInterval(newPCPrice);

    var discountIDA = bookingData.AvailableOutboundJourneys[0].PromoCodeDiscountPercent;
    var discountVUELTA = bookingData.Roundtrip ? bookingData.AvailableReturnJourneys[0].PromoCodeDiscountPercent : null;
    var haveDiscountIda = false;
    var haveDiscountVuelta = false;
    var culture = bookingData.Culture;

    if (discountIDA && discountIDA > 0) {
        haveDiscountIda = true;
    }

    if (discountVUELTA && discountVUELTA > 0) {
        haveDiscountVuelta = true;
    }


    function addCSS() {
        var css = `
    .text-new-ui-blue {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .text-new-ui-blue .precio-normal,
    .text-new-ui-blue .precio-original {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
    }

    .text-new-ui-blue .precio-normal {
        font-size: 11px;
        color: #7D93B2;
        position: relative;
        bottom: 5px;
    }

    .text-new-ui-blue .precio-original {
        background-color: #263f6a;
        padding: 0 8px;
        border-radius: 5px;
        color: #ffff;
        display: flex;
        align-items: center;
        position: relative;
        bottom: 12px;
        font-weight: 700;
    }

    [data-test-id^="flight-club-fee--j|"][data-test-id*="-i|"] .font-bold {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    [data-test-id^="flight-club-fee--j|"][data-test-id*="-i|"] .font-bold .precio-normal {
        font-size: 11px;
        color: #7D93B2;
        position: relative;
        bottom: 5px;
    }

    [data-test-id^="flight-club-fee--j|"][data-test-id*="-i|"] .font-bold .precio-original {
        background-color: #FFA400;
        padding: 0 8px;
        border-radius: 5px;
        color: #ffff;
        display: flex;
        align-items: center;
        position: relative;
        bottom: 12px;
        font-weight: 700;
    }

    #newIconoPC {
        width: 22px;
        height: 22px;
        vertical-align: middle;
        margin-left: 5px;
    }

    [data-test-id^="flight-smart-fee--j"]:hover .text-new-ui-blue .precio-normal, [data-test-id^="flight-club-fee--j|"][data-test-id*="-i|"]:hover .font-bold .precio-normal {
        color: #fff;
    }

    @media (max-width: 767px) {

        [data-test-id^="flight-club-fee--j|"][data-test-id*="-i|"] .font-bold .precio-original, .text-new-ui-blue .precio-original {
            bottom: 5px;
        }

        .precio-original {
            font-size: 18px;
        }
    
    }
    `;

        var style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
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

    function formatCurrencyValue(value, currency) {
        switch (currency) {
            case "CLP":
                return "$ " + value.toLocaleString('es-CL', { minimumFractionDigits: 0 });
            case "BRL":
                return "R$ " + value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            case "COP":
                return "$ " + value.toLocaleString('es-CO', { minimumFractionDigits: 0 });
            case "PEN":
                // Cambia 'en-PE' a 'es-PE' para usar la coma
                return "S/ " + value.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            case "USD":
                // Cambia 'en-US' a 'es-AR' para usar la coma
                return "$ " + value.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            case "ARS":
                return "$ " + value.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            default:
                return "" + value;
        }
    }

    function updatePrices(currency) {
        if (currency) {
            var text1 = 'Precio normal';

            switch (culture) {
                case 'en-US':
                    text1 = 'Regular price';
                    break;
                case 'pt-BR':
                    text1 = 'Preço normal';
                    break;
            }

            if (haveDiscountIda) {
                let priceElements = document.querySelectorAll('[data-test-id^="flight-smart-fee--j|0"] .text-new-ui-blue, [data-test-id^="flight-club-fee--j|0"] .font-bold');
                priceElements.forEach((priceElement, index) => {
                    let priceText = priceElement.textContent.trim();

                    if (!priceElement.id.includes('modificado')) {
                        let priceValue;

                        if (currency === "BRL") {
                            priceValue = parseFloat(priceText.replace(/R\$\s?/, '').replace(',', '.'));
                        } else {
                            priceValue = parseFloat(priceText.replace(/[^0-9,-]+/g, '').replace(',', '.'));
                        }

                        // Calcula el nuevo precio sumando el porcentaje de descuento al precio original
                        let additionalAmount = (priceValue * discountIDA) / 100; // Calcula el monto adicional
                        let newPriceValue = priceValue + additionalAmount; // Aplica el incremento del descuento
                        let formattedPrice = formatCurrencyValue(newPriceValue, currency);
                        let originalFormattedPrice = formatCurrencyValue(priceValue, currency);

                        priceElement.innerHTML = `
                        <div class="precio-normal">${text1}&nbsp;<span style="text-decoration: line-through;">${formattedPrice}</span></div>
                        <div class="precio-original">${originalFormattedPrice} <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/f5b249fe-122d-468c-bb23-b87819ce067d/%25descuento.png" id="newIconoPC"></div>
                    `;
                        priceElement.id = `modificado-${index}`;
                    }
                });
            }


            if (haveDiscountVuelta) {
                let priceElements = document.querySelectorAll('[data-test-id^="flight-smart-fee--j|1"] .text-new-ui-blue, [data-test-id^="flight-club-fee--j|1"] .font-bold');
                priceElements.forEach((priceElement, index) => {
                    let priceText = priceElement.textContent.trim();

                    if (!priceElement.id.includes('modificado')) {
                        let priceValue;

                        if (currency === "BRL") {
                            priceValue = parseFloat(priceText.replace(/R\$\s?/, '').replace(',', '.'));
                        } else {
                            priceValue = parseFloat(priceText.replace(/[^0-9,-]+/g, '').replace(',', '.'));
                        }

                        // Calcula el nuevo precio sumando el porcentaje de descuento al precio original
                        let additionalAmount = (priceValue * discountVUELTA) / 100; // Calcula el monto adicional
                        let newPriceValue = priceValue + additionalAmount; // Aplica el incremento del descuento
                        let formattedPrice = formatCurrencyValue(newPriceValue, currency);
                        let originalFormattedPrice = formatCurrencyValue(priceValue, currency);

                        priceElement.innerHTML = `
                    <div class="precio-normal">${text1}&nbsp;<span style="text-decoration: line-through;">${formattedPrice}</span></div>
                    <div class="precio-original">${originalFormattedPrice} <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/f5b249fe-122d-468c-bb23-b87819ce067d/%25descuento.png" id="newIconoPC"></div>
                `;
                        priceElement.id = `modificado-${index}`;
                    }
                });
            }
        }
    }

    if (haveDiscountIda || haveDiscountVuelta) {
        addCSS();
        let currency = getCurrentCurrency();
        updatePrices(currency);
        window.eventBus.subscribe({
            name: "newPC",
            callback: function (e) {
                setTimeout(function () {
                    let currency = getCurrentCurrency();
                    console.log(currency);
                    updatePrices(currency);
                }, 1000);
            }
        });
    }

}, 600);