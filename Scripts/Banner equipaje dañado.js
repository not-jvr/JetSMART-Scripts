var initBannerBaggage = setInterval(function () {
	if (!window.location.pathname.toLowerCase().includes('/es/opcionales')) return;
	clearInterval(initBannerBaggage);

	var culture;

	if (window.location.pathname.startsWith('/cl/es')) {
		culture = 'es-CL'
	}
	if (window.location.pathname.startsWith('/ar/es')) {
		culture = 'es-AR'
	}
	if (window.location.pathname.startsWith('/pe/es')) {
		culture = 'es-PE'
	}
	if (window.location.pathname.startsWith('/uy/es')) {
		culture = 'es-UY'
	}
	if (window.location.pathname.startsWith('/py/es')) {
		culture = 'es-PY'
	}
	if (window.location.pathname.startsWith('/ec/es')) {
		culture = 'es-EC'
	}
	if (window.location.pathname.startsWith('/co/es')) {
		culture = 'es-CO'
	}
	if (window.location.pathname.startsWith('/br/pt')) {
		culture = 'pt-BR'
	}
	if (window.location.pathname.startsWith('/us/en')) {
		culture = 'en-US'
	}

	function addCSS() {
		var css = `
		.bannerBaggage {
			width: 100%;
			height: auto;
			cursor: pointer;
		}
		@media (max-width: 767px) {
			.bannerBaggage {
				display: none;
			}
		}
		`,
		head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');

		head.appendChild(style);

		style.type = 'text/css';
		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
	}

	function addHTML() {
		var boxContent = document.querySelector('.box-content');
		if (!document.querySelector('.bannerBaggage')) {
			var baseUrl;
			var imageUrl = "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/33b51186-d461-4d8c-ab51-337788bd4901/Banner%20-%20Equipaje%20Da%C3%B1ado.png";
			switch (culture) {
			case 'es-CL':
				baseUrl = "https://jetsmart.com/cl/es/";
				break;
			case 'es-AR':
				baseUrl = "https://jetsmart.com/ar/es/";
				break;
			case 'es-PE':
				baseUrl = "https://jetsmart.com/pe/es/";
				break;
			case 'es-UY':
				baseUrl = "https://jetsmart.com/uy/es/";
				break;
			case 'es-PY':
				baseUrl = "https://jetsmart.com/py/es/";
				break;
			case 'es-EC':
				baseUrl = "https://jetsmart.com/ec/es/";
				break;
			case 'es-CO':
				baseUrl = "https://jetsmart.com/co/es/";
				break;
			}
			var htmlContent = '<div><a href="' + baseUrl + '"><img src="' + imageUrl + '" alt="Equipaje Dañado" class="bannerBaggage"></a></div>';

			boxContent.insertAdjacentHTML('beforeend', htmlContent);
		}
	}

	if (culture !== 'pt-BR' && culture !== 'en-US') {
		addCSS();
		addHTML();
	}
	
}, 600);