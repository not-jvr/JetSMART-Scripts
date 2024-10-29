var fixEditButtonBaggageMobile = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Baggage') return;
	clearInterval(fixEditButtonBaggageMobile);

	function click1() {
		setTimeout(function() {
			var miElemento = document.querySelector('[data-test-id="baggage-open-per-journey-per-pax-view-button--c|CabinBaggage-m|1"]');

			if (miElemento) {
				miElemento.addEventListener('click', function() {
					console.log("Hola1");
					click2();
				});
			}
		}, 500);
	}

	function click2() {
		setTimeout(function() {
			var miElemento = document.querySelector('[data-test-id="baggage-close-per-journey-per-pax-view-button--c|CabinBaggage-m|1"]');

			if (miElemento) {
				miElemento.addEventListener('click', function() {
					console.log("Hola2");
					var newButton = document.querySelector('[data-test-id="baggage-close-per-journey-per-pax-view-button--c|CabinBaggage"]');
					if (newButton) {
						newButton.click();
					}
					click1();
				});
			}
		}, 500);
	}

	function click3() {
		setTimeout(function() {
			var miElemento = document.querySelector('[data-test-id="baggage-open-per-journey-per-pax-view-button--c|CheckedBaggage-m|1"]');

			if (miElemento) {
				miElemento.addEventListener('click', function() {
					console.log("Hola3");
					click4();
				});
			}
		}, 500);
	}

	function click4() {
		setTimeout(function() {
			var miElemento = document.querySelector('[data-test-id="baggage-close-per-journey-per-pax-view-button--c|CheckedBaggage-m|1"]');

			if (miElemento) {
				miElemento.addEventListener('click', function() {
					console.log("Hola4");
					var newButton = document.querySelector('[data-test-id="baggage-close-per-journey-per-pax-view-button--c|CheckedBaggage"]');
					if (newButton) {
						newButton.click();
					}
					click3();
				});
			}
		}, 500);
	}

	function allClicks() {
		click1();
		click2();
		click3();
		click4();
	}

	var buttonEditCabin = document.querySelector('[data-test-id="baggage-close-per-journey-per-pax-view-button--c|CabinBaggage-m|1"]')
	var buttonEditBodega = document.querySelector('[data-test-id="baggage-close-per-journey-per-pax-view-button--c|CheckedBaggage-m|1"]')

	///OCULTAR ESTOS Y CREAR BOTONES NUEVOS Q HAGAN EL OTRO CLIC AL Q YA ESTÁ///

	allClicks();

}, 600);