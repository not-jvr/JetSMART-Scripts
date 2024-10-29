var initChangeImagesLoginEmpresas = setInterval(function () {
	if (window.location.pathname.toLowerCase() !== '/v2/login') return;
	clearInterval(initChangeImagesLoginEmpresas);

	function esEmpresa() {
		var elemento = document.querySelector('.cug2b-container.flex.items-center.h-full.relative');
		var imagen = elemento.querySelector('img');
		var esSrcCorrecto = imagen && imagen.getAttribute('src') === "/Images/Cug22/cug-logo-company-white-es.svg";

		if (esSrcCorrecto) {
			return true;
		} else {
			return false;
		}
	}

	function changeImageDesktop(selector) {
		var div = document.querySelector('.cug2b-login-banner.hidden-sm-down');
		if (div) {
			var newImageUrl = selector;
			div.style.backgroundImage = 'url(' + newImageUrl + ')';
		}
	}

	function changeImageTablet(selector) {
		var div = document.querySelector('.cug2b-login-banner.hidden-md-up.hidden-xs');
		if (div) {
			var newImageUrl = selector;
			div.style.backgroundImage = 'url(' + newImageUrl + ')';
		}
	}

	function changeImageMobile(selector) {
		var div = document.querySelector('.cug2b-login-banner.hidden-sm-up');
		if (div) {
			var newImageUrl = selector;
			div.style.backgroundImage = 'url(' + newImageUrl + ')';
		}
	}

	function allImagesChanges() {
	//colocar link entremedio de comillas simples, SI NO DESEO MODIFICAR POR EJEMPLO, LA DE TABLET, COMENTAR CON // AL PRINCIPIO DEJANDOLO //changeImageTablet('')
	var imageDesktop = ''; //link desktop
	var imageTablet = ''; //link tablet
	var imageMobile = ''; //link mobile

	changeImageDesktop(imageDesktop);   
	changeImageTablet(imageTablet);    
	changeImageMobile(imageMobile);    
}

if (esEmpresa()) {
	allImagesChanges();
}

}, 600);