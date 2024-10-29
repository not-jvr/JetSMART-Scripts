var initHideConsultaEstado = setInterval(function () {
	if(!document.querySelector('.img-fluid')) return;
	clearInterval(initHideConsultaEstado);

	document.querySelectorAll('.img-fluid').forEach(function (element) {
		if (element.alt === 'check Status') {
			element.style.display = 'none';
		}
	});
}, 600);