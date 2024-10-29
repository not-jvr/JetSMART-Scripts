var initCarouselItinerary = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Itinerary') return;
	clearInterval(initCarouselItinerary);

	var culture = bookingData.Culture;

	function addCSS() {
		var css = `
		.i2-itinerary-section.Carrusel .carousel {
			display: flex;
			overflow: hidden;
			border-radius: 12px;
			display: block;
			width: 100%;
			height: auto;
		}

		.i2-itinerary-section.Carrusel .carousel img {
			width: 100%;
			display: none;
		}

		.i2-itinerary-section.Carrusel .carousel img:first-child {
			display: block;
		}

		@media (max-width: 767px) {
			.i2-itinerary-section.Carrusel .carousel {
				border-radius: 5px;
			}
		}
		`;

		var head = document.head || document.getElementsByTagName('head')[0];
		var style = document.createElement('style');
		head.appendChild(style);
		style.type = 'text/css';
		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
	}

	function addCarousel() {
		var container = document.querySelector('.i2-itinerary-section.i2-header');
		if (!document.querySelector('.i2-itinerary-section.Carrusel') && container) {
			if (culture === 'es-CL') {
				var html = `
				<div class="i2-itinerary-section Carrusel" data-test-id="Carrusel">
				<div id="carousel" class="carousel">
				<img id="carousel-bestlowcost" src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/00bb1db0-d2d0-4c72-8f38-da8427b5e026/Banner-ADM-tu-vuelo-SkyTrax-2023.png">
				<img id="carousel-revistadigital" src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/11059daa-441d-4dff-91b9-54c32d5d0f1f/Banner%20ADM%20tu%20vuelo.png">
				<img id="carousel-bancoestado" src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/a3244a9a-9674-4940-b8b9-ff1e3418e02b/Banner-portal-grupos-desktop_PE%28EyA%29.png">
				</div>
				</div>`;
			} else if (culture === 'es-AR' || culture === 'es-PE') {
				var html = `
				<div class="i2-itinerary-section Carrusel" data-test-id="Carrusel">
				<div id="carousel" class="carousel">
				<img id="carousel-bestlowcost" src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/00bb1db0-d2d0-4c72-8f38-da8427b5e026/Banner-ADM-tu-vuelo-SkyTrax-2023.png">
				<img id="carousel-revistadigital" src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/11059daa-441d-4dff-91b9-54c32d5d0f1f/Banner%20ADM%20tu%20vuelo.png">
				</div>
				</div>`;
			}
			
			container.insertAdjacentHTML('afterend', html);

		// Configurar el carrusel
			var carousel = document.getElementById('carousel');
			var images = carousel.getElementsByTagName('img');
			var currentIndex = 0;

			function showImage(index) {
				images[currentIndex].style.display = 'none';
				images[index].style.display = 'block';
				currentIndex = index;
			}

			setInterval(function() {
				var nextIndex = (currentIndex + 1) % images.length;
				showImage(nextIndex);
		}, 5000); // Cambiar la imagen cada 2 segundos
		}
	}

	if (culture === 'es-CL' || culture === 'es-AR' || culture === 'es-PE') {
		addCarousel();
		addCSS();
	}

}, 600);