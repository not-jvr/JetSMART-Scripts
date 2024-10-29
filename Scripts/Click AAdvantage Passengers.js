// Temmplate Evento Click
var ClicksAAdvantagePassengers = setInterval(function () { // Event - clicks_highlights_home
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Passengers' || !document.querySelector('#AAdvantageInput')) return;
	clearInterval(ClicksAAdvantagePassengers);

	function getDeviceType() {
		const userAgent = navigator.userAgent;

		if (
			userAgent.includes('Android') ||
			userAgent.includes('webOS') ||
			userAgent.includes('iPhone') ||
			userAgent.includes('iPad') ||
			userAgent.includes('iPod') ||
			userAgent.includes('BlackBerry') ||
			userAgent.includes('IEMobile') ||
			userAgent.includes('Opera Mini')
		) {
			return 'mobile';
		} else if (userAgent.includes('Tablet') || userAgent.includes('iPad')) {
			return 'tablet';
		} else {
			return 'desktop';
		}
	}

	let culture = bookingData.Culture;
	let device = getDeviceType();

	let highlights = document.querySelectorAll('#AAdvantageInput');

	// es All x si es mas de un pasajero
	highlights.forEach((element, index) => {
		element.addEventListener("click", function () {
			// Esto gatilla el evento desde Tealium al realizarse click en el botón que se quiera
			utag.link({
				'tealium_event': 'click_aadvantage_passengers', // -> Nombre del evento
				'device': device, // -> Dispositivo
				'culture': culture, // Cultura
				'position': index + 1 // Indica que pasajero hizo click
			});

		});
	});	

}, 600);