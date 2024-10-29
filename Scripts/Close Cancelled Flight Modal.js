var initCloseCancelledModal = setInterval(function () {
  if (!document.querySelector("ac-cancelled-flights-modal") || window.location.pathname !== '/V2/Itinerary') return;
  clearInterval(initCloseCancelledModal);
  var esFechaVueloAfectado = function (x) {
    return (x >= "2023-05-09 00:00:00");
  };
  var fechaVueloIda = esFechaVueloAfectado(bookingData.OutboundJourney.DepartureDate);
  try {
    var fechaVueloVuelta = esFechaVueloAfectado(bookingData.ReturnJourney.DepartureDate);
    if(fechaVueloIda || fechaVueloVuelta){
     if(document.querySelector("ac-cancelled-flights-modal")){
      var modalCancelled = document.querySelector("ac-cancelled-flights-modal")
      modalCancelled.style.display = 'none'
    }

  }

} catch (error) {
  console.log(error)
  if(fechaVueloIda){
    if(document.querySelector("ac-cancelled-flights-modal")){
      var modalCancelled = document.querySelector("ac-cancelled-flights-modal")
      modalCancelled.style.display = 'none'
    }
  }
}
}, 400);