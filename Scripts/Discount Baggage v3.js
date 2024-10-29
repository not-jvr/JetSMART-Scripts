var baggageDiscountv3 = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Baggage') return;
	clearInterval(baggageDiscountv3);

	var staff = JetSmart.AppContext.isStaff;
	var culture = bookingData.Culture;

	function addCSS() {
		var css = `
		.greyTitleDiscount{
			width: 100%;
			height: 36px;
			background-color: #f2f2f2;
			position: absolute;
			top: 0px;
			border-radius: 13px 0 0 0;
		}

		.discountTitleBaggage {
			background-image: url(https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/6472a872-2ccc-433b-9a5e-1337109f57ab/img-baggage-top.png);
			background-size: contain;
			width: 100%;
			display: flex;
			align-content: stretch;
			justify-content: space-around;
			position: absolute;
			top: -1px;
			border-radius: 0 13px 0 0;
		}

		.discountTitleBaggage .titlebag {  
			position: absolute;
			--text-opacity: 1;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			--bg-opacity: 1;
			background-color: transparent;  
			line-height: 1; 
			top: -4px;
			right: unset;
			font-size: 18px;
			width: 242px;
			height: 42px;
			font-weight: 700;
		}

		.discountTitleBaggage .iconBag {
			position: relative;
			padding: 6px 30px;
			width: 84px;
			display: flex;
			right: 80px;
			margin-right: 82px;
		}

		@media (max-width: 767px) {
			.discountTitleBaggage {
				border-radius: 0 0 0 0;
				top: -3px;
				left: 0;
			}

			.discountTitleBaggage .titlebag {
				margin-top: -6px;
				font-size: 15px;
				width: 200px;
			}

			.discountTitleBaggage .iconBag {
				width: 75px;
			}
		}

		[data-test-id="baggage-page-section-mb--c|CheckedBaggage"] .b2-illustration-ribbon, [data-test-id="baggage-per-booking-paid-illustration-ribbon--c|CheckedBaggage"], [data-test-id="baggage-per-booking-paid-illustration-ribbon--c|CheckedBaggage-m|1"], [data-test-id="baggage-per-booking-paid-illustration-ribbon--c|CabinBaggage"], [data-test-id="baggage-per-booking-paid-illustration-ribbon--c|CabinBaggage-m|1"], [data-test-id="baggage-page-section--c|CabinBaggage"] .b2-illustration-ribbon {
			display: none;
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

	///FUNCION BOTONES INFINITOS EN MOBILE XD///
	function click1() {
		setTimeout(function() {
			var miElemento = document.querySelector('[data-test-id="baggage-open-per-journey-per-pax-view-button--c|CabinBaggage-m|1"]');

			if (miElemento) {
				discountBaggage(descuentoCabina, 0);
				discountBaggage(descuentoBodega, 1);
				miElemento.addEventListener('click', function() {
					click2();
				});
			}
		}, 500);
	}

	function click2() {
		setTimeout(function() {
			var miElemento = document.querySelector('[data-test-id="baggage-close-per-journey-per-pax-view-button--c|CabinBaggage-m|1"]');

			if (miElemento) {
				discountBaggage(descuentoCabina, 0);
				discountBaggage(descuentoBodega, 1);
				miElemento.addEventListener('click', function() {
					click1();
				});
			}
		}, 500);
	}

	function click3() {
		setTimeout(function() {
			var miElemento = document.querySelector('[data-test-id="baggage-open-per-journey-per-pax-view-button--c|CheckedBaggage-m|1"]');

			if (miElemento) {
				discountBaggage(descuentoCabina, 0);
				discountBaggage(descuentoBodega, 1);
				miElemento.addEventListener('click', function() {
					click4();
				});
			}
		}, 500);
	}

	function click4() {
		setTimeout(function() {
			var miElemento = document.querySelector('[data-test-id="baggage-close-per-journey-per-pax-view-button--c|CheckedBaggage-m|1"]');

			if (miElemento) {
				discountBaggage(descuentoCabina, 0);
				discountBaggage(descuentoBodega, 1);
				miElemento.addEventListener('click', function() {
					click3();
				});
			}
		}, 500);
	}

	function allClicks() {
		click1();
		click2();
		click3();
		click4();
	}
	/////////////////////////////////////////

	function discountBaggage(discount, type) {
		var baggageTitleSelector;
		var baggageGreyDesktopSelector;

		if (type === 0 && discount > 0) {
			baggageTitleSelector = document.querySelectorAll('[data-test-id="baggage-page-section--c|CabinBaggage"] .b2-paid-bag-option .b2-illustration, [data-test-id="baggage-page-section--c|CabinBaggage"] .b2m-per-booking-section.padded, [data-test-id="baggage-page-section-mb--c|CabinBaggage"] .b2m-per-pax-container');
			baggageGreyDesktopSelector = document.querySelectorAll('[data-test-id="baggage-page-section--c|CabinBaggage"] .b2-free-bag-option .b2-illustration');
		} else if (type === 1 && discount > 0) {
			baggageTitleSelector = document.querySelectorAll('[data-test-id="baggage-page-section--c|CheckedBaggage"] .b2-paid-bag-option .b2-illustration, [data-test-id="baggage-page-section--c|CheckedBaggage"] .b2m-per-booking-section.padded, [data-test-id="baggage-page-section-mb--c|CheckedBaggage"] .b2m-per-pax-container');
			baggageGreyDesktopSelector = document.querySelectorAll('[data-test-id="baggage-page-section--c|CheckedBaggage"] .b2-free-bag-option .b2-illustration');
		} else {
			console.log('Escoge cabina (0) o bodega (1)');
			return;
		}

		var titulo;

		switch (culture) {
		case "pt-BR":
			titulo = `!DESCONTO DE ${discount}%!`;
			break;
		case "en-US":
			titulo = `!${discount}% DISCOUNT!`;
			break;
		default:
			titulo = `!${discount}% DE DESCUENTO!`;
			break;
		}

		var titleBagaggeHTML = `
		<div class="discountTitleBaggage">
		<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/1781df1a-d38f-44a1-bf58-0064529f7354/icon-verified.png" class="iconBag" alt="">
		<div class="titlebag">${titulo}</div>
		</div>
		`;

		var titleBagaggeGreyHTML = `
		<div class="greyTitleDiscount"></div>
		`;

		baggageTitleSelector.forEach(function(el) {
			if (!el.querySelector('.discountTitleBaggage')) {
				el.insertAdjacentHTML('afterbegin', titleBagaggeHTML);
			}
		});

		baggageGreyDesktopSelector.forEach(function(el) {
			if (!el.querySelector('.greyTitleDiscount')) {
				el.insertAdjacentHTML('afterbegin', titleBagaggeGreyHTML);
			}
		});
	}

	function allFunctions() {
		discountBaggage(descuentoCabina, 0);
		discountBaggage(descuentoBodega, 1);
		allClicks();
	}

	/// DESCUENTOS ///
	/// DEJAR EN 0 SI NO SE DESEA DESCUENTO EN EL TIPO CORRESPONDIENTE ///
	var descuentoCabina = 10;
	var descuentoBodega = 5;

	if (1 === 1) {
		addCSS();
		allFunctions();
	}

}, 600);