var initHideIncAncillaries = setInterval(function(){
	if(typeof bookingData === "undefined" || window.location.pathname !== '/V2/Extras') return;	
	clearInterval(initHideIncAncillaries);
	
	var culture = bookingData.Culture;

	if(culture === 'es-CL'){

		var a = bookingData.Passengers[0];
		var vuelta = bookingData.AvailableReturnJourneys;
		var o = false;
		o = a.hasOwnProperty("OutboundJourneySsrs") && a.OutboundJourneySsrs && (a.OutboundJourneySsrs.indexOf("STB1") !== -1 || a.OutboundJourneySsrs.indexOf("STB2") !== -1);

			
		if(o && !vuelta){
			var css = `
					.ts-flexi-fee, .ts-priority-boarding{
						display: none;
					}
				`,
			head = document.head || document.getElementsByTagName('head')[0],
			style = document.createElement('style');

			head.appendChild(style);

			style.type = 'text/css';
			if (style.styleSheet){
				// This is required for IE8 and below.
				style.styleSheet.cssText = css;
			} else {
				style.appendChild(document.createTextNode(css));	
			}
	
			if(a.OutboundJourneySsrs.indexOf("STB2") !== -1){
				var css2 = `
					.ts-flexi-fee, .ts-priority-boarding, ac-extras-page > form > .extras-page > section:nth-child(2){
						display: none;
					}
					`,
				head = document.head || document.getElementsByTagName('head')[0],
				style = document.createElement('style');

				head.appendChild(style);

				style.type = 'text/css';
				if (style.styleSheet){
					// This is required for IE8 and below.
					style.styleSheet.cssText = css2;
				} else {
					style.appendChild(document.createTextNode(css2));	
				}
			}
		}
	}
}, 800);