var intMoverBannerYBE = setInterval(function(){
    if(typeof bookingData === "undefined") return;
    clearInterval(intMoverBannerYBE);
    var culture = bookingData.Culture;
    if(culture == 'es-CL' && document.querySelector("body > app > div:nth-child(2) > div > div > ac-itinerary-page > ac-itinerary-page-banners > div.i2-itinerary-section.i2-bancoestado")){
        var banner = document.querySelector("body > app > div:nth-child(2) > div > div > ac-itinerary-page > ac-itinerary-page-banners > div.i2-itinerary-section.i2-bancoestado")
        var targetElement = document.querySelector("body > app > div:nth-child(2) > div > div > ac-itinerary-page > div.i2-book-hotel-section");
        targetElement.parentNode.insertBefore(banner, targetElement)
    }
}, 200);