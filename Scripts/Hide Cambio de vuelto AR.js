var initHideCambioDeVuelo = setInterval(function () {
  if (window.location.pathname.toLowerCase() !== '/v2/itinerary' || typeof bookingData === "undefined") return;
  clearInterval(initHideCambioDeVuelo);

  var culture = bookingData.Culture;

  function hideCambioDeVuelo() {
    var containers = document.querySelectorAll('ac-itinerary-page-tabs-modification');

    containers.forEach(function(container, index) {
      container.querySelector('.flex').style.display = 'none';
    });

  }
  console.log("a")
  if (culture === 'es-AR') {
    console.log("gola")
    hideCambioDeVuelo();
  }
}, 600);