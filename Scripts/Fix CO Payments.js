var fixPaymentsCO = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/payment') return;
	clearInterval(fixPaymentsCO);

	var culture = bookingData.Culture;

	function editInfoButtons(selector, text) {
		var labelElement = document.querySelector(selector);
		if (labelElement) {
			var spanElement = labelElement.querySelector('span');
			if (spanElement) {
				spanElement.innerText = text;
			}
		}
	}

	function clickChangeCountry() {
		var container = document.querySelector('ac-input-issuer-country');

		container.addEventListener('click', function() {
			allFunctions();
		});
	}

	function allFunctions() {
		editInfoButtons('label[data-test-id="payment-method-selector-icon-label--c|WW"]', 'Tarjeta de Débito USD');
		editInfoButtons('label[data-test-id="payment-method-selector-icon-label--c|MB"]', 'Tarjeta de Débito COP');
		editInfoButtons('label[data-test-id="payment-method-selector-icon-label--c|WorldPay"]', 'Tarjeta de Crédito USD');
		editInfoButtons('label[data-test-id="payment-method-selector-icon-label--c|ME"]', 'Tarjeta de Crédito COP');
	}

	if (culture === 'es-CO') {
		allFunctions();
		clickChangeCountry();
	}
	
}, 600);