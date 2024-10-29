var initSKIPButton = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/passengers') return;
	clearInterval(initSKIPButton);

	var culture = bookingData.Culture;

	function addCSS() {
		var css = `
		.payment-button-skip {
			--bg-opacity: 1;
			--text-opacity: 1;
			--border-opacity: 1;
			-moz-appearance: none;
			appearance: none;
			background-color: #163a70;
			border: 2px solid #163a70;
			border-color: #163a70;
			border-radius: 9999px;
			color: #ffff;
			cursor: pointer;
			display: flex;
			font-family: Lato,sans-serif;
			font-size: 18px;
			font-weight: 700;
			justify-content: center;
			letter-spacing: 0;
			line-height: 1;
			min-width: 180px;
			padding: 10px 35px 10px 35px;
			position: relative;
			text-align: center;
			text-transform: none;
			white-space: normal;
		}

		.payment-button-skip:hover {
			background-color: #ffff !important;
			border: 2px solid #163a70 !important;
			border-color: #163a70 !important;
			color: #163a70 !important;
		}

		#container-skip-button {
			margin-right: 10px;
		}

		@media (max-width: 767px) {
			#container-skip-button {
				margin: auto;
			}
		}

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
			width: 30%;
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

		#modalSkipPayment .modal-body .noWantText {
			margin-top: 8px;
			text-align: center;
		}

		#modalSkipPayment .modal-body .noSkipButton {
			font-size: 14px;
			color: #75787b;
			cursor: pointer;
			text-decoration: underline;
		}

		#modalSkipPayment .modal-body .noSkipButton:hover {
			color: #b2292e;
		}

		#modalSkipPayment .modal-body .skipButton {
			background-color: rgb(185, 34, 52);
			color: #ffffff;
			border-radius: 20px;
			padding: 10px 20px;
			font-size: 16px;
			cursor: pointer;
			font-family: Lato,sans-serif;
			font-weight: bold;
			margin-top: 12px;
			border: 2px solid rgba(178, 41, 46, var(--border-opacity));
			--border-opacity: 1;
			text-transform: none;
		}

		#modalSkipPayment .skipButton:hover {
			color: rgb(185, 34, 52);
			background-color: rgba(255, 255, 255);
		}

		@media (max-width: 767px) {
			#modalSkipPayment .modal-content {
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
			title = 'Important';
			lineText1 = 'By going directly to the payment process, you can add extras to your flight once you have completed the payment on your flight itinerary.';
			buttonText = 'Go to pay directly';
			noQuiero = 'Continue normal flow';
			break;
		case 'pt-BR':
			title = 'Importante';
			lineText1 = 'Ao ir diretamente para o processo de pagamento, você pode adicionar extras ao seu voo depois de concluir o pagamento na sua programação de voo.';
			buttonText = 'Ir diretamente para pagar';
			noQuiero = 'Continuar fluxo normal';
			break;
		default:
			title = 'Importante';
			lineText1 = 'Al dirigirte directamente al proceso de pago, podrás añadir extras a tu vuelo una vez que hayas completado el pago en tu itinerario de vuelo.';
			buttonText = 'Ir directo a pagar';
			noQuiero = 'Continuar flujo normal';
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
		<button class="skipButton">${buttonText}</button>
		<div class="noWantText">
		<span class="noSkipButton">${noQuiero}</span>
		</div>
		</div>
		</div>
		</div>
		`;

		document.body.insertAdjacentHTML('beforeend', modalTemplate);

		var skipButton = document.querySelector('.skipButton');
		skipButton.addEventListener('click', function() {
			var modal = document.querySelector('#modalSkipPayment');
			modal.style.display = 'none';
			window.location.href = 'https://booking.jetsmart.com/V2/Payment';
		});

		var noSkip = document.querySelector('.noSkipButton');
		noSkip.addEventListener('click', function() {
			var modal = document.querySelector('#modalSkipPayment');
			modal.remove();
		});

		var closeButton = document.querySelector('.closeButton');
		closeButton.addEventListener('click', function () {
			var modal = document.querySelector('#modalSkipPayment');
			modal.remove();
		});
	}

	function addButton() {
		var botonExistente = document.querySelector('.passengers-button-container button');
		if (botonExistente) {
			if (!document.querySelector('[data-test-id="skip-button"]')) {
				var buttonText;
				switch (culture) {
				case 'en-US':
					buttonText = 'Go to pay directly';
					break;
				case 'pt-BR':
					buttonText = 'Ir diretamente para pagar';
					break;
				default:
					buttonText = 'Ir directo a pagar';
					break;
				}

				var nuevoBotonHTML = `<div id="container-skip-button"><div class="payment-button-skip" data-test-id="skip-button">${buttonText}</div></div>`;

				botonExistente.insertAdjacentHTML('beforebegin', nuevoBotonHTML);
				clickSkip();
			}
		}
	}

	function clickContinue() {
		setTimeout(function () {
			var continueButton = document.querySelector('[data-test-id="passengers-submit-button"]');
			continueButton.addEventListener('click', function() {
				console.log("hola")
				clickContinue();
				addButton();
			});
		}, 500);
	}

	function clickSkip() {
		var continueButton = document.querySelector('[data-test-id="skip-button"]');

		if (continueButton) {
			continueButton.addEventListener('click', function() {
				addModal();
			});
		}
	}

	addCSS();
	addButton();
	clickContinue();

}, 600);