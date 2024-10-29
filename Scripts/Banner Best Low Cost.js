var initBannerBestLowCost = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/itinerary') return;
	clearInterval(initBannerBestLowCost);

	var culture = bookingData.Culture;

	function bannerBestLowCost(){
		
		if(document.querySelector('.i2-itinerary-section.BestLowCost')) return;

		const parentElement = document.querySelector('.i2-itinerary-section.i2-header');
		const newDiv = document.createElement('div');

		switch (culture) {
		case "pt-BR":
			urlImagen = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/00bb1db0-d2d0-4c72-8f38-da8427b5e026/Banner-ADM-tu-vuelo-SkyTrax-2023.png';
			break;
		case "en-US":
			urlImagen = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/00bb1db0-d2d0-4c72-8f38-da8427b5e026/Banner-ADM-tu-vuelo-SkyTrax-2023.png';
			break;
		default:
			urlImagen = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/00bb1db0-d2d0-4c72-8f38-da8427b5e026/Banner-ADM-tu-vuelo-SkyTrax-2023.png';
		}

		newDiv.innerHTML = '<div class="i2-itinerary-section BestLowCost" data-test-id="BestLowCost">' + 
		`       <img class="max-w-full" src="${urlImagen}">` +
		'</div>';
		parentElement.insertAdjacentElement('afterend', newDiv);

		var css = `
		.i2-itinerary-section.BestLowCost .max-w-full {
			border-radius: 12px;
			display: block;
			width: 100%;
			height: auto;
		}

		@media (max-width: 767px) {
			.i2-itinerary-section.BestLowCost .max-w-full {
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

	if(culture === 'es-CL'){
		bannerBestLowCost();
	}

}, 400);