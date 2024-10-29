var initAddMsg = setInterval(function () {
	if (window.location.pathname.toLowerCase() !== '/pe/es/quienes-somos/home') return;
	clearInterval(initAddMsg);

function addCSS() {
	var css = `
	.MSG {
		font-size: 16px;
		text-align: center;
	}
	`;

	var head = document.head || document.getElementsByTagName('head')[0],
	style = document.createElement('style');

	head.appendChild(style);

	style.type = 'text/css';
	if (style.styleSheet){
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}
}

function addTopMSG() {
	if (!document.querySelector('.MSG')) {
		var mainHeader = document.querySelector('#box-3');
		mensaje = '<div class="MSG">Aunque tu pasaje no permita devolución, tienes derecho a devolución de las tasas de embarque en caso de que no viajes.</div>';
		mainHeader.insertAdjacentHTML('afterend', mensaje);
	}
}

addCSS();
addTopMSG();

}, 600);