var initNewFormsPaymentAmerican = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Payment' || !document.querySelector('#mainContentPayment .booking-wrapper.for-loader')) return;
	clearInterval(initNewFormsPaymentAmerican);

	var culture = bookingData.Culture;

	function addCSS() {
		var css = `
.checkbox-containerNew {
    display: flex;
    align-items: center;
    border: 1px solid #163a70;
    padding: 8px;
    border-radius: 8px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    color: #163a70;
    max-width: 100%;
    box-sizing: border-box;
    margin-bottom: 25px;
}

.checkbox-containerNew label {
    position: relative;
    padding-left: 50px;
    cursor: pointer;
    flex: 1;
    line-height: 1.2;
    word-wrap: break-word;
    margin-right: 10px;
}

.checkbox-containerNew label a {
    color: #59c3d9;
    text-decoration: underline;
}

.checkbox-containerNew .checkbox-span {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    border: 2px solid #59c3d9;
    border-radius: 10px;
    height: 40px;
    width: 40px;
    z-index: 0;
    background-color: transparent;
    transition: background-color 0.3s ease;
}

.checkbox-containerNew.checked .checkbox-span {
    background-color: #59c3d9;
}

.checkbox-containerNew .checkbox-span::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQwIDQwIiB2aWV3Qm94PSIwIDAgNDAgNDAiPjxwYXRoIGQ9Ik0zMS42IDE1LjYgMTcuNyAyOS41IDExIDIyLjgiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiNmZmY7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwIi8+PC9zdmc+');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    transform: translate(-50%, -50%); /* Ajusta la posición según sea necesario */
}

@media screen and (max-width: 768px) {
    .checkbox-containerNew {
        margin: 10px;
    }
}

.payment-checkbox-terms-wrapper.payment.terms {
    display: none;
}

`;

		var style = document.createElement('style');
		style.appendChild(document.createTextNode(css));
		document.head.appendChild(style);
	}

	function addNewConfirm() {
		var selector = document.querySelector('#mainContentPayment .booking-wrapper.for-loader');
		if (selector && !document.querySelector('.checkbox-containerNew')) {
			var newText;
			if (culture === 'en-US') {
				newText = `
            <div class="checkbox-containerNew">
                <label for="accept">
                    <span class="checkbox-span"></span>
                    I accept the <a href="https://home-assets.jetsmart.com/us/en/tyc/condiciones-generales" target="_blank">JetSMART Airlines Terms and Conditions</a>, <a href="https://home-assets.jetsmart.com/us/en/tyc/politica-privacidad" target="_blank">JetSMART Airlines Privacy Policy</a>, <a href="https://www.aa.com/i18n/aadvantage-program/aadvantage-terms-and-conditions.jsp" target="_blank">AAdvantage® Program Terms and Conditions</a>, <a href="https://www.aa.com/i18n/customer-service/support/privacy-policy.jsp" target="_blank">American Airlines Privacy Policy</a>,
                    and I declare that I am of legal age or have the express consent of someone with the legal capacity to represent me. I also declare that in my reservation, if only a minor aged 14 to 17 is flying, they may not be in charge of more than one child or infant.
                </label>
            </div>
            `;
			} else if (culture === 'pt-BR') {
				newText = `
            <div class="checkbox-containerNew">
                <label for="accept">
                <span class="checkbox-span"></span>
                    Aceito os <a href="https://home-assets.jetsmart.com/br/pt/tyc/condiciones-generales" target="_blank">Termos e Condições da JetSMART Airlines</a>, <a href="https://home-assets.jetsmart.com/br/pt/tyc/politica-privacidad" target="_blank">Política de Privacidade da JetSMART Airlines</a>, <a href="https://www.aa.com/i18n/aadvantage-program/aadvantage-terms-and-conditions.jsp" target="_blank">Termos e Condições do programa AAdvantage®</a>, <a href="https://www.aa.com/i18n/customer-service/support/privacy-policy.jsp" target="_blank">Política de Privacidade da American Airlines</a>,
                    e declaro que sou maior de idade ou tenho o consentimento expresso de quem tem capacidade legal para me representar. Também declaro que na minha reserva, se apenas um menor entre 14 e 17 anos estiver voando, ele não poderá estar responsável por mais de uma criança ou bebê.
                </label>
            </div>
            `;
			} else {
				var link, link2;

				switch (culture) {
					case 'es-CL':
						link = 'https://home-assets.jetsmart.com/cl/es/tyc/condiciones-generales';
						link2 = 'https://home-assets.jetsmart.com/cl/es/tyc/politica-privacidad';
						break;
					case 'es-AR':
						link = 'https://home-assets.jetsmart.com/ar/es/tyc/condiciones-generales';
						link2 = 'https://home-assets.jetsmart.com/ar/es/tyc/politica-privacidad';
						break;
					case 'es-PE':
						link = 'https://home-assets.jetsmart.com/pe/es/tyc/condiciones-generales';
						link2 = 'https://home-assets.jetsmart.com/pe/es/tyc/politica-privacidad';
						break;
					case 'es-UY':
						link = 'https://home-assets.jetsmart.com/uy/es/tyc/condiciones-generales';
						link2 = 'https://home-assets.jetsmart.com/uy/es/tyc/politica-privacidad';
						break;
					case 'es-PY':
						link = 'https://home-assets.jetsmart.com/py/es/tyc/condiciones-generales';
						link2 = 'https://home-assets.jetsmart.com/py/es/tyc/politica-privacidad';
						break;
					case 'es-EC':
						link = 'https://home-assets.jetsmart.com/ec/es/tyc/condiciones-generales';
						link2 = 'https://home-assets.jetsmart.com/ec/es/tyc/politica-privacidad';
						break;
					case 'es-CO':
						link = 'https://home-assets.jetsmart.com/co/es/tyc/condiciones-generales';
						link2 = 'https://home-assets.jetsmart.com/co/es/tyc/politica-privacidad';
						break;
				}
				newText = `
            <div class="checkbox-containerNew">
                <label for="accept">
                <span class="checkbox-span"></span>
                    Acepto los <a href="${link}" target="_blank">Términos y Condiciones JetSMART Airlines</a>, <a href="${link2}" target="_blank">Política de Privacidad JetSMART Airlines</a>, <a href="https://www.aa.com/i18n/aadvantage-program/aadvantage-terms-and-conditions.jsp" target="_blank">Términos y Condiciones programa AAdvantage®</a>, <a href="https://www.aa.com/i18n/customer-service/support/privacy-policy.jsp" target="_blank">Política de Privacidad American Airlines</a>
                    y declaro que soy mayor de edad o cuento con el consentimiento expreso de quien tiene capacidad
                    legal para representarme. Además declaro que en mi reserva, si solo vuela un menor entre 14 y 17
                    años no podrá llevar a cargo a más de un niño o infante.
                </label>
            </div>
            `;
			}

			selector.insertAdjacentHTML('afterend', newText);

			document.querySelector('.checkbox-span').addEventListener('click', function (e) {
				e.stopPropagation();
				var checkboxSpan = this;
				var parent = checkboxSpan.parentElement.parentElement;
				var isChecked = parent.classList.toggle('checked');

				var targetCheckbox = document.querySelector('[data-test-id="payment-terms-checkbox-label"]');
				if (targetCheckbox) {
					if (isChecked) {
						targetCheckbox.click();
					} else {
						targetCheckbox.click();
					}
				}
			});
		}
	}

	function reConfirm() {
		setTimeout(function () {
			var checkFake = document.querySelector('.checkbox-containerNew.checked');
			var errorMSG = document.querySelector('.payment-footer-grid .error-message-container');

			if (checkFake && errorMSG) {
				var TyC = document.querySelector('.payment-terms-accept-checkbox');
				if (TyC) {
					TyC.click();
				}
			}
		}, 500);
	}

	addCSS();
	addNewConfirm();
	reConfirm();
	window.eventBus.subscribe({
		name: "reConfirmTyC",
		callback: function (e) {
			reConfirm();
		}
	});

}, 600);