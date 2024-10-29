var initTagPeruComprasFlight = setInterval(function() {
  if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
  clearInterval(initTagPeruComprasFlight);

  function isPeruCompras() {
    var peruCompras1 = JetSmart.AppContext.isPeruCompraAdmin;
    var peruCompras2 = JetSmart.AppContext.isPeruCompraBooking;
    var peruCompras3 = JetSmart.AppContext.isPeruCompraMember;

    if (peruCompras1 && peruCompras1 === 'True') {
        return true;
    } else if (peruCompras2 && peruCompras2 === 'True') {
        return true;
    } else if (peruCompras3 && peruCompras3 === 'True') {
        return true;
    } else {
        return false;
    }
}

function clickFlights() {
    var elements = document.querySelectorAll('[data-test-id*="flight-smart-fee"], [data-test-id*="flight-club-fee"]');

    elements.forEach(element => {
        element.addEventListener('click', () => {
            console.log('hola');
            hidePrint();
        });
    });
}

function hidePrint() {
    var elements = document.querySelectorAll('[data-test-id="bundle-ssr-item--j|0-c|none|APCH|APCA|APCD|APCP"], [data-test-id="bundle-ssr-item--j|0-c|simple|APCH|APCA|APCD|APCP"], [data-test-id="bundle-ssr-item--j|0-c|full|APCH|APCA|APCD|APCP"], [data-test-id="bundle-ssr-item--j|1-c|none|APCH|APCA|APCD|APCP"], [data-test-id="bundle-ssr-item--j|1-c|simple|APCH|APCA|APCD|APCP"], [data-test-id="bundle-ssr-item--j|1-c|full|APCH|APCA|APCD|APCP"]')
    elements.forEach(function (element) {
        if(element){
          element.style.visibility = 'hidden';
      }
  });
}

if (isPeruCompras()) {
    console.log('peruc')
    clickFlights();
    hidePrint();
    window.eventBus.subscribe({
        name: "replaceVuelaLigero",
        callback: function(e) {
            clickFlights();
            hidePrint();
        }
    });
}

}, 600);