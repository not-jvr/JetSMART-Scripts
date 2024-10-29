var initDescBundles = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/flight') return;
	clearInterval(initDescBundles);
	var culture = bookingData.Culture;

	function addCSS() {
		var css = `
		.desc-bundle {
			position: relative;
			width: 100%;
			height: 45px;
			margin-bottom: 15px;
		}

		.desc-bundle .container-desc {
			position: absolute;
			top: 0;
			bottom: 0;
			left: -7px;
			right: -7px;
			background: #b02b32;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.desc-bundle .container-desc:before {
			content: "";
			position: absolute;
			top: 100%;
			left: 0;
			width: 0;
			height: 0;
			border-style: solid;
			border-width: 0 7px 12px 0;
			border-color: transparent #b02b32 transparent transparent;
		}

		.desc-bundle .container-desc i {
			font-size: 57px;
			margin-right: 10px;
		}

		.text-center {
			text-align: center;
		}

		.desc-bundle .container-desc:after {
			content: "";
			position: absolute;
			top: 100%;
			right: 0;
			width: 0;
			height: 0;
			border-style: solid;
			border-width: 0 0 12px 7px;
			border-color: transparent transparent transparent #b02b32;
		}

		.desc-bundle .container-desc-emphasis {
			font-family: ClanOT-Black, sans-serif;
			font-size: 16px;
			line-height: 1;
			margin-bottom: 3px;
		}

		.desc-bundle .container-desc-secondary {
			font-family: ClanOT-Bold,sans-serif;
			font-size: 13px;
			line-height: 1;
		}

		[data-test-id="bundle-selector-option--j|0-c|full"] .desc-bundle {
			margin: 35px auto;
		}

		[data-test-id="bundle-selector-option--j|1-c|full"] .desc-bundle {
			margin: 35px auto;
		}

		.bundle-content .bundle-header .bundle-savings-container {
			font-size: 14px;
		}
		`;

		var head = document.head || document.getElementsByTagName('head')[0];
		var style = document.createElement('style');

		style.type = 'text/css';
		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}

		head.appendChild(style);
	}

	function addDescBundle(selector, desc) {
		var lineContainer = document.querySelector(selector + ' .line-container');
		var bundleDesc = document.querySelector(selector + ' .desc-bundle');
		if (lineContainer && !bundleDesc) {

			switch (culture) {
			case 'pt-BR':
				text1 = 'Economize até '
				text2 = 'comprando seu Pack!'
				break;
			case 'en-US':
				text1 = 'Save up to  '
				text2 = 'buying your Pack!'
				break;
			default:
				text1 = '¡Ahorra hasta '
				text2 = 'comprando tu Pack!'
				break;
			}

			var descBundle = `
			<div class="desc-bundle">
			<div class="container-desc">
			<i class="js-icon js-plane-ticket"></i>
			<div class="text-center">
			<div class="container-desc-emphasis">
			${text1}${desc}%
			</div>
			<div class="container-desc-secondary"><!---->${text2}<!----></div>
			</div>
			</div>
			</div>
			`;
			lineContainer.insertAdjacentHTML('afterend', descBundle);
		}
	}

	function addMobile(selector, desc) {
		var containerBundle = document.querySelector(selector + ' .bundle-price');
		var checkDesc = document.querySelector(selector + ' #newSaving');
		if (containerBundle && !checkDesc) {
			switch (culture) {
			case 'pt-BR':
				text1 = 'Economize até '
				break;
			case 'en-US':
				text1 = 'Save up to  '
				break;
			default:
				text1 = 'Ahorra hasta '
				break;
			}

			var descBundle = `
			<div class="bundle-savings-container" id="newSaving">
			<div class="bundle-savings-emphasis">
			${text1}
			<span class="font-bold"><!---->${desc}%</span>
			</div>
			</div>
			`;
			containerBundle.insertAdjacentHTML('afterend', descBundle);
		}
	}

	function allFunctions() {
		addDescBundle('[data-test-id="bundle-selector-option--j|0-c|simple"]', 50);
		addDescBundle('[data-test-id="bundle-selector-option--j|1-c|simple"]', 50);
		addDescBundle('[data-test-id="bundle-selector-option--j|0-c|full"]', 40);
		addDescBundle('[data-test-id="bundle-selector-option--j|1-c|full"]', 40);
		addMobile('[data-test-id="bundle-selector-option--j|0-c|simple"]', 50);
		addMobile('[data-test-id="bundle-selector-option--j|1-c|simple"]', 50);
		addMobile('[data-test-id="bundle-selector-option--j|0-c|full"]', 40);
		addMobile('[data-test-id="bundle-selector-option--j|1-c|full"]', 40);
		hideDescAntiguo();
	}

	function allEditsClick() {
		var smartFeeButtons = document.querySelectorAll('.smart-fee.nowrap.big, .discount-fee.nowrap.small, .smart-fee.nowrap.small, .discount-fee.nowrap.big');
		var buttonClickHandler = function () {
			addDescBundle('[data-test-id="bundle-selector-option--j|0-c|simple"]', 50);
			addDescBundle('[data-test-id="bundle-selector-option--j|1-c|simple"]', 50);
			addDescBundle('[data-test-id="bundle-selector-option--j|0-c|full"]', 40);
			addDescBundle('[data-test-id="bundle-selector-option--j|1-c|full"]', 40);
			addMobile('[data-test-id="bundle-selector-option--j|0-c|simple"]', 50);
			addMobile('[data-test-id="bundle-selector-option--j|1-c|simple"]', 50);
			addMobile('[data-test-id="bundle-selector-option--j|0-c|full"]', 40);
			addMobile('[data-test-id="bundle-selector-option--j|1-c|full"]', 40);
		};
		smartFeeButtons.forEach(button => button.addEventListener('click', buttonClickHandler));
	}

	function hideDescAntiguo() {
		var elements = document.querySelectorAll(".bundle-savings-container");
		elements.forEach(element => {
			if (element.id !== "newSaving") {
				element.style.display = "none";
			}
		});
	}

	addCSS();

	if(culture){
		allFunctions();
		allEditsClick();
		window.eventBus.subscribe({
			name: "SameBundleSize", callback: function (e) {
				allFunctions();
				allEditsClick();
			}
		});
	}

}, 600);