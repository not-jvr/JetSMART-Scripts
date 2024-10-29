var initChanges_buttonChangeBagV2 = setInterval(function(){
	if(typeof bookingData === "undefined" || window.location.pathname !== '/V2/Baggage') return;
	clearInterval(initChanges_buttonChangeBagV2);

	var culture = bookingData.Culture;

	function addCSS() {
		var css = `
		.newButtonEdit {
			border: 1px solid #1c355e;
			padding: 6px 95px 6px 60px;
			border-radius: 10px;
			color: #1c355e;
			background: url(https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/478a9d7c-1135-4605-b8d1-bdb512dbedcb/pencil.png);
			background-repeat: no-repeat;
			background-size: 18px 18px;
			background-position: 77% 51%;
			background-color: #fff;
			font-size: 17px !important;
			font-family: Lato, sans-serif;
			font-weight: 900;
			letter-spacing: normal;
			cursor: pointer;
			max-width: 80%;
		}

		.newButtonEdit:hover {
			background-color: #b2292e !important;
			color: #fff;
			border: 1px solid #b2292e;
			text-decoration: underline;
			background: url(https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/d8a6fed6-2ac5-44a0-b99a-a2d198cabd02/pencil%20%281%29.png);
			background-repeat: no-repeat;
			background-size: 18px 18px;
			background-position: 77% 51%;
		}

		.icon-boligrafo{
			width: 17px;
			position: relative;
			top: 0.1rem;
			left: 0.5rem;
		}

		ac-per-booking-mobile > .b2m-view > button{
			border: 1px solid #1c355e;
			padding: 3px 40px 3px 40px;
			border-radius: 10px;
			color: #1c355e;
			background: url(https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/478a9d7c-1135-4605-b8d1-bdb512dbedcb/pencil.png);
			background-repeat: no-repeat;
			background-size: 14px 14px;
			background-position: 81% 51%;
			background-color: #fff;
			font-size: 15px !important;
			max-width: 168px;
		}
		ac-per-booking-mobile > .b2m-view > button:hover{
			background-color: #b2292e !important;
			color: #fff;
			border: 1px solid #b2292e;
			background: url(https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/d8a6fed6-2ac5-44a0-b99a-a2d198cabd02/pencil%20%281%29.png);
			background-repeat: no-repeat;
			background-size: 14px 14px;
			background-position: 81% 51%;
			padding: 3px 40px 3px 40px;
			font-size: 15px !important;
		}

		ac-per-booking-view-switch .b2-openable > div > button:after, ac-per-booking-mobile > .b2m-view > button:after{
			display: none;
		}

	}
	`,
	head = document.head || document.getElementsByTagName('head')[0],
	style = document.createElement('style');

	head.appendChild(style);

	style.type = 'text/css';
	if (style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}
}

function addButtonEditDesktop(selector, type) {
	var targetElement = document.querySelector(selector);

	if (targetElement) {
		targetElement.style.display = 'none';

		var text = 'Editar';

		switch (culture) {
		case 'en-US':
			text = 'Edit';
			break;
		}

		var htmlToInsert = '<div class="newButtonEdit" id="newButtonEdit_' + type + '">' + text + '</div>';

		targetElement.insertAdjacentHTML('afterend', htmlToInsert);

		var newButtonEdit = document.querySelector('#newButtonEdit_' + type);
		newButtonEdit.addEventListener('click', function() {
			var targetToClick = document.querySelector(selector);
			if (targetToClick) {
				targetToClick.click();
			}
		});
	}
}


///MOBILE///

function changeTextMobile() {
	var text = 'Editar';

	switch (culture) {
	case 'en-US':
		text = 'Edit';
		break;
	}
	var textEditBag = document.querySelectorAll("ac-per-booking-view-switch .b2-openable > div > button, ac-per-booking-mobile > .b2m-view > button").forEach(function (e) {
		e.innerHTML = text;
	});
}

function click1() {
	setTimeout(function() {
		var miElemento = document.querySelector('[data-test-id="baggage-open-per-journey-per-pax-view-button--c|CabinBaggage-m|1"]');

		if (miElemento) {
			miElemento.addEventListener('click', function() {
				console.log("Hola1");
				changeTextMobile();
				click2();
			});
		}
	}, 500);
}

function click2() {
	setTimeout(function() {
		var miElemento = document.querySelector('[data-test-id="baggage-close-per-journey-per-pax-view-button--c|CabinBaggage-m|1"]');

		if (miElemento) {
			miElemento.addEventListener('click', function() {
				console.log("Hola2");
				changeTextMobile();
				click1();
			});
		}
	}, 500);
}

function click3() {
	setTimeout(function() {
		var miElemento = document.querySelector('[data-test-id="baggage-open-per-journey-per-pax-view-button--c|CheckedBaggage-m|1"]');

		if (miElemento) {
			miElemento.addEventListener('click', function() {
				console.log("Hola3");
				changeTextMobile();
				click4();
			});
		}
	}, 500);
}

function click4() {
	setTimeout(function() {
		var miElemento = document.querySelector('[data-test-id="baggage-close-per-journey-per-pax-view-button--c|CheckedBaggage-m|1"]');

		if (miElemento) {
			miElemento.addEventListener('click', function() {
				console.log("Hola4");
				changeTextMobile();
				click3();
			});
		}
	}, 500);
}

function isRT() {
	var OW = bookingData.Roundtrip;
	if (OW === true) {
		return true;
	} else {
		return false;
	}
}

if (isRT()) {
	addCSS();
	changeTextMobile();
	click1();
	click3();
	addButtonEditDesktop('[data-test-id="baggage-open-per-journey-per-pax-view-button--c|CabinBaggage"]', 'cabin');
	addButtonEditDesktop('[data-test-id="baggage-open-per-journey-per-pax-view-button--c|CheckedBaggage"]', 'checked');
}

}, 600);