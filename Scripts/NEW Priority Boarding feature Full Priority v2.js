var initFullPriorityv2 = setInterval(function() {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Extras') return;
	clearInterval(initFullPriorityv2);

	var culture = bookingData.Culture;
	var ow = bookingData.Roundtrip;
	var pb = bookingData.PostBooking;
	var rutaEZE = ['EZE'];
	var outboundCity = bookingData.OutboundJourney.DepartureStationCode;
	var staff = JetSmart.AppContext.isStaff;

	function addCSS() {
		var css = `
		.booking-wrapper.extras-step.ts-priority-boarding.ts-error-container {
			position: relative;
		}
		.priority-boarding-img {
			position: absolute;
			top: 10px;
			right: 10px;
			height: auto;
			width: 150px;
		}
		`;
		var style = document.createElement('style');
		style.appendChild(document.createTextNode(css));
		document.head.appendChild(style);
	}

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

	function insertImage() {
		var img = document.createElement('img');
		var linkimg;
		
		switch (culture) {
		case 'en-US':
			linkimg = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/db1122fb-f4c8-4f9b-bc1b-15731238db92/NuevoEN.png';
			break;
		case 'pt-BR':
			linkimg = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/79b773ca-9403-4178-90a9-a71b221aebff/NuevoPT.png';
			break;
		default:
			linkimg = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/ab3778c8-ec7e-4169-9808-5a95a7fcb149/NuevoES.png';
		}
		img.src = linkimg;
		img.classList.add('priority-boarding-img');
		var container = document.querySelector('.booking-wrapper.extras-step.ts-priority-boarding.ts-error-container');
		container.appendChild(img);
	}
	
	function havePB() {
		let o = false
		bookingData.Passengers.forEach(function (a) {
			if (!o) {
				o = a.hasOwnProperty("OutboundJourneySsrs") && a.OutboundJourneySsrs && 
				(a.OutboundJourneySsrs.indexOf("PBD") !== -1 || a.OutboundJourneySsrs.indexOf("PBP") !== -1);
			}
		});
		return o;
	}

	function checkWebAnonymous() {
		if (bookingData.Role === "WWW Anonymous") {
			return true;
		} else {
			return false;
		}
	}

	if (ow === false && pb === true && outboundeEZE() === true && haveBAG() === true && havePB() === false && checkWebAnonymous() === true) {
	    addCSS();
		changeText();
		insertImage();
	} 

}, 600);