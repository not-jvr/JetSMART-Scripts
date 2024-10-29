var initAddLastSearch = setInterval(function() {
	if (!window.location.href.startsWith('https://jetsmart.com/cl/es/') && !window.location.href.startsWith('https://jetsmart.com/ar/es/') && !window.location.href.startsWith('https://jetsmart.com/pe/es/') && !window.location.href.startsWith('https://jetsmart.com/uy/es/') && !window.location.href.startsWith('https://jetsmart.com/py/es/') && !window.location.href.startsWith('https://jetsmart.com/co/es/') && !window.location.href.startsWith('https://jetsmart.com/br/pt/') && !window.location.href.startsWith('https://jetsmart.com/us/en/')) return;
	clearInterval(initAddLastSearch);

	function addCSS() {
		var css = `
		.MSGTOPBAR {
			padding: 12px;
			background: #b2292e;
			color: #FFF;
			font-size: 18px;
			font-weight: bold;
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
		if (!document.querySelector('.MSGTOPBAR')) {
			var mainHeader = document.querySelector('.main-header .nav-bg');
			var mensaje = '';
			var currentURL = window.location.href;

			if (currentURL.startsWith("https://jetsmart.com/br/pt/")) {
				mensaje = '<div class="MSGTOPBAR">No momento, estamos enfrentando intermitência, tente novamente mais tarde.</div>';
			} else if (currentURL.startsWith("https://jetsmart.com/us/en/")) {
				mensaje = '<div class="MSGTOPBAR">We are currently experiencing intermittency, please try again later.</div>';
			} else {
				mensaje = '<div class="MSGTOPBAR">En estos momentos estamos presentando intermitencias, por favor intenta más tarde.</div>';
			}

			mainHeader.insertAdjacentHTML('afterend', mensaje);
		}
	}

	function homeVerificator() {
		var searchBoxHome = document.querySelector('[data-test-id="SEARCHBOX_CONTAINER"]');
		if (searchBoxHome) {
			return true;
		} else {
			return false;
		}
	}

	function topbarBlue() {
		var topbarBlue = document.querySelector('#topbar');
		if (topbarBlue) {
			topbarBlue.style.display = 'none';
		}
	}

	function allFunctions() {
		topbarBlue();
		addCSS();
		addTopMSG();
	}
	if (homeVerificator()) {
		allFunctions();
	}

}, 600);