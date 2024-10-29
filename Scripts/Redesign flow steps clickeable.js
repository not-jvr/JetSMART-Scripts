var newBDDesktop = setInterval(function () {
	if (typeof bookingData === "undefined" || (window.location.pathname.toLowerCase() !== '/v2/payment' && window.location.pathname.toLowerCase() !== '/v2/flight' && window.location.pathname.toLowerCase() !== '/v2/passengers' && window.location.pathname.toLowerCase() !== '/v2/baggage' && window.location.pathname.toLowerCase() !== '/seat/map' && window.location.pathname.toLowerCase() !== '/v2/extras')) return;
	clearInterval(newBDDesktop);

	var isStaff = JetSmart.AppContext.isStaff;
	var culture = bookingData.Culture;

	function addCSS() {
		var css = `
		@media (min-width: 1024px) {
			.stepNewContainer {
				padding: 25px 25px 0;
				display: block !important;
			}

			.stepNew {
				display: flex;
				align-items: center;
			}

			#stepClick {
				cursor: pointer;
			}

			.step-icon {
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.step-content {
				margin-left: 20px;
			}

			.step-title {
				font-size: 14px;
				color: #c4c4c4;
			}

			.step-subtitle {
				font-size: 16px;
				color: #c4c4c4;
				font-weight: 600;
			}

			.connector {
				margin: 3px 0 3px 18px;
				color: #c4c4c4;
				font-weight: 600;
				font-size: 14px;
			}

			.stepNewContainer .itinerary-info-plane-icon {
				color: #fff;
				font-size: 20px;
			}

			.stepNewContainer .js-circle-baggage.js-icon.title-icon {
				color: #fff;
				font-size: 36px;
				font-weight: 600;
			}

			ac-breadcrumbs-booking .hidden-sm-down {
				display: none;
			}

			.step-subtitle-extra {
				font-size: 14px;
				color: #c4c4c4;
				margin: 10px 0 0 10px;
			}

			.step-subtitle-item:hover {
				text-decoration: underline; 
			}

			.icon-imgSTEP {
				width: 40px;
				height: 40px;
			}

			.preview-container {
				color: #00abcd;
			}

			.preview-container .step-title, .preview-container .step-subtitle {
				color: #00abcd;
			}

			.select-extra {
				font-weight: 800;
			}
		}
		`;

		var style = document.createElement('style');
		style.appendChild(document.createTextNode(css));
		document.head.appendChild(style);
	}

	function addHTML() {
		var elemento = document.querySelector('ac-breadcrumbs-booking');
		if (elemento && !document.querySelector('.stepNewContainer')) {
			var step1Title, step1Subtitle, step2Title, step2Subtitle, step3Title, step3Subtitle, step4Title, step4Subtitle;

			switch (culture) {
			case 'en-US':
				step1Title = 'Step 1';
				step1Subtitle = 'Choose your flight';
				step2Title = 'Step 2';
				step2Subtitle = 'Passenger details';
				step3Title = 'Step 3';
				step3Subtitle = 'Select extras';
				step3Extra1 = 'Choose your luggage';
				step3Extra2 = 'Select your seat';
				step3Extra3 = 'Extras';
				step4Title = 'Step 4';
				step4Subtitle = 'Payments';
				break;
			case 'pt-BR':
				step1Title = 'Passo 1';
				step1Subtitle = 'Escolha seu voo';
				step2Title = 'Passo 2';
				step2Subtitle = 'Detalhes do passageiro';
				step3Title = 'Passo 3';
				step3Subtitle = 'Selecione extras';
				step3Extra1 = 'Escolha sua bagagem';
				step3Extra2 = 'Selecione seu assento';
				step3Extra3 = 'Extras';
				step4Title = 'Passo 4';
				step4Subtitle = 'Pagamentos';
				break;
			default:
				step1Title = 'Paso 1';
				step1Subtitle = 'Selecciona tu vuelo';
				step2Title = 'Paso 2';
				step2Subtitle = 'Datos del pasajero';
				step3Title = 'Paso 3';
				step3Subtitle = 'Selecciona opcionales';
				step3Extra1 = 'Elige tu equipaje';
				step3Extra2 = 'Selecciona tu asiento';
				step3Extra3 = 'Extras';
				step4Title = 'Paso 4';
				step4Subtitle = 'Pagos';
			}

			var divHTML = `
			<div class="stepNewContainer" style="display: none;">
			<div class="stepNew" id="stepFlight">
			<div class="step-icon"><img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/d50634f4-2e17-4fa8-9172-85dd3f1b6f43/flg1.png" class="icon-imgSTEP"></div>
			<div class="step-content">
			<div class="step-title">${step1Title}</div>
			<div class="step-subtitle">${step1Subtitle}</div>
			</div>
			</div>
			<div class="connector" id="connectorFlight">|</div>

			<div class="stepNew" id="stepPassengers">
			<div class="step-icon"><img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/23693e6e-f425-4b26-b3ba-1d17acb02719/psg1.png" class="icon-imgSTEP"></div>
			<div class="step-content" id="stepClick">
			<div class="step-title">${step2Title}</div>
			<div class="step-subtitle">${step2Subtitle}</div>
			</div>
			</div>
			<div class="connector" id="connectorPassengers">|</div>

			<div class="stepNew" id="stepExtras">
			<div class="step-icon"><img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/93c72f28-f370-470c-b911-bffabc23d259/bagg1.png" class="icon-imgSTEP"></div>
			<div class="step-content" id="stepClick">
			<div class="step-title">${step3Title}</div>
			<div class="step-subtitle">${step3Subtitle}</div>
			<div class="step-subtitle-extra" style="display: none;">
			<div class="step-subtitle-item" id="stepBaggage">• ${step3Extra1}</div>
			<div class="step-subtitle-item" id="stepSeatMap">• ${step3Extra2}</div>
			<div class="step-subtitle-item" id="stepExtrasPage">• ${step3Extra3}</div>
			</div>
			</div>
			</div>
			<div class="connector" id="connectorExtras">|</div>

			<div class="stepNew" id="stepPayments">
			<div class="step-icon"><img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/a8df3a2d-f4bc-4063-8675-a417e1f4796e/pmt1.png" class="icon-imgSTEP"></div>
			<div class="step-content">
			<div class="step-title">${step4Title}</div>
			<div class="step-subtitle">${step4Subtitle}</div>
			</div>
			</div>
			</div>
			`;

			elemento.insertAdjacentHTML('beforebegin', divHTML);
		}
	}

	function redirectClicks() {
		
		/*document.querySelector('#stepFlight').addEventListener('click', function() {
			window.location.href = 'https://booking.jetsmart.com/V2/Flight?preview=86azug8by';
		});*/

		document.querySelector('#stepPassengers').addEventListener('click', function() {
			if (window.location.pathname.includes('/V2/Baggage') || window.location.pathname.includes('/Seat/Map') || window.location.pathname.includes('/Seat/Map') || window.location.pathname.includes('/V2/Payments')) {
				window.location.href = 'https://booking.jetsmart.com/V2/Passengers?preview=86azug8by';
			}
		});

		document.querySelector('#stepExtras').addEventListener('click', function() {
			var extrasSubtitle = document.querySelector('.step-subtitle-extra');
			if (extrasSubtitle.style.display === 'none') {
				extrasSubtitle.style.display = 'block';
			} else {
				extrasSubtitle.style.display = 'none';
			}
		});

		document.querySelector('#stepBaggage').addEventListener('click', function() {
			if (window.location.pathname.includes('/Seat/Map') || window.location.pathname.includes('/V2/Extras') || window.location.pathname.includes('/V2/Payments')) {
				window.location.href = 'https://booking.jetsmart.com/V2/Baggage?preview=86azug8by';
			}
		});

		document.querySelector('#stepSeatMap').addEventListener('click', function() {
			if (window.location.pathname.includes('/V2/Extras') || window.location.pathname.includes('/V2/Payments')) {
				window.location.href = 'https://booking.jetsmart.com/Seat/Map?preview=86azug8by';
			}
		});

		document.querySelector('#stepExtrasPage').addEventListener('click', function() {
			if (window.location.pathname.includes('/V2/Payments')) {
				window.location.href = 'https://booking.jetsmart.com/V2/Extras?preview=86azug8by';
			}
		});

		/*document.querySelector('#stepPayments').addEventListener('click', function() {
			window.location.href = 'https://booking.jetsmart.com/V2/Payment?preview=86azug8by';
		});*/
	}

	function updateIconsAndStyles() {
		console.log("KK")
		var currentURL = window.location.href;
		var stepFlightIcon = document.querySelector('#stepFlight .icon-imgSTEP');
		var stepPassengersIcon = document.querySelector('#stepPassengers .icon-imgSTEP');
		var stepExtrasIcon = document.querySelector('#stepExtras .icon-imgSTEP');
		var stepPaymentsIcon = document.querySelector('#stepPayments .icon-imgSTEP');
		var connectorFlight = document.querySelector('#connectorFlight');
		var connectorPassengers = document.querySelector('#connectorPassengers');
		var connectorExtras = document.querySelector('#connectorExtras');
		var previewContainers = document.querySelectorAll('.preview-container');
		var titulosFlight = document.querySelector('#stepFlight .step-content');
		var titulosPassengers = document.querySelector('#stepPassengers .step-content');
		var titulosExtras = document.querySelector('#stepExtras .step-content');
		var titulosPayment = document.querySelector('#stepPayments .step-content');
		var titulosBaggage = document.querySelector('#stepBaggage');
		var titulosSeatMap = document.querySelector('#stepSeatMap');
		var titulosExtrasPage = document.querySelector('#stepExtrasPage');
		var flightIcon = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/d50634f4-2e17-4fa8-9172-85dd3f1b6f43/flg1.png';
		var noPassengers = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/23693e6e-f425-4b26-b3ba-1d17acb02719/psg1.png';
		var noExtras = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/93c72f28-f370-470c-b911-bffabc23d259/bagg1.png';
		var noPayment = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/a8df3a2d-f4bc-4063-8675-a417e1f4796e/pmt1.png';
		var checkImg = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/9869b2d6-1d4d-43c1-9896-1d9df2395f0b/ok.png';
		var siPassengers = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/f2689298-247c-4b34-a1f8-51d82b59cb20/psg2.png';
		var siExtras = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/70dbbbe5-97c8-47d8-b622-93611f37104b/bagg2.png';
		var siPayment = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/b1498219-cc5e-4b15-bfdf-a01513a387bd/pmt2.png';
		var extraExtras = document.querySelector('.step-subtitle-extra');

		if (currentURL.includes('/V2/Flight')) {
			stepFlightIcon.src = flightIcon;
			titulosFlight.classList.add('preview-container');
			connectorFlight.classList.add('preview-container');
		} else if (currentURL.includes('/V2/Passengers')) {
			console.log("passengers")
			titulosFlight.classList.add('preview-container');
			titulosPassengers.classList.add('preview-container');
			stepFlightIcon.src = checkImg;
			stepPassengersIcon.src = siPassengers
			connectorFlight.classList.add('preview-container');
			connectorPassengers.classList.add('preview-container');
		//
			stepExtrasIcon.src = noExtras;
			titulosExtras.classList.remove('preview-container');
			titulosBaggage.classList.remove('preview-container');
			titulosSeatMap.classList.remove('preview-container');
			titulosExtrasPage.classList.remove('preview-container');
			extraExtras.style.display = 'none';
			connectorExtras.classList.remove('preview-container');

		} else if (currentURL.includes('/V2/Baggage')) {
			titulosFlight.classList.add('preview-container');
			titulosPassengers.classList.add('preview-container');
			titulosExtras.classList.add('preview-container');
			titulosBaggage.classList.add('preview-container');
			titulosBaggage.classList.add('select-extra');
			extraExtras.style.display = 'block';
			stepFlightIcon.src = checkImg;
			stepPassengersIcon.src = checkImg;
			stepExtrasIcon.src = siExtras;
			connectorFlight.classList.add('preview-container');
			connectorPassengers.classList.add('preview-container');
			connectorExtras.classList.add('preview-container');
		//
			titulosSeatMap.classList.remove('preview-container');
			titulosExtrasPage.classList.remove('preview-container');
			titulosSeatMap.classList.remove('select-extra');
			titulosExtrasPage.classList.remove('select-extra');
		} else if (currentURL.includes('/Seat/Map')) {
			titulosFlight.classList.add('preview-container');
			titulosPassengers.classList.add('preview-container');
			titulosExtras.classList.add('preview-container');
			titulosBaggage.classList.add('preview-container');
			titulosSeatMap.classList.add('preview-container');
			titulosSeatMap.classList.add('select-extra');
			extraExtras.style.display = 'block';
			stepFlightIcon.src = checkImg;
			stepPassengersIcon.src = checkImg;
			stepExtrasIcon.src = siExtras;
			connectorFlight.classList.add('preview-container');
			connectorPassengers.classList.add('preview-container');
			connectorExtras.classList.add('preview-container');
		//
			titulosExtrasPage.classList.remove('preview-container');
			titulosExtrasPage.classList.remove('select-extra');
			titulosBaggage.classList.remove('select-extra');
		} else if (currentURL.includes('/V2/Extras')) {
			console.log("extras")
			titulosExtrasPage.classList.add('select-extra');
			titulosFlight.classList.add('preview-container');
			titulosPassengers.classList.add('preview-container');
			titulosExtras.classList.add('preview-container');
			titulosBaggage.classList.add('preview-container');
			titulosSeatMap.classList.add('preview-container');
			titulosExtrasPage.classList.add('preview-container');
			extraExtras.style.display = 'block';
			stepFlightIcon.src = checkImg;
			stepPassengersIcon.src = checkImg;
			stepExtrasIcon.src = siExtras;
			connectorFlight.classList.add('preview-container');
			connectorPassengers.classList.add('preview-container');
			connectorExtras.classList.add('preview-container');
		//
			titulosBaggage.classList.remove('select-extra');
			titulosSeatMap.classList.remove('select-extra');
		} else if (currentURL.includes('/V2/Payment')) {
			titulosFlight.classList.add('preview-container');
			titulosPassengers.classList.add('preview-container');
			titulosExtras.classList.add('preview-container');
			titulosPayment.classList.add('preview-container');
			stepFlightIcon.src = checkImg;
			stepPassengersIcon.src = checkImg;
			stepExtrasIcon.src = checkImg;
			stepPaymentsIcon.src = siPayment;
			connectorFlight.classList.add('preview-container');
			connectorPassengers.classList.add('preview-container');
			connectorExtras.classList.add('preview-container');
		}
	}

	function clickBack() {
		setTimeout(function () {
			var button = document.querySelector('[data-test-id="common-modify-booking-modal-modify-button"]');

			if (button) {
				button.addEventListener('click', function() {
					console.log("AAAAAAA")
					updateIconsAndStyles();
				});
			}
		}, 300);
	}

	function clickBackContainer() {
		var buttons = document.querySelectorAll('.booking-wrapper');

		if (buttons) {
			buttons.forEach(function(button) {
				button.addEventListener('click', function() {
					clickBack();
				});
			});
		}
	}

	if (isStaff !== 'True') {
		addCSS();
		addHTML();
		updateIconsAndStyles();
		redirectClicks();
		clickBackContainer();
		window.eventBus.subscribe({
			name: "newBD2",
			callback: function(e) {
				clickBackContainer();
				setTimeout(function () {
					updateIconsAndStyles();
				}, 1500);
			}
		});
	}

}, 600);