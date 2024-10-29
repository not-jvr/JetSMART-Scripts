var initNewPCv2 = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
	clearInterval(initNewPCv2);

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
			top: 7px;
		}

		.precioRow {
			display: flex;
			align-items: center;
		}

		@media (max-width: 767px){
			.newIconoPC {
				width: 20px;
				padding: 2px 0px 2px 0px;
			}
		}
		`;

		var style = document.createElement('style');
		style.appendChild(document.createTextNode(css));
		document.head.appendChild(style);
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
					tex2 = 'Código promocional aplicado';
					break;
				case 'en-US':
					tex2 = 'Promotional code applied';
					break;
				default:
					tex2 = 'Código promocional aplicado';
					break;
				}
				var valor = parseFloat(elemento.getAttribute('data-value'));
				var precioElemento = elemento.querySelector('#precioElemento');
				var precio = precioElemento ? precioElemento.innerText : '';
				var codigoPromocionalHTML = `<div class="codigoPromocional">${tex2}</div>`;
				var iconoHTML = `<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/f5b249fe-122d-468c-bb23-b87819ce067d/%25descuento.png" class="newIconoPC">`;
				var precioRowHTML = `<div class="precioRow">${precioElemento.outerHTML}${iconoHTML}</div>`;

				precioElemento.outerHTML = '';

				elemento.insertAdjacentHTML('beforeend', `<div class="precioContainer">${precioRowHTML}${codigoPromocionalHTML}</div>`);
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

	function soloFecha(fecha) {
		var nuevaFecha = new Date(fecha);
		nuevaFecha.setHours(0, 0, 0, 0);
		return nuevaFecha;
	}

	function verificarAP(dias) {
		var ida = soloFecha(bookingData.AvailableOutboundJourneys[0].DepartureDate);
		var hoy = new Date();
		hoy.setHours(0, 0, 0, 0);
		var diferenciaMilisegundos = ida - hoy;
		var diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);
		if (diferenciaDias >= dias) {
			return true;
		} else {
			return false;
		}
	}

	function verificarPC(PC) {
		var promoCode = bookingData.PromotionCode;
		if (promoCode && promoCode === PC) {
			return true;
		} else {
			return false;
		}
	}

	function verificarFechaVuelos(fecha1, fecha2) { //AÑO-MES-DIA 2024-06-20
		var fechaInicio = new Date(fecha1 + 'T00:00:00');
		var fechaFin = new Date(fecha2 + 'T23:59:59');

		var ida = soloFecha(bookingData.AvailableOutboundJourneys[0].DepartureDate);

		if (bookingData.Roundtrip === true) {
			var vuelta = soloFecha(bookingData.AvailableReturnJourneys[0].DepartureDate);
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

	function verificarFechaCompra(fechaInicio, fechaFin) { //AÑO-MES-DIA 2024-06-20
		var hoy = new Date();
		var dia = String(hoy.getDate()).padStart(2, '0');
		var mes = String(hoy.getMonth() + 1).padStart(2, '0');
		var anio = hoy.getFullYear();
		var hoyStr = `${anio}-${mes}-${dia}`;

		if (hoyStr >= fechaInicio && hoyStr <= fechaFin) {
			return true;
		} else {
			return false;
		}
	}

	function verificarRutas() { /// 'SCL', 'BOG', 'LSC', ETC
		if (bookingData.Roundtrip === true) {
			var outboundDeparture = bookingData.AvailableOutboundJourneys[0].DepartureStationCode;
			var returnDeparture = bookingData.AvailableOutboundJourneys[0].ArrivalStationCode;
			if (rutas.includes(outboundDeparture) && rutas.includes(returnDeparture)) {
				return true;
			} else {
				return false;
			}
		} else {
			var outboundDeparture = bookingData.AvailableOutboundJourneys[0].DepartureStationCode;
			if (rutas.includes(outboundDeparture)) {
				return true;
			} else {
				return false;
			}
		}
	}

	function verificarTODO(numDias, PC, fechaCompra1, fechaCompra2, fechaVuelo1, fechaVuelo2, ...rutas) {
		if (verificarAP(numDias) && verificarPC(PC) && verificarFechaCompra(fechaCompra1, fechaCompra2) && verificarFechaVuelos(fechaVuelo1,fechaVuelo2) && verificarRutas()) {
			return true;
		} else {
			return false
		}
	}

/// VARIABLES ///

	var difDias = 5; // 1    DIFERENCIAS DE DIAS DESDE Q SE COMPROA
	var PC = 'TEST'; // 'PC'   PROMOCODE
	var fechaCompra1 = '2024-06-10'; // año-mes-dia // ej: 2024-06-10    FECHA DE COMPRA 1
	var fechaCompra2 = '2024-06-20'; // año-mes-dia // ej: 2024-06-10    FECHA DE COMPRA 2
	var fechaVuelo1 = '2024-06-10'; // año-mes-dia // ej: 2024-06-10     FECHA DE VUELO 1
	var fechaVuelo2 = '2024-08-10'; // año-mes-dia // ej: 2024-06-10     FECHA DE VUELO 2
	var rutas = ['SCL', 'ANF'] // ['RUTA1', 'RUTA2', 'RUTA3', 'ETC']     RUTAS

/////////////////

	if (verificarTODO(difDias, PC, fechaCompra1, fechaCompra2, fechaVuelo1, fechaVuelo2, rutas)) {
		addCSS();
		allFunctions();
		window.eventBus.subscribe({
			name: "newPCv2",
			callback: function (e) {
				allFunctions();
			},
		});
	}
	
}, 600);