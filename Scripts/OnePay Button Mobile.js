var initOnePayButton = setInterval(function () {
	if (typeof bookingData === "undefined" || typeof window.eventBus === "undefined" || window.location.pathname !== '/V2/Payment') return;
	clearInterval(initOnePayButton);
	var culture = bookingData.Culture;

	function OnePayButtonMobile(){
		if(window.innerWidth < 768){
			setTimeout(function () {
				var labelElement = document.querySelector('label[data-test-id="payment-method-selector-icon-label--c|TC"]');
				if(labelElement){
					var imagen = labelElement.querySelector('.payment-card-img');
					imagen.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/db7ce4cb-e10e-463f-a2fe-d02e3563f30b/ONEPAY.png';
					var texto = labelElement.querySelector('span');
					texto.textContent = 'OnePay';
					var warning = labelElement.querySelector('.payment-method-warning');
					if(warning){
						warning.style.display = 'none';
					}
				}
			}, 1500);
		}
	}

	function clickBox(){
		var innerDeepBox = document.querySelector('#mainContentPayment');
		if (innerDeepBox) {
			innerDeepBox.addEventListener('click', function () {
				OnePayButtonMobile();
			});
		}
	}

	if(culture === 'es-CL'){
		OnePayButtonMobile();
		window.eventBus.subscribe({
			name: "onepayButton", callback: function (e) {
				clickBox();
			}
		});
	}

}, 400);