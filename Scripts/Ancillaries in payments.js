var initIncludesInPayment = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Payment') return;
	clearInterval(initIncludesInPayment);

	var culture = bookingData.Culture;
	var roundTrip = bookingData.Roundtrip;
	
	if (window.innerWidth >= 768 && !roundTrip) {

		if (culture === 'es-PE' || culture === 'es-AR' || culture === 'es-CL') {

			var a = bookingData.Passengers[0];
			var o = false;
			o = a.hasOwnProperty("OutboundJourneySsrs") && a.OutboundJourneySsrs && (a.OutboundJourneySsrs.indexOf("STB1") !== -1 || a.OutboundJourneySsrs.indexOf("STB2") !== -1);

			let ancillaries = bookingData.Passengers.map(pass => pass.Ancillaries);
			let selected = ancillaries.map(anc => anc.Outbound.Selected).concat(ancillaries.map(anc => {
				if (anc.Return != null) {
					return anc.Return.Selected
				}
			}
			));
			selected = selected.flat();
			selected = selected.filter(sel => sel !== undefined);

			let bolsoDeMano = bookingData.Passengers.length;
			let countEquipaje = selected.filter(sel => sel.ChargeCode == "BAGD" || sel.ChargeCode == "BAGP" || sel.ChargeCode == "BAGC").length;
			let countFlexi = selected.filter(sel => sel.ChargeCode == "FLXB").length;
			let countEmbarque = selected.filter(sel => sel.ChargeCode == "APCD" || sel.ChargeCode == "APCP" || sel.ChargeCode == "APCC").length;
			let countPriori = selected.filter(sel => sel.ChargeCode == "PBD" || sel.ChargeCode == "PBP" || sel.ChargeCode == "PBC").length;
			let countMascota = selected.filter(sel => sel.ChargeCode == "PTCD" || sel.ChargeCode == "PTCP" || sel.ChargeCode == "PTCC").length;
			let countEquipajeMano = selected.filter(sel => sel.ChargeCode == "LBGD" || sel.ChargeCode == "LBGP" || sel.ChargeCode == "LBGC").length;
			let countSeguro = selected.filter(sel => sel.ChargeCode == "TIF").length;
			let countAsientos  = selected.filter(sel => sel.ChargeCode == "STF").length;

			/*
			var vuelta = bookingData.AvailableReturnJourneys;
			if (vuelta){
				var bolsoDeMano = bookingData.Passengers.length*2;
			} else {
				var bolsoDeMano = bookingData.Passengers.length;
			} 

			if (vuelta) {
				var textIdaVuelta = document.querySelector("payment-contact-form");
				textIdaVuelta.insertAdjacentHTML('afterend',
					`<span class="payment-message text-idad-vuelta">Recuerda que esto incluye los opcionales comprados para tu ida y para tu vuelta</span>`);
			}
			*/

			if (a.OutboundJourneySsrs.indexOf("STB2") !== -1) {
				var searchDateIcon = document.querySelector("#contactForm2 > div");
				searchDateIcon.insertAdjacentHTML('afterend',
					`<div class="inner-deep-box payment-chb ts-error-parent">
					<span class="payments-reserva">
					Tu reserva incluye:
					</span>
					<div class="slider slider--first js-slider">
					<div class="slider__wrapper">
					<div class="slider__arrow slider__arrow-prev js-slider-prev">
					<i class="js-circle-chevron-right js-icon arrow-prev-payment"></i>
					</div>
					<div class="slider__inner js-slider-inner">
					<div class="slider__slide">
					<div class="slide__content">
					<div class="countIncludes">
					Llevas<br>
					<span class="text-count">${bolsoDeMano}</span>
					</div>
					<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/06bc7624-4544-412f-ae00-0e3cd6984a59/bolso-de-mano.png" class="slider__image" />
					</div>
					</div>
					<div class="slider__slide">
					<div class="slide__content">
					<div class="countIncludes">
					Llevas<br>
					<span class="text-count">${countEquipajeMano}</span>
					</div>
					<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/85ad3439-9b44-4fb1-928c-3e3ecd217110/equipaje-de-mano.png" class="slider__image" />
					</div>
					</div>
					<div class="slider__slide">
					<div class="slide__content">
					<div class="countIncludes">
					Llevas<br>
					<span class="text-count">${countEquipaje}</span>
					</div>
					<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/b2397ee6-5834-4e9c-add0-b5dae4867525/equipaje-facturado.png" class="slider__image" />
					</div>
					</div>
					<div class="slider__slide">
					<div class="slide__content">
					<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/4ad2cd86-3185-42e3-9ca4-c0c106cce915/asiento-comprado.png" class="slider__image" />
					</div>
					</div>
					<div class="slider__slide">
					<div class="slide__content">
					<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/93d349ae-4176-47bd-93f8-df5d215908f3/embarque-prioritario.png" class="slider__image" />
					</div>
					</div>
					<div class="slider__slide">
					<div class="slide__content">
					<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/cb8310aa-8489-4c5c-a9d1-a1863ef34dab/tarjeta-de-embarque.png" class="slider__image" />
					</div>
					</div>
					<div class="slider__slide">
					<div class="slide__content">
					<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/fcf94d74-83a6-4f82-8c28-ee0cd7cda267/Flexismart.png" class="slider__image" />
					</div>
					</div>
					</div>
					<div class="slider__arrow slider__arrow-next js-slider-next">
					<i class="js-circle-chevron-right js-icon arrow-next-payment"></i>
					</div>
					</div>
					</div>
					</div>`);

				if (countMascota >= 1) {
					var searchDateIcon = document.querySelector("#contactForm2 > div:nth-child(9) > div > div > div.slider__inner.js-slider-inner");
					searchDateIcon.insertAdjacentHTML('beforeend',
						`<div class="slider__slide">
						<div class="slide__content">
						<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/c407cb65-bc3c-4276-b7a0-0b92cb6ac249/mascota-a-bordo.png" class="slider__image" />
						</div>
						</div>`);
				}
				if (countSeguro >= 1) {
					var searchDateIcon = document.querySelector("#contactForm2 > div:nth-child(9) > div > div > div.slider__inner.js-slider-inner");
					searchDateIcon.insertAdjacentHTML('beforeend',
						`<div class="slider__slide">
						<div class="slide__content">
						<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/5247f08d-4dee-45b4-91ae-d441a4dde01d/seguro.png" class="slider__image" />
						</div>
						</div>`);
				}
			} else if (a.OutboundJourneySsrs.indexOf("STB1") !== -1) {
				var searchDateIcon = document.querySelector("#contactForm2 > div");
				searchDateIcon.insertAdjacentHTML('afterend',
					`<div class="inner-deep-box payment-chb ts-error-parent">
					<span class="payments-reserva">
					Tu reserva incluye:
					</span>
					<div class="slider slider--first js-slider">
					<div class="slider__wrapper">
					<div class="slider__arrow slider__arrow-prev js-slider-prev">
					<i class="js-circle-chevron-right js-icon arrow-prev-payment"></i>
					</div>
					<div class="slider__inner js-slider-inner">
					<div class="slider__slide">
					<div class="slide__content">
					<div class="countIncludes">
					Llevas<br>
					<span class="text-count">${bolsoDeMano}</span>
					</div>
					<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/06bc7624-4544-412f-ae00-0e3cd6984a59/bolso-de-mano.png" class="slider__image" />
					</div>
					</div>
					<div class="slider__slide">
					<div class="slide__content">
					<div class="countIncludes">
					Llevas<br>
					<span class="text-count">${countEquipajeMano}</span>
					</div>
					<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/85ad3439-9b44-4fb1-928c-3e3ecd217110/equipaje-de-mano.png" class="slider__image" />
					</div>
					</div>
					<div class="slider__slide">
					<div class="slide__content">
					<div class="countIncludes">
					Llevas<br>
					<span class="text-count">${countEquipaje}</span>
					</div>
					<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/b2397ee6-5834-4e9c-add0-b5dae4867525/equipaje-facturado.png" class="slider__image" />
					</div>
					</div>
					<div class="slider__slide">
					<div class="slide__content">
					<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/4ad2cd86-3185-42e3-9ca4-c0c106cce915/asiento-comprado.png" class="slider__image" />
					</div>
					</div>
					<div class="slider__slide">
					<div class="slide__content">
					<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/93d349ae-4176-47bd-93f8-df5d215908f3/embarque-prioritario.png" class="slider__image" />
					</div>
					</div>
					<div class="slider__slide">
					<div class="slide__content">
					<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/fcf94d74-83a6-4f82-8c28-ee0cd7cda267/Flexismart.png" class="slider__image" />
					</div>
					</div>
					</div>
					<div class="slider__arrow slider__arrow-next js-slider-next">
					<i class="js-circle-chevron-right js-icon arrow-next-payment"></i>
					</div>
					</div>
					</div>
					</div>`);

				if (countEmbarque >= 1) {
					var searchDateIcon = document.querySelector("#contactForm2 > div:nth-child(9) > div > div > div.slider__inner.js-slider-inner");
					searchDateIcon.insertAdjacentHTML('beforeend',
						`<div class="slider__slide">
						<div class="slide__content">
						<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/cb8310aa-8489-4c5c-a9d1-a1863ef34dab/tarjeta-de-embarque.png" class="slider__image" />
						</div>
						</div>`);
				}
				if (countMascota >= 1) {
					var searchDateIcon = document.querySelector("#contactForm2 > div:nth-child(9) > div > div > div.slider__inner.js-slider-inner");
					searchDateIcon.insertAdjacentHTML('beforeend',
						`<div class="slider__slide">
						<div class="slide__content">
						<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/c407cb65-bc3c-4276-b7a0-0b92cb6ac249/mascota-a-bordo.png" class="slider__image" />
						</div>
						</div>`);
				}
				if (countSeguro >= 1) {
					var searchDateIcon = document.querySelector("#contactForm2 > div:nth-child(9) > div > div > div.slider__inner.js-slider-inner");
					searchDateIcon.insertAdjacentHTML('beforeend',
						`<div class="slider__slide">
						<div class="slide__content">
						<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/5247f08d-4dee-45b4-91ae-d441a4dde01d/seguro.png" class="slider__image" />
						</div>
						</div>`);
				}
			} else if (!o) {
				var searchDateIcon = document.querySelector("#contactForm2 > div");
				searchDateIcon.insertAdjacentHTML('afterend',
					`<div class="inner-deep-box payment-chb ts-error-parent">
					<span class="payments-reserva">
					Tu reserva incluye:
					</span>
					<div class="slider slider--first js-slider">
					<div class="slider__wrapper">
					<div class="slider__arrow slider__arrow-prev js-slider-prev">
					<i class="js-circle-chevron-right js-icon arrow-prev-payment"></i>
					</div>
					<div class="slider__inner js-slider-inner">
					<div class="slider__slide">
					<div class="slide__content">
					<div class="countIncludes">
					Llevas<br>
					<span class="text-count">${bolsoDeMano}</span>
					</div>
					<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/06bc7624-4544-412f-ae00-0e3cd6984a59/bolso-de-mano.png" class="slider__image" />
					</div>
					</div>
					</div>
					<div class="slider__arrow slider__arrow-next js-slider-next">
					<i class="js-circle-chevron-right js-icon arrow-next-payment"></i>
					</div>
					</div>
					</div>
					</div>`);


				if (countEquipajeMano >= 1) {
					var searchDateIcon = document.querySelector("#contactForm2 > div:nth-child(9) > div > div > div.slider__inner.js-slider-inner");
					searchDateIcon.insertAdjacentHTML('beforeend',
						`<div class="slider__slide">
						<div class="slide__content">
						<div class="countIncludes">
						Llevas<br>
						<span class="text-count">${countEquipajeMano}</span>
						</div>
						<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/85ad3439-9b44-4fb1-928c-3e3ecd217110/equipaje-de-mano.png" class="slider__image" />
						</div>
						</div>`);
				}
				if (countEquipaje >= 1) {
					var searchDateIcon = document.querySelector("#contactForm2 > div:nth-child(9) > div > div > div.slider__inner.js-slider-inner");
					searchDateIcon.insertAdjacentHTML('beforeend',
						`<div class="slider__slide">
						<div class="slide__content">
						<div class="countIncludes">
						Llevas<br>
						<span class="text-count">${countEquipaje}</span>
						</div>
						<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/b2397ee6-5834-4e9c-add0-b5dae4867525/equipaje-facturado.png" class="slider__image" />
						</div>
						</div>`);
				}
				if (countAsientos >= 1) {
					var searchDateIcon = document.querySelector("#contactForm2 > div:nth-child(9) > div > div > div.slider__inner.js-slider-inner");
					searchDateIcon.insertAdjacentHTML('beforeend',
						`<div class="slider__slide">
						<div class="slide__content">
						<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/4ad2cd86-3185-42e3-9ca4-c0c106cce915/asiento-comprado.png" class="slider__image" />
						</div>
						</div>`);
				}
				if (countPriori >= 1) {
					var searchDateIcon = document.querySelector("#contactForm2 > div:nth-child(9) > div > div > div.slider__inner.js-slider-inner");
					searchDateIcon.insertAdjacentHTML('beforeend',
						`<div class="slider__slide">
						<div class="slide__content">
						<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/93d349ae-4176-47bd-93f8-df5d215908f3/embarque-prioritario.png" class="slider__image" />
						</div>
						</div>`);
				}
				if (countFlexi >= 1) {
					var searchDateIcon = document.querySelector("#contactForm2 > div:nth-child(9) > div > div > div.slider__inner.js-slider-inner");
					searchDateIcon.insertAdjacentHTML('beforeend',
						`<div class="slider__slide">
						<div class="slide__content">
						<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/fcf94d74-83a6-4f82-8c28-ee0cd7cda267/Flexismart.png" class="slider__image" />
						</div>
						</div>`);
				}
				if (countEmbarque >= 1) {
					var searchDateIcon = document.querySelector("#contactForm2 > div:nth-child(9) > div > div > div.slider__inner.js-slider-inner");
					searchDateIcon.insertAdjacentHTML('beforeend',
						`<div class="slider__slide">
						<div class="slide__content">
						<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/cb8310aa-8489-4c5c-a9d1-a1863ef34dab/tarjeta-de-embarque.png" class="slider__image" />
						</div>
						</div>`);
				}
				if (countMascota >= 1) {
					var searchDateIcon = document.querySelector("#contactForm2 > div:nth-child(9) > div > div > div.slider__inner.js-slider-inner");
					searchDateIcon.insertAdjacentHTML('beforeend',
						`<div class="slider__slide">
						<div class="slide__content">
						<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/c407cb65-bc3c-4276-b7a0-0b92cb6ac249/mascota-a-bordo.png" class="slider__image" />
						</div>
						</div>`);
				}
				if (countSeguro >= 1) {
					var searchDateIcon = document.querySelector("#contactForm2 > div:nth-child(9) > div > div > div.slider__inner.js-slider-inner");
					searchDateIcon.insertAdjacentHTML('beforeend',
						`<div class="slider__slide">
						<div class="slide__content">
						<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/5247f08d-4dee-45b4-91ae-d441a4dde01d/seguro.png" class="slider__image" />
						</div>
						</div>`);
				}
			}
			let prevScrollPosition = 0;

			function scrollHandler(e) {
				let atSnappingPoint = e.target.scrollLeft % e.target.offsetWidth === 0,
				timeOut = atSnappingPoint ? 0 : 150,
				slider = e.target.closest(".js-slider");

				clearTimeout(e.target.scrollTimeout);
				e.target.scrollTimeout = setTimeout(function () {
					const currentScrollPosition = parseInt(e.target.scrollLeft, 10);

					slider.classList.remove("slider--last", "slider--first");

					if (
						currentScrollPosition > prevScrollPosition &&
						e.target.scrollWidth - currentScrollPosition ===
						e.target.offsetWidth
						) {
						slider.classList.add("slider--last");
				} else if (
					currentScrollPosition <= prevScrollPosition &&
					currentScrollPosition <= 0
					) {
					slider.classList.add("slider--first");
				}
				prevScrollPosition = currentScrollPosition;
			}, timeOut);
			}

			function updateSlidePosition(e, direction) {
				const firstSlideWidth = e.querySelector(".slider__slide").offsetWidth;

				if (direction === "prev") {
					e.scrollLeft -= firstSlideWidth;
				} else {
					e.scrollLeft += firstSlideWidth;
				}
			}

			document
			.querySelector(".js-slider-inner")
			.addEventListener("scroll", scrollHandler);

			document
			.querySelector(".js-slider-prev")
			.addEventListener("click", function () {
				updateSlidePosition(this.nextElementSibling, "prev");
			});

			document
			.querySelector(".js-slider-next")
			.addEventListener("click", function () {
				updateSlidePosition(this.previousElementSibling, "next");
			});


			var css = `
			.text-idad-vuelta{
				position: relative;
				top: -2.3rem;
				justify-content: center;
				height: 0px;
			}
			.arrow-prev-payment{
				font-size: 24px;
				display: inline-block;
				transform: rotate(-180deg);
				margin: 0px 0px 0px -18px;
			}
			.arrow-next-payment{
				font-size: 24px;
				margin: 0px 0px 0px -20px;
			}
			.text-count{
				font-size: 15px;
				font-weight: 600;
			}
			.countIncludes{
				position: absolute;
				top: 2px;
				color: #fff;
				z-index: 1;
				background: #163a70;
				border-top-left-radius: 5px;
				border-bottom-right-radius: 5px;
				font-size: 10px;
				text-align: center;
				padding: 3px 5px 0px 6px;
			}
			.payments-reserva {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-size: 22px;
				color: #59c3d9;
				line-height: 1.25;
				font-weight: 700;
			}
			$breakpoint: 980px;

			*,
			:after,
			:before {
				box-sizing: border-box;
			}

			.slider {
				width: 100%;
				max-width: 900px;
				margin: 24px auto;
				overflow: hidden;

				&.slider--last .slider__arrow-next,
				&.slider--first .slider__arrow-prev {
					display: none;
				}
			}

			.slider__wrapper {
				position: relative;
			}

			.slider__inner {
				display: flex;
				overflow-x: hidden;
				flex-flow: row nowrap;
				margin-bottom: 24px;
				gap: 0px;
				margin: 0px 35px 0px 35px;
				scroll-snap-type: x mandatory;
				scroll-behavior: smooth;
				-webkit-overflow-scrolling: touch;
				touch-action: pan-x;
				&::-webkit-scrollbar {
					height: 12px;
				}

				&::-webkit-scrollbar-thumb {
					border-radius: 24px;
					background-color: lightgrey;
				}

				&::-webkit-scrollbar-track {
					background-color: transparent;
				}
			}

			.slider__slide {
				flex: 1 0 22%;
				max-width: 26%;
				scroll-snap-align: center;

				@media (min-width: $breakpoint) {
					flex-basis: 26%;
					max-width: 26%;
				}
			}

			.slide__content {
				position: relative;
				overflow: hidden;
				margin: 0px 15px 0px 0px;

				&:before {
					content: "";
					display: block;
					padding-top: 70%;
				}
			}

			.slider__image {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 100%;
				object-fit: contain;
			}

			.slider__dots {
				display: none;
				flex-flow: row wrap;
				justify-content: center;
				gap: 12px;

				@media (min-width: $breakpoint) {
					display: none;
				}
			}

			.slider__arrow {
				position: absolute;
				top: 50%;
				z-index: 1;
				display: block;
				width: 0px;
				height: 33px;
				cursor: pointer;
				transform: translateY(-50%);
				border: none;
				padding: 0px 3px 0px 18px;
				background: transparent;
				color: unset !important;
				background: unset !important;
				border: unset !important;
			}

			.slider__arrow-prev {
				left: 0;
			}

			.slider__arrow-next {
				right: 0;
			}
			@media only screen and (max-width: 1250px) and (min-width: 1082px){
				.countIncludes{
					font-size: 9px;
					padding: 0px 2px 0px 2px;
				}
				.text-count{
					font-size: 12px;
				}
			}
			@media only screen and (max-width: 1082px) and (min-width: 1022px){
				.countIncludes{
					font-size: 6px;
					padding: 0px 3px 0px 3px;
					line-height: 1.4;
					top: 2px;
				}
				.text-count{
					font-size: 8px;
				}
			}
			@media only screen and (max-width: 900px) and (min-width: 767px){
				.countIncludes{
					font-size: 8px;
					padding: 2px 2px 0px 2px;
					line-height: 1.3;
					top: 2px;
				}
				.text-count{
					font-size: 12px;
				}
			}
			@media only screen and (max-width: 767px) and (min-width: 320px){
				.countIncludes{
					font-size: 8px;
					padding: 0px 2px 0px 2px;
					line-height: 1.7;
					top: 2px;
				}
				.text-count{
					font-size: 12px;
					line-height: 1;
				}
				.rounded-primary-btn.locked-btn{
					z-index: 1;
				}
			}
			@media only screen and (max-width: 625px) and (min-width: 320px){
				.slide__content{
					margin: 0px -36px 0px 0px;
				}
				.slider__slide{
					margin: 0px 43px 0px 0px;
				}
				.slider__inner{
					margin: 0 0 0 0;
				}
				.slider{
					overflow: unset;
					width: 93%;
				}
				.slider__arrow-prev{
					left: -25px;
				}
				.slider__arrow-next{
					right: -25px;
				}
				.arrow-prev-payment, .arrow-next-payment{
					font-size: 20px;
				}
			}
			`,
			head = document.head || document.getElementsByTagName('head')[0],
			style = document.createElement('style');

			head.appendChild(style);

			style.type = 'text/css';
			if (style.styleSheet) {
            // This is required for IE8 and below.
				style.styleSheet.cssText = css;
			} else {
				style.appendChild(document.createTextNode(css));
			}
		}
	}
}, 600);