var initApellido = setInterval(function(){
	if(!document.querySelector('ul.login-container li:nth-child(2) a')) return;
	clearInterval(initApellido);
	const administraLink = document.querySelector('ul.login-container li:nth-child(2) a');

	administraLink.addEventListener('click', function() {
		const input = document.getElementById('email-or-name-input');
		const labelElement = input.previousElementSibling;
		input.placeholder = 'Ejemplo: Perez Jara';
		labelElement.innerHTML = 'Apellido/s pasajeros o correo electrónico comprador';
	});
}, 200);