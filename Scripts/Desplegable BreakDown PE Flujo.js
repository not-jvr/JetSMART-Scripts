var autoClickBreakDownFlujo = setInterval(function() {
	if (typeof bookingData === "undefined" || (window.location.pathname !== '/V2/Passengers' && window.location.pathname !== '/V2/Baggage' && window.location.pathname !== '/Seat/Map' && window.location.pathname !== '/V2/Extras')) return;
	clearInterval(autoClickBreakDownFlujo);

	function autoClickSMARTFULL() {
		setTimeout(function () {
			var elementos = document.querySelectorAll('.bd-bundle-opener.open');

			elementos.forEach(function(elemento) {
				var texto = elemento.querySelector('span').textContent.trim();

				if (texto === "Pack SMART" || texto === "Pack FULL") {
					elemento.click();
				}
			});
		}, 1000);
	}

	function isPEComprasUser() {
		var culture = bookingData.Culture;
		var role = bookingData.Role;
		var promocode = bookingData.PromotionCode;

		if (culture === 'es-PE' && role.includes('PE Compras') && promocode === 'PE4ENTDC'){
			return true;
		}
		else {
			return false;
		}
	}

	if (isPEComprasUser()) {
		autoClickSMARTFULL();
	}

}, 600);