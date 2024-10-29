var initFlexiSMART = setInterval(function(){
  if(typeof bookingData === "undefined") return;
  clearInterval(initFlexiSMART);
  var culture = bookingData.Culture
  var TotalPasajeros = bookingData.PassengersAdultCount + bookingData.PassengersChildCount + bookingData.PassengersInfantCount

  function flexiSMARToutbound(contador){
    for (var i = 0; i < contador; i++){
      if(bookingData.Passengers[i].OutboundJourneySsrs != null){
        for (var x = 0; x < bookingData.Passengers[i].OutboundJourneySsrs.length; x++){
          if(bookingData.Passengers[i].OutboundJourneySsrs[x] == 'FLXB'){
            return true;
        }
    }
}
}
return false;
}
function flexiSMARTreturn(contador){
    for (var i = 0; i < contador; i++){
      if(bookingData.Passengers[i].ReturnJourneySsrs != null){
        for (var x = 0; x < bookingData.Passengers[i].ReturnJourneySsrs.length; x++){
          if(bookingData.Passengers[i].ReturnJourneySsrs[x] == 'FLXB'){
            return true;
        }
    }
}
}
return false;
}
///////
var divider = document.createElement("div");
divider.style.backgroundColor  = "1"
divider.style.backgroundColor  = "#e6e6e6"
divider.style.backgroundColor  = "rgba(230,230,230,var(--bg-opacity))"
divider.style.height = "1px"
divider.style.margin = "25px -40px"
divider.classList.add("dividerDesktop")
///////
var dividerMobile = document.createElement("div");
dividerMobile.style.backgroundColor  = "1"
dividerMobile.style.backgroundColor  = "#e6e6e6"
dividerMobile.style.backgroundColor  = "rgba(230,230,230,var(--bg-opacity))"
dividerMobile.style.height = "1px"
dividerMobile.style.margin = "25px 0"
dividerMobile.classList.add("dividerMobile")
///////
if(flexiSMARToutbound(TotalPasajeros) || flexiSMARTreturn(TotalPasajeros)){

    let javascriptActivated = false;
    let javascriptActivatedMobile = false;

    if(!javascriptActivatedMobile){
      javascriptActivatedMobile = true;
      var fondoMobile = document.querySelector("body > app > div > div > div > ac-itinerary-page > ac-itinerary-page-tabs > div > div > div:nth-child(8) > ac-itinerary-page-tabs-modification")
      fondoMobile.parentNode.insertBefore(dividerMobile, fondoMobile.nextSibling)
      var originalDivMobile = document.querySelector("body > app > div > div > div.i2-itinerary-container.no-print > ac-itinerary-page > ac-itinerary-page-tabs > div > div > div:nth-child(8) > ac-itinerary-page-tabs-modification > div.flex.items-center.justify-between.flex-col.sm\\:flex-row")
      var copiaDivMobile = originalDivMobile.cloneNode(true);
      copiaDivMobile.id = "copiaDivMobile"
      var targetElementMobileDivider = document.querySelector(".dividerMobile");
      targetElementMobileDivider.parentNode.insertBefore(copiaDivMobile, targetElementMobileDivider.nextSibling)
      const copiedDivMobile = document.querySelector('#copiaDivMobile');
      const headingMobile = copiedDivMobile.querySelector('.i2-modify-container div:first-child');
      const descriptionMobile = copiedDivMobile.querySelector('.i2-modify-container div:last-child');
      const buttonMobile = copiedDivMobile.querySelector('.rounded-primary-btn');
      if(culture != 'pt-BR' && culture != 'en-US'){
        headingMobile.textContent = "Utilizar FlexiSMART"
        descriptionMobile.textContent = "Cambia la fecha, hora o tramo de tu itinerario sin pagar penalización, solo paga la diferencia tarifaria en caso de existir."
        buttonMobile.textContent = "Hacer un cambio"
        switch(culture){
        case 'es-CL':
          buttonMobile.href = "https://jetsmart.com/cl/es/cambios-y-devoluciones"
          break;
      case 'es-PE':
          buttonMobile.href = "https://jetsmart.com/pe/es/cambios-y-devoluciones"
          break;
      case 'es-AR':
          buttonMobile.href = "https://jetsmart.com/ar/es/cambios-y-devoluciones"
          break;
      case 'es-CO':
          buttonMobile.href = "https://jetsmart.com/co/es/cambios-y-devoluciones"
          break;
      case 'es-PY':
          buttonMobile.href = "https://jetsmart.com/py/es/cambios-y-devoluciones"
          break;
      case 'es-UY':
          buttonMobile.href = "https://jetsmart.com/uy/es/cambios-y-devoluciones"
          break;
      }
  }
  if(culture == 'pt-BR'){
    headingMobile.textContent = "Use o FlexiSMART"
    descriptionMobile.textContent = "Altere a data, hora ou trecho de seu itinerário sem penalidade, basta pagar a diferença da tarifa, se houver."
    buttonMobile.textContent = "Alterar reserva"
    buttonMobile.href = "https://jetsmart.com/br/pt/cambios-y-devoluciones"
}
if(culture == 'en-US'){
    headingMobile.textContent = "Use FlexiSMART"
    descriptionMobile.textContent = "Change the date, time or leg of your itinerary without penalty, just pay the fare difference if it applies."
    buttonMobile.textContent = "Make changes"
    buttonMobile.href = "https://jetsmart.com/us/en/cambios-y-devoluciones"
}
}
document.querySelectorAll('[data-tab-name]').forEach(tab => {
  tab.addEventListener('click', function(event) {
    if (event.target.getAttribute('data-tab-name') === 'Modify' && !javascriptActivated) {
      javascriptActivated = true;
      var fondoTarget = document.querySelector("body > app > div > div > div > ac-itinerary-page > ac-itinerary-page-tabs > div > dc-tabs > div.tab-panel.active > ac-itinerary-page-tabs-modification")
      fondoTarget.parentNode.insertBefore(divider, fondoTarget.nextSibling)
      var originalDiv = document.querySelector('.flex.items-center.justify-between.flex-col.sm\\:flex-row');
      var copiaDiv = originalDiv.cloneNode(true);
      copiaDiv.id = "copiaDiv"
      var targetElementDividerDesktop = document.querySelector(".dividerDesktop");
      targetElementDividerDesktop.parentNode.insertBefore(copiaDiv, targetElementDividerDesktop.nextSibling)
      const copiedDiv = document.querySelector('#copiaDiv');
      const heading = copiedDiv.querySelector('.i2-modify-container div:first-child');
      const description = copiedDiv.querySelector('.i2-modify-container div:last-child');
      const button = copiedDiv.querySelector('.rounded-primary-btn');
      if(culture != 'pt-BR' && culture != 'en-US'){
        heading.textContent = "Utilizar FlexiSMART"
        description.textContent = "Cambia la fecha, hora o tramo de tu itinerario sin pagar penalización, solo paga la diferencia tarifaria en caso de existir."
        button.textContent = "Hacer un cambio"
        switch(culture){
        case 'es-CL':
          button.href = "https://jetsmart.com/cl/es/cambios-y-devoluciones"
          break;
      case 'es-PE':
          button.href = "https://jetsmart.com/pe/es/cambios-y-devoluciones"
          break;
      case 'es-AR':
          button.href = "https://jetsmart.com/ar/es/cambios-y-devoluciones"
          break;
      case 'es-CO':
          button.href = "https://jetsmart.com/co/es/cambios-y-devoluciones"
          break;
      case 'es-PY':
          button.href = "https://jetsmart.com/py/es/cambios-y-devoluciones"
          break;
      case 'es-UY':
          button.href = "https://jetsmart.com/uy/es/cambios-y-devoluciones"
          break;
      }
  }
  if(culture == 'pt-BR'){
    heading.textContent = "Use o FlexiSMART"
    description.textContent = "Altere a data, hora ou trecho de seu itinerário sem penalidade, basta pagar a diferença da tarifa, se houver."
    button.textContent = "Alterar reserva"
    button.href = "https://jetsmart.com/br/pt/cambios-y-devoluciones"
}
if(culture == 'en-US'){
    heading.textContent = "Use FlexiSMART"
    description.textContent = "Change the date, time or leg of your itinerary without penalty, just pay the fare difference if it applies."
    button.textContent = "Make changes"
    button.href = "https://jetsmart.com/us/en/cambios-y-devoluciones"
}
}
});
});
}
}, 200);