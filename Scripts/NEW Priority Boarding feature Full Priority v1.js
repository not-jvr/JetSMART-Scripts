var initFullPriorityv1 = setInterval(function() {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Extras') return;
	clearInterval(initFullPriorityv1);

	var culture = bookingData.Culture;
	var ow = bookingData.Roundtrip;
	var pb = bookingData.PostBooking;
	var rutaEZE = ['EZE'];
	var outboundCity = bookingData.OutboundJourney.DepartureStationCode;

	function outboundeEZE() {
		if (rutaEZE.includes(outboundCity)) {
			console.log("sale de eze");
			return true;
		} else {
			return false;
		}
	}

	function haveBAG() {
		let o = false
		bookingData.Passengers.forEach(function (a) {
			if (!o) {
				o = a.hasOwnProperty("OutboundJourneySsrs") && a.OutboundJourneySsrs && 
				(a.OutboundJourneySsrs.indexOf("BAGD") !== -1 || a.OutboundJourneySsrs.indexOf("BAGP") !== -1);
			}

		});

		return o;
	}

	function changeText() {
		var selectTitulo = document.querySelector('[data-test-id="extras-priority-boarding-container"] [data-test-id="extras-priority-boarding-title"]');
		var selectSubtitulo = document.querySelector('[data-test-id="extras-priority-boarding-container"] [data-test-id="extras-priority-boarding-subtitle"]');
		var titulo = 'Full Priority';
		var subtitulo;

		switch (culture) {
		case 'en-US':
			subtitulo = 'Avoid the lines by checking in your luggage with priority and also board the plane with priority boarding.';
			break;
		case 'pt-BR':
			subtitulo = 'Evite as filas despachando sua bagagem com prioridade e, além disso, embarque no avião com embarque prioritário.';
			break;
		default:
			subtitulo = 'Evita las filas entregando tu maleta con prioridad y además accede al avión con embarque prioritario.';
		}

		if (selectTitulo) {
			selectTitulo.textContent = titulo;
		}

		if (selectSubtitulo) {
			selectSubtitulo.textContent = subtitulo;
		}
	}

	if (ow === false && pb === true && outboundeEZE === true && haveBAG === true) {
		changeText();
	}

}, 600);