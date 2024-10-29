var hideMasVendido = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/baggage') return;
	clearInterval(hideMasVendido);

	var culture = bookingData.Culture;

	function addCSS(){
		var css = `
		[data-test-id="baggage-per-booking-paid-illustration-ribbon--c|CabinBaggage"] {
			display: none;
		}

		[data-test-id="baggage-per-booking-paid-illustration-ribbon--c|CabinBaggage-m|1"] {
			display: none;
		}

		ac-select-cabin-bag ac-per-journey-per-pax-mobile .b2-illustration-ribbon {
			display: none;
		}
		`,
		head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');

		head.appendChild(style);

		style.type = 'text/css';
		if (style.styleSheet){
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));	
		}
	}

	if (culture === 'es-CL') {
		addCSS();
	}

}, 600);