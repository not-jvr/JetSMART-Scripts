var initMochilaOArticulo = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/baggage') return;
	clearInterval(initMochilaOArticulo);

	var culture = bookingData.Culture;

	function addCSS() {
		var css = `
		.b2-dimensions2 {
			--text-opacity: 1;
			align-items: center;
			color: #6f6f6e;
			color: rgba(111,111,110,var(--text-opacity));
			display: flex;
			font-family: ClanOT-News,sans-serif;
			font-size: 10px;
			height: 20px;
			line-height: 1;
			margin-bottom: 8px;		}

			@media (max-width: 767px) {
				.b2-tooltip-opener {
					display: none;
				}

				.b2-baggage-page [type=radio]:checked+label:before, .b2-baggage-page [type=radio]:not(:checked)+label:before {
					top: 35%;
				}

				.b2-baggage-page [type=radio]:checked+label:after, .b2-baggage-page [type=radio]:not(:checked)+label:after {
					top: 35%;
				}

				.b2m-per-booking-section {
					padding: 15px 15px 15px 0px;
				}

				.b2m-per-booking-selector .b2m-label:before {
					display: none;
				}
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

		function changeName(selector) {

			var elemento = document.querySelector(selector);

			if (elemento) {
				switch (culture) {
				case 'en-US':
					elemento.innerHTML = 'Handbag or personal<br> item';
					break;
				case 'pt-BR':
					elemento.innerHTML = 'Mochila o artigo<br> pessoal';
					break;
				default:
					elemento.innerHTML = 'Mochila o artículo<br> personal';
					break;
				}
			}
		}

		function changeName2(selector) {

			var elemento = document.querySelector(selector);

			if (elemento) {
				switch (culture) {
				case 'en-US':
					elemento.innerHTML = 'Large cabin<br> bag';
					break;
				case 'pt-BR':
					elemento.innerHTML = 'Bagagem de<br> mão';
					break;
				default:
					elemento.innerHTML = 'Equipaje de<br> mano';
					break;
				}
			}
		}

		function changeNameMobile(selector) {

			var elemento = document.querySelector(selector);

			if (elemento) {
				switch (culture) {
				case 'en-US':
					elemento.innerHTML = 'Handbag or personal<br> item';
					break;
				case 'pt-BR':
					elemento.innerHTML = 'Mochila o artigo<br> pessoal';
					break;
				default:
					elemento.innerHTML = 'Mochila o artículo<br> personal y Equipaje<br> de mano';
					break;
				}
			}
		}

		function changeNameButton(selector) {
			var elemento = document.querySelector(selector);

			if (elemento) {

				switch (culture) {
				case 'en-US':
					elemento.innerHTML = 'Select';
					break;
				case 'pt-BR':
					elemento.innerHTML = 'Selecionar';
					break;
				default:
					elemento.innerHTML = 'Seleccionar';
					break;
				}
			}
		}

		function changeNameMobile(selector) {

			var elemento = document.querySelector(selector);

			if (elemento) {
				switch (culture) {
				case 'en-US':
					elemento.innerHTML = 'Handbag or personal<br> item and large<br> cabin bag';
					break;
				case 'pt-BR':
					elemento.innerHTML = 'Mochila o artigo<br> pessoal e bagagem<br> de mão';
					break;
				default:
					elemento.innerHTML = 'Mochila o artículo<br> personal y Equipaje<br> de mano';
					break;
				}
			}
		}

		function changeNameMobile2(selector) {
			var elemento = document.querySelector(selector);

			if (elemento) {
				switch (culture) {
				case 'en-US':
					elemento.innerHTML = 'Handbag or personal<br> item';
					break;
				case 'pt-BR':
					elemento.innerHTML = 'Mochila o artigo<br> pessoal';
					break;
				default:
					elemento.innerHTML = 'Mochila o artículo<br> personal';
					break;
				}
			}
		}

		function allChangeNamesMobile() {
			changeNameMobile('[data-test-id="baggage-per-journey-per-pax-add-first-button--j|0-p|0-c|CabinBaggage-m|1"]');
			changeNameMobile('[data-test-id="baggage-per-journey-per-pax-add-first-button--j|1-p|0-c|CabinBaggage-m|1"]');
			changeNameMobile2('[data-test-id="baggage-per-journey-per-pax-reset-button--j|0-p|0-c|CabinBaggage-m|1"]');
			changeNameMobile2('[data-test-id="baggage-per-journey-per-pax-reset-button--j|1-p|0-c|CabinBaggage-m|1"]');
		}



		function addDimension(selector) {
			if (!document.querySelector('#newdimension')) {
				var container = document.querySelector(selector);

				if (container) {
					var mensaje = '35cm x 25cm x 55cm'

					var newElement = document.createElement('div');
					newElement.id = 'newdimension';
      newElement.className = 'b2-dimensions2';  // Agrega la clase aquí
      newElement.innerHTML = `<span>${mensaje}</span>`;
      container.insertAdjacentElement('afterend', newElement);
  }
}
}

function changeDimensionFacturado() {
	var divElement = document.querySelector('[data-test-id="baggage-per-booking-free-illustration-dimensions--c|CheckedBaggage"]')

	if (divElement) {
		divElement.textContent = '158cm lineales';
	}
}

function hideTooltip(selector) {
	var tooltipElement = document.querySelector(selector);
	if (tooltipElement) {
		tooltipElement.style.display = 'none';
	}
}

function click1() {
	setTimeout(function() {
		var miElemento = document.querySelector('[data-test-id="baggage-open-per-journey-per-pax-view-button--c|CabinBaggage-m|1"]');

		if (miElemento) {
			miElemento.addEventListener('click', function() {
				console.log("Hola1");
				addDimension('[data-test-id="baggage-per-booking-reset-button--c|CabinBaggage-m|1"]');
				changeDimensionFacturado();
				click2();
				allChangeNamesMobile();

			});
		}
	}, 1000);
}

function click2() {
	setTimeout(function() {
		var miElemento = document.querySelector('[data-test-id="baggage-close-per-journey-per-pax-view-button--c|CabinBaggage-m|1"]');

		if (miElemento) {
			miElemento.addEventListener('click', function() {
				console.log("Hola2");
				addDimension('.b2m-per-booking-section.padded .b2m-label:nth-child(2)');
				changeDimensionFacturado();
				click1();
				allChangeNamesMobile();
			});
		}
	}, 1000);
}

function click3() {
	setTimeout(function() {
		var miElemento = document.querySelector('[data-test-id="baggage-open-per-journey-per-pax-view-button--c|CheckedBaggage-m|1"]');

		if (miElemento) {
			miElemento.addEventListener('click', function() {
				addDimension('.b2m-per-booking-section.padded .b2m-label:nth-child(2)');
				changeDimensionFacturado();
				click4();
				allChangeNamesMobile();
			});
		}
	}, 1000);
}

function click4() {
	setTimeout(function() {
		var miElemento = document.querySelector('[data-test-id="baggage-close-per-journey-per-pax-view-button--c|CheckedBaggage-m|1"]');

		if (miElemento) {
			miElemento.addEventListener('click', function() {
				addDimension('.b2m-per-booking-section.padded .b2m-label:nth-child(2)');
				changeDimensionFacturado();
				click3();
				allChangeNamesMobile();
			});
		}
	}, 1000);
}

function allFunctionsChangeNameDesktop() {
	changeName('[data-test-id="baggage-per-booking-free-illustration-name--c|CabinBaggage"]');
	changeName('[data-test-id="baggage-per-booking-paid-illustration-name--c|CabinBaggage"] .b2-bag-names');
	changeName2('[data-test-id="baggage-per-booking-paid-illustration-name--c|CabinBaggage"] .b2-bag-names:nth-child(2)')
	changeNameButton('[data-test-id="baggage-per-booking-reset-button--c|CabinBaggage"]');
}

allFunctionsChangeNameDesktop();
addDimension('.b2m-per-booking-section.padded .b2m-label:nth-child(2)');
changeDimensionFacturado();
click1();
click2();
click3();
click4();
addCSS();
window.eventBus.subscribe({
	name: "editNames", callback: function (e) {
		allFunctionsChangeNameDesktop();
	}
});

}, 600);