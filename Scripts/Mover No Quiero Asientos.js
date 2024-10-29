var initMoveNQEA = setInterval(function() {
  if (typeof bookingData === "undefined" || window.location.pathname !== '/Seat/Map') return;
  clearInterval(initMoveNQEA);

  var culture = bookingData.Culture;

  function moveNQEA(){
    setTimeout(function(){
      var elementToMove = document.querySelector(".text-right .seatmap-button-container .rounded-secondary-btn.no-seat");

      if(elementToMove){
      var movedButton = document.getElementById("movedButtonId"); // Buscar el botón movido anteriormente

      if(movedButton){
        movedButton.remove(); // Eliminar el botón movido anteriormente
      }

      elementToMove.id = "movedButtonId"; // Agregar el ID único al botón que se va a mover

      var containerElement = elementToMove.closest(".text-right");
      var targetElement = document.querySelector(".seatmap-pax-journey-container.hidden-md-down");

      targetElement.insertAdjacentElement('afterend', containerElement);

      elementToMove.className = "rounded-secondary-btn recommendator inverted with-arrow xs";

      elementToMove.style.marginTop = "1rem";
    }

    var movedButtons = document.querySelectorAll(".rounded-secondary-btn.recommendator.inverted.with-arrow.xs"); // Buscar todos los botones movidos

    // Si hay más de un botón movido, eliminar el botón con el ID
    if(movedButtons.length > 1){
      var buttonWithId = document.getElementById("movedButtonId");
      if(buttonWithId){
        buttonWithId.remove();
      }
    }

  }, 500);  
  }

  function clickSeatMap(){
    var innerDeepBox = document.querySelector('ac-seatmap');
    if (innerDeepBox) {
      innerDeepBox.addEventListener('click', function () {
        moveNQEA();
      });
    }
  }

  function clickButtonContinue(){
    var seatmapButton = document.querySelector('[data-test-id="seatmap-continue-button"]');
    if (seatmapButton) {
      seatmapButton.addEventListener('click', function () {
        moveNQEA();
      });
    }
  }

  function allClicks(){
    clickSeatMap();
    clickButtonContinue();
  }

  if(culture && window.innerWidth >= 768){
    moveNQEA();
    window.eventBus.subscribe({
      name: "moverBotonNoQuieroElegirAsientos", 
      callback: function (e) {
        allClicks();
      }
    });
  }

}, 600);