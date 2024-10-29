var initHideTopBarUAT = setInterval(function() {
	if (!window.location.href.startsWith('https://uat.jetsmart.dev/cl/es/')) return;
	clearInterval(initHideTopBarUAT);

	function hideTopBar() {
		var allHeader = document.querySelectorAll('.dg-header-dropdown-opener');
		var portal = allHeader[0];
		var clientesBE = allHeader[1];
		var login = document.querySelector('[data-test-id="MENU_LOGIN_OPENER"]')

		if (portal) {
			portal.style.display = 'none';
		}

		if (clientesBE) {
			clientesBE.style.display = 'none';
		}

		if (login) {
			login.style.display = 'none'
		}
	}
	
	hideTopBar();

}, 600);