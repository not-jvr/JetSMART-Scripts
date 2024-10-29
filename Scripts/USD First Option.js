var initUSDFirst = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
	clearInterval(initUSDFirst);

	var culture = bookingData.Culture;

	function usdFirst(){
		var selectElement = document.querySelector('[data-test-id="sidebar-total"] .flight-currency-select.change-moneda');
		if(selectElement){
			var optionUSD = selectElement.querySelector('option[value="USD"]');
			if(optionUSD){
				selectElement.prepend(optionUSD);
			}
		}
	}
	
	if(culture === 'es-PE'){
		usdFirst();
		window.eventBus.subscribe({
			name: "usdFirstOption", callback: function (e) {
				usdFirst();
			}
		});
	}
	
}, 600);