var initModalItinerario = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/itinerary') return;
	clearInterval(initModalItinerario);

	if (bookingData.OutboundJourney.DepartureDate) {
		var fechaIda = bookingData.OutboundJourney.DepartureDate;
	}

	if (bookingData.ReturnJourney.DepartureDate) {
		var fechaVuelta = bookingData.ReturnJourney.DepartureDate;
		var fechaViajeVuelta = new Date(fechaVuelta);
	}

	var culture = bookingData.Culture;
	var roundtrip = bookingData.Roundtrip;
	var fechaViaje = new Date(fechaIda);
	var hoy = new Date();
	var esVuelta = false;

	if (fechaViaje.getTime() < hoy.getTime()) {
		esVuelta = true;
	}

	function addDisabled() {
		var elements = document.querySelectorAll('[data-test-id="checkin-button"]');
		elements.forEach(function(element) {
			element.classList.add('disabled');
		});
	}

	function verificarTarjetaDeEmbarque() {
		var elementos = document.querySelectorAll('[data-test-id="checkin-button"]');

		for (var i = 0; i < elementos.length; i++) {
			if (elementos[i].textContent.trim() === "Tarjeta de embarque" || elementos[i].textContent.trim() === "Cartão de embarque" || elementos[i].textContent.trim() === "Boarding pass") {
				return true;
			}
		}
		return false;
	}

	function addCSS() {
		var css = `
		#modalSkipPayment {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		#modalSkipPayment .modal-content {
			background: #ffffff;
			border-radius: 10px;
			padding: 0;
			z-index: 1;
			max-width: 30%;
		}

		#modalSkipPayment .modal-header {
			background-color: #59c3d9;
			padding: 20px;
			color: #ffffff;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
		}

		#modalSkipPayment .modal-header h4 {
			font-weight: bold;
			font-size: 23px;
			font-family: Lato, sans-serif;
			text-align: center;
		}

		#modalSkipPayment .modal-header .closeButton {
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

		#modalSkipPayment .modal-header .closeButton:hover {
			color: rgb(185, 34, 52);
		}

		#modalSkipPayment .modal-body {
			padding: 24px;
			font-family: 'Arial', sans-serif;
			font-size: 18px;
			color: #333333;
			text-align: center;
		}

		#modalSkipPayment .modal-body p {
			margin: 0;
			font-size: 18px;
		}

		@media (max-width: 767px) {
			#modalSkipPayment .modal-content {
				max-width: 90%;
				width: 90%;
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
		var title, lineText1, buttonText, noQuiero;

		switch (culture) {
		case 'en-US':
			title = 'Important Notice';
			lineText1 = 'We invite you to check in later as we are experiencing intermittent issues in the system. If you have any questions, please contact us through our official channels.';
			break;
		case 'pt-BR':
			title = 'Aviso Importante';
			lineText1 = 'Convidamos você a fazer o check-in mais tarde, pois estamos enfrentando intermitências no sistema. Se tiver alguma dúvida, entre em contato conosco por meio de nossos canais oficiais.';
			break;
		default:
			title = 'Aviso Importante';
			lineText1 = 'Te invitamos a realizar tu Check -in más tarde dado que estamos presentando intermitencias en el sistema. Si tienes alguna duda, contáctanos a través de nuestros canales oficiales.';
			break;
		}

		var modalTemplate = `
		<div id="modalSkipPayment" class="modal" style="display: block;">
		<div class="modal-content">
		<div class="modal-header">
		<h4>${title}</h4>
		<button class="closeButton">×</button>
		</div>
		<div class="modal-body">
		<p>${lineText1}</p>
		</div>
		</div>
		</div>
		`;

		document.body.insertAdjacentHTML('beforeend', modalTemplate);

		var closeButton = document.querySelector('.closeButton');
		closeButton.addEventListener('click', function () {
			var modal = document.querySelector('#modalSkipPayment');
			modal.remove();
		});
	}

	///FUNCIONES///
	if (esVuelta === false && !verificarTarjetaDeEmbarque()) {
		var tiempoRestante = fechaViaje.getTime() - hoy.getTime();
		var horasRestantes = tiempoRestante / (1000 * 60 * 60);

		if (horasRestantes > 24 && horasRestantes < 72) {
			addCSS()
			addModal()
			addDisabled();
		}
	}

	if (esVuelta === true && !verificarTarjetaDeEmbarque()) {
		var tiempoRestante = fechaViajeVuelta.getTime() - hoy.getTime();
		var horasRestantes = tiempoRestante / (1000 * 60 * 60);

		if (horasRestantes > 24 && horasRestantes < 72) {
			addCSS()
			addModal()
			addDisabled();
		}
	}
//////

}, 600);