var initBannerChileItinerario = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/itinerary') return;
	clearInterval(initBannerChileItinerario);

	var culture = bookingData.Culture;
	var rutasCL = ['SCL', 'ARI', 'IQQ', 'CJC', 'ANF', 'LSC', 'CCP', 'ZCO', 'PMC', 'BBA']; //PONER CODIGO DE CHILE
	var outboundCity = bookingData.OutboundJourney.DepartureStationCode;
	var returnCity = bookingData.OutboundJourney.ArrivalStationCode;
	/*
	if (bookingData.ReturnJourney && bookingData.ReturnJourney.DepartureStationCode) {
		var returnCity = bookingData.ReturnJourney.DepartureStationCode;
	}*/

	function addCSS() {
		var css = `
		.i2-itinerary-section.haciaSA .max-w-full {
			border-radius: 12px;
			display: block;
			width: 100%;
			height: auto;
		}

		@media (max-width: 767px) {
			.i2-itinerary-section.haciaSA .max-w-full {
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

		if (!document.querySelector('[data-test-id="haciaSA"]')) {
			var bannerDiv = document.createElement('div');

			var bannerSrcDesktop = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/98e7d62a-a1a4-4ec9-bb88-f21701841e5c/Banner_Itinerario_temporada_alta_desktop.png';
			var bannerSrcMobile = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/a6fb1213-c773-419d-a658-a63f421cd1f6/Banner_Itinerario_temporada_alta_mobile.png';

			var bannerSrc = window.innerWidth <= 767 ? bannerSrcMobile : bannerSrcDesktop;
			bannerDiv.innerHTML = '<div class="i2-itinerary-section haciaSA" data-test-id="haciaSA"> <img class="max-w-full" src="' + bannerSrc + '"> </div>';
			var targetElement = document.querySelector('.i2-itinerary-section.i2-header');
			if (targetElement) {
				targetElement.parentNode.insertBefore(bannerDiv, targetElement.nextSibling);
			}
		}
	}

	function outboundReturnCL() {
		if (rutasCL.includes(outboundCity) || rutasCL.includes(returnCity)) {
			return true;
		} else {
			return false;
		}
	}

	function outboundCL() {
		if (rutasCL.includes(outboundCity)) {
			return true;
		} else {
			return false;
		}
	}

	function returnCL() {
		if (rutasCL.includes(returnCity)) {
			return true;
		} else {
			return false;
		}
	}

	function checkinON() {
		//document.querySelectorAll('.i2-journey-container [data-test-id="checkin-button"]');
		var checkinButtons = document.querySelectorAll('[data-test-id="checkin-button"]');
		if (checkinButtons.length > 0) {
			var ida = false;
			var vuelta = false;

			for (var i = 0; i < checkinButtons.length; i++) {
				var button = checkinButtons[i];
				if (!button.classList.contains('disabled') && button.textContent.trim() !== "Tarjeta de embarque" && button.textContent.trim() !== "Boarding pass" && button.textContent.trim() !== "Cartão de embarque") {
					if (i === 0) {
						ida = true;
					} else if (i === 1) {
						vuelta = true;
					}
				}
			}

			if (ida && vuelta) {
				console.log("Tienes el check-in tanto para el vuelo de ida como para el vuelo de vuelta.");
				if (outboundReturnCL()) {
					return true;
				} else {
					return false;
				}

			} else if (ida) {
				console.log("Tienes el check-in para el vuelo de ida.");
				if (outboundCL()) {
					return true;
				} else {
					return false;
				}
			} else if (vuelta) {
				console.log("Tienes el check-in para el vuelo de vuelta.");
				if (returnCL()) {
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
	console.log("gola")
	if (checkinON() && (culture !== 'pt-BR' && culture !== 'en-US')) {
		addCSS();
		addBanner();
	}

}, 1000);