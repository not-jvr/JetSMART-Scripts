var IMP_5 = setInterval(function () {
	if (typeof bookingData == "undefined" || window.location.pathname !== '/V2/Extras' || !document.querySelector(".ts-flexi-fee")) return;
	clearInterval(IMP_5);

	var culture = bookingData.Culture;

	function esConexion() {
		var outboundFlight = bookingData.AvailableOutboundJourneys[0];
		var siReturnFlight = bookingData.AvailableReturnJourneys;
		if (siReturnFlight) {
			var returnFlight = bookingData.AvailableReturnJourneys[0];
			console.log("a")
		}
		
		if (returnFlight) {
			var conexionOutbound = outboundFlight.IsConnectedFlight;
			var conexionReturn = returnFlight.IsConnectedFlight;

			if (conexionOutbound || conexionReturn) {
				return true;
			} else {
				return false;
			}
		} else if (outboundFlight) {
			var conexionOutbound = outboundFlight.IsConnectedFlight;

			if (conexionOutbound) {
				return true;
			} else {
				return false;
			}
		}
	}

	if (culture && !esConexion()) {
		try {
			var o, r = false;
			var data = bookingData.Passengers;
			var hasBundle = bookingData.Passengers.map(function (a) {
				if (!o) o = a.hasOwnProperty("OutboundJourneySsrs") && a.OutboundJourneySsrs && (a.OutboundJourneySsrs.indexOf("STB1") !== -1 || a.OutboundJourneySsrs.indexOf("STB2") !== -1);
				if (!r) r = a.hasOwnProperty("ReturnJourneySsrs") && a.ReturnJourneySsrs && (a.ReturnJourneySsrs.indexOf("STB1") !== -1 || a.ReturnJourneySsrs.indexOf("STB2") !== -1);
			})

			if (!o && !r) {
				setTimeout(function () {
					var text1 = '¿Problemas de último momento?<strong>¡Olvídate de ellos con nuestro FlexiSMART!</strong>';
					var text2 = 'Modifica tu reserva cuantas veces quieras por un año';
					var text3 = 'Podrás cambiar tu reserva hasta una hora antes del vuelo';
					var text4 = '¡No pagarás cargo por ningún cambio!';
					var text5 = '*Aplica diferencia tarifaria si corresponde.';

					switch (culture) {
					case "pt-BR":
						var text1 = 'Problemas de última hora? <strong>Esqueça-os com nosso FlexiSMART!</strong>';
						var text2 = 'Modifique sua reserva quantas vezes quiser por um ano';
						var text3 = 'Você pode alterar sua reserva até uma hora antes do voo';
						var text4 = 'Você não pagará taxa por nenhuma mudança!';
						var text5 = '*Aplica-se a diferença tarifária, se aplicável.';
						break;
					case "en-US":
						var text1 = 'Last-minute problems? <strong>Forget about them with our FlexiSMART!</strong>';
						var text2 = 'Modify your booking as many times as you want for a year';
						var text3 = 'You can change your booking up to one hour before the flight';
						var text4 = 'You won\'t pay any fee for any changes!';
						var text5 = '*Fare difference applies if applicable.';
						break;
					}

					var subtitlePullUp = document.querySelector(".ts-flexi-fee .title");
					subtitlePullUp.insertAdjacentHTML('beforeend',
						`<div class="subtitle pull-up shorta">${text1}</div>`);

					var flexismarthtml = document.querySelector(".ts-flexi-fee .ts-error-container");
					var textFlexismart = `<div class="flexismart-banner">
					<i class="js-flexi-tick js-icon"></i>
					<span class="span-style">${text2}</span><br>
					<i class="js-icon js-flexi-tick"></i>
					<span class="span-style">${text3}</span><br>
					<i class="js-icon js-flexi-tick"></i>
					<span class="span-style">${text4}</span>
					</div>
					<div class="text-tarifaria">
					${text5}
					</div>
					`
					flexismarthtml.insertAdjacentHTML('afterbegin', textFlexismart);

					let ancillaries = bookingData.Passengers.map(pass => pass.Ancillaries);
					let selected = ancillaries.map(anc => anc.Outbound.NotSelected).concat(ancillaries.map(anc => {
						if (anc.Return != null) {
							return anc.Return.NotSelected
						}
					}
					));
					selected = selected.flat();
					selected = selected.filter(sel => sel !== undefined);
					let countFlexi = selected.filter(sel => sel.ChargeCode == "FLXB");

					//separador de miles
					let thousand_number = function thousand_number(x, thousand, decimal, decimals) {
						x = parseFloat(x).toFixed(decimals);
						if (decimal !== "") {
							x = x.toString().replace(".", decimal);
							let parts = x.toString().split(decimal);
							parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousand);
							return parts.join(decimal);
						}
						return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousand);
					};
					console.log(countFlexi)

					let countFlexiAmount = countFlexi[0].Amount;
					let flexiCurrency = countFlexi[0].CurrencyCode;

					// console.log(flexiCurrency)
					let currencyDicc = {
						'CLP': '$',
						'ARS': '$',
						'PEN': 'S/',
						'COP': '$',
						'BRL': 'R$',
						'USD': '$'
					}

					// console.log(currencyDicc[flexiCurrency])

					function formatearNumero(valor, currency) {
						if (currency === 'ARS' || currency === 'PEN' || currency === 'USD' || currency === 'BRL') {
							// Formato con coma (,)
							return valor.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
						} else if (currency === 'CLP' || currency === 'COP') {
							// Formato con punto (.)
							return valor.toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
						} else {
							// Si la moneda no coincide con las anteriores, devolvemos el valor sin formato
							return valor;
						}
					}

					var datoFormateado = formatearNumero(countFlexiAmount, flexiCurrency);
					// console.log(datoFormateado); // Salida: "26,90"


					//agregando separador de miles
					countFlexiAmount = formatearNumero();

					var text6 = '¡Quiero flexibilidad solo por ';

					switch (culture) {
					case "pt-BR":
						var text6 = 'Eu quero flexibilidade por apenas ';
						break;
					case "en-US":
						var text6 = 'I want flexibility for only ';
						break;
					}

					var textFlexibilidad = document.querySelectorAll(".ts-flexi-fee .extras-binary-name").forEach(function (textFlexibilidad) {
						textFlexibilidad.innerHTML = `${text6}${currencyDicc[flexiCurrency]}${datoFormateado}!`
					})

					var css = `	.ts-flexi-fee .subtitle.pull-up.short{
						display: none;
					}
					strong{
						padding-right: 39px;
					}
					.ts-flexi-fee{
						padding: 0px;
					}
					.booking-wrapper header .main-title {
						margin: 0 0 5px;
						color: #163a70;
						font-family: Lato,sans-serif;
						font-weight: 900;
						font-size: 21px;
						line-height: 1;
					}
					.ts-flexi-fee h3{
						color: #163a70 !important;
						letter-spacing: -1px;
						height: 0px;
						padding: 0px 0px 0 !important;
						height: 0px !important;
					}
					.ts-flexi-fee .padded-bottom-half {
						border: 2px solid #F0F0F0;
						border-radius: 10px !important;
						background: transparent;
						height: 104px;
						margin-top: -30px !important;
						width: 95%;
						position: relative;
						left: 14px;
						margin-bottom: 34px;
					}
					.ts-flexi-fee .btn-boarding span{
						font-weight: bold;
					}
					.ts-flexi-fee .inner-box{
						background: transparent;
					}
					.extras-page .ts-flexi-fee .inner-box.upper-half h3 {
						margin-bottom: 0px !important;
						margin-top: -77px !important;
					}
					.ts-flexi-fee .ts-error-container > div:nth-child(5) > div{
						background: transparent;
						height: 0px;
						z-index: 1;
						position: relative;
						top: 6rem;
						left: 2rem;
						padding-right: 20%;
					}
					.ts-flexi-fee .upper-half{
						height: 0px;
					}
					.ts-flexi-fee .inner-border-box {
						position: relative;
						margin: -15px 15px 15px;
						padding: 15px;
						border: 1px solid #163a70;
						border-radius: 10px;
						background: #fff;
					}
					.ts-flexi-fee .ts-error-container .inner-box .btn-boarding {
						display: flex;
						justify-content: center;
						cursor: pointer;
						--bg-opacity: 1;
						height: 44px;
						background-color: rgba(0,174,199,var(--text-opacity));
						--text-opacity: 1;
						color: #fff;
						position: relative;
						border-radius: 9999px;
						letter-spacing: 0;
						--border-opacity: 1;
						border-color: #fff;
						font-size: 16px;
						padding: 10px 35px 10px 15px;
						bottom: -43%;
						left: 1rem;
						user-select: none;
						border: 2px solid rgba(0,174,199,var(--border-opacity));
					}
					.ts-flexi-fee .ts-error-container .inner-box .btn-boarding:after{
						position: absolute;
						font-weight: 400;
						top: 50%;
						transform: translateY(-50%);
						font-family: jetsmart-v2!important;
						right: 5px;
						content: "\\E9BA";
						font-size: 25px;
					}
					.ts-flexi-fee .ts-error-container .inner-box .btn-boarding:not(.disabled):hover{
						background-color: #fff;
						color: #00AEC7;
						border-color: #00AEC7;
					}
					.ts-flexi-fee .ts-error-container .inner-box .inner-border-box{
						border: none;
						background: transparent;
					}
					.ts-flexi-fee .ts-error-container .inner-box .btn-boarding.selected{
						--bg-opacity: 1;
						background-color: rgba(255,255,255,var(--text-opacity));
						--text-opacity: 1;
						color: #00AEC7;
						--border-opacity: 1;
						border-color: #00AEC7;
						border: 2px solid rgba(0,174,199,var(--border-opacity));
					}
					.ts-flexi-fee .ts-error-container .inner-box .btn-boarding.selected:after{
						position: absolute;
						font-weight: 400;
						top: 50%;
						transform: translateY(-50%);
						font-family: jetsmart-v2!important;
						right: 5px;
						content: "\\E93A";
						font-size: 22px;
					}
					.ts-flexi-fee header {
						position: relative;
						bottom: 10rem;
						left: 2rem;
						margin-top: 4rem;
						margin-bottom: 30px;
					}
					.img-flexi-desktop {
						width: 100%;
						height: auto;
						border-radius: 10px 10px 0px 0px;
						display:block;
						padding-bottom: 30px;
					}
					.flexismart-banner {
						--bg-opacity: 1;
						background: #00abc8;
						display: block;
						align-items: center;
						--text-opacity: 1;
						color: #fff;
						margin: -25px;
						padding-left: 31px;
						line-height: 1.3;
						padding-top: 11px;
						position: relative;
						left: 25px;
						width: 100%;
						padding-bottom: 11px;
						margin-bottom: 21px;
						margin-top: 28px;
						top: 6rem;
					}
					.span-style {
						font-size: 14px;
						font-weight: bold;
						padding-left: 13px;
					}
					.js-flexi-tick:before {
						content: "\\E92E";
						font-size: 14px;
						padding-left: 23px;
					}
					.text-tarifaria {
						position: relative;
						top: 5.6rem;
						color: #919191;
						font-size: 14px;
						left: 14%;
					}
					.ts-flexi-fee .ts-error-container .inner-box .extras-binary-name {
						color: #00AEC7;
						position: absolute;
						bottom: 25%;
						left: 0%;
						font-weight: 800;
						font-size: 18px;
						letter-spacing: -1px;
					}
					@media (max-width: 1540px){
						.ts-flexi-fee .inner-box h3{
							font-size: 16px;
						}
						.ts-flexi-fee .ts-error-container > div:nth-child(5) > div{
							position: relative;
							top: 92px;
						}
					}
					@media only screen and (max-width: 464px) and (min-width: 429px){
						.ts-flexi-fee header{
							bottom: 17rem !important;
						}
					}
					@media (max-width: 1265px) {
						.ts-flexi-fee .inner-border-box {
							position: relative;
							margin: -3px 15px 15px !important;
							padding: 15px;
						}
						.ts-flexi-fee .ts-error-container .inner-box .btn-boarding {
							height: 33px;
							bottom: 2% !important;
							left: 0rem !important;
						}

						.ts-flexi-fee .ts-error-container .inner-box .btn-boarding:after {
							font-size: 22px;
						}
						.ts-flexi-fee .ts-error-container .inner-box .inner-border-box{
							border: none;
							background: transparent;
						}
						.ts-flexi-fee .ts-error-container .inner-box .btn-boarding.selected:after{
							font-size: 18px;
						}
						.ts-flexi-fee .ts-error-container .inner-box .extras-binary-name {
							color: #00AEC7;
							position: relative;
							bottom: 40%;
							left: -6% !important;
							font-weight: 800;
							font-size: 18px;
							letter-spacing: -1px;
							padding-bottom: 1rem;
						}
					}
					@media (max-width: 954px) {
						.ts-flexi-fee .ts-error-container .inner-box .inner-border-box{
							border: none;
							background: transparent;
						}
						.ts-flexi-fee .ts-error-container .inner-box .extras-binary-name{
							color:  #00AEC7;
							position: relative;
							bottom: 28%;
							left: 2%;
							font-weight: 800;
							font-size: 18px;
							letter-spacing: -1px;
							padding-bottom: 49px;
						}
					}
					@media (max-width: 553px) {
						.js-flexi-fee:before {
							content: "\\E905";
							font-size: 37px;
							position: relative;
							top: -12px;
						}
						strong{
							padding-right: 36px;
						}
						.ts-flexi-fee header {
							position: relative;
							bottom: 10rem;
							left: 1rem;
						}
						.ts-flexi-fee .ts-error-container > div:nth-child(5) > div{
							position: relative;
							top: 5rem;
						}
						.flexismart-banner {
							position: relative;
							left: 16px;
							width: 103%;
						}
						.extras-page .booking-wrapper header .title {
							margin-top: 13px;
						}
						.ts-flexi-fee .ts-error-container .inner-box .btn-boarding {
							bottom: 4% !important;
						}
						.js-flexi-tick:before {
							content: "\\E92E";
							font-size: 14px;
							padding-left: 13px;
							position: relative;
							top: 2px;
						}
					}
					@media (max-width:480px){
						.ts-flexi-fee .inner-box{
							text-align: center;
						}
						.js-flexi-tick:before {
							content: "\\E92E";
							font-size: 14px;
							padding-left: 13px;
							position: relative;
							top: -16px;
						}
						.ts-flexi-fee .main-title{
							position: relative;
							top: 1rem;
						}
						.js-flexi-fee:before {
							content: "\\E905";
							font-size: 37px;
							position: relative;
							top: 16px;
						}
						.ts-flexi-fee header {
							top: -12rem !important;
						}

						.ts-flexi-fee .subtitle{
							position: relative;
							top: 2rem;
							right: 1% !important;
							max-width: 96% !important;
						}

						.span-style {
							line-height: 0.8rem;
							position: relative;
							display: block;
							left: 11px;
							margin-top: -30px;
							padding-right: 14px;
						}			
						.js-flexi-tick{
							font-size: 22px;
							position: relative;
							top: 2px;
							right: 10px;
						}
						.ts-flexi-fee .ts-error-container .inner-box .btn-boarding {
							height: 29px !important;
							width: 169px;
							bottom: -58% !important;
							left: -9rem !important;
						}
						.ts-flexi-fee .ts-error-container .inner-box .btn-boarding.selected{
							background-color: rgba(255,255,255,var(--text-opacity)) !important;
							color: #00AEC7 !important;
							border-color: #00AEC7 !important;
						}
						.ts-flexi-fee .ts-error-container .inner-box .extras-binary-name {
							position: relative;
							bottom: 37%;
							left: 19% !important;
							font-size: 18px;
							padding-bottom: 49px;
							width: 15em;
						}
						.ts-flexi-fee header {
							position: relative;
							left: 1rem;
						}
						.flexismart-banner {
							padding-left: 20px !important;
							position: relative;
							left: 20px;
							width: 101%;
						}
						.ts-flexi-fee h3{
							position: relative;
							font-size: 15px !important;
							top: 28% !important;
						}
					}


					@media only screen and (max-width:450px) and (min-width: 380px){
						.ts-flexi-fee .subtitle {
							position: relative;
							top: 1.6rem;

						}
						.ts-flexi-fee header {
							top: -14rem !important;
						}
						.span-style {
							line-height: 0.8rem;
							position: relative;
							display: block;
							left: 8px;
							margin-top: -16px;
						}
						.js-flexi-tick{
							font-size: 22px;
							position: relative;
							top: 2px;
							right: 10px;
						}
						.ts-flexi-fee .ts-error-container .inner-box .extras-binary-name {
							position: relative;
							bottom: 37%;
							left: 20% !important;
							font-size: 16px;
							padding-bottom: 49px;
							width: 15em;
						}
						.ts-flexi-fee header {
							position: relative;
							bottom: 16rem;
							left: 1rem;
						}
						.ts-flexi-fee h3{
							position: relative;
							font-size: 15px !important;
							top: 28% !important;
						}
						.js-flexi-tick:before {
							content: "\\E92E";
							font-size: 14px;
							padding-left: 13px;
							position: relative;
							top: -4px;
						}
						.js-flexi-fee:before {
							content: "\\E905";
							font-size: 37px;
							position: relative;
							top: 1rem;
						}
					}
					@media only screen and (max-width:380px) and (min-width: 340px){
						.js-flexi-tick:before {
							content: "\\E92E";
							font-size: 14px;
							padding-left: 13px;
							position: relative;
							top: -17px;
						}
						.js-flexi-fee:before {
							content: "\\E905";
							font-size: 37px;
							position: relative;
							top: 16px;
						}
						.ts-flexi-fee header {
							position: relative;
							left: 1rem;
							top: -13rem !important;
						}
						.ts-flexi-fee .ts-error-container .inner-box .extras-binary-name {
							position: relative;
							bottom: 37%;
							left: -3% !important;
							font-size: 18px;
							padding-bottom: 49px;
							width: 15em;
						}
						.extras-page .booking-wrapper header .title {
							margin-top: 20px;
						}
					}
					@media only screen and (max-width:340px) and (min-width: 320px){
						.text-tarifaria{
							left: 5%;
						}
						.ts-flexi-fee .subtitle{
							right: 17%;
						}
						.span-style {
							line-height: 0.6rem;
							position: relative;
							display: block;
							left: 11px;
							margin-top: -23px;
						}
						.js-flexi-tick{
							font-size: 22px;
							position: relative;
							top: 2px;
							right: 10px;
						}
						.flexismart-banner{
							line-height: 0.6 !important;
						}
						.ts-flexi-fee .ts-error-container .inner-box .btn-boarding {
							position: relative;
							font-size: 15px;
							padding: 8px 59px 10px 34px !important;
							left: -8rem !important;
						}
						.ts-flexi-fee .ts-error-container .inner-box .extras-binary-name {
							position: relative;
							bottom: 34%;
							left: 1% !important;
							font-size: 16px;
							padding-bottom: 49px;
							width: 15em;
						}
						.ts-flexi-fee header {
							position: relative;
							top: -201px !important;
						}
						.ts-flexi-fee h3{
							position: relative;
							font-size: 15px !important;
							top: 29% !important;
						}
						.js-flexi-tick:before {
							content: "\\E92E";
							font-size: 14px;
							padding-left: 13px;
							position: relative;
							top: -12px;
						}
						.js-flexi-fee:before {
							content: "\\E905";
							font-size: 37px;
							position: relative;
							top: 15px;
						}
						.extras-page .booking-wrapper header .title {
							margin-top: 20px;
						}
					}

					@media only screen and (max-width: 767px) and (min-width: 481px){
						.ts-flexi-fee h3{
							position: relative;
							font-size: 15px !important;
							top: 48%;
							left: 7%;
							width: 100% !important;
							padding-right: 16.8rem !important;
							padding-bottom: 78px;
						}
						.ts-flexi-fee .inner-border-box {
							position: relative;
							margin: 0 52px 15px;
							padding: 23px;
							border: 1px solid #163a70;
							border-radius: 10px;
							background: #fff;
						}
						.ts-flexi-fee .ts-error-container .inner-box .extras-binary-name {
							padding-bottom: 78px;
							left: -6px !important;
						}
						.ts-flexi-fee .ts-error-container .inner-box .btn-boarding{
							left: 1rem !important;
						}
						.ts-flexi-fee .btn-boarding:not(.disabled):hover {
							background-color: #00AEC7 !important;
							color: #fff !important;
							border-color: transparent !important;
						}
						.ts-flexi-fee .btn-boarding:not(.disabled):hover.selected{
							background-color: #ffff !important;
							color: #00AEC7 !important;
							border: 2px solid rgba(0,174,199,var(--border-opacity)) !important;
						}
					}
					@media (max-width: 1190px){
						.ts-flexi-fee .ts-error-container .inner-box .btn-boarding {
							height: 33px;
							position: relative;
							font-size: 15px;
							padding: 10px 59px 10px 34px;
							bottom: 18%;
							left: -1rem;
						}
					}
					@media (max-width: 573px){
						.flexismart-banner {
							padding-left: 66px;
						}
					}
					@media (max-width: 552px){
						.flexismart-banner {
							padding-left: 44px;
						}
						.js-flexi-fee:before {
							content: "\\E905";
							font-size: 37px;
						}
						.booking-wrapper header .main-title {
							margin: -24px 0 5px;
							color: #163a70;
							font-family: Lato,sans-serif;
							font-weight: 900;
							font-size: 21px;
							line-height: 1;
							top: 26px;
						}
					}
					@media only screen and (max-width: 508px) and (min-width: 481px){
						.flexismart-banner {
							padding-left: 16px;
						}
					}
					@media (max-width: 437px){
						.flexismart-banner {
							line-height: 1;
						}
					}
					@media only screen and (max-width: 479px) and (min-width: 451px){
						.ts-flexi-fee header {
							top: -13rem !important;
						}
						.ts-flexi-fee .subtitle {
							position: relative;
							top: 3rem;
							right: 14%;
						}
						.booking-wrapper header .main-title {
							margin: -24px 0 5px;
							color: #163a70;
							font-family: Lato,sans-serif;
							font-weight: 900;
							font-size: 21px;
							line-height: 1;
							top: 39px;
						}
						.js-flexi-fee:before {
							content: "\\E905";
							font-size: 37px;
							position: relative;
							top: 31px;
						}
						.ts-flexi-fee .ts-error-container .inner-box .btn-boarding {
							height: 33px;
							position: relative;
							font-size: 15px;
							padding: 10px 59px 10px 34px;
							left: -1rem;
						}
						.js-flexi-tick:before {
							content: "\\E92E";
							font-size: 14px;
							padding-left: 13px;
							top: -16px;
							position: relative;
						}
						.flexismart-banner {
							padding-top: 13px;
							position: relative;

						}
					}
					@media (max-width: 437px){
						.flexismart-banner {
							line-height: 1.2;
						}
					}
					@media (max-width: 332px){
						.ts-flexi-fee .subtitle{
							font-size: 13px;
						}
					}`
					,
					head = document.head || document.getElementsByTagName('head')[0],
					style = document.createElement('style');
					head.appendChild(style);
					style.type = 'text/css';
					if (style.styleSheet) {
						// This is required for IE8 and below.
						style.styleSheet.cssText = css;
					} else {
						style.appendChild(document.createTextNode(css));
					}
				}, 600);
}



} catch (e) {
	console.log("error", e);
}
}

}, 800);
