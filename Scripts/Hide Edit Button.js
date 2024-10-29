var initHideEditButton = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
  clearInterval(initHideEditButton);

  var rutaGIG = ["GIG"];
  var esGIG = false;

  function esRio(){
    for (let journey of bookingData.AvailableOutboundJourneys) {
      if (rutaGIG.includes(journey.DepartureStationCode) || rutaGIG.includes(journey.ArrivalStationCode)) {
        esGIG = true;
        break;
      }
    }

    if (!esGIG) {
      for (let journey of bookingData.AvailableReturnJourneys) {
        if (rutaGIG.includes(journey.DepartureStationCode) || rutaGIG.includes(journey.ArrivalStationCode)) {
          esGIG = true;
          break;
        }
      }
    }
  }
  
  function hideButton(){
    if(esGIG && document.querySelector('.flight-edit')){
      document.querySelector('.flight-edit').style.display = 'none'
    }
  }

  function allFunction(){
    esRio();
    hideButton();
  }

  allFunction();

}, 600);