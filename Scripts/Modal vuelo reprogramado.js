var initBannerVueloRepogramado = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/itinerary') return;

	clearInterval(initBannerVueloRepogramado);

	var culture = bookingData.Culture;


	function bannerVueloRepogramado(){
		
		if(document.querySelector('.i2-itinerary-section.VueloRepogramado')) return;

		const parentElement = document.querySelector('.i2-itinerary-section.i2-header');
		const newDiv = document.createElement('div');

		switch (culture) {
		case "pt-BR":
			urlImagen = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/2970ccea-bfce-42f9-88c3-c3cc45d2a4c0/Banner%20-%20Vuelo%20Modificado%20-%20PT.png';
			break;
		case "en-US":
			urlImagen = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/6d64a5ad-8ada-46ba-92a2-a7f3355cbf48/Banner%20-%20Vuelo%20Modificado%20-%20EN.png';
			break;
		default:
			urlImagen = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/e0b0f3ea-89ca-40d1-a976-4511c7b4d323/Banner%20-%20Vuelo%20Modificado.png';
		}

		newDiv.innerHTML = '<div class="i2-itinerary-section VueloRepogramado" data-test-id="VueloRepogramado">' + 
		`       <img class="max-w-full" src="${urlImagen}">` +
		'</div>';
		parentElement.insertAdjacentElement('afterend', newDiv);

		var css = `
		.i2-itinerary-section.VueloRepogramado .max-w-full {
			border-radius: 12px;
			display: block;
			width: 100%;
			height: auto;
		}

		@media (max-width: 767px) {
			.i2-itinerary-section.VueloRepogramado .max-w-full {
				border-radius: 5px;
			}
		}
		`;

		var head = document.head || document.getElementsByTagName('head')[0];
		var style = document.createElement('style');
		head.appendChild(style);
		style.type = 'text/css';
		if (style.styleSheet){
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
	}

	function hideBestLowCost() {
		var bannerBestLowCost = document.querySelector('[data-test-id="BestLowCost"]');
		if (bannerBestLowCost) {
			bannerBestLowCost.style.display = 'none';
		}
	}

	function outboundModify() {
		var selector = document.querySelectorAll('[data-test-id="sidebar-booking-details-journey-time--j|0"] .cf-sidebar-new-time');
		if (selector.length > 0) {
			console.log("reprogramado");
			return true;
		} else {
			console.log("no reprogramado");
			return false;
		}
	}

	function returnModify() {
		var selector = document.querySelectorAll('[data-test-id="sidebar-booking-details-journey-time--j|1"] .cf-sidebar-new-time');
		if (selector.length > 0) {
			console.log("reprogramado");
		} else {
			console.log("no reprogramado");
		}
	}

	function queVueloEs() {
		var fechaVueloIda = bookingData.OutboundJourney.DepartureDate;
		var fechaVueloVuelta = bookingData.ReturnJourney.DepartureDate;
		var fechaActual = new Date();
		var fechaVueloIdaObj = new Date(fechaVueloIda);
		var fechaVueloVueltaObj = new Date(fechaVueloVuelta);

		fechaVueloIdaObj.setHours(fechaVueloIdaObj.getHours() + 6);
		fechaVueloVueltaObj.setHours(fechaVueloVueltaObj.getHours() + 6);

		if (fechaActual < fechaVueloIdaObj) {
			console.log("El vuelo es de ida.");
			if (outboundModify()) {
				vueloReprogramado();
			}
		} else if (fechaActual > fechaVueloIdaObj && fechaActual < fechaVueloVueltaObj) {
			console.log("El vuelo es de vuelta.");
			if (returnModify()) {
				vueloReprogramado();
			}	
		} else {
			console.log("El vuelo ya pasó")
		}
	}

	function vueloReprogramado() {
		hideBestLowCost();
		bannerVueloRepogramado();
	}

	if(culture){
		queVueloEs()
	}

}, 800);