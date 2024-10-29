var initMsjeInfo = setInterval(function () {
	if(typeof bookingData === "undefined" || window.location.pathname !== '/V2/Passengers') return;
	clearInterval(initMsjeInfo);

	var culture = bookingData.Culture;
	var subtitle = document.querySelector('.subtitle');

	switch (culture) {
	case "pt-BR":
		subtitle.innerHTML += "<br>Seu contato e suas informações pessoais para seu vôo serão solicitadas após a compra.";
		break;
	case "en-US":
		subtitle.innerHTML += "<br>Your contact and personal information for your flight will be requested after the purchase.";
		break;
	default:
		subtitle.innerHTML += "<br>Tus datos de contacto e información necesaria para volar será solicitada posterior a tu compra.";
		break;
	}
}, 600);