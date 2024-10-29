var initHorizontalPaymentButtons = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/payment') return;
  clearInterval(initHorizontalPaymentButtons);

  var culture = bookingData.Culture;
  var bancoEstado = JetSmart.AppContext.bancoEstadoCategory;

  function createShowMoreButton() {
    switch (culture) {
    case 'en-US':
      text = 'Change payment method';
      break;
    case 'pt-BR':
      text = 'Mudar método de pagamento';
      break;
    default:
      text = 'Cambiar método de pago';
      break;
    }

    var buttonsContainer = document.querySelector('.buttons-container');
    var showMoreButton = createButton('js-icon js-circle-chevron-right scroll-left-icon', text, 'show-more-button');
    showMoreButton.addEventListener('click', showAllButtons);
    showMoreButton.style.display = 'none';
    buttonsContainer.appendChild(showMoreButton);
  }

  function moveShowMoreButtonToEnd() {
    var buttonsContainer = document.querySelector('.buttons-container');
    var showMoreButton = document.getElementById('show-more-button');
    if (showMoreButton) {
      buttonsContainer.appendChild(showMoreButton);
    }
  }

  function hideOriginalButtons() {
    var buttons = document.querySelector('.tabs.ts-error-parent ul');
    if (buttons) {
      buttons.style.display = 'none';
    }
  }

  function createButton(image, text, testId) {
    var button = document.createElement('div');
    button.className = 'horizontal-button';
    button.id = testId;

    var imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';

    if (image.startsWith('js-icon')) {
      var icon = document.createElement('i');
      icon.className = image;
      imageContainer.appendChild(icon);
    } else {
      var img = document.createElement('img');
      img.src = image;
      imageContainer.appendChild(img);
    }

    var textContainer = document.createElement('div');
    textContainer.className = 'text-container';
    textContainer.textContent = text;

    button.appendChild(imageContainer);
    button.appendChild(textContainer);

    return button;
  }

  function getPaymentMethods() {
    var paymentMethods = [];

    const paymentMethodItems = document.querySelectorAll('ac-payment-method-selector li');

    paymentMethodItems.forEach(function(item) {
      var name = item.querySelector('span').innerText.trim();
      if (name === '') {
        const nameElement = item.querySelector('label span:last-of-type'); // Get the last <span> element inside <label>
        name = nameElement.innerText.trim();
      }
      const image = item.querySelector('img').getAttribute('src');
      const testId = item.querySelector('label').getAttribute('data-test-id');

      paymentMethods.push({ imageUrl: image, text: name, testId: testId });
    });

    return paymentMethods;
  }

  function checkPaymentMethods() {
    var paymentMethods = getPaymentMethods();
    var buttonsContainer = document.querySelector('.buttons-container');
    var buttons = buttonsContainer.querySelectorAll('.horizontal-button');

    var showMoreButton = document.getElementById('show-more-button');

    buttons.forEach(function(button) {
      var testId = button.id;

      if (testId === 'show-more-button') {
        return;
      }

      var isExisting = paymentMethods.some(function(paymentMethod) {
        return paymentMethod.testId === testId;
      });

      if (!isExisting) {
        button.remove();
      }
    });

    paymentMethods.forEach(function(paymentMethod) {
      var existingButton = document.getElementById(paymentMethod.testId);
      var isExisting = existingButton !== null;

      if (isExisting && !buttonsContainer.contains(existingButton)) {
        buttonsContainer.appendChild(existingButton);
      } else if (!isExisting) {
        var button = createButton(paymentMethod.imageUrl, paymentMethod.text, paymentMethod.testId);
        button.addEventListener('click', selectButton);
        buttonsContainer.appendChild(button);
      }
    });

    if (showMoreButton && showMoreButton.style.display === 'flex') {
      showMoreButton.style.display = 'flex';
      showMoreButton.addEventListener('click', showAllButtons);
    }

    moveShowMoreButtonToEnd();
  }

  function addButtons() {
    var container = document.querySelector('.tabs.ts-error-parent');
    var buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container';

    var paymentMethods = getPaymentMethods();

    paymentMethods.forEach(function(paymentMethod) {
      var button = createButton(paymentMethod.imageUrl, paymentMethod.text, paymentMethod.testId);
      button.addEventListener('click', selectButton);
      buttonsContainer.appendChild(button);
    });

    container.prepend(buttonsContainer);
  }

  function selectButton(event) {
    var selectedButton = event.target.closest('.horizontal-button');
    if (selectedButton) {
      var allButtons = document.querySelectorAll('.buttons-container .horizontal-button');
      allButtons.forEach(function(button) {
        if (button === selectedButton) {
          button.style.display = 'flex';
          button.classList.add('selected');
        } else if (button.id === 'show-more-button') {
          button.style.display = 'flex';
        } else {
          button.style.display = 'none';
          button.classList.remove('selected');
        }
      });
      var showMoreButton = document.querySelector('.buttons-container #show-more-button');
      showMoreButton.style.display = 'flex';
    }
  }

  function showAllButtons(event) {
    var allButtons = document.querySelectorAll('.buttons-container .horizontal-button');
    allButtons.forEach(function(button) {
      button.style.display = 'flex';
    });
    var showMoreButton = event.target.closest('.horizontal-button');
    showMoreButton.style.display = 'none';
  }

  function clicksContainer() {
    var buttonsContainer = document.querySelector('.buttons-container')
    buttonsContainer.addEventListener('click', function(event) {
      var button = event.target.closest('.horizontal-button');
      if (button) {
        var testId = button.id;
        var originalButton = document.querySelector('[data-test-id="' + testId + '"]');
        if (originalButton) {
          originalButton.click();
          setTimeout(function() {
            var scrollLocation = document.querySelector('ac-input-currency');
            if (scrollLocation) {
              scrollLocation.scrollIntoView({ behavior: 'smooth'});
            }
          }, 200);
        }
      }
    });
  }

  function moveGC() {
    var gcbox = document.querySelector('.giftcard-wrapper');
    var newButtons = document.querySelector('.buttons-container');
    var innerDeepBox = document.querySelector('#payment_ .inner-deep-box');
    var icongc = document.querySelector('.giftcard-wrapper .open-icon');

    if (gcbox && newButtons && innerDeepBox) {
      innerDeepBox.style.display = 'none';
      if (icongc) {
        icongc.style.display = 'none';
      }

      var parentContainer = document.querySelector('.tabs.ts-error-parent');
      var siblingElement = newButtons.nextElementSibling;
      parentContainer.insertBefore(gcbox, siblingElement);
    }
  }

  function moveNGC() {
    var gcbox = document.querySelector('.new-giftcard-wrapper');
    var newButtons = document.querySelector('.buttons-container');
    var innerDeepBox = document.querySelector('#payment_ .inner-deep-box');
    var icongc = document.querySelector('.giftcard-wrapper .open-icon');

    if (gcbox && newButtons && innerDeepBox) {
      innerDeepBox.style.display = 'none';
      if (icongc) {
        icongc.style.display = 'none';
      }

      var parentContainer = document.querySelector('.tabs.ts-error-parent');
      var siblingElement = newButtons.nextElementSibling;
      parentContainer.insertBefore(gcbox, siblingElement);
    }
  }

  function clickChangeCountry() {
    var changeCountry = document.querySelector('ac-input-issuer-country');
    if (changeCountry) {
      changeCountry.addEventListener('click', function() {
        var currentCountryValue = document.querySelector('[data-test-id="payment-card-issuer-country"]').value;

        if (previousCountryValue === null) {
          console.log("No");
        } else if (currentCountryValue === previousCountryValue) {
          console.log("No");
        } else {
          console.log("Sí");
          var buttons = document.querySelectorAll('.buttons-container .horizontal-button');
          buttons.forEach(function(button) {
            button.classList.remove('selected');
          });

          var showMoreButton = document.getElementById('show-more-button');
          if (showMoreButton && showMoreButton.style.display === 'flex') {
            showMoreButton.click();
          }
        }

        previousCountryValue = currentCountryValue;
        checkPaymentMethods();
      });
    }
  }

  function addCSS() {
    var css = `
    .tabs.ts-error-parent {
      text-align: center;
    }

    .buttons-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: 0 auto;
    }

    .horizontal-button {
      flex-basis: 48%;
      text-align: center;
      padding: 4px;
      background-color: #ffff;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      border-radius: 10px;
      border: 2px solid #ccc;
      cursor: pointer;
    }

    .horizontal-button:hover {
      border: 2px solid #163a70;
    }

    .horizontal-button.selected {
      border: 2px solid #163a70 !important;
    }

    .image-container {
      margin-right: 10px;
    }

    .horizontal-button img {
      max-width: 100px;
      vertical-align: middle;
    }

    .text-container {
      text-align: left;
      word-wrap: break-word;
      white-space: pre-wrap;
      color: #163a70;
      font-weight: 600;
    }

    .giftcard-wrapper {
      border: 2px solid #ccc !important;
      border-radius: 10px !important;
      padding: 6px !important;
    }

    .giftcard-wrapper:hover {
      border: 2px solid #163a70 !important;
    }

    .new-giftcard-wrapper {
      border: 2px solid #ccc !important;
      border-radius: 10px !important;
      padding: 6px !important;
    }

    .new-giftcard-wrapper:hover {
      border: 2px solid #163a70 !important;
    }

    #show-more-button .js-icon {
      font-size: 50px;
      color: #ccc;
    }

    #show-more-button:hover .js-icon {
      color: #163a70;
    }

    @media (max-width: 767px) {
      .horizontal-button {
        flex-basis: 100%;
      }
    }
  }`;

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');

  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  head.appendChild(style);
}

if (bancoEstado === '0') {
  var previousCountryValue = null; // Variable global para almacenar los valores previos del país seleccionado
  addCSS();
  hideOriginalButtons();
  addButtons();
  createShowMoreButton();
  clicksContainer();
  moveGC();
  moveNGC();
  clickChangeCountry();
}

}, 600);