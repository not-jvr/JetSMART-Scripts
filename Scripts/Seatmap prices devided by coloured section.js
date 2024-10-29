var initChanges_863gk6bnk = setInterval(function () {
	if (typeof bookingData === "undefined" || typeof window.eventBus === "undefined" || document.querySelector(".banco-estado") || !document.querySelector(".seatmap-page") || window.location.pathname !== '/Seat/Map') return;
	clearInterval(initChanges_863gk6bnk);

	var cultureSeatmap = bookingData.Culture;

	let textSeatmap = 'Desde';

	switch (cultureSeatmap) {
	case 'en-US':
		textSeatmap = 'From';
		break;
	case 'pt-BR':
		textSeatmap = 'De';
		break;
	}
	
	var connectedOutbound = bookingData.OutboundJourney.IsConnectedFlight;
	var connectedReturn = bookingData.ReturnJourney.IsConnectedFlight;

	function connectedOut() {
		return connectedOutbound === true;
	}

	function connectedRet() {
		return connectedReturn === true;
	}

	if (!connectedOut() && !connectedRet()) {


		
		addCSS();
		
		var precio1 = null;
		var precio2 = null;
		var precio3 = null;
		var precio4 = null;
		var precio5 = null;

		window.eventBus.subscribe({
			name: "initChanges_35kupcp", callback: function () {
			//primer evento
				addInitChanges_863gk6bnk();
			//click en vuelta
				if (document.querySelector(".seatmap-info .seatmap-info-content .seatmap-journey-selector li:nth-child(2)")) {
					document.querySelector(".seatmap-info .seatmap-info-content .seatmap-journey-selector li:nth-child(2)").onclick = function (e) {
						setTimeout(() => {
							addInitChanges_863gk6bnk();
						}, 1000);
					}
				}
				if (document.querySelector("[data-test-id='seatmap-direction-switch--j|1-m|1']")) {
					document.querySelector("[data-test-id='seatmap-direction-switch--j|1-m|1']").onclick = function (e) {
						setTimeout(() => {
							addInitChanges_863gk6bnk();
						}, 1000);
					}
				}
			// click vuelta vuelo conexion
				if (document.querySelector(".mobile-passenger-container > div:nth-child(2)")) {
					document.querySelector(".mobile-passenger-container > div:nth-child(2)").onclick = function (e) {
						setTimeout(() => {
							addInitChanges_863gk6bnk();
						}, 1000);
					}
				}
				if (document.querySelector(".cf-mobile-header-segments div:nth-child(2)")) {
					document.querySelector(".cf-mobile-header-segments div:nth-child(2)").onclick = function (e) {
						setTimeout(() => {
							addInitChanges_863gk6bnk();
						}, 1000);
					}
				}
			// click ida vuelo conexion
				if (document.querySelector(".mobile-passenger-container > div:nth-child(1)")) {
					document.querySelector(".mobile-passenger-container > div:nth-child(1)").onclick = function (e) {
						setTimeout(() => {
							addInitChanges_863gk6bnk();
						}, 1000);
					}
				}

				if (document.querySelector(".cf-mobile-header-segments div:nth-child(1)")) {
					document.querySelector(".cf-mobile-header-segments div:nth-child(1)").onclick = function (e) {
						setTimeout(() => {
							addInitChanges_863gk6bnk();
						}, 1000);
					}
				}
			// click en ida
				if (document.querySelector(".seatmap-info .seatmap-info-content .seatmap-journey-selector li")) {
					document.querySelector(".seatmap-info .seatmap-info-content .seatmap-journey-selector li").onclick = function (e) {
						setTimeout(() => {
							addInitChanges_863gk6bnk();
						}, 1000);
					}
				}

				if (document.querySelector("[data-test-id='seatmap-direction-switch--j|0-m|1']")) {
					document.querySelector("[data-test-id='seatmap-direction-switch--j|0-m|1']").onclick = function (e) {
						setTimeout(() => {
							addInitChanges_863gk6bnk();
						}, 1000);
					}
				}

			// click en continuar
				if (document.querySelector("ac-seatmap .seatmap-info .seatmap-journey-selector .justify-end.mt-4 .rounded-primary-btn")) {
					document.querySelector("ac-seatmap .seatmap-info .seatmap-journey-selector .justify-end.mt-4 .rounded-primary-btn").onclick = function (e) {
						setTimeout(() => {
							addInitChanges_863gk6bnk();
						}, 1000);
					}
				}

				if (document.querySelector(".cf-plane-body .mobile-seatmap-button-container > button")) {
					document.querySelector(".cf-plane-body .mobile-seatmap-button-container > button").onclick = function (e) {
						setTimeout(() => {
							addInitChanges_863gk6bnk();
						}, 1000);
					}
				}

				if (document.querySelector(".mobile-seatmap-button-container")) {
					document.querySelector(".mobile-seatmap-button-container").onclick = function (e) {
						setTimeout(() => {
							addInitChanges_863gk6bnk();
						}, 1000);
					}
				}

				if (document.querySelectorAll(".seat-tooltip.mobile-seat-info > button")) {
					document.querySelectorAll(".seat-tooltip.mobile-seat-info > button").forEach(function (element) {
						element.onclick = function (e) {
							setTimeout(() => {
								addInitChanges_863gk6bnk();
							}, 1000);
						}
					});
				}

				if (document.querySelectorAll(".cf-seat.desktop")) {
					document.querySelectorAll(".cf-seat.desktop").forEach(function (element2) {
						element2.onclick = function (e) {
							setTimeout(() => {
								addInitChanges_863gk6bnk();
							}, 1000);
						}
					});
				}

			// click en aplicar recomendacion
				if (document.querySelector(".seatmap-info .seatmap-info-content .justify-between > button, ac-seatmap .hidden-lg-up .seatmap-recommendator-buttons > div:nth-child(2)")) {
					document.querySelector(".seatmap-info .seatmap-info-content .justify-between > button, ac-seatmap .hidden-lg-up .seatmap-recommendator-buttons > div:nth-child(2)").onclick = function (e) {
						setTimeout(() => {
							addInitChanges_863gk6bnk();
						}, 1000);
					}
				}
			}
		});
}
function addInitChanges_863gk6bnk() {
	setTimeout(() => {
		document.querySelectorAll(".container-category").forEach(function (e) {
			e.remove()
		});

		var category1 = document.querySelector(".cf-seatmap-row .cf-seatmap-seat-container ac-seat .category-1").closest('.cf-seatmap-row');
		category1.insertAdjacentHTML('beforebegin',
			`<div class="container-category price-category-1">
			<img class="cf-plane-body-image hidden-md-down img-mt" src="/Images/Seatmap/seatmap-body.svg">
			<img class="cf-plane-body-image hidden-lg-up  hidden-xs" src="/Images/Seatmap/seatmap-body-sm.svg">
			<img class="cf-plane-body-image hidden-sm-up" src="/Images/Seatmap/seatmap-body-xs.svg">
			<div class="container-price priceCategory1">
			${textSeatmap} 
			</div>
			</div>`);

		var category2 = document.querySelector(".cf-seatmap-row .cf-seatmap-seat-container ac-seat .category-2").closest('.cf-seatmap-row');
		category2.insertAdjacentHTML('beforebegin',
			`<div class="container-category price-category-2">
			<img class="cf-plane-body-image hidden-md-down img-mt" src="/Images/Seatmap/seatmap-body.svg">
			<img class="cf-plane-body-image hidden-lg-up  hidden-xs" src="/Images/Seatmap/seatmap-body-sm.svg">
			<img class="cf-plane-body-image hidden-sm-up" src="/Images/Seatmap/seatmap-body-xs.svg">
			<div class="container-price priceCategory2">
			${textSeatmap} 
			</div>
			</div>`);

		var category3 = document.querySelector(".cf-seatmap-row .cf-seatmap-seat-container ac-seat .category-3").closest('.cf-seatmap-row');
		category3.insertAdjacentHTML('beforebegin',
			`<div class="container-category price-category-3">
			<img class="cf-plane-body-image hidden-md-down img-mt" src="/Images/Seatmap/seatmap-body.svg">
			<img class="cf-plane-body-image hidden-lg-up  hidden-xs" src="/Images/Seatmap/seatmap-body-sm.svg">
			<img class="cf-plane-body-image hidden-sm-up" src="/Images/Seatmap/seatmap-body-xs.svg">
			<div class="container-price priceCategory3">
			${textSeatmap} 
			</div>
			</div>`);

		var category4 = document.querySelector(".cf-seatmap-row .cf-seatmap-seat-container ac-seat .category-4").closest('.cf-seatmap-row');
		category4.insertAdjacentHTML('beforebegin',
			`<div class="container-category price-category-4">
			<img class="cf-plane-body-image hidden-md-down img-mt" src="/Images/Seatmap/seatmap-body.svg">
			<img class="cf-plane-body-image hidden-lg-up  hidden-xs" src="/Images/Seatmap/seatmap-body-sm.svg">
			<img class="cf-plane-body-image hidden-sm-up" src="/Images/Seatmap/seatmap-body-xs.svg">
			<div class="container-price priceCategory4">
			${textSeatmap} 
			</div>
			</div>`);

		var category5 = document.querySelector(".cf-seatmap-row .cf-seatmap-seat-container ac-seat .category-5").closest('.cf-seatmap-row');
		category5.insertAdjacentHTML('beforebegin',
			`<div class="container-category price-category-5">
			<img class="cf-plane-body-image hidden-md-down img-mt" src="/Images/Seatmap/seatmap-body.svg">
			<img class="cf-plane-body-image hidden-lg-up  hidden-xs" src="/Images/Seatmap/seatmap-body-sm.svg">
			<img class="cf-plane-body-image hidden-sm-up" src="/Images/Seatmap/seatmap-body-xs.svg">
			<div class="container-price priceCategory5">
			${textSeatmap} 
			</div>
			</div>`);

		if (document.querySelector(".container-category.price-category-1 .container-price")) {
			var precioPrimeraFila = document.querySelector(".container-category.price-category-1 .container-price");
			var precioPrimeraFilaClone = document.querySelector(".cf-seatmap-row .cf-seatmap-seat-container ac-seat .category-1 .seat-tooltip span").childNodes[1].parentNode.cloneNode(true);
			if(precio1 == null){
				precio1 = precioPrimeraFilaClone;
			}
			precioPrimeraFila.insertAdjacentElement('beforeend', precio1);
		}

		if (document.querySelector(".container-category.price-category-2 .container-price")) {
			var precioSmart = document.querySelector(".container-category.price-category-2 .container-price");
			var precioSmartClone = document.querySelector(".cf-seatmap-row .cf-seatmap-seat-container ac-seat .category-2 .seat-tooltip span").childNodes[1].parentNode.cloneNode(true);
			if(precio2 == null){
				precio2 = precioSmartClone;
			}
			precioSmart.insertAdjacentElement('beforeend', precio2);
		}

		if (document.querySelector(".container-category.price-category-3 .container-price")) {
			var precioSalRapida = document.querySelector(".container-category.price-category-3 .container-price");
			var precioSalRapidaClone = document.querySelector(".cf-seatmap-row .cf-seatmap-seat-container ac-seat .category-3 .seat-tooltip span").childNodes[1].parentNode.cloneNode(true);
			if(precio3 == null){
				precio3 = precioSalRapidaClone;
			}
			precioSalRapida.insertAdjacentElement('beforeend', precio3);
		}

		if (document.querySelector(".container-category.price-category-4 .container-price")) {
			var precioFull = document.querySelector(".container-category.price-category-4 .container-price");
			var precioFullClone = document.querySelector(".cf-seatmap-row .cf-seatmap-seat-container ac-seat .category-4 .seat-tooltip span").childNodes[1].parentNode.cloneNode(true);
			if(precio4 == null){
				precio4 = precioFullClone;
			}
			precioFull.insertAdjacentElement('beforeend', precio4);
		}

		if (document.querySelector(".container-category.price-category-5 .container-price")) {
			var precioEstandar = document.querySelector(".container-category.price-category-5 .container-price");
			var precioEstandarClone = document.querySelector(".cf-seatmap-row .cf-seatmap-seat-container ac-seat .category-5 .seat-tooltip span").childNodes[1].parentNode.cloneNode(true);
			if(precio5 == null){
				precio5 = precioEstandarClone;
			}
			precioEstandar.insertAdjacentElement('beforeend', precio5);
		}
	}, 800);
}

function addCSS() {
	var css = `
	.priceCategory1, .priceCategory4{
		background: #1b3b6d;
	}
	.container-price{
		z-index: 1;
		--bg-opacity: 1;
		max-width: 100%;
		width: 114%;
		max-height: 100%;
		height: 80%;
		text-align: center;
		padding-top: 5px;
	}
	.priceCategory2{
		background-color: #61d6e5;
	}
	.priceCategory5{
		background: #5ac1d7;
	}
	.priceCategory3{
		background: #2b7ea3;
	}
	.container-category {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 30px;
		color: #fff;
	}
	`,
	head = document.head || document.getElementsByTagName('head')[0],
	style = document.createElement('style');

	head.appendChild(style);

	style.type = 'text/css';
	if (style.styleSheet) {
			// This is required for IE8 and below.
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}
}
}, 400);