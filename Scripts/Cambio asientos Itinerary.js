var intBannerChange = setInterval(function(){
	if(typeof bookingData === "undefined" || window.location.pathname !== '/V2/Itinerary') return;
	clearInterval(intBannerChange);
	var pack = bookingData.OutboundBundleCode;
	var culture = bookingData.Culture;
	var tituloBanner = "";
	var cuerpoBanner = "";
	var botonBanner = "";

	var seatCodes = ["STB1", "STB2", "STF"];
	var seatAdded = false;

	//// IDA O VUELTA ////
	var fechaIda = bookingData.OutboundJourney.DepartureDate;
	var fechaVuelta = bookingData.ReturnJourney.DepartureDate
	var fechaViaje = new Date(fechaIda);
	var esVuelta = false;
	var masDosHorasIda = false;
	var masDosHorasVuelta = false;
	var hoy = new Date();

	if (fechaViaje.getTime() < hoy.getTime()) {
		esVuelta = true;
	}
	console.log(esVuelta)
  	////// CALCULO DE 2 HORAS O MAS/////
	var fechaIdaCompleta = new Date(fechaIda);
	var fechaVueltaCompleta = new Date(fechaVuelta);
	var tiempoRestanteIda = fechaIdaCompleta.getTime() - hoy.getTime();
	var masDosHorasIda = tiempoRestanteIda > 7200000;
	var tiempoRestanteVuelta = fechaVueltaCompleta.getTime() - hoy.getTime();
	var masDosHorasVuelta = tiempoRestanteVuelta > 7200000;
	//////

	bookingData.Passengers.forEach(function(passenger){
		passenger.ServiceCharges.forEach(function(charge){
			if(seatCodes.indexOf(charge.ChargeCode) > -1) {
				seatAdded = true;
			}
		});
	});

	if (culture.includes("es-")) {
		tituloBanner = "Cambiate de asiento a donde más te acomode";
		cuerpoBanner = "Selecciona o cambiate de asiento donde quieras";
		botonBanner = "Ver asiento";
	} else if (culture.includes("pt-")) {
		tituloBanner = "Mude seu assento para onde melhor lhe convier";
		cuerpoBanner = "Selecione ou troque seu assento onde você quiser";
		botonBanner = "Ver assento";
	} else {
		tituloBanner = "Change your seat to where it suits you best";
		cuerpoBanner = "Select or change your seat wherever you want";
		botonBanner = "View seat";
	}

	if((!esVuelta && masDosHorasIda) || (esVuelta && masDosHorasVuelta)){
		if(pack === 'BND1' || pack === 'BND2' || pack === 'BNV1' || pack === 'BNV2' || seatAdded){
			var seats = document.querySelector('.i2-itinerary-section.i2-seats');
			if(!seats){
				const itineraryBanners = document.querySelector('ac-itinerary-page-banners');
				const newDiv = document.createElement('div');
				newDiv.innerHTML = newDiv.innerHTML = '<div class="i2-itinerary-section i2-seats">\n' +
				'    <img class="visible-md-up" src="/Images/BancoEstado/i2-seat-banner-dt.png">\n' +
				'    <img class="visible-sm" src="/Images/BancoEstado/i2-seat-banner-tb.png">\n' +
				'    <img class="visible-xs" src="/Images/BancoEstado/i2-seat-banner-mb.png">\n' +
				'    <header><!---->' + tituloBanner + '<!----></header>\n' +
				'    <article>\n' +
				'        ' + cuerpoBanner + '\n' +
				'    </article>\n' +
				'    <a data-test-id="itinerary-baggage-a" class="rounded-primary-btn i2-btn" href="/Seat/Map">\n' +
				'        ' + botonBanner + '\n' +
				'    </a>\n' +
				'</div>\n';
				itineraryBanners.appendChild(newDiv);		
			}
		}
	}
}, 200);