var newSeguro = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Extras') return;
	clearInterval(newSeguro);

	var culture = bookingData.Culture;
	var PB = bookingData.PostBooking;
	var currency = bookingData.TotalPriceCurrencyLocal;

	function addCSS() {
		var css = `
		[data-test-id="insurance-modal-confirm-button"] {
			left: -1%;
			margin: 0 auto 45px auto !important;
			width: auto;
			background: #b92234;
			border-color: #b92234;
		}

		[data-test-id="common-insurance-modal"] .container-btn {
			top: -39px;
			left: -38%;
		}

		[data-test-id="common-insurance-modal"] #idBtnInsurance {
			width: 146px;
			border: none;
			border-radius: 0;
			height: auto;
			background: none;
			text-decoration: underline;
		}

		[data-test-id="common-insurance-modal"] #idBtnInsurance:hover {
			background: none !important;
			border: none !important;
			color: #484848 !important;
		}

		#idBtnInsurance::after {
			display: none;
		}

		.porPasajero {
			color: #484848;
			position: relative;
			font-size: 12px;
			bottom: 6px;
			left: 406px;
		}

		@media (max-width: 767px) {
			[data-test-id="insurance-modal-confirm-button"] {
				margin: 0 auto 5px auto !important;
			}
		}

		@media (min-width: 421px) and (max-width: 530px) {
			.porPasajero {
				left: 300px;
			}
		}

		@media (min-width: 300px) and (max-width: 420px) {
			.porPasajero {
				left: 200px;
			}
		}
		`;

		var style = document.createElement('style');
		style.appendChild(document.createTextNode(css));
		document.head.appendChild(style);
	}

	function changeText() {
		var elemento = document.querySelector('.text-pasajero');
		if (elemento) {
			switch (currency) {
			case 'CLP':
				currencyText = 'CLP';
				break;
			case 'USD':
				currencyText = 'USD';
				break;
			}
			var texto = elemento.textContent;
			var precio = texto.match(/\$[\d.,]+/)[0];
			var botonElement = document.querySelector('.rounded-primary-btn.btn-modal-insurance');
			if (botonElement) {
				botonElement.textContent = `Asegurar mi viaje por ${precio} ${currencyText}*`;
			}
		}
	}

	function addPorPasajero() {
		var modalBody = document.querySelector('[data-test-id="common-insurance-modal"] .modal-body');

		if (modalBody && !document.querySelector('.porPasajero')) {
			const nuevoSpan = document.createElement('span');
			nuevoSpan.className = 'porPasajero';
			nuevoSpan.textContent = '*Por pasajero';
			modalBody.appendChild(nuevoSpan);
		}
	}

	function clickContinue() {
		var continueButton = document.querySelector('[data-test-id="extras-submit-button"]');
		if (continueButton) {
			continueButton.addEventListener('click', function() {
				setTimeout(function() {
					if (document.querySelector('[data-test-id="common-insurance-modal"]')) {
						changeText();
						addPorPasajero();
					}
				}, 300);
			});
		}
	}

	function checkWebAnonymous() {
		if (bookingData.Role === "WWW Anonymous") {
			return true;
		} else {
			return false;
		}
	}

	if (culture === 'es-CL' && PB === false && checkWebAnonymous() === true) {
		addCSS();
		clickContinue();
	}
	
}, 700);