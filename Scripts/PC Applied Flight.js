var initNewPC = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
	clearInterval(initNewPC);

	var promoCode = bookingData.PromotionCode;
	var culture = bookingData.Culture;

	function addCSS() {
		var css = `
		.smart-fee .visible-xs.nowrap {
			display: none !important;
		}

		.smart-fee #precioFinal {
			background-color: #59c3d9;
			padding: 4px 8px;
			border-radius: 5px;
			color: #ffff;
		}

		#precioNumero {
			display: inline-block;
			font-size: 12px;
		}

		.newNormalPrice {
			font-size: 12px;
		}

		#newIconoPC {
			width: 20px;
			height: 20px;
		}

		#pcAplicado {
			font-size: 12px;
			margin-top: 3px;
		}
		
		#precioNumero {
			text-decoration: line-through;
		}
		`;

		var style = document.createElement('style');
		style.appendChild(document.createTextNode(css));
		document.head.appendChild(style);
	}

	function addIDFinal() {
		var elementos = document.querySelectorAll('.smart-fee .text-center');

		elementos.forEach(function(elemento) {
			if (!elemento.querySelector('#precioFinal')) {
				elemento.id = 'precioFinal';
			}
		});
	}

	function addNewNormalPrice() {
    var currency = getCurrentCurrency();
    var elementos = document.querySelectorAll('.smart-fee.nowrap.big');

    switch (culture) {
        case 'pt-BR':
            text1 = 'Preço normal ';
            break;
        case 'en-US':
            text1 = 'Regular price';
            break;
        default:
            text1 = 'Precio normal ';
            break;
    }

    elementos.forEach(function(elemento) {
        if (!elemento.querySelector('#precioNormal')) {
            var valorElement = elemento.querySelector('[data-value]');
            var valor = parseFloat(valorElement.getAttribute('data-value'));
            var nuevoHTML = `<div id="precioNormal" class="newNormalPrice">${text1}<span id="precioNumero">${formatCurrencyValue(valor, currency)}</span></div>`;
            elemento.insertAdjacentHTML('afterbegin', nuevoHTML);
        }
    });
}


	function addIcono() {
		var elementos = document.querySelectorAll('.smart-fee.nowrap.big');

		elementos.forEach(function(elemento) {
			var precioFinalElemento = elemento.querySelector('#precioFinal');
			if (precioFinalElemento && !precioFinalElemento.querySelector('#newIconoPC')) {
				var nuevoHTML = `<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/f5b249fe-122d-468c-bb23-b87819ce067d/%25descuento.png" id="newIconoPC">`;
				precioFinalElemento.insertAdjacentHTML('beforeend', nuevoHTML);
			}
		});
	}

	function addPCAplicado() {
		var elementos = document.querySelectorAll('.smart-fee .text-center');
		switch (culture) {
		case 'pt-BR':
			text1 = 'Código promocional aplicado';
			break;
		case 'en-US':
			text1 = 'Promotional code applied';
			break;
		default:
			text1 = 'Código promocional aplicado';
			break;
		}

		elementos.forEach(function(elemento) {
			if (!elemento.nextElementSibling || elemento.nextElementSibling.id !== 'pcAplicado') {
				var nuevoHTML = `<div id="pcAplicado">${text1}</div>`;
				elemento.insertAdjacentHTML('afterend', nuevoHTML);
			}
		});
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

	function allFunctions() {
		addCSS();
		addIDFinal();
		addIcono();
		addNewNormalPrice();
		addPCAplicado();
	}

	if (promoCode !== null) {
		allFunctions();
		window.eventBus.subscribe({
			name: "newBD",
			callback: function (e) {
				allFunctions();
			},
		});
	}
	
}, 600);