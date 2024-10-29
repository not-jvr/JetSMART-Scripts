var initChangeModalAgencias = setInterval(function () {
	if (!window.location.pathname.includes('/centro-ayuda-agencias')) return;
	clearInterval(initChangeModalAgencias);

	var css = `
	#modalAgencias {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1000005;
		display: none;
	}

	#modalAgencias img {
		display: block;
		width: 100%;
		border-radius: 10px;
	}

	.modal-content-new {
		position: relative;
		transform: translate(-50%, -50%);
		left: 50%;
		right: 50%;
		top: 50%;
		width: 450px;
		height: 380px;
		z-index: 1000006;
	}

	#modalAgencias a#close-modal {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
		border-radius: 9999px;
		cursor: pointer;
		font-weight: 600;
		--text-opacity: 1;
		color: #fff;
		color: rgba(255, 255, 255, var(--text-opacity));
		z-index: 1;
		width: 32px;
		height: 32px;
		right: 12px;
		top: 12px;
		padding-bottom: 2px;
		padding-left: 1px;
		background-color: rgba(51,84,109,0.7);
		font-size: 26px;
	}

	#modalAgencias a#close-modal:hover {
		color: rgba(51,84,109,0.7);
		background-color: rgba(255, 255, 255);
	}

	.modal-content-new .btn-section {
		position: absolute;
		left: 50%;
		bottom: 20px;
		transform: translateX(-50%);
		text-align: center;
	}

	@media (max-width: 768px) {

		.modal-content-new {
			width: 220px;
			height: 330px;
		}
	}

	`;

	var style = document.createElement('style');
	style.appendChild(document.createTextNode(css));
	document.head.appendChild(style);

	var culture;
	culture = 'es-CL';

	if(window.location.pathname.startsWith('/us/en/minisitios/centro-ayuda-agencias')){
		culture = 'en-US'
	}
	if(window.location.pathname.startsWith('/br/pt/minisitios/centro-ayuda-agencias')){
		culture = 'pt-BR'
	}


	switch (culture) {
	case 'en-US':
		if (window.innerWidth <= 768) {
			imageUrl = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/bce1163b-8be0-4b72-bad0-16989b3007a0/scc-portal-agencia-mobile.png' 
		}else{imageUrl = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/57018d16-c361-4123-9e51-e6b3a70147cd/scc-portal-agencia-desktop.png'}
		link = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/c6021c1e-d8c9-4e94-9311-bac59c6d4e02/instructivo_agencias%20final_compressed.pdf'
		botonmsg = 'Click here'
		break;
	case 'pt-BR':
		if (window.innerWidth <= 768) {
			imageUrl = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/2d9d86ab-63db-4cb1-b42a-ca73360a9b6a/scc-portal-agencia-mobile_PT.png' 
		}else{imageUrl = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/150ecf46-7580-4b11-9a4b-309453c73a5e/scc-portal-agencia-desktop_PT.png'}
		link = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/1bdf725b-d81b-4841-a400-80ef52afad57/PDF%20Instructivo%20PR_compressed%20%281%29.pdf'
		botonmsg = 'Clique aqui'
		break;
	default:
		if (window.innerWidth <= 768) {
			imageUrl = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/bce1163b-8be0-4b72-bad0-16989b3007a0/scc-portal-agencia-mobile.png' 
		}else{imageUrl = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/57018d16-c361-4123-9e51-e6b3a70147cd/scc-portal-agencia-desktop.png'}
		link = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/c6021c1e-d8c9-4e94-9311-bac59c6d4e02/instructivo_agencias%20final_compressed.pdf'
		botonmsg = 'Click aquí'
		break;
	}

	var modalTemplate = `
	<div id="modalAgencias" style="display: none;">
	<div class="modal-content-new">
	<img src="${imageUrl}">
	<a href="#" id="close-modal">x</a>
	<a href="${link}" class="btn-section">${botonmsg}</a>
	</div>
	</div>
	`;

	var footer = document.querySelector('body');
	footer.insertAdjacentHTML('afterend', modalTemplate);

	var closeButton = document.getElementById("close-modal");
	closeButton.addEventListener("click", function() {
		document.getElementById("modalAgencias").style.display = "none";
	});
	if(culture !== 'en-US'){
		document.getElementById("modalAgencias").style.display = "block";
	}
	
}, 400);
