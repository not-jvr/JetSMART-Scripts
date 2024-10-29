var initModalNoSeatsSelected = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/seat/map') return;
  clearInterval(initModalNoSeatsSelected);

  var culture = bookingData.Culture;

  function initializeSeatSelection() {
    
    if(document.querySelector('.rounded-secondary-btn.recommendator.inverted.with-arrow.xs')){
      var originalButton = document.querySelector('.rounded-secondary-btn.recommendator.inverted.with-arrow.xs');
    } else{
      var originalButton = document.querySelector('.seatmap-recommendator-button');
    }

    if(originalButton){
      var clonedButton = cloneButton(originalButton);

      clonedButton.addEventListener("click", function(event) {
        event.preventDefault();
        addModalNoSelectSeats();

        var continueButton = document.querySelector('[data-test-id="seatmap-modal-continue-button-no-seats-selected"]');
        var modal = document.querySelector('[data-test-id="seatmap-no-seats-selected"]');
        var closeButton = modal.querySelector('button');
        var cancelButton = modal.querySelector('.seat-for-all');

        continueButton.addEventListener("click", function() {
          restoreOriginalButton(originalButton, clonedButton);
          originalButton.click();
          hideModal(modal);
        });

        closeButton.addEventListener("click", function() {
          hideModal(modal);
        });

        cancelButton.addEventListener("click", function() {
          hideModal(modal);
        });
      });

      replaceButton(originalButton, clonedButton);
    }
  }

  function cloneButton(originalButton) {
    return originalButton.cloneNode(true);
  }

  function replaceButton(originalButton, clonedButton) {
    originalButton.replaceWith(clonedButton);
  }

  function restoreOriginalButton(originalButton, clonedButton) {
    clonedButton.replaceWith(originalButton);
  }

  function addModalNoSelectSeats() {
    var modal = document.querySelector('[data-test-id="seatmap-no-seats-selected"]');
    if (modal) {
      modal.style.display = "block";
    } else {
      var modalHeaderText, modalBodyText, cancelButtonText, continueButtonText;
      
      switch (culture) {
      case "pt-BR":
        modalHeaderText = "Tem certeza?";
        modalBodyText = "Você não vai selecionar nenhum assento para esta reserva. Deseja continuar mesmo assim?";
        cancelButtonText = "Cancelar";
        continueButtonText = "Continuar";
        break;
      case "en-US":
        modalHeaderText = "Are you sure?";
        modalBodyText = "You are not going to select any seats for this booking. Do you want to continue anyway?";
        cancelButtonText = "Cancel";
        continueButtonText = "Continue";
        break;
      default:
        modalHeaderText = "¿Estás seguro?";
        modalBodyText = "No vas a seleccionar ningún asiento para esta reserva. ¿Quieres continuar de todos modos?";
        cancelButtonText = "Cancelar";
        continueButtonText = "Continuar";
      }

      var modalNoSelectSeats = `<div class="modal" data-test-id="seatmap-no-seats-selected">
      <div class="modal-content booking-modal-content">
      <button>×</button>
      <div class="modal-header text-center">${modalHeaderText}</div>
      <div class="modal-body text-center">
      <span class="brand-secondary-text">${modalBodyText}</span>
      <div class="modal-button-container modification-buttons-container">
      <button class="rounded-secondary-btn seat-for-all">
      ${cancelButtonText}
      </button>
      <button class="rounded-primary-btn seat-for-all" data-test-id="seatmap-modal-continue-button-no-seats-selected">
      ${continueButtonText}
      </button>
      </div>
      </div>
      </div>
      </div>`;

      var footer = document.querySelector('body > app > footer');
      footer.insertAdjacentHTML('afterend', modalNoSelectSeats);
    }
  }

  function hideModal(modal) {
    modal.style.display = "none";
  }

  if(culture){
    initializeSeatSelection();
  }
  
}, 600);