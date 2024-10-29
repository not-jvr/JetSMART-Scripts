var initLeyendasSeatMap = setInterval(function(){
	if(typeof bookingData === "undefined" || !document.querySelector(".accordion-wrapper") || window.location.pathname !== '/Seat/Map') return;
	clearInterval(initLeyendasSeatMap);
	var culture = bookingData.Culture;
	if( (culture === 'es-CL' || culture === 'es-AR') && JetSmart.AppContext.bancoEstadoCategory === '0' && bookingData.Role  != 'WWW Staff Travel'){
		
		var textDireccVuelo = document.querySelector(".accordion-wrapper");
		textDireccVuelo.insertAdjacentHTML('afterend', `
			<div class="hidden-md-down accordion-wrapper seatmap-accordion-wrapper container-leyenda-asientos">
			<label class="text-tipos-asiento">Tipos de Asientos</label>
			<div class="row">
			<div class="col-xs-1-3">
			<div class="leyenda-asientos">
			<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/469a6925-2a94-4022-99dc-18703e053082/Primera%20Fila.svg" class="icon-leyenda">
			<div>
			<span class="text-fila">
			Primera Fila
			</span><br>
			<span class="text-precio-primera">
			Desde
			</span>
			</div>
			</div>
			</div>
			<div class="col-xs-1-3">
			<div class="leyenda-asientos">
			<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/e6721361-b5c8-466d-b4cd-1f0068f00dce/Full%20Comodidad.svg" class="icon-leyenda">
			<div>
			<span class="text-fila">
			Full Comodidad
			</span><br>
			<span class="text-precio-comodidad">
			Desde
			</span>
			</div>
			</div>
			</div>
			<div class="col-xs-1-3">
			<div class="leyenda-asientos">
			<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/1bbaee39-daae-4a24-ba30-fbb03f2d58b7/Smart.svg" class="icon-leyenda">
			<div>
			<span class="text-fila text-color-smart">
			Smart
			</span><br>
			<span class="text-precio-smart text-color-smart">
			Desde
			</span>
			</div>
			</div>
			</div>
			</div>
			<div class="row">
			<div class="col-xs-1-3">
			<div class="leyenda-asientos">
			<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/26153e30-2434-4a2c-9e97-b31eb68499e5/Salida%20R%C3%A1pida.svg" class="icon-leyenda">
			<div>
			<span class="text-fila text-color-salida">
			Salida Rápida
			</span><br>
			<span class="text-precio-salida text-color-salida">
			Desde
			</span>
			</div>
			</div>
			</div>
			<div class="col-xs-1-3">
			<div class="leyenda-asientos">
			<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/2cca2763-308a-45c8-9167-9b183cc2a67a/Estandar.svg" class="icon-leyenda">
			<div>
			<span class="text-fila text-color-estandar">
			Estándar
			</span><br>
			<span class="text-precio-estandar text-color-estandar">
			Desde
			</span>
			</div>
			</div>
			</div>
			<div class="col-xs-1-3">
			<div class="leyenda-asientos">
			<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/7dedbe8c-285b-4e2c-93ba-23e1f400b804/Disbale.svg" class="icon-leyenda">
			<div>
			<span class="text-fila text-color-no">
			No Disponible
			</span>
			</div>
			</div>
			</div>
			</div>
			</div>`);
		if(bookingData.OutboundBundleCode != null || bookingData.ReturnBundleCode != null){
			if(document.querySelector(".accordion-wrapper")){
				var precioPrimeraFila = document.querySelector(".accordion-wrapper .text-precio-primera");
				var precioPrimeraFilaClone = document.querySelector("#mainContentWrapper > div:nth-child(3) > ac-seatmap > section > div > div.row > div > div > div > div > ac-seatmap-journey:nth-child(1) > div > div > div:nth-child(2) > div.nes-plane-row.nes-grid-row-1.extra-room > div.nes-grid-column-1 > ac-seat > div.seat.desktop.category-1.s-left.xl > span.seat-tooltip > span:nth-child(1)").childNodes[1].parentNode.cloneNode(true);
				precioPrimeraFila.insertAdjacentElement('afterend', precioPrimeraFilaClone);
			}
			if(document.querySelector(".accordion-wrapper")){
				var precioFullComodidad = document.querySelector(".accordion-wrapper .text-precio-comodidad");
				var precioFullComodidadClone = document.querySelector("#mainContentWrapper > div:nth-child(3) > ac-seatmap > section > div > div.row > div > div > div > div > ac-seatmap-journey:nth-child(1) > div > div > div:nth-child(2) > div.nes-plane-row.nes-grid-row-12.extra-room > div.nes-grid-column-1 > ac-seat > div.seat.desktop.category-4.s-left.xl > span.seat-tooltip > span:nth-child(1)").childNodes[1].parentNode.cloneNode(true);
				precioFullComodidad.insertAdjacentElement('afterend', precioFullComodidadClone);
			}
			if(document.querySelector(".accordion-wrapper")){
				var precioSalidaRapida = document.querySelector(".accordion-wrapper .text-precio-salida");
				var precioSalidaRapidaClone = document.querySelector("#mainContentWrapper > div:nth-child(3) > ac-seatmap > section > div > div.row > div > div > div > div > ac-seatmap-journey:nth-child(1) > div > div > div:nth-child(2) > div.nes-plane-row.nes-grid-row-5 > div.nes-grid-column-1 > ac-seat > div.seat.desktop.category-3.s-left > span.seat-tooltip > span:nth-child(1)").childNodes[1].parentNode.cloneNode(true);
				precioSalidaRapida.insertAdjacentElement('afterend', precioSalidaRapidaClone);
			}
			if(document.querySelector(".accordion-wrapper")){
				var precioSmart = document.querySelector(".accordion-wrapper .text-precio-smart");
				var precioSmartClone = document.querySelector("#mainContentWrapper > div:nth-child(3) > ac-seatmap > section > div > div.row > div > div > div > div > ac-seatmap-journey:nth-child(1) > div > div > div:nth-child(2) > div.nes-plane-row.nes-grid-row-2 > div.nes-grid-column-1 > ac-seat > div.seat.desktop.category-2.s-left > span.seat-tooltip > span:nth-child(1)").childNodes[1].parentNode.cloneNode(true);
				precioSmart.insertAdjacentElement('afterend', precioSmartClone);
			}
			if(document.querySelector(".accordion-wrapper")){
				var precioEstandar = document.querySelector(".accordion-wrapper .text-precio-estandar");
				var precioEstandarClone = document.querySelector("#mainContentWrapper > div:nth-child(3) > ac-seatmap > section > div > div.row > div > div > div > div > ac-seatmap-journey:nth-child(1) > div > div > div:nth-child(2) > div.nes-plane-row.nes-grid-row-15 > div.nes-grid-column-1 > ac-seat > div.seat.desktop.category-5.s-left > span.seat-tooltip > span:nth-child(1)").childNodes[1].parentNode.cloneNode(true);
				precioEstandar.insertAdjacentElement('afterend', precioEstandarClone);
			}
		}else{    
			if(document.querySelector(".accordion-wrapper")){
				var precioPrimeraFila = document.querySelector(".accordion-wrapper .text-precio-primera");
				var precioPrimeraFilaClone = document.querySelector("ac-seatmap-journey:nth-child(1) div:nth-child(2) .nes-grid-row-1 .category-1.s-left.xl.non-selectable > span.seat-tooltip > span:nth-child(1)").childNodes[1].parentNode.cloneNode(true);
				precioPrimeraFila.insertAdjacentElement('afterend', precioPrimeraFilaClone);
			}
			if(document.querySelector(".accordion-wrapper")){
				var precioFullComodidad = document.querySelector(".accordion-wrapper .text-precio-comodidad");
				var precioFullComodidadClone = document.querySelector("ac-seatmap-journey:nth-child(1) div:nth-child(2) .nes-grid-row-2 .category-2.s-left.non-selectable > span.seat-tooltip > span:nth-child(1)").childNodes[1].parentNode.cloneNode(true);
				precioFullComodidad.insertAdjacentElement('afterend', precioFullComodidadClone);
			}
			if(document.querySelector(".accordion-wrapper")){
				var precioSalidaRapida = document.querySelector(".accordion-wrapper .text-precio-salida");
				var precioSalidaRapidaClone = document.querySelector("ac-seatmap-journey:nth-child(1) div:nth-child(2) .nes-grid-row-5 .category-3.s-left.non-selectable > span.seat-tooltip > span:nth-child(1)").childNodes[1].parentNode.cloneNode(true);
				precioSalidaRapida.insertAdjacentElement('afterend', precioSalidaRapidaClone);
			}
			if(document.querySelector(".accordion-wrapper")){
				var precioSmart = document.querySelector(".accordion-wrapper .text-precio-smart");
				var precioSmartClone = document.querySelector("ac-seatmap-journey:nth-child(1) div:nth-child(2) .nes-grid-row-2 .category-2.s-left.non-selectable > span.seat-tooltip > span:nth-child(1)").childNodes[1].parentNode.cloneNode(true);
				precioSmart.insertAdjacentElement('afterend', precioSmartClone);
			}
			if(document.querySelector(".accordion-wrapper")){
				var precioEstandar = document.querySelector(".accordion-wrapper .text-precio-estandar");
				var precioEstandarClone = document.querySelector("ac-seatmap-journey:nth-child(1) div:nth-child(2) .nes-grid-row-16 .category-5.s-left.non-selectable > span.seat-tooltip > span:nth-child(1)").childNodes[1].parentNode.cloneNode(true);
				precioEstandar.insertAdjacentElement('afterend', precioEstandarClone);
			}
		}

		var css = `
		.container-leyenda-asientos > div:nth-child(3) > div:nth-child(1) > div > div > span:nth-child(4){
			font-size: 10px;
			color: #2b7ea3;
			font-weight: 600;
		}
		.container-leyenda-asientos > div:nth-child(2) > div:nth-child(3) > div > div > span:nth-child(4), .container-leyenda-asientos > div:nth-child(3) > div:nth-child(2) > div > div > span:nth-child(4){
			font-size: 10px;
			color: #61d6e5;
			font-weight: 600;
		}
		.container-leyenda-asientos > div:nth-child(2) > div:nth-child(1) > div > div > span:nth-child(4), .container-leyenda-asientos > div:nth-child(2) > div:nth-child(2) > div > div > span:nth-child(4){
			font-size: 10px;
			color: #163a70;
			font-weight: 600;
		}
		.text-color-no{
			color: #dfdfdf !important;
		}
		.text-color-salida{
			color: #2b7ea3 !important;
		}
		.text-color-smart{
			color: #61d6e5 !important;
		}
		.text-color-estandar{
			color: #61d6e5 !important;
		}
		.text-tipos-asiento{
			color: #163a70;
			font-weight: 600;
			font-size: 19px;
		}
		.text-precio-primera, .text-precio-comodidad, .text-precio-smart, .text-precio-salida, .text-precio-estandar{
			font-size: 10px;
			color: #163a70;
			font-weight: 600;
		}
		.text-fila{
			font-size: 12px;
			color: #163a70;
			font-weight: 600;
		}
		.icon-leyenda{
			width: 30px;
			margin-right: 3px;
			margin-left: -3px;
		}
		.container-leyenda-asientos{
			padding: 20px 13px 15px 13px;
		}
		.leyenda-asientos{
			border-radius: 10px;
			margin: -5px -4px 15px -4px;
			height: 67px;
			display: flex;
			align-items: center;
			padding: 2px 0px 2px 6px;
			position: relative;
			top: 1rem;
			background: #fff;
		}
		@media (min-width: 75rem) and (max-width: 87.4375rem){
			.seatmap-info {
				right: 337px;
			}
			.plane-body {
				right: -107px;
			}
		}
		`,
		head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');

		head.appendChild(style);

		style.type = 'text/css';
		if (style.styleSheet){
		// This is required for IE8 and below.
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));	
		}
	}
}, 800);