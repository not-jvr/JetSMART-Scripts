var initModalCO = setInterval(function() {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2Checkin/Print') return;
	clearInterval(initModalCO);

	var culture = bookingData.Culture;
	var roundTrip = bookingData.Roundtrip;
	var outboundDeparture = bookingData.OutboundJourney.DepartureStationCode;
	var rutasCO = ['BOG'];
	if (roundTrip) {
		var returnDeparture = bookingData.ReturnJourney.DepartureStationCode;
	}

	function addCSS() {
		var css = `
		#modalInterColombia {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		#modalInterColombia .modal-content {
			background: #ffffff;
			border-radius: 10px;
			padding: 0;
			z-index: 1;
			max-width: 30%;
		}

		#modalInterColombia .modal-header {
			background-color: #b92234;
			padding: 20px;
			color: #ffffff;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
		}

		#modalInterColombia .modal-header h4 {
			font-weight: bold;
			font-size: 23px;
			font-family: Lato, sans-serif;
			text-align: center;
		}

		#modalInterColombia .modal-header .closeButton {
			position: absolute;
			top: 0px;
			right: 10px;
			background: none;
			border: none;
			font-size: 30px;
			color: #ffffff;
			cursor: pointer;
			padding: 0;
		}

		#modalInterColombia .modal-header .closeButton:hover {
			color: rgb(185, 34, 52);
		}

		#modalInterColombia .modal-body {
			padding: 24px;
			font-family: 'Arial', sans-serif;
			font-size: 18px;
			color: #333333;
			text-align: center;
		}

		#modalInterColombia .modal-body p {
			margin: 0;
			font-size: 18px;
		}

		@media (max-width: 767px) {
			#modalInterColombia .modal-content {
				max-width: 75%;
				width: 75%;
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

	function addModal() {
		var title, lineText1, lineText2, buttonText, noQuiero;

		switch (culture) {
		case 'en-US':
			title = 'Important';
			lineText1 = 'Your flight departs from Terminal 2 (Antiguo Puente Aéreo), please check the information on your boarding pass.';
			lineText2 = 'If you are not familiar with the location of Terminal 2, click <a href="https://www.google.com/maps/search/puente+aereo+terminal+2/@4.6930349,-74.1350172,19z?entry=ttu" target="_blank" style="color: red;">HERE</a>.';
			break;
		case 'pt-BR':
			title = 'Importante';
			lineText1 = 'Seu voo parte do Terminal 2 (Antiguo Puente Aéreo), verifique as informações em seu cartão de embarque.';
			lineText2 = 'Se você não conhece a localização do Terminal 2, clique <a href="https://www.google.com/maps/search/puente+aereo+terminal+2/@4.6930349,-74.1350172,19z?entry=ttu" target="_blank" style="color: red;">AQUI</a>.';
			break;
		default:
			title = 'Importante';
			lineText1 = 'Tu vuelo sale desde la Terminal 2 (Antiguo Puente Aéreo), revisa la información en tu tarjeta de embarque.';
			lineText2 = 'Si no conoces la ubicación del Terminal 2, haz click <a href="https://www.google.com/maps/search/puente+aereo+terminal+2/@4.6930349,-74.1350172,19z?entry=ttu" target="_blank" style="color: red;">AQUÍ</a>.';
			break;
		}

		var modalTemplate = `
		<div id="modalInterColombia" class="modal" style="display: block;">
		<div class="modal-content">
		<div class="modal-header">
		<h4>${title}</h4>
		<button class="closeButton">×</button>
		</div>
		<div class="modal-body">
		<p>${lineText1}</p>
		<p>${lineText2}</p>
		</div>
		</div>
		</div>
		`;

		document.body.insertAdjacentHTML('beforeend', modalTemplate);

		var closeButton = document.querySelector('.closeButton');
		closeButton.addEventListener('click', function () {
			var modal = document.querySelector('#modalInterColombia');
			modal.remove();
		});
	}

	function test() {
		if (esIda()) {
			var flightNumerIda = bookingData.OutboundJourney.FlightNumber;
			console.log('es ida');
			return verificarNum(flightNumerIda);
		} else {
			var flightNumerVuelta = bookingData.ReturnJourney.FlightNumber;
			console.log('es vuelta');
			return verificarNum(flightNumerVuelta);
		}
	}

	function test2() {
		if (esIda() && rutasCO.includes(outboundDeparture)) {
			return true;
		} else if (roundTrip && !esIda() && rutasCO.includes(returnDeparture)){
			return true;
		} else {
			return false;
		}
	}

	function verificarNum(selector) {
		var flightNumber = selector
		var numeros = flightNumber.match(/\d+/g);
		var numerosComoCadena = numeros.join('');
		var numeroEntero = parseInt(numerosComoCadena);
		if (numeroEntero >= 5110 && numeroEntero <= 5729) {
			console.log("si")
			return true;
		} else {
			return false;
		}
	}

	function esIda() {
		var fechaIda = bookingData.OutboundJourney.DepartureDate;
		var fechaViaje = new Date(fechaIda);
		var esIda = false;
		var hoy = new Date();

		if (fechaViaje.getTime() > hoy.getTime()) {
			esIda = true;
		}
		return esIda;
	}

	if (test() && test2()) {
		console.log("gola")
		addCSS();
		addModal();
	}

}, 600);