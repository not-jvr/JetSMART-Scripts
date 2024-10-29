var initChangeModalAgenciasARPortal = setInterval(function () {
	if (typeof JetSmart === "undefined" || !JetSmart.hasOwnProperty('Cug2AppContext') || !window.location.href.includes('V2Agency')) return;
	clearInterval(initChangeModalAgenciasARPortal);

	var culture = JetSmart.Cug2AppContext.culture;
    var isCompany = JetSmart.Cug2AppContext.isCompany
    
	function addCSS() {
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
			background-color: rgba(51, 84, 109, 0.7);
			font-size: 26px;
		}

		#modalAgencias a#close-modal:hover {
			color: rgba(51, 84, 109, 0.7);
			background-color: rgba(255, 255, 255);
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
	}

	function addModal() {

		if (window.innerWidth <= 768) {
			imageUrl = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/cfe94044-cf0a-4761-a370-615374843d02/PopUp-SCC%20AR_mobile.png'
		} else {
			imageUrl = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/e6aa9ea0-72cf-4916-9daa-bb1b55f6c362/PopUp-SCC%20AR_desktop.png'
		}

		link = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/7365281d-46c8-488b-9f31-11b868acfcec/JS%20AR%20SCC%20-%20Instructivo%20-%20ESP%20-%2016%20Feb.pdf'

		var modalTemplate = `
		<div id="modalAgencias" style="display: block;">
		<div class="modal-content-new">
		<a href="${link}" target="_blank"><img src="${imageUrl}"></a>
		<a href="#" id="close-modal">x</a>
		</div>
		</div>
		`;

		var footer = document.querySelector('body');
		footer.insertAdjacentHTML('afterend', modalTemplate);

		var closeButton = document.querySelector("#close-modal");
		closeButton.addEventListener("click", function() {
			document.querySelector("#modalAgencias").style.display = "none";
		});
	}

	if (isCompany === 'False' && culture === 'es-AR'){
	    addCSS();
		addModal();
	}

}, 600);