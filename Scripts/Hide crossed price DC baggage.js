var initHideCrossedPrices = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Baggage') return;
    clearInterval(initHideCrossedPrices);

    function hideTachado(){
        if(JetSmart.AppContext.hasStandardDcMembership === "True" || JetSmart.AppContext.hasGroupDcMembership === "True"){
            if (window.innerWidth >= 768){
                if(document.querySelector("[data-test-id='baggage-per-booking-crossed-out-minimum-price--c|CabinBaggage']")){
                    document.querySelector("[data-test-id='baggage-per-booking-crossed-out-minimum-price--c|CabinBaggage']").style.display = 'none';
                }
                if(document.querySelector("[data-test-id='baggage-per-booking-crossed-out-minimum-price--c|CheckedBaggage']")){
                    document.querySelector("[data-test-id='baggage-per-booking-crossed-out-minimum-price--c|CheckedBaggage']").style.display = 'none';
                }
            }else if(window.innerWidth < 768){
                if(document.querySelector("[data-test-id='baggage-per-booking-crossed-out-minimum-price--c|CabinBaggage-m|1']")){
                    document.querySelector("[data-test-id='baggage-per-booking-crossed-out-minimum-price--c|CabinBaggage-m|1']").style.display = 'none';
                }
                if(document.querySelector("[data-test-id='baggage-per-booking-crossed-out-minimum-price--c|CheckedBaggage-m|1']")){
                    document.querySelector("[data-test-id='baggage-per-booking-crossed-out-minimum-price--c|CheckedBaggage-m|1']").style.display = 'none';
                }
            }
        }
    }

    window.eventBus.subscribe({
        name: "esconderTachado", callback: function (e) {
         hideTachado();
     }
 });
}, 400);