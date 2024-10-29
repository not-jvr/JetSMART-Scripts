var intMoverBanners1 = setInterval(function(){
	if(typeof bookingData === "undefined") return;
	clearInterval(intMoverBanners1);
	if(document.querySelector("body > app > div:nth-child(2) > div > div > ac-itinerary-page > ac-itinerary-page-banners > div.i2-itinerary-section.i2-cabin-bags") && document.querySelector("body > app > div:nth-child(2) > div > div > ac-itinerary-page > ac-itinerary-page-banners > div.i2-itinerary-section.i2-checked-bags") && document.querySelector("body > app > div:nth-child(2) > div > div > ac-itinerary-page > ac-itinerary-page-banners > div.i2-itinerary-section.i2-seats")){
		var banner1 =  document.querySelector("body > app > div:nth-child(2) > div > div > ac-itinerary-page > ac-itinerary-page-banners > div.i2-itinerary-section.i2-cabin-bags")
		var banner2 = document.querySelector("body > app > div:nth-child(2) > div > div > ac-itinerary-page > ac-itinerary-page-banners > div.i2-itinerary-section.i2-checked-bags")
		var banner3 = document.querySelector("body > app > div:nth-child(2) > div > div > ac-itinerary-page > ac-itinerary-page-banners > div.i2-itinerary-section.i2-seats")
		var targetElement = document.querySelector("body > app > div:nth-child(2) > div > div > ac-itinerary-page > ac-itinerary-page-banners > div.i2-itinerary-section.i2-cabin-bags")
		targetElement.parentNode.insertBefore(banner2, targetElement)
		targetElement.parentNode.insertBefore(banner3, targetElement)
	}
}, 200);