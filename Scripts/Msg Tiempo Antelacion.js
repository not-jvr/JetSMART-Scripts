var initAddMsgTime = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/flight') return;
  clearInterval(initAddMsgTime);

  var culture = bookingData.Culture;
  var departureFlight = bookingData.AvailableOutboundJourneys[0].DepartureStationCode;
  var arrivalFlight = bookingData.AvailableOutboundJourneys[0].ArrivalStationCode;

  var domesticAirportsCL = ["SCL", "ARI", "IQQ", "CJC", "ANF", "LSC", "CCP", "ZCO", "PMC", "MHC", "BBA", "PNT", "PUQ"];
  var domesticAirportsPE = ["IQT", "TPP", "PIU", "CIX", "CJA", "TRU", "LIM", "CUZ", "AQP"];
  var domesticAirportsAR = ["BUE", "EZE", "CPC", "JUJ", "SLA", "IGR", "TUC", "PSS", "CNQ", "COR", "MDZ", "NQN", "BRC", "CRD", "FTE", "USH"];
  var domesticAirportsBR = ["RIO", "IGU", "GRU"];
  var domesticAirportsCO = ["MDE", "BOG", "CLO"];
  var domesticAirportsUR = ["MVD"];
  var domesticAirportsPY = ["ASU"];

  function isFlightDomestic() {
      var isDomestic = false;

      if (domesticAirportsCL.includes(departureFlight) && domesticAirportsCL.includes(arrivalFlight)) {
        isDomestic = true;
    } else if (domesticAirportsPE.includes(departureFlight) && domesticAirportsPE.includes(arrivalFlight)) {
        isDomestic = true;
    } else if (domesticAirportsAR.includes(departureFlight) && domesticAirportsAR.includes(arrivalFlight)) {
        isDomestic = true;
    } else if (domesticAirportsBR.includes(departureFlight) && domesticAirportsBR.includes(arrivalFlight)) {
        isDomestic = true;
    } else if (domesticAirportsCO.includes(departureFlight) && domesticAirportsCO.includes(arrivalFlight)) {
        isDomestic = true;
    } else if (domesticAirportsUR.includes(departureFlight) && domesticAirportsUR.includes(arrivalFlight)) {
        isDomestic = true;
    } else if (domesticAirportsPY.includes(departureFlight) && domesticAirportsPY.includes(arrivalFlight)) {
        isDomestic = true;
    }

    return isDomestic;
}

function addMsg() {
    if(!document.querySelector('.msg-aeropuerto')){
        var container = document.querySelector('.booking-wrapper.no-bottom-margin.ts-error-container');
        var mensaje;
  var isDomestic = isFlightDomestic(); // Obtener el valor de isDomestic

  switch (culture) {
  case 'en-US':
      mensaje = isDomestic ? '*Remember to arrive 2 hours in advance at the airport.' : '*Remember to arrive 3 hours in advance at the airport.';
      break;
  case 'pt-BR':
      mensaje = isDomestic ? '*Lembre-se de se apresentar com 2 horas de antecedência no aeroporto.' : '*Lembre-se de se apresentar com 3 horas de antecedência no aeroporto.';
      break;
  default:
      mensaje = isDomestic ? '*Recuerda que debes presentarte con 2 horas de anticipación en el aeropuerto.' : '*Recuerda que debes presentarte con 3 horas de anticipación en el aeropuerto.';
      break;
  }

  var newElement = document.createElement('div');
  newElement.id = 'msg-aeropuerto';
  newElement.innerHTML = `<span>${mensaje}</span>`;

  var css = `
  #msg-aeropuerto {
      display: flex;
      justify-content: center;
      padding: 5px;
      position: relative;
      background-color: #00abcd;
      line-height: 30px;
      color: white;
      border: 1px;
      border-radius: 5px;
      align-items: center;
      margin: 0 auto;
      width: 1005px;
      max-width: 95%;
      margin-top: 20px;
  }

  #msg-aeropuerto span {
      font-size: 16px;
  }
  `;

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  head.appendChild(style);
  style.type = 'text/css';

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}

container.parentNode.insertBefore(newElement, container.nextElementSibling);
}
}

addMsg();

}, 600);