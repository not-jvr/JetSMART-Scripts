var initGIFCuotealoLanding = setInterval(function () {
	if (!window.location.pathname.includes('/pe/es/minisitios/codigos-descuento')) return;
	clearInterval(initGIFCuotealoLanding);
	
	if(document.querySelector('h3.font-weight-bold')){
		var elemento = document.querySelector('h3.font-weight-bold');
		var imageUrl = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/dc13042f-de70-4231-b22d-fbcd498c57c5/NuevoGif_General.gif';
		var mensaje = '<br><span style="font-size: 24px;">Revisa <a href="' + imageUrl + '" target="_blank">AQUÍ</a> cómo pagar con Cuotéalo.</span>';
		elemento.innerHTML += mensaje;
	}

}, 400);