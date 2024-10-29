var initNewPriceBundle = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
	clearInterval(initNewPriceBundle);

	var culture = bookingData.Culture;

	function addCSS() {
		var css = `
		.precioOriginal {
			text-align: center;
			color: #757575;
			font-weight: 900;
			font-size: 16px;
		}

		@media (max-width: 767px) {

			.precioOriginal {
				font-size: 15px;
				margin-top: 15px;
			}

			[data-test-id="bundle-selector-option--j|0-c|simple"] .precioOriginal{
				color: #fff;
			}

			[data-test-id="bundle-selector-option--j|0-c|full"] .precioOriginal{
				color: #fff;
			}

			[data-test-id="bundle-selector-option--j|1-c|simple"] .precioOriginal{
				color: #fff;
			}

			[data-test-id="bundle-selector-option--j|1-c|full"] .precioOriginal{
				color: #fff;
			}

			.bundle-content .bundle-header .bundle-price.no-bundle {
				margin-top: 0;
			}
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

	function addHTMLDesktop(selector) {
		var currency = getCurrentCurrency();
		var precioOriginalSinValue = document.querySelector(`[data-test-id="bundle-price--j|${selector}-c|none"]`);

		if (precioOriginalSinValue) {
			var precioOriginal = parseFloat(precioOriginalSinValue.getAttribute('data-test-value'));
			var precioFinal = formatCurrencyValue(precioOriginal, currency);

			var bundleFooters = document.querySelectorAll(`[data-test-id="bundle-selector--j|${selector}"] .bundles-container.hidden-xs .bundle-footer`);

			bundleFooters.forEach(function(footer) {
				var existingPrecioOriginal = footer.querySelector('.precioOriginal');

				if (existingPrecioOriginal) {
					existingPrecioOriginal.textContent = precioFinal;
				} else {
					var nuevoHTML = `<div class="precioOriginal">${precioFinal}</div>`;
					footer.insertAdjacentHTML('afterbegin', nuevoHTML);
				}
			});
		}
	}

	function addHTMLMobile(selector) {
		var currency = getCurrentCurrency();
		var precioOriginalSinValue = document.querySelector(`[data-test-id="bundle-price--j|${selector}-c|none"]`);

		if (precioOriginalSinValue) {
			var precioOriginal = parseFloat(precioOriginalSinValue.getAttribute('data-test-value'));
			var precioFinal = formatCurrencyValue(precioOriginal, currency);

			var bundleMobile = document.querySelectorAll(`[data-test-id="bundle-selector--j|${selector}"] .bundles-container.hidden-sm-up .bundle-header`);

			bundleMobile.forEach(function(mobile) {
				var existingPrecioOriginal = mobile.querySelector('.precioOriginal');

				if (existingPrecioOriginal) {
					existingPrecioOriginal.textContent = precioFinal;
				} else {
					var imgElement = mobile.querySelector('.header-img');
					var nuevoHTML = `<div class="precioOriginal">${precioFinal}</div>`;
                imgElement.insertAdjacentHTML('afterend', nuevoHTML); // Cambio aquí
            }
        });
		}
	}

	function allFunctions() {
		addHTMLDesktop(0);
		addHTMLDesktop(1);
		addHTMLMobile(0);
		addHTMLMobile(1);
	}

	if (culture && JetSmart.AppContext.isCug2Member === 'False') {
		addCSS();
		allFunctions();
		window.eventBus.subscribe({
			name: "newPrice",
			callback: function (e) {
				allFunctions();
			},
		});
	}

}, 600);