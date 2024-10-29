var initElementosNOCO = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2checkin/additionalinfo') return;
	clearInterval(initElementosNOCO);

	function hayColombia() {
		let departureStationCode = bookingData.OutboundJourney.DepartureStationCode;
		let arrivalStationCode = bookingData.OutboundJourney.ArrivalStationCode;
		
		let iataCO = ['CUC', 'CTG', 'MDE', 'BOG', 'CLO', 'PEI', 'SMR'];
		return iataCO.includes(departureStationCode) || iataCO.includes(arrivalStationCode);
	}

	function hideIcon(icono) {
		var liElement = document.querySelector('li > .' + icono).parentNode;
		if (liElement) {
			liElement.style.display = 'none';
		}
	}

	function addText(clase, texto1, texto2) {
		var elementoLi = document.querySelector('.js-icon-forbidden.' + clase).parentNode;
		if (elementoLi) {
			var span1 = document.createElement('span');
			span1.textContent = texto1;

			var span2 = document.createElement('span');
			span2.textContent = texto2;

			elementoLi.appendChild(span1);
			elementoLi.appendChild(span2);
		}
	}

	function addTextNota() {
		var elemento = document.querySelector('.general-items-info');
		if (elemento) {
			var nuevoContenido = 'Nota: <br> 1. Para vuelos nacionales en Perú y Colombia, está prohibido transportar armas de fuego.<br> 2. Los artículos descartados en los puntos de inspección y registro de pasajeros serán considerados abandono.';
			elemento.innerHTML = nuevoContenido;
		}
	}

	function hideText() {
		var elementosLi = document.querySelectorAll('.general-items-info');

		if (elementosLi.length > 1) {
			var segundoElementoLi = elementosLi[1];
			segundoElementoLi.style.display = 'none';
		}
	}

	function addImage(elementNumber, imageUrl) {
		var selector = '.js-general' + elementNumber;
		var elemento = document.querySelector(selector);
		if (elemento) {
			var imagenHTML = '<img src="' + imageUrl + '" class="newicon">';
			elemento.insertAdjacentHTML('afterend', imagenHTML);
			elemento.remove();
		}
	}

	function addCSS() {
		var css = `
		.newicon {
			height: auto !important;
			width: auto !important;
			margin: 0 !important;
		}

		`;
		var head = document.head || document.getElementsByTagName('head')[0];
		var style = document.createElement('style');
		head.appendChild(style);
		style.type = 'text/css';
		if (style.styleSheet){
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
	}

	function borrarElementos() {
		var elementos = document.querySelectorAll('.prohibited-category.hand-and-checked-baggage .js-forbidden-circle');
		elementos.forEach(function(elemento) {
			elemento.remove();
		});
	}

	let culture = bookingData.Culture;

	if(culture !== 'en-US' && culture !== 'pt-BR')

		if (hayColombia()) {
			hideText();
			addTextNota();
			addText('js-general1', 'Inflamable', 'Flammable');
			addText('js-general2', 'Vias respiratorias', 'Health hazard');
			addText('js-general3', 'Comburentes', 'Oxidising');
			addText('js-general4', 'Gas a presión', 'Compressed gas');
			hideIcon('js-icon-forbidden.js-general5');
			hideIcon('js-icon-forbidden.js-general6');
			addText('js-general7', 'Corrosivo', 'Corrosive');
			addText('js-general8', 'Tóxico', 'Toxic');
			addText('js-general9', 'Peligro', 'Danger');
			addText('js-general10', 'Toxicidad acuática', 'Environimental hazard');
			addText('js-general11', 'Explosivo', 'Explosive');
			addCSS();
			borrarElementos();
			addImage(1, 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/c05b6c00-2eb7-4093-b2a1-5c65ce3f969b/pngwing.com%20%281%29.png');
			addImage(2, 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/bccb781a-ac12-410d-9c55-851df8e79777/pngwing.com%20%288%29.png');
			addImage(3, 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/dcf907a3-42fe-482c-a54f-c488cb7598be/pngwing.com%20%284%29.png');
			addImage(4, 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/5e26a0ac-b59b-47df-9dd1-de43527e837b/pngwing.com%20%283%29.png');
			addImage(7, 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/ff8c18a5-ad07-4d76-908c-9f314f114025/pngwing.com%20%286%29.png');
			addImage(8, 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/1ec36bb8-7989-4480-a10b-ef74a4458cf3/pngwing.com%20%285%29.png');
			addImage(9, 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/185ce857-b735-4b15-9e15-3c69c21f6dd1/pngwing.com%20%289%29.png');
			addImage(10, 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/c0124d15-5f52-4252-856e-30429ec0cdd2/pngwing.com%20%287%29.png');
			addImage(11, 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/ef9da4bd-b980-4ae8-85e5-4114b44c36e7/pngwing.com%20%282%29.png');
		}

	}, 600);