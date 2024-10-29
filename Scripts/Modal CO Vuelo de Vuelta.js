var interColombiaModal = setInterval(function() {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
	clearInterval(interColombiaModal);

	var culture = bookingData.Culture;
	var roundTrip = bookingData.Roundtrip;
	var rutasCO = ['CUC','CTG','MDE','BOG','CLO','PEI','SMR'];
	var salidaVuelo = bookingData.AvailableOutboundJourneys[0].DepartureStationCode
	var destinoVuelo = bookingData.AvailableOutboundJourneys[0].ArrivalStationCode

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
		var title, lineText1, buttonText, noQuiero;

		switch (culture) {
		case 'en-US':
			title = 'Important';
			lineText1 = 'According to Colombian immigration laws to enter this country being a foreigner it is necessary that you have a return ticket proving your return. If you do not have it yet, remember that it will be necessary to board your outbound flight.';
			break;
		case 'pt-BR':
			title = 'Importante';
			lineText1 = 'De acordo com as leis de imigração colombianas, para entrar nesse país como estrangeiro é necessário ter uma passagem de volta para comprovar seu retorno. Se você ainda não a tiver, lembre-se de que ela será necessária para embarcar em seu voo de ida.';
			break;
		default:
			title = 'Importante';
			lineText1 = 'De acuerdo con las leyes migratorias colombianas para ingresar a este país siendo extranjero es necesario que cuentes con un pasaje de vuelta que acredite tu regreso. Si aún no lo tienes, recuerda que será necesario para abordar tu vuelo de ida.';
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

	function esInterEntradaColombia() {
		if (rutasCO.indexOf(salidaVuelo) === -1 && rutasCO.includes(destinoVuelo)) {
			console.log("Es inter");
			return true;
		} else {
			return false;
		}
	}

	if (esInterEntradaColombia() && !roundTrip) {
		addCSS();
		addModal();
	}

}, 600);