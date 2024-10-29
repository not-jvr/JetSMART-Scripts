var initMailAgenciasEmpresas = setInterval(function () {
	if ((!window.location.pathname.toLowerCase().startsWith('/v2agency/contact') && !window.location.pathname.toLowerCase().startsWith('/v2/agency/contact'))) return;
	clearInterval(initMailAgenciasEmpresas);

	function addMail() {
		var emailParaModificar = document.querySelector('.cug2b-contact-info p:first-of-type');

		var iconoCorreo = document.createElement('i');
		iconoCorreo.classList.add('js-icon-cug', 'js-cug-letter');

		var nuevoCorreo = document.createElement('span');
		nuevoCorreo.textContent = 'soporte.agencias@jetsmart.com';

		var saltoDeLinea = document.createElement('br');

		emailParaModificar.appendChild(saltoDeLinea);
		emailParaModificar.appendChild(iconoCorreo);
		emailParaModificar.appendChild(nuevoCorreo);
	}

	addMail();
	
}, 600);