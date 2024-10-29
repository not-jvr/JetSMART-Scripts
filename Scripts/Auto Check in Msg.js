var initMsjeAutoCheckin = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/itinerary') return;
	clearInterval(initMsjeAutoCheckin);

	var culture = bookingData.Culture;
	var fechaIda = bookingData.OutboundJourney.DepartureDate;
	var fechaViaje = new Date(fechaIda);
	var hoy = new Date();
	var esIda = fechaViaje.getTime() >= hoy.getTime();
	var idaYvuelta = false;
	var pnr = bookingData.PNR
	var PNRS = ["VEZ5VX", "CYKEFN", "E82UPW", "P842GJ", "DYEUMA", "E3C9KV", "I1FS5L", "E7MRVJ", "RDLS3U", "GBY4QN", "KYJETQ", "F7N3UJ", "T5GPMS", "JB4PVA", "K1KP6L", "I12CYB", "UEIK9E", "C3TB2C", "P7GL4J", "P4NRNF", "UFG1GR", "O7D9TM", "IYDL2N", "Y466HI", "SB2ERQ", "F386SI", "R3D4PY", "W7H46Z", "M6SIMM", "D3G35S", "W6N5NP", "O7F4HZ", "GDGRYH", "G6S1YM", "CC8RYK", "A8C4SG", "BCSRPH", "Z7WM7Z", "H6NCPM", "H4TGHC", "MCC76X", "I21Q6Y", "X63G8P", "Q6VT3Z", "O4Y1RV", "L9ST9Q", "ADHJ7R", "CY6YGA", "Q1CRSB", "N7IGKZ", "UDUNVX", "W6ZT5P", "T4NQ3S", "PBGVXA", "JYEWRR", "D34J4F", "M46L4S", "K5G6QC", "QB152N", "UDWTSX", "E8BF9T", "Y5RKMS", "KDRCXH", "WBYUQQ", "S7Y26Z", "CEKSUR", "A5GJVP", "G7T75G", "BC4T5H", "Q4KEHF", "E8T6YG", "D9E5MD", "NBETXA", "LBSZWN", "WY9WPT", "X4KZHV", "RZV8QR", "N8FPKW", "OFEKSR", "A1WNRl", "K9FZPT", "ND149H", "DE7S3B", "F37TUI", "C7FDSJ", "GD6QMH", "GYZLYD", "K2N6YL", "AYFYTA", "Z5QNJS", "T9W44D", "G39I5F", "Q7H8TM", "M62JPP", "NYFKJQ", "G9FJGD", "E6W97J", "OEZ6UH", "RFGJNR", "O722KM", "K5PZYC", "PBG8XA", "NBYUSA", "C273KY", "B9HS4A", "S26P6L", "A23FJY", "W15JJR", "JB14TA", "C9FPQD", "WF72KE", "Y1DQQR", "B83VFG", "QYKTGQ", "H3KZMV", "B2V6TI", "B8HW6D", "G3DSYI", "N7ECGZ", "ZBNT5N", "C7NLHW", "N8GDXJ", "W6VH6M", "G9HFKD", "K9PRGD", "ZBYUYD", "B3VIUF", "IFBENB", "OYN5MQ", "Y5LR6C", "E4QCHC", "V8FWFJ", "P62GYC", "M8R3FG", "VBKZYQ", "F1P46Y", "YBJ14N", "VEGW4E", "R8YNKJ", "SDLVRX", "S99MHG", "D2EWPY", "CCG3SX", "PDGW3U", "E8MSTG", "S9QM7D", "RB6M7N", "GED66B", "T59LWF", "T8IPRJ", "I2VY8V", "VEY7NH", "M4WZ4C", "EB47PN", "G2S9FI", "R39MNY", "MDGQ9U", "JYJ7VQ", "R3P3YY", "F4S77P", "LY9U4A", "G4PM3P", "E6Y8GM", "V2WT3Y", "D3U5SF", "XD8U8X", "V6RVTP", "X62TXS", "U5925C", "Y9MMQG", "IC5Q8X", "FDP12R", "T5ZVMF", "Y71C2M", "D4LUFC", "AC589H", "ZBILQQ", "J77W9J", "X9L68T","X83L5J", "N5129C", "GCEB8H", "B8VT2Q", "SE31RH", "ZYP9KD", "K7NPFJ", "L7WGhJ", "V478QI", "MCV6YK", "W55YMF", "LB5PTA", "DB52TN", "B74MHJ", "X13YHR", "FB863K", "V7EK7Z"];

	if(bookingData.ReturnJourney !== null){
		idaYvuelta = true;
	}

	function addMsjeAutoCheckin(selector, index, mensaje) {
		var msgAutoCheckin = document.querySelector('#msje-auto-checkin');
		if(!msgAutoCheckin){
			const containers = document.querySelectorAll(selector);
			const container = containers[index];
			const newElement = document.createElement('div');
			newElement.id = 'msje-auto-checkin';
			newElement.innerHTML = '<span>' + mensaje + '</span>';
			const css = `
			#msje-auto-checkin {
				display: flex;
				padding: 5px;
				position: relative;
				background-color: rgb(89, 195, 217);
				line-height: 25px;
				color: white;
				border: 1px;
				border-radius: 5px;
				align-items: center;
				margin: 10px;
				text-align: center;
				font-size: 15px;
			}

			@media screen and (max-width: 768px) {
				#msje-auto-checkin {
					line-height: 20px;
					font-size: 12px;
				}
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
			container.insertAdjacentElement('afterend', newElement);
		}
		
	}

	function checkButtonAndAddMsjeAutoCheckin(selector, index) {
		var containers = document.querySelectorAll(selector);
		var container = containers[index];
		var mensaje;
		var checkinButton = container.querySelector('[data-test-id="checkin-button"]');

		if (checkinButton && (checkinButton.textContent.trim() === "Tarjeta de embarque" || checkinButton.textContent.trim() === "Cartão de embarque" || checkinButton.textContent.trim() === "Boarding pass")) {
			
			switch (culture) {
			case "pt-BR":
				mensaje = `Fizemos o seu check-in automaticamente, baixe seu cartão de embarque aqui. Lembre-se de que se você quiser adicionar mais opções, poderá fazê-lo no aeroporto ou ligando para o nosso centro de atendimento.`;
				break;
			case "en-US":
				mensaje = `We have completed your check-in automatically, download your boarding pass here. Remember that if you want to add more options, you can do so at the airport or by calling our contact center.`;
				break;
			default:
				mensaje = `Hemos hecho tu check-in automáticamente, descarga tu tarjeta de embarque aquí. Recuerda que si quieres agregar más opcionales, lo podrás hacer en aeropuerto o llamando a nuestro contact center`;
				break;
			}

			addMsjeAutoCheckin(selector, index, mensaje);
		} else if(checkinButton && checkinButton.textContent.trim() !== "Tarjeta de embarque" && checkinButton.textContent.trim() !== "Cartão de embarque" && checkinButton.textContent.trim() !== "Boarding pass"){
			
			switch (culture) {
			case "pt-BR":
				mensaje = `Fizemos o seu check-in automaticamente, iremos habilitar seu cartão de embarque quando faltarem 72 horas para o seu voo. Lembre-se de que se você quiser adicionar mais opções, poderá fazê-lo no aeroporto ou ligando para o nosso centro de atendimento.`;
				break;
			case "en-US":
				mensaje = `We have completed your check-in automatically, we will enable your boarding pass 72 hours before your flight. Remember that if you want to add more options, you can do so at the airport or by calling our contact center.`;
				break;
			default:
				mensaje = `Hemos hecho tu check-in automáticamente, habilitaremos tu tarjeta de embarque cuando falten 72 horas para tu vuelo. Recuerda que si quieres agregar más opcionales, lo podrás hacer en aeropuerto o llamando a nuestro contact center.`;
				break;
			}

			addMsjeAutoCheckin(selector, index, mensaje);
		}
	}

	function hideBanners() {
		var banner1 = document.querySelector('.i2-itinerary-section.i2-optionals-banner');
		var banner2 = document.querySelector('.i2-itinerary-section.i2-cabin-bags');
		var banner3 = document.querySelector('.i2-itinerary-section.i2-checked-bags');
		var banner4 = document.querySelector('.i2-itinerary-section.i2-seats');
		var optionals = document.querySelector('ac-itinerary-page-optionals');

		if(banner1){
			banner1.style.display = 'none';
		}
		if(banner2){
			banner2.style.display = 'none';
		}
		if(banner3){
			banner3.style.display = 'none';
		}
		if(banner4){
			banner4.style.display = 'none';
		}
		if(optionals){
			optionals.style.display = 'none';
		}
	}

    //si la variable pnr está en el arreglo PNRS
	if(PNRS.includes(pnr)){
		hideBanners();
    	//DESKTOP
		if (window.innerWidth > 768) {
			if (esIda) {
				checkButtonAndAddMsjeAutoCheckin('.i2-journey-container', 0);
			}
			if (!esIda && idaYvuelta) {
				checkButtonAndAddMsjeAutoCheckin('.i2-journey-container', 1);
			}
		}

    	//MOBILE
		if (window.innerWidth <= 768) {
			if (esIda) {
				checkButtonAndAddMsjeAutoCheckin('.i2-accordion-content .i2-journey-container', 0);
			}
			if (!esIda && idaYvuelta) {
				checkButtonAndAddMsjeAutoCheckin('.i2-accordion-content .i2-journey-container', 1);
			}
		}
	}

}, 400);