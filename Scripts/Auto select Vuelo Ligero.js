	var initBundles = setInterval(function () {
		if (typeof bookingData === "undefined") return;
		clearInterval(initBundles);
		var culture = bookingData.Culture;
		var iataSalida = bookingData.AvailableOutboundJourneys[0].DepartureStationCode;
		var iataLlegada = bookingData.AvailableOutboundJourneys[0].ArrivalStationCode;
		var ASUEZE = ["ASU", "EZE"];

	    ////funcion pc////
		function addUpgradeSuggestionPC(selector) {
			setTimeout(function() {
				if (window.innerWidth > 768) {
					const container = document.querySelector(selector);
					const newElement = document.createElement('div');
					newElement.id = 'bundles-text-suggestion';
					newElement.innerHTML = '<span>Recuerda que tu pasaje no tiene equipaje ni asiento incluido. Si deseas agregarlos, podrás hacerlo más adelante.</span>';
					const css = `
					#bundles-text-suggestion {
						display: flex;
						padding: 5px;
						position: relative;
						background-color: rgb(89, 195, 217);
						line-height: 30px;
						color: white;
						border: 1px;
						border-radius: 5px;
						align-items: center;
						margin: 10px;
						margin-left: 10px;
					}
					`;
					const head = document.head || document.getElementsByTagName('head')[0];
					const style = document.createElement('style');
					head.appendChild(style);
					style.type = 'text/css';
					if (style.styleSheet){
						style.styleSheet.cssText = css;
					} else {
						style.appendChild(document.createTextNode(css));
					}
					container.parentNode.replaceChild(newElement, container);
				}
			}, 300);
		}

		const containers = document.querySelectorAll('.bundle-upgrade-offer-container');
		for (let i = 0; i < containers.length; i++) {
			addUpgradeSuggestionPC(containers[i]);
		}

/////FIN/////
	/////FUNCION MOBILE/////
		function addFlightSuggestionMessageMobile(targetElement) {
	  // Crear el nuevo elemento que deseas agregar
			var newElement = document.createElement('div');
			newElement.id = 'bundles-text-suggestion';

			const img = document.createElement("img");
			img.className = 'icon-check';
			var msg = 'Recuerda que tu pasaje no tiene equipaje ni asiento incluido. Si deseas agregarlos, podrás hacerlo más adelante';      

			var css = `
			#bundles-text-suggestion {
				display: flex;
				padding: 5px;
				position: relative;
				background-color: rgb(89, 195, 217);
				line-height: 30px;
				color: white;
				border: 1px;
				border-radius: 5px;
				align-items: center;
				margin: 10px;
				margin-left: 10px;
			}

			@media only screen and (max-width: 600px) {
				#bundles-text-suggestion > img {
					margin: auto;         
				}
			}
			`
			var head = document.head || document.getElementsByTagName('head')[0];
			var style = document.createElement('style');
			head.appendChild(style);
			style.type = 'text/css';
			if (style.styleSheet){
	      // This is required for IE8 and below.
				style.styleSheet.cssText = css;
			} else {
				style.appendChild(document.createTextNode(css));
			}

			targetElement.insertAdjacentElement('beforeend', newElement);
			newElement.innerHTML = '<span>' + msg + '</span>'; 
			img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/2391f78a-ab45-471c-9643-01f49fdf37a1/success-icon.png';
			img.style.maxWidth = '40px';
			img.style.paddingRight = '10px';
			newElement.insertBefore(img, newElement.firstChild);
		}

	///////////
		function hideElements() {
			if (window.innerWidth <= 768) {
				setTimeout(function() {
					var elements = document.querySelectorAll(".bundle-upgrade-offer-container");
					for (var i = 0; i < elements.length; i++) {
						elements[i].style.display = "none";
					}
				}, 300);
			}
		}


	//////
		function changePadding() {
			if (window.innerWidth <= 768) {
				setTimeout(function() {
					var elements = document.querySelectorAll(".selected-flight.discount-club.show-offers, .selected-flight.show-offers");
					for (var i = 0; i < elements.length; i++) {
						elements[i].style.paddingBottom = "0px";
					}
				}, 800);
			}
		}
	//////
		function changePaddingPC() {
			if (window.innerWidth > 768) {
				setTimeout(function() {
					var elements = document.querySelectorAll(".selected-flight.discount-club.show-offers, .selected-flight.show-offers");
					for (var i = 0; i < elements.length; i++) {
						elements[i].style.paddingBottom = "0px";
					}
				}, 800);
			}
		}
		///////////////////

		var executed = false;
		if (culture == 'es-PY' && ASUEZE.includes(iataSalida) && ASUEZE.includes(iataLlegada)) {
			
		window.eventBus.subscribe({
			name: "autoselect_bundle",
			callback: function (e) {
				const smartFeeButtons = document.querySelectorAll('.smart-fee.nowrap.big, .discount-fee.nowrap.small, .smart-fee.nowrap.small, .discount-fee.nowrap.big, [data-test-id="bundle-edit-selected--j|0"], [data-test-id="bundle-edit-selected--j|1"]');
				const buttonClickHandler = function () {
					
						if (window.innerWidth <= 768 && !executed) {
							var targetElement = document.querySelector("#mainContentFlight > section > div > dummy-flight > ac-flight-page > div");
							addFlightSuggestionMessageMobile(targetElement);
							executed = true;
						}
						hideElements()

						if(document.querySelector('[data-test-value="BND0"]')){
							if (window.innerWidth <= 768) {
								setTimeout(function() {
									if(document.querySelector("#mainContentFlight > section > div > dummy-flight > ac-flight-page > div > form:nth-child(1) > div.ts-error-parent.ts-flight-error-parent > section > div:nth-child(2) > ac-flight-fee-option-list > div > div.fee-selector > ul > ac-flight-fee-option > li > div > div > div > div > div:nth-child(3) > div > div > ac-bundles-selector > div.relative.pb-4 > div.bundles-container.hidden-sm-up > div > div:nth-child(1) > div > div.bundle-footer > button")){
										document.querySelector("#mainContentFlight > section > div > dummy-flight > ac-flight-page > div > form:nth-child(1) > div.ts-error-parent.ts-flight-error-parent > section > div:nth-child(2) > ac-flight-fee-option-list > div > div.fee-selector > ul > ac-flight-fee-option > li > div > div > div > div > div:nth-child(3) > div > div > ac-bundles-selector > div.relative.pb-4 > div.bundles-container.hidden-sm-up > div > div:nth-child(1) > div > div.bundle-footer > button").click()
										hideElements()
										changePadding()


									}
								}, 300); 
								setTimeout(function() {
									if(document.querySelector("#mainContentFlight > section > div > dummy-flight > ac-flight-page > div > form:nth-child(1) > div.ts-error-parent.ts-flight-error-parent > section > div:nth-child(1) > ac-flight-fee-option-list > div > div.fee-selector > ul > ac-flight-fee-option > li > div > div > div > div > div:nth-child(3) > div > div > ac-bundles-selector > div.relative.pb-4 > div.bundles-container.hidden-sm-up > div > div:nth-child(1) > div > div.bundle-footer > button")){	
										document.querySelector("#mainContentFlight > section > div > dummy-flight > ac-flight-page > div > form:nth-child(1) > div.ts-error-parent.ts-flight-error-parent > section > div:nth-child(1) > ac-flight-fee-option-list > div > div.fee-selector > ul > ac-flight-fee-option > li > div > div > div > div > div:nth-child(3) > div > div > ac-bundles-selector > div.relative.pb-4 > div.bundles-container.hidden-sm-up > div > div:nth-child(1) > div > div.bundle-footer > button").click()
										hideElements()
										changePadding()
									}
								}, 300);

								
							}else{
								setTimeout(function() {
									if(document.querySelector('[data-test-id="bundle-select-button--j|0-c|none"]')){
										document.querySelector('[data-test-id="bundle-select-button--j|0-c|none"]').click()
										addUpgradeSuggestionPC('.bundle-upgrade-offer-container');
										changePaddingPC()
									}
								}, 300);
								setTimeout(function() {
									if(document.querySelector('[data-test-id="bundle-select-button--j|1-c|none"]')){
										document.querySelector('[data-test-id="bundle-select-button--j|1-c|none"]').click()
										addUpgradeSuggestionPC('.bundle-upgrade-offer-container');
										changePaddingPC()
									}
								}, 300);
							}
							addUpgradeSuggestionPC('.bundle-upgrade-offer-container');						
						}
						if(document.querySelector('[data-test-value="BNC0"]')){
							if (window.innerWidth <= 768) {
								setTimeout(function() {
									if(document.querySelector("#mainContentFlight > section > div > dummy-flight > ac-flight-page > div > form:nth-child(1) > div.ts-error-parent.ts-flight-error-parent > section > div:nth-child(2) > ac-flight-fee-option-list > div > div.fee-selector > ul > ac-flight-fee-option > li > div > div > div > div > div:nth-child(3) > div > div > ac-bundles-selector > div.relative.pb-4 > div.bundles-container.hidden-sm-up > div > div:nth-child(1) > div > div.bundle-footer > button")){			
										document.querySelector("#mainContentFlight > section > div > dummy-flight > ac-flight-page > div > form:nth-child(1) > div.ts-error-parent.ts-flight-error-parent > section > div:nth-child(2) > ac-flight-fee-option-list > div > div.fee-selector > ul > ac-flight-fee-option > li > div > div > div > div > div:nth-child(3) > div > div > ac-bundles-selector > div.relative.pb-4 > div.bundles-container.hidden-sm-up > div > div:nth-child(1) > div > div.bundle-footer > button").click()
										hideElements()
										changePadding()
									}
								}, 300); 
								setTimeout(function() {
									if(document.querySelector("#mainContentFlight > section > div > dummy-flight > ac-flight-page > div > form:nth-child(1) > div.ts-error-parent.ts-flight-error-parent > section > div:nth-child(1) > ac-flight-fee-option-list > div > div.fee-selector > ul > ac-flight-fee-option > li > div > div > div > div > div:nth-child(3) > div > div > ac-bundles-selector > div.relative.pb-4 > div.bundles-container.hidden-sm-up > div > div:nth-child(1) > div > div.bundle-footer > button")){
										document.querySelector("#mainContentFlight > section > div > dummy-flight > ac-flight-page > div > form:nth-child(1) > div.ts-error-parent.ts-flight-error-parent > section > div:nth-child(1) > ac-flight-fee-option-list > div > div.fee-selector > ul > ac-flight-fee-option > li > div > div > div > div > div:nth-child(3) > div > div > ac-bundles-selector > div.relative.pb-4 > div.bundles-container.hidden-sm-up > div > div:nth-child(1) > div > div.bundle-footer > button").click()
										hideElements()
										changePadding()
									}
								}, 300); 
								
							}else{
								setTimeout(function() {
									if(document.querySelector('[data-test-id="bundle-select-button--j|0-c|none"]')){
										document.querySelector('[data-test-id="bundle-select-button--j|0-c|none"]').click()
										addUpgradeSuggestionPC('.bundle-upgrade-offer-container');
										changePaddingPC()
									}
								}, 300);
								setTimeout(function() {
									if(document.querySelector('[data-test-id="bundle-select-button--j|1-c|none"]')){
										document.querySelector('[data-test-id="bundle-select-button--j|1-c|none"]').click()
										addUpgradeSuggestionPC('.bundle-upgrade-offer-container');
										changePaddingPC()
									}
								}, 300);
							}
							addUpgradeSuggestionPC('.bundle-upgrade-offer-container');
							changePaddingPC()
						}						
						setTimeout(function() {
							addUpgradeSuggestionPC('.bundle-upgrade-offer-container');
							hideElements()
							changePadding()
							changePaddingPC()
						}, 4000);

					};
					smartFeeButtons.forEach(button => button.addEventListener('click', buttonClickHandler));
				}
			});
	}
}, 800);