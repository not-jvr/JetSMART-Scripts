var IMP_12v2 = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Extras') return;
	clearInterval(IMP_12v2);

	var culture = bookingData.Culture;

	function addCSS() {
		var css = `
		.modal-body .rounded-primary-btn .text-pasajero{
			color: #fff;
			font-size: 14px;
			font-weight: 700;
		}
		.btn-insurance-modal:after{
			position: absolute;
			font-weight: 400;
			top: 15px;
			transform: translateY(-50%);
			font-family: jetsmart-v2!important;
			right: 5px;
			content: "\\E9BA";
			font-size: 25px;
		}
		.with-x-logo{
			color: #00ABC8 !important;
			background: #fff !important;
			border: 1.5px solid #00ABC8 !important;
			font-size: 14px !important;
		}
		.with-x-logo:hover{
			background: #00ABC8 !important;
			color: #fff !important;
			border: 1.5px solid #00ABC8 !important;
		}
		.white-blue{
			background: #00ABC8 !important;
			color: #fff !important; 
			font-size: 14px !important;
			border: 1.5px solid #00ABC8 !important;
			width: 233px !important;
		}
		.newClassInsurance{
			display: block !important;
			position: relative !important;
			z-index: 0 !important;
			top: -10em;
			animation-duration: 2s;
			animation-name: aparecer;
			animation-fill-mode: forwards;
		}
		@keyframes aparecer {
			from {
				top: -10em;
			}
			to {
				top: 0em;
			}
		}      
		.text-mas{
			color: #AA272F;
			font-size: 14px;
		}
		.text-pasajero{
			color: #263F6A;
			font-size: 16px;
			margin-left: 1rem;
		}
		.insurance-content-container.passenger-data-container header{
			display: none;
		}
		.insurance-content-container.passenger-data-container{
			display: block !important;
			position: relative !important;
			z-index: 0 !important;
			top: -10em;

			border-radius: 8px;
			background: #F7F7F7;
			border: transparent;
		}

		.container-btn{
			display: flex;
			position: relative;
			bottom: 3.2rem;
			right: 1rem;
			margin-bottom: -2rem;
			width: min-content;
			margin-left: auto;
		}
		.btn-insurance-modal{
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 19px;
			border: 1.5px solid #263F6A;
			background: #FFF;
			cursor: pointer;
			width: 210px;
			height: 32px;
			color: #263F6A;
			font-size: 14px;
			font-weight: 700;
			position: relative;
		}
		.btn-modal-insurance{
			width: 210px;
			height: 34px;
			background: #00ABC8;
			border: 2px solid #00ABC8;
			right: 8rem;
		}
		.btn-modal-insurance:hover, .btn-insurance-modal:hover, .white-blue:hover{
			background: #263F6A !important;
			border: 2px solid #263F6A !important;
			color: #fff !important;
		}
		.pruebittaa{
			padding: 4px 2px 2px 2px;
			font-size: 14px;
			width: 210px;
			height: 34px;
		}
		.border-left-modal{
			border-left: 2px solid #E7E7E7;
			padding-left: 30px;
		}
		.text-modal-insurance{
			font-size: 18px;
			font-style: normal;
			display: flex;
			justify-content: center;
			font-weight: 800;
			color: #263F6A;
		}
		.modal-insurance-continer{
			padding: 16px !important;
			font-family: Lato,sans-serif !important;
		}
		.modal-insurance{
			border-radius: 10px;
			border: 1px solid #D9D9D9;
			width: 500px !important;
		}
		.title-modal-insurance{
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			background-color: #263F6A !important;
			padding: 22px 16px !important;
		}
		.seguro-modal{
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 16px;
			font-style: normal;
			font-weight: 400;
			color: #263F6A;
			text-align: center;
		}
		.container-seguros{
			display: flex;
			align-items: center;
			border-radius: 8px;
			background: #F7F7F7;
			padding: 16px;
			justify-content: space-evenly;
			margin-top: 24px;
		}
		.header-modal-insurance{
			display: none !important;
		}
		.icon-flexi, .icon-flexi2, .icon-flexi3{
			transition: all .25s ease-in-out;
			position: absolute;
			right: 1.5rem;
			border: unset;
			font-size: 14px !important;
			transform: rotate(90deg);
		}
		.border-bottom-dropdown{
			border-bottom: 1px solid #D9D9D9;
			margin-top: 10px;
		}
		.text-dropdown{
			color : #163a70;
		}
		.label-dropdown{
			align-items: center;
			display: flex;
		}
		.dropdown-insurance{
			width: 100%;
		}
		.text-dropdown-insurance {
			padding : 5px;
			color : #163a70;
			font-size : 16px;
			cursor : pointer;
		}
		.slide {
			clear:both;
			width:100%;
			height:0px;
			overflow: hidden;
			text-align: center;
			transition: height .4s ease;
		}
		.slide li {
			padding: 10px;
			text-align: left;
		}
		#touch, #touch2, #touch3 {
			osition: absolute; 
			opacity: 0; 
			height: 0px;
		}    
		#touch:checked + .slide, #touch2:checked + .slide, #touch3:checked + .slide {
			height: 70px;
		}
		.insurance-content-container{
			background-color: white;
			z-index: 1;
			position: relative;
			border: 1px solid #D9D9D9;
			border-top: unset;
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
		}
		.extras-page .booking-wrapper.insurance-container{
			padding: 24px;
		}
		.extras-insurance-header{
			border: 1px solid #D9D9D9;
			border-bottom: unset;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			background-size: cover;
			height: 160px;
			padding-left: 0.8rem;
			padding-top: 1.8rem;
		}
		.insurance-title-icon{
			font-size: 59px;
		}
		.extras-insurance-title-box{
			font-size: 18px;
			line-height: normal;
		}
		.extras-insurance-title-box .insurance-title{
			max-width: 70% !important;
		}
		.extras-insurance-title-box .insurance-subtitle{
			margin-left: -4rem;
		}
		.extras-insurance-title-box .subtitle-chubb-logo{
			width: 100px;
			height: 11px;
		}

		.close-button-insurance {
			position: absolute;
			top: 10px;
			right: 10px;
			cursor: pointer;
			z-index: 1000;
			height: 30px !important;
			width: 30px !important;
			font-size: 26px !important;
			background: rgba(255, 255, 255, 0.70) !important;
			color: #484848 !important;
			border-radius: 9999px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: 600;
		}
		@media (min-width: 48rem) and (max-width: 63.9375rem){
			.extras-insurance-title-box .insurance-title {
				margin-bottom: 1.75rem;
			}
			.container-btn{
				bottom: 4rem;
			}
		}
		@media (max-width: 47.9375rem){
			.insurance-title-icon {
				font-size: 50px;
				margin-top: -47px;
			}
			.extras-insurance-title-box .insurance-subtitle{
				margin-left: -3rem;
				margin-top: 10px;
			}
			.extras-insurance-header{
				height: 120px;
				padding-top: 0.8rem;
			}
			.container-btn{
				position: unset;
				margin-bottom: 1rem;
				margin-right: auto;
			}
			.extras-insurance-modal .modal-content .rounded-primary-btn{
				right: 0;
			}
			.border-left-modal{
				padding-left: 14px;
			}
		}
		@media only screen and (max-width:510px) and (min-width: 319px){
			.extras-insurance-header {
				background-position: 80%;
			}
			.extras-insurance-title-box .insurance-title{
				text-shadow: 0px 1px #ffffffb3;
			}
		}
		@media only screen and (max-width:530px) and (min-width: 420px){
			.extras-insurance-modal .modal-content {
				width: 390px !important;
			}
		}
		@media only screen and (max-width:420px) and (min-width: 319px){
			.extras-insurance-modal .modal-content {
				width: 285px !important;
			}
		}
		@media only screen and (max-width:400px) and (min-width: 319px){
			.extras-insurance-title-box .insurance-title {
				max-width: 97% !important;
			}
			.insurance-title-icon{
				font-size: 42px;
			}
		}
		@media only screen and (max-width:600px) and (min-width: 319px){
			.slide li {
				line-height: 1;
				font-size: 14px;
			}
		}
		@media only screen and (max-width:340px) and (min-width: 319px){
			.slide li {
				padding: 0;
			}
			.text-dropdown-insurance{
				font-size: 14px;
			}
		}
		`,
		head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style')
		head.appendChild(style)
		style.type = 'text/css';
		if (style.styleSheet) {
			// This is required for IE8 and below.
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
	}

	function editInsurance() {
		setTimeout(function () {
			if (document.querySelector(".insurance-description")) {
				var insuranceDropdown = document.querySelector(".insurance-description");
				insuranceDropdown.innerHTML = `<div class="dropdown-insurance">
				<div>
				<label for="touch" class="label-dropdown dropdown-1">
				<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/1e6d46aa-d7ca-4123-967a-ac5bff0fe4f0/Modo_de_aislamiento.png">
				<span class="text-dropdown-insurance">Cancelación de viaje por afectaciones climáticas</span>
				<i class="js-icon js-chevron-right promo-open-icon icon-flexi"></i>
				</label>               
				<div class="border-bottom-dropdown">
				<input type="checkbox" id="touch"> 
				<ul class="slide">
				<li><div class="text-dropdown">Recibe hasta $1,000 USD por cargos no reembolsables incluyendo ticket aéreo en caso de que se vea impedido
				a iniciar su viaje</div></li> 
				</ul>
				</div>
				</div><br>
				<div>
				<label for="touch2" class="label-dropdown dropdown-2">
				<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/459bd3b7-1502-4d09-907f-e25f809666af/icon-bagg.png">
				<span class="text-dropdown-insurance">Pérdida, daño o retraso de tus pertenencias</span>
				<i class="js-icon js-chevron-right promo-open-icon icon-flexi2"></i>
				</label>               
				<div class="border-bottom-dropdown">
				<input type="checkbox" id="touch2"> 
				<ul class="slide">
				<li><div class="text-dropdown">Te cubrimos por hasta $1,500 USD en caso de pérdida o retraso de tus pertenecías
				</div></li> 
				</ul>
				</div>
				</div><br>
				<div>
				<label for="touch3" class="label-dropdown dropdown-3">
				<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/8794e9f9-ef86-4cef-826d-3df4a7686f7e/icon-emergency.png">
				<span class="text-dropdown-insurance">Incurrir en gastos médicos, hospitalarios o dentales en tu viaje.</span>
				<i class="js-icon js-chevron-right promo-open-icon icon-flexi3"></i>
				</label>               
				<div class="border-bottom-dropdown">
				<input type="checkbox" id="touch3"> 
				<ul class="slide">
				<li><div class="text-dropdown">Cobertura por hasta $10,000 USD en caso de accidente o enfermedad, incluye Covid-19
				</div></li> 
				</ul>
				</div>
				</div>
				</div>`;
			}

			let insuranceTitle = document.querySelector(".insurance-content-container .insurance-title");
			insuranceTitle.innerHTML = `<div class="main-title">¡Que nada te impida llegar a tu destino!</div>`;

			let currencyInsurance = bookingData.TotalPriceCurrencyLocal;
			let textInsurance = document.querySelector(".insurance-data-opener .data-opener-title").innerHTML;
			let pruebitatexto = textInsurance.split("$")[1];
			let textoFinal = pruebitatexto.split("CLP")[0].trim();
			let textInsurance2 = document.querySelector(".insurance-data-opener .data-opener-title");
			textInsurance2.innerHTML = `<div> <strong class="text-pasajero">$${textoFinal} ${currencyInsurance} por pasajero</strong></div>`;

			let btnFlex = document.querySelector('.dropdown-1');
			let iconFlexi = document.querySelector('.icon-flexi');
			btnFlex.addEventListener('click', function () {
				if (iconFlexi.style.transform === '') {
					iconFlexi.style.transform = 'rotate(-90deg)'
				} else {
					iconFlexi.style.transform = ''
				}
			});
			let btnFlex2 = document.querySelector('.dropdown-2');
			let iconFlexi2 = document.querySelector('.icon-flexi2');
			btnFlex2.addEventListener('click', function () {
				if (iconFlexi2.style.transform === '') {
					iconFlexi2.style.transform = 'rotate(-90deg)'
				} else {
					iconFlexi2.style.transform = ''
				}
			});
			let btnFlex3 = document.querySelector('.dropdown-3');
			let iconFlexi3 = document.querySelector('.icon-flexi3');
			btnFlex3.addEventListener('click', function () {
				if (iconFlexi3.style.transform === '') {
					iconFlexi3.style.transform = 'rotate(-90deg)'
				} else {
					iconFlexi3.style.transform = ''
				}
			});
		}, 1500);
}

function addRemoveInsurance() {
	setTimeout(function () {		
		console.log('test');
		if (!document.querySelector(".newClassInsurance")) {
			if (document.querySelector(".insurance-content-container.passenger-data-container")) {
				document.querySelector(".insurance-content-container.passenger-data-container").style.display = 'block';
				let newIdInsurancePassenger = document.querySelector(".insurance-content-container.passenger-data-container");
				newIdInsurancePassenger.id = "idNewInsurance";
				let extrasInsurancePassengers = document.getElementById('idNewInsurance');
				extrasInsurancePassengers.classList.add("newClassInsurance");
			}
			if (document.querySelector(".rounded-primary-btn.white-blue")) {
				let btnInsurance = document.querySelector(".rounded-primary-btn.white-blue");
				btnInsurance.id = 'newIdBtnInsurance';
				if (!btnInsurance.classList.contains('with-x-logo')) {
					document.querySelector(".rounded-primary-btn.white-blue").innerHTML = `Añadir protección a mi viaje`;
				}
			}
			if (document.querySelector(".rounded-primary-btn.blue-white")) {
				let btnInsurance2 = document.querySelector(".rounded-primary-btn.blue-white");
				btnInsurance2.id = 'newIdBtnInsurance2';
				if (!btnInsurance2.classList.contains('white-blue')) {
					document.querySelector(".rounded-primary-btn.blue-white").innerHTML = `Quitar protección`;
				}
			}
		}
	}, 1500);
}

function editModal() {
	if (!document.querySelector(".container-btn")) {
		var modalInsurance = true;
		if (modalInsurance) {
			if (document.querySelector(".extras-insurance-modal .modal-content .modal-header")) {
				document.querySelector(".extras-insurance-modal .modal-content .modal-header").classList.add("header-modal-insurance");
			}
			if (document.querySelector(".modal-body > .eic-ribbon")) {
				document.querySelector(".modal-body > .eic-ribbon").classList.add("title-modal-insurance");
			}
			if (document.querySelector("[data-test-id='common-insurance-modal'] .modal-content")) {
				document.querySelector("[data-test-id='common-insurance-modal'] .modal-content").classList.add("modal-insurance");
			}
			if (document.querySelector("[data-test-id='common-insurance-modal'] .insurance-modal-list-continer")) {
				document.querySelector("[data-test-id='common-insurance-modal'] .insurance-modal-list-continer").classList.add("modal-insurance-continer");
			}

			if (document.querySelector(".modal-body .eic-ribbon")) {
				var modalTitle = document.querySelector(".modal-body .eic-ribbon");
				modalTitle.innerHTML = `<div class="eic-ribbon-title">¿Deseas viajar sin seguro Chubb?</div>`;
			}
			if (document.querySelector("[data-test-id='common-insurance-modal'] .modal-body .rounded-primary-btn")) {
				document.querySelector("[data-test-id='common-insurance-modal'] .modal-body .rounded-primary-btn").classList.add("btn-modal-insurance");
			}
			if (document.querySelector(".extras-insurance-modal .modal-content .insurance-modal-list-continer")) {
				var innerTitleModal = document.querySelector(".extras-insurance-modal .modal-content .insurance-modal-list-continer");
				innerTitleModal.innerHTML = `<div>
				<div class="text-modal-insurance">
				No recibirás el reembolso de tus gastos en caso de:
				</div>
				<div class="container-seguros">
				<div class="seguro-modal">
				<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/f94e58db-8efe-4534-a66d-e1d29c70ad5d/icon-avion.png"><br>
				Cancelación de viaje<br> por afectaciones<br> climáticas
				</div>
				<div class="seguro-modal border-left-modal">
				<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/8794e9f9-ef86-4cef-826d-3df4a7686f7e/icon-emergency.png"><br>
				Incurrir en gastos médicos,<br>hospitalarios o dentales<br> en tu viaje
				</div>
				</div>
				</div>`;
			}
			if (document.querySelector("[data-test-id='common-insurance-modal']  .modal-body")) { //no ta
				var modalFlexismart = document.querySelector("[data-test-id='common-insurance-modal']  .modal-body");
				modalFlexismart.insertAdjacentHTML('beforeend',
					`<div class="container-btn">
					<div class="btn-insurance-modal" id="idBtnInsurance">No asegurar mi viaje</div>
					</div>`);
			}
			if (document.querySelector(".btn-insurance-modal")) {
				var btnInsuranceModal = document.querySelector(".btn-insurance-modal");
				var newIdBtnInsuranceModal = document.getElementById('idBtnInsurance');
				newIdBtnInsuranceModal.onclick = function () {
					if (btnInsuranceModal) {
						setTimeout(function () {
							window.location.href = 'https://booking.jetsmart.com/V2/Payment';
						}, 500);
					}
				}
			}
		}
	}
}

function addX() {
	var modalBody = document.querySelector('[data-test-id="common-insurance-modal"] .modal-body');
	if (modalBody) {
		var closeButtonHtml = '<div class="close-button-insurance">×</div>';
		modalBody.insertAdjacentHTML('afterbegin', closeButtonHtml);
		var closeButton = document.querySelector('.close-button-insurance');
		if (closeButton) {
			closeButton.onclick = function () {
				setTimeout(function () {
					window.location.href = 'https://booking.jetsmart.com/V2/Payment';
				}, 500);
			}
		}
	}
}

function clickContinue() {
	var continueButton = document.querySelector('[data-test-id="extras-submit-button"]');
	if (continueButton) {
		continueButton.addEventListener('click', function() {
			setTimeout(function() {
				if (document.querySelector('[data-test-id="common-insurance-modal"]')) {
					editModal();
					addX();
				}
			}, 300);
		});
	}
}

if (culture === 'es-CL') {
	addCSS();
	editInsurance();
	clickContinue();
	window.eventBus.subscribe({
		name: "initChanges_2rj2r58", callback: function () {
			addRemoveInsurance();
		}
	});
}

}, 700);