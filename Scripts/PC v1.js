var initNewPC = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
	clearInterval(initNewPC);

	var promoCode = bookingData.PromotionCode;
	var culture = bookingData.Culture;

	function addCSS() {
		var css = `
		#precioElemento {
			background-color: #59c3d9;
			padding: 0px 0px 0px 2px;
			border-radius: 5px;
			color: #ffff;
			border-bottom-right-radius: 0px;
			border-top-right-radius: 0px;
			font-size: 23px;
			display: inline-block;
			vertical-align: middle;
		}

		.newIconoPC {
			background-color: #59c3d9;
			padding: 3px 0px 4px 0px;
			border-radius: 5px;
			color: #ffff;
			width: 25px;
			height: auto;
			border-bottom-left-radius: 0px;
			border-top-left-radius: 0px;
			display: inline-block;
			vertical-align: middle;
		}

		.precioNormal {
			font-size: 12px;
			display: block;
			position: relative;
			top: 3px;
			color: #163a70;
			font-size: 10px;
		}

		#modificado:hover .precioNormal {
			color: #fff;
		}

		.codigoPromocional {
			font-size: 12px;
			margin-top: 3px;
			display: block;
			position: relative;
			bottom: 8px;
			color: #59c3d9;
			font-weight: 600;
			font-size: 10px;
		}

		.precioContainer {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;
			top: 2px;
		}

		.precioRow {
			display: flex;
			align-items: center;
		}

		#precioNumero {
			text-decoration: line-through;
		}

		.h-full {
			height: 103%;
		}
		`;

		var style = document.createElement('style');
		style.appendChild(document.createTextNode(css));
		document.head.appendChild(style);
	}

	function getCurrentCurrency() {
		var currencyElement = document.querySelector(".flight-currency-select");
		if (currencyElement) {
			return currencyElement.value;
		} else {
			var currencyElementAE = document.querySelector('[data-test-id="sidebar-total-currency"]');
			var currencyAE = currencyElementAE.textContent.trim();

			if (currencyAE === 'CLP' || currencyAE === 'COP' || currencyAE === 'SOL' || currencyAE === 'USD' || currencyAE === 'ARS') {
				return currencyAE;
			} else {
				currencyAE = 'BRL'
				return currencyAE;
			}
		}
	}

	function formatCurrencyValue(value, currency) {
		switch (currency) {
		case "CLP":
			return "$" + value.toLocaleString('es-CL', { minimumFractionDigits: 0 });
		case "BRL":
			return "R$" + value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
		case "COP":
			return "$" + value.toLocaleString('es-CO', { minimumFractionDigits: 0 });
		case "PEN":
			return "S/" + value.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
		case "USD":
			return "$" + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
		case "ARS":
			return "$" + value.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
		default:
			return "" + value;
		}
	}

	function addIDToPrice() {
		var elementos = document.querySelectorAll('[data-test-id^="flight-smart-fee--j"]');

		elementos.forEach(function(elemento) {
			if (elemento.id !== 'modificado') {
				var precioElemento = elemento.children[1];
				if (precioElemento && !precioElemento.id) {
					precioElemento.id = 'precioElemento';
				}
			}
		});
	}

	function addClassFinal() {
		var elementos = document.querySelectorAll('[data-test-id^="flight-smart-fee--j"]');

		elementos.forEach(function(elemento) {
			if (elemento.id !== 'modificado') {
				if (!elemento.classList.contains('precioFinal')) {
					elemento.classList.add('precioFinal');
				}
			}
		});
	}

	function addFrontChanges() {
		var elementos = document.querySelectorAll('.precioFinal');

		elementos.forEach(function(elemento) {
			if (!elemento.querySelector('.precioContainer')) {
				switch (culture) {
				case 'pt-BR':
					text1 = 'Preço normal ';
					tex2 = 'Código promocional aplicado';
					break;
				case 'en-US':
					text1 = 'Regular price';
					tex2 = 'Promotional code applied';
					break;
				default:
					text1 = 'Precio normal ';
					tex2 = 'Código promocional aplicado';
					break;
				}
				var currency = getCurrentCurrency();
				var valor = parseFloat(elemento.getAttribute('data-value'));
				var precioElemento = elemento.querySelector('#precioElemento');
				var precio = precioElemento ? precioElemento.innerText : '';
				var precioNormalHTML = `<div class="precioNormal">${text1} ${formatCurrencyValue(valor, currency)}</div>`;
				var codigoPromocionalHTML = `<div class="codigoPromocional">${tex2}</div>`;
				var iconoHTML = `<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/f5b249fe-122d-468c-bb23-b87819ce067d/%25descuento.png" class="newIconoPC">`;
				var precioRowHTML = `<div class="precioRow">${precioElemento.outerHTML}${iconoHTML}</div>`;

				precioElemento.outerHTML = '';

				elemento.insertAdjacentHTML('beforeend', `<div class="precioContainer">${precioNormalHTML}${precioRowHTML}${codigoPromocionalHTML}</div>`);
			}
		});

		elementos.forEach(function(elemento) {
			elemento.id = 'modificado';
		});
	}

	function allFunctions() {
		addIDToPrice();
		addClassFinal();
		addFrontChanges();
	}

	addCSS();
	allFunctions();
	if (1 === 1) {
		allFunctions();
		window.eventBus.subscribe({
			name: "newBD",
			callback: function (e) {
				allFunctions();
			},
		});
	}

}, 600);