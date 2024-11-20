var ModalPC_ExitIntentPE = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/flight') return;
	clearInterval(ModalPC_ExitIntentPE);

	var culture = bookingData.Culture;
	var PC = bookingData.PromotionCode;
	var staff = bookingData.Role;
	var PB = bookingData.PostBooking;

	// cambiar acá el promocode
	var promocode = 'CYBER';

	function isDesktop() {
		return window.innerWidth >= 768;
	}

	function closeModal() {
		console.log('closemodal')
		let modal = document.querySelector('#modalExitIntentPromocode');
		modal.style.display = 'none';
	}


	function addCSS() {
		var css = `
				#modalExitIntentPromocode .header-cont-custom {
				  position: relative;
				}
		  
				#modalExitIntentPromocode .background {
				  margin-top: -13%;
				  max-width: 115%;
				}
		  
				#modalExitIntentPromocode .rounded-primary-btn {
				  display: flex;
				  justify-content: center;
				  --bg-opacity: 1;
				  --text-opacity: 1;
				  color: rgba(255,255,255,var(--text-opacity));
				  position: relative;
				  border-radius: 9999px;
				  letter-spacing: 0;
				  text-transform: none;
				  font-weight: 700;
				  -webkit-appearance: none;
				  -moz-appearance: none;
				  appearance: none;
				  --border-opacity: 1;
				  border: 2px solid rgba(178,41,46,var(--border-opacity));
				  line-height: 1;
				  font-family: Lato,sans-serif;
				  white-space: normal;
				  text-align: center;
				  padding: 10px 35px 10px 15px;
				}
		  
				#modalExitIntentPromocode .modal-content {
				  padding: 0;
				}
		  
				#modalExitIntentPromocode .modal-content .modal-header.text-left {
				  position: absolute;
				  top: 0;
				  width: 100%;
				  height: 100%;
				  background-color: transparent;
				  text-align: left;
				  justify-content: start;
				  font-family: 'ClanOT-News', 'Lato Medium';
				  display: flex;
				  align-items: center;
				  padding: 20px;
				  border-radius: 10px;
				  font-weight: 100;
				  font-size: 22px;
				  line-height: 1.2;
				}
		  
				#modalExitIntentPromocode .modal-content .modal-header.text-left * {
				  color: #ffffff;
				}
		  
				#modalExitIntentPromocode .modal-content .modal-header button {
				  top: 19px;
				  right: 5px;
				  color: #ffffff;
				  border: 3px solid #ffffff;
				  border-radius: 20px;
				  padding: 1px 6px;
				  font-size: 29px;
				  position: absolute;
				  transform: translateY(-50%);
				  background: transparent;
				  cursor: pointer;
				  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
				  line-height: 1;
				}
		  
				#modalExitIntentPromocode .modal-body {
				  padding: 1.5rem;
				}
		  
				#modalExitIntentPromocode .modal-body p {
				  font-family: 'ClanOT-News', "Lato Medium";
				  font-size: 18px;
				  color: #1C355E;
				  max-width: 80%;
				  margin: 0 auto;
				  line-height: 1.4;
				}
		  
				#modalExitIntentPromocode .font-bold {
				  font-family: "ClanOT-Bold", "Lato";
				  font-weight: 700;
				}
		  
				#modalExitIntentPromocode .logo {
				  width: 40vw;
				  max-width: max-content;
				}
		  
				#modalExitIntentPromocode .modal-button-container.modification-buttons-container {
				  margin-top: 20px;
				}
		  
				#modalExitIntentPromocode .first-btn {
				  margin: 0 auto 15px;
				  margin-right: 3%;
				  margin-left: 3%;
				  background-color: rgb(185, 34, 52);
				  border-color: rgb(185, 34, 52);
				  width: 80%;
				}
		  
				#modalExitIntentPromocode .first-btn:hover {
				  color: rgb(185, 34, 52);
				  background-color: rgb(255, 255, 255);
				}
		  
				#modalExitIntentPromocode .second-btn {
				  margin: 0 auto 15px;
				  margin-right: 3%;
				  margin-left: 3%;
				  background-color: rgb(185, 34, 52);
				  border-color: rgb(185, 34, 52);
				  width: 80%;
				}
		  
				#modalExitIntentPromocode .second-btn:hover {
				  color: rgb(185, 34, 52);
				  background-color: rgba(255, 255, 255);
				}
		  
				#modalExitIntentPromocode .rounded-primary-btn:not(.disabled):hover:after {
				  font-weight: 100;
				}
		  
				#modalExitIntentPromocode .font-SB {
				  position : relative;
				  width : 291.969px;
				  height : 46.7812px;
				  bottom: 50px;
				  font-size: 20px;
				}
		  
		  
				#modalExitIntentPromocode .font-B {
				  font-size: 38px;
				}
		  
				#modalExitIntentPromocode .btnNo {
				  color: #B3B3B3;
				  cursor: pointer;
				}
		  
				#modalExitIntentPromocode .terms {
				  margin-top: 20px;
				  color: #B3B3B3;
				  text-align: left;
				  font-size: 14px;
				}
		  
				#modalExitIntentPromocode.modal {
				  z-index: 105000;
				}
				
				.no-promocode {
					font-size: 14px;
					color: #163a70;;
					cursor: pointer;
					text-decoration: underline;
				}
	
				.no-promocode:hover {
					color: #b2292e;
				}
	
		  
				@media (max-width: 768px) {
				  #modalExitIntentPromocode .modal-content .modal-header.text-left {
					max-height: none;
				  }
				}
		  
				@media (max-width: 568px) {
				  #modalExitIntentPromocode #close-modal {
					top: 19px;
					right: 4px;
					padding: 0 5px;
					font-size: 20px;
					line-height: 1.1;
				  }
		  
				  #modalExitIntentPromocode p {
					max-width: 100% !important;
				  }
				}
		  
				@media (max-width: 459px) {
				  #modalExitIntentPromocode .modal-content .modal-header.text-left {
					max-height: none;
					padding: 10px;
				  }
		  
				  #modalExitIntentPromocode .font-SB {
					font-size: 16px;
				  }
		  
				  #modalExitIntentPromocode .font-B {
					font-size: 24px;
				  }
				}
				`;

		let head = document.head || document.getElementsByTagName('head')[0];
		let style = document.createElement('style');
		style.type = 'text/css';

		if (style.styleSheet) {
			// This is required for IE8 and below.
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}

		head.appendChild(style);
	}


	function addPromocode(promocode) {
		let inputPromocode = document.querySelector('[data-test-id="sidebar-promo-code-input"]');

		inputPromocode.value = promocode;

		// Se simula evento de input
		let event = new Event('input', { bubbles: true });
		inputPromocode.dispatchEvent(event);

		// esperamos medio segundo
		setTimeout(() => {
			promocodeButton = document.querySelector('[data-test-id="sidebar-promo-code-button"]');
			promocodeButton.click();
		}, 500);


	}

	function createModalExitIntentPromocode() {
		if (!document.querySelector('#modalExitIntentPromocode')) {
			let text_header;

			if (isDesktop()) {
				text_header = '¡ESPERA!<br> No te vayas sin tu descuento extra. <br> ¡Añadimos un 10% extra a <br> tu carrito! Completa tu compra ahora.';
			} else {
				text_header = '¡ESPERA!<br> Estás cotizando en pesos<br> chilenos. ¡Añadimos un 10% extra a tu carrito!<br> Completa tu compra ahora.';
			}

			let text_button = '¡Aplicar el descuento!';
			let text_button2 = 'Prefiero no aplicar el descuento';
			let modalExitIntentPromocode = `<promocode-modal>
												<div id="modalExitIntentPromocode" class="modal i2-itinerary-section" style="display: block;">
													<div class="modal-content booking-modal-content">
														<div class="header-cont-custom">
															<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/45b20ba2-4320-4550-b700-2ba7f97964e0/Group%202248%20%284%29.png" class="background">
															<div class="modal-header text-left">
																<button id="close-modal">×</button>
															</div>
														</div>
														<div class="modal-body text-center">
															<div class="modal-button-container modification-buttons-container">
																<button id="clickButton" class="rounded-primary-btn first-btn"> ${text_button} </button>
															</div>
															<div id="close-btn-secondary">
																<span class="no-promocode">${text_button2}</span>
														</div>
													</div>
												</div>
												</promocode-modal>`;

			var footer = document.querySelector('body > footer');
			footer.insertAdjacentHTML('afterend', modalExitIntentPromocode);

			let closeModalButton = document.querySelector('#close-modal');

			document.getElementById("clickButton").addEventListener('click', () => {
				addPromocode(promocode);
			});

			document.getElementById('close-btn-secondary').addEventListener('click', closeModal);
			closeModalButton.addEventListener('click', closeModal);
		}
	}

	function showExitIntentModal() {
		createModalExitIntentPromocode();
	}

	function isPE() {
		const stationCodes = ["TTP", "PIU", "CIX", "CJA", "TRU", "LIM", "CUZ", "AQP"];

		// Obtener los códigos de llegada y salida
		const arrivalCode = bookingData.AvailableOutboundJourneys[0].ArrivalStationCode;
		const departureCode = bookingData.AvailableOutboundJourneys[0].DepartureStationCode;

		// Verificar si alguno de los códigos está en la lista
		return stationCodes.includes(arrivalCode) || stationCodes.includes(departureCode);
	}

	function isAnyDateInRange() {
		// Definir las fechas límite
		const startDate = new Date('2024-11-04');
		const endDate = new Date('2024-12-31 23:59:59');

		// Función auxiliar para verificar si una fecha está en el rango
		function isInRange(dateString) {
			if (!dateString) return false;
			const date = new Date(dateString);
			return date >= startDate && date <= endDate;
		}

		// Verificar la fecha de salida (ida)
		const outboundDate = bookingData.AvailableOutboundJourneys[0]?.DepartureDate;
		const outboundInRange = isInRange(outboundDate);

		// Verificar si existe una fecha de vuelta y si está en el rango
		const returnDate = bookingData.AvailableReturnJourneys?.[0]?.DepartureDate;
		const returnInRange = isInRange(returnDate);

		// Retornar verdadero si cualquiera de las dos fechas está en el rango
		return outboundInRange || returnInRange;
	}

	// document.addEventListener('mouseleave', function (e) {
	// 	if (e.clientY <= 0) {
	// 		showExitIntentModal();
	// 	}
	// });

	if (culture === 'es-PE' && PC === null && staff !== 'WWW Staff Travel' && isDesktop() && PB === false && isPE() && isAnyDateInRange()) {
		addCSS();
		// document.addEventListener('mouseleave', showExitIntentModal);
		document.addEventListener('mouseleave', function (e) {
			if (e.clientY <= 0) {
				showExitIntentModal();
			}
		});
	}

}, 600);