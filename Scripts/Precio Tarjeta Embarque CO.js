var initPriceTECO = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/extras') return;
    clearInterval(initPriceTECO);

    var culture = bookingData.Culture;

    function changePriceCO(selector) {
        var warningElement = document.querySelector('[data-test-id="extras-checkin-free-option-warning--j|' + selector + '-p|0"]');

        if (warningElement) {
            var contenidoActual = warningElement.querySelector('span').textContent;
            var nuevoContenido = contenidoActual.replace('$ 25.000 COP', '$ 31.000 COP');

            warningElement.querySelector('span').textContent = nuevoContenido;
        }
    }

    if (culture === 'es-CO') {

        var button0 = document.querySelector('[data-test-id="extras-checkin-passenger-journey--j|0-p|0"]');
        var button1 = document.querySelector('[data-test-id="extras-checkin-passenger-journey--j|1-p|0"]');

        changePriceCO(0);
        changePriceCO(1);

        button0.addEventListener('click', function() {
            changePriceCO(0);
        });

        button1.addEventListener('click', function() {
            changePriceCO(1);
        });
    }
    

}, 600);