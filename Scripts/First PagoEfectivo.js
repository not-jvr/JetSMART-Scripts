 var initFirstPagoEfectivo = setInterval(function () {
 	if (typeof bookingData === "undefined" || typeof window.eventBus === "undefined" || window.location.pathname !== '/V2/Payment') return;
 	clearInterval(initFirstPagoEfectivo);
 	var culture = bookingData.Culture;
 	function firstPagoEfectivo(){
 		setTimeout(function () {
 			var pagoefectivoButton = document.querySelector('label[for="payment_tab_PAGOEFECTIVO"]').parentNode;
 			if(pagoefectivoButton){
 				var pagoefectivoInput = document.querySelector('input#payment_tab_PAGOEFECTIVO');
 				var parentElement = document.querySelector('ac-payment-method-selector');
 				parentElement.insertBefore(pagoefectivoButton, parentElement.firstChild);
 				parentElement.insertBefore(pagoefectivoInput, parentElement.firstChild);
 			}
 		}, 400);
 	}
 	
 	if (culture === 'es-PE') {
 		firstPagoEfectivo()
 		window.eventBus.subscribe({
 			name: "firstPagoEfectivoEvent", callback: function (e) {
 				var innerDeepBox = document.querySelector('.inner-deep-box.ts-hide-on-voucher-only-payment.ts-hide-on-credit-only-payment');
 				if (innerDeepBox) {
 					innerDeepBox.addEventListener('click', function () {
 						var selectElement = document.querySelector('[data-test-id="payment-card-issuer-country"]');
 						var selectValue = selectElement.value;
 						if(selectValue === 'PE'){
 							firstPagoEfectivo()
 						}
 					});
 				}
 			}
 		});
 	}
 }, 400);