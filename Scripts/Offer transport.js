var initOfferTransport = setInterval(function () {
  if(typeof bookingData === "undefined") return;
  clearInterval(initOfferTransport);
  const cuerpoWidget = document.querySelector('.i2-itinerary-section.i2-third-party #Widget');
  var resultados = [];

  function obtenerHoraYMinutos(fechas) {
    // Verificar que el arreglo de fechas no esté vacío
    if (fechas.length === 0) {
      return [];
    }
    const resultados = [];

    // Recorrer las fechas y agregar objetos con las horas y minutos al arreglo
    for (var i = 0; i < fechas.length; i++) {
      var fecha = new Date(fechas[i]);
      var hora = fecha.getHours();
      var minutos = fecha.getMinutes();
      resultados.push({ hora: hora, minutos: minutos, fecha: fecha });
    }
    return resultados;
  }

  if (cuerpoWidget.hasChildNodes()) {
    if(bookingData.OutboundJourney != null){
      var OutArrivalDate = bookingData.OutboundJourney.ArrivalDate
      var OutDepartureDate = bookingData.OutboundJourney.DepartureDate
      resultados = obtenerHoraYMinutos([OutArrivalDate, OutDepartureDate]);
      for (var i = 0; i < resultados.length; i++) {
        var hora = resultados[i].hora;
        var minutos = resultados[i].minutos;
        var fecha = resultados[i].fecha;
        var fechaActual = new Date();
        var diferenciaEnDias = Math.floor((fecha.getTime() - fechaActual.getTime()) / 86400000);
        if (diferenciaEnDias <= 3 && (hora >= 22 || hora <= 6) && minutos <= 59) {
          var transportTitulo = document.querySelector('.i2-book-hotel-section');
          var sectionTransport = document.querySelector('.i2-itinerary-section.i2-third-party');
          var itineraryBanners = document.querySelector('ac-itinerary-page-banners');
          itineraryBanners.insertBefore(sectionTransport, itineraryBanners.firstChild);
          itineraryBanners.insertBefore(transportTitulo, itineraryBanners.firstChild);
          break; // Si encontramos un resultado dentro del rango, podemos salir del ciclo
        }
      }
    }
    if(bookingData.ReturnJourney != null){
      var ReturnArrivalDate = bookingData.ReturnJourney.ArrivalDate
      var ReturnDepartureDate = bookingData.ReturnJourney.DepartureDate
      resultados = obtenerHoraYMinutos([ReturnArrivalDate, ReturnDepartureDate]);
      for (var i = 0; i < resultados.length; i++) {
        var hora = resultados[i].hora;
        var minutos = resultados[i].minutos;
        var fecha = resultados[i].fecha;
        var fechaActual = new Date();
        var diferenciaEnDias = Math.floor((fecha.getTime() - fechaActual.getTime()) / 86400000);
        if (diferenciaEnDias <= 3 && (hora >= 22 || hora <= 6) && minutos <= 59) {
          var transportTitulo = document.querySelector('.i2-book-hotel-section');
          var sectionTransport = document.querySelector('.i2-itinerary-section.i2-third-party');
          var itineraryBanners = document.querySelector('ac-itinerary-page-banners');
          break; // Si encontramos un resultado dentro del rango, podemos salir del ciclo
        }
      }
    }
  }
}, 200);