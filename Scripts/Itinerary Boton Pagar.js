var intBotonPagar = setInterval(function(){
  if(typeof bookingData === "undefined" || !document.querySelector("body > app > div:nth-child(2) > div > div > ac-itinerary-page > ac-itinerary-page-tabs > div > dc-tabs > div.tab-panel.active > ac-itinerary-page-tabs-transactions > div.flex.items-center.justify-end.m-4 > a")) return;
  clearInterval(intBotonPagar);
  var culture = bookingData.Culture
  var currency = bookingData.TotalPriceCurrency
  if(document.querySelector("body > app > div:nth-child(2) > div > div > ac-itinerary-page > ac-itinerary-page-tabs > div > dc-tabs > div.tab-panel.active > ac-itinerary-page-tabs-transactions > div.flex.items-center.justify-end.m-4 > a")){
     boton = document.querySelector("body > app > div:nth-child(2) > div > div > ac-itinerary-page > ac-itinerary-page-tabs > div > dc-tabs > div.tab-panel.active > ac-itinerary-page-tabs-transactions > div.flex.items-center.justify-end.m-4 > a")
     boton.style.width = "1%"
     if(culture != 'en-US'){
        var valor = document.querySelector(".total-right.pad-right.text-right").textContent;
        switch(currency){
        case 'CLP': valor = valor.replace("CLP", "").trim();
          boton.textContent = "Pagar " + valor
          break;
      case 'ARS': valor = valor.replace("ARS", "").trim();
          boton.textContent = "Pagar " + valor
          break;
      case 'COP': valor = valor.replace("COP", "").trim();
          boton.textContent = "Pagar " + valor
          break;
      case 'PYG': valor = valor.replace("PYG", "").trim();
          boton.textContent = "Pagar " + valor
          break;
      case 'USD': valor = valor.replace("USD", "").trim();
          boton.textContent = "Pagar " + valor
          break;
      case 'PEN': valor = valor.replace("PEN", "").trim();
          boton.textContent = "Pagar " + valor
          break;
      case 'BRL': valor = valor.replace("BRL", "").trim();
          boton.textContent = "Pagar " + valor
          break;
      }
  }

  if(culture == 'en-US'){
    var valor = document.querySelector(".total-right.pad-right.text-right").textContent;
    switch(currency){
    case 'CLP': valor = valor.replace("CLP", "").trim();
      boton.textContent = "Pay " + valor
      break;
  case 'ARS': valor = valor.replace("ARS", "").trim();
      boton.textContent = "Pay " + valor
      break;
  case 'COP': valor = valor.replace("COP", "").trim();
      boton.textContent = "Pay " + valor
      break;
  case 'PYG': valor = valor.replace("PYG", "").trim();
      boton.textContent = "Pay " + valor
      break;
  case 'USD': valor = valor.replace("USD", "").trim();
      boton.textContent = "Pay " + valor
      break;
  case 'PEN': valor = valor.replace("PEN", "").trim();
      boton.textContent = "Pay " + valor
      break;
  case 'BRL': valor = valor.replace("BRL", "").trim();
      boton.textContent = "Pay " + valor
      break;
  }

}
}
}, 200);
