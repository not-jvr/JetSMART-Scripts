var initDeleteXL = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/seat/map') return;
    clearInterval(initDeleteXL);

    function clickSeatMapAsientos() {
        var containers = document.querySelectorAll('[data-test-designator]');

        containers.forEach(container => {
          if (container) {
            container.addEventListener('click', () => {
              deleteXL();
          });
        }
    });
    }

    function clickSeatMapEscala() {
        var containers = document.querySelectorAll('.seatmap-pax-route.cursor-pointer');

        containers.forEach(container => {
          if (container) {
            container.addEventListener('click', () => {
              deleteXL();
          });
        }
    });
    }

    function clickSeatMapIdaVuelta() {
        var container = document.querySelector('.direction-switch-container');
        if (container) {
          container.addEventListener('click', () => {
            deleteXL();
        });
      }
  }

  function clickContinuar() {
    var container = document.querySelector('[data-test-id="seatmap-continue-button"]');
    if (container) {
      container.addEventListener('click', () => {
        deleteXL();
    });
  }
}

function clickRecomendado() {
    var container = document.querySelector('.w-full .rounded-primary-btn.seat-select');
    if (container) {
      container.addEventListener('click', () => {
        deleteXL();
    });
  }
}

function clickContinuarModal() {
    var container = document.querySelector('[data-test-id="seatmap-modal-continue-button"]');
    if (container) {
      container.addEventListener('click', () => {
        deleteXL();
    });
  }
}

function clickIdaOVueltaMobile() {
    var container = document.querySelector('.mobile-passenger-container');
    if (container) {
      container.addEventListener('click', () => {
        deleteXL();
    });
  }
}

function clickEscalaMobile() {
    var container = document.querySelector('.cf-mobile-header-segments');
    if (container) {
      container.addEventListener('click', () => {
        deleteXL();
    });
  }
}

function clickConfirmarAsientoMobile() {
    var containers = document.querySelectorAll('.mobile-seat-btn');

    containers.forEach(container => {
      if (container) {
        container.addEventListener('click', () => {
          deleteXL();
      });
    }
});
}

function clickRecomendadoMobile() {
    var containers = document.querySelectorAll('.seatmap-recommendator-button');

    containers.forEach(container => {
      if (container) {
        container.addEventListener('click', () => {
          deleteXL();
      });
    }
});
}

function clickContinuarMobile() {
    var container = document.querySelector('.rounded-primary-btn.mobile-seatmap-direction-btn');
    if (container) {
      container.addEventListener('click', () => {
        deleteXL();
    });
  }
}

function allClicks() {
    clickSeatMapIdaVuelta();
    clickSeatMapAsientos();
    clickSeatMapEscala();
    clickContinuar();
    clickRecomendado();
    clickIdaOVueltaMobile();
    clickEscalaMobile();
    clickConfirmarAsientoMobile();
    clickRecomendadoMobile();
    clickContinuarMobile();
}

function deleteXL() {
    setTimeout(function () {
        var elements = document.querySelectorAll('.category-2');

        elements.forEach(function(element) {
            element.classList.remove('xl');
        });
    }, 700);
}

deleteXL();
allClicks();

}, 600);