function hidePaymentMethods(selector) {
	var payment = document.querySelector(selector);
	if (payment) {
		payment.parentNode.style.display = 'none';
	}
}

function addButton() {
	var navElement = document.querySelector('ac-payment-methods-container nav');
	if (navElement && !document.querySelector('#newButton')) {
		var mostrarMasElement = document.createElement('li');
        mostrarMasElement.id = 'miId'; // Agrega un ID al elemento

        var mostrarMasDiv = document.createElement('div');
        mostrarMasDiv.id = 'mostrarMasDiv';

        var textDiv = document.createElement('div');
        textDiv.innerHTML = 'Más métodos<br>de pago';
        mostrarMasDiv.appendChild(textDiv);

        var iconElement = document.createElement('span');
        iconElement.className = 'js-icon js-circle-chevron-right scroll-right-icon';
        iconElement.id = 'newIcon';
        mostrarMasDiv.appendChild(iconElement);

        mostrarMasElement.appendChild(mostrarMasDiv);
        var ulElement = navElement.querySelector('ul');
        ulElement.appendChild(mostrarMasElement);
    }
}

function addCSS() {
	var css = `
	#miId {
		color: #163a70;
		padding: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 25px !important;
		margin-top: 25px;
		cursor: pointer;
		border: 4px solid transparent;
	}

	#miId:hover {
		background-color: #fff;
		border-radius: 5px;
		border: 4px solid #ccc;
	}

	#mostrarMasDiv {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	#newIcon {
		font-size: 35px;
	}
	`;

	var head = document.head || document.getElementsByTagName('head')[0];
	var style = document.createElement('style');
	head.appendChild(style);
	style.type = 'text/css';
	if (style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}
}

addCSS();
addButton();
hidePaymentMethods('[data-test-id="payment-method-selector-icon-label--c|TC"]');