var initSpacesXlSeatsMap = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/seat/map') return;
	clearInterval(initSpacesXlSeatsMap);

	function addCSS(){
		var css = `
		.cf-plane-body-image {
			height: 170%;
		}

		.cf-seatmap-row.extra-room {
			margin: 12px 0 12px 0px !important;
		}

		.cf-seatmap-row.extra-room[data-test-value="2"] {
			margin: 0 !important;
		}

		.cf-seatmap-row.extra-room[data-test-value="3"] {
			margin: 0 !important;
		}

		.cf-seatmap-row.extra-room[data-test-value="4"] {
			margin: 0 !important;
		}

		.cf-seatmap-row.cf-gap-before {
			padding-top: 0;
		}
		`,
		head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');

		head.appendChild(style);

		style.type = 'text/css';
		if (style.styleSheet){
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));	
		}
	}

	addCSS();

}, 600);