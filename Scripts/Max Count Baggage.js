var initMaxBaggage = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/baggage') return;
  clearInterval(initMaxBaggage);

  var culture = bookingData.Culture;

  function editTooltip(selector, num, index) {
    const tooltips = document.querySelectorAll(selector);
    const tooltip = tooltips[index];
    if (tooltip && !tooltip.hasAttribute('data-custom-flag')) {
      const additionalText = document.createElement('span');
      let message;

      switch (culture) {
        case 'pt-BR':
          message = `Máximo ${num} por pessoa`;
          break;
        case 'en-US':
          message = `Maximum ${num} per person`;
          break;
        default:
          message = `Máximo ${num} por persona`;
          break;
      }

      additionalText.textContent = message;
      tooltip.appendChild(additionalText);
      tooltip.setAttribute('data-custom-flag', true);
    }
  }

  function addMobileMaxCount(selector, num, index) {
    var elements = document.querySelectorAll(selector);
    var element = elements[index];
    if (element && !element.querySelector('br')) {
      var newTextElement = document.createTextNode('');
      var lineBreakElement = document.createElement('br');
      element.appendChild(lineBreakElement);

      switch (culture) {
        case 'pt-BR':
          newTextElement.textContent = `\nMáximo ${num} por pessoa`;
          break;
        case 'en-US':
          newTextElement.textContent = `\nMaximum ${num} per person`;
          break;
        default:
          newTextElement.textContent = `\nMáximo ${num} por persona`;
          break;
      }

      element.appendChild(newTextElement);
    }
  }

  function addCSS() {
    var existingStyle = document.querySelector('#custom-style');
    if (existingStyle) {
      return;
    }

    var css = `
      @media (min-width: 768px) {
        [data-test-id="baggage-backpack-tooltip"] span:last-child {
          font-weight: bold;
          font-size: 12px;
          top: 90%;
          right: 3%
        }

        [data-test-id="baggage-regular-bag-tooltip"] span:last-child {
          font-weight: bold;
          font-size: 12px;
          top: 90%;
          right: 3%
        }

        [data-test-id="baggage-zipped-bag-tooltip"] span:last-child {
          font-weight: bold;
          font-size: 12px;
          top: 89%;
          left: 35%;
        }
      }
    `;

    var style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'custom-style';
    style.appendChild(document.createTextNode(css));

    var head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(style);
  }

  function clickButton1() {
    var button = document.querySelector('[data-test-id="baggage-open-per-journey-per-pax-view-button--c|CabinBaggage-m|1"]');
    if (button) {
      button.addEventListener('click', function () {
        addMobileMaxCount('.b2m-pax-amount', 1, 0);
        clickButton2();
      });
    }
  }

  function clickButton2() {
    var button = document.querySelector('[data-test-id="baggage-close-per-journey-per-pax-view-button--c|CabinBaggage-m|1"]');
    if (button) {
      button.addEventListener('click', function () {
        addMobileMaxCount('.b2m-pax-amount', 1, 0);
        clickButton1();
      });
    }
  }

  function clickButton3() {
    var button = document.querySelector('[data-test-id="baggage-open-per-journey-per-pax-view-button--c|CheckedBaggage-m|1"]');
    if (button) {
      button.addEventListener('click', function () {
        addMobileMaxCount('.b2m-pax-amount', 5, 1);
        clickButton4();
      });
    }
  }

  function clickButton4() {
    var button = document.querySelector('[data-test-id="baggage-close-per-journey-per-pax-view-button--c|CheckedBaggage-m|1"]');
    if (button) {
      button.addEventListener('click', function () {
        addMobileMaxCount('.b2m-pax-amount', 5, 1);
        clickButton3();
      });
    }
  }

  function allFunctions() {
    editTooltip('[data-test-id="baggage-backpack-tooltip"]', 1, 0);
    editTooltip('[data-test-id="baggage-backpack-tooltip"]', 1, 1);
    editTooltip('[data-test-id="baggage-regular-bag-tooltip"]', 1, 0);
    editTooltip('[data-test-id="baggage-zipped-bag-tooltip"]', 5, 0);
    addMobileMaxCount('.b2m-pax-amount', 1, 0);
    addMobileMaxCount('.b2m-pax-amount', 5, 1);
    clickButton1();
    clickButton3();
  }

  if (culture) {
    addCSS();
    allFunctions();
  }
}, 600);