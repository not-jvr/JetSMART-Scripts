var initHideBoxBE = setInterval(function () {
	if (!window.location.pathname.toLowerCase().startsWith('/cl/es/minisitios/clientesbancoestado')) return;
	clearInterval(initHideBoxBE);

	function hideBox() {
		var box = document.querySelector('#puntostodosuma');

		if (box) {
			box.style.display = 'none';
		}
	}

	hideBox();

}, 600);