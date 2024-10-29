var initAddButton = setInterval(function () {
	if (!window.location.pathname.toLowerCase().startsWith('/cl/es/minisitios/clientesbancoestado')) return;
	clearInterval(initAddButton);

	function addHTML() {
		var container = document.querySelector('.btn-promo-banner');

		if (container) {
			var nuevoElementoHTML = `
			<div class="btn-promo-banner">
			<a href="https://nwm.bancoestado.cl/content/bancoestado-public/cl/es/home/home/productos-/tarjetas-de-credito/visa-/visa-smart.html?referer=jetsmart#/consulta-rut-tcr" class="btn btn-be-promo-banner" target="_blank">¡La quiero!</a>
			</div>
			`;

			container.insertAdjacentHTML('afterend', nuevoElementoHTML);
		}
	}

	function removeButton() {
		var elementos = document.querySelectorAll('.btn-promo-banner');

		if (elementos.length > 0) {
			elementos[0].remove();
		}
	}

	addHTML();
	removeButton();

}, 600);