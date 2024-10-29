var initChange1PareBR = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/itinerary') return;
  clearInterval(initChange1PareBR);

  var culture = bookingData.Culture;

  function changeText() {
    var elementos = document.querySelectorAll('.flight-journey-stops-number');
    elementos.forEach(function(elemento) {
        if (elemento.textContent.trim() === '1 pare') {
            elemento.innerHTML = '<span class="underline">' + elemento.textContent + ' /<br>Aguarde a bordo</span>';
        }
    });
}

if (culture === 'pt-BR') {
    changeText();
}

}, 600);