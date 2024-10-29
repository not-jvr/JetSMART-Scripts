var hideWWDC = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/payment') return;
	clearInterval(hideWWDC);

	var culture = bookingData.Culture;

	function hidePaymentButtons() {
		var button = document.querySelector('label[for="payment_tab_WW"]');
		if (button) {
			button.parentNode.style.display = 'none';
		}
	}

	function flujoDCPayment() {
		var sidebarInfoElement = document.querySelector('.dc-standalone-sidebar-info');
		if (sidebarInfoElement) {
			var expectedText = "Estás a un paso de ser parte del";
			var actualText = sidebarInfoElement.textContent.trim();

			if (actualText.includes(expectedText)) {
				return true;
			} else {
				return false;
			}
		}
	}

	if (culture === 'es-AR' && flujoDCPayment()) {
		hidePaymentButtons();	
	}

}, 600);