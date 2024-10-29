var fixDNI = setInterval(function () {
	if (!window.location.pathname.toLowerCase().startsWith('/ar/es/minisitios/avion')) return;
	clearInterval(fixDNI);

	function addCSS() {
		var css = `
		.MSG {
			font-size: 16px;
			text-align: center;
			font-weight: 700;
			color: #ffffff;
			margin-top: 10px;
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

	function addMSG() {
		var msg = document.querySelector('.MSG');
		if (!msg) {
			var mainHeader = document.querySelector('#btn-participar-nuevo');
			mensaje = '<div class="MSG">IMPORTANTE: Si el/los pasajero/s no son personas que se encuentren dentro de la base de jubilados ANSES, las reservas serán dadas de baja.</div>';
			mainHeader.insertAdjacentHTML('afterend', mensaje);
		} else if (msg) {
			msg.style.display = 'block';
		}
	}

	function hideMSG() {
		var msg = document.querySelector('.MSG');
		if (msg) {
			msg.style.display = 'none';
		}
	}

	function disabledButton() {
		var button = document.querySelector('#btn-participar-nuevo');
		if (button) {
			button.disabled = true;
		}
	}

	function enabledButton() {
		var button = document.querySelector('#btn-participar-nuevo');
		if (button) {
			button.disabled = false;
		}
	}

	function inputText() {
		var inputElement = document.querySelector('#pnr');
		inputElement.addEventListener("input", function() {
			var inputValue = inputElement.value;

			var numerosEnInput = inputValue.match(/\d/g);

			if (numerosEnInput && numerosEnInput.length === 8) {
				addMSG();
				enabledButton();
			} else {
				hideMSG()
				disabledButton();
			}
		});
	}

	addCSS();
	disabledButton();
	inputText();

}, 600);