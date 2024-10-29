var initMailAgencias = setInterval(function () {
	if (!document.getElementById('box-1-agency')) return;
	clearInterval(initMailAgencias);
	const section = document.getElementById('box-1-agency');

	const links = section.getElementsByTagName('a');

	for (let i = 0; i < links.length; i++) {
		const link = links[i];
		const currentEmailAddress = link.getAttribute('data-email-address');
		if (currentEmailAddress === 'soporte.empresas@jetsmart.com') {

			link.setAttribute('data-email-address', 'soporte.agencias@jetsmart.com');

			link.href = 'mailto:soporte.agencias@jetsmart.com';

			link.textContent = 'soporte.agencias@jetsmart.com';
		}
	}
}, 800);