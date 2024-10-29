var initChanges_PriceExtras = setInterval(function(){
    if(typeof bookingData === "undefined" || !document.querySelector("ac-extras-page")) return;
    clearInterval(initChanges_PriceExtras);
	
	var culture = bookingData.Culture;
	var cities = {"BUE": "AR", "AEP": "AR", "JUJ": "AR", "SLA": "AR", "IGR": "AR", "TUC": "AR", "PSS": "AR", "CNQ": "AR", "COR": "AR", "MDZ": "AR", "NQN": "AR", "BRC": "AR", "CRD": "AR", "FTE": "AR", "USH": "AR", "EZE": "AR"};
	var vueloNacional = false;
	
	if(bookingData.hasOwnProperty('OutboundJourney')){
		var iataSalida = bookingData.AvailableOutboundJourneys[0].DepartureStationCode;
		var iataLlegada = bookingData.AvailableOutboundJourneys[0].ArrivalStationCode;
		var countrySalida = cities[iataSalida];
		var countryLlegada = cities[iataLlegada];
		if(countrySalida === countryLlegada){
			vueloNacional = true;
		}
	}
	
    if(vueloNacional && bookingData.TotalPriceCurrency == 'ARS'){

		var priceExtraFlexiSmart = document.querySelectorAll("ac-extras-page .ts-flexi-fee .extras-binary-name").forEach(function(e){
				e.innerHTML = `Quiero flexibilidad en mi viaje por sólo $ 850,00 por pasajero.`
		});

		var priceExtraEmbarque = document.querySelectorAll("ac-extras-page ac-checkin-type-passenger ac-checkin-type-passenger-journey div:nth-child(3) .mdl-checkbox__label > .cb-amount").forEach(function(e){
				e.innerHTML = `$500,00`
		});
		
		var priceExtraPriority = document.querySelectorAll("ac-extras-page .ts-priority-boarding > div:nth-child(3) > div:nth-child(1) .extras-binary-name").forEach(function(e){
			e.childNodes[3].textContent = `$500,00`;
		})
		
		var priceExtraPriority2 = document.querySelectorAll("ac-extras-page .ts-priority-boarding > div:nth-child(3) > div:nth-child(2) > div > ac-priority-boarding > div .extras-binary-name").forEach(function(e){
			e.childNodes[3].textContent = `$500,00`;
		})
		
	}
}, 200);