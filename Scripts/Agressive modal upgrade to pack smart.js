var initAgressiveModal = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
	clearInterval(initAgressiveModal);

	var culture = bookingData.Culture;
	var bancoEstado = JetSmart.AppContext.bancoEstadoCategory;

	let textSmarticket = 'SMARTICKET';
	let textBolsoMano = 'Mochila o artículo personal';
	let textFlexi = 'FlexiSMART';
	let textEquipaje = 'Equipaje de Mano y Facturado';
	let textEmbarque = 'Embarque Prioritario';
	let textAsientos = 'Asientos filas 15 - 32';
	let textBtnLimitaciones = 'Volar ligero';
	let textBtnBeneficios = 'Quiero más beneficios';
	let textMejorOp = '¡Mejor opción!';
	let textTitleModal = '¿Estás seguro?';
	let textSubTitleModal = 'Solo incluye una bolso de mano o artículo personal y se asignará asiento aleatorio. Si necesitas equipaje podrás añadirlo más adelante a tu reserva.';
	let imgBundleLigero = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/a1d3ee2d-e33f-4386-9722-3053af471b58/noBundle.png';
	switch (bookingData.Culture) {
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
	function addCSS() {
		var css = `
		.new-class-modal-bundles {
			display: block !important;
			visibility: visible;
			opacity: 1!important;
		}
		.animacion-modal{
			animation-duration: 2s;
			animation-name: slidein;
		}
		.not-animation-modal{
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
		.btn-close-modal-bundle{
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
			right: -17px;
			top: -37px;
			width: 34px;
			z-index: 100;
		}
		cug-reservation-delete-modal .cug-modal-close{
			display: none !important;
		}
		.text-modal-bundles{
			color: #163a70;
			font-weight: 400;
			margin-bottom: 15px;
		}
		.text-header-modal{
			color: #b2292e;
			font-weight: 800;
			font-size: 23px;
			margin: 10px 0px 12px 0px;
		}
		.btn-beneficios{
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
		.btn-beneficios:hover{
			background: #051f44;
			border: 1.5px solid #051f44;
		}
		.btn-limitaciones{
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
		.btn-limitaciones:hover{
			color: #fff;
			border: 1.5px solid #b2292e;
			background: #b2292e;
		}
		.btn-limitaciones:after, .btn-beneficios:after{
			position: absolute;
			font-weight: 400;
			top: 1rem;
			transform: translateY(-50%);
			font-family: jetsmart-v2!important;
			right: 1px;
			content: "\\E9BA";
			font-size: 22px;
		}
		.agency-modal .secondary-btn, .modal.cug-modal.agency-modal .delete-warning{
			display: none;
		}
		.container-vuel-lig{
			position: relative;
			top: 2rem;
			margin-bottom: 33px;
		}
		.icon-tick-modal{
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
		.label-smart-modal{
			background-color: #051f44;
			color: #fff;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			padding: 5px 0px 8px 0px;
		}
		.header-pack-smart{
			background-color: #00abc8;
		}
		.text-deshabilitado{
			color: #75757570 !important;
		}
		.icon-deshabilitado{
			color: #75757570 !important;
			font-size: 18px !important;
			font-weight: 600 !important;
			margin-top: 0 !important;
		}
		.icon-equis{
			position: absolute;
			right: 0px;
			font-weight: 600;
			font-family: Lato, sans-serif;
			font-size: 22px;
			color: #75757570;
		}
		.text-extras-bundles{
			font-size: 13px;
			color: #163a70;
			font-weight: 600;
			margin-left: 0.5rem;
			width: 80%;
			text-align: left;
		}
		.modal-header-img{
			border-bottom: 2px solid #EFEFEF;
			padding: 15px 0px 15px 0px;
		}
		.img-header-modal{
			height: 24px;
		}
		.icon-bundle-modal{
			color: #1c355e !important;
			font-size: 18px !important;
			font-weight: 600 !important;
			margin-top: 0 !important;
		}
		.extras-bundle-modal{
			display: flex;
			position: relative;
			border-bottom: 2px solid #EFEFEF;
			margin: 0 15px;
			padding: 13px 0px 10px 0px;
		}
		.check-bundles{
			content: "";
			width: 15px;
			height: 8px;
			border-left: 2px solid #163a70;
			border-bottom: 2px solid #163a70;
			transform: rotate(-45deg);
			position: absolute;
			right: 0px;
		}
		.container-bundles-modal{
			display: flex;
			justify-content: space-evenly;
		}
		.container-modal-bundles{
			border-radius: 10px;
			height: 100%;
			position: relative;
			width: 100%;
		}
		.vuelo-ligero{
			border: 2px solid #d9d9d9;
			border-radius: 10px;
			width: 45%;
		}
		.modal-content.cug-modal-content{
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

		@media (min-width: 48rem) and (max-width: 63.9375rem){
			.modal-header-img{
				padding: 8px 0px 8px 0px;
			}
			.img-header-modal {
				height: 18px;
			}
			.extras-bundle-modal{
				padding: 9px 0px 7px 0px;
			}
			.icon-bundle-modal{
				font-size: 15px !important;
			}
			.text-extras-bundles{
				font-size: 11px;
			}
			.check-bundles{
				width: 11px;
				height: 6px;
			}
			.icon-equis{
				font-size: 19px;
			}
			.text-header-modal{
				font-size: 20px;
			}
			.text-modal-bundles{
				font-size: 14px;
				margin-bottom: 10px;
			}
			.btn-limitaciones, .btn-beneficios{
				height: 26px;
				font-size: 13px;
				margin-top: 11px;
			}
			.btn-beneficios{
				margin-bottom: 17px;
			}
			.container-vuel-lig{
				margin-bottom: 30px;
			}
			.btn-limitaciones:after, .btn-beneficios:after{
				top: 12px;
				font-size: 18px;
			}
		}
		@media only screen and (max-width: 767px) and (min-width: 317px){
			.new-class-modal-bundles{
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

	if (culture && bancoEstado <= 0) {
		addCSS()
		if (!document.querySelector("ac-flight-page .ts-error-parent.ts-flight-error-parent > section > div:nth-child(1) ac-bundles-selector > div.bundles-container.hidden-xs > div:nth-child(1)")) {
			window.eventBus.subscribe({
				name: "initChanges_35kupcp", callback: function () {
					let bundleVueloLigero = document.querySelector("ac-flight-page .ts-error-parent.ts-flight-error-parent > section > div:nth-child(1) ac-bundles-selector > div.bundles-container.hidden-xs > div:nth-child(1)");
					if (bundleVueloLigero) {
						bundleVueloLigero.addEventListener('click', function () {
							if (!document.querySelector(".animacion-modal")) {
								if (document.querySelector("cug-reservation-delete-modal")) {
									let openModalBundleAnimado = document.querySelector("cug-reservation-delete-modal");
									openModalBundleAnimado.id = 'newIdModalAnimado';
								}
								let modalAnimadoBundle = document.getElementById("newIdModalAnimado");
								let add = modalAnimadoBundle.classList.replace("animacion-modal", "not-animation-modal");
								let remove = false;
								if (!add) {
									remove = modalAnimadoBundle.classList.replace("not-animation-modal", "animacion-modal");
								}
								if (!add && !remove) {
									modalAnimadoBundle.classList.add("animacion-modal");
								}

								if (document.querySelector("body > app > cug-reservation-delete-modal > div")) {
									let modalBundle = document.querySelector("body > app > cug-reservation-delete-modal > div");
									modalBundle.id = 'newIdModalBundle';
								}
								//ocultar o mostrar modal de forma rapida o lenta dependiendo de la animacion-modal de cierre
								if ((!add && !remove) || (!add && remove)) {
									let btnMoneda = document.getElementById("newIdModalBundle");
									btnMoneda.classList.toggle("new-class-modal-bundles");
								} else {
									setTimeout(() => {
										let btnMoneda = document.getElementById("newIdModalBundle");
										btnMoneda.classList.toggle("new-class-modal-bundles");
									}, 1000);
								}

								if (document.querySelector(".btn-beneficios")) {
									let btnBeneficios = document.querySelector(".btn-beneficios");
									let modalBundlesVueloLigero = document.querySelector(".new-class-modal-bundles");
									let btnPackSmart = document.querySelector("ac-bundle-upgrade-offer .bundle-upgrade-button");
									btnBeneficios.onclick = function () {
										if (modalBundlesVueloLigero) {
											setTimeout(function () {
												/* modalBundlesVueloLigero.remove(); */
												modalAnimadoBundle.classList.remove("animacion-modal");
												modalBundlesVueloLigero.classList.remove("new-class-modal-bundles");
												modalAnimadoBundle.classList.add("not-animation-modal");
											}, 500);
										}
										if (btnPackSmart) {
											setTimeout(function () {
												btnPackSmart.click();
											}, 500);
										}
									}
								}
								if (document.querySelector(".btn-limitaciones")) {
									let btnLimitaciones = document.querySelector(".btn-limitaciones");
									let modalBundlesVueloLigero = document.querySelector(".new-class-modal-bundles");
									btnLimitaciones.onclick = function () {
										if (modalBundlesVueloLigero) {
											setTimeout(function () {
												/* modalBundlesVueloLigero.remove(); */
												modalAnimadoBundle.classList.remove("animacion-modal");
												modalBundlesVueloLigero.classList.remove("new-class-modal-bundles");
												modalAnimadoBundle.classList.add("not-animation-modal");
											}, 500);
										}
									}
								}
								if (document.querySelector(".btn-close-modal-bundle")) {
									let btnBundleClose = document.querySelector(".btn-close-modal-bundle");
									let modalBundlesVueloLigero2 = document.querySelector(".new-class-modal-bundles");
									btnBundleClose.onclick = function () {
										if (modalBundlesVueloLigero2) {
											setTimeout(function () {
												/* modalBundlesVueloLigero.remove(); */
												modalAnimadoBundle.classList.remove("animacion-modal");
												modalBundlesVueloLigero2.classList.remove("new-class-modal-bundles");
												modalAnimadoBundle.classList.add("not-animation-modal");
											}, 500);
										}
									}
								}
							}

						})
					}
				}
			})
}
if (!document.querySelector("ac-flight-page .ts-error-parent.ts-flight-error-parent > section > div:nth-child(1) ac-bundles-selector > div.bundles-container.hidden-xs > div:nth-child(1) .bundle-button")) {
	window.eventBus.subscribe({
		name: "initChanges_35kupcp", callback: function () {
			let bundleVueloLigero2 = document.querySelector("ac-flight-page .ts-error-parent.ts-flight-error-parent > section > div:nth-child(1) ac-bundles-selector > div.bundles-container.hidden-xs > div:nth-child(1) .bundle-button");
			if (bundleVueloLigero2) {
				bundleVueloLigero2.addEventListener('click', function () {
					if (!document.querySelector(".animacion-modal")) {
						if (document.querySelector("cug-reservation-delete-modal")) {
							let openModalBundleAnimado = document.querySelector("cug-reservation-delete-modal");
							openModalBundleAnimado.id = 'newIdModalAnimado';
						}
						let modalAnimadoBundle = document.getElementById("newIdModalAnimado");
						let add = modalAnimadoBundle.classList.replace("animacion-modal", "not-animation-modal");
						let remove = false;
						if (!add) {
							remove = modalAnimadoBundle.classList.replace("not-animation-modal", "animacion-modal");
						}
						if (!add && !remove) {
							modalAnimadoBundle.classList.add("animacion-modal");
						}

						if (document.querySelector("body > app > cug-reservation-delete-modal > div")) {
							let modalBundle = document.querySelector("body > app > cug-reservation-delete-modal > div");
							modalBundle.id = 'newIdModalBundle';
						}
								//ocultar o mostrar modal de forma rapida o lenta dependiendo de la animacion-modal de cierre
						if ((!add && !remove) || (!add && remove)) {
							let btnMoneda = document.getElementById("newIdModalBundle");
							btnMoneda.classList.toggle("new-class-modal-bundles");
						} else {
							setTimeout(() => {
								let btnMoneda = document.getElementById("newIdModalBundle");
								btnMoneda.classList.toggle("new-class-modal-bundles");
							}, 1000);
						}

						if (document.querySelector(".btn-beneficios")) {
							let btnBeneficios = document.querySelector(".btn-beneficios");
							let modalBundlesVueloLigero = document.querySelector(".new-class-modal-bundles");
							let btnPackSmart = document.querySelector("ac-bundle-upgrade-offer .bundle-upgrade-button");
							btnBeneficios.onclick = function () {
								if (modalBundlesVueloLigero) {
									setTimeout(function () {
												/* modalBundlesVueloLigero.remove(); */
										modalAnimadoBundle.classList.remove("animacion-modal");
										modalBundlesVueloLigero.classList.remove("new-class-modal-bundles");
										modalAnimadoBundle.classList.add("not-animation-modal");
									}, 500);
								}
								if (btnPackSmart) {
									setTimeout(function () {
										btnPackSmart.click();
									}, 500);
								}
							}
						}
						if (document.querySelector(".btn-limitaciones")) {
							let btnLimitaciones = document.querySelector(".btn-limitaciones");
							let modalBundlesVueloLigero = document.querySelector(".new-class-modal-bundles");
							btnLimitaciones.onclick = function () {
								if (modalBundlesVueloLigero) {
									setTimeout(function () {
												/* modalBundlesVueloLigero.remove(); */
										modalAnimadoBundle.classList.remove("animacion-modal");
										modalBundlesVueloLigero.classList.remove("new-class-modal-bundles");
										modalAnimadoBundle.classList.add("not-animation-modal");
									}, 500);
								}
							}
						}
						if (document.querySelector(".btn-close-modal-bundle")) {
							let btnBundleClose = document.querySelector(".btn-close-modal-bundle");
							let modalBundlesVueloLigero2 = document.querySelector(".new-class-modal-bundles");
							btnBundleClose.onclick = function () {
								if (modalBundlesVueloLigero2) {
									setTimeout(function () {
												/* modalBundlesVueloLigero.remove(); */
										modalAnimadoBundle.classList.remove("animacion-modal");
										modalBundlesVueloLigero2.classList.remove("new-class-modal-bundles");
										modalAnimadoBundle.classList.add("not-animation-modal");
									}, 500);
								}
							}
						}
					}

				})
			}
		}
	})
}

if (document.querySelector("cug-reservation-delete-modal > div > div > div:nth-child(2) > div")) {
	let modalBundlePackSmart = document.querySelector("cug-reservation-delete-modal > div > div > div:nth-child(2) > div");
	modalBundlePackSmart.innerHTML = `<div class="container-modal-bundles">
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
	</div>`;
}
}

}, 600);
