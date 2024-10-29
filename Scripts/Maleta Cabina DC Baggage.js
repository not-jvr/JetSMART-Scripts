var maletaCabinaDCBaggage = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Baggage') return;
	clearInterval(maletaCabinaDCBaggage);

	var staff = JetSmart.AppContext.isStaff;
	var culture = bookingData.Culture;
	var outboundBundle = bookingData.OutboundBundleCode;
	var returnBundle = bookingData.ReturnBundleCode;
	var roundTrip = bookingData.Roundtrip;
	var pb = bookingData.PostBooking;

	function addCSS() {
		var css = `
		.cabinGreyTitle{
			width: 100%;
			height: 36px;
			background-color: #f2f2f2;
			position: absolute;
			top: 0px;
			border-radius: 13px 0 0 0;
		}

		.cabinDiscount {
			background-image: url(https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/6472a872-2ccc-433b-9a5e-1337109f57ab/img-baggage-top.png);
			background-size: contain;
			width: 100%;
			display: flex;
			align-content: stretch;
			justify-content: space-around;
			position: absolute;
			top: -1px;
			border-radius: 0 13px 0 0;
		}

		.cabinDiscount .titlebag {  
			position: absolute;
			--text-opacity: 1;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			--bg-opacity: 1;
			background-color: transparent;  
			line-height: 1; 
			top: -4px;
			right: unset;
			font-size: 22px;
			width: 242px;
			height: 42px;
			font-weight: 700;
		}

		.cabinDiscount .iconBag {
			position: relative;
			padding: 6px;
			width: 90px;
			display: flex;
			right: 80px;
			margin-right: 82px;
		}

		[data-test-id="baggage-close-per-journey-per-pax-view-button--c|CabinBaggage-m|1"], [data-test-id="baggage-per-booking-paid-button-container--c|CabinBaggage"] div, [data-test-id="baggage-open-per-journey-per-pax-view-button--c|CabinBaggage"], [data-test-id="baggage-page-section-mb--c|CabinBaggage"] .absolute, #newButtonEdit_cabin, .b2m-ribbon, .b2-paid-bag-option .b2-illustration-ribbon, [data-test-id="baggage-open-per-journey-per-pax-view-button--c|CabinBaggage-m|1"], [data-test-id="baggage-page-section-mb--c|CabinBaggage"] .b2m-per-pax-container .b2-illustration-ribbon {
			display: none;
		}

		[data-test-id="baggage-page-section--c|CabinBaggage"] .b2m-free-cell.relative, [data-test-id="baggage-page-section--c|CabinBaggage"] .b2-free-cell.relative, [data-test-id="baggage-page-section--c|CabinBaggage"] .ac-per-booking-free-option, [data-test-id="baggage-page-section--c|CabinBaggage"] .b2m-per-booking-section.free, .ac-per-booking-free-option [data-test-id="baggage-backpack-tooltip-opener"] {
			opacity: .5;
			pointer-events: none;
		}

		@media (max-width: 767px) {
			.cabinDiscount {
				border-radius: 0 0 0 0;
				top: -15px;
				left: 0;
			}

			.cabinDiscount .titlebag {
				margin-top: -6px;
				font-size: 16px;
				width: 200px;
				top: 3px;
			}

			.cabinDiscount .iconBag {
				width: 85px;
				right: 55px;
			}

			.b2m-per-booking-section.padded.selected {
				padding-bottom: 0px;
			}

			.b2m-per-booking-section.padded {
				padding-top: 30px;
			}
		}

		.b2-paid-bag-option.selected .b2-paid-option-btn-container {
			background-color: rgb(181 16 78);
		}

		.b2-paid-bag-option.selected .b2-primary-button {
			color: rgb(181 16 78);
		}

		.b2-paid-bag-option.selected .b2-primary-button:after, .b2-paid-bag-option.selected {
			border-color: rgb(181 16 78);
		}
		`,
		head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');
		head.appendChild(style);
		style.type = 'text/css';
		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
	}

	function checkStations() {
		var arrivalStation = bookingData.AvailableOutboundJourneys[0].ArrivalStationCode;
		var departureStation = bookingData.AvailableOutboundJourneys[0].DepartureStationCode;

		if (arrivalStation && departureStation) {
			if ((arrivalStation === "MVD" && departureStation === "AEP") || (arrivalStation === "AEP" && departureStation === "MVD") || (arrivalStation === "EZE" && departureStation === "MVD") || (arrivalStation === "MVD" && departureStation === "EZE")) {
				return true;
			}
		}
		return false;
	}

	function checkDCMembership() {
		var DC1 = JetSmart.AppContext.hasStandardDcMembership;
		var DC2 = JetSmart.AppContext.hasGroupDcMembership;

		if ((DC1 && DC1 === 'True') || (DC2 && DC2 === 'True')) {
			return true;
		} else {
			return false;
		}
	}

	function haveBundleLigero() {
		if(roundTrip === true) {
			if (outboundBundle === null || returnBundle === null) {
				return true;
			} else {
				return false;
			}
		} else if (roundTrip === false) {
			if (outboundBundle === null) {
				return true;
			} else {
				return false;
			}
		}
	}

	function insertcabinDiscountElement() {
		var baggageTitle = document.querySelectorAll('[data-test-id="baggage-page-section--c|CabinBaggage"] .b2-paid-bag-option .b2-illustration, [data-test-id="baggage-page-section--c|CabinBaggage"] .b2m-per-booking-section.padded, [data-test-id="baggage-page-section-mb--c|CabinBaggage"] .b2m-per-pax-container');
		var baggageGreyDesktop = document.querySelectorAll('[data-test-id="baggage-page-section--c|CabinBaggage"] .b2-free-bag-option .b2-illustration');

		var titulo, img;

		switch (culture) {
		case 'en-US':
			titulo = 'Free Luggage';
			img = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/cac7cfbb-0b71-43f4-a7ce-7e36358f12ef/dc-logo-us.png';
			break;
		case 'pt-BR':
			titulo = 'Bagagem Grátis';
			img = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/38be4295-5120-4953-8f98-4b4bd8d5ecd2/dc-logo-br.png';
			break;
		default:
			titulo = 'Equipaje Gratis';
			img = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/03a9a9bd-764f-48f7-939a-185dbe26d555/logo%20dc%20ES.png';
			break;
		}

		var titleBagaggeHTML = `
		<div class="cabinDiscount">
		<img src="${img}" class="iconBag" alt="">
		<div class="titlebag">${titulo}</div>
		</div>
		`;

		var titleBagaggeGreyHTML = `
		<div class="cabinGreyTitle"></div>
		`;

		baggageGreyDesktop.forEach(function(el) {
			if (!el.querySelector('.cabinGreyTitle')) {
				el.insertAdjacentHTML('afterbegin', titleBagaggeGreyHTML);
			}
		});

		baggageTitle.forEach(function(el) {
			if (!el.querySelector('.cabinDiscount')) {
				el.insertAdjacentHTML('afterbegin', titleBagaggeHTML);
			}
		});
	}

	function selectCabinBaggage() {
		if (outboundBundle === null && returnBundle === null) {
			var cabinButtons = document.querySelector('[data-test-id="baggage-per-booking-add-first-button--c|CabinBaggage"]');

			if (cabinButtons) {
				cabinButtons.click();
			}
		} else {
			var testMasDeUnPasajero = document.querySelectorAll('[data-test-id="baggage-page-section--c|CabinBaggage"] .b2-paid-cell.relative label');

			testMasDeUnPasajero.forEach(function(element) {
				if (!element.classList.contains('disabled') && !element.classList.contains('checked')) {
					element.click();
				}
			});
		}
	}

	function allFunctions() {
		insertcabinDiscountElement();
		selectCabinBaggage();
	}

	if (staff === 'False' && checkStations() && checkDCMembership() && haveBundleLigero() && pb === false) {
		addCSS();
		allFunctions();
	}

}, 600);