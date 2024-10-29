// VARIANTE 1
var init_BundleFullDevolucionBR_3d9ku3b = setInterval(function(){

	if(typeof bookingData === "undefined" || typeof window.eventBus === "undefined") return;
	clearInterval(init_BundleFullDevolucionBR_3d9ku3b);

	if(bookingData.Culture !== "pt-BR") return;
	if(bookingData.PostBooking) return;

	var ARIATA = ["AEP","EZE","JUJ","SLA","IGR","TUC","PSS","CNQ","COR","MDZ","NQN","BRC","CRD","FTE","USH"];
	if(bookingData.AvailableOutboundJourneys.length === 0) return; 
	var iataSalida = bookingData.AvailableOutboundJourneys[0].DepartureStationCode;
	var iataLlegada = bookingData.AvailableOutboundJourneys[0].ArrivalStationCode;
  //if(ARIATA.indexOf(iataSalida) === -1 || ARIATA.indexOf(iataLlegada) === -1) return;

	var css = `
	.bundles-container.hidden-xs .customlidevolucion{
		height: 60px;
	}
	.bundles-container.hidden-xs .iconcustomdevolucion{
		width: 18px;
		margin-right: 20px;
	}
	.bundles-container.hidden-xs .bundle-tooltip .iconcustomdevolucion,
	.selected-bundle-container .bundle-tooltip .iconcustomdevolucion {
		width: 45px;
		margin-right: 10px;
	}
	@media (min-width: 64rem) and (max-width: 74.9375rem){
		.bundles-container.hidden-xs .iconcustomdevolucion,
		.selected-bundle-container .iconcustomdevolucion {
			margin-right: 10px;
			margin-left: 5px;
		}
	}
	@media (min-width: 48rem) and (max-width: 63.9375rem){
		.bundles-container.hidden-xs .iconcustomdevolucion,
		.bundles-container.hidden-xs .bundle-tooltip .iconcustomdevolucion{
			width:12px;
			margin-right: 10px;
		}
		.selected-flight .selected-bundle-container .selected-bundle li.customlidevolucion{
			height: 40px;
		}
	}
	.bundles-container.hidden-sm-up .customlidevolucion{
		height: 45px;
	}
	.bundles-container.hidden-sm-up .iconcustomdevolucion {
		width: 18px;
		margin-right: 10px;
	}
	.bundles-container.hidden-sm-up .bundle-tooltip .iconcustomdevolucion {
		width: 30px;
		margin-right: 10px;
	}
	.selected-booking-bundle .selected-bundle-container .selected-bundle, .selected-flight .selected-bundle-container .selected-bundle{
		max-height: 250px;
	}
	.selected-bundle-container .iconcustomdevolucion {
		width: 18px;
		margin-right: 20px;
	}
	.selected-flight [data-test-value="Full"] .customlidevolucion .bundle-tooltip {
		display: none !important;
	}
	@media (min-width: 64rem) and (max-width: 74.9375rem){
		.selected-bundle-container .iconcustomdevolucion {
			margin: 0 8px 0 5px;
		}
	}
	@media (min-width: 48rem) and (max-width: 63.9375rem){
		.selected-booking-bundle .selected-bundle-container .selected-bundle, .selected-flight .selected-bundle-container .selected-bundle {
			max-height: 150px;
		}
		.selected-bundle-container .iconcustomdevolucion,
		.selected-bundle-container .bundle-tooltip .iconcustomdevolucion{
			width:12px;
			margin: 0 5px;
		}
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

	var BundleFullDevolucionBR3d9ku3b = function(){
    	//AGREGA AL LIGERO Y SMART EL MSG CON X
		/* document.querySelectorAll("#mainContentFlight ac-flight-page ac-flight-fee-option-list ac-flight-fee-option ac-bundles-selector .bundles-container.hidden-xs > div:nth-child(2) ac-bundle-ssr-items ul, #mainContentFlight ac-flight-page ac-flight-fee-option-list ac-flight-fee-option ac-bundles-selector .bundles-container.hidden-sm-up .bundles-row > div:nth-child(3) ac-bundle-ssr-items ul, #mainContentFlight ac-flight-page ac-bundle-selected .selected-bundle-container[data-test-value=Simple] ac-bundle-ssr-items ul, #mainContentFlight ac-flight-page ac-flight-fee-option-list ac-flight-fee-option ac-bundles-selector .bundles-container.hidden-xs > div:nth-child(1) ac-bundle-ssr-items ul, #mainContentFlight ac-flight-page ac-flight-fee-option-list ac-flight-fee-option ac-bundles-selector .bundles-container.hidden-sm-up .bundles-row > div:nth-child(1) ac-bundle-ssr-items ul, #mainContentFlight ac-flight-page ac-bundle-selected .selected-bundle-container[data-test-value=None] ac-bundle-ssr-items ul").forEach(function(e){
			if(e.querySelector("li.customlidevolucion")) e.querySelector("li.customlidevolucion").remove();
			var newitemli = `<li class="customlidevolucion">
						<div class="ssr-line">
							<img class="iconcustomdevolucion"/ src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/eb2ad910-3611-4732-af63-d6abc5dd7ce5/devolucion-de-dinero.png">
							
					<div class="ssr-line-name">
						Reembolso total em cartão-presente ou 95% em dinheiro
					</div>
				
							
						  <div class="bundle-tooltip">
							  <img class="iconcustomdevolucion"/ src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/eb2ad910-3611-4732-af63-d6abc5dd7ce5/devolucion-de-dinero.png">
							  <div class="bundle-tooltip-text">
								  <h3><!---->Reembolso total em cartão-presente ou 95% em dinheiro<!----></h3>
								  <div><!---->Reembolso de 95% do bilhete para o método de pagamento original ou reembolso de 100% em cartão presente JetSMART<!----></div>
							  </div>
						  </div>
					  
						</div>
						
								  <i class="js-icon-bundle js-bundle-circle-x-full" ></i>
							  
					</li>`;
			e.insertAdjacentHTML("beforeend", newitemli);
		}) */
		document.querySelectorAll('.bundle-container[data-test-id="bundle-selector-option--j|0-c|full"] [data-test-id="bundle-ssrs--j|0-c|full"], .bundle-container[data-test-id="bundle-selector-option--j|1-c|full"] [data-test-id="bundle-ssrs--j|1-c|full"], .selected-flight [data-test-value="Full"] ul').forEach(function(e){
			if(e.querySelector("li.customlidevolucion")) e.querySelector("li.customlidevolucion").remove();
			var newitemli = `<li class="customlidevolucion">
			<div class="ssr-line">
			<img class="iconcustomdevolucion"/ src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/eb2ad910-3611-4732-af63-d6abc5dd7ce5/devolucion-de-dinero.png">

			<div class="ssr-line-name">
			Reembolso total em cartão-presente ou 95% em dinheiro
			</div>


			<div class="bundle-tooltip">
			<img class="iconcustomdevolucion"/ src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/eb2ad910-3611-4732-af63-d6abc5dd7ce5/devolucion-de-dinero.png">
			<div class="bundle-tooltip-text">
			<h3><!---->Reembolso total em cartão-presente ou 95% em dinheiro<!----></h3>
			<div><!---->Reembolso de 95% do bilhete para o método de pagamento original ou reembolso de 100% em cartão presente JetSMART<!----></div>
			</div>
			</div>

			</div>

			<i class="js-icon js-flight-tick" ></i>

			</li>`;
			e.insertAdjacentHTML("beforeend", newitemli);
		})
	}
	console.log('GOLA')
	BundleFullDevolucionBR3d9ku3b();

	window.eventBus.subscribe({name: "BundleFullDevolucionBR3d9ku3b", callback: function(data){

		if(data.params) {
			setTimeout(BundleFullDevolucionBR3d9ku3b, 50)
		}
	}})

}, 200)


// VARIANTE 2
var init_BundleFullDevolucionBR_3d9ku3b_2 = setInterval(function(){

	if(typeof bookingData === "undefined" || typeof window.eventBus === "undefined") return;
	clearInterval(init_BundleFullDevolucionBR_3d9ku3b_2);

	if(bookingData.Culture !== "pt-BR") return;
	if(bookingData.PostBooking) return;

	var ARIATA = ["AEP","EZE","JUJ","SLA","IGR","TUC","PSS","CNQ","COR","MDZ","NQN","BRC","CRD","FTE","USH"];
	if(bookingData.AvailableOutboundJourneys.length === 0) return; 
	var iataSalida = bookingData.AvailableOutboundJourneys[0].DepartureStationCode;
	var iataLlegada = bookingData.AvailableOutboundJourneys[0].ArrivalStationCode;
  //if(ARIATA.indexOf(iataSalida) === -1 || ARIATA.indexOf(iataLlegada) === -1) return;

	var css = `
	.bundle-header .header-img.new-img-full{
		max-width: 90%;
		height: auto;
	}
	.selected-bundle-container[data-test-value=Full] .selected-bundle-header .header-img.new-img-full{
		width: 200px;
		margin-top: 4px;
	}
	.selected-flight [data-test-value="Full"] .customlidevolucion .bundle-tooltip {
		display: none !important;
	}
	@media(max-width:1250px){
		.selected-bundle-container[data-test-value=Full] .selected-bundle-header .header-img.new-img-full{
			width: 150px;
		}
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

	var BundleFullDevolucionBR3d9ku3b_2 = function() {
		if(document.querySelectorAll(".bundle-container .bundle-header.full img, .selected-bundle-container[data-test-value=Full] .selected-bundle-header .header-img").length > 0){
			document.querySelectorAll(".bundle-container .bundle-header.full img, .selected-bundle-container[data-test-value=Full] .selected-bundle-header .header-img").forEach(function(e){
				if(e.className.indexOf("new-img-full") === -1){
					e.setAttribute("src", "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/5a07c216-8450-49f3-b127-38e7ea662814/image.png");
					e.classList.add("new-img-full");
				}
			});
		}
	};
	BundleFullDevolucionBR3d9ku3b_2();

	window.eventBus.subscribe({name: "BundleFullDevolucionBR3d9ku3b_2", callback: function(data){
		if(data.params) {
			setTimeout(BundleFullDevolucionBR3d9ku3b_2, 50);
		}		
	}})

}, 600)
