var newDesignFlexi = setInterval(function () {
    if (typeof bookingData == "undefined" || window.location.pathname !== '/V2/Extras' || !document.querySelector(".ts-flexi-fee")) return;
    clearInterval(newDesignFlexi);

    var culture = bookingData.Culture;
    var staff = bookingData.Role;
    var roundTrip = bookingData.Roundtrip;

    function addCSS() {
        var imageLink = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/3d26c9ed-a799-438d-975e-e4e68529b9f4/Flexi%20Banner%20ES.png';
        var imageLinkMobile = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/9db9bc5f-cc10-4195-87e6-f6a2dd48f4a2/Flexi%20Banner%20ES%20Mobile.png';
        switch (culture) {
            case 'en-US':
                imageLink = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/8e9571f6-0370-4686-8cdd-760e51301959/Flexi%20Banner%20EN.png';
                imageLinkMobile = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/f69b05e0-3604-40d9-9eaf-8bac4c8507d8/Flexi%20Banner%20EN%20Mobile.png';
                break;
            case 'pt-BR':
                imageLink = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/80cf3461-b8fd-419c-86cd-aafbce09a63f/Flexi%20Banner%20PT.png';
                imageLinkMobile = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/8970aed0-2b62-4f99-8c17-e72931437954/Flexi%20Banner%20PT%20Mobile.png';
                break;
        }
        var css = `

        [data-test-id="extras-flexi-fee-container"] {
            background-image: url('${imageLink}');
            background-size: contain;
            background-position: top center;
            background-repeat: no-repeat;
            padding-top: 168px;
        }

        [data-test-id="extras-flexi-fee-container"] header, [data-test-id="extras-flexi-fee-container"] .extra-in-bundle-info {
            display: none !important;
        }


        /* CLASE Q SE AGREGA CUANDO ES LIGERO + ALGO PARA OCULTAR EL BOTON Y ORDENAR EL TEXTO CENTRADO */

        .containerCentrado {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        [data-test-id="extras-flexi-fee-container"] .btn-boarding.disabled.selected {
            display: none;
        }

        /* FIN EDIT CUANDO ES BUNDLE LIGERO + ALGO */

        /* NEW MSG MEZCLA LIGERO + OTRO BUNDLE */

        .newMessage {
            padding: 10px;
            background-color: #1c355e;
            text-align: center;
            border-radius: 11px;
            font-size: 16px;
            font-weight: 600;
            color: #fff;
            margin: 0 15px 15px;
        }

         .newMessage img {
            width: 95px;
            vertical-align: middle;
            position: relative;
            bottom: 2px;
        }

        .newMessage .js-icon {
            font-weight: 600;
            position: relative;
            top: 2px;
            margin-right: 8px;
        }

        .newMessage#bundleSmart .js-icon, .newMessage#bundleFull .js-icon {
            color: #fff;
        }

        .newMessage#bundleLigero {
            background-color: #fff;
            color: #1c355e;
            border: 1px solid #1c355e;
        }

        /* FIN NEW MSG MEZCLA LIGERO + OTRO BUNDLE */

        .info-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px;
            border-bottom: 1px solid #ddd;
            cursor: pointer;
        }

        .info-item .text-container {
            flex-grow: 1;
            margin-left: 10px;
            color: #163a70;
            font-weight: 700;
        }

        .info-item .arrow {
            transition: transform 0.3s ease;
        }

        .info-details {
            display: none;
            padding: 10px 15px;
            background-color: #f9f9f9;
            color: #163a70;
        }

        .info-item.expanded + .info-details {
            display: block;
        }
        
        [data-test-id="extras-flexi-fee-container"] .js-icon {
            color: #163a70;
        }

        /* EDIT BOTONES */

        [data-test-id="extras-flexi-fee-container"] .filled-column, [data-test-id="extras-flexi-fee-container"] .inner-box.upper-half, [data-test-id="extras-flexi-fee-container"] [data-test-id="extras-flexi-fee-journey--j|0"], [data-test-id="extras-flexi-fee-container"] [data-test-id="extras-flexi-fee-journey--j|1"] {
            background-color: #fff;
        }
        
        [data-test-id="extras-flexi-fee-container"] .inner-border-box {
            border: 1px solid #00AEC7;
        }

        [data-test-id="extras-flexi-fee-container"] .btn-boarding {
            background: #00AEC7;
            height: 35px;
            border-radius: 999px;
        }

        [data-test-id="extras-flexi-fee-container"] .btn-boarding:hover {
            color: #00AEC7;
            background-color: transparent;
            border-color: #00AEC7;
        }

        [data-test-id="extras-flexi-fee-container"] .btn-boarding.selected {
            color: #00AEC7;
            background-color: transparent;
            border-color: #00AEC7;
        }

        [data-test-id="extras-flexi-fee-container"] .btn-boarding.selected:hover {
            color: #fff;
            background-color: #00AEC7;
            border-color: #00AEC7;
        }

        [data-test-id="extras-flexi-fee-container"] .filled-column .package-title, ac-flexi-fee .package-title.visible-xs, [data-test-id="extras-flexi-fee-container"] .row.hidden-xs .package-title {
            display: none !important;
        }

        [data-test-id="extras-flexi-fee-container"] .inner-border-box .package-title {
            font-size: 14px;
            margin-bottom: 0px;
            padding: 0;
            text-align: center;
        }

        [data-test-id="extras-flexi-fee-container"] .extras-binary-name {
            height: auto;
            font-size: 18px;
            margin-bottom: 10px;
            color: #00AEC7;
            font-weight: 700;
            text-align: center;
            display: block;
            line-height: 1;
        }

        [data-test-id="extras-flexi-fee-container"] .inner-border-box .row {
            display: flex;
            align-items: center;
        }

        [data-test-id="extras-flexi-fee-container"] .row.containerCentrado .extras-binary-name {
            color: #163a70;
        }

        @media (min-width: 768px) and (max-width: 825px) {

            [data-test-id="extras-flexi-fee-container"] {
                padding-top: 100px;
            }
        
        }

        @media (min-width: 826px) and (max-width: 1023px) {
            [data-test-id="extras-flexi-fee-container"] {
                padding-top: 138px;
            }
        }

        @media (max-width: 767px) {

        [data-test-id="extras-flexi-fee-container"] {
            background-image: url('${imageLinkMobile}');
            padding-top: 160px;
        }

        [data-test-id="extras-flexi-fee-container"] .newContainerFlexi {
            margin-bottom: 20px;
        }
        
        }
    `,
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');
        head.appendChild(style);
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    }

    function isLigeroMix() {
        if (roundTrip) {
            var outboundBundle = bookingData.OutboundBundleCode;
            var returnBundle = bookingData.ReturnBundleCode;
            if (outboundBundle === null || returnBundle === null) {
                if (outboundBundle !== null || returnBundle !== null) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    function addHTML() {
        if (document.querySelector('[data-test-id="extras-flexi-fee-container"] header') && !document.querySelector('.newContainerFlexi')) {
            var text1 = 'Cambios ilimitados de fecha, hora o destino por un año';
            var subtext1 = 'Modifica tu itinerario tantas veces como lo necesites durante 12 meses desde la fecha de compra del vuelo.';
            var text2 = 'Sin pagar penalización por tus modificaciones';
            var subtext2 = 'Realiza todos los cambios sin preocuparte por costos adicionales, solo cubriendo la diferencia tarifaria si es que aplica.';
            var text3 = 'Se aplica a todos los pasajeros de la reserva';
            var subtext3 = 'Disfruta de la flexibilidad para todos los pasajeros incluidos en la compra.';

            switch (culture) {
                case 'en-US':
                    text1 = 'Unlimited changes to date, time, or destination for one year';
                    subtext1 = 'Modify your itinerary as many times as needed within 12 months from the purchase date of your flight.';
                    text2 = 'No penalty fees for your changes';
                    subtext2 = 'Make all adjustments without worrying about extra costs, only covering any fare difference if applicable.';
                    text3 = 'Applies to all passengers in the booking';
                    subtext3 = 'Enjoy flexibility for all passengers included in the purchase.';
                    break;
                case 'pt-BR':
                    text1 = 'Mudanças ilimitadas de data, hora ou destino por um ano';
                    subtext1 = 'Modifique seu itinerário quantas vezes precisar durante 12 meses a partir da data de compra do voo.';
                    text2 = 'Sem custos adicionais por penalidade';
                    subtext2 = 'Faça todas as alterações sem se preocupar com taxas extras, cobrindo apenas a diferença tarifária, se aplicável.';
                    text3 = 'Aplicável a todos os passageiros da reserva';
                    subtext3 = 'Desfrute da flexibilidade para todos os passageiros incluídos na compra.';
                    break;
            }
            var headerElement = document.querySelector('[data-test-id="extras-flexi-fee-container"] header');

            var newHTML = `
            <div class="newContainerFlexi">
                <div class="info-item">
                    <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/7ced9478-06eb-4133-aea9-01e0c819202a/icon1.png" alt="Icon 1">
                    <div class="text-container">${text1}</div>
                    <i class="js-icon js-chevron-right promo-open-icon icon-flexi arrow" style=""></i>
                </div>
                <div class="info-details">${subtext1}</div>
    
                <div class="info-item">
                    <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/2a341309-fe70-49b9-8a50-9c240734fdf4/icon2.png" alt="Icon 2">
                    <div class="text-container">${text2}</div>
                    <i class="js-icon js-chevron-right promo-open-icon icon-flexi arrow" style=""></i>
                </div>
                <div class="info-details">${subtext2}</div>
    
                <div class="info-item">
                    <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/3a5bf4e5-9a82-4769-be8b-eb4240f1367c/icon3.png" alt="Icon 3">
                    <div class="text-container">${text3}</div>
                    <i class="js-icon js-chevron-right promo-open-icon icon-flexi arrow" style=""></i>
                </div>
                <div class="info-details">${subtext3}</div>
            </div>
            `;

            headerElement.insertAdjacentHTML('afterend', newHTML);

            document.querySelectorAll('.info-item').forEach(item => {
                item.addEventListener('click', function () {
                    toggleDetails(this);
                });
            });
        }
    }

    function editsHTMLButtons() {
        var packageTitles = document.querySelectorAll('[data-test-id="extras-flexi-fee-container"] .package-title');
        var innerBorderBoxes = document.querySelectorAll('[data-test-id="extras-flexi-fee-container"] .inner-border-box');
        var length = Math.min(packageTitles.length, innerBorderBoxes.length);

        function titleExists(existingTitles, packageTitleHTML) {
            return Array.from(existingTitles).some(existingTitle => existingTitle.innerHTML === packageTitleHTML);
        }

        for (let i = 0; i < length; i++) {
            var packageTitle = packageTitles[i];
            var innerBorderBox = innerBorderBoxes[i];

            var extrasBinaryName = innerBorderBox.querySelector('.extras-binary-name');
            var existingTitles = innerBorderBox.querySelectorAll('.package-title');
            var packageTitleHTML = packageTitle.innerHTML;

            if (!titleExists(existingTitles, packageTitleHTML)) {
                var newTitle = document.createElement('h3');
                newTitle.className = 'package-title';
                newTitle.innerHTML = packageTitleHTML;

                extrasBinaryName.insertAdjacentElement('afterend', newTitle);
            }
        }
    }

    function changePriceTitle() {
        var elements = document.querySelectorAll('[data-test-id="extras-flexi-fee-container"] .row .extras-binary-name');

        elements.forEach(element => {
            var originalText = element.textContent;
            var parentContainer = element.closest('.row');

            var text;
            var text2;

            if (parentContainer && parentContainer.classList.contains('containerCentrado')) {
                switch (culture) {
                    case "pt-BR":
                        text2 = 'Você já tem flexibilidade neste trecho!';
                        break;
                    case "en-US":
                        text2 = 'You already have flexibility on this leg!';
                        break;
                    default:
                        text2 = '¡Ya tienes flexibilidad en este tramo!';
                }
                element.textContent = text2;
            } else {
                switch (culture) {
                    case "pt-BR":
                        text = 'Eu quero flexibilidade por apenas ';
                        break;
                    case "en-US":
                        text = 'I want flexibility for only ';
                        break;
                    default:
                        text = '¡Quiero flexibilidad solo por ';
                }

                var priceMatch = originalText.match(/(R\$|[$]|S\/)[\s]*[\d.,]+/);

                if (priceMatch) {
                    var price = priceMatch[0];
                    element.textContent = text + price + '!';
                } else {
                    console.warn('No se encontró un precio válido en el texto original:', originalText);
                }
            }
        });
    }

    function modificarContainerBundleMixto() {
        document.querySelectorAll('[data-test-id="extras-flexi-fee-container"] .btn-boarding').forEach(function (button) {
            if (button.classList.contains('selected') && button.classList.contains('disabled')) {
                button.style.display = 'none';

                var row = button.closest('.row');

                if (!row.classList.contains('containerCentrado')) {
                    row.classList.add('containerCentrado');
                }
            }
        });
    }

    function addNewMessage() {
        document.querySelectorAll('[data-test-id="extras-flexi-fee-container"] ac-flexi-fee').forEach((element, index) => {
            var messageExists = element.querySelector('.newMessage');
            var outboundBundle = bookingData.OutboundBundleCode;
            var returnBundle = bookingData.ReturnBundleCode;
            var bundleCode = index === 0 ? outboundBundle : returnBundle;
            var imageSrc = '';
            var messageId = '';
            var text = 'Con ';

            if (culture === 'en-US') {
                text = 'With '
            } else if (culture === 'pt-BR') {
                text = 'Com '
            }

            var text2 = '';

            if (bundleCode === null) {
                imageSrc = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/b87b4c2c-2164-4baa-8a1f-edfdd9d7dd92/Vuela%20ligero.png';
                messageId = 'bundleLigero';
                text2 = ' este opcional no está incluido.';

                if (culture === 'en-US') {
                    imageSrc = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/563cdf31-1fd3-44cc-a525-b0c40730e653/Vuela%20ligero%20%282%29.png';
                    text2 = ' this optional is not included.'
                } else if (culture === 'pt-BR') {
                    imageSrc = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/bb24fc98-ccd9-4f16-9dbb-be823ec823dd/Vuela%20ligero%20%281%29.png';
                    text2 = ' este opcional não está incluído.'
                }

            } else if (bundleCode.includes('1')) {
                imageSrc = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/a8126a25-2153-4a82-b4f2-064707fa8523/bundle-smart-baggage.svg';
                messageId = 'bundleSmart';
                text2 = ' este opcional está incluido.';

                if (culture === 'en-US') {
                    text2 = ' this optional is included.'
                } else if (culture === 'pt-BR') {
                    text2 = ' este opcional está incluído.'
                }

            } else if (bundleCode.includes('2')) {
                imageSrc = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/d9b344ca-89fd-43fb-ad91-af055ec40da3/bundle-full-baggage.svg';
                messageId = 'bundleFull';
                text2 = ' este opcional está incluido.';

                if (culture === 'en-US') {
                    text2 = ' this optional is included.'
                } else if (culture === 'pt-BR') {
                    text2 = ' este opcional está incluído.'
                }
            }

            if (!messageExists) {
                var customHtml = `
                    <div class="newMessage" id="${messageId}">
                        <i class="js-icon js-broken-circle-exclamation"></i>
                        ${text}<img src="${imageSrc}">
                        ${text2}
                    </div>
                `;

                var innerBox = element.querySelector('.inner-border-box');
                innerBox.insertAdjacentHTML('beforebegin', customHtml);
            }
        });
    }

    function allFuctions() {
        if (isLigeroMix()) {
            modificarContainerBundleMixto();
            addNewMessage();
        }
        addHTML();
        editsHTMLButtons();
        changePriceTitle();
    }

    function toggleDetails(item) {
        item.classList.toggle('expanded');
        const arrow = item.querySelector('.arrow');

        if (item.classList.contains('expanded')) {
            arrow.style.transform = 'rotate(-90deg)';
        } else {
            arrow.style.transform = 'rotate(90deg)';
        }
    }

    if (staff !== 'WWW Staff Travel') {
        addCSS();
        allFuctions();
        window.eventBus.subscribe({
            name: "newFlexiDesign",
            callback: function (e) {
                allFuctions();
            }
        });
    }

}, 700);