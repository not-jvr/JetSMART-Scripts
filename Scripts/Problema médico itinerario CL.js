var initCertificadoMedicoCL = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Itinerary') return;
    clearInterval(initCertificadoMedicoCL);

    var culture = bookingData.Culture;

    function addCertificadoMedico(selector, dispositivo) {
        var modificaReserva = document.querySelectorAll(selector)[3];
        var certificadoMedicoId = 'certificadoMedico_CL' + dispositivo;


        if (modificaReserva && !document.querySelector('#' + certificadoMedicoId)) {
            var primerHTML = '<div class="i2-modify-divider"></div>';
            modificaReserva.insertAdjacentHTML('beforeend', primerHTML);

            var PNR = bookingData.PNR;
            var mail = bookingData.Contact.Email;

            var baseUrl = 'https://jetsmart.com/';
            var cultureUrl;

            var href;
            if (PNR && mail) {
                href = 'https://jetsmart.com/cl/es/cambios-y-devoluciones?pnr=' + PNR + '&amp;lname=' + mail;
            } else {
                href = 'https://jetsmart.com/cl/es/cambios-y-devoluciones';
            }

            var segundoHTML = '<div class="flex items-center justify-between flex-col sm:flex-row" id="' + certificadoMedicoId + '">' +
            '<div class="i2-modify-container">' +
            '<div>Cambio por emergencia médica</div>' +
            '<div>Si requieres hacer un cambio por una emergencia médica y tienes certificado médico que lo respalde, ingresa aquí </div>' +
            '</div>' +
            '<a class="rounded-primary-btn i2-btn i2-btn-blue" href="' + href + '">Solicitar cambio</a>' +
            '</div>';

            modificaReserva.insertAdjacentHTML('beforeend', segundoHTML);
        }
    }

    if (culture === 'es-CL') {
        addCertificadoMedico('.tab-panel', 'desktop');
        addCertificadoMedico('.i2-accordion-content ', 'mobile');
    }
    
}, 600);