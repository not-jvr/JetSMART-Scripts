var intHideBanner = setInterval(function(){
    if(typeof bookingData === "undefined" || !document.querySelector("body > app > div:nth-child(2) > div > div > ac-itinerary-page > ac-itinerary-page-banners > div.i2-itinerary-section.i2-optionals-banner"))  return;
    clearInterval(intHideBanner);
    if(document.querySelector("body > app > div:nth-child(2) > div > div > ac-itinerary-page > ac-itinerary-page-banners > div.i2-itinerary-section.i2-optionals-banner")){
        document.querySelector("body > app > div:nth-child(2) > div > div > ac-itinerary-page > ac-itinerary-page-banners > div.i2-itinerary-section.i2-optionals-banner").style.display = 'none'
    }
}, 200);