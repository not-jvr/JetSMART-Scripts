var initAddMsg = setInterval(function () {
    if (!window.location.pathname.toLowerCase().includes('/v2/itinerary')) return;
	clearInterval(initAddMsg);

	function addMsgComprobante(selector) {
		// var msg = document.querySelector('#msg-devolucion');
		// if (!msg) {
		const container = document.querySelector(selector);
		const newElement = document.createElement('div');
		newElement.id = 'msg-devolucion';
		newElement.innerHTML = `
		<p>
		*Aunque tu pasaje no permita devolución, tienes derecho a devolución de las tasas de embarque en caso de que no viajes.
		</p>
		`;
		const css = `
		#msg-devolucion {
			color: #163a70;
			font-size: 15px;
			font-weight: 300;
			margin: 10px;
		}

		#msg-devolucion > p{
			display: inline-block;
			color: #163a70;
			font-size: 15px;
			font-weight: 300;
			margin: 10px;
		}
		`;
		const head = document.head || document.getElementsByTagName('head')[0];
		const style = document.createElement('style');
		head.appendChild(style);
		style.type = 'text/css';
		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
		container.insertAdjacentElement('afterend', newElement);
		// }
	}

	function addMsgItineraryViaje(selector) {
		// var msg = document.querySelector('#msg-devolucion');
		// if (!msg) {
		const container = document.querySelector(selector);
		const newElement = document.createElement('div');
		newElement.id = 'msg-devolucion-itinerary';
		newElement.innerHTML = `
		<p>
		*Aunque tu pasaje no permita devolución, tienes derecho a devolución de las tasas de embarque en caso de que no viajes.
		</p>
		`;
		const css = `
		#msg-devolucion-itinerary {
			color: #163a70;
			margin-top: 5px;
			position: absolute;
		}

		#msg-devolucion-itinerary > p{
			color: #163a70;
			font-size: 15px;
			font-weight: 300;
		}
		`;
		const head = document.head || document.getElementsByTagName('head')[0];
		const style = document.createElement('style');
		head.appendChild(style);
		style.type = 'text/css';
		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
		container.insertAdjacentElement('afterend', newElement);
		// }
	}
    
    if(bookingData.Culture === 'es-CL'){
    	if(window.location.pathname.toLowerCase().includes('/v2/itinerary') && document.querySelector('ac-itinerary-payment-transactions')){
    		addMsgComprobante('.transaction-button-container');
    	}
    
    	if(window.location.pathname.toLowerCase().includes('/v2/itinerary') && document.querySelector('[data-test-id="itinerary-data-tabs"]')){
    		addMsgItineraryViaje('ac-itinerary-page-tabs-overview');
    	}
    }
    

}, 2000);