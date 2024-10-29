var initChangeTooltipCO = setInterval(function () {
  if (typeof bookingData == "undefined" || window.location.pathname !== '/V2/Flight') return;
  clearInterval(initChangeTooltipCO);

  var culture = bookingData.Culture;

  function esta() {
    setTimeout(function () {
      var elementos = document.querySelectorAll('.in-total-tooltip');

      elementos.forEach(function(elemento) {
        var texto = elemento.textContent.trim();

        if (texto.includes('Impuesto Turismo Llegadas Internacionales (Colombia)') || texto.includes('International tourism arrival tax (Colombia)') || texto.includes('Taxa de chegada ao turismo internacional (Colombia)')) {
          var acTooltip = elemento.querySelector('.ac-tooltip');

          acTooltip.addEventListener('mouseover', function() {
            changeText();
          });
        }
      });
    }, 1000);
  }

  function changeText() {
    var text1 = 'Tasa que aplica a personas ingresen desde territorio extranjero a Colombiano por vía aérea en vuelos regulares.';

    switch (culture) {
    case "pt-BR":
      text1 = 'Imposto aplicável a pessoas que entram na Colômbia vindas de território estrangeiro por via aérea em voos regulares.';
      break;
    case "en-US":
      text1 = 'Tax applicable to persons entering Colombia from foreign territory by air on regular flights.';
      break;
    }

    setTimeout(function () {
      var elemento = document.querySelector('.ac-tooltip-balloon-content');

      if (elemento) {
        elemento.textContent = text1;
      }
    }, 400);
  }

  window.eventBus.subscribe({
    name: "tooltipCO",
    callback: function(e) {
      esta();
    }
  });

}, 600);