var initDiscountBaggage = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/baggage') return;
  clearInterval(initDiscountBaggage);

  const culture = bookingData.Culture;
  const currentCurrency = getCurrentCurrency();
  const memberRole = bookingData.Role;
  const postBooking = bookingData.PostBooking;

  function domesticPE() {
    var rutasPE = ["IQT", "TPP", "TYL", "PIU", "CIX", "CJA", "TRU", "LIM", "CUZ", "AQP"];
    var outboundPE = false;
    var arrivalPE = false;

    if (bookingData.OutboundJourney.DepartureStationCode) {
        outboundPE = (rutasPE.indexOf(bookingData.OutboundJourney.DepartureStationCode) > -1);
    }

    if (bookingData.OutboundJourney.ArrivalStationCode) {
        arrivalPE = (rutasPE.indexOf(bookingData.OutboundJourney.ArrivalStationCode) > -1);
    }

    if (outboundPE && arrivalPE) {
      return true;
    } else {
      return false;
    }
  }

  function checkFecha(startDate, endDate) { // en formato string "2023/07/31 00:00:00"
    if (bookingData.hasOwnProperty('AvailableOutboundJourneys')) {
      bookingData.AvailableOutboundJourneys.forEach(function (f, i) {
        if (new Date(startDate) < new Date(f.DepartureDate.replace(/-/g, "/")) && new Date(f.ArrivalDate.replace(/-/g, "/")) < new Date(endDate)) fechaVuelo = true;
      });
    }
    if (bookingData.hasOwnProperty('AvailableReturnJourneys') && bookingData.AvailableReturnJourneys) {
      bookingData.AvailableReturnJourneys.forEach(function (f, i) {
        if (new Date(startDate) < new Date(f.DepartureDate.replace(/-/g, "/")) && new Date(f.ArrivalDate.replace(/-/g, "/")) < new Date(endDate)) fechaVuelo = true;
      });
    }
    return fechaVuelo;
  }

  function checkDCMembership() {
    let DC;
    if (JetSmart.AppContext.hasStandardDcMembership === "True" || JetSmart.AppContext.hasGroupDcMembership === "True") {
      DC = true;
    } else DC = false;

    return DC;
  }

  function checkBECategory() { // retorna True solo si JetSmart.AppContext.bancoEstadoCategory es distint de 0. Si es True el usuario tiene membresía banco estado
    return JetSmart.AppContext.bancoEstadoCategory !== '0';
  }

  function addCSS() {
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

    .discountAmount {
      color: #424e63;
      font-size: 14px;
      text-decoration: line-through;
    }

    .b2-add-another.padded-top {
      padding-top: 0;
    }

    [data-index="discountdesktopCheckedBNew"] {
      color: white;
      padding: 0;
      margin-left: auto;
      padding-right: 50px;
      font-size: 15px;
    }

    @media (max-width: 767px) {
      .titleCabinBagagge {
        border-radius: 0 8px 0 0;
        top: 0;
        left: 0;
      }

      .titlegrey{
        height: 27px;
        border-radius: 8px 0 0 0;
      }

      .titleCabinBagagge .titlebag {
        margin-top: -6px;
        font-size: 12px;
        width: 200px;
      }

      .titleCabinBagagge .iconBag {
        width: 75px;
      }

      .b2m-per-booking-section.padded {
        border-radius: 0 13px 0 0;
      }

      .discountAmount {
        font-size: 10px;
        padding-left: 32px;
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

  function addDiscountTitleCabinBaggage(text) {
    var ribbonDesktopCB = document.querySelector('ac-select-cabin-bag .b2-illustration-ribbon');
    var ribbonMobileCB = document.querySelector('ac-select-cabin-bag .b2m-ribbon');
    var ribbonMobilePerPax = document.querySelectorAll('ac-per-journey-per-pax-mobile');
    var ribbonMobilePerPaxCB = ribbonMobilePerPax[0].querySelector('.b2-illustration-ribbon');
    var desktopCB = document.querySelector('ac-select-cabin-bag .b2-paid-bag-option.hoverable .b2-illustration');
    var desktopgreyCB = document.querySelector('ac-select-cabin-bag .b2-free-bag-option.hoverable .b2-illustration');
    var mobileCB = document.querySelector('ac-select-cabin-bag .b2m-per-booking-section.padded');
    var mobilePerPax = document.querySelectorAll('ac-select-cabin-bag .b2m-per-pax-section');
    var mobilePerPaxGrey = mobilePerPax[0];
    var mobilePerPaxCB = mobilePerPax[1];
    var text = getDiscountText(text);

    var titleBagaggeDesktopHTML = `
  <div class="titleCabinBagagge" data-index="desktopCB">
  <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/1781df1a-d38f-44a1-bf58-0064529f7354/icon-verified.png" class="iconBag" alt="">
  <div class="titlebag">${text}</div>
  </div>
  `;

    var titleBagaggeMobileHTML = `
  <div class="titleCabinBagagge" data-index="mobileCB">
  <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/1781df1a-d38f-44a1-bf58-0064529f7354/icon-verified.png" class="iconBag" alt="">
  <div class="titlebag">${text}</div>
  </div>
  `;

    var titleBagaggeMobilePerPaxHTML = `
  <div class="titleCabinBagagge" data-index="mobilePerPaxCB">
  <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/1781df1a-d38f-44a1-bf58-0064529f7354/icon-verified.png" class="iconBag" alt="">
  <div class="titlebag">${text}</div>
  </div>
  `;

    var titleBagaggeGreyHTML = `
  <div class="titlegrey" data-index="desktopgreyCB"></div>
  `;

    var titleBagaggeGreyMobileHTML = `
  <div class="titlegrey" data-index="mobilegreyPerPaxCB"></div>
  `;

    //DESKTOP//
    if (desktopCB && !document.querySelector(`[data-index="desktopCB"]`)) {
      if (ribbonDesktopCB) {
        ribbonDesktopCB.style.display = 'none';
      }
      desktopCB.insertAdjacentHTML('afterbegin', titleBagaggeDesktopHTML);
    }

    if (desktopgreyCB && !document.querySelector(`[data-index="desktopgreyCB"]`)) {
      desktopgreyCB.insertAdjacentHTML('afterbegin', titleBagaggeGreyHTML);
    }

    //MOBILE//
    if (mobileCB && !document.querySelector(`[data-index="mobileCB"]`)) {
      if (ribbonMobileCB) {
        ribbonMobileCB.style.display = 'none';
      }
      mobileCB.insertAdjacentHTML('afterbegin', titleBagaggeMobileHTML);
    }

    //MOBILE PER PAX//
    if (mobilePerPaxCB && !document.querySelector(`[data-index="mobilePerPaxCB"]`)) {
      if (ribbonMobilePerPaxCB) {
        ribbonMobilePerPaxCB.style.display = 'none';
      }
      mobilePerPaxCB.insertAdjacentHTML('afterbegin', titleBagaggeMobilePerPaxHTML);
    }

    if (mobilePerPaxGrey && !document.querySelector(`[data-index="mobilegreyPerPaxCB"]`)) {
      mobilePerPaxGrey.insertAdjacentHTML('afterbegin', titleBagaggeGreyMobileHTML);
    }
  }

  function addDiscountTitleCheckedBaggage(text) {
    var ribbonDesktopCheckedB = document.querySelector('[data-test-id="baggage-per-booking-paid-illustration-ribbon--c|CheckedBaggage"]');
    var ribbonMobileCheckedB = document.querySelector('[data-test-id="baggage-per-booking-paid-illustration-ribbon--c|CheckedBaggage-m|1"]');
    var ribbonMobilePerPax = document.querySelectorAll('ac-per-journey-per-pax-mobile');
    var ribbonmobilePerPaxCheckedB = ribbonMobilePerPax[1].querySelector('.b2-illustration-ribbon');
    var desktopCheckedB = document.querySelector('[data-test-id="baggage-per-booking-paid-illustration--c|CheckedBaggage"] .b2-illustration.taller');
    var desktopgreyCheckedB = document.querySelector('[data-test-id="baggage-per-booking-free-illustration--c|CheckedBaggage"] .b2-illustration.taller');
    var mobileCheckedB = document.querySelector('[data-test-id="baggage-page-section-mb--c|CheckedBaggage"] .b2m-per-booking-section.padded');
    var mobilePerPax = document.querySelectorAll('ac-select-checked-bag .b2m-per-pax-section');
    var mobilePerPaxGreyChecked = mobilePerPax[0];
    var mobilePerPaxCheckedB = mobilePerPax[1];
    var text = getDiscountText(text);

    var titleBagaggeDesktopHTML = `
  <div class="titleCabinBagagge" data-index="desktopCheckedB">
  <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/1781df1a-d38f-44a1-bf58-0064529f7354/icon-verified.png" class="iconBag" alt="">
  <div class="titlebag">${text}</div>
  </div>
  `;

    var titleBagaggeMobileHTML = `
  <div class="titleCabinBagagge" data-index="mobileCheckedB">
  <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/1781df1a-d38f-44a1-bf58-0064529f7354/icon-verified.png" class="iconBag" alt="">
  <div class="titlebag">${text}</div>
  </div>
  `;

    var titleBagaggeMobilePerPaxHTML = `
  <div class="titleCabinBagagge" data-index="mobilePerPaxCheckedB">
  <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/1781df1a-d38f-44a1-bf58-0064529f7354/icon-verified.png" class="iconBag" alt="">
  <div class="titlebag">${text}</div>
  </div>
  `;

    var titleBagaggeGreyHTML = `
  <div class="titlegrey" data-index="desktopgreyCheckedB"></div>
  `;

    var titleBagaggeGreyMobileHTML = `
  <div class="titlegrey" data-index="mobilegreyPerPaxCheckedB"></div>
  `;

    //DESKTOP//
    if (desktopCheckedB && !document.querySelector(`[data-index="desktopCheckedB"]`)) {
      if (ribbonDesktopCheckedB) {
        ribbonDesktopCheckedB.style.display = 'none';
      }
      desktopCheckedB.insertAdjacentHTML('afterbegin', titleBagaggeDesktopHTML);
    }

    if (desktopgreyCheckedB && !document.querySelector(`[data-index="desktopgreyCheckedB"]`)) {
      desktopgreyCheckedB.insertAdjacentHTML('afterbegin', titleBagaggeGreyHTML);
    }

    //MOBILE//
    if (mobileCheckedB && !document.querySelector(`[data-index="mobileCheckedB"]`)) {
      if (ribbonMobileCheckedB) {
        ribbonMobileCheckedB.style.display = 'none';
      }
      mobileCheckedB.insertAdjacentHTML('afterbegin', titleBagaggeMobileHTML);
    }

    //MOBILE PER PAX//
    if (mobilePerPaxCheckedB && !document.querySelector(`[data-index="mobilePerPaxCheckedB"]`)) {
      if (ribbonmobilePerPaxCheckedB) {
        ribbonmobilePerPaxCheckedB.style.display = 'none';
      }
      mobilePerPaxCheckedB.insertAdjacentHTML('afterbegin', titleBagaggeMobilePerPaxHTML);
    }

    if (mobilePerPaxGreyChecked && !document.querySelector(`[data-index="mobilegreyPerPaxCheckedB"]`)) {
      mobilePerPaxGreyChecked.insertAdjacentHTML('afterbegin', titleBagaggeGreyMobileHTML);
    }
  }

  function addDiscountAmountCabinBaggage(discountPercentage) {
    //calculo//
    var priceElement = document.querySelector('[data-test-id="baggage-per-booking-minimum-price--c|CabinBaggage"]');
    if (priceElement) {
      var price = parseInt(priceElement.getAttribute('data-test-value'));
      var originalPriceNoFormat = price / (1 - discountPercentage / 100);
      var originalPrice = formatCurrencyValue(originalPriceNoFormat, currentCurrency);
    }
    //insertar//
    var desktopCB = document.querySelector('[data-test-id="baggage-per-booking-paid-illustration--c|CabinBaggage"] .b2-per-booking-next-price');
    var mobileCB = document.querySelector('ac-select-cabin-bag .b2m-per-booking-section.padded .b2m-per-booking-selector span');
    var mobilePerPax = document.querySelectorAll('ac-select-cabin-bag ac-per-journey-per-pax-mobile .b2-per-booking-next-price');
    var mobilePerPaxInsert = mobilePerPax[1];

    var discountTextDesktop = `
  <div class="discountAmount" data-index="discountDesktopCB">
  ${originalPrice}
  </div>
  `;

    var discountTextMobile = `
  <div class="discountAmount" data-index="discountMobileCB">
  ${originalPrice}
  </div>
  `;

    var discountTextMobilePerPax = `
  <div class="discountAmount" data-index="discountMobilePerPaxCB">
  ${originalPrice}
  </div>
  `;

    //DESKTOP//
    if (originalPrice && desktopCB && !document.querySelector(`[data-index="discountDesktopCB"]`)) {
      desktopCB.insertAdjacentHTML('beforebegin', discountTextDesktop);
    }
    //MOBILE//
    if (originalPrice && mobileCB && !document.querySelector(`[data-index="discountMobileCB"]`)) {
      mobileCB.insertAdjacentHTML('beforebegin', discountTextMobile);
    }
    //MOBILE PER PAX//
    if (originalPrice && mobilePerPaxInsert && !document.querySelector(`[data-index="discountMobilePerPaxCB"]`)) {
      mobilePerPaxInsert.insertAdjacentHTML('beforebegin', discountTextMobilePerPax);
    }
  }

  function addDiscountAmountCheckedBaggage(discountPercentage) {
    //calculo//
    var priceElement = document.querySelector('[data-test-id="baggage-per-booking-minimum-price--c|CheckedBaggage"]');
    if (priceElement) {
      var price = parseInt(priceElement.getAttribute('data-test-value'));
      var originalPriceNoFormat = price / (1 - discountPercentage / 100);
      var originalPrice = formatCurrencyValue(originalPriceNoFormat, currentCurrency);
    }
    //insertar//
    var desktopCheckedB = document.querySelector('[data-test-id="baggage-per-booking-paid-illustration--c|CheckedBaggage"] .b2-per-booking-next-price');
    var mobileCheckedB = document.querySelector('ac-select-checked-bag .b2m-per-booking-section.padded .b2m-per-booking-selector span');
    var mobilePerPaxInsert = document.querySelector('ac-select-checked-bag ac-per-journey-per-pax-mobile .b2-per-booking-next-price');
    var desktopCheckedBNext = document.querySelector('[data-test-id="baggage-per-booking-paid-illustration--c|CheckedBaggage"] .b2-add-another');
    //calculo nueva maleta//
    var priceElementNew = document.querySelector('[data-test-id="baggage-per-booking-next-price--c|CheckedBaggage"]');
    var priceElementPerPax = document.querySelector('[data-test-id="baggage-per-journey-per-pax-next-price--j|0-p|0-c|CheckedBaggage"]');

    var discountTextDesktop = `
    <div class="discountAmount" data-index="discountdesktopCheckedB">
    ${originalPrice}
    </div>
    `;

    var discountTextMobile = `
    <div class="discountAmount" data-index="discountmobileCheckedB">
    ${originalPrice}
    </div>
    `;

    var discountTextMobilePerPax = `
    <div class="discountAmount" data-index="discountMobilePerPaxCB">
    ${originalPrice}
    </div>
    `;

    //DESKTOP//
    if (originalPrice && desktopCheckedB && !document.querySelector(`[data-index="discountdesktopCheckedB"]`)) {
      desktopCheckedB.insertAdjacentHTML('beforebegin', discountTextDesktop);
    } else if (priceElementNew) {
      priceNew = parseInt(priceElementNew.getAttribute('data-test-value'));
      var originalPriceNewNoFormat = priceNew / (1 - discountPercentage / 100);
      var originalPriceNew = formatCurrencyValue(originalPriceNewNoFormat, currentCurrency);

      var discountTextDesktopNew = `
      <div class="discountAmount" data-index="discountdesktopCheckedBNew">
      ${originalPriceNew}
      </div>
      `;

      if (originalPriceNew && desktopCheckedBNext && !document.querySelector(`[data-index="discountdesktopCheckedBNew"]`)) {
        desktopCheckedBNext.insertAdjacentHTML('beforebegin', discountTextDesktopNew);
      } else if (document.querySelector(`[data-index="discountdesktopCheckedBNew"]`)) {
        var newDesktopChecked = document.querySelector(`[data-index="discountdesktopCheckedBNew"]`);
        priceNew = parseInt(priceElementNew.getAttribute('data-test-value'));
        var originalPriceNewNoFormat = priceNew / (1 - discountPercentage / 100);
        var originalPriceNew = formatCurrencyValue(originalPriceNewNoFormat, currentCurrency);
        newDesktopChecked.textContent = originalPriceNew;
      }
    }

    //MOBILE//
    if (originalPrice && mobileCheckedB && !document.querySelector(`[data-index="discountmobileCheckedB"]`)) {
      mobileCheckedB.insertAdjacentHTML('beforebegin', discountTextMobile);
    } else if (priceElementNew && document.querySelector(`[data-index="discountmobileCheckedB"]`)) {
      var newMobileCheked = document.querySelector(`[data-index="discountmobileCheckedB"]`);
      priceNew = parseInt(priceElementNew.getAttribute('data-test-value'));
      var originalPriceNewNoFormat = priceNew / (1 - discountPercentage / 100);
      var originalPriceNew = formatCurrencyValue(originalPriceNewNoFormat, currentCurrency);
      newMobileCheked.textContent = originalPriceNew;
    } else if (document.querySelector(`[data-index="discountmobileCheckedB"]`)) {
      var mobileCheked = document.querySelector(`[data-index="discountmobileCheckedB"]`);
      mobileCheked.textContent = originalPrice;
    }

    //MOBILE PER PAX//
    if (originalPrice && mobilePerPaxInsert && !document.querySelector(`[data-index="discountMobilePerPaxCB"]`)) {
      mobilePerPaxInsert.insertAdjacentHTML('beforebegin', discountTextMobilePerPax);
    } else if (priceElementPerPax && document.querySelector(`[data-index="discountMobilePerPaxCB"]`)) {
      var newMobileChekedPerPax = document.querySelector(`[data-index="discountMobilePerPaxCB"]`);
      priceNewPerPax = parseInt(priceElementPerPax.getAttribute('data-test-value'));
      var originalPriceNewPerPaxNoFormat = priceNewPerPax / (1 - discountPercentage / 100);
      var originalPriceNewPerPax = formatCurrencyValue(originalPriceNewPerPaxNoFormat, currentCurrency);
      newMobileChekedPerPax.textContent = originalPriceNewPerPax;
    }
  }

  function getCurrentCurrency() {
    const currencyElement = document.querySelector(".flight-currency-select");
    if (currencyElement) {
      return currencyElement.value;
    } else {
      const currencyElementAE = document.querySelector('[data-test-id="sidebar-total-currency"]');
      return currencyElementAE.textContent.trim();
    }
  }

  function formatCurrencyValue(value, currency) {
    switch (currency) {
      case "CLP":
        return "$" + value.toLocaleString("es-CL", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });
      case "BRL":
        return "R$" + value.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      case "COP":
        return "$" + value.toLocaleString();
      case "PEN":
        return "+ S/" + value.toLocaleString("es-PE", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      case "USD":
        return "$" + value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      case "ARS":
        return "$" + value.toLocaleString("es-AR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      default:
        return "" + value.toString();
    }
  }
  function deleteLineThrough() {
    var elementos = document.querySelectorAll('.line-through');
    var otherelements = document.querySelectorAll('.b2-per-booking-next-price.original-price.non-breaking-price')

    if (elementos.length > 0) {
      var elementosArray = Array.from(elementos);
      elementosArray.forEach(function (elemento) {
        elemento.remove();
      });
    }

    if (otherelements.length > 0) {
      var otherelementsArray = Array.from(otherelements);
      otherelementsArray.forEach(function (otherelement) {
        otherelement.remove();
      });
    }
  }

  function clickButton1(cabinBaggageDiscount) {
    var button = document.querySelector('[data-test-id="baggage-open-per-journey-per-pax-view-button--c|CabinBaggage-m|1"]');
    if (button) {
      button.addEventListener('click', function () {
        addDiscountTitleCabinBaggage(cabinBaggageDiscount);
        addDiscountAmountCabinBaggage(cabinBaggageDiscount);
        clickButton2(cabinBaggageDiscount);

      });
    }
  }

  function clickButton2(cabinBaggageDiscount) {
    var button = document.querySelector('[data-test-id="baggage-close-per-journey-per-pax-view-button--c|CabinBaggage-m|1"]');
    if (button) {
      button.addEventListener('click', function () {
        addDiscountTitleCabinBaggage(cabinBaggageDiscount);
        addDiscountAmountCabinBaggage(cabinBaggageDiscount);
        clickButton1(cabinBaggageDiscount);
      });
    }
  }

  function clickButton3(checkedBaggageDiscount) {
    var button = document.querySelector('[data-test-id="baggage-open-per-journey-per-pax-view-button--c|CheckedBaggage-m|1"]');
    if (button) {
      button.addEventListener('click', function () {
        addDiscountTitleCheckedBaggage(checkedBaggageDiscount);
        addDiscountAmountCheckedBaggage(checkedBaggageDiscount);
        clickButton4(checkedBaggageDiscount);

      });
    }
  }

  function clickButton4(checkedBaggageDiscount) {
    var button = document.querySelector('[data-test-id="baggage-close-per-journey-per-pax-view-button--c|CheckedBaggage-m|1"]');
    if (button) {
      button.addEventListener('click', function () {
        addDiscountTitleCheckedBaggage(checkedBaggageDiscount);
        addDiscountAmountCheckedBaggage(checkedBaggageDiscount);
        clickButton3(checkedBaggageDiscount);
      });
    }
  }

  function discountCabinAndChecked(cabinBaggageDiscount, checkedBaggageDiscount) {
    deleteLineThrough();
    addDiscountTitleCabinBaggage(cabinBaggageDiscount);
    addDiscountAmountCabinBaggage(cabinBaggageDiscount);
    clickButton1(cabinBaggageDiscount);
    addDiscountTitleCheckedBaggage(checkedBaggageDiscount);
    addDiscountAmountCheckedBaggage(checkedBaggageDiscount);
    clickButton3(checkedBaggageDiscount);
  }



  function discountCabin(cabinBaggageDiscount) {
    deleteLineThrough();
    addDiscountTitleCabinBaggage(cabinBaggageDiscount);
    addDiscountAmountCabinBaggage(cabinBaggageDiscount);
    clickButton1(cabinBaggageDiscount);
  }


  function discountChecked(checkedBaggageDiscount) {
    deleteLineThrough();
    addDiscountTitleCheckedBaggage(checkedBaggageDiscount);
    addDiscountAmountCheckedBaggage(checkedBaggageDiscount);
    clickButton3(checkedBaggageDiscount);
  }

  // aquí ir agregando por mas if con las condiciones de cada evento si es que aplica
  // PROMO PE 10/07
  if (culture == 'es-PE' && currentCurrency && memberRole === 'WWW Member' && checkDCMembership && checkFecha('2023/08/10 00:00:00', '2023/12/15 00:00:00') && domesticPE() && !postBooking) { //agregar checkFecha() para fechas de vuelos
    const cabinBaggageDiscount = 50; // descuento cabin
    const checkedBaggageDiscount = 50; // descuento checked
    const currentCurrency = getCurrentCurrency();
    addCSS();
    discountChecked(checkedBaggageDiscount);
    discountCabin(cabinBaggageDiscount);

    window.eventBus.subscribe({
      name: "DISCOUNTBAGGAGE",
      callback: function (e) {
            discountChecked(checkedBaggageDiscount);
            discountCabin(cabinBaggageDiscount);  
          } 
    });
  }
}, 600);