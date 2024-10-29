var initDiscountBaggageBE = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Baggage') return;
  clearInterval(initDiscountBaggageBE);

  var culture = bookingData.Culture;
  var fechaVuelo = false;
  var DC = false;
  var rutasCL = ['SCL', 'ARI', 'IQQ', 'CJC', 'ANF', 'LSC', 'CCP', 'ZCO', 'PMC', 'MHC', 'BBA', 'PNT', 'PUQ'];

  function isCL() {
    var arrival = bookingData.OutboundJourney.ArrivalStationCode;
    var departure = bookingData.OutboundJourney.DepartureStationCode;

    if (arrival && rutasCL.includes(arrival)) {
      return true;
    } else if (departure && rutasCL.includes(departure)) {
      return true;
    } else {
      return false;
    }
  }

  function checkDCMembership() {
    if(JetSmart.AppContext.hasStandardDcMembership === "True" || JetSmart.AppContext.hasGroupDcMembership === "True"){
      DC = true;
    }
    return DC;
  }

  function checkBE() {
    if (JetSmart.AppContext.bancoEstadoCategory && JetSmart.AppContext.bancoEstadoCategory !== '0') {
      return true;
    } else {
      return false;
    }
  }

  function checkFecha() {
    if (bookingData.hasOwnProperty('AvailableOutboundJourneys')) {
      bookingData.AvailableOutboundJourneys.forEach(function (f, i) {
        if (new Date("2023/09/25 00:00:00") < new Date(f.DepartureDate.replace(/-/g, "/")) && new Date(f.ArrivalDate.replace(/-/g, "/")) < new Date("2024/03/31 23:59:59")) fechaVuelo = true;
      });
    }
    if (bookingData.hasOwnProperty('AvailableReturnJourneys') && bookingData.AvailableReturnJourneys) {
      bookingData.AvailableReturnJourneys.forEach(function (f, i) {
        if (new Date("2023/09/25 00:00:00") < new Date(f.DepartureDate.replace(/-/g, "/")) && new Date(f.ArrivalDate.replace(/-/g, "/")) < new Date("2024/03/31 23:59:59")) fechaVuelo = true;
      });
    }
    return fechaVuelo;
  }

  var css = `
  .titlegrey{
    width: 100%;
    height: 36px;
    background-color: #f2f2f2;
    position: absolute;
    top: 0px;
    border-radius: 13px 0 0 0;
  }

  .titleCabinBagagge {
    background-image: url(https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/6472a872-2ccc-433b-9a5e-1337109f57ab/img-baggage-top.png);
    background-size: contain;
    width: 100%;
    display: flex;
    align-content: stretch;
    justify-content: space-around;
    position: absolute;
    top: 0px;
    border-radius: 0 13px 0 0;
  }

  .titleCabinBagagge .titlebag {  
    position: absolute;
    --text-opacity: 1;
    color: #fff;
    font-family: ClanOT-Bold,sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    --bg-opacity: 1;
    background-color: transparent;  
    line-height: 1; 
    top: 0px;
    right: unset;
    font-size: 18px;
    width: 242px;
    height: 42px;
  }

  .titleCabinBagagge .iconBag {
    position: relative;
    padding: 6px 30px;
    width: 84px;
    display: flex;
    right: 80px;
    margin-right: 82px;
  }

  @media (max-width: 767px) {
    .titleCabinBagagge {
      border-radius: 0 0 0 0;  // Esto quita todas las curvas
      top: 0;
      left: 0;
    }

    .titleCabinBagagge .titlebag {
      margin-top: -6px;
      font-size: 12px; // Reducir el tamaño de la fuente
      width: 200px; // Reducir el ancho
    }

    .titleCabinBagagge .iconBag {
      width: 75px; // Reducir el tamaño del icono
    }
  }
  `
  ,
  head = document.head || document.getElementsByTagName('head')[0],
  style = document.createElement('style');
  head.appendChild(style);
  style.type = 'text/css';
  if (style.styleSheet) {
                        // This is required for IE8 and below.
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  function getDiscountText(discount) {
    let text;

    switch (culture) {
    case "pt-BR":
      text = `!DESCONTO DE ${discount}%!`;
      break;
    case "en-US":
      text = `!${discount}% DISCOUNT!`;
      break;
    default: // por defecto será en español
      text = `!${discount}% DE DESCUENTO!`;
      break;
    }
    return text;
  }

  function calculateDesc(text ,index) {
    var totalPriceElements = document.querySelectorAll(".b2-per-booking-next-price span.line-through");
    var finalPriceElements = document.querySelectorAll(".b2-amount");
    var totalPriceElementsMobile = document.querySelectorAll(".b2m-crossed-out-price .line-through");
    var finalPriceElementsMobile = document.querySelectorAll(".b2m-crossed-out-price span.line-through");
    var originalPriceElements = document.querySelector(".b2-per-booking-next-price.original-price.non-breaking-price");
    
    if (finalPriceElements && finalPriceElements[index]) {
        var descuentoPorcentaje = text; // Porcentaje de descuento deseado
        var cantidadDada = parseFloat(finalPriceElements[index].dataset.testValue);
        var numeroTotal = cantidadDada * 100 / (100 - descuentoPorcentaje);

        var formattedNumber;
        if (culture === 'es-CL') {
          formattedNumber = '$ ' + numeroTotal.toLocaleString('es-CL', { maximumFractionDigits: 0 });
        } else {
          formattedNumber = '$ ' + numeroTotal.toFixed(2);
        }

        if (totalPriceElements && totalPriceElements[index]) {
          totalPriceElements[index].textContent = formattedNumber;
        }

        if (originalPriceElements) {
          originalPriceElements.textContent = formattedNumber;
        }
      }

      if(totalPriceElementsMobile && totalPriceElementsMobile[index]){
        totalPriceElementsMobile[index].style.display = 'none';
      }
    }

  //0 Equipaje de mano
  //1 Equipaje facturado
    function insertTitleCabinBagaggeElement(text, index) {
      var baggageDesktop = document.querySelectorAll(".b2-paid-bag-option .b2-illustration");
      var baggageGreyDesktop = document.querySelectorAll(".b2-free-bag-option .b2-illustration");
      var baggageMobile = document.querySelectorAll(".b2m-per-booking-section.padded");
      var ribbonDesktop = document.querySelectorAll(".b2-paid-bag-option .b2-illustration-ribbon");
      var ribbonMobile = document.querySelectorAll(".b2m-ribbon");
      calculateDesc(text, index);
      var text = getDiscountText(text);

      var titleBagaggeDesktopHTML = `
      <div class="titleCabinBagagge titleCabinBagaggeDesktop" data-index="${index}">
      <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/1781df1a-d38f-44a1-bf58-0064529f7354/icon-verified.png" class="iconBag" alt="">
      <div class="titlebag">${text}</div>
      </div>
      `;

      var titleBagaggeMobileHTML = `
      <div class="titleCabinBagagge titleCabinBagaggeMobile" data-index="${index}">
      <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/1781df1a-d38f-44a1-bf58-0064529f7354/icon-verified.png" class="iconBag" alt="">
      <div class="titlebag">${text}</div>
      </div>
      `;

      var titleBagaggeGreyHTML = `
      <div class="titlegrey" data-index="${index}"></div>
      `;

      if (ribbonDesktop[index]) {
        ribbonDesktop[index].style.display = 'none';
      }

      if (ribbonMobile[index]) {
        ribbonMobile[index].style.display = 'none';
      }

      if (!document.querySelector(`.titlegrey[data-index="${index}"]`) && baggageGreyDesktop[index]) {
        baggageGreyDesktop[index].insertAdjacentHTML('afterbegin', titleBagaggeGreyHTML);
      }

      if (!document.querySelector(`.titleCabinBagaggeDesktop[data-index="${index}"]`) && baggageDesktop[index]) {
        baggageDesktop[index].insertAdjacentHTML('afterbegin', titleBagaggeDesktopHTML);
      }

      if (!document.querySelector(`.titleCabinBagaggeMobile[data-index="${index}"]`) && baggageMobile[index]) {
        baggageMobile[index].insertAdjacentHTML('afterbegin', titleBagaggeMobileHTML);
      }
    }

//ELIMINAR checkFecha()
    if(checkBE() && isCL() && checkFecha()){
      insertTitleCabinBagaggeElement(50, 1);
      window.eventBus.subscribe({
        name: "pagoefectivoButton", callback: function (e) {
         insertTitleCabinBagaggeElement(50, 1);
       }
     });
    }

  }, 600);