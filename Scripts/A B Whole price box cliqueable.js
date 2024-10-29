var initFullClickVuelo = setInterval(function () {
  if (typeof bookingData === "undefined" || typeof window.eventBus === "undefined") return;
  clearInterval(initFullClickVuelo);

  var culture = bookingData.Culture;
  if (culture === 'es-CL') {
    window.eventBus.subscribe({
      name: "FullClickVuelo", callback: function (e) {
        const elementos = document.querySelectorAll('.selected-flight-container');
        elementos.forEach(function(elemento) {
          elemento.addEventListener('click', function() {
            const selectVuelo = elemento.querySelector('.nowrap.big');
                  selectVuelo.click();
          });
        });
      }
    });
  }
}, 500);