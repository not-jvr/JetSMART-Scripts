var initSKIPButtonV5 = setInterval(function () {
	if (typeof bookingData === "undefined" || (window.location.pathname.toLowerCase() !== '/v2/baggage' && window.location.pathname.toLowerCase() !== '/v2/flight')) return;
	clearInterval(initSKIPButtonV5);

	var culture = bookingData.Culture;
	var roundTrip = bookingData.Roundtrip;
	var postB = bookingData.PostBooking;
	///FLIGHT///
	function addCSSFlight() {
		var css = `
		@media (min-width: 768px) {
		.bundle-header[data-test-value="BND1"] .header-img, .bundle-header[data-test-value="BND2"] .header-img, .bundle-header[data-test-value="BNC1"] .header-img, .bundle-header[data-test-value="BNC2"] .header-img {
			height: 65px;
		}

		.bundle-header[data-test-value="BND0"] .header-img, .bundle-header[data-test-value="BNC0"] .header-img {
			height: 45px;
		}
			}

		@media (max-width: 767px) {
    	.bundle-content .bundle-header .header-img {
        	height: 32px;
    		}
		[data-test-id="bundle-selected-container--j|0-m|1"] img, [data-test-id="bundle-selected-container--j|1-m|1"] img {
			max-height: 35px;
			}
		[data-test-id="bundle-upgrade-image--j|0-m|1"], [data-test-id="bundle-upgrade-image--j|1-m|1"] {
			height: 40px;
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

	function updateBundleMobile() {
		var bundles = document.querySelectorAll('[data-test-id="bundle-header-image--j|0-c|none-m|1"], [data-test-id="bundle-header-image--j|1-c|none-m|1"], [data-test-id="bundle-header-image--j|0-c|simple-m|1"], [data-test-id="bundle-header-image--j|1-c|simple-m|1"], [data-test-id="bundle-header-image--j|0-c|full-m|1"], [data-test-id="bundle-header-image--j|1-c|full-m|1"]');

		bundles.forEach(function (bundle) {
			var dataTestId = bundle.getAttribute('data-test-id');

			if (dataTestId.includes('none')) {
				bundle.src = "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/2c1fcf3a-15d9-4216-8a20-e8c319238936/B%C3%A1sica.png";
			} else if (dataTestId.includes('simple')) {
				bundle.src = "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/aa0e88f3-0090-4298-b5a0-86263c7b8fd4/plus.png";
			} else if (dataTestId.includes('full')) {
				bundle.src = "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/bddb1f74-6d8e-45b9-973e-85462aa72265/premium.png";
			}
		});

	}

	function updateBundleMobileSelected() {
		var selectedBundles = document.querySelectorAll('[data-test-id="bundle-selected-container--j|0-m|1"], [data-test-id="bundle-selected-container--j|1-m|1"]');
	
		selectedBundles.forEach(function (bundle) {
			var dataTestValue = bundle.getAttribute('data-test-value');
	
			var imgElement = bundle.querySelector('img');
	
			if (dataTestValue === 'None' && imgElement) {
				imgElement.src = "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/2c1fcf3a-15d9-4216-8a20-e8c319238936/B%C3%A1sica.png";
			} else if (dataTestValue === 'Simple' && imgElement) {
				imgElement.src = "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/aa0e88f3-0090-4298-b5a0-86263c7b8fd4/plus.png";
			} else if (dataTestValue === 'Full' && imgElement) {
				imgElement.src = "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/bddb1f74-6d8e-45b9-973e-85462aa72265/premium.png";
			}
		});
	}

	function updateUpgradeMobile() {
		var upgradeImages = document.querySelectorAll('[data-test-id="bundle-upgrade-image--j|0-m|1"], [data-test-id="bundle-upgrade-image--j|1-m|1"]');
	
		upgradeImages.forEach(function (img) {
			var imgSrc = img.getAttribute('src');
	
			if (imgSrc === 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/7d5237fe-9ae0-45e1-9618-2e2276de9489/upgrade-p-smart-color.png') {
				img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/ab30c5e0-13e0-4715-a0bd-45af66a865dc/upgrade%20plus%20%281%29.png';
			} else if (imgSrc === 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/16ac772a-5056-436e-b13d-f3170e22c5f7/upgrade-p-full-color.png') {
				img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/54606a07-491a-4f33-a21c-f093df452e9b/upgrade%20premium%20%281%29.png';
			} else if (imgSrc === 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/5d9a9d01-faea-45ab-b659-69989e700aa3/upgrade-p-smart-color-dc.png') {
				img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/ab30c5e0-13e0-4715-a0bd-45af66a865dc/upgrade%20plus%20%281%29.png';
			}
		});
	}

	function updateBundleImages() {
		var bundles = document.querySelectorAll('.bundle-header[data-test-value="BND0"], .bundle-header[data-test-value="BND1"], .bundle-header[data-test-value="BND2"], .bundle-header[data-test-value="BNC0"], .bundle-header[data-test-value="BNC1"], .bundle-header[data-test-value="BNC2"]');
		var NONE = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/2c1fcf3a-15d9-4216-8a20-e8c319238936/B%C3%A1sica.png';
		var SMART = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/d75963b6-3989-47c5-998f-8a2e128b4aa8/compra%20rapida%20plus.png';
		var FULL = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/d9071642-7267-475b-a996-9a291be4d1f9/compra%20rapida%20premium.png';

		if (culture === 'pt-BR') {
			SMART = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/f33adbdd-4b0c-47be-a47d-5f6e13f7e46a/Compra%20R%C3%A1pida%20SMART%20ES.png';
			FULL = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/c17c16b6-993c-480b-88ac-b1da639c3cad/Compra%20R%C3%A1pida%20FULL%20PT.png';
		} else if (culture === 'en-US') {
			SMART = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/9804ad62-b680-4128-995c-f34647fc919a/Compra%20R%C3%A1pida%20SMART%20EN.png';
			FULL = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/2b3efec1-767b-45d6-a44c-675aa081f000/Compra%20R%C3%A1pida%20FULL%20EN.png';
		}

		bundles.forEach(bundle => {
			var imgElement = bundle.querySelector('.header-img');

			if (imgElement) {
				if (bundle.getAttribute('data-test-value') === 'BND1' || bundle.getAttribute('data-test-value') === 'BNC1') {
					imgElement.src = SMART;
				} else if (bundle.getAttribute('data-test-value') === 'BND2' || bundle.getAttribute('data-test-value') === 'BNC2') {
					imgElement.src = FULL;
				} else if (bundle.getAttribute('data-test-value') === 'BND0' || bundle.getAttribute('data-test-value') === 'BNC0') {
					imgElement.src = NONE;
				}
			}
		});
	}

	function updateSelectedBundleImages() {
		var bundles = document.querySelectorAll('.selected-flight [data-test-value]');
		var NONE = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/2c1fcf3a-15d9-4216-8a20-e8c319238936/B%C3%A1sica.png';
		var SMART = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/d75963b6-3989-47c5-998f-8a2e128b4aa8/compra%20rapida%20plus.png';
		var FULL = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/d9071642-7267-475b-a996-9a291be4d1f9/compra%20rapida%20premium.png';

		if (culture === 'pt-BR') {
			SMART = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/f33adbdd-4b0c-47be-a47d-5f6e13f7e46a/Compra%20R%C3%A1pida%20SMART%20ES.png';
			FULL = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/c17c16b6-993c-480b-88ac-b1da639c3cad/Compra%20R%C3%A1pida%20FULL%20PT.png';
		} else if (culture === 'en-US') {
			SMART = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/9804ad62-b680-4128-995c-f34647fc919a/Compra%20R%C3%A1pida%20SMART%20EN.png';
			FULL = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/2b3efec1-767b-45d6-a44c-675aa081f000/Compra%20R%C3%A1pida%20FULL%20EN.png';
		}

		bundles.forEach(bundle => {
			var imgElement = bundle.querySelector('[data-test-id^="bundle-selected-image"]');

			if (imgElement) {
				if (bundle.getAttribute('data-test-value') === 'Simple') {
					imgElement.src = SMART;
				} else if (bundle.getAttribute('data-test-value') === 'Full') {
					imgElement.src = FULL;
				} else if (bundle.getAttribute('data-test-value') === 'None') {
					imgElement.src = NONE;
				}
			}
		});
	}

	function updateSelectedBundleImagesUpgrade() {
		var upgrades = document.querySelectorAll('.selected-flight .bundle-upgrade-offer-container');
		var oldNone = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/e5243078-015a-4f4a-b695-5626c46dbbd0/upgrade-p-smart-white.png';
		var oldSMART = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/fb6457e6-997c-4e8d-bd1e-57993ce03922/upgrade-p-full-white.png';
		var newNone = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/c4473c73-f5a9-4a42-ae2a-914a4af0f69c/upgrade%20plus.png';
		var newSMART = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/2ecc9e71-bdf1-4b57-bf07-e442d9a5fc1c/upgrade%20premium.png';

		upgrades.forEach(function (upgrade) {
			// Seleccionar todas las imágenes dentro de cada contenedor
			var images = upgrade.querySelectorAll('img');

			images.forEach(function (img) {
				// Verificar y reemplazar el src si coincide con los valores antiguos
				if (img.src === oldNone) {
					img.src = newNone;
				} else if (img.src === oldSMART) {
					img.src = newSMART;
				}
			});
		});
	}

	function updateAllBundlesTitles() {
		const bundleTitles = document.querySelectorAll('.bundles-header .bundles-title');

		bundleTitles.forEach(bundleTitle => {
			bundleTitle.innerHTML = "¡Ahorra más! Y elige la Tarifa que más te acomoda:";
		});
	}

	function allFunctionsFlight() {
		updateBundleImages();
		updateSelectedBundleImages();
		updateAllBundlesTitles();
		updateSelectedBundleImagesUpgrade();
		updateBundleMobile();
		updateBundleMobileSelected();
		updateUpgradeMobile();
	}

	///FIN FLIGHT///

	///BAGGAGE///
	function checkWebAnonymous() {
		if (bookingData.Role === "WWW Anonymous" || bookingData.Role === "WWW Member") {
			return true;
		} else {
			return false;
		}
	}

	function addModalSMART() {
		function addCSS() {
			var css = `
		.modalSkipPayment {
			position: fixed;
			z-index: 1000;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			overflow: auto;
			background-color: rgba(0,0,0,0.5);
		}

		.modalContent {
			border-radius: 10px;
			left: 50%;
			position: fixed;
			top: 50%;
			transform: translate(-50%, -50%);
		}

		.modalContent img {
			max-width: 100% !important;
			width: auto;
			height: auto;
		}

		.customButton {
			background-color: #00abc8;
			border: 2px solid #ffff;
			border-color: #ffff;
			border-radius: 9999px;
			color: #ffff;
			cursor: pointer;
			font-size: 1vw;
			font-weight: 700;
			line-height: 1;
			min-width: 10vw;
			padding: 0.5vw 1vw;
		}

		.customButton:hover {
			color: #00abc8;
			background-color: #ffff;
			border-color: #00abc8;

		}

		.modalButton {
			position: absolute;
			bottom: 11%;
			left: 50%;
			transform: translateX(-50%);
		}

		.modalButton2 {
			position: absolute;
			bottom: 2%;
			left: 50%;
			transform: translateX(-50%);
		}

		.customButton2 {
			color: #1C355E;
			cursor: pointer;
			font-size: 0.8vw;
			padding: 0.5vw 1vw;
			font-weight: 700;
		}

		.customButton2:hover {
			text-decoration: underline;
		}

		.closeButtonSkip {
			position: absolute;
			top: 0%;
			right: -2%;
			width: 30px;
			height: 30px;
			border-radius: 50%;
			font-size: 24px;
			background-color: #b92234;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			color: white;
			z-index: 1001;
		}

		.closeButtonSkip:hover {
			background-color: #ffff;
			color: #b92234;
		}

		#packSmart {
			color: #17386c;
		}

		#packSmart:hover {
			background-color: #17386c;
			color: #ffff;
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


		if (!document.querySelector('#myModalSkip')) {
			var modalLink;
			var buttonSkip;
			var noSkipText;

			switch (culture) {
				case 'en-US':
					modalLink = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/f730b45d-a1d0-4d62-a9bc-51b234a57366/SMART%20EN.png';
					buttonSkip = 'Go to Checkout';
					noSkipText = 'I would like to add more elements to my reservation';
					break;
				case 'pt-BR':
					modalLink = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/256ab4ab-ad45-45d6-a033-7cdc999ca07b/SMART%20PT.png';
					buttonSkip = 'Ir para o Checkout';
					noSkipText = 'Gostaria de adicionar mais elementos à minha reserva';
					break;
				default:
					modalLink = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/e69e25fd-da90-4d36-9f03-956a230d1287/PLUS%20ESP.png';
					buttonSkip = 'Ir a Finalizar la compra';
					noSkipText = 'Me gustaría añadir más elementos a mi reserva';
					break;
			}

			var modalTemplate = `
		<div id="myModalSkip" class="modalSkipPayment">
		<div class="modalContent">
		<img src="${modalLink}" alt="Modal Image">
		<div class="closeButtonSkip" data-test-id="close-button-skip">&times;</div> <!-- Botón X -->
		<div class="modalButton">
		<div class="customButton" data-test-id="direct-payment-button-skip">${buttonSkip}</div>
		</div>
		<div class="modalButton2">
		<div class="customButton2" data-test-id="more-extras-button-skip">${noSkipText}</div>
		</div>
		</div>
		</div>
		`;
			document.body.insertAdjacentHTML('beforeend', modalTemplate);

			var skipButton = document.querySelector('.customButton');
			skipButton.addEventListener('click', function () {
				var modal = document.querySelector('#myModalSkip');
				modal.style.display = 'none';
				window.location.href = 'https://booking.jetsmart.com/V2/Passengers';
			});

			var noSkip = document.querySelector('.customButton2');
			noSkip.addEventListener('click', function () {
				var modal = document.querySelector('#myModalSkip');
				modal.remove();
			});

			var closeButton = document.querySelector('.closeButtonSkip');
			closeButton.addEventListener('click', function () {
				var modal = document.querySelector('#myModalSkip');
				modal.remove();
			});
		}
		addCSS();

	}

	function addModalFULL() {
		function addCSS() {
			var css = `
		.modalSkipPayment {
			position: fixed;
			z-index: 1000;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			overflow: auto;
			background-color: rgba(0,0,0,0.5);
		}

		.modalContent {
			border-radius: 10px;
			left: 50%;
			position: fixed;
			top: 50%;
			transform: translate(-50%, -50%);
		}

		.modalContent img {
			max-width: 100% !important;
			width: auto;
			height: auto;
		}

		.customButton {
			background-color: #1C355E;
			border: 2px solid #ffff;
			border-color: #ffff;
			border-radius: 9999px;
			color: #ffff;
			cursor: pointer;
			font-size: 1vw;
			font-weight: 700;
			line-height: 1;
			min-width: 10vw;
			padding: 0.5vw 1vw;
		}

		.customButton:hover {
			color: #00abc8;
			background-color: #ffff;
			border-color: #1C355E;

		}

		.modalButton {
			position: absolute;
			bottom: 11%;
			left: 50%;
			transform: translateX(-50%);
		}

		.modalButton2 {
			position: absolute;
			bottom: 2%;
			left: 50%;
			transform: translateX(-50%);
		}

		.customButton2 {
			color: #1C355E;
			cursor: pointer;
			font-size: 0.8vw;
			padding: 0.5vw 1vw;
			font-weight: 700;
		}

		.customButton2:hover {
			text-decoration: underline;
		}

		.closeButtonSkip {
			position: absolute;
			top: 0%;
			right: -2%;
			width: 30px;
			height: 30px;
			border-radius: 50%;
			font-size: 24px;
			background-color: #b92234;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			color: white;
			z-index: 1001;
		}

		.closeButtonSkip:hover {
			background-color: #ffff;
			color: #b92234;
		}

		#packSmart {
			color: #FFFF;
		}

		#packSmart:hover {
			background-color: #FFFF;
			color: #17386c;
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

		if (!document.querySelector('#myModalSkip')) {
			var modalLink;
			var buttonSkip;
			var noSkipText;

			switch (culture) {
				case 'en-US':
					modalLink = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/34e6339c-15b8-4d9b-a33e-93fbfea71c4e/FULL%20EN.png';
					buttonSkip = 'Go to Checkout';
					noSkipText = 'I would like to add more elements to my reservation';
					break;
				case 'pt-BR':
					modalLink = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/9e609bd9-dc3e-4833-b6aa-d149a0c5c6c4/FULL%20PT.png';
					buttonSkip = 'Ir para o Checkout';
					noSkipText = 'Gostaria de adicionar mais elementos à minha reserva';
					break;
				default:
					modalLink = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/817b8cb6-73fc-4be1-9b97-8c1536577e03/PREMIUM%20ESP.png';
					buttonSkip = 'Ir a Finalizar la compra';
					noSkipText = 'Me gustaría añadir más elementos a mi reserva';
					break;
			}

			var modalTemplate = `
		<div id="myModalSkip" class="modalSkipPayment">
		<div class="modalContent">
		<img src="${modalLink}" alt="Modal Image">
		<div class="closeButtonSkip" data-test-id="close-button-skip">&times;</div> <!-- Botón X -->
		<div class="modalButton">
		<div class="customButton" id="packSmart" data-test-id="direct-payment-button-skip">${buttonSkip}</div>
		</div>
		<div class="modalButton2">
		<div class="customButton2" data-test-id="more-extras-button-skip">${noSkipText}</div>
		</div>
		</div>
		</div>
		`;
			document.body.insertAdjacentHTML('beforeend', modalTemplate);

			var skipButton = document.querySelector('.customButton');
			skipButton.addEventListener('click', function () {
				var modal = document.querySelector('#myModalSkip');
				modal.style.display = 'none';
				window.location.href = 'https://booking.jetsmart.com/V2/Passengers';
			});

			var noSkip = document.querySelector('.customButton2');
			noSkip.addEventListener('click', function () {
				var modal = document.querySelector('#myModalSkip');
				modal.remove();
			});

			var closeButton = document.querySelector('.closeButtonSkip');
			closeButton.addEventListener('click', function () {
				var modal = document.querySelector('#myModalSkip');
				modal.remove();
			});
		}
		addCSS();
	}

	function addModal() {
		var outboundBundle = bookingData.OutboundBundleCode;
		var returnBundle = bookingData.ReturnBundleCode;

		if (roundTrip === true) {
			if (outboundBundle && returnBundle && ((outboundBundle === 'BND2' && returnBundle === 'BND2') || (outboundBundle === 'BNC2' && returnBundle === 'BNC2'))) {
				addModalFULL();
			} else if (outboundBundle && returnBundle && ((outboundBundle === 'BND1' && returnBundle === 'BND1') || (outboundBundle === 'BNC1' && returnBundle === 'BNC1'))) {
				addModalSMART();
			}
		} else if (roundTrip === false || roundTrip === null) {
			if (outboundBundle && outboundBundle === 'BND2') {
				addModalFULL();
			} else if (outboundBundle && outboundBundle === 'BND1') {
				addModalSMART();
			}
		}
	}

	function isDesktop() {
		if (window.innerWidth >= 768) {
			return true;
		} else {
			return false;
		}
	}

	if (!postB && checkWebAnonymous() && (culture !== 'pt-BR' && culture !== 'en-US')) {
		if (window.location.pathname.includes('/V2/Flight')) {
			addCSSFlight();
			allFunctionsFlight();
			window.eventBus.subscribe({
				name: "titleBundles", callback: function (e) {
					allFunctionsFlight();
				}
			});
		} else if (window.location.pathname.includes('/V2/Baggage')) {
			console.log("A")
			addModal();
		}
	}

}, 600);