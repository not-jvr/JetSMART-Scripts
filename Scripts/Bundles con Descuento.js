var discountBundles = setInterval(function() {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
	clearInterval(discountBundles);

	var culture = bookingData.Culture;
	var staff = JetSmart.AppContext.isStaff;
	var postB = bookingData.PostBooking;
	var rutasPE = ['TPP', 'PIU', 'CIX', 'CJA', 'TRU', 'LIM', 'CUZ', 'AQP'];
	var outboundCity = bookingData.AvailableOutboundJourneys[0].DepartureStationCode;
	var returnCity = bookingData.AvailableOutboundJourneys[0].ArrivalStationCode;
	var typeRoute = bookingData.RouteMarket;

	function addCSS() {
		var css = `
		.bannerDescuento {
			width: auto;
			height: 40px;
			background-image: url(https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/273c77f4-a397-486f-9cb6-6f833443f37d/Barra%20Desktop.png);
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 15px;
			color: white;
		}

		.bannerDescuento .left {
			flex: 1;
			text-align: left;
			font-weight: 600;
			font-size: 22px;
		}

		.bannerDescuento .right {
			text-align: right;
		}

		.bannerDescuento .right .discount {
			display: block;
			font-weight: 600;
			font-size: 30px;
			margin: 5px 0px 0px 0px;
		}

		.bannerDescuento .right .discount2 {
			display: block;
			font-weight: 600;
			font-size: 10px;
			margin-top: -5px;
		}

		.bannerDescuentoMobile {
			width: auto;
			height: 40px;
			background-image: url(https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/30d06c10-1a58-4c03-a014-63d4f1db1a54/Barra%20Mobile.png);
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 5px;
			color: white;
		}

		.bannerDescuentoMobile .left {
			flex: 1;
			text-align: left;
			font-weight: 600;
			font-size: 14px;
		}

		.bannerDescuentoMobile .right .discount {
			display: block;
			font-weight: 600;
			font-size: 20px;
			margin: 7px 0px 0px 10px;
		}

		.bannerDescuentoMobile .right .discount2 {
			display: block;
			font-weight: 600;
			font-size: 9px;
			margin-top: -10px;
		}

		.bundle-header[data-test-value="BND0"], .bundle-header[data-test-value="BNC0"] {
			margin-bottom: 40px;
		}

		[data-test-id="bundle-selector-option--j|0-c|simple"] .bundle-content .bundle-header {
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
			height: 100px;
		}

		[data-test-id="bundle-selector-option--j|1-c|simple"] .bundle-content .bundle-header {
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
			height: 100px;
		}

		[data-test-id="bundle-selector-option--j|0-c|full"] .bundle-content .bundle-header {
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
			height: 100px;
		}

		[data-test-id="bundle-selector-option--j|1-c|full"] .bundle-content .bundle-header {
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
			height: 100px;
		}

		@media (min-width: 1211) and (max-width: 1260px){
			.bannerDescuento .left {
				font-size: 20px;
			}
		}

		@media (min-width: 1024px) and (max-width: 1210px){
			.bannerDescuento .left {
				font-size: 18px;
			}
		}

		@media (min-width: 842px) and (max-width: 940px){
			.bannerDescuento .left {
				font-size: 18px;
			}
		}

		@media (min-width: 768px) and (max-width: 841px){
			.bannerDescuento .left {
				font-size: 16px;
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

		head.appendChild(style);
	}

	function addBannerDesktop(porcentaje, pack) {
		var bundleHeaders;
		if (pack === 'SMART') {
			if (document.querySelector('[data-test-value="BND1"] .bundle-header')) {
				bundleHeaders = document.querySelectorAll('[data-test-value="BND1"] .bundle-header');
			} else if (document.querySelector('[data-test-value="BNC1"] .bundle-header')) {
				bundleHeaders = document.querySelectorAll('[data-test-value="BNC1"] .bundle-header');
			}

		} else if (pack === 'FULL') {
			if (document.querySelector('[data-test-value="BND2"] .bundle-header')) {
				bundleHeaders = document.querySelectorAll('[data-test-value="BND2"] .bundle-header');
			} else if (document.querySelector('[data-test-value="BNC2"] .bundle-header')) {
				bundleHeaders = document.querySelectorAll('[data-test-value="BNC2"] .bundle-header');
			}
		}

		var num = porcentaje;
		if (bundleHeaders) {
			bundleHeaders.forEach(bundleHeader => {
				if (!bundleHeader.parentElement.querySelector('.bannerDescuento')) {
					var newDivHtml = `
					<div class="bannerDescuento">
					<span class="left">¡VIAJA SMART!</span>
					<span class="right">
					<span class="discount">${num}%</span>
					<span class="discount2">de descuento</span>
					</span>
					</div>
					`;
					bundleHeader.insertAdjacentHTML('afterend', newDivHtml);
				}
			});
		}
	}

	function addBannerMobile(porcentaje, pack) {
		var bundleHeaderIda;
		var bundleHeaderVuelta;
		if (pack === 'SMART') {
			if (document.querySelector('[data-test-id="bundle-selector-option--j|0-c|simple"] .bundle-content .bundle-header')) {
				bundleHeaderIda = document.querySelector('[data-test-id="bundle-selector-option--j|0-c|simple"] .bundle-content .bundle-header');
			}
			if (document.querySelector('[data-test-id="bundle-selector-option--j|1-c|simple"] .bundle-content .bundle-header')) {
				bundleHeaderVuelta = document.querySelector('[data-test-id="bundle-selector-option--j|1-c|simple"] .bundle-content .bundle-header');
			}
		} else if (pack === 'FULL') {
			if (document.querySelector('[data-test-id="bundle-selector-option--j|0-c|full"] .bundle-content .bundle-header')) {
				bundleHeaderIda = document.querySelector('[data-test-id="bundle-selector-option--j|0-c|full"] .bundle-content .bundle-header');
			}
			if (document.querySelector('[data-test-id="bundle-selector-option--j|1-c|full"] .bundle-content .bundle-header')) {
				bundleHeaderVuelta = document.querySelector('[data-test-id="bundle-selector-option--j|1-c|full"] .bundle-content .bundle-header');
			}
		}

		var num = porcentaje;

		function insertBanner(bundleHeader) {
			if (bundleHeader && !bundleHeader.parentElement.querySelector('.bannerDescuentoMobile')) {
				var newDivHtml = `
				<div class="bannerDescuentoMobile">
				<span class="left">¡VIAJA SMART!</span>
				<span class="right">
				<span class="discount">${num}%</span>
				<span class="discount2">de descuento</span>
				</span>
				</div>
				`;
				bundleHeader.insertAdjacentHTML('afterend', newDivHtml);
			}
		}

		insertBanner(bundleHeaderIda);
		insertBanner(bundleHeaderVuelta);
	}

	function allDiscounts(numDescSMART, numDescFULL) {
		addBannerDesktop(numDescSMART, 'SMART');
		addBannerDesktop(numDescFULL, 'FULL');
		addBannerMobile(numDescSMART, 'SMART');
		addBannerMobile(numDescFULL, 'FULL');
	}

	function clickButtons(numDescSMART, numDescFULL) {
		var smartFeeButtons = document.querySelectorAll('[data-test-id*="flight-smart-fee"], [data-test-id*="flight-club-fee"]');
		var buttonClickHandler = function() {
			allDiscounts(numDescSMART, numDescFULL);
		};
		smartFeeButtons.forEach(function(button) {
			button.addEventListener('click', buttonClickHandler);
		});
	}

	function checkWebAnonymous() {
		if (bookingData.Role === "WWW Anonymous") {
			return true;
		} else {
			return false;
		}
	}

	function includesPE() {
		if (typeRoute === 'DOMPE' || rutasPE.includes(outboundCity) || rutasPE.includes(returnCity)) {
			console.log("incluye ruta de peru");
			return true;
		} else {
			return false;
		}
	}
	
	///ACÁ PONER PORCENTAJE DESCUENTOS
	var descuentoSMART = 30;
	var descuentoFULL = 20;
	if (culture === 'es-PE' && postB === false && staff === 'False' && checkWebAnonymous() === true && includesPE() === true) {
		addCSS();
		allDiscounts(descuentoSMART, descuentoFULL);
		clickButtons(descuentoSMART, descuentoFULL);
		window.eventBus.subscribe({
			name: "DISCOUNTBUNDLESS",
			callback: function(e) {
				clickButtons(descuentoSMART, descuentoFULL);
			}
		});
	}

}, 600);	