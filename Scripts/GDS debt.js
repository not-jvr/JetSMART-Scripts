var initChanges_GDSItinerary = setInterval(function() {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/itinerary') return;
	clearInterval(initChanges_GDSItinerary);

	var culture = bookingData.Culture;

	function deleteGDSModal() {
		var modal = document.querySelector('ac-gds-data-modal');
		if (modal) {
			modal.remove();
		}
	}

	function addMaintenecModal() {
		var title, lineText1, buttonText;

		switch (culture) {
		case 'en-US':
			title = 'Attention';
			lineText1 = 'Sorry, this page is currently unavailable.<br>Please try again later.';
			break;
		case 'pt-BR':
			title = 'Atenção';
			lineText1 = 'Desculpe, esta página não está disponível no momento.<br>Por favor, volte mais tarde.';
			buttonText = 'Voltar';
			break;
		default:
			title = 'Atención';
			lineText1 = 'Si creaste esta reserva en el canal GDS y aún no emites el boleto, por favor termina de emitirlo en el mismo canal.<br>La multa por emitir en el sitio web reservas que fueron creadas en GDS es de 100 USD.<br>No obstante, la compra de opcionales post-venta, siempre está disponible en el sitio web.';
			break;
		}

		var modalTemplate = `
		<div id="maintenanceModal" class="modal" style="display: block;">
		<div class="modal-overlay"></div>
		<div class="modal-content">
		<div class="modal-header">
		<h4>${title}</h4>
		</div>
		<div class="modal-body">
		<p>${lineText1}</p>
		</div>
		</div>
		</div>
		`;

		document.body.insertAdjacentHTML('beforeend', modalTemplate);

		var css = `
		#maintenanceModal {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 9999;
		}

		#maintenanceModal .modal-overlay {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			backdrop-filter: blur(10px);
			z-index: -1;
		}

		#maintenanceModal .modal-content {
			background: #ffffff;
			border-radius: 10px;
			padding: 0;
			z-index: 1;
		}

		#maintenanceModal .modal-header {
			background-color: rgb(185, 34, 52);
			padding: 20px;
			color: #ffffff;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
		}

		#maintenanceModal .modal-header h4 {
			font-weight: bold;
			font-size: 23px;
			font-family: Lato, sans-serif;
			text-align: center;
		}

		#maintenanceModal .modal-body {
			padding: 24px;
			font-family: 'Arial', sans-serif;
			font-size: 18px;
			color: #333333;
			text-align: center;
		}

		#maintenanceModal .modal-body p {
			margin: 0;
			font-size: 18px;
		}

		#maintenanceModal .modal-footer {
			padding: 24px;
			padding-top: 12px;
			display: flex;
			justify-content: center;
		}

		@media (max-width: 767px) {
			#maintenanceModal .modal-content {
          width: 80%; /* Ajusta el valor según tus necesidades */
			}
		}
		`;

		var head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');

		head.appendChild(style);

		style.type = 'text/css';
		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
	}

	function deuda() {
		var elemento = document.querySelector('[data-test-id="sidebar-total-amount-value"]');
		var valor = parseInt(elemento.dataset.testValue);

		if (valor > 0) {
			return true;
		} else {
			return false;
		}
	}

	function GDS() {
		var gds = bookingData.BookingChannelType;
		if (gds === 'GDS') {
			return true;
		} else {
			return false;
		}
	}

	function allFunctions() {
		deleteGDSModal();
		addMaintenecModal();
	}

	if (deuda() && GDS()) {
		allFunctions();
	}

}, 600);