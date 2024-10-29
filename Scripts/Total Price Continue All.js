var initTotalPriceContinueAll = setInterval(function () {
	if (typeof bookingData === "undefined" || (window.location.pathname.toLowerCase() !== '/v2/passengers' && window.location.pathname.toLowerCase() !== '/v2/baggage' && window.location.pathname.toLowerCase() !== '/seat/map' && window.location.pathname.toLowerCase() !== '/v2/extras')) return;
	clearInterval(initTotalPriceContinueAll);

	var culture = bookingData.Culture;
	var postBooking = bookingData.PostBooking;

	function addCSS() {
		var css = `
		.price-continue {
			font-size: 14px;
			text-align: right;
			margin: 0.5% 0 0 0;
			color: #163a70;
		}

		.price-continue strong {
			font-weight: 700;
			font-size: 16px;
		}

		@media (max-width: 767px) {
			.price-continue {
				margin: 0 0 0 0;
				text-align: center;
			}
		}
		`;

		var head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');

		head.appendChild(style);

		style.type = 'text/css';
		if (style.styleSheet){
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
	}

	function addPriceMSG(selector, id) {
		var maxAttempts = 10;
		var attemptCount = 0;

		var intervalId = setInterval(function() {
			var container = document.querySelector(selector);

			if (container) {
				clearInterval(intervalId);
				var precio = price();
				var total = 'Total ';
				if (postBooking) {
					var tasas = '';
				} else {
					var tasas = ' Tasas incluidas';
				}

				switch (culture) {
				case "en-US":
					total = 'Total ';
					if (postBooking) {
						tasas = '';
					} else{
						tasas = ' Fees included';
					}
					break;
				case "pt-BR":
					total = 'Total ';
					if (postBooking) {
						tasas = '';
					} else {
						tasas = ' Taxas incluídas';
					}
					break;
				}

				var mensaje = '<div class="price-continue" id="' + id + '">' + total + ' <strong>' + precio + '</strong> ' + tasas + '</div>';

				if (!document.querySelector('#' + id) && container) {
					container.insertAdjacentHTML('afterend', mensaje);
				} else {
					updatePrices();
				}
			} else {
				attemptCount++;
				if (attemptCount >= maxAttempts) {
					clearInterval(intervalId);
				}
			}
		}, 1000);
	}

	function price() {
		var elemento = document.querySelector('[data-test-id="sidebar-total-amount-value"]');
		if (elemento) {
			var nodosDeTexto = [...elemento.childNodes].filter(node => node.nodeType === Node.TEXT_NODE);

			var precio = nodosDeTexto.map(node => node.textContent.trim()).join(' ');

			return precio;
		}
	}

	function updatePrices() {
		var precio = price();
		var priceElements = document.querySelectorAll('.price-continue strong');

		priceElements.forEach(function(element) {
			element.textContent = precio;
		});
	}

	function allMSG() {
		addPriceMSG('.passengers-button-container', 'price-passengers');
		addPriceMSG('ac-baggage-page .w-full.flex.justify-end', 'price-baggage');
		addPriceMSG('ac-extras-page .flex.justify-end', 'price-extras');
	}

	addCSS();
	allMSG();
	window.eventBus.subscribe({
		name: "totalPriceAll",
		callback: function (e) {
			allMSG();
		}
	});

}, 600);