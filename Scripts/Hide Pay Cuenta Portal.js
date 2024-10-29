var hideCuentaPortalPagos = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/payment') return;
	clearInterval(hideCuentaPortalPagos);

	function verificarMontoDisponible() {
		var availableAmount = JetSmart.AppContext.peruCompraAvailableAmount;
		var totalAmount = bookingData.TotalPriceLocal;
		if (availableAmount && totalAmount && (availableAmount >= totalAmount)) {
			return true;
		} else {
			return false;
		}
	}

	function hideElement() {
		var element = document.querySelector('[for="payment_tab_AG"]');
		if (element) {
			var elementSelect = element.parentElement;
			elementSelect.style.display = "none";
		}
	}

	function esPortalEmpresasAgencias() {
		var element = bookingData.Role;
		if (element && element.includes('CUG2')) {
			return true;
		} else {
			return false;
		}
	}

	if (esPortalEmpresasAgencias() && !verificarMontoDisponible()) {
		hideElement();
	}
	
}, 600);