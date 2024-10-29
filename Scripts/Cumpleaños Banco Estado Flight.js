var initPCBEFLIGHT = setInterval(function () {
	if (typeof bookingData == "undefined" || window.location.pathname !== '/V2/Flight') return;
	clearInterval(initPCBEFLIGHT);

	var culture = bookingData.Culture;
	var BE = JetSmart.AppContext.bancoEstadoCategory;
	var staff = JetSmart.AppContext.isStaff;
	var pb = bookingData.PostBooking;

	function addCSS() {
		var css = `
		#modalDefault {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: rgba(22,58,112,.4);
			z-index: 999999;
		}

		#modalDefault .modal-content {
			background: #ffffff;
			border-radius: 10px;
			padding: 0;
			z-index: 1;
			max-width: 30%;
			transform: translate(-50%, -50%);
			top: 50%;
			position: fixed;
			left: 50%;
		}

		#modalDefault .modal-header {
			background-color: #b92234;
			padding: 20px;
			color: #ffffff;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
		}

		#modalDefault .modal-header h4 {
			font-weight: bold;
			font-size: 23px;
			font-family: Lato, sans-serif;
			text-align: center;
		}

		#modalDefault .modal-body {
			padding: 24px 10px 0px 10px;
			font-family: 'Arial', sans-serif;
			font-size: 18px;
			color: #333333;
			text-align: center;
		}

		#modalDefault .modal-body p {
			margin: 0;
			font-size: 18px;
		}

		#modalDefault .modal-footer {
			text-align: center;
			padding: 10px 0;
			display: flex;
			justify-content: center;
		}

		#modalDefault .modal-footer .btn-modal-default {
			border-radius: 9999px;
			cursor: pointer;
			font-family: Lato, sans-serif;
			font-size: 16px;
			font-weight: 700;
			max-width: 240px;
			padding: 10px;
			background-color: #b92234;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 2px solid #b92234;
		}

		#modalDefault .modal-footer .btn-modal-default:hover {
			background-color: #fff;
			color: #b92234;
		}

		@media (max-width: 767px) {
			#modalDefault .modal-content {
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
		var title, lineText1, textBoton;

		switch (culture) {
		case 'en-US':
			title = 'Important';
			lineText1 = 'To use the entered code, you must log in as a <strong>Banco Estado Customer.</strong>';
			textBoton = 'Log In Banco Estado';
			break;
		case 'pt-BR':
			title = 'Importante';
			lineText1 = 'Para utilizar o código inserido, você deve fazer login como <strong>Cliente Banco Estado</strong>';
			textBoton = 'Iniciar Sessão Banco Estado';
			break;
		default:
			title = 'Importante';
			lineText1 = 'Para utilizar el código ingresado, debes iniciar sesión como <strong>Cliente Banco Estado</strong>';
			textBoton = `Iniciar Sesión Banco Estado`;
			break;
		}

		var modalTemplate = `
		<div id="modalDefault" style="display: block;">
		<div class="modal-content">
		<div class="modal-header">
		<h4>${title}</h4>
		</div>
		<div class="modal-body">
		<p>${lineText1}</p>
		</div>
		<div class="modal-footer">
		<div class="btn-modal-default" href="https://booking.jetsmart.com/V2/Login?bancoe=1&culture=es-cl&url=https://jetsmart.com/cl/es/">${textBoton}</div>
		</div>
		</div>
		</div>
		`;

		document.body.insertAdjacentHTML('beforeend', modalTemplate);
	}

	function verifyPromotionCode() {
		if (!bookingData || !bookingData.PromotionCode) {
			return false;
		}
		var codePrefix = bookingData.PromotionCode.substring(0, 3);

		if (codePrefix === "BEC") {
			return true;
		} else {
			return false;
		}
	}

//verifyPromotionCode() && BE < 1 ------ Empieza con BEC el PC pero no está logeado, salta modal.

	if (verifyPromotionCode() && BE < 1 && pb === false && staff === 'False') {
		addCSS();
		addModal();
	}

}, 600);