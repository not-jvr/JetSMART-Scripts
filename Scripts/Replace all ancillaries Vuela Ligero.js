var initReplaceVL = setInterval(function() {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
	clearInterval(initReplaceVL);

	var culture = bookingData.Culture;
	var bancoEstado = JetSmart.AppContext.bancoEstadoCategory;

	function addCSS() {
		var css = `
		.bundles-container.hidden-xs > div:nth-child(1) .hidden-xs > ul > li:nth-child(2) > div > i{
			margin-left: 15px;
		}
		.bundles-container.hidden-xs > div:nth-child(1) .line-container{
			text-align: center;
			margin: 6px 0px 5px 0px;
			line-height: 15.5px;
			height: unset;
			color: #263F6A;
			font-size: 12px;
			font-weight: 400;
		}
		.bundles-container.hidden-xs > div:nth-child(1) > ac-bundle-ssr-items > div.hidden-xs > ul > li:nth-child(2){
			margin-bottom: 5rem;
		}
		.text-explicativo{
			text-align: center;
			border-radius: 4px;
			background: var(--jet-smart-blue, #263F6A);
			width: 100%;
			height: 29px;
			padding: 0px 4px 2px 4px;
			color: #fff;
			font-size: 15px;
			font-weight: 900;
			margin-bottom: 4rem;
			padding-top: 4px;
		}
		ac-flight-page ac-bundles-selector .bundles-container.hidden-xs > div:nth-child(1) > ac-bundle-ssr-items > div.hidden-xs > ul{
			border-radius: 10px;
			border: 1px solid #E0E0E0;
			background: #F7F7F7;
			width: 88%;
			height: 360px;
			display: flex;
			padding: 31px 18px;
			flex-direction: column;
			margin-left: auto;
			margin-right: auto;
		}
		.bundles-container.hidden-xs > div:nth-child(1) .hidden-xs li, .bundles-container.hidden-sm-up div:nth-child(1) > div > ac-bundle-ssr-items > .hidden-sm-up li{
			border-bottom: unset;
			justify-content: center;
		}
		.bundles-container > div:nth-child(1) > ac-bundle-ssr-items > .hidden-xs > ul > li > i, .bundles-container div:nth-child(1) > div > ac-bundle-ssr-items > .hidden-sm-up li > i, .hidden-sm-up div:nth-child(1) > div > ac-bundle-ssr-items > .hidden-sm-up > .extra-line-container{
			display: none;
		}
		.bundles-container.hidden-xs > div:nth-child(1) > ac-bundle-ssr-items > div.hidden-xs > ul > li > div{
			flex-direction: column;
			text-align: center;
		}
		.bundles-container.hidden-xs > div:nth-child(1) > ac-bundle-ssr-items{
			display: flex;
			justify-content: center;
			margin-top: 1.5rem;
		}
		.bundles-container.hidden-xs > div:nth-child(1) > ac-bundle-ssr-items > div.hidden-xs > ul > li > div > i{
			font-size: 70px;
			font-weight: 500;
			margin-right: 0;
			margin-bottom: 10px;
		}
		@media only screen and (max-width:1080px) and (min-width: 1023px){
			.text-explicativo{
				width: 111%;
				margin-left: -0.5rem;
			}
		}
		@media (max-width: 47.9375rem){
			.bundles-container.hidden-sm-up > div > div:nth-child(1) .ssr-line{
				flex-direction: column;
			}
			.bundles-container.hidden-sm-up > div > div:nth-child(1) .ssr-line .js-cr-cards, .bundles-container.hidden-sm-up > div > div:nth-child(1) .ssr-line .js-bag-backpack{
				font-size: 45px;
			}
			.bundles-container.hidden-sm-up > div > div:nth-child(1) > div > ac-bundle-ssr-items{
				border-radius: 10px;
				border: 1px solid #E0E0E0;
				background: #F7F7F7;
				margin-left: auto;
				margin-right: auto;
				position: relative;
				top: -6rem;
				text-align: center;
				min-height: 294px;         
			}
			.bundles-container.hidden-sm-up div:nth-child(1) > div > ac-bundle-ssr-items > .hidden-sm-up li{
				margin-top: 3rem;
				margin-left: auto;
				margin-right: auto;
			}
			.bundles-container.hidden-sm-up > div > div:nth-child(1) .hidden-sm-up .ssr-line-name{
				font-size: 15px;
				margin-top: 7px;
			}
			.bundles-container.hidden-sm-up > div > div:nth-child(1) > div{
				padding-left: 10px;
				padding-right: 10px;
			}
			.text-explicativo{
				margin: 20px 0px 0px 8px;
				width: 90%;
				padding-top: 3px;
			}
			.text-adic{
				text-align: center;
				margin: -148px 0px 69px 0px;
				line-height: 15.5px;
				height: unset;
				color: #263F6A;
				font-size: 12px;
				font-weight: 400;
			}
			.bundles-container.hidden-sm-up div:nth-child(1) .bundle-header .bundle-price.no-bundle, .bundles-container.hidden-sm-up div:nth-child(1) .bundle-header .bundle-price-info.no-bundle{
				display: none;
			}
			.text-tramo, .text-cero{
				position: relative;
				top: -1rem;
			}
		}
		`,
		head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');

		head.appendChild(style);

		style.type = 'text/css';
		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
	}

	function changeVuelaLigero() {
		setTimeout(function () {

			document.querySelectorAll(".text-explicativo").forEach(function (e) {
				e.remove()
			});
			document.querySelectorAll(".text-cero").forEach(function (e) {
				e.remove()
			});
			document.querySelectorAll(".text-tramo").forEach(function (e) {
				e.remove()
			});
			document.querySelectorAll(".text-adic").forEach(function (e) {
				e.remove()
			});

			var text1 = 'SOLO INCLUYE:';
			var text2 = 'BOLSO<br> DE MANO';
			var text3 = '*Después podrás agregar<br>extras por separado<br>con un costo adicional';
			var text4 = '*Después podrás agregar<br>extras por separado<br>con un costo adicional';
			var text5 = '*Por tramo, por pasajero';

			switch (culture) {
			case 'en-US':
				text1 = 'ONLY INCLUDE:';
				text2 = 'HANDBAG';
				text3 = '*Later you can add<br>extras separately<br>at an additional cost';
				text4 = '*Later you can add<br>extras separately<br>at an additional cost';
				text5 = 'Per leg, per passenger';
				break;
			case 'pt-BR':
				text1 = 'APENAS INCLUA:';
				text2 = 'BOLSO<br> DE MÃO';
				text3 = '*Mais tarde você pode adicionar<br>extras separadamente<br>com custo adicional';
				text4 = '*Mais tarde você pode adicionar<br>extras separadamente<br>com custo adicional';
				text5 = '*Por trecho, por passageiro';
				break;
			}

			let replaceAncillaries = document.querySelectorAll('.bundles-container.hidden-xs > div:nth-child(1) [data-test-id="bundle-ssr-item--j|0-c|none|FLXB"], .bundles-container.hidden-xs > div:nth-child(1) [data-test-id="bundle-ssr-item--j|0-c|none|LBGC|LBGD|LBGC|LBAG|BAGC|BAGD"], .bundles-container.hidden-xs > div:nth-child(1) [data-test-id="bundle-ssr-item--j|0-c|none|PBOA|PBA|PBD|PBP"], .bundles-container.hidden-xs > div:nth-child(1) [data-test-id="bundle-ssr-item--j|0-c|none|SOMESEATS"], .bundles-container.hidden-xs > div:nth-child(1) [data-test-id="bundle-ssr-item--j|0-c|none|ALLSEATS"], .bundles-container.hidden-xs > div:nth-child(1) [data-test-id="bundle-ssr-item--j|0-c|none|APCH|APCA|APCD|APCP"], .bundles-container.hidden-xs > div:nth-child(1) [data-test-id="bundle-ssr-item--j|0-c|simple|ALLSEATS"], .bundles-container.hidden-xs > div:nth-child(1) [data-test-id="bundle-ssr-item--j|0-c|simple|APCH|APCA|APCD|APCP"], .bundles-container.hidden-xs > div:nth-child(1) [data-test-id="bundle-ssr-item--j|1-c|none|FLXB"], .bundles-container.hidden-xs > div:nth-child(1) [data-test-id="bundle-ssr-item--j|1-c|none|LBGC|LBGD|LBGC|LBAG|BAGC|BAGD"], .bundles-container.hidden-xs > div:nth-child(1) [data-test-id="bundle-ssr-item--j|1-c|none|PBOA|PBA|PBD|PBP"], .bundles-container.hidden-xs > div:nth-child(1) [data-test-id="bundle-ssr-item--j|1-c|none|SOMESEATS"], .bundles-container.hidden-xs > div:nth-child(1) [data-test-id="bundle-ssr-item--j|1-c|none|ALLSEATS"], .bundles-container.hidden-xs > div:nth-child(1) [data-test-id="bundle-ssr-item--j|1-c|none|APCH|APCA|APCD|APCP"], .bundles-container.hidden-xs > div:nth-child(1) [data-test-id="bundle-ssr-item--j|1-c|simple|ALLSEATS"], .bundles-container.hidden-xs > div:nth-child(1) [data-test-id="bundle-ssr-item--j|1-c|simple|APCH|APCA|APCD|APCP"], .bundles-container.hidden-xs > div:nth-child(1) [data-test-id="bundle-ssr-item--j|0-c|none|LBGC|LBGD|LBGC|LBAG|LBG1|LBG2|BAGC|BAGD|BAG1|BAG2"], .bundles-container.hidden-xs > div:nth-child(1) [data-test-id="bundle-ssr-item--j|1-c|none|LBGC|LBGD|LBGC|LBAG|LBG1|LBG2|BAGC|BAGD|BAG1|BAG2"]');
			replaceAncillaries.forEach(function (e) {
				if(e){
					e.style.visibility = 'hidden';
				}
			});

			let textIncludes = document.querySelectorAll(".bundles-container > div:nth-child(1) > ac-bundle-ssr-items > div.hidden-xs > ul, .bundles-container.hidden-sm-up div:nth-child(1) > div > ac-bundle-ssr-items").forEach(function(e){
				e.insertAdjacentHTML('afterbegin', 
					`<div class="text-explicativo">
					${text1}
					</div>`);
			});
			let textSmarticket = document.querySelectorAll(".bundles-container > div:nth-child(1) > ac-bundle-ssr-items ul > li:nth-child(2) > div > div.ssr-line-name, .bundles-container div:nth-child(1) > div > ac-bundle-ssr-items ul > li:nth-child(1) > div > .ssr-line-name").forEach(function (e) {
				e.innerHTML = `SMARTICKET`;
			});
			let textBolsoMano = document.querySelectorAll(".bundles-container.hidden-xs > div:nth-child(1) div.hidden-xs > ul > li:nth-child(3) > div > .ssr-line-name, .bundles-container.hidden-sm-up > div > div:nth-child(1) div.hidden-sm-up > ul > li:nth-child(2) > div > div.ssr-line-name").forEach(function (e) {
				e.innerHTML = `${text2}`;
			});

			let textExtras = document.querySelectorAll(".bundles-container div:nth-child(1) > div.line-container").forEach(function (e) {
				e.innerHTML = `${text3}`;
			});

			let textExtrasMobile = document.querySelectorAll(".bundles-container.hidden-sm-up > div > div:nth-child(1) > div > ac-bundle-ssr-items").forEach(function(e){
				e.insertAdjacentHTML('afterend', 
					`<div class="text-adic">
					${text4}
					</div>`);
			});
			let textCostoCero = document.querySelectorAll(".bundles-container.hidden-sm-up > div > div:nth-child(1) > div > ac-bundle-ssr-items").forEach(function(e){
				e.insertAdjacentHTML('afterend', 
					`<div class="bundle-price no-bundle text-cero">+ 0</div>
					<div class="bundle-price-info no-bundle text-tramo">${text5}<!----></div>`);
			});
		}, 1700);
}

function clickButtons() {
	var smartFeeButtons = document.querySelectorAll('.smart-fee.nowrap.big, .discount-fee.nowrap.small, .smart-fee.nowrap.small, .discount-fee.nowrap.big');
	var buttonClickHandler = function() {
		changeVuelaLigero();
	};
	smartFeeButtons.forEach(function(button) {
		button.addEventListener('click', buttonClickHandler);
	});
}

if (bancoEstado < 1) {
	addCSS();
	changeVuelaLigero();
	clickButtons();
	window.eventBus.subscribe({
		name: "replaceVuelaLigero",
		callback: function(e) {
			changeVuelaLigero();
			clickButtons();
		}
	});
}

}, 600);