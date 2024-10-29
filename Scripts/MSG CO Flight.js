var initMSGCO = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/flight') return;
	clearInterval(initMSGCO);

	var culture = bookingData.Culture;

	function addCSS() {
		var css = `
		.MSGCO {
			font-size: 11px;
			text-align: center;
			color: #163a70;
			font-weight: 700;
			margin: 0 20px 10px 20px;
		}

		[data-test-id="flight-header--j|0"] {
			margin: 0px auto 10px !important;
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

	function addTopMSG() {
		if (!document.querySelector('.MSGCO') && document.querySelector('[data-test-id="flight-header--j|0"]')) {
			var mainHeader = document.querySelector('[data-test-id="flight-header--j|0"]');
			mensaje = '<div class="MSGCO">Los precios informados no incluyen tasas de embarque, ni impuestos. Cuando selecciones los vuelos, el precio total se actualizará e incluirá los costos adicionales.</div>';
			mainHeader.insertAdjacentHTML('afterend', mensaje);
		}
	}

	if (culture === 'es-CO') {

		addCSS();
		addTopMSG();

		window.eventBus.subscribe({
			name: "msgCO",
			callback: function (e) {
				addTopMSG();
			}
		});

	}

}, 600);