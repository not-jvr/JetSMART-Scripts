var flexiBE = setInterval(function () {
	if (typeof bookingData == "undefined" || window.location.pathname !== '/V2/Extras') return;
	clearInterval(flexiBE);

	var BE = JetSmart.AppContext.bancoEstadoCategory;
	function addCSS() {
		var css = `
		[data-test-id="extras-flexi-fee-subtitle"] {
			display: none;
		}

		.js-flexi-tick:before {
			content: "\\E92E";
			font-size: 14px;
			color: #ee801d;
		}

		.flexismart-banner {
			background: #fff8f0;
			border: 2px solid #ee801d;
			border-radius: 15px;
			padding: 15px;
			line-height: 25px;
			margin: 15px 0px 15px 0px;
		}

		.tituloBE {
			color: #ee801d;
			font-size: 21px;
			font-weight: 600;
		}

		.flexismart-banner .span-style {
			color: #ee801d;
		}

		.text-tarifaria {
			color: #919191;
			font-size: 14px;
		}

		.flexSubTitle {
			color: #ee801d;
			font-size: 16px;
			font-weight: 600;
			position: relative;
			left: 8%;
			top: 40px;
			z-index: 1;
		}

		[data-test-id="extras-flexi-fee-container"] .inner-box.upper-half .package-title{
			display: none;
		}

		[data-test-id="extras-flexi-fee-container"] .filled-column , [data-test-id="extras-flexi-fee-container"] .inner-box{
			background: none;
		}

		.extras-binary-name .package-title {
			margin: 15px 0 0 0;
			margin-bottom: 0px !important;
		}

		[data-test-id="extras-flexi-fee-container"] .inner-border-box {
			border: 1px solid #ee801d !important;
		}

		[data-test-id="extras-flexi-fee-container"] .inner-box.bottom-half.padded-bottom-half {
			padding-top: 0px;
		}

		[data-test-id="extras-flexi-fee-container"] .btn-boarding {
			background: #ee8323;
			height: 35px;
			top: 25%;
			border-radius: 999px;
			border: 2px solid #ee8323;
			border-color: #ee8323;
		}

		[data-test-id="extras-flexi-fee-container"] .btn-boarding:hover {
			background: white;
			color: #ee8323;
			border-color: #ee8323;
		}

		.flexibility-message-etiqueta {
			position: absolute;
			top: 5px; 
			right: 10px; 
			background-color: #ee8323; 
			padding: 7px; 
			border-radius: 5px; 
			z-index: 1;
			color: #fff;
			font-size: 14px;
		}

		[data-test-id="extras-submit-button"] {
			display: none;
		}

		[data-test-id="extras-flexi-fee-container"] .btn-boarding.selected {
			color: #fff;
		}

		[data-test-id="extras-flexi-fee-container"] .btn-boarding.selected:hover {
			color: #ee8323;
		}

		[data-test-id="extras-flexi-fee-container"] .package-title.visible-xs {
			display: none !important;
		}

		[data-test-id="extras-flexi-fee-container"] .extra-in-bundle-info {
			background-color: #ee8323 !important;
		}

		@media only screen and (min-width: 1024px) and (max-width: 1279px){
			[data-test-id="extras-flexi-fee-container"] .btn-boarding {
				width: 100px;
				left: -25px;
				font-size: 13px
			}
		}

		@media (max-width: 1024px) {
			[data-test-id="extras-flexi-fee-container"] header {
				margin-top: 35px;
			}
		}

		@media (min-width: 768px) {
			[data-test-id="extras-flexi-fee-container"] #flexMobileSubtitle {
				display: none;
			}
		}

		@media (max-width: 1023px) {
			[data-test-id="extras-flexi-fee-container"] .btn-boarding {
				width: 100px;
				left: -25px;
				font-size: 13px
			}
		}
		`
		,
		head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');
		head.appendChild(style);
		style.type = 'text/css';
		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
	}

	function addHTML() {
		var titulo = 'Por esta semana, ser cliente Banco Estado te da flexibilidad total a Costo $0';
		var text1 = '¿Problemas de último momento?<strong>¡Olvídate de ellos con nuestro FlexiSMART!</strong>';
		var text2 = 'Modifica tu reserva cuantas veces quieras por un año';
		var text3 = 'Podrás cambiar tu reserva hasta una hora antes del vuelo';
		var text4 = '¡No pagarás cargo por ningún cambio!';
		var text5 = '*Aplica diferencia tarifaria si corresponde.';

		var subtitlePullUp = document.querySelector(".ts-flexi-fee .title");
		if (subtitlePullUp && !subtitlePullUp.querySelector('.subtitle.pull-up.shorta')) {
			subtitlePullUp.insertAdjacentHTML('beforeend',
				`<div class="subtitle pull-up shorta">${text1}</div>`);
		}

		var flexismarthtml = document.querySelector('[data-test-id="extras-flexi-fee-container"] header');
		if (flexismarthtml && !document.querySelector('.flexismart-banner')) {
			var textFlexismart = `<div class="flexismart-banner">
			<span class="tituloBE">${titulo}</span><br>
			<i class="js-flexi-tick js-icon"></i>
			<span class="span-style">${text2}</span><br>
			<i class="js-icon js-flexi-tick"></i>
			<span class="span-style">${text3}</span><br>
			<i class="js-icon js-flexi-tick"></i>
			<span class="span-style">${text4}</span>
			</div>
			<div class="text-tarifaria">
			${text5}
			</div>`;

			flexismarthtml.insertAdjacentHTML('afterend', textFlexismart);
		}
	}

	function cambiarPosRutas() {
		var elementosOrigen = document.querySelectorAll('[data-test-id="extras-flexi-fee-container"] .inner-box.upper-half .package-title');

		var elementoDestino0 = document.querySelector('div.extras-binary-name[data-test-id="extras-flexi-fee-button-caption--j|0"]');
		var elementoDestino1 = document.querySelector('div.extras-binary-name[data-test-id="extras-flexi-fee-button-caption--j|1"]');

		if (elementosOrigen[0] && elementoDestino0) {
			elementoDestino0.innerHTML = elementosOrigen[0].outerHTML;
		}

		if (elementosOrigen[1] && elementoDestino1) {
			elementoDestino1.innerHTML = elementosOrigen[1].outerHTML;
		}
	}

	function insertFlexiParaTi() {
		var elementos = document.querySelectorAll('[data-test-id="extras-flexi-fee-container"] .inner-box.upper-half');

		elementos.forEach(elemento => {
			if (!elemento.querySelector('.flexSubTitle')) {
				elemento.insertAdjacentHTML('afterbegin', 
					'<div class="flexSubTitle"><img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/94511639-8978-4a66-92cb-48774da6a5bb/IconBE.png" style="vertical-align: middle; margin-right: 10px;">¡Flexibilidad para ti!</div>');
			}
		});
	}

	function insertFlexiParaTiMobile() {
		var elemento1 = document.querySelector('[data-test-id="extras-flexi-fee-container"] [data-test-id="extras-flexi-fee-journey--j|0"]');
		var elemento2 = document.querySelector('[data-test-id="extras-flexi-fee-container"] [data-test-id="extras-flexi-fee-journey--j|1"]');

		var htmlContent = '<div class="flexSubTitle" id="flexMobileSubtitle"><img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/94511639-8978-4a66-92cb-48774da6a5bb/IconBE.png" style="vertical-align: middle; margin-right: 10px;">¡Flexibilidad para tí!</div>';

		if (elemento1 && !elemento1.querySelector('.flexSubTitle')) {
			elemento1.insertAdjacentHTML('afterbegin', htmlContent);
		}

		if (elemento2 && !elemento2.querySelector('.flexSubTitle')) {
			elemento2.insertAdjacentHTML('afterbegin', htmlContent);
		}
	}

	function changeTextButton() {
		document.querySelectorAll('[data-test-id="extras-flexi-fee-container"] .btn-boarding').forEach(button => {
			var spans = button.getElementsByTagName('span');
			if (spans.length > 0) {
				spans[0].innerHTML = 'Agregar por <strong>$0</strong>';
			}
		});

	}

	function addEtiqueta() {
		var messageHTML = `
		<div class="flexibility-message-etiqueta">
		<div style="display: flex; align-items: center;">
		<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/94511639-8978-4a66-92cb-48774da6a5bb/IconBE.png" style="vertical-align: middle; margin-right: 10px;">
		<div>
		¡Disfruta de la flexibilidad <strong>sin costo</strong><br> por ser cliente <strong>Banco Estado</strong>!
		</div>
		</div>
		</div>`;
		var container = document.querySelector(".booking-wrapper.ts-flexi-fee.extras-step.ts-error-container");

		if (container && !container.querySelector('.flexibility-message-etiqueta')) {
			container.insertAdjacentHTML('beforeend', messageHTML);
		}
	}

	function clickFlexi() {
		var buttons = document.querySelectorAll('[data-test-id="extras-flexi-fee-container"] .btn-boarding');
		console.log('flex');

		function clickButtonWithDelay(index) {
			if (index < buttons.length) {
				var button = buttons[index];
				if (!button.classList.contains('selected')) {
					button.click();
				}
				setTimeout(() => clickButtonWithDelay(index + 1), 1000);
			} else {
				setTimeout(function () {
					clicOriginalContinue();
				}, 1000);
			}
		}

		clickButtonWithDelay(0);
	}

	function addButtonFake() {
		var container = document.querySelector('ac-extras-page .flex.justify-end');
		if (!document.querySelector('[data-test-id="FAKE-EXTRA-BUTTON"]') && container) {

			var buttonHTML = `
			<div class="rounded-primary-btn booking" data-test-id="FAKE-EXTRA-BUTTON">
			Continuar
			</div>
			`;

			container.insertAdjacentHTML('afterbegin', buttonHTML);

			var fakeButton = document.querySelector('[data-test-id="FAKE-EXTRA-BUTTON"]');
			if (fakeButton) {
				fakeButton.addEventListener('click', function() {
					console.log('Hola');
					clickFlexi();
				});
			}
		}
	}

	function clicOriginalContinue() {
		if (document.querySelector('[data-test-id="extras-submit-button"]')) {
			document.querySelector('[data-test-id="extras-submit-button"]').click();
		}
	}

	function allFunctions() {
		changeTextButton();
		insertFlexiParaTi();
		cambiarPosRutas();
		addEtiqueta();
		insertFlexiParaTiMobile();
		addHTML();
		addButtonFake();
	}

	if (BE >= 1) {
		addCSS();
		allFunctions();
	}
	
}, 600);