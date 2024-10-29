var initNewBreakDownVA = setInterval(function () {
    if (typeof bookingData === "undefined" || (window.location.pathname !== '/V2/Flight' && window.location.pathname !== '/V2/Passengers' && window.location.pathname !== '/V2/Baggage' && window.location.pathname !== '/Seat/Map' && window.location.pathname !== '/V2/Extras' && window.location.pathname !== '/V2/Payment')) return;
    clearInterval(initNewBreakDownVA);

    var postB = bookingData.PostBooking;
    var staff = JetSmart.AppContext.isStaff;

    function addCSS() {
        var css = `
        @media (max-width: 767px) {

            .rounded-secondary-btn.mobile-seatmap-direction-btn.elevated {
                bottom: 94px;
                padding: 7px;
            }

            .containerMobile {
                position: fixed;
                bottom: 0;
                left: -11px;
                width: 102%;
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 18px;
                z-index: 9999;
                background-color: #fff;
            }

            .button {
                cursor: pointer;
                margin: 5px;
                font-weight: 700;
                padding: 10px 35px;
                border-radius: 9999px;
                font-family: Lato, sans-serif;
                border: 2px solid transparent;
                width: 89%;
            }

            #newButtonBD {
                color: #b2292e;
                background-color: #fff;
                border-color: #b2292e;
            }

            .js-footer .footer-end {
                margin-bottom: 5px;
            }

            .priceBD {
                font-size: 18px;
                font-family: Lato, sans-serif;
                font-weight: 700;
            }

            .flechaCustom {
                position: relative;
                bottom: -18px;
                left: 5px;
                height: 0;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-top: 10px solid #b2292e;
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

            [data-test-id="sidebar-mobile-opener"] {
                display: none !important;
            }

            .rounded-primary-btn.booking, .rounded-primary-btn.mobile-seatmap-direction-btn, .rounded-primary-btn.locked-btn {
                bottom: 50px;
                border-radius: 9999px;
                width: 91%;
                left: 11px;
                padding: 10px 20px 15px 20px;
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

            var totalPriceElement = document.querySelector('[data-test-id="sidebar-mobile-opener"] .total-currency');
            var totalPrice = totalPriceElement ? totalPriceElement.textContent.trim() : '';
            var textContinue;

            var htmlToInsert = `
            <div class="containerMobile" id="newContinueButtonMobile">
            <div class="button" id="newButtonBD">
            <i class="js-icon js-trolley" id="iconoCarrito"></i>
            <span class="priceBD">$ 51.480</span>
            <span class="flechaCustom"></span>
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
        window.eventBus.subscribe({
            name: "newBD",
            callback: function (e) {
                addHTMLMobile();
            },
        });
    }
}

}, 600);