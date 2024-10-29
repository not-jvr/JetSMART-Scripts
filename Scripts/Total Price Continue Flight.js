var initTotalPriceContinueFlight = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/flight') return;
	clearInterval(initTotalPriceContinueFlight);

	var culture = bookingData.Culture;
	var postBooking = bookingData.PostBooking;

	function addCSS() {
		var css = `
		.price-continue {
			font-size: 14px;
			text-align: right;
			margin: 0.5% 7% 0 0;
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

	function addPriceMSG() {
		var container = document.querySelector('.flight-button-container');
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

		var mensaje = '<div class="price-continue">'+ total + ' <strong>' + precio + '</strong> ' + tasas +'</div>';

		if (!document.querySelector('.price-continue') && container) {
			container.insertAdjacentHTML('afterend', mensaje);
		} else {
			updatePrice();
		}
	}

	function price() {
		var elemento = document.querySelector('[data-test-id="sidebar-total-amount-value"]');
		if (elemento) {
			var nodosDeTexto = [...elemento.childNodes].filter(node => node.nodeType === Node.TEXT_NODE);

			var precio = nodosDeTexto.map(node => node.textContent.trim()).join(' ');

			return precio;
		}
	}

	function updatePrice() {
		setTimeout(function() {
			var precio = price();
			var priceElement = document.querySelector('.price-continue strong');
			priceElement.textContent = precio;
		}, 3000);
	}

	addCSS();
	addPriceMSG();

	window.eventBus.subscribe({
		name: "totalPriceFlights",
		callback: function (e) {
			console.log("evento");
			addPriceMSG();
		}
	});

}, 600);