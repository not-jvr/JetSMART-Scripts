var initForceInsurance = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/extras') return;
	clearInterval(initForceInsurance);

	var culture = bookingData.Culture;

	function addCSS() {
		var css = `
		.alert-seguro {
			background: #e299a1;
			border-radius: 5px;
			color: #163a6f;
			display: inline-block;
			font-size: 14px;
			margin: auto;
			padding: 10px 25px;
		}

		.data-opener-button-container {
			flex-direction: column;
		}

		.button-no-seguro {
			text-decoration: underline;
			cursor: pointer;
		}

		#container-no-seguro {
			margin: 12px auto;
		}

		.insurance-data-opener.invalid {
			background: #f9d4d8;
			border: 1px solid #e299a1;
		}

		.modal.extras-insurance-modal {
			display: none;
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

	function addButton() {
		var botonExistente = document.querySelector('ac-insurance-passenger-insurance-selector .rounded-primary-btn.white-blue');
		if (botonExistente) {
			if (!document.querySelector('#container-no-seguro')) {
				var nuevoBotonHTML = '<div id="container-no-seguro"><div class="button-no-seguro">No quiero contratar seguro</div></div>';

				botonExistente.insertAdjacentHTML('afterend', nuevoBotonHTML);
				clickNoQuieroSeguro();
			}
		}
	}

	function removeButton() {
		var botonNoQuieroSeguro = document.querySelector('#container-no-seguro');
		var botonRemoveSeguro = document.querySelector('ac-insurance-passenger-insurance-selector .rounded-primary-btn.with-x-logo.blue-white');
		if (botonNoQuieroSeguro && botonRemoveSeguro) {
			botonNoQuieroSeguro.remove();
		}
	}

	function clickContinue() {
		var continueButton = document.querySelector('[data-test-id="extras-submit-button"]');

		if (continueButton) {
			continueButton.addEventListener('click', function() {
				addInvalidClass();
				addAlert();
				verificarRut();
			});
		}
	}

	function addAlert() {
		var botonExistente = document.querySelector('#container-no-seguro');
		if (botonExistente) {
			if (!document.querySelector('.alert-seguro')) {
				var nuevoBotonHTML = '<div class="alert-seguro"><!---->Debes seleccionar tu opción<!----></div>';
				botonExistente.insertAdjacentHTML('afterend', nuevoBotonHTML);
			}
		}
	}

	function removeAlert() {
		var botonExistente = document.querySelector('.alert-seguro');
		var botonRemoveSeguro = document.querySelector('ac-insurance-passenger-insurance-selector .rounded-primary-btn.with-x-logo.blue-white');
		if (botonExistente && botonRemoveSeguro) {
			botonExistente.remove();
		}
	}

	function removeAlert2() {
		var botonExistente = document.querySelector('.alert-seguro');
		if (botonExistente) {
			botonExistente.remove();
		}
	}

	function addInvalidClass() {
		var element = document.querySelector('.insurance-data-opener');
		var addSeguro = document.querySelector('ac-insurance-passenger-insurance-selector .rounded-primary-btn.white-blue');

		if (element && addSeguro) {
			element.classList.add('invalid');
		}
	}

	function removeInvalidClass() {
		var element = document.querySelector('.insurance-data-opener');
		var botonRemoveSeguro = document.querySelector('ac-insurance-passenger-insurance-selector .rounded-primary-btn.with-x-logo.blue-white');

		if (element && botonRemoveSeguro) {
			element.classList.remove('invalid');
		}
	}

	function removeInvalidClass2() {
		var element = document.querySelector('.insurance-data-opener');

		if (element) {
			element.classList.remove('invalid');
		}
	}

	function clickNoQuieroSeguro() {
		var continueButton = document.querySelector('.button-no-seguro');
		var continueButton2 = document.querySelector('[data-test-id="extras-submit-button"]');
		
		if (continueButton) {
			continueButton.addEventListener('click', function() {
				continueButton2.click();
				removeAlert2();
				removeInvalidClass2();
				setTimeout(function () {
					cerrarModal();
				}, 500);
			});
		}
	}

	function cerrarModal() {
		var modalX = document.querySelector('[data-test-id="insurance-modal-close-button"]');

		if (modalX) {
			modalX.click();
		}
	}

	function actualizarMensajeError(elemento, index) {
		var errorExistente = document.querySelector(`[data-test-id="extras-insurance-passenger--p|${index}"] .ts-udf-error.error-message-container`);
		var ticket = document.querySelector(`[data-test-id="extras-tick-icon--p|${index}"]`);

		if (elemento) {
			if (ticket && errorExistente) {
				errorExistente.remove();
			} else if (!ticket && !errorExistente) {
				var htmlString = `<div class="ts-udf-error error-message-container"><span data-test-id="common-form-field-error--c|docNumberFormat">Rut inválido, por favor verifica que el rut es correcto y que el formato sea válido. (Ej: 76472472-0)</span></div>`;
				elemento.insertAdjacentHTML('afterend', htmlString);
			}
		}
	}

	function verificarRut() {
		var elementosRut = document.querySelectorAll('input[data-test-id^="passengers-doc-number--p|"]');

		elementosRut.forEach((elemento, index) => {
			actualizarMensajeError(elemento, index);
		});
	}

	if (culture === 'es-CL') {
		addCSS();
		window.eventBus.subscribe({
			name: "forceSelectInsurance",
			callback: function(e) {
				addButton();
				removeButton();
				removeAlert();
				removeInvalidClass();
				clickContinue();
			}
		});
	}

}, 1000);