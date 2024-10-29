var initNewBreakDownVB = setInterval(function () {
    if (typeof bookingData === "undefined" || (window.location.pathname !== '/V2/Flight' && window.location.pathname !== '/V2/Passengers' && window.location.pathname !== '/V2/Baggage' && window.location.pathname !== '/Seat/Map' && window.location.pathname !== '/V2/Extras' && window.location.pathname !== '/V2/Payment')) return;
    clearInterval(initNewBreakDownVB);

    var postB = bookingData.PostBooking;
    var staff = bookingData.Role;
    var culture = bookingData.Culture;

    function addCSS() {
        var css = `
        @media (max-width: 767px) {

            .rounded-secondary-btn.mobile-seatmap-direction-btn.elevated {
                bottom: 54px;
                padding: 10px;
            }

            .newcontenedorSeatMap {
                padding: 30px;
                background-color: #fff;
                box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.2);
            }

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
                z-index: 997;
                background-color: #fff;
                padding: 9px 15px;
                box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.2);
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

            [data-test-id="sidebar-mobile-opener"] {
                display: none !important;
            }

            .rounded-primary-btn.booking, .rounded-primary-btn.mobile-seatmap-direction-btn, .rounded-primary-btn.locked-btn {
                position: fixed;
                bottom: 5px;
                border-radius: 9999px;
                padding: 10px 20px 15px 20px;
                z-index: 1000;
                width: 43%;
                transform: translateX(127%);
            }

            [data-test-id="passengers-submit-button"]:after, [data-test-id="flight-continue-button"]:after, [data-test-id="baggage-submit-button"]:after, [data-test-id="extras-submit-button"]:after, .mobile-seatmap-direction-btn:after, [data-test-id="payment-submit-payment-button"]:after {
                display: none;
            }

            .rounded-primary-btn.locked-btn[data-test-id="payment-submit-payment-button"] {
                bottom: 20px;
            }

            .mobile-seatmap-button-container {
                z-index: 99999;
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
        }, 500);
    }

    function addHTMLMobile() {
        var body = document.body;
        var existingButton = document.querySelector('#newContinueButtonMobile');

        if (body && !existingButton) {

            var titulo;

            switch (culture) {
            case 'en-US':
                titulo = 'Total price';
                break;
            case 'pt-BR':
                titulo = 'Preço total';
                break;
            default:
                titulo = 'Precio total';
                break;
            }

            var totalPriceElement = document.querySelector('[data-test-id="sidebar-mobile-opener"] .total-currency');
            var totalPrice = totalPriceElement ? totalPriceElement.textContent.trim() : '';
            var textContinue;

            var htmlToInsert = `
            <div class="containerMobile" id="newContinueButtonMobile">
            <div class="price-container" id="newButtonBD">
            <span class="price-text">${titulo}</span>
            <div class="price-row">
            <span class="priceBD">${totalPrice}</span>
            <span class="flechaCustom"></span>
            </div>
            </div>
            </div>`;

            body.insertAdjacentHTML('beforeend', htmlToInsert);

            var newButtonBD = document.querySelector('#newButtonBD');
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
                    updatePrice();
                }
            });
        }   
    }

    function addContenerdorFakeSeatMap() {
        setTimeout(function () {
            var element = document.querySelector('.mobile-seatmap-direction-btn');
            if (element && !document.querySelector('.newcontenedorSeatMap')) {
                var container = document.createElement('div');
                container.classList.add('newcontenedorSeatMap');
                element.parentNode.insertBefore(container, element);
                container.appendChild(element);
            }
        }, 1500);
    }

    function reEditSeatMapCSS() {
        setTimeout(function () {
            var containerMobile = document.querySelector('#newContinueButtonMobile');
            if (containerMobile) {
                if (window.location.pathname.includes('/Seat/Map')) {
                    containerMobile.style.width = '54%';
                    containerMobile.style.boxShadow = 'none';
                }
            }
        }, 1000);
    }

    function verificarURL() {
        addHTMLMobile();
        if (window.location.pathname.includes('/V2/Flight')) {
            var roundTrip = bookingData.Roundtrip;
            var existingButton = document.querySelector('#newContinueButtonMobile');
            var selectedBundles = document.querySelectorAll('.selected-bundle-container');
            var continueFlight = document.querySelector('[data-test-id="flight-continue-button"]');
            if (existingButton && continueFlight) {
                if (roundTrip && selectedBundles.length === 4) {
                    existingButton.style.display = 'flex';
                    continueFlight.style.display = 'flex';
                } else if (!roundTrip && selectedBundles.length === 2) {
                    existingButton.style.display = 'flex';
                    continueFlight.style.display = 'flex';
                } else {
                    existingButton.style.display = 'none';
                    continueFlight.style.display = 'none';
                }
            }
        }
    }

    function paymentEdits() {
        setTimeout(function() {
            if (window.location.pathname.includes('/V2/Payment') && document.querySelector('.containerMobile')) {
                document.querySelector('.containerMobile').style.padding = '9px 15px 23px';
            }
            if (window.location.pathname.includes('/V2/Payment') && document.querySelector('.newcontenedorSeatMap')) {
                document.querySelector('.newcontenedorSeatMap').style.padding = '35px';
            }
        }, 500);
    }

    function esMobile() {
        return window.innerWidth <= 767;
    }

    function moveSeatMapButton() {
        var planeContainer = document.querySelector('.cf-plane-container');
        var button = document.querySelector('.rounded-primary-btn.mobile-seatmap-direction-btn');

        if (planeContainer && button && !button.classList.contains('moved')) {
            planeContainer.parentNode.insertBefore(button, planeContainer);
            button.classList.add('moved');
        }
    }

    function repeatFunction(func, times, interval) {
        let counter = 0;
        const repeatInterval = setInterval(function() {
            func();
            counter++;
            if (counter >= times) {
                clearInterval(repeatInterval);
            }
        }, interval);
    }

    function allFunctions() {
        addCloseButton();
        addHTMLMobile();
        paymentEdits();
        repeatFunction(moveSeatMapButton, 10, 1000);
    }

    if (esMobile() && staff !== 'WWW Staff Travel' && staff !== 'WWW PE Compras Gestor' && postB === false) {
        console.log("'aaa")
        if (window.location.pathname.includes('/V2/Flight')) {
            addCSS();
            verificarURL();
            addCloseButton();
            window.eventBus.subscribe({
                name: "newBDFlightv2",
                callback: function (e) {
                    verificarURL();
                },
            });
        } else {
            addCSS();
            allFunctions();
            window.eventBus.subscribe({
                name: "newBDv2",
                callback: function (e) {
                    allFunctions();
                },
            });
        }
    }

}, 600);