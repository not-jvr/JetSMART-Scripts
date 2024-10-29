var IMP_7 = setInterval(function () {
	if (typeof bookingData === "undefined" || typeof window.eventBus === "undefined" || typeof JetSmart === "undefined" || typeof JetSmart.AppContext === "undefined" || window.location.pathname !== '/V2/Flight') return;
	clearInterval(IMP_7);
	window.eventBus.subscribe({
		name: "newDc", callback: function (data) {
			if (JetSmart.AppContext.isLoggedIn === "True" && (JetSmart.AppContext.hasStandardDcMembership === "True" || JetSmart.AppContext.hasGroupDcMembership === "True" || JetSmart.AppContext.isStaff === "True" || JetSmart.AppContext.isCug2Member === "True" || JetSmart.AppContext.isBancoEstadoP2On === "True" || JetSmart.AppContext.isChubbV1On === "True")) {

			} else {
				let precioMemEstandar = '$20.000';
				let precioMemGrupal = '$40.000';
				let textAño = '/año';
				let textTramo = 'POR TRAMO POR PASAJERO,<br>EN TARIFAS SOBRE <span class="precio-modal">$15.000</span>';
				let textAhorro = 'AHORRA<br>';
				let textAhorroMaleta = 'POR MALETA POR TRAMO';
				let imgDescuentos = 'https://assets-us-01.kc-usercontent.com:443/b2956330-c34f-0064-2c6f-27bd5c0147fc/c71bd911-7712-4d18-bc5a-54f5d18aab73/Home%20widgets%20-%20Desktop%20-%20JetSmart%20-%2005%20Dic-10%20%281%29.png';
				let imgOfertas = 'https://assets-us-01.kc-usercontent.com:443/b2956330-c34f-0064-2c6f-27bd5c0147fc/0abe0eff-bd2e-49b1-b7b8-237aadc8a5be/Home%20widgets%20-%20Desktop%20-%20JetSmart%20-%2005%20Dic-09%20%281%29.png';
				let memEstandar = 'MEMBRESÍA ESTÁNDAR';
				let memGrupal = 'MEMBRESÍA GRUPAL';
				let tiposMembresia = 'TIPOS DE MEMBRESÍA';
				let beneficiosMebresia = 'CONOCE TU BENEFICIOS';
				let imgDcNormal = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/67f87fce-91d4-4384-ae11-f389ae9bcdbb/Club%20descuentos%20-%20ES.png';
				let imgDcHover = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/e1a5e0fa-ccdf-4772-a68a-c99e19cdc950/dc-logo-blue-espa%C3%B1ol.png'; 
				let textPrecio = 'Precio normal';
				switch(bookingData.Culture){
				case 'pt-BR':
					precioMemEstandar = 'R$180,00';
					precioMemGrupal = 'R$360,00';
					textAño = '/ano';
					textTramo = 'POR TRECHO POR PASSAGEIRO,<br>EM TARIFAS ACIMA DE <span class="precio-modal">R$100</span>';
					textAhorro = 'ECONOMIZE<br>';
					textAhorroMaleta = 'POR MALA POR TRECHO';
					imgDescuentos = 'https://assets-us-01.kc-usercontent.com:443/b2956330-c34f-0064-2c6f-27bd5c0147fc/a1da8129-d3aa-46cd-9081-a1275f4b4f7f/Home%20widgets%20-%20Desktop%20-%20JetSmart%20-%2005%20Dic-14%20(2).png';
					imgOfertas = 'https://assets-us-01.kc-usercontent.com:443/b2956330-c34f-0064-2c6f-27bd5c0147fc/925e845b-66aa-401b-8408-af8ba27daeef/Home%20widgets%20-%20Desktop%20-%20JetSmart%20-%2005%20Dic-12%20(2).png';
					memEstandar = 'ASSINATURA PADRÃO';
					memGrupal = 'ASSINATURA GRUPAL';
					tiposMembresia = 'TIPOS DE ASSOCIAÇÃO';
					beneficiosMebresia = 'CONHEÇA SEUS BENEFÍCIOS';
					imgDcNormal = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/45e840bb-d9af-4974-8448-d47b7695d2e4/Club%20descuentos%20-%20PT.png';
					imgDcHover = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/a59847cc-910f-40dd-9160-45e3a112c8e4/Club-descuentos-PT-Azul.png';
					textPrecio = 'Preço normal';
					break;
				case 'en-US':
					precioMemEstandar = '$35';
					precioMemGrupal = '$70';
					textAño = '/year';
					textTramo = 'PER PASSENGER PER LEG,<br>FOR FARES ABOVE <span class="precio-modal">$25 USD</span>';
					textAhorro = 'SAVE<br>';
					textAhorroMaleta = 'PER BAGGAGE PER LEG';
					imgDescuentos = 'https://assets-us-01.kc-usercontent.com:443/b2956330-c34f-0064-2c6f-27bd5c0147fc/eb981fa9-a93c-423c-bb94-eced2376bb57/Home%20widgets%20-%20Desktop%20-%20JetSmart%20-%2005%20Dic-18%20(2).png';
					imgOfertas = 'https://assets-us-01.kc-usercontent.com:443/b2956330-c34f-0064-2c6f-27bd5c0147fc/af096b63-c123-4974-b505-951dc5a6a004/Home%20widgets%20-%20Desktop%20-%20JetSmart%20-%2005%20Dic-17%20(2).png';
					memEstandar = 'STANDARD MEMBERSHIP';
					memGrupal = 'GROUP MEMBERSHIP';
					tiposMembresia = 'MEMBERSHIP TYPES';
					beneficiosMebresia = 'KNOW YOUR BENEFITS';
					imgDcNormal = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/41a78f50-c815-45d5-8480-825abfbc9a27/Club%20descuentos%20-%20EN.png';
					imgDcHover = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/8a0cd2e9-39ad-4634-b7c3-bf29df5bda80/dc-logo-blue-us.png';
					textPrecio = 'Normal price';
					break;
				case 'es-PE':
					precioMemEstandar = 'S/135';
					precioMemGrupal = 'S/270';
					textTramo = 'POR TRAMO POR PASAJERO,<br>EN TARIFAS SOBRE <span class="precio-modal">$25 USD</span>';
					break;
				case 'es-AR':
					precioMemEstandar = '$4.500';
					precioMemGrupal = '$9.000';
					imgDescuentos = 'https://assets-us-01.kc-usercontent.com:443/b2956330-c34f-0064-2c6f-27bd5c0147fc/35a60245-dd0a-4d68-acec-0c7bebd249ec/Home%20widgets%20-%20Desktop%20-%20JetSmart%20-%2005%20Dic-21%20%282%29.png';
					imgOfertas = 'https://assets-us-01.kc-usercontent.com:443/b2956330-c34f-0064-2c6f-27bd5c0147fc/28c15e63-d75e-481b-80c4-6742c6d858b9/Home%20widgets%20-%20Desktop%20-%20JetSmart%20-%2005%20Dic-20%20%282%29.png';
					textTramo = 'POR TRAMO POR PASAJERO,<br>EN TARIFAS SOBRE <span class="precio-modal">$1.500</span>';
					break;
				case 'es-CO':
					precioMemEstandar = '$86.000 COP';
					precioMemGrupal = '$170.000 COP';
					textAño = '/anual';
					textTramo = 'POR TRAMO POR PASAJERO,<br>EN TARIFAS SOBRE <span class="precio-modal">$90.250</span>';
					break;
				case 'es-PY':
					precioMemEstandar = '$35';
					precioMemGrupal = '$70';
					textTramo = 'POR TRAMO POR PASAJERO,<br>EN TARIFAS SOBRE <span class="precio-modal">$25 USD</span>';
					break;
				case 'es-UY':
					precioMemEstandar = '$35';
					precioMemGrupal = '$70';
					textTramo = 'POR TRAMO POR PASAJERO,<br>EN TARIFAS SOBRE <span class="precio-modal">$25 USD</span>';
					break;
				case 'es-EC':
					precioMemEstandar = '$35';
					precioMemGrupal = '$70';
					textTramo = 'POR TRAMO POR PASAJERO,<br>EN TARIFAS SOBRE <span class="precio-modal">$25 USD</span>';
					break;
				}
				var textTarifa = document.querySelectorAll(".smart-fee .visible-xs.nowrap").forEach(function (e) {
					e.innerHTML = `${textPrecio}`;
				});
				var iconModal = document.querySelectorAll(".selected-flight .fee-container .discount-fee.small, .selected-flight .fee-container .discount-fee.big").forEach(function (e) {
					if (!e.nextElementSibling || !e.nextElementSibling.classList.value.includes("icon-open-modal")) {
						e.insertAdjacentHTML('afterend',
							`<div class="icon-open-modal" onclick="mostraModal();" type="button">i</div>`);
					}
				});
				var modalDiscountClub = document.querySelector(".content-wrapper");
				modalDiscountClub.insertAdjacentHTML('beforebegin',
					`<div class="modal cug-modal agency-modal modal-pruebaa" id="open-modal-dc">
					<div class="modal-content cug-modal-content modal-dc" id="modal-animado">
					<div class="cug-modal-close close-modal-dc" onclick="mostraModal();">×</div>
					<div class="row">
					<div class="col-xs-1 text-center background-content">
					<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/c6219b32-d1a1-416f-a8b3-ace4b3d7b02b/modalDC.png" class="background-modal">
					<img src="${imgDcHover}" class="delete img-dc">
					</div>
					</div>
					<span class="text-membresia">${tiposMembresia}</span>
					<div class="row">
					<div class="col-xs-1 text-center container-membresia">
					<div class="d-flex justify-content-evenly">
					<div>
					<img src="https://assets-us-01.kc-usercontent.com:443/b2956330-c34f-0064-2c6f-27bd5c0147fc/05ec82fb-5845-44cb-bb4e-e9603194dd6b/individual.png" class="img-fluid icon-membresia" alt="...">
					</div>
					<div class="ml-3 ml-sm-0">
					<h3 class="mb-0 text-right font-weight-bold font-italic">${memEstandar}</h3>
					<h1 class="mb-0 text-right display-3 font-bolder text-precio">${precioMemEstandar}<b class="text-año">${textAño}</b></h1>
					</div>
					</div>
					<div class="d-flex justify-content-evenly mem-grupal">
					<div>
					<img src="https://assets-us-01.kc-usercontent.com:443/b2956330-c34f-0064-2c6f-27bd5c0147fc/f4423b84-2be7-4359-b405-ec4e80c73fb9/grupal.png" class="img-fluid icon-membresia" alt="...">
					</div>
					<div class="ml-3 ml-sm-0">
					<h3 class="mb-0 text-right font-weight-bold font-italic">${memGrupal}</h3>
					<h1 class="mb-0 text-right display-3 font-bolder text-precio">${precioMemGrupal}<b class="text-año">${textAño}</b></h1>
					</div>
					</div>
					</div>
					</div>
					<div class="container container-memb">
					<span class="text-membresia">${beneficiosMebresia}</span>
					<div class="row">
					<div class="col-12 col-md-6 my-2 my-md-4 container-img">
					<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/ba982bc9-7c18-4afd-9979-f2d6ba6a5607/DC-Ahorra%20por%20tramo%20por%20pax.png" class="img-membresia" alt="...">
					<div class="text-membresia-ahorro"><strong class="text-ahorra">${textAhorro}</strong>${textTramo}</div>
					</div>
					<div class="col-12 col-md-6 my-2 my-md-4 container-img">
					<img src="${imgOfertas}" class="img-membresia" alt="...">																
					</div>
					<div class="col-12 col-md-6 my-2 my-md-4 container-img">
					<div class="text-maleta"><strong class="text-ahorra-maleta">${textAhorro}</strong>${textAhorroMaleta}</div>
					<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/1b3047e5-64b0-49a7-a8c4-882225603476/DC-Ahorra%20maleta.png" class="img-membresia" alt="...">
					</div>
					<div class="col-12 col-md-6 my-2 my-md-4 container-img">
					<img src="${imgDescuentos}" class="img-membresia" alt="...">
					</div>
					</div>
					</div>
					</div>
					</div>`);

				if (document.querySelectorAll(".selected-flight .fee-container .discount-fee.small").length > 0) {
					let iconNoDc = document.querySelectorAll(".icon-open-modal").forEach(function (e) {
						e.style.left = "62px";
					})
				} else if (document.querySelectorAll(".selected-flight .fee-container .discount-fee.big").length > 0) {
					let iconDc = document.querySelectorAll(".icon-open-modal").forEach(function (e) {
						e.style.right = "20em"; e.style.left = "0";
					})
				}

				var css = `
				.itinerary-flight-info-container {
					margin: 20px 0 0 0;
				}

				.itinerary-station-time-destination.with-one-more-day .one-more-day{
					margin: 1px -6px 0px 6px;
				}
				.precio-modal{
					font-size: 9px;
					font-style: italic;
					color: #1c355e;
					font-weight: 900;
				}
				.text-ahorra-maleta{
					font-size: 18px;
					line-height: 1.5;
				}
				.text-maleta{
					position: absolute;
					color: #fff;
					font-size: 9px;
					left: 7.4rem;
					margin-top: 20px;
					line-height: 1;
					font-weight: 600;
				}
				.text-ahorra{
					font-size: 18px;
					line-height: 1.5;
				}
				.text-membresia-ahorro{
					position: absolute;
					color: #fff;
					font-size: 8px;
					left: 7.4rem;
					margin-top: -70px;
					line-height: 1;
					font-weight: 600;
				}
				.text-año{
					font-size: 13px;
				}
				.close-modal-dc{
					top: -3px !important;
					right: 6px !important;
					width: 25px !important;
					height: 25px !important;
					background: #484848b8 !important;
					font-size: 22px !important;
				}
				.selected-flight .fee-container .discount-fee.small:hover + .icon-open-modal, .selected-flight .fee-container .discount-fee.big:hover + .icon-open-modal {
					color: white;
				}
				.icon-open-modal{
					position: absolute;
					top: 70%;
					margin-left: auto;
					margin-right: auto;
					right: 0;
					transform: translateY(-50%);
					cursor: pointer;
					z-index: 1;
					color: #ffa400;
					border: 2px solid;
					border-radius: 50%;
					font-size: 13px;
					width: 20px;
					height: 20px;
					display: flex;
					align-items: center;
					justify-content: center;
					z-index: 0;
				}
				.mem-grupal{
					margin: auto;
				}
				.container-img{
					flex: 0 0 50%;
					max-width: 50%;
				}
				.img-membresia{
					max-width: 100%;
					height: auto;
				}
				.text-precio{
					margin: unset !important;
					font-size: 20px !important;
					float: left;
				}
				.text-membresia{
					color: #1B365D;
					font-weight: 700;
					display: flex;
					justify-content: center;
					padding: 10px 0px 20px 0px;
					font-size: 18px;
				}
				.container-membresia{
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					margin-right: -0.5rem;
					margin-left: 0.5rem;
				}
				.icon-membresia{
					width: 45px;
				}
				.font-italic{
					font-style: italic;
					font-weight: 700;
					color: #163a70;
				}
				.justify-content-evenly{
					display: flex;
				}
				.img-dc{
					max-width: 100%;
					width: 40%;
					position: relative;
					top: 2rem;
				}
				.background-content{
					background-color: #ffa400;
					margin: -10px 0px 0 0px;
					border-radius: 10px 10px 0px 0px;
					padding-right: 40px;
					height: 141px;
				}
				.modal-dc{
					padding: 0px 8px 0px 8px !important;
					width: 530px !important;
				}
				.background-modal{
					margin-top: -13%;
					max-width: 100%;
					float: right;
				}
				.modal-pruebaa, .fee-selector .fee-container .discount-fee.small span{
					display: none;
				}
				.mostrar-modal-dc {
					display: block !important;
					visibility: visible;
					opacity: 1!important;
				}
				.animacion{
					animation-duration: 2s;
					animation-name: slidein;
				}
				.not-animacion{
					animation-duration: 2s;
					animation-name: slideout;
				}
				@keyframes slidein {
					from {
						margin-left: 100%;
						width: 300%;
					}
					to {
						margin-left: 0%;
						width: 100%;
					}
				}					  
				@keyframes slideout {
					from {
						margin-left: 0%;
						width: 100%;
					}
					to {
						margin-left: 100%;
						width: 300%;
					}
				}					  
				.smart-fee.nowrap.small > div{
					position: relative;
					top: -0.3rem;
				}
				.selected-flight .fee-container .smart-fee.small span{
					white-space: normal !important;
					font-size: 18px;
					font-weight: 400;
					position: relative;
					bottom: -0.4rem;
				}
				.smart-fee .visible-xs.nowrap{
					visibility: visible !important;
					display: block !important;
					opacity: unset !important;
					position: relative !important;
					bottom: -1rem;
					font-size: 18px !important;
					margin-bottom: -37px !important;
				}
				.selected-flight .fee-container .discount-fee.small{
					height: 70%;
					padding: 0px 0px 20px 0px;
					top: 27px;
					display: inline-flex;
					position: absolute;
					left: 72%;
					border-radius: 0px 10px 10px 0px;
					font-size: 27px;
					width: 49%;
					max-width: 100%;
					font-weight: 500;
					border: 1px solid #ccc;
					border-left: unset;
					background: url(${imgDcNormal});
					background-repeat: no-repeat;
					background-size: 79px 23px;
					background-position: 75% 77%;
				}
				.fee-selector .fee-container .discount-fee.big{
					background: url(${imgDcNormal});
					background-repeat: no-repeat;
					background-size: 78px 22px;
					background-position: 75% 77%;
					padding: 0px 0px 20px 0px;
					display: inline-flex;
					font-weight: 500;
					left: 22%;
				}
				.selected-flight .fee-container .discount-fee.small:hover, .fee-selector .fee-container .discount-fee.big:hover{
					background-color: #ffa400 !important;
					color: #fff;
					border: 1px solid #ffa400;
					background: url(${imgDcHover});
					background-repeat: no-repeat;
					background-size: 78px 22px;
					background-position: 75% 77%;
				}
				.selected-flight .fee-container .smart-fee.big{
					padding: 0 2px 0px 0px !important;
					font-size: 33px;
				}
				.selected-flight .fee-container .smart-fee.big, .selected-flight .fee-container .discount-fee.big{
					position: absolute;
					top: 27px;
					height: 70%;
					max-width: 100%;
					width: 50%;
					font-size: 27px;
					left: 23%;
					border: 1px solid #ccc;
					border-radius: 10px 0px 0px 10px;
				}
				.selected-flight .fee-container .smart-fee.small{
					position: absolute;
					top: 27px;
					height: 70%;
					max-width: 100%;
					border: 1px solid #ccc;
					border-radius: 0px 10px 10px 0px;
					border-left: unset;
					width: 50%;
					font-size: 27px;
					left: 72%;
				}
				@media (min-width: 75rem) and (max-width: 87.4375rem){
					.itinerary-station{
						margin: 0 0px;
					}
				}
				@media (max-width: 47.9375rem){
					.text-membresia-ahorro, .text-maleta{
						font-size: 8px;
						left: 7rem;
					}
					.selected-flight .fee-container .smart-fee.big, .selected-flight .fee-container .discount-fee.big{
						height: 77%;
						width: 35%;
						border-radius: 10px 0px 0px 10px;
						top: 16px;
						left: 31% !important;
						font-size: 27px;
					}
					.selected-flight .fee-container .discount-fee.small, .selected-flight .fee-container .smart-fee.small{
						height: 77%;
						width: 35%;
						left: 66%;
						top: 16px;
						border-radius: 0px 10px 10px 0px;
						font-size: 27px;
					}
					.selected-flight .fee-container .smart-fee.small{
						width: 38%;
						left: 68%;
					}
					.smart-fee .visible-xs.nowrap{
						top: 1.7rem !important;
						font-weight: 500 !important;
					}
					.fee-selector .fee-container .smart-fee.big span{
						background: unset;
						color: unset;
					}
					.fee-selector .fee-container .discount-fee.big span{
						display: none !important;
					}
					.selected-flight .fee-container .discount-fee.big {
						padding: 0px 0px 17px 0px !important;
						width: 36%;
						left: 32% !important;
					}
					.smart-fee.nowrap.small > div{
						top: 0.3rem;
					}
					.selected-flight .fee-container .smart-fee.small span{
						bottom: 0rem;
					}
					.selected-flight .fee-container .discount-fee.small, .selected-flight .fee-container .discount-fee.small:hover{
						background-position: 70% 86%;
					}
					.agency-modal .modal-content.cug-modal-content {
						width: 520px !important;
						left: 50%;
						transform: translate(-50%,-50%);
					}
					.container-img {
						max-width: 48%;
					}
					.justify-content-evenly {
						display: flex;
						flex-direction: column;
					}
				}
				@media only screen and (max-width:767px) and (min-width: 625px){
					.selected-flight .fee-container .discount-fee.small + .icon-open-modal {
						left: 118px !important;
					}
				}
				@media only screen and (max-width:540px) and (min-width: 480px){
					.selected-flight .fee-container .discount-fee.small, .selected-flight .fee-container .discount-fee.small:hover {
						background-position: 84% 86%;
						background-size: 78px 22px;
					}
				}
				@media only screen and (max-width:480px) and (min-width: 314px){
					.selected-flight .fee-container .discount-fee.small, .selected-flight .fee-container .smart-fee.big, .selected-flight .fee-container .discount-fee.big, .selected-flight .fee-container .smart-fee.small{
						width: 43%;
						font-size: 22px;
					}
					.selected-flight .fee-container .discount-fee.small span, .smart-fee .visible-xs.nowrap{
						font-size: 16px !important;
						top: 1rem !important;
					}
					.selected-flight .fee-container .discount-fee.small, .selected-flight .fee-container .smart-fee.small{
						left: 69%;
					}
					.selected-flight .fee-container .smart-fee.big, .selected-flight .fee-container .discount-fee.big{
						left: 30% !important;
					}
					.selected-flight .fee-container .smart-fee.small{
						left: 73%;
					}
				}
				@media only screen and (max-width:550px) and (min-width: 420px){
					.precio-modal{
						font-size: 6px;
					}
					.background-modal {
						margin-top: -18%;
					}
					.img-dc {
						top: -6rem;
						right: 6.5rem;
					}
					.agency-modal .modal-content.cug-modal-content {
						width: 392px !important;
					}
					.text-membresia-ahorro{
						font-size: 6px;
						left: 4.5rem;
						margin-top: -53px;
					}
					.text-ahorra, .text-ahorra-maleta{
						font-size: 16px;
					}
					.text-maleta{
						font-size: 6px;
						left: 4.5rem;
						margin-top: 14px;
					}
					#modal-animado .container-membresia div:nth-child(1) > div.ml-3.ml-sm-0{
						margin-left: -0.25rem;
					}
					.img-membresia{
						max-width: 106%;
						margin-left: -12px;
					}
					.font-italic{
						font-size: 15px;
					}
				}
				@media only screen and (max-width:420px) and (min-width: 318px){
					.precio-modal{
						font-size: 4.8px;
					}
					.background-modal {
						margin-top: -19%;
						width: 140px;
					}
					.icon-membresia {
						width: 35px;
					}
					.img-dc {
						top: 2rem;
						right: 0rem;
					}
					.agency-modal .modal-content.cug-modal-content {
						width: 285px !important;
					}
					.background-content{
						height: 85px;
					}
					.font-italic, .text-precio{
						font-size: 10px !important;
					}
					.container-memb{
						right: 10px;
					}
					.text-membresia{
						padding: 10px 25px 20px 0px;
					}
					.text-año {
						font-size: 8px;
					}
					.selected-flight .fee-container .discount-fee.small span, .smart-fee .visible-xs.nowrap{
						font-size: 16px !important;
						top: 1rem !important;
					}
					.selected-flight .fee-container .discount-fee.small, .selected-flight .fee-container .smart-fee.small{
						left: 72%;
					}
					.selected-flight .fee-container .discount-fee.small, .selected-flight .fee-container .discount-fee.small:hover {
						background-position: 83% 86%;
						background-size: 68px 22px;
					}
					.selected-flight .fee-container .discount-fee.big + .icon-open-modal{
						right: 16em !important;
					}
					.text-membresia-ahorro{
						font-size: 4.8px;
						left: 3.4rem;
						margin-top: -43px;
					}
					.text-ahorra, .text-ahorra-maleta{
						font-size: 11px;
						line-height: 1.8;
					}
					.text-maleta{
						font-size: 4.8px;
						left: 3.5rem;
						margin-top: 7px;
					}
					.img-membresia {
						max-width: 110%;
						margin-left: -6px;
					}
				}
				@media (max-width: 767px) {
					.itinerary-flight-info-container {
						height: 105px;
					}
				}

				`,
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
				window["mostraModal"] = function () {
					let modalAnimado = document.getElementById("modal-animado");
					let add = modalAnimado.classList.replace("animacion", "not-animacion");
					let remove = false;
					if (!add) {
						remove = modalAnimado.classList.replace("not-animacion", "animacion");
					}
					if (!add && !remove) {
						modalAnimado.classList.add("animacion");
					}

					//ocultar o mostrar modal de forma rapida o lenta dependiendo de la animacion de cierre
					if ((!add && !remove) || (!add && remove)) {
						let btnMoneda = document.getElementById("open-modal-dc");
						btnMoneda.classList.toggle("mostrar-modal-dc");
					} else {
						setTimeout(() => {
							let btnMoneda = document.getElementById("open-modal-dc");
							btnMoneda.classList.toggle("mostrar-modal-dc");
						}, 1000);
					}


				};
			}
		}
	});
}, 200);
