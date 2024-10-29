		var initCC = setInterval(function () {
			if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Payment') return;
			clearInterval(initCC);
			var culture = bookingData.Culture;

			function addUpgradeSuggestionPC(selector) {
				const container = document.querySelector(selector);
				const newElement = document.createElement('div');
				newElement.id = 'tarjeta-credito-text-suggestion';
				newElement.innerHTML = '<span>Si eliges pagar en cuotas, el interés mostrado es del plan Ahora aplicable a tarjetas Visa, Mastercard y Cabal; si tu tarjeta no es bancarizada el interés dependerá del banco emisor y podría aplicar cargos extras.</span>';
				const css = `
				#tarjeta-credito-text-suggestion {
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
					name: "Payment_buttons_CC", callback: function (e) {
						const paymentButtonss = document.querySelectorAll('[for="payment_tab_AR - MP Debit"], [for="payment_tab_KA"], [for="payment_tab_KD"]');
						const buttonClickk = function () {
							if(document.querySelector('[id="tarjeta-credito-text-suggestion"]')){
								const msjecc = document.querySelector('[id="tarjeta-credito-text-suggestion"]')
								msjecc.parentNode.removeChild(msjecc)
							}	
						};
						paymentButtonss.forEach(button => button.addEventListener('click', buttonClickk));

						const ccButton = document.querySelectorAll('[for="payment_tab_MR"]')
						const ccbuttonClick = function () {
							if(!document.querySelector('[id="tarjeta-credito-text-suggestion"]')){
								addUpgradeSuggestionPC(".inner-deep-box.ts-hide-on-voucher-only-payment.ts-hide-on-credit-only-payment")
							}	
						};
						ccButton.forEach(button => button.addEventListener('click', ccbuttonClick));
					}
				});
			}

		}, 200);