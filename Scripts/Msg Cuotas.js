var initNumeroTarjeta = setInterval(function () {
    if (typeof bookingData === "undefined" || typeof window.eventBus === "undefined" || window.location.pathname !== '/V2/Payment') return;
    clearInterval(initNumeroTarjeta);

    const cardPrefixes = ["402917", "404031", "409230", "411763", "421024", "451711", "492115", "498434", "223143", "230570", "230688", "230709", "510541", "511700", "513000", "516656", "517310", "519767", "520053", "527571", "523793", "524123", "525855", "527104", "527571", "527572", "530064", "531071", "531619", "533378", "534150", "536596", "538844", "538849", "546553", "549565", "554630", "554730", "557039", "557935", "559137", "559198", "559975", "585274", "402918", "404031", "409230", "411765", "421024", "451711", "492115", "498435", "223143", "230570", "230688", "230709", "510541", "511700", "513000", "516656", "517310", "519767", "520053", "527572", "523793", "524123", "525855", "527104", "527571", "527572", "530064", "531071", "531619", "533378", "534150", "536596", "538844", "538849", "546553", "549565", "554630", "554730", "557039", "557935", "559137", "559198", "559975", "585274"];

    function getFirstSixDigits() {
        const cardNumberInput = document.querySelector('[data-test-id="payment-card-number--c|MR"]');
        const cardNumber = cardNumberInput.value;
        const firstSixDigits = cardNumber.substring(0, 6);

        return firstSixDigits;
    }

    function shouldUpdateText(firstSixDigits) {
        return cardPrefixes.includes(firstSixDigits);
    }

    function updateInstallmentText(value) {
        const firstSixDigits = getFirstSixDigits();
        if (!shouldUpdateText(firstSixDigits)) return;

        const tryUpdateText = () => {
            const installmentText = document.querySelector('.xml-installment-message');
            if (!installmentText) {
                setTimeout(tryUpdateText, 200);
                return;
            }

            let newText = ''
            switch (value) {
            case '1':
                break;
            case '3':
                newText = 'El importe por cuota será cobrado por mercado pago y no está reflejado en el total a pagar.';
                break;
            case '6':
                newText = 'El importe por cuota será cobrado por mercado pago y no está reflejado en el total a pagar.';
                break;
            case '12':
                newText = 'El importe por cuota será cobrado por mercado pago y no está reflejado en el total a pagar.';
                break;
            default:
            }

            installmentText.textContent = newText;
        };

        tryUpdateText();
    }


    var culture = bookingData.Culture;
    if (culture === 'es-AR') {

     window.eventBus.subscribe({
        name: "numCuotas", 
        callback: function (e) {
            document.querySelectorAll('[data-test-id^="installments-number"]').forEach(function (element) {
            const installmentSelect = element; // No necesitas hacer otro querySelector, ya estás dentro del loop
            if (installmentSelect) {
                updateInstallmentText(installmentSelect.value);
            }
        });
        }
    });

 }
}, 200);

//5316191245678904