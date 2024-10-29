var initBolsoDeMano = setInterval(function () {
	if (typeof bookingData === "undefined" || typeof window.eventBus === "undefined") return;
	clearInterval(initBolsoDeMano);

	var culture = bookingData.Culture;
	if (culture) {
		window.eventBus.subscribe({
			name: "SidebarReloaded", callback: function (e) {
				document.querySelectorAll('div.ssr-line-name').forEach(function (element) {
					if (element.textContent.trim() === 'Bolso de mano') {
						element.textContent = '(1) Bolso de mano';
					}
					if (element.textContent.trim() === 'Bolsa de mão') {
						element.textContent = '(1) Bolsa de mão';
					}
					if (element.textContent.trim() === 'Handbag') {
						element.textContent = '(1) Handbag';
					}	
				});
			}
		});
	}
}, 200);