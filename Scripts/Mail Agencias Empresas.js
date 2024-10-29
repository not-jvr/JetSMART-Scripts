var initMailAgenciasEmpresas = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Agency/Contact') return;
	clearInterval(initMailAgenciasEmpresas);

	const emailParaModificar = document.querySelector('.cug2b-contact-info p:first-of-type');

	const iconoCorreo = document.createElement('i');
	iconoCorreo.classList.add('js-icon-cug', 'js-cug-letter');

	const nuevoCorreo = document.createElement('span');
	nuevoCorreo.textContent = 'soporte.agencias@jetsmart.com';

	const saltoDeLinea = document.createElement('br');

	emailParaModificar.appendChild(saltoDeLinea);
	emailParaModificar.appendChild(iconoCorreo);
	emailParaModificar.appendChild(nuevoCorreo);
	
}, 400);