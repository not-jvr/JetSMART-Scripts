 var initMoverCuotealo = setInterval(function () {
 	if (typeof bookingData === "undefined" || typeof window.eventBus === "undefined" || window.location.pathname !== '/V2/Payment') return;
 	clearInterval(initMoverCuotealo);
 	var culture = bookingData.Culture;
 	function moverCuotealo(){
 		setTimeout(function () {
 			var cuotealoButton = document.querySelector('label[for="payment_tab_CUOTEALO"]').parentNode;
 			if(cuotealoButton){
 				var cuotealoInput = document.querySelector('input#payment_tab_CUOTEALO');
 				var parentElement = document.querySelector('ac-payment-method-selector');
 				parentElement.insertBefore(cuotealoButton, parentElement.firstChild);
 				parentElement.insertBefore(cuotealoInput, parentElement.firstChild);
 			}
 		}, 400);
 	}
 	
 	if (culture === 'es-PE') {
 		moverCuotealo()
 		window.eventBus.subscribe({
 			name: "moverCuotealoEvent", callback: function (e) {
 				var innerDeepBox = document.querySelector('.inner-deep-box.ts-hide-on-voucher-only-payment.ts-hide-on-credit-only-payment');
 				if (innerDeepBox) {
 					innerDeepBox.addEventListener('click', function () {
 						var selectElement = document.querySelector('[data-test-id="payment-card-issuer-country"]');
 						var selectValue = selectElement.value;
 						if(selectValue === 'PE'){
 							moverCuotealo()
 						}
 					});
 				}
 			}
 		});
 	}
 }, 400);