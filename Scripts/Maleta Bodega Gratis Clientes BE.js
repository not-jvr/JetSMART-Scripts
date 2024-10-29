var baggageFreeBE3 = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Baggage') return;
	clearInterval(baggageFreeBE3);

	var roundtrip = bookingData.Roundtrip;
	var culture = bookingData.Culture;
	var postB = bookingData.PostBooking;
	var staff = bookingData.Role;

	function addCSS() {
		var css = `
		[data-test-id="baggage-per-booking-paid-illustration--c|CheckedBaggage"] .b2-illustration-ribbon, [data-test-id="baggage-page-section-mb--c|CheckedBaggage"] .b2-illustration-ribbon, .b2-paid-bag-option.selected [data-test-id="baggage-per-booking-paid-button-container--c|CheckedBaggage"] {
			background-color: #EE801D;
			font-family: Lato,sans-serif;
		}

		[data-test-id="baggage-per-booking-paid-illustration--c|CheckedBaggage"] .b2-illustration-ribbon:after, [data-test-id="baggage-page-section-mb--c|CheckedBaggage"] .b2-illustration-ribbon:after {
			border-color: #C06200 transparent transparent;
		}

		[data-test-id="baggage-page-section-dt--c|CheckedBaggage"] .b2-paid-bag-option.selected, [data-test-id="baggage-per-booking-paid-button-container--c|CheckedBaggage"] .b2-primary-button:after {
			border-color: #EE801D !important;
		}

		[data-test-id="baggage-page-section-dt--c|CheckedBaggage"] .selected .b2-primary-button {
			color: #EE801D;
			border-color: #C06200;
		}

		.b2-primary-button[data-test-id="baggage-per-booking-add-first-button--c|CheckedBaggage"] {
			border-color: #EE801D;
			background-color: #EE801D;
			font-family: Lato,sans-serif;
		}

		.b2-primary-button[data-test-id="baggage-per-booking-add-first-button--c|CheckedBaggage"]:hover {
			border-color: #EE801D;
			color: #EE801D;
		}

		[data-test-id="baggage-page-section-mb--c|CheckedBaggage"] [data-test-id="baggage-per-booking-paid-illustration-ribbon--c|CheckedBaggage-m|1"] {
			display: none;
		}

		[data-test-id="baggage-page-section-mb--c|CheckedBaggage"] .b2-illustration-ribbon {
			font-size: 11px;
			width: 230px;
			height: 25px;
		}

		[data-test-id="baggage-per-booking-paid-illustration--c|CheckedBaggage"] .b2-illustration-ribbon {
			width: 370px;
		}

		.b2m-tooltip.checked [data-test-id="baggage-zipped-bag-tooltip-opener"] {
			top: 87px;
		}

		[data-test-id="baggage-page-section-mb--c|CheckedBaggage"] .b2-illustration-ribbon .imgBancoEstado {
			width: auto;
			height: 100%;
			margin-right: 8px;
		}

		[data-test-id="baggage-per-booking-paid-illustration--c|CheckedBaggage"] .b2-illustration-ribbon .imgBancoEstado {
			width: auto;
			height: 100%;
			margin-right: 8px;
		}

		[data-test-id="baggage-page-section-mb--c|CheckedBaggage"] .b2m-per-pax-section .b2-illustration-ribbon .imgBancoEstado {
			left: 6px;
			top: 0px;
		}

		[data-test-id="baggage-page-section--c|CheckedBaggage"] .b2m-per-booking-section.padded.selected, [data-test-id="baggage-page-section--c|CheckedBaggage"] .b2m-per-booking-section.padded {
			padding-bottom: 20px;
			padding-top: 35px;
		}

		[data-test-id="baggage-page-section--c|CheckedBaggage"] .b2m-per-booking-section.padded.selected {
			border-color: #EE801D;
		}

		[data-test-id="baggage-per-booking-paid-illustration--c|CheckedBaggage"] .b2-per-booking-next-price {
			margin-bottom: 0px;
		}

		.newTextBaggage {
			color: #1C355E;
			font-size: 12px;
			margin-bottom: 10px;
		}

		.newTextBaggage2 {
			font-size: 12px;
			color: #fff;
			margin-top: 10px;
			margin-left: 25px;
		}

		@media (max-width: 767px) {
			.newTextBaggage {
				font-size: 10px;
			}
		}

		[data-test-id="baggage-page-section-mb--c|CheckedBaggage"] .b2m-per-pax-section .b2-paid-checked-img {
			top: 29px;
		}

		[data-test-id="baggage-page-section-mb--c|CheckedBaggage"] .b2m-per-pax-section .b2-per-booking-next-price {
			display: none;
		}

		[data-test-id="baggage-per-journey-per-pax-passenger--j|0-p|0-c|CheckedBaggage"], [data-test-id="baggage-per-journey-per-pax-passenger--j|1-p|0-c|CheckedBaggage"] {
			border: 2px, solid #EE801D;
			border-radius: 13px;
		}

		.imgPerPaxBE {
			position: absolute;
			top: 0;
			left: 0;
			width: 30px;
			height: auto;
		}

		.b2m-pax-opener.selected[data-test-id="baggage-pax-opener--j|0-p|0-c|CheckedBaggage"], .b2m-pax-opener.selected[data-test-id="baggage-pax-opener--j|1-p|0-c|CheckedBaggage"] {
			background-color: #EE801D;
		}
		`;

		var style = document.createElement('style');
		style.appendChild(document.createTextNode(css));
		document.head.appendChild(style);
	}

	function insertMobile() {
		var parentElement = document.querySelector('[data-test-id="baggage-page-section-mb--c|CheckedBaggage"] .b2m-per-booking-section.padded');

		if (parentElement && !document.querySelector('#newRibbon')) {

			var newHTML = `
			<div class="b2-illustration-ribbon" id="newRibbon">¡Costo <strong>$0</strong> por ser cliente <strong>Banco Estado!</strong></div>
			`;
			parentElement.insertAdjacentHTML('afterbegin', newHTML);
		}
	}

	function changeText() {
		var elements = document.querySelectorAll('[data-test-id="baggage-per-booking-paid-illustration--c|CheckedBaggage"] .b2-illustration-ribbon, [data-test-id="baggage-page-section-mb--c|CheckedBaggage"] .b2-illustration-ribbon');

		elements.forEach(element => {
			element.innerHTML = `
			<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/fc840562-b217-4fa0-a68b-38ea4a76a614/logo%20BE.png" class="imgBancoEstado">
			¡Costo&nbsp;<strong>$0</strong>&nbsp;por ser cliente&nbsp;<strong>Banco Estado!</strong>
			`;
		});
	}

	function addText() {
		var firstElements = document.querySelectorAll('.b2-paid-bag-option.hoverable[data-test-id="baggage-per-booking-paid-illustration--c|CheckedBaggage"] .b2-per-booking-next-price');
		var secondElements = document.querySelectorAll('[data-test-id="baggage-page-section-mb--c|CheckedBaggage"] .b2m-per-booking-selector [data-test-id="baggage-per-booking-minimum-price--c|CheckedBaggage-m|1"]');

		var newDivHTML = '<div class="newTextBaggage">*Solo aplica para el titular de la tarjeta Banco Estado</div>';

		if (firstElements.length > 0) {
			var targetElement = firstElements.length > 1 ? firstElements[1] : firstElements[0];

			if (!targetElement.nextElementSibling || !targetElement.nextElementSibling.classList.contains('newTextBaggage')) {
				targetElement.insertAdjacentHTML('afterend', newDivHTML);
			}
		}

		secondElements.forEach(function(element) {
			if (!element.nextElementSibling || !element.nextElementSibling.classList.contains('newTextBaggage')) {
				element.insertAdjacentHTML('afterend', newDivHTML);
			}
		});
	}

	function addText2() {
		var baggageOption = document.querySelector('.b2-paid-bag-option.selected[data-test-id="baggage-per-booking-paid-illustration--c|CheckedBaggage"] .b2-add-another');
		if (baggageOption && !document.querySelector('.newTextBaggage2')) {
			var newDivHTML = '<div class="newTextBaggage2">*Solo aplica para el titular de la tarjeta Banco Estado</div>';

			baggageOption.insertAdjacentHTML('afterend', newDivHTML);
		}
	}

	function addBEPerPax() {
		var baggageElements = document.querySelectorAll('[data-test-id="baggage-per-journey-per-pax-passenger--j|0-p|0-c|CheckedBaggage"], [data-test-id="baggage-per-journey-per-pax-passenger--j|1-p|0-c|CheckedBaggage"]');
		var newDivHTML = '<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/fc840562-b217-4fa0-a68b-38ea4a76a614/logo%20BE.png" class="imgPerPaxBE">';

		baggageElements.forEach(element => {
			if (!element.querySelector('.imgPerPaxBE')) {
				element.style.position = 'relative';
				element.insertAdjacentHTML('afterbegin', newDivHTML);
			}
		});
	}

	function clickEdit() {
		var buttons = document.querySelectorAll('[data-test-id="baggage-open-per-journey-per-pax-view-button--c|CheckedBaggage"], [data-test-id="baggage-close-per-journey-per-pax-view-button--c|CheckedBaggage"], [data-test-id="baggage-open-per-journey-per-pax-view-button--c|CheckedBaggage-m|1"]');
		buttons.forEach(button => {
			button.addEventListener('click', allChangesHTML);
		});
	}

	function addOrReplaceStyle(id, css) {
		var existingStyle = document.getElementById(id);
		if (existingStyle) {
			existingStyle.remove();
		}

		var style = document.createElement('style');
		style.id = id;
		style.appendChild(document.createTextNode(css));
		document.head.appendChild(style);
	}

	function cssHideNoEditPerPax() {
		var css = `
		[data-test-id="baggage-per-booking-add-button--c|CheckedBaggage"], [data-test-id="baggage-per-booking-add-button--c|CheckedBaggage-m|1"], .b2-paid-bag-option.selected[data-test-id="baggage-per-booking-paid-illustration--c|CheckedBaggage"] .b2-add-another, [data-test-id="baggage-page-section-mb--c|CheckedBaggage"] .selected .b2m-per-booking-selector.padded>span {
			display: none !important;
		}
		`;
		addOrReplaceStyle('hideNoEditPerPax', css);
	}

	function cssShowNoEditPerPax() {
		var css = `
		[data-test-id="baggage-per-booking-add-button--c|CheckedBaggage"], [data-test-id="baggage-per-booking-add-button--c|CheckedBaggage-m|1"] {
			display: flex !important;
		}

		.b2-paid-bag-option.selected[data-test-id="baggage-per-booking-paid-illustration--c|CheckedBaggage"] .b2-add-another, [data-test-id="baggage-page-section-mb--c|CheckedBaggage"] .selected .b2m-per-booking-selector.padded>span {
			display: block !important;
		}
		`;
		addOrReplaceStyle('showNoEditPerPax', css);
	}

	function cssHideEditPerPax() {
		var css = `
		[data-test-id="baggage-per-journey-per-pax-add-button--j|0-p|0-c|CheckedBaggage"], [data-test-id="baggage-per-journey-per-pax-passenger--j|0-p|0-c|CheckedBaggage"] .b2-add-another, [data-test-id="baggage-per-journey-per-pax-add-button--j|0-p|0-c|CheckedBaggage-m|1"], [data-test-id="baggage-per-journey-per-pax-passenger--j|0-p|0-c|CheckedBaggage-m|1"] .b2-pax-option-info.hidden-sm-up {
			display: none !important;
		}
		`;
		addOrReplaceStyle('hideEditPerPax', css);
	}

	function cssShowEditPerPax() {
		var css = `
		[data-test-id="baggage-per-journey-per-pax-add-button--j|0-p|0-c|CheckedBaggage"], [data-test-id="baggage-per-journey-per-pax-add-button--j|0-p|0-c|CheckedBaggage-m|1"] {
			display: flex !important;
		}

		[data-test-id="baggage-per-journey-per-pax-passenger--j|0-p|0-c|CheckedBaggage"] .b2-add-another, [data-test-id="baggage-per-journey-per-pax-passenger--j|0-p|0-c|CheckedBaggage-m|1"] .b2-pax-option-info.hidden-sm-up {
			display: block !important;
		}
		`;
		addOrReplaceStyle('showEditPerPax', css);
	}

	function cssHideNoEditPerPaxReturn() {
		var css = `
		[data-test-id="baggage-per-booking-add-button--c|CheckedBaggage"], [data-test-id="baggage-per-booking-add-button--c|CheckedBaggage-m|1"], .b2-paid-bag-option.selected[data-test-id="baggage-per-booking-paid-illustration--c|CheckedBaggage"] .b2-add-another, [data-test-id="baggage-page-section-mb--c|CheckedBaggage"] .selected .b2m-per-booking-selector.padded>span {
			display: none !important;
		}
		`;
		addOrReplaceStyle('hideNoEditPerPaxReturn', css);
	}

	function cssShowNoEditPerPaxReturn() {
		var css = `
		[data-test-id="baggage-per-booking-add-button--c|CheckedBaggage"], [data-test-id="baggage-per-booking-add-button--c|CheckedBaggage-m|1"] {
			display: flex !important;
		}

		.b2-paid-bag-option.selected[data-test-id="baggage-per-booking-paid-illustration--c|CheckedBaggage"] .b2-add-another, [data-test-id="baggage-page-section-mb--c|CheckedBaggage"] .selected .b2m-per-booking-selector.padded>span {
			display: block !important;
		}
		`;
		addOrReplaceStyle('showNoEditPerPaxReturn', css);
	}

	function cssHideEditPerPaxReturn() {
		var css = `
		[data-test-id="baggage-per-journey-per-pax-add-button--j|1-p|0-c|CheckedBaggage"], [data-test-id="baggage-per-journey-per-pax-passenger--j|1-p|0-c|CheckedBaggage"] .b2-add-another, [data-test-id="baggage-per-journey-per-pax-add-button--j|1-p|0-c|CheckedBaggage-m|1"], [data-test-id="baggage-per-journey-per-pax-passenger--j|1-p|0-c|CheckedBaggage-m|1"] .b2-pax-option-info.hidden-sm-up {
			display: none !important;
		}
		`;
		addOrReplaceStyle('hideEditPerPaxReturn', css);
	}

	function cssShowEditPerPaxReturn() {
		var css = `
		[data-test-id="baggage-per-journey-per-pax-add-button--j|1-p|0-c|CheckedBaggage"], [data-test-id="baggage-per-journey-per-pax-add-button--j|1-p|0-c|CheckedBaggage-m|1"] {
			display: flex !important;
		}

		[data-test-id="baggage-per-journey-per-pax-passenger--j|1-p|0-c|CheckedBaggage"] .b2-add-another, [data-test-id="baggage-per-journey-per-pax-passenger--j|1-p|0-c|CheckedBaggage-m|1"] .b2-pax-option-info.hidden-sm-up {
			display: block !important;
		}
		`;
		addOrReplaceStyle('showEditPerPaxReturn', css);
	}

	function outboundBaggageCount(num) {
		var outboundBaggage = bookingData.Passengers[0].OutboundJourneySsrs;
		var bagCount = outboundBaggage.filter(function(item) {
			return item === 'BAGD' || item === 'BAGC';
		}).length;

		return bagCount >= num;
	}


	function returnBaggageCount(num) {
		if (roundtrip === true) {
			var returnBaggage = bookingData.Passengers[0].ReturnJourneySsrs;
			var bagCount = returnBaggage.filter(function(item) {
				return item === 'BAGD' || item === 'BAGC';
			}).length;

			return bagCount >= num;
		}
	}

	function edits() {
		var outboundBundle = bookingData.OutboundBundleCode;
		var cnxOutbound = bookingData.OutboundJourney.IsConnectedFlight;

		if (roundtrip === true) {
			var returnBaggage = bookingData.Passengers[0].ReturnJourneySsrs;
			var returnBundle = bookingData.ReturnBundleCode;
			var cnxReturn = bookingData.ReturnJourney.IsConnectedFlight;

			if (returnBundle === null) {
				if (returnBaggageCount(1)) {
					cssHideNoEditPerPaxReturn();
					cssHideEditPerPaxReturn();
					clickEditButton();
				} else {
					cssShowEditPerPax();
				}
			} else if (returnBundle === 'BND1' || returnBundle === 'BNC1') {
				if (cnxReturn === true && returnBaggageCount(4)) {
					cssHideNoEditPerPaxReturn();
					cssHideEditPerPaxReturn();
					clickEditButton();
				} else if (returnBaggageCount(2) && cnxReturn === false) {
					cssHideNoEditPerPaxReturn();
					cssHideEditPerPaxReturn();
					clickEditButton();
				} else {
					cssShowNoEditPerPaxReturn();
					cssShowEditPerPaxReturn();
				}
				
			} else if (returnBundle === 'BND2' || returnBundle === 'BNC2') {
				if (cnxReturn === true && returnBaggageCount(4)) {
					cssHideNoEditPerPaxReturn();
					cssHideEditPerPaxReturn();
					clickEditButton();
				} else if (returnBaggageCount(2) && cnxReturn === false) {
					cssHideNoEditPerPaxReturn();
					cssHideEditPerPaxReturn();
					clickEditButton();
				} else {
					cssShowNoEditPerPaxReturn();
					cssShowEditPerPaxReturn();
				}
				
			}
		}

		if (outboundBundle === null) {
			if (outboundBaggageCount(1)) {
				cssHideNoEditPerPax();
				cssHideEditPerPax();
				clickEditButton();
			} else {
				cssShowEditPerPax();
			}
		} else if (outboundBundle === 'BND1' || outboundBundle === 'BNC1') {
			if (cnxOutbound === true && outboundBaggageCount(4)) {
				cssHideNoEditPerPax();
				cssHideEditPerPax();
				clickEditButton();
			} else if (outboundBaggageCount(2) && cnxOutbound === false) {
				cssHideNoEditPerPax();
				cssHideEditPerPax();
				clickEditButton();
			} else {
				cssShowNoEditPerPax();
				cssShowEditPerPax();
			}
			
		} else if (outboundBundle === 'BND2' || outboundBundle === 'BNC2') {
			if (cnxOutbound === true && outboundBaggageCount(4)) {
				cssHideNoEditPerPax();
				cssHideEditPerPax();
				clickEditButton();
			} else if (outboundBaggageCount(2) && cnxOutbound === false) {
				cssHideNoEditPerPax();
				cssHideEditPerPax();
				clickEditButton();
			} else {
				cssShowNoEditPerPax();
				cssShowEditPerPax();
			}
		}
	}

	function clickEditButton() {
		var totalPassengers = bookingData.PassengersAdultCount + bookingData.PassengersChildCount;
		if (totalPassengers > 1) {
			if (document.querySelector('[data-test-id="baggage-open-per-journey-per-pax-view-button--c|CheckedBaggage"]')) {
				document.querySelector('[data-test-id="baggage-open-per-journey-per-pax-view-button--c|CheckedBaggage"]').click();
			}
		}
	}

	function allChangesHTML() {
		insertMobile();
		changeText();
		addText();
		addText2();
		clickEdit();
		addBEPerPax();
	}

	function isBECAT3() {
		return Array.isArray(bookingData.AgentProgramDetails) &&
		bookingData.AgentProgramDetails.length > 0 &&
		bookingData.AgentProgramDetails[0]?.ProgramCode === 'BEC' && 
		bookingData.AgentProgramDetails[0]?.ProgramLevel === 'DBT';
	}

	if (culture === 'es-CL' && postB === false && staff !== 'EMPL' && isBECAT3()) {
		addCSS();
		allChangesHTML();
		edits();
		window.eventBus.subscribe({
			name: "SidebarReloaded", callback: function (e) {
				allChangesHTML();
				edits();
			}
		});
	}

}, 600);