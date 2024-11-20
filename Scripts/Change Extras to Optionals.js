var changeExtrasText = setInterval(function () {
    if (typeof bookingData === "undefined" || (window.location.pathname !== '/V2/Flight' && window.location.pathname !== '/V2/Baggage' && window.location.pathname !== '/Seat/Map' && window.location.pathname !== '/V2/Extras' && window.location.pathname !== '/V2/Passengers' && window.location.pathname !== '/V2/Payment')) return;
    clearInterval(changeExtrasText);

    var culture = bookingData.Culture;

    function changeText() {
        var elements = document.querySelectorAll('.relative.h-16.overflow-hidden .whitespace-nowrap.font-body.font-bold');

        var text = 'Opcionales';

        switch (culture) {
            case 'en-US':
                text = 'Optionals';
                break;
            case 'pt-BR':
                text = 'Opcionais';
                break;
        }

        elements.forEach((element) => {
            var spans = element.querySelectorAll('span');

            spans.forEach((span) => {
                if (span.textContent.trim() === 'Extras') {
                    span.textContent = text;
                }
            });
        });
    }

    changeText();

}, 600);