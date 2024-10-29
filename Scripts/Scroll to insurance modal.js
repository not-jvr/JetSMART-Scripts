var scrollInsuranceModal = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/extras') return;
	clearInterval(scrollInsuranceModal);

	function clickContinueExtras() {
		var boton = document.querySelector('[data-test-id="extras-submit-button"]');

		if (boton) {
			boton.addEventListener('click', () => {
				setTimeout(function () {
					addInsuranceModal();
				}, 500);
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

	clickContinueExtras();

}, 600);