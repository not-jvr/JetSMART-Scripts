var initHideBannerButton = setInterval(function () {
	if (window.location.pathname.toLowerCase() !== '/v2/login') return;
	clearInterval(initHideBannerButton);

	function hideButton() {
		var buttonBanner = document.querySelector('.cug2b-login-banner.hidden-sm-down .rounded-primary-btn');
		if (buttonBanner) {
			buttonBanner.style.display = 'none';
		}
	}

	function hideButtonMobile() {
		var elementos = document.querySelectorAll(".rounded-primary-btn");

		elementos.forEach(function(elemento) {
			if (elemento.textContent.trim() === "Ver beneficios" || elemento.textContent.trim() === 'Ver benefícios') {
				elemento.style.display = 'none';
			}
		});
	}

	hideButton();
	hideButtonMobile();
}, 600);