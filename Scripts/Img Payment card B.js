var imagenTarjeta1B = setInterval(function(){
    if(typeof bookingData === "undefined" || window.location.pathname !== '/V2/Payment') return;
    clearInterval(imagenTarjeta1B);
    var culture = bookingData.Culture;
    if(culture === 'es-CO'){
        const debitCardImg = document.querySelector('.payment-card-img[data-test-id="payment-method-selector-icon--c|WW"]');
        const creditCardImg = document.querySelector('.payment-card-img[data-test-id="payment-method-selector-icon--c|WorldPay"]');
        if(debitCardImg){
            debitCardImg.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/10e91b91-9ef6-47aa-bc16-5f611966d87b/Tarjeta%20de%20D%C3%A9bito_%20V2.png';
        }
        if(creditCardImg){
            creditCardImg.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/7cfaca55-e9e9-4b71-80ba-df8daa5b837a/Tarjeta%20de%20Cr%C3%A9dito_%20V2.png';
        }
    }
}, 500);

var imagenTarjeta2B = setInterval(function(){
    if(typeof bookingData === "undefined" || window.location.pathname !== '/V2/Payment') return;
    var culture = bookingData.Culture;
    if(culture === 'es-CO'){
        window.eventBus.subscribe({name: "SidebarReloaded", callback: function(e){
            const countryButtons = document.querySelectorAll('.mdl-textfield__input.js-input.js-select[data-test-id="payment-card-issuer-country"], [data-test-id="payment-non-chile-link"]');
            const buttonClick = function () {
                const debitCardImg = document.querySelector('.payment-card-img[data-test-id="payment-method-selector-icon--c|WW"]');
                const creditCardImg = document.querySelector('.payment-card-img[data-test-id="payment-method-selector-icon--c|WorldPay"]');
                if(debitCardImg){
                    debitCardImg.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/10e91b91-9ef6-47aa-bc16-5f611966d87b/Tarjeta%20de%20D%C3%A9bito_%20V2.png';
                }
                if(creditCardImg){
                    creditCardImg.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/7cfaca55-e9e9-4b71-80ba-df8daa5b837a/Tarjeta%20de%20Cr%C3%A9dito_%20V2.png';
                }

            };
            countryButtons.forEach(button => button.addEventListener('click', buttonClick));
        }});
    }
}, 800);


