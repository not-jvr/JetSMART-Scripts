var initHideButtonPrint = setInterval(function () {
	if (window.location.pathname.toLowerCase() !== '/co/es/formulario-contacto') return;
	clearInterval(initHideButtonPrint);

	function hidePrint() {
		var elementos = document.querySelectorAll('#continueBtn1');
		if (elementos){
			elementos.forEach(function(elemento) {
				if (elemento.textContent.includes('Imprimir')) {
					elemento.style.display = 'none';
				}
			});
		}
	}
	
	hidePrint();
}, 600);