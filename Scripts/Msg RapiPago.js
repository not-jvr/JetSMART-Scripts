		var initRapiPago = setInterval(function () {
			if (typeof bookingData === "undefined" || !document.querySelector('[data-test-id="payment-method-selector-icon--c|KD"]') || window.location.pathname !== '/V2/Payment') return;
			clearInterval(initRapiPago);
			var culture = bookingData.Culture;

			function addUpgradeSuggestionPC(selector) {
				const container = document.querySelector(selector);
				const newElement = document.createElement('div');
				newElement.id = 'rapi-text-suggestion';
				newElement.innerHTML = '<span>Recordá que tendrás 48 horas para realizar el pago en efectivo de tu reserva en un punto habilitado de pago, de lo contrario, el pago expirará y tu reserva quedará sin efecto.</span>';
				const css = `
				#rapi-text-suggestion {
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
				container.parentNode.appendChild(newElement, container);
				
			}

			if(culture == 'es-AR'){
				window.eventBus.subscribe({
					name: "Payment_buttons", callback: function (e) {
						const paymentButtons = document.querySelectorAll('[for="payment_tab_AR - MP Debit"], [for="payment_tab_MR"], [for="payment_tab_KA"]');
						const buttonClick = function () {
							if(document.querySelector('[id="rapi-text-suggestion"]')){
								const msjerapi = document.querySelector('[id="rapi-text-suggestion"]')
								msjerapi.parentNode.removeChild(msjerapi)
							}	
						};
						paymentButtons.forEach(button => button.addEventListener('click', buttonClick));

						const rapiButton = document.querySelectorAll('[for="payment_tab_KD"]')
						const rapibuttonClick = function () {
							if(!document.querySelector('[id="rapi-text-suggestion"]')){
								addUpgradeSuggestionPC(".inner-deep-box.ts-hide-on-voucher-only-payment.ts-hide-on-credit-only-payment")
							}	
						};
						rapiButton.forEach(button => button.addEventListener('click', rapibuttonClick));
					}
				});
			}

		}, 200);