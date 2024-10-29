var initCertificadoMedico = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Itinerary') return;
    clearInterval(initCertificadoMedico);

    var culture = bookingData.Culture;

    function addCertificadoMedico(selector, dispositivo) {
        var modificaReserva = document.querySelectorAll(selector)[3];
        var certificadoMedicoId = 'certificadoMedico_' + dispositivo;

        if (modificaReserva && !document.querySelector('#' + certificadoMedicoId)) {
            var primerHTML = '<div class="i2-modify-divider"></div>';
            modificaReserva.insertAdjacentHTML('beforeend', primerHTML);

            var titulo = "Certificado Médico";
            var subtitulo = "Si no puedes viajar por temas médicos, déjanos tu certificado médico aquí.";
            var buttonText = "Enviar certificado médico";
            var PNR = bookingData.PNR;
            var mail = bookingData.Contact.Email;

            var baseUrl = 'https://jetsmart.com/';
            var cultureUrl;
            switch (culture) {
            case 'es-CL':
                cultureUrl = 'cl/es/';
                break;
            case 'es-PE':
                cultureUrl = 'pe/es/';
                break;
            case 'es-AR':
                cultureUrl = 'ar/es/';
                break;
            case 'es-CO':
                cultureUrl = 'co/es/';
                break;
            case 'es-PY':
                cultureUrl = 'py/es/';
                break;
            case 'es-UY':
                cultureUrl = 'uy/es/';
                break;
            case 'es-EC':
                cultureUrl = 'ec/es/';
                break;
            case 'pt-BR':
                cultureUrl = 'br/pt/';
                titulo = "Atestado Médico";
                subtitulo = "Se você não puder viajar por motivos médicos, deixe seu atestado médico aqui.";
                buttonText = "Enviar atestado médico";
                break;
            case 'en-US':
                cultureUrl = 'us/en/';
                titulo = "Medical Certificate";
                subtitulo = "If you cannot travel due to medical reasons, leave your medical certificate here.";
                buttonText = "Submit medical certificate";
                break;
            default:
                cultureUrl = 'cl/es/';
                break;
            }

            var href;
            if (PNR && mail) {
                href = baseUrl + cultureUrl + 'cambios-y-devoluciones?pnr=' + PNR + '&amp;lname=' + mail;
            } else {
                href = baseUrl + cultureUrl + 'cambios-y-devoluciones';
            }

            var segundoHTML = '<div class="flex items-center justify-between flex-col sm:flex-row" id="' + certificadoMedicoId + '">' +
            '<div class="i2-modify-container">' +
            '<div>' + titulo + '</div>' +
            '<div>' + subtitulo + '</div>' +
            '</div>' +
            '<a class="rounded-primary-btn i2-btn i2-btn-blue" href="' + href + '">' +
            buttonText +
            '</a>' +
            '</div>';

            modificaReserva.insertAdjacentHTML('beforeend', segundoHTML);
        }
    }

    addCertificadoMedico('.tab-panel', 'desktop');
    addCertificadoMedico('.i2-accordion-content ', 'mobile');

}, 600);