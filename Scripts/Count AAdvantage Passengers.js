// Temmplate Evento Click
var countAAdvantagePassengers = setInterval(function () { // Event - clicks_highlights_home
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Payment') return;
    clearInterval(countAAdvantagePassengers);

    function getDeviceType() {
        const userAgent = navigator.userAgent;

        if (
            userAgent.includes('Android') ||
            userAgent.includes('webOS') ||
            userAgent.includes('iPhone') ||
            userAgent.includes('iPad') ||
            userAgent.includes('iPod') ||
            userAgent.includes('BlackBerry') ||
            userAgent.includes('IEMobile') ||
            userAgent.includes('Opera Mini')
        ) {
            return 'mobile';
        } else if (userAgent.includes('Tablet') || userAgent.includes('iPad')) {
            return 'tablet';
        } else {
            return 'desktop';
        }
    }

    let culture = bookingData.Culture;
    let device = getDeviceType();

    function esValorValidoAAdvantage() {
        var inputContainers = document.querySelectorAll('#AAdvantageInput');
        var countValidos = 0; // Contador de valores válidos

        inputContainers.forEach(container => {
            var inputElement = container.querySelector('input');
            var tieneValor = inputElement && inputElement.value.trim() !== '';
            var mensajeError = container.querySelector('[data-test-id="common-form-field-error"]');
            var noHayError = !mensajeError || mensajeError.textContent.trim() === '';

            if (tieneValor && noHayError) {
                countValidos++; // Incrementa el contador si es válido
            }
        });

        return countValidos; // Retorna el número de valores válidos
    }

    var count = esValorValidoAAdvantage();

    if (count > 0) {
        utag.link({
            'tealium_event': 'count_AA_Passengers', // Nombre del evento
            'device': device, // Dispositivo
            'culture': culture, // Cultura
            'numAA': count // Número de valores válidos
        });
    }
}, 600);