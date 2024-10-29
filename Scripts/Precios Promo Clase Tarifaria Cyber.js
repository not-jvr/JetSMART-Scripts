var initPromoCyberFlight = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
    clearInterval(initPromoCyberFlight);

    //CYBER

    function addCSS() {
        var css = `
    .newOffer {
        align-items: center;
        background-color: #13B7CF;
        border-bottom-right-radius: 8px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        color: #fff;
        display: flex;
        font-size: 14px;
        height: 28px;
        justify-content: center;
        line-height: 1;
        position: absolute;
        left: -22px;
        top: -17px;
        width: 158px;
    }

    .newOffer::after {
        border-color: #008EB9 transparent transparent;
        border-style: solid;
        border-width: 15px 0 0 22px;
        content: "";
        height: 0;
        position: absolute;
        left: 0;
        top: 100%;
        width: 0;
    }
    `;

        var style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }

    function addNewOfferOutbound() {
        var selectedFlights = document.querySelectorAll('[data-test-id="flight-options-list--j|0"] .selected-flight');

        selectedFlights.forEach(function (selectedFlight) {
            var dataValueElement = selectedFlight.querySelector('[data-test-id^="flight-smart-fee--j|0-i|"]');
            var dataValue = dataValueElement?.getAttribute('data-value');
            var offerExists = selectedFlight.querySelector('.newOffer');

            if (fareAmountOutbound && dataValue == fareAmountOutbound && !offerExists) {
                var newHTML = `
            <div class="newOffer">
                PROMO &nbsp;<strong>CYBER</strong>
            </div>
            `;

                selectedFlight.style.border = '1px solid #13B7CF';
                selectedFlight.insertAdjacentHTML('beforeend', newHTML);
            }
        });
    }

    function getFareAmountWithTaxesOutbound() {
        if (!bookingData || !bookingData.AvailableOutboundJourneys) {
            return null;
        }

        for (let journey of bookingData.AvailableOutboundJourneys) {
            if (journey.FareClass === "U") {
                return journey.FareAmountWithTaxes;
            }
        }

        return null;
    }

    function addNewOfferReturn() {
        var selectedFlights = document.querySelectorAll('[data-test-id="flight-options-list--j|1"] .selected-flight');

        selectedFlights.forEach(function (selectedFlight) {
            var dataValueElement = selectedFlight.querySelector('[data-test-id^="flight-smart-fee--j|1-i|"]');
            var dataValue = dataValueElement?.getAttribute('data-value');
            var offerExists = selectedFlight.querySelector('.newOffer');

            if (fareAmountReturn && dataValue == fareAmountReturn && !offerExists) {
                var newHTML = `
            <div class="newOffer">
                PROMO &nbsp;<strong>CYBER</strong>
            </div>
            `;

                selectedFlight.style.border = '1px solid #13B7CF';
                selectedFlight.insertAdjacentHTML('beforeend', newHTML);
            }
        });
    }

    function getFareAmountWithTaxesReturn() {
        if (!bookingData || !bookingData.AvailableReturnJourneys) {
            return null;
        }

        for (let journey of bookingData.AvailableReturnJourneys) {
            if (journey.FareClass === "U") {
                return journey.FareAmountWithTaxes;
            }
        }

        return null;
    }

    function removeOfferOutbound() {
        var selectedFlights = document.querySelectorAll('[data-test-id="flight-options-list--j|0"] .selected-flight');

        selectedFlights.forEach(function (selectedFlight) {
            var offerExists = selectedFlight.querySelector('.newOffer');

            if (offerExists) {
                offerExists.remove();
                selectedFlight.style.border = '1px solid #163a70';
            }
        });
    }

    function removeOfferReturn() {
        var selectedFlights = document.querySelectorAll('[data-test-id="flight-options-list--j|1"] .selected-flight');

        selectedFlights.forEach(function (selectedFlight) {
            var offerExists = selectedFlight.querySelector('.newOffer');

            if (offerExists) {
                offerExists.remove();
                selectedFlight.style.border = '1px solid #163a70';
            }
        });
    }

    function clickReOrderOutbound() {
        var flightOptions = document.querySelectorAll('[data-test-id="flight-options-list--j|0"] .flight-option-order-option');

        flightOptions.forEach(option => {
            option.addEventListener('click', () => {
                removeOfferOutbound();
                setTimeout(function () {
                    addNewOfferOutbound();
                }, 500);
            });
        });
    }

    function clickReOrderReturn() {
        var flightOptions = document.querySelectorAll('[data-test-id="flight-options-list--j|1"] .flight-option-order-option');

        flightOptions.forEach(option => {
            option.addEventListener('click', () => {
                removeOfferReturn();
                setTimeout(function () {
                    addNewOfferReturn();
                }, 500);
            });
        });
    }

    function allFunctions() {
        addNewOfferOutbound();
        addNewOfferReturn();
        clickReOrderOutbound();
        clickReOrderReturn();
    }

    const fareAmountOutbound = getFareAmountWithTaxesOutbound();
    const fareAmountReturn = getFareAmountWithTaxesReturn();

    addCSS();
    allFunctions();

    window.eventBus.subscribe({
        name: "offerPromoCyberFlights", callback: function (e) {
            allFunctions();
        }
    });

}, 600);