var initHideBeneficios = setInterval(function () {
	if ((!window.location.pathname.toLowerCase().startsWith('/v2agency') && !window.location.pathname.toLowerCase().startsWith('/v2/agency'))) return;
	clearInterval(initHideBeneficios);

	function hideTusBeneficios() {
		var elementosA = document.querySelectorAll('a');

		elementosA.forEach(function(elemento) {
			if (elemento.textContent.trim() === "Tus Beneficios" || elemento.textContent.trim() === "Your Benefits" || elemento.textContent.trim() === "Seus Benefícios") {
				elemento.style.display = 'none';
			}
		});
	}

	hideTusBeneficios();

}, 600);