var initFooterAmerican = setInterval(function () {
	if (typeof bookingData === "undefined" || (window.location.pathname !== '/V2/Flight' && window.location.pathname !== '/V2/Baggage' && window.location.pathname !== '/Seat/Map' && window.location.pathname !== '/V2/Extras' && window.location.pathname !== '/V2/Passengers' && window.location.pathname !== '/V2/Payment')) return;
	clearInterval(initFooterAmerican);

	var culture = bookingData.Culture;

	function addFooterLinks() {
		const footerColumns = document.querySelectorAll('.col-xs-1.col-sm-1-2.col-md-1-4');
		const selectedColumn = footerColumns[0];
		var text = 'Programa AAdvantage®';
		var link = 'https://www.jetsmart.com/cl/es/minisitios/programa_aadvantage';
		switch (culture) {
			case 'en-US':
				text = 'AAdvantage® Program';
				link = 'https://www.jetsmart.com/us/en/minisitios/programa_aadvantage';
				break;
			case 'pt-BR':
				link = 'https://www.jetsmart.com/br/pt/minisitios/programa_aadvantage';
				break;
			case 'es-EC':
				link = 'https://www.jetsmart.com/ec/es/minisitios/programa_aadvantage';
				break;
			case 'es-PE':
				link = 'https://www.jetsmart.com/pe/es/minisitios/programa_aadvantage';
				break;
			case 'es-AR':
				link = 'https://www.jetsmart.com/ar/es/minisitios/programa_aadvantage';
				break;
			case 'es-CO':
				link = 'https://www.jetsmart.com/co/es/minisitios/programa_aadvantage';
				break;
			case 'es-PY':
				link = 'https://www.jetsmart.com/py/es/minisitios/programa_aadvantage';
				break;
			case 'es-UY':
				link = 'https://www.jetsmart.com/uy/es/minisitios/programa_aadvantage';
				break;
		}

		const newFooterLinks = document.createElement('ul');
		newFooterLinks.classList.add('footer-links');

		const newLinks = `
        <li class='new1'><a href="${link}"><span>${text}</span></a></li>
    `;
		if (!document.querySelector('.new1')) {
			newFooterLinks.innerHTML = newLinks;
			selectedColumn.appendChild(newFooterLinks);
		}
	}

	function addFooterLinks2() {
		const footerColumns = document.querySelectorAll('.col-xs-1.col-sm-1-2.col-md-1-4');
		const selectedColumn = footerColumns[2];
		var text = 'Política de Privacidad American Airlines';
		var link = 'https://www.aa.com/i18n/customer-service/support/privacy-policy.jsp';
		var text2 = 'Términos y Condiciones programa AAdvantage®';
		var link2 = 'https://www.aa.com/i18n/aadvantage-program/aadvantage-terms-and-conditions.jsp';
		switch (culture) {
			case 'en-US':
				text = 'American Airlines Privacy Policy';
				text2 = 'AAdvantage® Program Terms and Conditions';
				break;
			case 'pt-BR':
				text = 'Política de Privacidade da American Airlines';
				text2 = 'Termos e Condições do programa AAdvantage®';
				break;
			case 'es-PE':
				link = 'https://www.aa.com/i18n/customer-service/support/privacy-policy.jsp?locale=es_PE';
				break;
		}

		const newFooterLinks = document.createElement('ul');
		newFooterLinks.classList.add('footer-links');

		const newLinks = `
        <li class='new2'><a href="${link}"><span>${text}</span></a></li>
		<li class='new3'><a href="${link2}"><span>${text2}</span></a></li>
    `;
		if (!document.querySelector('.new2') && !document.querySelector('.new3')) {
			newFooterLinks.innerHTML = newLinks;
			selectedColumn.appendChild(newFooterLinks);
		}
	}

	function changeText() {
		const privacyPolicies = [
			{ href: "https://jetsmart.com/cl/es/tyc/politica-privacidad", text: "Política de Privacidad JetSMART Airlines" },
			{ href: "https://jetsmart.com/pe/es/tyc/politica-privacidad", text: "Política de Privacidad JetSMART Airlines" },
			{ href: "https://jetsmart.com/ar/es/tyc/politica-privacidad", text: "Política de Privacidad JetSMART Airlines" },
			{ href: "https://jetsmart.com/co/es/tyc/politica-privacidad", text: "Política de Privacidad JetSMART Airlines" },
			{ href: "https://jetsmart.com/py/es/tyc/politica-privacidad", text: "Política de Privacidad JetSMART Airlines" },
			{ href: "https://jetsmart.com/uy/es/tyc/politica-privacidad", text: "Política de Privacidad JetSMART Airlines" },
			{ href: "https://jetsmart.com/ec/es/tyc/politica-privacidad", text: "Política de Privacidad JetSMART Airlines" },
			{ href: "https://jetsmart.com/us/en/tyc/politica-privacidad", text: "JetSMART Airlines Privacy Policy" },
			{ href: "https://jetsmart.com/br/pt/tyc/politica-privacidad", text: "Política de Privacidade JetSMART Airlines" }
		];

		privacyPolicies.forEach(policy => {
			let linkElement = document.querySelector(`li a[href="${policy.href}"] span`);
			if (linkElement) {
				linkElement.textContent = policy.text;
			}
		});
	}

	addFooterLinks();
	addFooterLinks2();
	changeText();

}, 600);