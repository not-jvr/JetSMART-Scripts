var initHideTransport = setInterval(function() {
  if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Itinerary') return;
  clearInterval(initHideTransport);

  function hideAllTransport(){
    var tituloTransporte = document.querySelector('.i2-book-hotel-section');
    if(tituloTransporte){
      tituloTransporte.style.display = 'none';
    }

    var widget = document.querySelector('.i2-itinerary-section.i2-third-party');
    if(widget){
      widget.style.display = 'none';
    }
  }
  
  hideAllTransport();

}, 600);