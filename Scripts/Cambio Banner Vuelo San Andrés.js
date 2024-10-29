var initBannerSanAndres = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/itinerary') return;
	clearInterval(initBannerSanAndres);

	var culture = bookingData.Culture;
	var rutaSA = ['ADZ']; //PONER CODIGO DE SAN ANDRES
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

			var bannerSrcDesktop;
			var bannerSrcMobile;

			switch (culture) {
			case 'pt-BR':
				bannerSrcDesktop = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/3172bd74-0f9d-4f0e-b0d8-19f07f3f110f/Banner%20-%20Checkin%20-%20San%20andr%C3%A9s_Desktop_PT.png';
				bannerSrcMobile = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/599f52ac-e0f3-477d-a01a-9475fb0385d6/Banner%20-%20Checkin%20-%20San%20andr%C3%A9s_Mobile_PT.png';
				break;
			case 'en-US':
				bannerSrcDesktop = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/2c603c74-e58c-41db-aea1-3ea1642813e8/Banner%20-%20Checkin%20-%20San%20andr%C3%A9s_Desktop_ENG.png';
				bannerSrcMobile = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/06b0f90a-276c-41d3-89d8-745a694fb0e1/Banner%20-%20Checkin%20-%20San%20andr%C3%A9s_Mobile_ENG.png';
				break;
			default:
				bannerSrcDesktop = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/9c5ad6a6-bc3f-4932-ba2b-24f37774bece/Banner%20-%20Checkin%20-%20San%20andr%C3%A9s_Desktop.png';
				bannerSrcMobile = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/b7e1ba22-4cad-44c0-ac48-2acb88a93a88/Banner%20-%20Checkin%20-%20San%20andr%C3%A9s_Mobile.png';
				break;
			}

			var bannerSrc = window.innerWidth <= 767 ? bannerSrcMobile : bannerSrcDesktop;
			bannerDiv.innerHTML = '<div class="i2-itinerary-section haciaSA" data-test-id="haciaSA"> <img class="max-w-full" src="' + bannerSrc + '"> </div>';
			var targetElement = document.querySelector('.i2-itinerary-section.i2-header');
			if (targetElement) {
				targetElement.parentNode.insertBefore(bannerDiv, targetElement.nextSibling);
			}
		}
	}

	function outboundReturnSA() {
		if (rutaSA.includes(outboundCity) || rutaSA.includes(returnCity)) {
			console.log("va hacia SA");
			return true;
		} else {
			return false;
		}
	}

	function outboundSA() {
		if (rutaSA.includes(outboundCity)) {
			console.log("VA HACIA SA");
			return true;
		} else {
			return false;
		}
	}

	function returnSA() {
		if (rutaSA.includes(returnCity)) {
			console.log("VA HACIA SA");
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
				if (outboundReturnSA()) {
					return true;
				} else {
					return false;
				}

			} else if (ida) {
				console.log("Tienes el check-in para el vuelo de ida.");
				if (returnSA()) {
					return true;
				} else {
					return false;
				}
			} else if (vuelta) {
				console.log("Tienes el check-in para el vuelo de vuelta.");
				if (outboundSA()) {
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
	if (checkinON()) {
		addCSS();
		addBanner();
	}

}, 1000);