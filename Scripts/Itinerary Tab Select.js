var initItinerarySelect = setInterval(function(){
    if(typeof bookingData === "undefined" || !document.querySelector('ul.tab-navigation') || window.location.pathname !== '/V2/Itinerary') return;
    clearInterval(initItinerarySelect);
    // Obtener la URL actual
    var currentUrl = window.location.href;

if (currentUrl.indexOf('itin=true') !== -1) {
        document.querySelector('body > app > div > div > div > ac-itinerary-page > ac-itinerary-page-tabs > div > dc-tabs > ul > li:nth-child(1)').click();
}
if (currentUrl.indexOf('resv=true') !== -1) {
        document.querySelector('body > app > div > div > div > ac-itinerary-page > ac-itinerary-page-tabs > div > dc-tabs > ul > li:nth-child(2)').click();
}
if (currentUrl.indexOf('trns=true') !== -1) {
        document.querySelector('body > app > div > div > div > ac-itinerary-page > ac-itinerary-page-tabs > div > dc-tabs > ul > li:nth-child(3)').click();
}
if (currentUrl.indexOf('modi=true') !== -1) {
        document.querySelector('body > app > div > div > div > ac-itinerary-page > ac-itinerary-page-tabs > div > dc-tabs > ul > li:nth-child(4)').click();
}
if (currentUrl.indexOf('pass=true') !== -1) {
        document.querySelector('body > app > div > div > div > ac-itinerary-page > ac-itinerary-page-tabs > div > dc-tabs > ul > li:nth-child(5)').click();
}
}, 500);