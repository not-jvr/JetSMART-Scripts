var newIconAA = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
	clearInterval(newIconAA);

	function addCSS() {
		var css = `
		[data-test-id="bundle-selector-option--j|0-c|none"] .js-n-american-airlines:before, [data-test-id="bundle-selector-option--j|1-c|none"] .js-n-american-airlines:before, [data-test-value="None"] .js-n-american-airlines:before {
    		content: "";
    		display: inline-block;
    		width: 20px;
    		height: 24px;
    		background-image: url('https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/9cbaaada-d73b-4b95-b2bb-1c220e649cc2/Group%202240.png');
    		background-size: contain;
    		background-repeat: no-repeat;
    		vertical-align: middle;
		}

		[data-test-id="bundle-selector-option--j|0-c|simple"] .js-n-american-airlines:before, [data-test-id="bundle-selector-option--j|1-c|simple"] .js-n-american-airlines:before, [data-test-value="Simple"] .js-n-american-airlines:before, [data-test-id="bundle-selector-option--j|0-c|full"] .js-n-american-airlines:before, [data-test-id="bundle-selector-option--j|1-c|full"] .js-n-american-airlines:before, [data-test-value="Full"] .js-n-american-airlines:before {
    		content: "";
    		display: inline-block;
    		width: 20px;
    		height: 24px;
    		background-image: url('https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/1e655dd0-b527-4346-8586-6280dbc95805/Group%202241.png');
    		background-size: contain;
    		background-repeat: no-repeat;
    		vertical-align: middle;
		}

		.bundle-tooltip .js-n-american-airlines:before {
			width: 40px;
    		height: 40px;
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

	addCSS();

}, 600);