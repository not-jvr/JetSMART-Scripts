var initMsjeSeguridadPE = setInterval(function(){
	if(typeof bookingData === "undefined" || window.location.pathname !== '/V2/Payment') return;
	clearInterval(initMsjeSeguridadPE);

	var culture = bookingData.Culture;
	if (culture === 'es-PE'){
		if(!document.getElementById('span-seguridad-id')){
			const container = document.querySelector('.inner-deep-box.ts-hide-on-voucher-only-payment.ts-hide-on-credit-only-payment');
			const newElement = document.createElement('div');
			newElement.id = 'span-seguridad-id';
			newElement.innerHTML = `<span class="span-seguridad">
			Tu seguridad nos importa. Todos los datos de tu compra están protegidos
			</span>`;
			const css = `
			.span-seguridad:before{
				margin-right: 0.25rem;
				font-weight: 400;
				margin-top: 0px;
				font-family: jetsmart-v2!important;
				font-size: 14px;
				content: "\\E93D";
			}
			#span-seguridad-id {
				display: flex;
				padding: 5px;
				position: relative;
				background-color: rgb(89, 195, 217);
				line-height: 30px;
				color: white;
				border: 1px;
				border-radius: 5px;
				align-items: center;
				margin: 10px;
				margin-left: 10px;
			}
			`;
			const head = document.head || document.getElementsByTagName('head')[0];
			const style = document.createElement('style');
			head.appendChild(style);
			style.type = 'text/css';
			if (style.styleSheet){
				style.styleSheet.cssText = css;
			} else {
				style.appendChild(document.createTextNode(css));
			}
			container.parentNode.appendChild(newElement, container);
		}
	}
}, 200);