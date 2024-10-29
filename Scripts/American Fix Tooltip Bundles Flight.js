var initTooltipAmericanBundles = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
	clearInterval(initTooltipAmericanBundles);

	var culture = bookingData.Culture;

	function addTooltipAmerican() {
		var elements = document.querySelectorAll('[data-test-id^="bundle-ssr-item--j|"][data-test-id*="ACAA"] .ssr-line');
		var title = 'Acumulación de Millas AAdvantage®';
		var content = 'Gana millas AAdvantage® por viajar en JetSMART. Sólo tienes que indicar tu número AAdvantage® al reservar tu viaje. Gana 2 millas por dólar con tarifas Vuela Ligero, o 5 millas por dólar con una tarifa Pack.';

		switch(culture) {
		case 'en-US':
			title = 'AAdvantage® Miles accumulation';
			content = 'Earn AAdvantage® miles for travel on JetSMART. Simply provide your AAdvantage® number when you book your trip. Earn 2 miles per dollar for Travel Light fares, or 5 miles per dollar with a Pack fare.';
			break;
		case 'pt-BR':
			title = 'Acúmulo de Milhas AAdvantage®';
			content = 'Ganhe milhas AAdvantage® ao viajar com a JetSMART. Basta fornecer seu número AAdvantage® ao reservar sua viagem. Ganhe 2 milhas por dólar para tarifas Travel Light, ou 5 milhas por dólar com uma tarifa Pack.';
			break;
		}

		var tooltipHtml = `
		<div class="bundle-tooltip" id="newToolTipAmerican">
		<i class="js-new js-n-american-airlines"></i>
		<div class="bundle-tooltip-text">
		<h3>${title}</h3>
		<div>
		${content}
		</div>
		</div>
		</div>
		`;

		elements.forEach(element => {
			if (!element.nextElementSibling || element.nextElementSibling.id !== 'newToolTipAmerican') {
				element.insertAdjacentHTML('afterend', tooltipHtml);
			}
		});
	}

	addTooltipAmerican();
	window.eventBus.subscribe({
		name: "americanTooltip", callback: function (e) {
			addTooltipAmerican();
		}
	});

}, 600);