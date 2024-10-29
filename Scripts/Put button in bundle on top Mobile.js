var buttonBundleTopMobile = setInterval(function() {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
	clearInterval(buttonBundleTopMobile);

	function addCSS() {
		var css = `
		@media (max-width: 767px) {
			.bundle-footer {
				margin-top: -383px;
				position: absolute;
				width: 100%;
				z-index: 9;
			}

			.bundle-footer .bundle-button {
				background-color: #fff;
				border-color: #b2292e;
				color: #b2292e;
			}

			.bundle-footer .bundle-button i {
				color: #b2292e;
				border-color: #b2292e;
			}

			.bundle-container ul li, .selected-flight .bundle-container ul li, .selected-flight .selected-bundle-container ul li {
				z-index: 10;
			}
		}
		`;

		var style = document.createElement('style');
		style.appendChild(document.createTextNode(css));
		document.head.appendChild(style);
	}

	addCSS();

}, 600);