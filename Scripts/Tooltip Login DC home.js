var initMSGDC = setInterval(function() {
	if (!window.location.href.startsWith('https://jetsmart.com/cl/es/')) return;
	clearInterval(initMSGDC);

	function isLogin() {
		var userType = document.querySelector('.user-data');
		if (userType !== null) {
			return true;
		} else {
			return false;
		}
	}

	function isHome() {
		var searchBox = document.querySelector('[data-test-id="SEARCHBOX_CONTAINER"]');
		if (searchBox) {
			return true;
		} else {
			return false;
		}
	}

	function isDesktop() {
		if (window.innerWidth >= 768) {
			return true;
		} else {
			return false;
		}
	}

	function addCSS() {
		var css = `
		.message-capsuleDC {
			position: absolute;
			top: 65px;
			right: 380px;
			background-color: #fff;
			border: 1px solid #204071;
			border-radius: 1rem;
			padding: 20px;
			z-index: 9999999;
			max-width: 400px;
		}

		.message-capsuleDC::before {
			content: "";
			position: absolute;
			top: -10px;
			left: 50%;
			transform: translateX(-50%);
			width: 0;
			height: 0;
			border-left: 10px solid transparent;
			border-right: 10px solid transparent;
			border-bottom: 10px solid #204071;
		}

		.message-capsuleDC h2 {
			font-size: 18px;
			margin-bottom: 10px;
			color: #204071;
			text-align: center;
		}

		.message-capsuleDC ul {
			margin-bottom: 10px;
			color: #204071;
		}

		.message-capsuleDC li {
			padding-bottom: 8px;
			display: flex;
			align-items: flex-start;
		}

		.action-buttons {
			display: flex;
			justify-content: space-between;
		}

		.action-buttons #create-accountDC {
			display: flex;
			justify-content: center;
			cursor: pointer;
			--bg-opacity: 1;
			background-color: rgba(255, 255, 255, var(--text-opacity));
			--text-opacity: 1;
			color: #ff9100;
			position: relative;
			border-radius: 9999px;
			letter-spacing: 0;
			text-transform: none;
			font-weight: 700;
			-moz-appearance: none;
			appearance: none;
			border-style: solid;
			border-width: 2px;
			--border-opacity: 1;
			border-color: #ff9100;
			line-height: 1;
			font-family: Lato, sans-serif;
			white-space: normal;
			text-align: center;
			font-size: 16px;
			max-width: 150px;
			padding: 10px 15px;
		}

		.action-buttons #create-accountDC:hover {
			background-color: #ff9100;
			color: rgba(255, 255, 255, var(--text-opacity));
		}

		.action-buttons #login-accountDC {
			display: flex;
			justify-content: center;
			cursor: pointer;
			--bg-opacity: 1;
			background-color: #ff9100;
			--text-opacity: 1;
			color: rgba(255, 255, 255, var(--text-opacity));
			position: relative;
			border-radius: 9999px;
			letter-spacing: 0;
			text-transform: none;
			font-weight: 700;
			-moz-appearance: none;
			appearance: none;
			border-style: solid;
			border-width: 2px;
			--border-opacity: 1;
			border-color: #ff9100;
			line-height: 1;
			font-family: Lato, sans-serif;
			white-space: normal;
			text-align: center;
			font-size: 16px;
			max-width: 150px;
			padding: 10px 15px;
		}

		.action-buttons #login-accountDC:hover {
			background-color: rgba(255, 255, 255, var(--text-opacity));
			color: #ff9100
		}

		.message-capsuleDC .close-button-capsuleDC {
			position: absolute;
			top: 5px;
			right: 10px;
			cursor: pointer;
			font-size: 16px;
			color: #204071;
		}

		.center-image {
			text-align: center;
			margin-bottom: 10px;
		}

		.message-capsuleDC .center-image img {
			max-width: 60%;
			height: auto;
		}

		.message-capsuleDC .tick-icon {
			max-width: 5%;
			margin-top: 5px;
			margin-right: 5px;
		}

		@media screen and (min-width: 1024px) and (max-width: 1199px) {
			.message-capsuleDC {
				top: 75px;
				right: 190px;
			}
		}

		@media screen and (min-width: 1200px) and (max-width: 1300px) {
			.message-capsuleDC {
				right: 325px;
			}
		}

		@media screen and (min-width: 1700px) and (max-width: 1920px) {
			.message-capsuleDC {
				right: 550px;
			}
		}

		@media screen and (max-width: 1023px) {
			.message-capsuleDC {
				display: none;
			}
		}
		`;

		var head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');

		head.appendChild(style);

		style.type = 'text/css';
		if (style.styleSheet){
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
	}

	function hideCustomMessage() {
		var messageCapsule = document.querySelector(".message-capsuleDC");
		if (messageCapsule) {
			messageCapsule.style.display = "none";
		}
	}

	function showCustomMessage() {
		if (!document.querySelector('.message-capsuleDC')) {
			var msgTemplate = `
			<div class="message-capsuleDC">
			<div class="close-button-capsuleDC">X</div>
			<h2>REGÍSTRATE Y OBTÉN BENEFICIOS</h2>
			<div class="center-image">
			<img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/e28f2ce2-b19e-41b8-9346-84d8f9ff3ecb/JS%20-%20DC%20logo.png" alt="Beneficios">
			</div>
			<ul>
			<li><img class="tick-icon" src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/08e9a016-1a49-4034-8755-b48aa5bfd019/garrapata.png"> Aprovecha nuestro 50% de descuento en nuestras membresías.</li>
			<li><img class="tick-icon" src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/08e9a016-1a49-4034-8755-b48aa5bfd019/garrapata.png"> Podrás obtener descuentos en tu tarifa base por tramo.</li>
			<li><img class="tick-icon" src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/08e9a016-1a49-4034-8755-b48aa5bfd019/garrapata.png"> Obtén descuentos en maletas al ser miembro del club.</li>
			</ul>
			<div class="action-buttons">
			<div class="buttonCapsule" id="create-accountDC">Crear cuenta</div>
			<div class="buttonCapsule" id="login-accountDC">Iniciar sesión</div>
			</div>
			</div>
			`;

			var body = document.body,
			container = document.createElement('div');

			container.innerHTML = msgTemplate;
			body.appendChild(container);

			document.querySelector("#create-accountDC").addEventListener("click", function() {
				window.location.href = "https://jetsmart.com/cl/es/club_de_descuentos";
			});

			document.querySelector("#login-accountDC").addEventListener("click", function() {
				window.location.href = "https://booking.jetsmart.com/V2/Login?culture=es-cl&url=https://jetsmart.com/cl/es/club_de_descuentos/";
			});

			document.querySelector(".close-button-capsuleDC").addEventListener("click", function() {
				hideCustomMessage();
			});

			window.addEventListener("scroll", function () {
				hideCustomMessage();
			});
		}
	}

	var modal = document.querySelector("#modalReg");

	if (!isLogin() && isHome() && isDesktop() && modal.ariaHidden == 'false') {
		addCSS();
		showCustomMessage();
	}

}, 600);