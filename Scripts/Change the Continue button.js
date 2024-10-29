var initChangeButtonContinueText = setInterval(function () {
	if (typeof bookingData == "undefined" || (window.location.pathname !== '/V2/Flight' && window.location.pathname !== '/V2/Passengers' && window.location.pathname !== '/V2/Baggage' && window.location.pathname !== '/Seat/Map' && window.location.pathname !== '/V2/Extras')) return;
	clearInterval(initChangeButtonContinueText);

	var culture = bookingData.Culture;
	var pb = bookingData.PostBooking;
	var staff = bookingData.Role;

	function cambiarTextoBoton() {
		setTimeout(function() {
			var botonContinuar = document.querySelector('[data-test-id="flight-continue-button"]');
			if (botonContinuar) {
				if (culture === 'en-US') {
					botonContinuar.textContent = 'Go to Passengers';
				} else if (culture === 'pt-BR') {
					botonContinuar.textContent = 'Ir para Passageiros';
				} else {
					botonContinuar.textContent = 'Ir a Pasajeros';
				}
			}

			var botonPasajeros = document.querySelector('[data-test-id="passengers-submit-button"]');
			if (botonPasajeros) {
				if (culture === 'en-US') {
					botonPasajeros.textContent = 'Go to Baggage';
				} else if (culture === 'pt-BR') {
					botonPasajeros.textContent = 'Ir para Bagagem';
				} else {
					botonPasajeros.textContent = 'Ir a Equipaje';
				}
			}

			var botonEquipaje = document.querySelector('[data-test-id="baggage-submit-button"]');
			if (botonEquipaje) {
				if (culture === 'en-US') {
					botonEquipaje.textContent = 'Go to Seats';
				} else if (culture === 'pt-BR') {
					botonEquipaje.textContent = 'Ir para Assentos';
				} else {
					botonEquipaje.textContent = 'Ir a Asientos';
				}
			}

			var botonExtras = document.querySelector('[data-test-id="extras-submit-button"]');
			if (botonExtras) {
				if (culture === 'en-US') {
					botonExtras.textContent = 'Go to Payment';
				} else if (culture === 'pt-BR') {
					botonExtras.textContent = 'Ir para Pagamento';
				} else {
					botonExtras.textContent = 'Ir a Pagar';
				}
			}
		}, 1500);
	}

	if (culture !== 'en-US' && culture !== 'pt-BR' && pb === false && staff !== 'EMPL') {
		cambiarTextoBoton();
		setTimeout(function() {
			cambiarTextoBoton();
		}, 1500);
		window.eventBus.subscribe({
			name: "textContinueButtons",
			callback: function (e) {
				cambiarTextoBoton();
				setTimeout(function() {
					cambiarTextoBoton();
				}, 1500);
			},
		});
	}

}, 600);