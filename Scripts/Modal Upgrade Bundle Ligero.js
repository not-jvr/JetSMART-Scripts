var modalUpgradeLigero = setInterval(function() {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
	clearInterval(modalUpgradeLigero);

	var culture = bookingData.Culture;
	var bancoEstado = JetSmart.AppContext.bancoEstadoCategory;
	var staff = JetSmart.AppContext.isStaff;
	var postB = bookingData.PostBooking;

	function addCSS() {
		var css = `
		#modalOverlayNew {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(22, 58, 112, 0.4);
			z-index: 999998;
			display: block;
		}

		#modalDefault2 {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: #fff;
			z-index: 999999;
			padding: 20px;
			border-radius: 19px;
			text-align: center;
			width: 35%;
		}

		.new-class-modal-bundles {
			display: block !important;
			visibility: visible;
			opacity: 1!important;
		}

		.animacion-modal {
			animation-duration: 2s;
			animation-name: slidein;
		}

		.not-animation-modal {
			animation-duration: 2s;
			animation-fill-mode: forwards;
			animation-name: slideout;
		}

		@keyframes slidein {
			from {
				margin-left: 100%;
				width: 600px;
			}
			to {
				margin-left: 0%;
				width: 600px;
			}
		}

		@keyframes slideout {
			from {
				margin-left: 0%;
				width: 600px;
			}
			to {
				margin-left: 100%;
				width: 600px;
				display: none !important;
			}
		}

		.btn-close-modal-bundle {
			align-items: center;
			background: #333;
			border-radius: 50%;
			color: #fff;
			cursor: pointer;
			display: flex;
			font-size: 26px;
			height: 34px;
			justify-content: center;
			position: absolute;
			right: -27px;
			top: -40px;
			width: 34px;
			z-index: 100;
		}

		.cug-reservation-delete-modal .cug-modal-close {
			display: none !important;
		}

		.text-modal-bundles {
			color: #163a70;
			font-weight: 400;
			margin-bottom: 15px;
		}

		.text-header-modal {
			color: #b2292e;
			font-weight: 800;
			font-size: 23px;
			margin: 10px 0px 12px 0px;
		}

		.btn-beneficios {
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 19px;
			border: 1.5px solid #00abc8;
			background: #00abc8;
			cursor: pointer;
			width: 90%;
			height: 34px;
			color: #fff;
			font-size: 14px;
			font-weight: 700;
			margin-bottom: 19px;
			margin-left: auto;
			margin-right: auto;
			margin-top: 14px;
			position: relative;
		}

		.btn-beneficios:hover {
			background: #051f44;
			border: 1.5px solid #051f44;
		}

		.btn-limitaciones {
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 19px;
			border: 1.5px solid #b2292e;
			background: #FFF;
			cursor: pointer;
			width: 95%;
			height: 34px;
			color: #b2292e;
			font-size: 13px;
			font-weight: 700;
			position: relative;
			margin-right: auto;
			margin-left: auto;
			margin-top: 14px;
		}

		.btn-limitaciones:hover {
			color: #fff;
			border: 1.5px solid #b2292e;
			background: #b2292e;
		}

		.btn-limitaciones:after, .btn-beneficios:after {
			position: absolute;
			font-weight: 400;
			top: 1rem;
			transform: translateY(-50%);
			font-family: jetsmart-v2!important;
			right: 1px;
			content: "\\E9BA";
			font-size: 22px;
		}

		.agency-modal .secondary-btn, .modal.cug-modal.agency-modal .delete-warning {
			display: none;
		}

		.container-vuel-lig {
			position: relative;
			top: 2rem;
			margin-bottom: 33px;
		}

		.icon-tick-modal {
			background: #fff;
			border-radius: 50%;
			color: #73b84a !important;
			font-size: 18px !important;
			margin-top: 0 !important;
			width: 17px;
			height: 17px;
			display: inline-block !important;
			margin-right: 10px;
		}

		.label-smart-modal {
			background-color: #051f44;
			color: #fff;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			padding: 5px 0px 8px 0px;
		}

		.header-pack-smart {
			background-color: #00abc8;
		}

		.text-deshabilitado {
			color: #75757570 !important;
		}

		.icon-deshabilitado {
			color: #75757570 !important;
			font-size: 18px !important;
			font-weight: 600 !important;
			margin-top: 0 !important;
		}

		.icon-equis {
			position: absolute;
			right: 0px;
			font-weight: 600;
			font-family: Lato, sans-serif;
			font-size: 22px;
			color: #75757570;
		}

		.text-extras-bundles {
			font-size: 13px;
			color: #163a70;
			font-weight: 600;
			margin-left: 0.5rem;
			width: 80%;
			text-align: left;
		}

		.modal-header-img {
			border-bottom: 2px solid #EFEFEF;
			padding: 15px 0px 15px 0px;
			text-align: center;
		}

		.img-header-modal {
			height: 24px;
			display: block;
			margin-left: auto;
			margin-right: auto;
		}

		.icon-bundle-modal {
			color: #1c355e !important;
			font-size: 18px !important;
			font-weight: 600 !important;
			margin-top: 0 !important;
		}

		.extras-bundle-modal {
			display: flex;
			position: relative;
			border-bottom: 2px solid #EFEFEF;
			margin: 0 15px;
			padding: 13px 0px 10px 0px;
			justify-content: center;
			align-items: center;
		}

		.check-bundles {
			content: "";
			width: 15px;
			height: 8px;
			border-left: 2px solid #163a70;
			border-bottom: 2px solid #163a70;
			transform: rotate(-45deg);
			position: absolute;
			right: 0px;
		}

		.container-bundles-modal {
			display: flex;
			justify-content: center;
			gap: 10px;
		}

		.container-modal-bundles {
			border-radius: 10px;
			height: 100%;
			position: relative;
			width: 100%;
		}

		.vuelo-ligero {
			border: 2px solid #d9d9d9;
			border-radius: 10px;
			width: 45%;
		}

		.modal-content.cug-modal-content {
			width: 600px;
			height: auto;
		}

		.container-bundles-modal .js-icon-bag {
			font-size: 18px !important;
			color: #163a70 !important;
			margin-top: 0 !important;
			font-weight: 600 !important;
		}

		.container-vuel-lig .js-icon-bundle {
			font-size: 18px !important;
			color: #75757570  !important;
			margin-top: 0 !important;
			font-weight: 600 !important;
		}

		.vuelo-ligero .js-icon-bundle.smart {
			font-size: 18px !important;
			color: #163a70 !important;
			margin-top: 0 !important;
			font-weight: 600 !important;
		}

		@media (min-width: 48rem) and (max-width: 63.9375rem) {
			.modal-header-img {
				padding: 8px 0px 8px 0px;
			}
			.img-header-modal {
				height: 18px;
			}
			.extras-bundle-modal {
				padding: 9px 0px 7px 0px;
			}
			.icon-bundle-modal {
				font-size: 15px !important;
			}
			.text-extras-bundles {
				font-size: 11px;
			}
			.check-bundles {
				width: 11px;
				height: 6px;
			}
			.icon-equis {
				font-size: 19px;
			}
			.text-header-modal {
				font-size: 20px;
			}
			.text-modal-bundles {
				font-size: 14px;
				margin-bottom: 10px;
			}
			.btn-limitaciones, .btn-beneficios {
				height: 26px;
				font-size: 13px;
				margin-top: 11px;
			}
			.btn-beneficios {
				margin-bottom: 17px;
			}
			.container-vuel-lig {
				margin-bottom: 30px;
			}
			.btn-limitaciones:after, .btn-beneficios:after {
				top: 12px;
				font-size: 18px;
			}
		}

		@media only screen and (max-width: 1700px) and (min-width: 1600px) {
			#modalDefault2 {
				width: 40%;
			}
		}

		@media only screen and (max-width: 1599px) and (min-width: 1400px) {
			#modalDefault2 {
				width: 50%;
			}
		}

		@media only screen and (max-width: 1399px) and (min-width: 1150px) {
			#modalDefault2 {
				width: 60%;
			}
		}

		@media only screen and (max-width: 1149px) and (min-width: 850px) {
			#modalDefault2 {
				width: 70%;
			}
		}

		@media only screen and (max-width: 849px) and (min-width: 768px) {
			#modalDefault2 {
				width: 80%;
			}
		}

		@media only screen and (max-width: 767px) {
			.modalContainerNew {
				display: none !important;
			}
		}
		`,
		head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style')
		head.appendChild(style)
		style.type = 'text/css';
		if (style.styleSheet) {
		// This is required for IE8 and below.
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
	}

	function addModal() {
		setTimeout(function() {
			if (!document.querySelector('#modalContainerNew')) {
				var textSmarticket = 'SMARTICKET';
				var textBolsoMano = 'Mochila o artículo personal';
				var textFlexi = 'FlexiSMART';
				var textEquipaje = 'Equipaje de Mano y Facturado';
				var textEmbarque = 'Embarque Prioritario';
				var textAsientos = 'Asientos filas 15 - 32';
				var textBtnLimitaciones = 'Volar ligero';
				var textBtnBeneficios = 'Quiero más beneficios';
				var textMejorOp = '¡Mejor opción!';
				var textTitleModal = '¿Estás seguro?';
				var textSubTitleModal = 'Solo incluye una bolso de mano o artículo personal y se asignará asiento aleatorio. Si necesitas equipaje podrás añadirlo más adelante a tu reserva.';
				var imgBundleLigero = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/a1d3ee2d-e33f-4386-9722-3053af471b58/noBundle.png';
				switch (culture) {
				case 'pt-BR':
					textSmarticket = 'SMARTICKET';
					textBolsoMano = 'Bolsa de mão';
					textFlexi = 'FlexiSmart';
					textEquipaje = 'Bagagem de cabine e bagagem despachada';
					textEmbarque = 'Embarque prioritário';
					textAsientos = 'Assentos filas 15-32';
					textBtnLimitaciones = 'Aceitar limitações sem pack';
					textBtnBeneficios = 'Mudar para a Pack SMART';
					textMejorOp = '¡Melhor opção!';
					textTitleModal = 'Tem certeza?';
					textSubTitleModal = 'A tarifa da Voe LEVE não inclui bagagem de cabine, bagagem despachada, seleção de assento ou alterações sem penalidade.';
					imgBundleLigero = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/25fd20c2-7d82-45cc-b902-d00a832be8d9/noBundlePt.png';
					break;
				case 'en-US':
					textSmarticket = 'SMARTICKET';
					textBolsoMano = 'Handbag';
					textFlexi = 'FlexiSmart';
					textEquipaje = 'Large cabin bag and checked bag';
					textEmbarque = 'Priority boarding';
					textAsientos = 'Seat rows 15 - 32';
					textBtnLimitaciones = 'Accept limitations without pack';
					textBtnBeneficios = 'Change to pack SMART';
					textMejorOp = '¡Best option!';
					textTitleModal = 'Are you sure?';
					textSubTitleModal = 'The Travel LIGHT fare does not include cabin bag, checked bag, seat selection or changes without penalty.';
					imgBundleLigero = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/59f023dd-99b9-4d19-b30c-cbd6d5e745dc/noBundleEn.png';
					break;
				}

				var modalTemplate = `
				<div id="modalContainerNew">
				<div id="modalOverlayNew"></div>
				<div id="modalDefault2" style="display: block;">
				<div class="container-modal-bundles">
				<div class="btn-close-modal-bundle">×</div>
				<div class="text-header-modal">${textTitleModal}</div>
				<div class="text-modal-bundles">${textSubTitleModal}</div>
				<div class="container-bundles-modal">
				<div class="vuelo-ligero container-vuel-lig">
				<div class="modal-header-img"><img class="img-header-modal" src="${imgBundleLigero}"></div>
				<div class="extras-bundle-modal">
				<i class="js-icon js-cr-cards icon-bundle-modal"></i>
				<div class="text-extras-bundles">${textSmarticket}</div>
				<div class="check-bundles"></div>
				</div>
				<div class="extras-bundle-modal">
				<i class="js-icon-bag js-bag-backpack"></i>
				<div class="text-extras-bundles">${textBolsoMano}</div>
				<div class="check-bundles"></div>
				</div>
				<div class="extras-bundle-modal">
				<i class="js-icon-bundle js-bundle-flexi-smart-no-border"></i>
				<div class="text-extras-bundles text-deshabilitado">${textFlexi}</div>
				<div class="icon-equis">×</div>
				</div>
				<div class="extras-bundle-modal">
				<i class="js-icon-bundle js-bundle-cabin-and-checked-bags"></i>
				<div class="text-extras-bundles text-deshabilitado">${textEquipaje}</div>
				<div class="icon-equis">×</div>
				</div>
				<div class="extras-bundle-modal">
				<i class="js-icon js-priority icon-deshabilitado"></i>
				<div class="text-extras-bundles text-deshabilitado">${textEmbarque}</div>
				<div class="icon-equis">×</div>
				</div>
				<div class="extras-bundle-modal">
				<i class="js-icon js-cr-seats1 icon-deshabilitado"></i>
				<div class="text-extras-bundles text-deshabilitado">${textAsientos}</div>
				<div class="icon-equis">×</div>
				</div>
				<div class="btn-limitaciones">${textBtnLimitaciones}</div>
				</div>
				<div class="vuelo-ligero">
				<div class="label-smart-modal">
				<i class="js-icon js-flight-tick icon-tick-modal"></i>
				${textMejorOp}
				</div>
				<div class="modal-header-img header-pack-smart"><img class="img-header-modal" src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/a8126a25-2153-4a82-b4f2-064707fa8523/bundle-smart-baggage.svg"></div>
				<div class="extras-bundle-modal">
				<i class="js-icon js-cr-cards icon-bundle-modal"></i>
				<div class="text-extras-bundles">${textSmarticket}</div>
				<div class="check-bundles"></div>
				</div>
				<div class="extras-bundle-modal">
				<i class="js-icon-bag js-bag-backpack"></i>
				<div class="text-extras-bundles">${textBolsoMano}</div>
				<div class="check-bundles"></div>
				</div>
				<div class="extras-bundle-modal">
				<i class="js-icon-bundle js-bundle-flexi-smart-no-border smart"></i>
				<div class="text-extras-bundles">${textFlexi}</div>
				<div class="check-bundles"></div>
				</div>
				<div class="extras-bundle-modal">
				<i class="js-icon-bundle js-bundle-cabin-and-checked-bags smart"></i>
				<div class="text-extras-bundles">${textEquipaje}</div>
				<div class="check-bundles"></div>
				</div>
				<div class="extras-bundle-modal">
				<i class="js-icon js-priority icon-bundle-modal"></i>
				<div class="text-extras-bundles">${textEmbarque}</div>
				<div class="check-bundles"></div>
				</div>
				<div class="extras-bundle-modal">
				<i class="js-icon js-cr-seats1 icon-bundle-modal"></i>
				<div class="text-extras-bundles">${textAsientos}</div>
				<div class="check-bundles"></div>
				</div>
				<div class="btn-beneficios">${textBtnBeneficios}</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				`;

				document.body.insertAdjacentHTML('beforeend', modalTemplate);

				var modalContainer = document.querySelector('#modalContainerNew');
				var closeModal = document.querySelector('.btn-close-modal-bundle');
				var upgradeLigero = document.querySelector('.bundle-upgrade-button[data-test-value="BND0"][data-test-id="bundle-upgrade-button--j|0"]');

				if (closeModal) {
					closeModal.addEventListener('click', function() {
						if (modalContainer) {
							modalContainer.remove();
						}
					});
				}

				var noUpgrade = document.querySelector('.btn-limitaciones');
				if (noUpgrade) {
					noUpgrade.addEventListener('click', function() {
						if (modalContainer) {
							modalContainer.remove();
						}
					});
				}

				var upgradeButtonModal = document.querySelector('.btn-beneficios');
				if (upgradeButtonModal) {
					upgradeButtonModal.addEventListener('click', function() {
						if (upgradeLigero) {
							upgradeLigero.click();
							modalContainer.remove();
						}
					});
				}
			}
		}, 1000);
}

function clickLigero() {
	console.log("sitaligero")
	var elemento1 = document.querySelector('.bundles-container [data-test-id="bundle-selector-option--j|0-c|none"][data-test-value="BND0"]');
	var elemento2 = document.querySelector('.bundles-container [data-test-id="bundle-selector-option--j|0-c|none"][data-test-value="BNC0"]');

	if (elemento1) {
		console.log("clickligero");
		elemento1.addEventListener('click', function () {
			addModal();
		});
	}

	if (elemento2) {
		elemento2.addEventListener('click', function () {
			addModal();
		});
	}
}

function clickButtons() {
	var smartFeeButtons = document.querySelectorAll('[data-test-id*="flight-smart-fee"], [data-test-id*="flight-club-fee"]');
	var buttonClickHandler = function() {
		setTimeout(function() {
			clickLigero();
		}, 500);
	};
	smartFeeButtons.forEach(function(button) {
		button.addEventListener('click', buttonClickHandler);
	});
}

if (postB === false && staff === 'False' && bancoEstado < 1 && (culture === 'es-AR' || culture === 'es-PE')) {
	addCSS();
	clickButtons();
	window.eventBus.subscribe({
		name: "modalUpgrade",
		callback: function(e) {
			clickButtons();
			clickLigero();
		}
	});
}

}, 600);