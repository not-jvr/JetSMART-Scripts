var initFullClickVueloV2 = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
  clearInterval(initFullClickVueloV2);

  var culture = bookingData.Culture;

  function clickFull() {
    var elementos = document.querySelectorAll('.selected-flight-container');
    elementos.forEach(function(elemento) {
      elemento.addEventListener('click', function() {
        var selectVuelo = elemento.querySelector('.nowrap.big');
        selectVuelo.click();
      });
    });
  }

  if (culture) {
    clickFull();
    window.eventBus.subscribe({
      name: "FullClickVuelo", callback: function (e) {
        clickFull();
      }
    });
  }
}, 600);