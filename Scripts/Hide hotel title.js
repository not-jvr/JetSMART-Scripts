var initHideHotel = setInterval(function () {
	if(typeof bookingData === "undefined") return;
	clearInterval(initHideHotel);
	const cuerpoWidget = document.querySelector('.i2-itinerary-section.i2-third-party #Widget');

	if (!cuerpoWidget.hasChildNodes()) {
		if(document.querySelector('.i2-book-hotel-section')){
			document.querySelector('.i2-book-hotel-section').style.display = 'none'	
		}
	}
}, 200);