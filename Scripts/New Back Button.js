var initBackButton = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2Checkin/AdditionalInfo') return;
	clearInterval(initBackButton);
	var culture = bookingData.Culture;

	function editBackButton(){
		if(window.innerWidth < 768){
			var volverBtn = document.querySelector('[data-test-id="checkin-return-button"]');
			volverBtn.className = 'volver-text';

			switch (culture) {
			case "en-US":
				volverBtn.innerHTML = '&lt;<u>Back</u>';
				break;
			case "pt-BR":
				volverBtn.innerHTML = '&lt;<u>Retornar</u>';
				break;
			default:
				volverBtn.innerHTML = '&lt;<u>Volver</u>';
			}

			var css = `
			.volver-text {
				text-align: left;
				color: #163a70;
				font-weight: 900;
				font-size: 20px;
				margin-left: 25px
			}
			.checkin-btn-container {
				align-items: flex-start !important;
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
	}
	editBackButton();
}, 400);