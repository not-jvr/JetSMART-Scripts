var initFopButtonsPayment = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Payment') return;
	clearInterval(initFopButtonsPayment);

	var bancoEstado = JetSmart.AppContext.bancoEstadoCategory;

	function addCSS() {
		var css = `
		#mainContentPayment .inner-deep-box .giftcard-wrapper{
			border: 2px solid #ccc;
			border-radius: 15px;
			display: flex;
			flex-direction: column;
			margin-left: -1rem;
		}
		.inner-deep-box .giftcard-wrapper #giftcardOpener{
			width: 100%;
		}
		.form-giftcard-payment{
			display: block !important;
		}
		.pruebita-class{
			display: none;
		}
		ac-voucher{
			position: absolute;
		}
		#mainContentPayment .tabs nav ul li{
			width: 49%;
			border: 2px solid #ccc;
			margin-left: 0;
			background: #fff;
			border-radius: 15px;
			margin-bottom: 15px;
		}
		#mainContentPayment .tabs [id^=payment_tab_]:checked+li label img{
			border:0;
		}
			/*#mainContentPayment .tabs nav ul li label:hover{
		border:3px solid #163A70;
		border-radius: 5px;
			}*/
		#mainContentPayment .tabs nav ul li:hover ,#mainContentPayment .tabs [id^=payment_tab_]:checked+li{
			border: 2px solid #163a70;
		}
		#mainContentPayment .tabs nav ul li label{
			display: flex;
			padding: 0 10px;
			flex-direction: row-reverse;
			justify-content: space-between;
			align-items: center;
		}
		.payment-card-img {
			border: 0;
			height: 75px;
		}
		.payment-method-warning, .webpay-warning{
			margin-top: 20px;
		}
		#mainContentPayment .tabs nav ul li label span{
			margin-left: 15px;
			font-weight: 400;
			font-size: 17px;
			width: auto;
			max-width: 100%;
			text-align: left;
		}
		#payment_form_VO > div{
			background: transparent;
		}
		@media (max-width: 47.9375rem){
			#mainContentPayment .payment-card-img{
				width:auto;
			}
			#mainContentPayment .tabs nav ul li{
				width: 100%;
			}
			#payment_form_VO header > span{
				font-size: 30px !important;
				margin-left: -6px;
			}
			#payment_form_VO > div{
				margin-left: 1rem;
				width: 100%;
				padding: 0 !important;
			}
			.form-giftcard-payment header .title{
				margin-left: 6px;
			}
			.form-giftcard-payment .gift-card-logo img{
				width: 78px;
			}
			.form-giftcard-payment .giftcard-wrapper .open-icon i{
				font-size: 20px !important;
			}
			#mainContentPayment .payment-card-img{
				height: 63px;
				padding: 8px 0;
			}
		}

		@media screen and (min-width: 768px) and (max-width: 945px) {
			.payment-method-warning {
				display: none !important;
			}
		}
		`,
		head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');
		head.appendChild(style);
		style.type = 'text/css';
		if (style.styleSheet){
		  // This is required for IE8 and below.
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));	
		}
	}

	function moveGC() {
		var paymentElement = document.querySelector('#payment_');
		var tabsErrorElement = document.querySelector('.tabs.ts-error-parent ul');

		if (paymentElement && tabsErrorElement) {
			tabsErrorElement.parentNode.insertBefore(paymentElement, tabsErrorElement.nextSibling);
		} else {
			console.error('Uno o ambos elementos no fueron encontrados en el DOM.');
		}
	}

	if (bancoEstado === '0') {
		moveGC();
		addCSS();
	}
	

}, 600);