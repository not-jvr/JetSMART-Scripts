var initBannerBaggageEC = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/itinerary') return;
	clearInterval(initBannerBaggageEC);

	var culture = bookingData.Culture;
	var rutasEC = ['GYE','UIO'];
	var outboundCity = bookingData.OutboundJourney.DepartureStationCode;
	if (bookingData.ReturnJourney && bookingData.ReturnJourney.DepartureStationCode) {
		var returnCity = bookingData.ReturnJourney.DepartureStationCode;
	}
	
	function addCSS() {
		var css = `
		.i2-itinerary-section.BaggageEC .max-w-full {
			border-radius: 12px;
			display: block;
			width: 100%;
			height: auto;
		}

		@media (max-width: 767px) {
			.i2-itinerary-section.BaggageEC .max-w-full {
				border-radius: 5px;
			}
		}
		`;

		var head = document.head || document.getElementsByTagName('head')[0];
		var style = document.createElement('style');
		head.appendChild(style);
		style.type = 'text/css';
		if (style.styleSheet){
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
	}

	function addBanner() {
		if (document.querySelector('[data-test-id="BestLowCost"]')) {
			document.querySelector('[data-test-id="BestLowCost"]').style.display = 'none';
		}

		if (!document.querySelector('[data-test-id="BaggageEC"]')) {
			var bannerDiv = document.createElement('div');
			var bannerSrc = window.innerWidth <= 767 ?
			'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/a6f75432-17c8-4032-86f9-f90ec5a23485/Banner%20Mobile%20Tag%20EC.png' :
			'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/aec234e7-d7dd-4afb-a3b0-0e78961515a3/Banner%20Desktop%20-%20Opci%C3%B3n%201%20%282%29.png';
			bannerDiv.innerHTML = '<div class="i2-itinerary-section BaggageEC" data-test-id="BaggageEC"> <img class="max-w-full" src="' + bannerSrc + '"> </div>';
			var targetElement = document.querySelector('.i2-itinerary-section.i2-header');
			if (targetElement) {
				targetElement.parentNode.insertBefore(bannerDiv, targetElement.nextSibling);
			}
		}
	}

	function verificarSsrs() {
		if (bookingData && bookingData.Passengers && bookingData.Passengers.length > 0) {
			for (let i = 0; i < bookingData.Passengers.length; i++) {
				const passenger = bookingData.Passengers[i];

				if (passenger.OutboundJourneySsrs && passenger.OutboundJourneySsrs.length > 0) {
					const containsDesiredString = passenger.OutboundJourneySsrs.some(ssr => {
						return ssr.includes('BAGP') || ssr.includes('BAGD') || ssr.includes('BAGC') || ssr.includes('BAGA');
					});
					if (containsDesiredString) return true;
				}

				if (passenger.ReturnJourneySsrs && passenger.ReturnJourneySsrs.length > 0) {
					const containsDesiredStringReturn = passenger.ReturnJourneySsrs.some(ssr => {
						return ssr.includes('BAGP') || ssr.includes('BAGD') || ssr.includes('BAGC') || ssr.includes('BAGA');
					});
					if (containsDesiredStringReturn) return true;
				}
			}
		}
		return false;
	}

	function outboundEcuador() {
		if (rutasEC.includes(outboundCity)) {
			console.log("es de ecuador");
			return true;
		} else {
			return false;
		}
	}

	function returnEcuador() {
		if (rutasEC.includes(returnCity)) {
			console.log("es de ecuador");
			return true;
		} else {
			return false;
		}
	}

	function outboundReturnEcuador() {
		if (rutasEC.includes(outboundCity) || rutasEC.includes(returnCity)) {
			console.log("es de ecuador");
			return true;
		} else {
			return false;
		}
	}

	function checkinON() {
		var checkinButtons = document.querySelectorAll('[data-test-id="checkin-button"]');
		if (checkinButtons.length > 0) {
			var ida = false;
			var vuelta = false;

			for (var i = 0; i < checkinButtons.length; i++) {
				var button = checkinButtons[i];
				if (!button.classList.contains('disabled') && button.textContent.trim() !== "Tarjeta de embarque") {
					if (i === 0) {
						ida = true;
					} else if (i === 1) {
						vuelta = true;
					}
				}
			}

			if (ida && vuelta) {
				console.log("Tienes el check-in tanto para el vuelo de ida como para el vuelo de vuelta.");
				if (outboundReturnEcuador()) {
					return true;
				} else {
					return false;
				}

			} else if (ida) {
				console.log("Tienes el check-in para el vuelo de ida.");
				if (outboundEcuador()) {
					return true;
				} else {
					return false;
				}
			} else if (vuelta) {
				console.log("Tienes el check-in para el vuelo de vuelta.");
				if (returnEcuador()) {
					return true;
				} else {
					return false;
				}
			} else {
				console.log("No tienes el check-in para ningún vuelo.");
				return false;
			}
		}
	}

	if (culture !== 'en-US' && culture !== 'pt-BR' && !verificarSsrs() && checkinON()) {
		addCSS();
		addBanner();
	}

}, 700);