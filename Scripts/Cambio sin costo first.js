(function () {
	let intervalCambiosSinCosto = setInterval(function () {
		if (document.readyState !== 'complete' || typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/flight') return;
		clearInterval(intervalCambiosSinCosto);
		
		let culture = bookingData.Culture;
		let staff = JetSmart.AppContext.isStaff;
		let postB = bookingData.PostBooking;

		function addCSS() {
			var css = `
			[data-test-id="bundle-tooltip--j|0-c|FLXB"] .bundle-tooltip-text, [data-test-id="bundle-tooltip--j|1-c|FLXB"] .bundle-tooltip-text {
				font-size: 11px;
			}

			[data-test-id="bundle-tooltip--j|0-c|FLXB"] .bundle-tooltip-text [data-test-id="bundle-tooltip-title--j|0-c|FLXB"], [data-test-id="bundle-tooltip--j|1-c|FLXB"] .bundle-tooltip-text [data-test-id="bundle-tooltip-title--j|1-c|FLXB"]{
				font-size: 13px !important;
			}

			@media only screen and (max-width: 767px){
				.bundle-tooltip{
					font-size: 11px !important;
				}
			}
			`,
			head = document.head || document.getElementsByTagName('head')[0],
			style = document.createElement('style')
			head.appendChild(style)
			style.type = 'text/css';
			if (style.styleSheet) {
			// This is required for IE8 and below.
				style.styleSheet.cssText = css;
			} else {
				style.appendChild(document.createTextNode(css));
			}
		}

		function cambioNombreFLX() {
			document.querySelectorAll('li[data-test-id*="bundle-ssr-item"][data-test-id*="FLXB"]').forEach(function (element) {

						if(element.getAttribute('data-test-id').includes('none')){ // este es para VuelaLigero

							if (element.classList.contains('hidden-xs')) {
								element.classList.remove('hidden-xs');
							}

							let bundleItemText = element.querySelector('.ssr-line-name');
							let iconElement = element.querySelector('.js-bundle-circle-x-full');
							let tooltipText = element.querySelector('[data-test-id^="bundle-tooltip-info"]');
							let tooltipTitle = element.querySelector('[data-test-id^="bundle-tooltip-title"]');
							element.style.visibility = 'visible';
							switch (culture) {
							case 'en-US':
								if(bundleItemText){
									bundleItemText.innerText = 'Changes with cost';
								}

								if(tooltipTitle){
									tooltipTitle.innerText = 'Changes with cost';
								}
								if(tooltipText){
									tooltipText.innerText = `Change, cancel, or transfer your ticket with an associated cost, plus fare difference if applicable.`;
								}
								break;
							case 'pt-BR':
								if(bundleItemText){
									bundleItemText.innerText = 'Mudanças com custo';
								}

								if(tooltipTitle){
									tooltipTitle.innerText = 'Mudanças com custo';
								}
								if(tooltipText){
									tooltipText.innerText = `Mude, cancele ou transfira sua passagem com um custo associado, além da diferença de tarifa, se aplicável.`;
								}
								break;
							default:
								if(bundleItemText){
									bundleItemText.innerText = 'Cambios con costo';
								}

								if(tooltipTitle){
									tooltipTitle.innerText = 'Cambios con costo';
								}
								if(tooltipText){
									tooltipText.innerText = `Cambia, anula o traspasa tu pasaje con un costo asociado, además de diferencia tarifaria si corresponde.`;
								}
							}

							if(iconElement){
								iconElement.className = 'js-icon js-flight-tick';
							}

						} else {
							let bundleItemText = element.querySelector('.ssr-line-name');
							let tooltipText = element.querySelector('[data-test-id^="bundle-tooltip-info"]');
							let tooltipTitle = element.querySelector('[data-test-id^="bundle-tooltip-title"]');
							switch (culture) {
							case 'en-US':
								if(bundleItemText){
									bundleItemText.innerText = 'Cost-free changes';
								}

								if(tooltipTitle){
									tooltipTitle.innerText = 'FlexiSMART: Cost-free changes';
								}
								if(tooltipText){
									tooltipText.innerText = `You can modify your reservation as many times as you want within one year, up to one hour before the flight without paying the change fee. *Fare difference applies if applicable.`;
								}
								break;
							case 'pt-BR':
								if(bundleItemText){
									bundleItemText.innerText = 'Alterações sem custo';
								}

								if(tooltipTitle){
									tooltipTitle.innerText = 'FlexiSMART: Alterações sem custo';
								}
								if(tooltipText){
									tooltipText.innerText = `Você pode modificar sua reserva quantas vezes quiser dentro de um ano, até uma hora antes do voo sem pagar a taxa de alteração. *Aplica-se a diferença tarifária, se aplicável.`;
								}
								break;
							default:
								if(bundleItemText){
									bundleItemText.innerText = 'Cambios sin costo';
								}

								if(tooltipTitle){
									tooltipTitle.innerText = 'FlexiSMART: Cambios sin costo';
								}
								if(tooltipText){
									tooltipText.innerText = `Podrás modificar tu reserva cuantas veces quieras por uno año, hasta una hora antes del vuelo sin pagar el cargo por cambio. *Aplica diferencia tarifaria si corresponde.`;
								}
						}// este es para Bundle SMART y Bundle FULL
					}
					
				});
		}

		function cambiarNombreMochilaMano() {
			var elements = document.querySelectorAll('[data-test-id*="bundle-ssr-item--"]');

			elements.forEach(element => {
				var nameElement = element.querySelector('.ssr-line-name');
				if (nameElement && (nameElement.innerText.includes('Mochila o artículo personal') || nameElement.innerText.includes('Mochila o artigo pessoal') || nameElement.innerText.includes('Handbag, purse or personal item'))) {
					var tooltipText = element.querySelector('[data-test-id^="bundle-tooltip-info"]');
					if (tooltipText) {
						switch (culture) {
						case 'en-US':
							tooltipText.innerText = `It's the luggage you can carry on board during the journey and that is included in your SMART fare.`;
							break;
						case 'pt-BR':
							tooltipText.innerText = 'É a bagagem que você pode levar a bordo durante a viagem e que está incluída na sua tarifa SMART.';
							break;
						default:
							tooltipText.innerText = 'Es el equipaje que puedes llevar a bordo durante el viaje y que está incluido en tu tarifa SMART.';
						}
					}

					var iconElement = element.querySelector('.js-bundle-circle-x-full');
					if (iconElement) {
						iconElement.className = 'js-icon js-flight-tick';
					}
				}
			});
		}

		function hideSMARTICKET(selector, selector2) {
			var elements = document.querySelectorAll(`[data-test-id="bundle-ssr-item--j|${selector}-c|${selector2}|none"]`);

			elements.forEach(function(element) {
				var lineNameElement = element.querySelector('.ssr-line-name');
				if (lineNameElement) {
					var content = lineNameElement.textContent.trim();
					var shouldHide = content === "SMARTICKET" || content === "Tarifa Aérea";

					if (shouldHide) {
						element.style.display = 'none';
					}
				}
			});
		}

		function moveFlexiFirst(selector1, selector2, selector3) {
			var elementoAMover = document.querySelector('[data-test-value="' + selector1 + '"] [data-test-id="bundle-ssr-item--j|' + selector2 + '-c|' + selector3 + '|FLXB"]');
			var ulPadre = document.querySelector('[data-test-value="' + selector1 + '"] [data-test-id="bundle-ssrs--j|' + selector2 + '-c|' + selector3 + '"]');
			if (elementoAMover && ulPadre) {
				ulPadre.insertBefore(elementoAMover, ulPadre.firstChild);
			}
		}

		function moveFlexiFirstMobile(selector1, selector2) {
			var elementosAMover = document.querySelectorAll('[data-test-id="bundle-ssr-item--j|' + selector1 + '-c|' + selector2 + '|FLXB"]');
			var ulPadres = document.querySelectorAll('[data-test-id="bundle-ssrs--j|' + selector1 + '-c|' + selector2 + '"]');

			if (elementosAMover.length > 1 && ulPadres.length > 1) {
				var elementoAMover = elementosAMover[1];
				var ulPadre = ulPadres[1];

				if (elementoAMover && ulPadre) {
					ulPadre.insertBefore(elementoAMover, ulPadre.firstChild);
				}
			}
		}

		function allEdits() {
			hideSMARTICKET(0, 'none');
			hideSMARTICKET(1, 'none');
			hideSMARTICKET(0, 'simple');
			hideSMARTICKET(1, 'simple');
			hideSMARTICKET(0, 'full');
			hideSMARTICKET(1, 'full');
			moveFlexiFirst('BND0', 0, 'none');
			moveFlexiFirst('BND1', 0, 'simple');
			moveFlexiFirst('BND2', 0, 'full');
			moveFlexiFirst('BND0', 1, 'none');
			moveFlexiFirst('BND1', 1, 'simple');
			moveFlexiFirst('BND2', 1, 'full');
			moveFlexiFirst('BNC0', 0, 'none');
			moveFlexiFirst('BNC1', 0, 'simple');
			moveFlexiFirst('BNC2', 0, 'full');
			moveFlexiFirst('BNC0', 1, 'none');
			moveFlexiFirst('BNC1', 1, 'simple');
			moveFlexiFirst('BNC2', 1, 'full');
			moveFlexiFirstMobile(0, 'none');
			moveFlexiFirstMobile(0, 'simple');
			moveFlexiFirstMobile(0, 'full');
			moveFlexiFirstMobile(1, 'none');
			moveFlexiFirstMobile(1, 'simple');
			moveFlexiFirstMobile(1, 'full');
			cambioNombreFLX();
			cambiarNombreMochilaMano();
		}

		if (postB === false && staff === 'False') {
			addCSS();
			window.eventBus.subscribe({
				name: "SidebarReloaded", callback: function (e) {
					allEdits();
				}
			});
		}
	}, 600);
})();