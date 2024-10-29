var newDesignBGOVERCTG = setInterval(function() {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Baggage') return;
	clearInterval(newDesignBGOVERCTG);

	var culture = bookingData.Culture;
	var rutas = ['CTG'];
	var staff = JetSmart.AppContext.isStaff;
	var postB = bookingData.PostBooking;

	function addCSS() {
		var css = `
		[data-test-id="baggage-oversized-title"] .js-bag-guitar-surf-golf, [data-test-id="baggage-oversized-title"], .b2-oversized-opener .b2-oversized-top-amount, .b2-oversized-opener .js-icon.js-circle-chevron-right {
			color: #fff;
		}

		.b2-oversized-grid .b2-per-pax-view-switch .b2-view-info, .b2-oversized-grid .b2-per-pax-view-switch .b2-pax-amount {
			color: #1C355E;
		}

		.b2-oversized-top {
			background-color: #B5104E !important;
			border-top-left-radius: 13px;
			border-top-right-radius: 13px;
		}

		.b2-oversized-grid {
			padding-bottom: 15px;
		}

		`
		,
		head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');
		head.appendChild(style);
		style.type = 'text/css';
		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
	}

	function changeText() {
		var element = document.querySelector('.ac-select-oversized-bag .b2-oversized-top-amount');
		if (element) {
			var newText;

			switch (culture) {
			case 'pt-BR':
				newText = 'Aproveite 50% de desconto, adicione a partir de';
				break;
			case 'en-US':
				newText = 'Take advantage of 50% off, add it from';
				break;
			default:
				newText = 'Aprovecha 50% de descuento, agrégalo desde';
				break;
			}

			var textsToReplace = ['Agrégalo desde', 'Add from', 'Adicionar de'];

			var textNode = Array.from(element.childNodes).find(node => 
				node.nodeType === Node.TEXT_NODE && textsToReplace.some(text => node.textContent.includes(text))
				);

			if (textNode) {
				textsToReplace.forEach(text => {
					if (textNode.textContent.includes(text)) {
						textNode.textContent = textNode.textContent.replace(text, newText);
					}
				});
			}
		}
	}

	function soloFecha(fecha) {
		var nuevaFecha = new Date(fecha);
		nuevaFecha.setHours(0, 0, 0, 0);
		return nuevaFecha;
	}

	function verificarFechaVuelos() {
		var fechaInicio = new Date('2024-08-15' + 'T00:00:00');
		var fechaFin = new Date('2024-08-19' + 'T23:59:59');

		var ida = soloFecha(bookingData.OutboundJourney.DepartureDate);
		if (bookingData.Roundtrip === true) {
			var vuelta = soloFecha(bookingData.ReturnJourney.DepartureDate);
			if (ida >= fechaInicio && ida <= fechaFin && vuelta >= fechaInicio && vuelta <= fechaFin) {
				return true;
			} else {
				return false;
			}
		} else {
			if (ida >= fechaInicio && ida <= fechaFin) {
				return true;
			} else {
				return false;
			}
		}
	}

	function verificarRutas() { 
		if (bookingData.OutboundJourney) {
			var outboundDeparture = bookingData.OutboundJourney.DepartureStationCode;
			var outboundArrival = bookingData.OutboundJourney.ArrivalStationCode;
			if (rutas.includes(outboundDeparture) || rutas.includes(outboundArrival)) {
				return true;
			} else {
				return false;
			}
		}
	}

	if (verificarFechaVuelos() && verificarRutas() && postB === false && staff === 'False') {
		addCSS();
		changeText();
	}

}, 600);