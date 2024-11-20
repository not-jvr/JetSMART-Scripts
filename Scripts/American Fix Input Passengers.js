var initAmericanPassengersInput = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Passengers') return;
	clearInterval(initAmericanPassengersInput);

	var culture = bookingData.Culture;

	function addCSS() {
		var newText;
		switch (culture) {
			case 'pt-BR':
				newText = 'NOVO';
				break;
			case 'en-US':
				newText = 'NEW';
				break;
			default:
				newText = 'NUEVO';
		}

		var css = `
		#AAdvantageInput {
			position: relative;
		}

		#AAdvantageInput input {
			border-color: #00AEC7;
		}

		#AAdvantageInput::before {
			content: '${newText}';
			position: absolute;
			top: -10px;
			right: 15px;
			background-color: #00AEC7;
			color: #FFFFFF;
			padding: 2px 6px;
			font-size: 12px;
			border-radius: 999px;
			font-weight: bold;
			z-index: 1;
		}
		`;

		var style = document.createElement('style');
		style.appendChild(document.createTextNode(css));
		document.head.appendChild(style);
	}

	// Elimina la definición de addIdInput si no se necesita para nada más.

	function addIdInput() {
		var inputs = document.querySelectorAll('ac-passenger ac-input');
		var optionalText;

		switch (culture) {
			case 'pt-BR':
				optionalText = ' (Opcional)';
				break;
			case 'en-US':
				optionalText = ' (Optional)';
				break;
			default:
				optionalText = ' (Opcional)';
		}

		inputs.forEach(input => {
			if (!input.id) {
				var label = input.querySelector('label');

				if (label && label.textContent.includes('AAdvantage')) {
					input.id = 'AAdvantageInput';
				}
			}
		});
	}

	function repeatFunction(func, times, interval) {
		let counter = 0;
		const repeatInterval = setInterval(function () {
			func();
			counter++;
			if (counter >= times) {
				clearInterval(repeatInterval);
			}
		}, interval);
	}

	addCSS();
	addIdInput(); // Comentado
	window.eventBus.subscribe({
		name: "americanInputPassengers", callback: function (e) {
			repeatFunction(addIdInput, 10, 1000); // Comentado
		}
	});

}, 600);