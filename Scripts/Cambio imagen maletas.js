var initCambioImagenMaleta = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Baggage') return;
    clearInterval(initCambioImagenMaleta);
    var culture = bookingData.Culture;
    const Mochila = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/d7f6a4c8-279c-4e57-b57b-b2ef07306e4b/Mochila%20%282%29.png'
    const MaletaMochila = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/1efad24c-3f80-458c-ab70-5a2e459fe4c6/Mochila%2Bequipaje%20de%20mano.png'
    const SinMaleta = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/52c89132-8d90-42df-b04a-753f47dae493/No%20equipaje%20facturado.png'
    const Maleta = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/79dbe5ad-d743-4dd2-bd38-ecfbf570af49/Equipaje%20facturado.png'
    if (culture) {
        ///PC///
        if (window.innerWidth > 768) {
            const imgMochila = document.querySelector('.b2-backpack-img');
            imgMochila.src = Mochila
            const imgMaletaMochila = document.querySelector('.b2-backpack-and-large-cabin-bag-img');
            imgMaletaMochila.src = MaletaMochila
            const imgSinMaleta = document.querySelector('.b2-without-checked-baggage-img');
            imgSinMaleta.src = SinMaleta
            const imgMaleta = document.querySelector('.b2-checked-baggage-img');
            imgMaleta.src = Maleta
        }
        ///MOBILE///
        if (window.innerWidth <= 768) {
            document.querySelector("ac-per-booking-mobile .b2-backpack-img").src = Mochila
            document.querySelector("ac-per-booking-mobile .b2-backpack-and-large-cabin-bag-img").src = MaletaMochila
            document.querySelector("ac-per-booking-mobile .b2-without-checked-baggage-img").src = SinMaleta
            document.querySelector("ac-per-booking-mobile .b2-checked-baggage-img").src = Maleta
        }
    }
}, 200);

var initCambioImagenMaleta1 = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Baggage' || window.innerWidth > 768) return;
    const Mochila = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/261ad97d-3d25-4a99-8d3b-e1656256fc90/Mochila.png'
    const MaletaMochila = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/1efad24c-3f80-458c-ab70-5a2e459fe4c6/Mochila%2Bequipaje%20de%20mano.png'
    const SinMaleta = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/52c89132-8d90-42df-b04a-753f47dae493/No%20equipaje%20facturado.png'
    const Maleta = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/79dbe5ad-d743-4dd2-bd38-ecfbf570af49/Equipaje%20facturado.png'
    window.eventBus.subscribe({
        name: "hidden_bundle", callback: function (e) {

            const smartFeeButtons = document.querySelectorAll('[data-test-id="baggage-open-per-journey-per-pax-view-button--c|CabinBaggage-m|1"]');
            const buttonClickHandler = function () {
                if (document.querySelector("ac-per-journey-per-pax-mobile .b2-backpack-img") && document.querySelector("ac-per-journey-per-pax-mobile .b2-backpack-and-large-cabin-bag-img")) {
                    document.querySelector("ac-per-journey-per-pax-mobile .b2-backpack-img").src = Mochila
                    document.querySelector("ac-per-journey-per-pax-mobile .b2-backpack-and-large-cabin-bag-img").src = MaletaMochila
                }
            };
            smartFeeButtons.forEach(button => button.addEventListener('click', buttonClickHandler));

            const smartFeeButtons1 = document.querySelectorAll('[data-test-id="baggage-open-per-journey-per-pax-view-button--c|CheckedBaggage-m|1');
            const buttonClickHandler1 = function () {
                if (document.querySelector("ac-per-journey-per-pax-mobile .b2-without-checked-baggage-img") && document.querySelector("ac-per-journey-per-pax-mobile .b2-checked-baggage-img")) {
                    document.querySelector("ac-per-journey-per-pax-mobile .b2-without-checked-baggage-img").src = SinMaleta
                    document.querySelector("ac-per-journey-per-pax-mobile .b2-checked-baggage-img").src = Maleta
                }
            };
            smartFeeButtons1.forEach(button => button.addEventListener('click', buttonClickHandler1));

            const smartFeeButtons2 = document.querySelectorAll('[data-test-id="baggage-close-per-journey-per-pax-view-button--c|CabinBaggage-m|1"]');
            const buttonClickHandler2 = function () {
                if (document.querySelector("ac-per-booking-mobile .b2-backpack-img") && document.querySelector("ac-per-booking-mobile .b2-backpack-and-large-cabin-bag-img")) {
                    document.querySelector("ac-per-booking-mobile .b2-backpack-img").src = Mochila
                    document.querySelector("ac-per-booking-mobile .b2-backpack-and-large-cabin-bag-img").src = MaletaMochila
                }
            };
            smartFeeButtons2.forEach(button => button.addEventListener('click', buttonClickHandler2));

            const smartFeeButtons3 = document.querySelectorAll('[data-test-id="baggage-close-per-journey-per-pax-view-button--c|CheckedBaggage-m|1"]');
            const buttonClickHandler3 = function () {
                if (document.querySelector("ac-per-booking-mobile .b2-without-checked-baggage-img") && document.querySelector("ac-per-booking-mobile .b2-checked-baggage-img")) {
                    document.querySelector("ac-per-booking-mobile .b2-without-checked-baggage-img").src = SinMaleta
                    document.querySelector("ac-per-booking-mobile .b2-checked-baggage-img").src = Maleta
                }
            };
            smartFeeButtons3.forEach(button => button.addEventListener('click', buttonClickHandler3));
        }
    });
}, 200);