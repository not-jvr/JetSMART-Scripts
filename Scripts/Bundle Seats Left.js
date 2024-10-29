var initSeatsLeft = setInterval(function(){
	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight' || typeof window.eventBus === "undefined") return;
	clearInterval(initSeatsLeft);

	var culture = bookingData.Culture;
	var min, totalPsngr;

	function addCSSText(){
		var css = `
		.bundle-availability {
			text-align: center;
			font-size: 12px;
			line-height: 1;
			margin-top: 4px;
			color: #ac272f;
			margin: 0 5px;
			white-space: normal;
			padding-top: 1px;
		}

		.bundle-footer {
			padding-bottom: 20px;
		}
	}
	`,
	head = document.head || document.getElementsByTagName('head')[0],
	style = document.createElement('style');

	head.appendChild(style);

	style.type = 'text/css';
	if (style.styleSheet){
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));	
	}
}

function getRandomIntInclusive(max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function htmlBuilder() {
	var adultCount = bookingData.PassengersAdultCount;
	var childrenCount = bookingData.PassengersChildCount;
	var infantCount = bookingData.PassengersInfantCount;

	totalPsngr = adultCount + childrenCount + infantCount;
	min = totalPsngr < 3 ? 3 : totalPsngr;

	var textContent = "";

	switch(bookingData.Culture) {
	case "pt-BR":
		textContent = 'Há <strong>'+ getRandomIntInclusive(9) +'</strong> assentos disponíveis com este Pacote!';
		break;
	case "en-US":
		textContent = 'There are <strong>'+ getRandomIntInclusive(9) +'</strong> seats available with this Pack!';
		break;
	default:
		textContent = '¡Quedan <strong>'+ getRandomIntInclusive(9) +'</strong> asientos disponibles con este Pack!';
		break;
	}

	return '<div class="bundle-availability">'+ textContent +'</div>';
}

addCSSText();

var smartFooterIda = htmlBuilder();
var smartFooterVuelta = htmlBuilder();
var fullFooterIda = htmlBuilder();
var fullFooterVuelta = htmlBuilder();

function addMsg(){

		// Pack simple IDA
	var packSimpleIda = document.querySelectorAll('[data-test-id="bundle-selector-option--j|0-c|simple"] .bundle-footer');
	for (var i = 0; i < packSimpleIda.length; i++) {
		if (!packSimpleIda[i].querySelector('.bundle-availability')) {
			packSimpleIda[i].insertAdjacentHTML('beforeend', smartFooterIda);
		}
	}

		// Pack full IDA
	var packFullIda = document.querySelectorAll('[data-test-id="bundle-selector-option--j|0-c|full"] .bundle-footer');
	for (var j = 0; j < packFullIda.length; j++) {
		if (!packFullIda[j].querySelector('.bundle-availability')) {
			packFullIda[j].insertAdjacentHTML('beforeend', fullFooterIda);
		}
	}

		// Pack simple VUELTA
	var packSimpleVuelta = document.querySelectorAll('[data-test-id="bundle-selector-option--j|1-c|simple"] .bundle-footer');
	for (var k = 0; k < packSimpleVuelta.length; k++) {
		if (!packSimpleVuelta[k].querySelector('.bundle-availability')) {
			packSimpleVuelta[k].insertAdjacentHTML('beforeend', smartFooterVuelta);
		}
	}

		// Pack full VUELTA
	var packFullVuelta = document.querySelectorAll('[data-test-id="bundle-selector-option--j|1-c|full"] .bundle-footer');
	for (var l = 0; l < packFullVuelta.length; l++) {
		if (!packFullVuelta[l].querySelector('.bundle-availability')) {
			packFullVuelta[l].insertAdjacentHTML('beforeend', fullFooterVuelta);
		}
	}
}

function clickButtons(){
	const smartFeeButtons = document.querySelectorAll('.smart-fee.nowrap.big, .discount-fee.nowrap.small, .smart-fee.nowrap.small, .discount-fee.nowrap.big');
	const buttonClickHandler = function () {
		addMsg();
	};
	smartFeeButtons.forEach(button => button.addEventListener('click', buttonClickHandler));
}

if(culture){
	addMsg();
	clickButtons();
	window.eventBus.subscribe({
		name: "seatsleft",
		callback: function (e) {
			addMsg();
			clickButtons();
		}
	});
}

}, 600);