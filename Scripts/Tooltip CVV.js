var initTooltipCVV = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Payment') return;
    clearInterval(initTooltipCVV);
    var culture = bookingData.Culture;

    function cambiarTextoTooltipCVV() {
        var tooltipSpan = document.querySelector('.cvv-tooltip-info span');
        if (tooltipSpan) {
            var mensaje;
            switch (culture) {
            case 'en-US':
                mensaje = 'Last 3/4 digits on the back of your card.';
                break;
            case 'pt-BR':
                mensaje = 'Últimos 3/4 dígitos no verso do seu cartão.';
                break;
            default:
                mensaje = 'Últimos 3/4 dígitos en el reverso de su tarjeta.';
                break;
            }
            tooltipSpan.textContent = mensaje;
        }
    }

    var targetNode = document.querySelector('ac-payment-form');

    var config = { attributes: true, childList: true, subtree: true };

    var callback = function(mutationsList, observer) {
        for(let tooltipCVV of mutationsList) {
            if(document.querySelector('[data-test-id*="payment-card-cvv"]')){
                cambiarTextoTooltipCVV();
            }
        }
    };

    var observer = new MutationObserver(callback);

    observer.observe(targetNode, config);

}, 400);