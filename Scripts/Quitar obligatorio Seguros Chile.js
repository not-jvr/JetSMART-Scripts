var initHideRuts = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/extras') return;
	clearInterval(initHideRuts);

	var postB = bookingData.PostBooking;

	function addCSS() {
		var css = `
		.insurance-pasenger-doctype {
			display: none !important;
		}

		.insurance-pasenger-docnumber {
			display: none !important;
		}

		.insurance-passenger-tick {
			display: none !important;
		}
		`;

		var style = document.createElement('style');
		style.appendChild(document.createTextNode(css));
		document.head.appendChild(style);
	}

	function rellenarCampo(elemento, valor) {
		elemento.click();

		var input = elemento.querySelector('input');
		input.value = valor;

		var inputEvent = new Event('input', { bubbles: true });
		var changeEvent = new Event('change', { bubbles: true });

		input.dispatchEvent(inputEvent);
		input.dispatchEvent(changeEvent);
	}

	function addRuts() {
		var elementos = document.querySelectorAll('.insurance-pasenger-docnumber');

		for (var i = 0; i < elementos.length; i++) {
			var valor = (i + 1).toString().repeat(9);
			rellenarCampo(elementos[i], valor);
		}
	}

	if (document.querySelector('[data-test-id="extras-insurance-version"]') && postB === false) {
		addCSS();
		addRuts();
		window.eventBus.subscribe({
			name: "newBD",
			callback: function (e) {
				addRuts();
			},
		});
	}

}, 600);