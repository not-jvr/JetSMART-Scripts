var initCheckBox = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/baggage') return;
  clearInterval(initCheckBox);

  var vuelta = bookingData.ReturnJourney;
  var culture = bookingData.Culture;
  var countAdult = bookingData.PassengersAdultCount;
  var countChild = bookingData.PassengersChildCount;
  var countTotal = countChild + countAdult;
  var bundleIda = bookingData.OutboundBundleCode;
  var bundleVuelta = bookingData.ReturnBundleCode;

  function getMessage(culture, vuelta, countTotal) {
    const messages = {
      "es": {
        "samePassengers": "Selecciono lo mismo para todos los pasajeros.",
        "bothFlightsPassengers": "Selecciono lo mismo para ambos vuelos y pasajeros.",
        "bothFlights": "Selecciono lo mismo para ambos vuelos."
      },
      "en-US": {
        "samePassengers": "Select the same for all passengers.",
        "bothFlightsPassengers": "Select the same for both flights and passengers.",
        "bothFlights": "Select the same for both flights."
      },
      "pt-BR": {
        "samePassengers": "Selecionar o mesmo para todos os passageiros.",
        "bothFlightsPassengers": "Selecionar o mesmo para ambos os voos e passageiros.",
        "bothFlights": "Selecionar o mesmo para ambos os voos."
      }
    };

    let message;

    if (culture.startsWith("es-")) {
      culture = "es";
    }

    if (vuelta === null && countTotal > 1) {
      message = messages[culture].samePassengers;
    } else if (vuelta !== null && countTotal > 1) {
      message = messages[culture].bothFlightsPassengers;
    } else {
      message = messages[culture].bothFlights;
    }

    return message;
  }

  function addCSS() {
    var css = `
    .checkbox-container {
      display: flex;
      align-items: center;
      padding-left: 18px;
    }

    .checkbox-text {
      color: #1c355e;
      display: flex;
      position: relative;
      line-height: 30px;
      align-items: center;
      margin: 10px;
      margin-left: 10px;
    }

    .checkmark {
      display: inline-block;
      width: 20px;
      height: 20px;
      background-color: #eee;
      border: 2px solid #1c355e;
      position: relative;
    }

    .checkmark-icon {
      content: "";
      position: absolute;
      display: block;
      left: 6px;
      top: -7px;
      width: 10px;
      height: 25px;
      border: solid #00abc8;
      border-width: 0 5px 5px 0;
      transform: rotate(45deg);
    }

    header.b2-section-header {
      margin-bottom: 0px;
    }

    @media (max-width: 768px) {
      .checkbox-text {
        font-size: 12px;
      }

      .checkmark {
        width: 14px;
        height: 14px;
      }

      .checkmark-icon {
        left: 4px;
        top: -5px;
        width: 6px;
        height: 18px;
        border-width: 0 4px 4px 0;
      }
    }
    `;

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    head.appendChild(style);
    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

  }

  function checkBox(selector, num) {
    var checkboxId = 'checkBothWays' + num;
    if(!document.querySelector('#' + checkboxId)){
      var container = document.querySelector(selector);
      var newElement = document.createElement('div');
      var mensaje = getMessage(culture, vuelta, countTotal);

      newElement.id = checkboxId;
      newElement.innerHTML = `
      <label class="checkbox-container">
      <span class="checkmark-box"><span class="checkmark"><span class="checkmark-icon" data-num="${num}"></span></span></span>
      <span class="checkbox-text">${mensaje}</span>
      </label>
      `;

      var nextElement = container.nextSibling;

      container.parentNode.insertBefore(newElement, nextElement);
    }

    //// fuerzo el display al check

    if(document.querySelector(".checkmark-icon[data-num='1']")){
      document.querySelector(".checkmark-icon[data-num='1']").style.display = 'block'
    }
    if(document.querySelector(".checkmark-icon[data-num='2']")){
      document.querySelector(".checkmark-icon[data-num='2']").style.display = 'block'
    }
    if(document.querySelector(".checkmark-icon[data-num='3']")){
      document.querySelector(".checkmark-icon[data-num='3']").style.display = 'block'
    }
    if(document.querySelector(".checkmark-icon[data-num='4']")){
      document.querySelector(".checkmark-icon[data-num='4']").style.display = 'block'
    }

  }

  function toggleBaggageSelection(element, openButton, closeButton, checkmarkIcon) {
    element.addEventListener('click', function() {
      if (checkmarkIcon.style.display === 'block') {
        openButton.click();
      } else {
        closeButton.click();
      }
    });
  }

  function handleCheckboxClickPC(num) {
    var checkbox = document.querySelector('#checkBothWays' + num);

    switch (num) {
    case 1:
      var openCabinBaggageButton = document.querySelector("[data-test-id='baggage-open-per-journey-per-pax-view-button--c|CabinBaggage']");
      var closeCabinBaggageButton = document.querySelector("[data-test-id='baggage-close-per-journey-per-pax-view-button--c|CabinBaggage']");
      break;
    case 2:
      var openCabinBaggageButton = document.querySelector("[data-test-id='baggage-open-per-journey-per-pax-view-button--c|CheckedBaggage']");
      var closeCabinBaggageButton = document.querySelector("[data-test-id='baggage-close-per-journey-per-pax-view-button--c|CheckedBaggage']");
      break;
    }

    if (checkbox) {
      var checkmarkIcon = document.querySelector(".checkmark-icon[data-num='" + num + "']");
      toggleBaggageSelection(checkbox, openCabinBaggageButton, closeCabinBaggageButton, checkmarkIcon);
    }

    if (openCabinBaggageButton && closeCabinBaggageButton) {
      openCabinBaggageButton.addEventListener('click', function() {
        var checkmarkIcon = document.querySelector(".checkmark-icon[data-num='" + num + "']");
        if (checkmarkIcon) {
          checkmarkIcon.style.display = 'none';
        }
      });
      closeCabinBaggageButton.addEventListener('click', function() {
        var checkmarkIcon = document.querySelector(".checkmark-icon[data-num='" + num + "']");
        if (checkmarkIcon) {
          checkmarkIcon.style.display = 'block';
        }
      });
    }
  }
  
  function selectBaggage() {
    var button1 = document.querySelector('[data-test-id="baggage-per-booking-free-illustration--c|CabinBaggage"]');
    var button1second = document.querySelector('[data-test-id="baggage-per-booking-free-illustration--c|CabinBaggage"] .b2-secondary-button');
    var button2 = document.querySelector('[data-test-id="baggage-per-booking-paid-illustration--c|CabinBaggage"]');
    var button2second = document.querySelector('[data-test-id="baggage-per-booking-paid-illustration--c|CabinBaggage"] .b2-primary-button');
    var button3 = document.querySelector('[data-test-id="baggage-per-booking-free-illustration--c|CheckedBaggage"]');
    var button3second = document.querySelector('[data-test-id="baggage-per-booking-free-illustration--c|CheckedBaggage"] .b2-secondary-button');
    var button4 = document.querySelector('[data-test-id="baggage-per-booking-paid-illustration--c|CheckedBaggage"]');
    var button4second = document.querySelector('[data-test-id="baggage-per-booking-paid-illustration--c|CheckedBaggage"] .b2-primary-button');

    button1.addEventListener('click', function() {
      var isCheckbox1Created = document.querySelector('#checkBothWays1');
      if (!isCheckbox1Created) {
        console.log("gola")
        checkBox("[data-test-id='baggage-page-section-dt--c|CabinBaggage']", 1);
        handleCheckboxClickPC(1);
      }
    });

    button1second.addEventListener('click', function() {
      var isCheckbox1Created = document.querySelector('#checkBothWays1');
      if (!isCheckbox1Created) {
        console.log("gola")
        checkBox("[data-test-id='baggage-page-section-dt--c|CabinBaggage']", 1);
        handleCheckboxClickPC(1);
      }
    });

    button2.addEventListener('click', function() {
      var isCheckbox1Created = document.querySelector('#checkBothWays1');
      if (!isCheckbox1Created) {
        checkBox("[data-test-id='baggage-page-section-dt--c|CabinBaggage']", 1);
        handleCheckboxClickPC(1);
      }
    });

    button2second.addEventListener('click', function() {
      var isCheckbox1Created = document.querySelector('#checkBothWays1');
      if (!isCheckbox1Created) {
        checkBox("[data-test-id='baggage-page-section-dt--c|CabinBaggage']", 1);
        handleCheckboxClickPC(1);
      }
    });

    button3.addEventListener('click', function() {
      var isCheckbox2Created = document.querySelector('#checkBothWays2');
      if (!isCheckbox2Created) {
        checkBox("[data-test-id='baggage-page-section-dt--c|CheckedBaggage']", 2);
        handleCheckboxClickPC(2);
      }
    });

    button3second.addEventListener('click', function() {
      var isCheckbox2Created = document.querySelector('#checkBothWays2');
      if (!isCheckbox2Created) {
        checkBox("[data-test-id='baggage-page-section-dt--c|CheckedBaggage']", 2);
        handleCheckboxClickPC(2);
      }
    });

    button4.addEventListener('click', function() {
      var isCheckbox2Created = document.querySelector('#checkBothWays2');
      if (!isCheckbox2Created) {
        checkBox("[data-test-id='baggage-page-section-dt--c|CheckedBaggage']", 2);
        handleCheckboxClickPC(2);
      }
    });

    button4second.addEventListener('click', function() {
      var isCheckbox2Created = document.querySelector('#checkBothWays2');
      if (!isCheckbox2Created) {
        checkBox("[data-test-id='baggage-page-section-dt--c|CheckedBaggage']", 2);
        handleCheckboxClickPC(2);
      }
    });
  }

  if(bundleIda === null && bundleVuelta === null && window.innerWidth >= 768){
    if(vuelta === null && countTotal>1){
      addCSS();
      selectBaggage()       
    }
    if(vuelta !== null){
      addCSS();
      selectBaggage()       
    }
  }

}, 600);