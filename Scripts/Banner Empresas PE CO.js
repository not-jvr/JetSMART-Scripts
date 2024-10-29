var initBannerEmpresas = setInterval(function () {
	if (typeof bookingData === "undefined" || !window.location.pathname.toLowerCase().startsWith('/v2agency/summary')) return;
	clearInterval(initBannerEmpresas);

	var culture = bookingData.Culture;

	function banner(){
		if(document.querySelector('.i2-itinerary-section.BannerEmpresas')) return;
		var parentElement = document.querySelector('.cug2b-summary-widgets');
		var newDiv = document.createElement('div');

		switch (culture) {
		case "es-PE":
			urlImagen = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/a3244a9a-9674-4940-b8b9-ff1e3418e02b/Banner-portal-grupos-desktop_PE%28EyA%29.png';
			urlMobile = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/97806e54-7f85-4199-b238-964fa8ba4da1/Banner-portal-grupos-mobile-PE%28EyA%29.png';
			break;
		case "es-CO":
			urlImagen = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/d2871d1f-4308-4556-b45a-473a73e728c6/Banner-portal-grupos-desktop_CO%28EyA%29.png';
			urlMobie = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/dd2ff724-1c9d-41d6-ac0e-a627a18bf9c3/Banner-portal-grupos-mobile_CO%28EyA%29.png';
			break;
		}

		var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var imageUrl = (windowWidth >= 768) ? urlImagen : urlMobile;

		newDiv.innerHTML = '<div class="i2-itinerary-section BannerEmpresas" data-test-id="BannerEmpresas">' + 
		`       <img class="max-w-full" src="${imageUrl}">` +
		'</div>';
		parentElement.insertAdjacentElement('afterend', newDiv);

		var css = `
		.i2-itinerary-section.BannerEmpresas .max-w-full {
			border-radius: 12px;
			display: block;
			width: 100%;
			height: auto;
		}

		@media (max-width: 767px) {
			.i2-itinerary-section.BannerEmpresas .max-w-full {
				border-radius: 5px;
			}

			.i2-itinerary-section.BannerEmpresas {
				width: 100%;
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

	function esEmpresa() {
		var elemento = document.querySelector('.cug2b-container.flex.items-center.h-full.relative');
		var imagen = elemento.querySelector('img');
		var esSrcCorrecto = imagen && imagen.getAttribute('src') === "/Images/Cug22/cug-logo-company-white-es.svg";

		if (esSrcCorrecto) {
			return true;
		} else {
			return false;
		}
	}

	if (esEmpresa()) {
		if (culture === 'es-PE' || culture === 'es-CO') {
			banner();
		}
	}

}, 600);