var moveInsuranceFirst = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/extras') return;
	clearInterval(moveInsuranceFirst);

	function moveInsurance() {
		var insuranceSelect = document.querySelector('[data-test-id="extras-insurance-version"]');
		var extraPage = document.querySelector('[data-test-id="extras-page"]');

		if (insuranceSelect && extraPage) {
			extraPage.insertBefore(insuranceSelect, extraPage.firstChild);
		}
	}

	function clickContinueExtras() {
		var boton = document.querySelector('[data-test-id="extras-submit-button"]');

		if (boton) {
			boton.addEventListener('click', () => {
				setTimeout(function () {
					addInsuranceModal();
					console.log("hoa");
					var elemento = document.querySelector('[data-test-id="extras-new-insurance-passenger-list-container"] .ts-udf-error.error-message-container');

					if (elemento) {
						document.querySelector('.insurance-content-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
					}
				}, 700);
			});
		}
	}

	function addInsuranceModal() {
		var addInsurance = document.querySelector('[data-test-id="insurance-modal-confirm-button"]');
		if (addInsurance) {
			addInsurance.addEventListener('click', () => {
				setTimeout(function () {
					var elemento = document.querySelector('[data-test-id="extras-new-insurance-passenger-list-container"]');
					if (elemento) {
						document.querySelector('.insurance-content-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
					}
				}, 500);
			});
		}
	}

	moveInsurance();
	clickContinueExtras();

}, 600);