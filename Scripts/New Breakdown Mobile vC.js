var initNewBreakDownVC = setInterval(function () {
    if (typeof bookingData === "undefined" || (window.location.pathname !== '/V2/Flight' && window.location.pathname !== '/V2/Passengers' && window.location.pathname !== '/V2/Baggage' && window.location.pathname !== '/Seat/Map' && window.location.pathname !== '/V2/Extras' && window.location.pathname !== '/V2/Payment')) return;
    clearInterval(initNewBreakDownVC);

    var postB = bookingData.PostBooking;
    var staff = JetSmart.AppContext.isStaff;
    var culture = bookingData.Culture;

    function addCSS() {
        var css = `
        @media (max-width: 767px) {
            
            .rounded-secondary-btn.mobile-seatmap-direction-btn.elevated {
                bottom: 84px;
                padding: 10px;
            }

            .newcontenedorSeatMap {
                padding: 30px;
                background-color: #fff;
            }

            .containerMobile {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 18px;
                z-index: 999;
                background-color: #fff;
                padding: 10px 15px 45px 15px;
                box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.2);
            }

            .price-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                margin-bottom: 5px;
            }

            .price-row {
                display: flex;
                align-items: center;
            }

            .price-text {
                font-size: 16px;
                color: #b2292e;
                font-weight: 600;
                margin-bottom: 5px;
            }

            .priceBD {
                font-size: 16px;
                font-family: Lato, sans-serif;
                font-weight: 700;
                color: #1c355e;
                margin-right: 5px;
            }

            .flechaCustom {
                height: 5px;
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
                bottom: 5px;
                border-radius: 9999px;
                width: 90%;
                left: 20px;
                padding: 10px 20px 15px 20px;
                z-index: 1000;
                position: fixed;
            }

            [data-test-id="passengers-submit-button"]:after, [data-test-id="flight-continue-button"]:after, [data-test-id="baggage-submit-button"]:after, [data-test-id="extras-submit-button"]:after, .mobile-seatmap-direction-btn:after, [data-test-id="payment-submit-payment-button"]:after {
                display: none;
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
            <div class="price-container">
            <span class="price-text">${titulo}</span>
            <div class="price-row" id="newButtonBD">
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
                    containerMobile.style.padding = '10px 15px 0px 15px';
                    containerMobile.style.bottom = '49px';
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

    function esMobile() {
      return window.innerWidth <= 767;
  }

  if (esMobile() && staff === "False" && postB === false) {
    if (window.location.pathname.includes('/V2/Flight')) {
        addCSS();
        verificarURL();
        addCloseButton();
        window.eventBus.subscribe({
            name: "newBDFlight",
            callback: function (e) {
                verificarURL();
            },
        });
    } else {
        addCSS();
        addCloseButton();
        addHTMLMobile();
        reEditSeatMapCSS();
        addContenerdorFakeSeatMap();
        window.eventBus.subscribe({
            name: "newBD",
            callback: function (e) {
                addHTMLMobile();
                reEditSeatMapCSS();
                addContenerdorFakeSeatMap();
            },
        });
    }
}

}, 600);