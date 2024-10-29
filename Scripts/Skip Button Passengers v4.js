var initSKIPButtonV4 = setInterval(function () {
	if (typeof bookingData === "undefined" || (window.location.pathname.toLowerCase() !== '/v2/baggage' && window.location.pathname.toLowerCase() !== '/v2/flight')) return;
	clearInterval(initSKIPButtonV4);

	var culture = bookingData.Culture;
	var roundTrip = bookingData.Roundtrip;
	var postB = bookingData.PostBooking;

	function getBundleHeader(bundleType, oneWayOrRoundtrip) { // oneWayOrRoundtrip -> 0 ida, 1 vuelta. bundleType -> full, smart
		var typeBundle;
		if (bundleType === 'full') {
			typeBundle = 'BND2';
		} else if (bundleType === 'simple') {
			typeBundle = 'BND1';
		}
		let bundleHeader = document.querySelector(`[data-test-value="${typeBundle}"][data-test-id="bundle-header--j|${oneWayOrRoundtrip}-c|${bundleType}"]`);
		return bundleHeader;
	}

	function addImageOnBundle(bundleElement, imgURL, bundleImgClass) {
		const img = document.createElement('img');

		img.className = bundleImgClass;

		img.style.position = 'relative';
		img.style.top = '10px';

		img.src = imgURL;

		if (bundleElement && !document.querySelector(`img.${bundleImgClass}`)) {
			bundleElement.appendChild(img);
		}

	}

	function addCSSFlight() {
		var css = `
		@media (min-width: 767px) {
			.bundle-header.full .header-img {
				top: 0 !important;
			}

			`;

			var style = document.createElement('style');
			style.appendChild(document.createTextNode(css));
			document.head.appendChild(style);
		}

		function removeMejorPrecioBundleFULL() {
			let headerBundleFULL_Departure = getBundleHeader('full', '0')
			let headerBundleFULL_Return = getBundleHeader('full', '1')

			if (headerBundleFULL_Departure) {
				let bestPrice = headerBundleFULL_Departure.querySelector('.best-price-label');
				if (bestPrice) {
					bestPrice.remove();
				}
			}


			if (headerBundleFULL_Return) {
				let bestPrice = headerBundleFULL_Return.querySelector('.best-price-label');
				if (bestPrice) {
					bestPrice.remove();
				}
			}
		}

		function allEdits() {
			removeMejorPrecioBundleFULL();
			var BundleSMARTHeaderIda = getBundleHeader('simple', '0');
			var BundleFULLHeaderIda = getBundleHeader('full', '0');
			var BundleSMARTHeaderVuelta = getBundleHeader('simple', '1');
			var BundleFULLHeaderVuelta = getBundleHeader('full', '1');


			var franjaBundleSMART = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/6f6e6c6a-6b46-4a85-88bd-0c6f4e82439f/pack%20smart%20compra%20rapida%201.png';
			var franjaBundleFULL = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/f7306cad-d60d-4ff5-b60c-a64f5c58858f/pack%20full%20compra%20rapida%201.png';

			if(culture === 'en-US') {
				franjaBundleSMART = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/54fb70ab-86c5-4c89-beaf-ed64fc58f039/fast%20purchase%20smart.png';
				franjaBundleFULL = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/b63daa08-1fbb-4c71-9f8b-23f57d87d2c5/fast%20purchase%20full.png';
			}

			addImageOnBundle(BundleSMARTHeaderIda, franjaBundleSMART, 'smart-ida');
			addImageOnBundle(BundleFULLHeaderIda, franjaBundleFULL, 'full-ida');

			addImageOnBundle(BundleSMARTHeaderVuelta, franjaBundleSMART, 'smart-vuelta');
			addImageOnBundle(BundleFULLHeaderVuelta, franjaBundleFULL, 'full-vuelta');
		}

		function checkWebAnonymous() {
			if (bookingData.Role === "WWW Anonymous") {
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
					modalLink = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/acf02ee6-2dcc-4f9a-a03a-7b05eb1126e8/SMART%20EN.png';
					buttonSkip = 'Go straight to PAY';
					noSkipText = 'Add more extras to my booking';
					break;
				case 'pt-BR':
					modalLink = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/ce0a548c-0631-4fab-9bc5-8cbe5a4c86c3/SMART%20PT.png';
					buttonSkip = 'Ir direto para PAGAR';
					noSkipText = 'Adicionar mais extras à minha reserva';
					break;
				default:
					modalLink = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/bbddf6c4-18d1-4295-9556-2275a7807fc2/SMART%20ESP.png';
					buttonSkip = 'Ir directo a PAGAR';
					noSkipText = 'Añadir más extras a mi reserva';
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
					window.location.href = 'https://booking.jetsmart.com/V2/Payment';
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
					modalLink = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/14fec685-29cb-4882-a8b5-6e30a568c6c6/FULL%20EN.png';
					buttonSkip = 'Go straight to PAY';
					noSkipText = 'Add more extras to my booking';
					break;
				case 'pt-BR':
					modalLink = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/bf343313-0566-4aad-b653-486d0d7855d5/FULL%20PT.png';
					buttonSkip = 'Ir direto para PAGAR';
					noSkipText = 'Adicionar mais extras à minha reserva';
					break;
				default:
					modalLink = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/8cca8719-f3c6-4743-a3f9-5559864156e3/FULL%20ESP.png';
					buttonSkip = 'Ir directo a PAGAR';
					noSkipText = 'Añadir más extras a mi reserva';
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
					window.location.href = 'https://booking.jetsmart.com/V2/Payment';
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
				if (outboundBundle && returnBundle && outboundBundle === 'BND2' && returnBundle === 'BND2') {
					addModalFULL();
				} else if (outboundBundle && returnBundle && outboundBundle === 'BND1' && returnBundle === 'BND1') {
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

		if(window.location.pathname.includes('/V2/Flight')) {
			if (!postB && checkWebAnonymous() && isDesktop()) {
				window.eventBus.subscribe({
					name: "SidebarReloaded", callback: function (e) {
						allEdits();
						addCSSFlight();
					}
				});
			}
		} else if(window.location.pathname.includes('/V2/Baggage')) {
			if(isDesktop() && !postB && checkWebAnonymous()){
				addModal();
			}
		}

	}, 600);