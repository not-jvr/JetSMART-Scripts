var initCloseButtonDC = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/flight') return;
	clearInterval(initCloseButtonDC);

	var culture = bookingData.Culture;

	function addCSS() {
		var css = `
		.close-button-dc {
			align-items: center;
			background: #333;
			border: none;
			border-radius: 50%;
			color: #fff;
			cursor: pointer;
			display: flex;
			font-size: 26px;
			height: 34px;
			justify-content: center;
			line-height: 1;
			padding: 0;
			position: absolute;
			right: -17px;
			top: 0px;
			-moz-user-select: none;
			user-select: none;
			width: 34px;
			z-index: 100;
		}

		.close-button:hover {
			background: #17386c;
		}

		@media (max-width: 767px) {
			.close-button {
				top: -17px;
			}
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

	function addCloseButton() {
		if (!document.querySelector('.close-button-dc') && document.querySelector('[data-test-id="flight-dc-banner-no-discount-link"]')) {
			var closeButton = document.createElement('div');
			var originalButton = document.querySelector('[data-test-id="flight-dc-banner-no-discount-link"]');
			closeButton.className = 'close-button-dc';
			closeButton.textContent = '×';

			var banner = document.querySelector('ac-discount-club-banner');
			banner.id = 'discountBanner';

			banner.appendChild(closeButton);

			closeButton.addEventListener('click', function() {
				originalButton.click();
			});
		}
	}

	if (culture) {
		addCSS();
		window.eventBus.subscribe({
			name: "xButton", callback: function (e) {
				addCloseButton();
			}
		});
	}

}, 600);