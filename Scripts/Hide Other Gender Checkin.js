var initOtherGender = setInterval(function () {
	if (window.location.pathname.toLowerCase() !== '/v2checkin/additionalinfo') return;
	clearInterval(initOtherGender);

	function hideOtroGender() {
		var opcionesConValorCero = document.querySelectorAll('option[value="0"]');

		opcionesConValorCero.forEach(opcion => {
			if (opcion.textContent.trim() === "Otro" || opcion.textContent.trim() === "Outro" || opcion.textContent.trim() === "Other") {
				opcion.style.display = "none";
			}
		});
	}

	hideOtroGender();
}, 600);