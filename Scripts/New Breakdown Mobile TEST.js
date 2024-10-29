var initNewBreakDown = setInterval(function () {
    if (typeof bookingData === "undefined" || (window.location.pathname !== '/V2/Flight' && window.location.pathname !== '/V2/Passengers' && window.location.pathname !== '/V2/Baggage' && window.location.pathname !== '/Seat/Map' && window.location.pathname !== '/V2/Extras' && window.location.pathname !== '/V2/Payment')) return;
    clearInterval(initNewBreakDown);

    var culture = bookingData.Culture;

    function addCSS() {
        var css = `
        @media (max-width: 767px) {
    .containerMobile {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
        z-index: 9999;
        background-color: #fff;
        padding: 10px 15px;
        box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
    }

    .price-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .price-row {
        display: flex;
        align-items: center;
    }

    .price-text {
        font-size: 14px;
        color: #b2292e;
        font-weight: 600;
        margin-bottom: 5px;
    }

    .priceBD {
        font-size: 22px;
        font-family: Lato, sans-serif;
        font-weight: 700;
        color: #1c355e;
        margin-right: 5px;
    }

    .flechaCustom {
        height: 10px;
        width: 10px;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid #b2292e;
    }

    .button {
        cursor: pointer;
        margin: 0 5px;
        font-weight: 700;
        padding: 10px 35px;
        border-radius: 9999px;
        font-family: Lato, sans-serif;
        border: 2px solid transparent;
        background-color: #b2292e;
        color: #fff;
    }

    .js-footer .footer-end {
        margin-bottom: 5px;
    }

    .rounded-primary-btn.booking,
    .rounded-primary-btn.locked-btn,
    .rounded-primary-btn.mobile-seatmap-direction-btn {
        display: none;
    }

    #iconoCarrito {
        margin-right: 5px;
        font-weight: 700;
    }

    .sidebar-container.ts-sidebar-container.no-plane #newCloseButtonBD {
        align-items: center;
        background: #333;
        border: none;
        border-radius: 50%;
        color: #fff;
        cursor: pointer;
        display: flex;
        font-size: 26px;
        height: 34px;
        justify-content: center;
        line-height: 1;
        padding: 0;
        position: absolute;
        right: -17px;
        top: -10px;
        -moz-user-select: none;
        user-select: none;
        width: 34px;
        z-index: 100;
    }

    .promo-code-header .promo-open-icon, [type=checkbox]+label[for].promo-code-header .promo-open-icon {
        right: 40px;
    }

    [data-test-id="sidebar-mobile-opener"] {
        display: none !important;
    }
}

        `;

        var style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }

    function updatePrice() {
        setTimeout(function () {
            var totalPriceElement = document.querySelector('[data-test-id="sidebar-mobile-opener"] .total-currency');
            var totalPrice = totalPriceElement ? totalPriceElement.textContent.trim() : '';

            var priceBD = document.querySelector('.priceBD');
            if (priceBD) {
                priceBD.textContent = totalPrice;
            }
        }, 2000);
    }

    function addHTMLMobile() {
    var body = document.body;
    var existingButton = document.querySelector('#newContinueButtonMobile');

    if (body && !existingButton) {

        var totalPriceElement = document.querySelector('[data-test-id="sidebar-mobile-opener"] .total-currency');
        var totalPrice = totalPriceElement ? totalPriceElement.textContent.trim() : '';
        var textContinue;

        switch (culture) {
        case 'pt-BR':
            textContinue = 'Continuar';
            break;
        case 'en-US':
            textContinue = 'Continue';
            break;
        default:
            textContinue = 'Continuar';
            break;
        }

        if(window.location.pathname.includes('/V2/Payment')) {
            switch (culture) {
            case 'pt-BR':
                textContinue = 'Pagar agora';
                break;
            case 'en-US':
                textContinue = 'Pay now';
                break;
            default:
                textContinue = 'Pagar ahora';
                break;
            }
        }

        var htmlToInsert = `
        <div class="containerMobile" id="newContinueButtonMobile">
            <div class="price-container">
                <span class="price-text">Precio total</span>
                <div class="price-row">
                    <span class="priceBD">${totalPrice}</span>
                    <span class="flechaCustom"></span>
                </div>
            </div>
            <div class="button" id="newButtonContinue">${textContinue}</div>
        </div>`;

        body.insertAdjacentHTML('beforeend', htmlToInsert);

        var newButtonContinue = document.querySelector('#newButtonContinue');
        newButtonContinue.addEventListener('click', function() {
            var buttons = document.querySelectorAll('.rounded-primary-btn.booking');
            var foundEnabledButton = false;

            for (var i = 0; i < buttons.length; i++) {
                var button = buttons[i];
                if (!button.classList.contains('disabled')) {
                    button.click();
                    foundEnabledButton = true;
                    break;
                }
            }

            if (!foundEnabledButton) {
                var otherButtons = document.querySelectorAll('.rounded-primary-btn.mobile-seatmap-direction-btn');
                if (otherButtons.length > 0) {
                    for (var j = 0; j < otherButtons.length; j++) {
                        otherButtons[j].click();
                    }
                } else {
                    var lockedButtons = document.querySelectorAll('.rounded-primary-btn.locked-btn');
                    for (var k = 0; k < lockedButtons.length; k++) {
                        lockedButtons[k].click();
                    }
                }
            }
        });

        var newButtonBD = document.querySelector('.price-container');
        newButtonBD.addEventListener('click', function() {
            var sidebarOpener = document.querySelector('[data-test-id="sidebar-mobile-opener"]');
            if (sidebarOpener) {
                sidebarOpener.click();
            }
        });
    } else {
        updatePrice();
    }
}

    function addCloseButton() {
        var sidebarContainer = document.querySelector('.sidebar-container.ts-sidebar-container.no-plane');

        if (sidebarContainer) {
            var closeButton = document.createElement('div');
            closeButton.id = 'newCloseButtonBD';
            closeButton.textContent = '×';
            sidebarContainer.appendChild(closeButton);

            closeButton.addEventListener('click', function() {
                var sidebarOpener = document.querySelector('[data-test-id="sidebar-mobile-opener"]');
                if (sidebarOpener) {
                    sidebarOpener.click();
                }
            });
        }   
    }

    function buttonContinueMix() {
        var newButtonContinue = document.querySelector('#newButtonContinue');
        newButtonContinue.addEventListener('click', function() {
            var buttons = document.querySelectorAll('.rounded-primary-btn.booking');
            var foundEnabledButton = false;

            for (var i = 0; i < buttons.length; i++) {
                var button = buttons[i];
                if (!button.classList.contains('disabled')) {
                    button.click();
                    foundEnabledButton = true;
                    break;
                }
            }

            if (!foundEnabledButton) {
                var otherButtons = document.querySelectorAll('.rounded-primary-btn.mobile-seatmap-direction-btn');
                if (otherButtons.length > 0) {
                    for (var j = 0; j < otherButtons.length; j++) {
                        otherButtons[j].click();
                    }
                } else {
                    var lockedButtons = document.querySelectorAll('.rounded-primary-btn.locked-btn');
                    for (var k = 0; k < lockedButtons.length; k++) {
                        lockedButtons[k].click();
                    }
                }
            }
        });
    }

    function verificarURL() {
        addHTMLMobile();
        if (window.location.pathname.includes('/V2/Flight')) {
            var roundTrip = bookingData.Roundtrip;
            var existingButton = document.querySelector('#newContinueButtonMobile');
            var selectedBundles = document.querySelectorAll('.show-offers');

            if (roundTrip && selectedBundles.length === 2) {
                existingButton.style.display = 'flex';
            } else if (!roundTrip && selectedBundles.length === 1) {
                existingButton.style.display = 'flex';
            } else {
                existingButton.style.display = 'none';
            }
        }
    }

    if (window.location.pathname.includes('/V2/Flight')) {
        addCSS();
        verificarURL();
        buttonContinueMix();
        addCloseButton();
        window.eventBus.subscribe({
            name: "newBDFlight",
            callback: function (e) {
                verificarURL();
                buttonContinueMix();
            },
        });
    } else {
        addCSS();
        addCloseButton();
        addHTMLMobile();
        buttonContinueMix();

        window.eventBus.subscribe({
            name: "newBD",
            callback: function (e) {
                addHTMLMobile();
                buttonContinueMix();
            },
        });
    }

}, 600);