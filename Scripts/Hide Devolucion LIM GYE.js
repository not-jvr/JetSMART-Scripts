var hideButtonModal = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Itinerary' || !document.querySelector('.primary-modal')) return;
    clearInterval(hideButtonModal);

    var culture = bookingData.Culture;

    function addCSS() {
        var css = `
        .primary-modal .rounded-primary-btn {
            display: none !important;
        }

        .newTextModal {
            text-align: center;
            font-size: 22px;
            line-height: 1.75rem;
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

    function verificarEstacion() {
        const arrivalOutbound = bookingData.OutboundJourney.ArrivalStationCode;
        const departureOutbound = bookingData.OutboundJourney.DepartureStationCode;

        if (arrivalOutbound === "LIM" || arrivalOutbound === "GYE" ||
            departureOutbound === "LIM" || departureOutbound === "GYE") {
            return true;
        }

        if (bookingData.ReturnJourney) {
            const arrivalReturn = bookingData.ReturnJourney.ArrivalStationCode;
            const departureReturn = bookingData.ReturnJourney.DepartureStationCode;

            if (arrivalReturn === "LIM" || arrivalReturn === "GYE" ||
                departureReturn === "LIM" || departureReturn === "GYE") {
                return true;
            }
        }

        return false;
    }

    function esModalDevolucion() {
        const modal = document.querySelector('.primary-modal-button-container a');
        const buttonText = modal?.innerText.trim();

        return buttonText === "Solicitud de cambio o devolución" ||
            buttonText === "Request for exchange or return" ||
            buttonText === "Pedido de mudança ou reembolso";
    }

    function insertarTextoEnContenedor() {
        const modalButtonContainer = document.querySelector('.primary-modal .primary-modal-button-container');

        if (modalButtonContainer && !document.querySelector('.primary-modal .primary-modal-button-container .newTextModal')) {
            let text = 'Si quieres hacer cambios o solicitar la devolución, haz clic en "Modifica tu reserva".';

            switch (culture) {
                case 'en-US':
                    text = 'If you want to make changes or request a refund, click on "Modify your booking".';
                    break;
                case 'pt-BR':
                    text = 'Se você deseja fazer alterações ou solicitar um reembolso, clique em "Modifique sua reserva".';
                    break;
            }

            modalButtonContainer.insertAdjacentHTML('afterbegin', `<div class="newTextModal">${text}</div>`);
        }
    }

    if (document.querySelector('.primary-modal') && esModalDevolucion()) {
        addCSS();
        insertarTextoEnContenedor();
    }

}, 600);