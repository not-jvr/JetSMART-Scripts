var initChangeAlertBaggage = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/baggage') return;
	clearInterval(initChangeAlertBaggage);

	var culture = bookingData.Culture;

	function addCSS() {
		var css = `
		.alerta-mobile{
			position: absolute;
			bottom: 0;
			margin: 4px 16px 5px 2px !important;
		}

		.text-bag-oculto-alerta-equipaje{
			font-size: 14px;
		}

		.show-moneda {
			display: none !important;
			visibility: hidden;
			opacity: 1!important;
		}

		.alerta-equipaje{
			border-radius: 10px;
			margin: 8px 16px 8px 18px;
			padding: 5px 11px 5px 10px;
			background-color: #E8BEC0;
			display: none;
		}

		.js-circle-cabin-bag{
			font-size: 32px;
			color: #b2292e;
			padding: 0px 11px 0px 10px;
			float: left;
		}

		.js-circle-cabin-bag:before{
			content: "\\E91A";
		}

		.btn-close-alert{
			float: right;
			padding-left: 3px;
			font-size: 24px;
			color: #b2292e;
			margin-right: -4px;
			cursor: pointer;
		}

		ac-select-cabin-bag .b2m-per-booking-section.free.selected {
			padding-bottom: 70px;
		}

		.b2m-per-booking-section.free.selected.nomostrar {
			padding-bottom: 15px;
		}

		[data-test-id="baggage-cabin-bag-warning"] {
			display: none;
		}
		`;

		var head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');

		head.appendChild(style);

		style.type = 'text/css';
		if (style.styleSheet){
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
	}

	function addMSGDesktop(selector) {
		if (!document.querySelector('#click-mensaje-alerta-equipaje')) {
			var textDetalles = '¿Solo viajarás con mochila? Asegúrate que cumpla con las dimensiones, de lo contrario tendrás que comprar un equipaje de mano en la puerta de embarque.';

			switch (culture) {
			case "en-US":
				textDetalles = 'Will you only travel with a backpack? Remember that if it does not fit under the front seat, you will have to pay for a cabin bag at the boarding gate.';
				break;
			case "pt-BR":
				textDetalles = 'Vai viajar só com mochila? Lembre-se que se não couber debaixo do banco da frente, terá de pagar a mala na porta de embarque.';
				break;
			}

			var container = document.querySelector(selector);
			var mensaje = `
			<div id="click-mensaje-alerta-equipaje" class="alerta-equipaje" style="display: block;">
			<span class="js-circle-cabin-bag js-icon"></span>
			<span class="btn-close-alert">x</span>
			<span class="text-bag-oculto-alerta-equipaje">${textDetalles}</span>
			</div>`;
			container.insertAdjacentHTML('afterend', mensaje);

			var closeButton = document.querySelector('#click-mensaje-alerta-equipaje .btn-close-alert');
			closeButton.addEventListener('click', function() {
				var msg = document.querySelector('#click-mensaje-alerta-equipaje')
				if (msg) {
					msg.style.display = 'none';
				}
			});

		}
	}

	function addMSGMobile(selector) {
		var msg = document.querySelector('#click-mensaje-alerta-equipajeMobile');
		var container = document.querySelector(selector);
		var cajaMobile = document.querySelector('ac-per-booking-mobile .b2m-per-booking-section.free');

		if (!msg) {
			var textMobile = '¿Solo viajarás con mochila? Asegúrate que cumpla con las dimensiones y evita inconvenientes.';

			switch (culture) {
			case "en-US":
				textMobile = 'Will you only travel with a backpack? Make sure it complies with the dimensions and avoid inconveniences';
				break;
			case "pt-BR":
				textMobile = 'Vai viajar só com mochila? Certifique-se de que está de acordo com as dimensões e evite transtornos';
				break;
			}

			var mensaje = `
			<div id="click-mensaje-alerta-equipajeMobile" class="alerta-equipaje alerta-mobile" style="display: block;">
			<span class="js-circle-cabin-bag js-icon"></span>
			<span class="btn-close-alert">x</span>
			<span class="text-bag-oculto-alerta-equipaje">${textMobile}</span>
			</div>`;

			container.insertAdjacentHTML('afterend', mensaje);

			var closeButton = document.querySelector('#click-mensaje-alerta-equipajeMobile .btn-close-alert');
			closeButton.addEventListener('click', function() {
				var msg = document.querySelector('#click-mensaje-alerta-equipajeMobile');
				if (msg) {
					msg.style.display = 'none';
				}
			});
		}

		if (msg && msg.style.display === 'none') {
			cajaMobile.classList.add('nomostrar');
		} else {
			cajaMobile.classList.remove('nomostrar');
		}
	}


	function clickDesktop() {
		var elemento = document.querySelector('[data-test-id="baggage-per-booking-free-illustration--c|CabinBaggage"]');
		elemento.addEventListener('click', function() {
			addMSGDesktop('.b2-free-option-btn-container.b2-openable.b2-opened .b2-secondary-button');
		});
	}

	function clickDesktop2() {
		var elemento = document.querySelector('[data-test-id="baggage-per-booking-free-illustration--c|CabinBaggage"] .b2-secondary-button')
		elemento.addEventListener('click', function() {
			addMSGDesktop('.b2-free-option-btn-container.b2-openable.b2-opened .b2-secondary-button');
		});
	}

	function clickMobile() {
		var elemento = document.querySelector('ac-per-booking-mobile .b2m-per-booking-section.free');
		elemento.addEventListener('click', function() {
			addMSGMobile('ac-per-booking-mobile .b2m-per-booking-section.free.selected .b2m-per-booking-selector');
		});
	}

	function clickMobile2() {
		var elemento = document.querySelector('ac-per-booking-mobile .b2m-per-booking-section.padded');
		elemento.addEventListener('click', function() {
			var msg = document.querySelector('#click-mensaje-alerta-equipajeMobile');
			if (msg) {
				msg.remove();
			}
		});
	}

//PARA Q NO SE PIERDAN LAS FUNCIONES AL MOMENTO DE DARLE CLICK A EDITAR X TRAMO EN MOBILE
	function clickEditMobile1() {
		var button = document.querySelector('[data-test-id="baggage-open-per-journey-per-pax-view-button--c|CabinBaggage-m|1"]');
		if (button) {
			button.addEventListener('click', function () {
				clickEditMobile2();
			});
		}
	}

	function click1EditMobile2() {
		var button = document.querySelector('[data-test-id="baggage-close-per-journey-per-pax-view-button--c|CabinBaggage-m|1"]');
		if (button) {
			button.addEventListener('click', function () {
				clickMobile();
				clickMobile2();
				clickEditMobile1();
			});
		}
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////

	function allClicks() {
		clickDesktop();
		clickDesktop2();
		clickMobile();
		clickMobile2();
		clickEditMobile1();
	}

	if (culture) {
		allClicks();
		addCSS();
	}
//document.querySelector('[data-test-id="baggage-cabin-bag-warning"]'); msg warning oculto en css
}, 600);