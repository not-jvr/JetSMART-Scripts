var initPasilloVentana = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname !== '/Seat/Map') return;
  clearInterval(initPasilloVentana);
  var culture = bookingData.Culture;

  function getSeatPosition(seatLetter) {
    const seatLetterArr = ['A', 'B', 'C', 'D', 'E', 'F'];
    const seatPosition = seatLetterArr.indexOf(seatLetter);
    let position = '';
    switch (culture) {
    case 'pt-BR':
      switch (seatPosition) {
      case 0:
      case 5:
        position = ' - Janela';
        break;
      case 2:
      case 3:
        position = ' - Corredor';
        break;
      }
      break;
    case 'en-US':
      switch (seatPosition) {
      case 0:
      case 5:
        position = ' - Window';
        break;
      case 2:
      case 3:
        position = ' - Aisle';
        break;
      }
      break;
    default:
      switch (seatPosition) {
      case 0:
      case 5:
        position = ' - Ventana';
        break;
      case 2:
      case 3:
        position = ' - Pasillo';
        break;
      }
      break;
    }
    return position;
  }

  function addSeatTooltips() {
    const seatDivs = document.querySelectorAll('.cf-seat');
    seatDivs.forEach((seatDiv) => {
      const seatDesignator = seatDiv.getAttribute('data-test-designator');
      if (seatDesignator) {
        const seatLetter = seatDesignator.match(/\D/g).join('');

        const seatPosition = getSeatPosition(seatLetter);

        const tooltipSpan = seatDiv.querySelector('.seat-tooltip');

        if (tooltipSpan && seatPosition) {
          const existingSeatPosition = tooltipSpan.querySelector('#seat-position');

          if (!existingSeatPosition) {
            const seatPositionSpan = document.createElement('span');
            seatPositionSpan.id = 'seat-position';
            seatPositionSpan.textContent = seatPosition;

            const firstSpan = tooltipSpan.querySelector('span');

            tooltipSpan.insertBefore(seatPositionSpan, firstSpan);
          }
        }
      }
    });
  }

  function clickSeatMap(){
    var innerDeepBox = document.querySelector('ac-seatmap');
    if (innerDeepBox) {
      innerDeepBox.addEventListener('click', function () {
        addSeatTooltips();
      });
    }
  }

  function clickButtonContinue(){
    var seatmapButton = document.querySelector('[data-test-id="seatmap-continue-button"]');
    if (seatmapButton) {
      seatmapButton.addEventListener('click', function () {
        addSeatTooltips();
      });
    }
  }

  function clickSeats(){
    var seats = document.querySelectorAll('.cf-seat');
    seats.forEach(function(seat) {
      seat.addEventListener('click', function() {
        addSeatTooltips();
      });
    });
  }

  function allClicks(){
    clickSeatMap();
    clickButtonContinue();
    clickSeats();
  }

  if(culture){
    addSeatTooltips();
    window.eventBus.subscribe({
      name: "moverBotonNoQuieroElegirAsientos", 
      callback: function (e) {
        allClicks();
      }
    });
  }

}, 500);