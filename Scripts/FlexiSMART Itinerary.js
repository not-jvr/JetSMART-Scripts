var initFlexiSMART = setInterval(function() {
  if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Itinerary') return;
  clearInterval(initFlexiSMART);
  var culture = bookingData.Culture;
  var isMobile = window.innerWidth < 768;

  if (document.getElementById('flexiSMART-clone')) return;
  
  function addFlexiButton() {
    var divider = document.querySelector('.i2-modify-divider');
    var additionalElement = document.querySelector('.flex.items-center.justify-between.flex-col.sm\\:flex-row');
    var itineraryTabsModification = isMobile ? document.querySelectorAll('ac-itinerary-page-tabs-modification')[1] : document.querySelectorAll('ac-itinerary-page-tabs-modification')[0];

    var dividerCopy = divider.cloneNode(true);
    itineraryTabsModification.appendChild(dividerCopy);

    var additionalElementCopy = additionalElement.cloneNode(true);
    additionalElementCopy.setAttribute('id', 'flexiSMART-clone');
    itineraryTabsModification.insertBefore(additionalElementCopy, dividerCopy.nextSibling);

    var clonedElement = document.querySelector('#flexiSMART-clone');

    var firstDiv = clonedElement.querySelector('.i2-modify-container div:first-child');
    var secondDiv = clonedElement.querySelector('.i2-modify-container div:nth-child(2)');
    var button = clonedElement.querySelector('a.rounded-primary-btn.i2-btn.i2-btn-blue');

    if (culture != 'pt-BR' && culture != 'en-US') {
      firstDiv.innerHTML = 'Utilizar FlexiSMART';
      secondDiv.innerHTML = 'Cambia la fecha, hora o tramo de tu itinerario sin pagar penalización, solo paga la diferencia tarifaria en caso de existir.';

      switch (culture) {
        case 'es-CL':
          button.href = 'https://jetsmart.com/cl/es/cambios-y-devoluciones';
          break;
        case 'es-PE':
          button.href = 'https://jetsmart.com/pe/es/cambios-y-devoluciones';
          break;
        case 'es-AR':
          button.href = 'https://jetsmart.com/ar/es/cambios-y-devoluciones';
          break;
        case 'es-CO':
          button.href = 'https://jetsmart.com/co/es/cambios-y-devoluciones';
          break;
        case 'es-PY':
          button.href = 'https://jetsmart.com/py/es/cambios-y-devoluciones';
          break;
        case 'es-UY':
          button.href = 'https://jetsmart.com/uy/es/cambios-y-devoluciones';
          break;
      }

      button.textContent = 'Hacer un cambio';
    } else if (culture == 'pt-BR') {
      firstDiv.innerHTML = 'Use o FlexiSMART';
      secondDiv.innerHTML = 'Altere a data, hora ou trecho de seu itinerário sem penalidade, basta pagar a diferença da tarifa, se houver.';
      button.href = 'https://jetsmart.com/br/pt/cambios-y-devoluciones';
      button.textContent = 'Alterar reserva';
    } else if (culture == 'en-US') {
      firstDiv.innerHTML = 'Use FlexiSMART';
      secondDiv.innerHTML = 'Change the date, time or leg of your itinerary without penalty, just pay the fare difference if it applies.';
      button.href = 'https://jetsmart.com/us/en/cambios-y-devoluciones';
      button.textContent = 'Make changes';
    }
  }

  addFlexiButton();
}, 400);