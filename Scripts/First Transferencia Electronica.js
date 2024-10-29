var initPaymentFirst = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/payment') return;
  clearInterval(initPaymentFirst);

  var culture = bookingData.Culture;

  function moveFirst() {
    var button = document.querySelector('label[for="payment_tab_ST"]').parentNode;
    var buttonInput = document.querySelector('input#payment_tab_ST');
    var container = document.querySelector('.inner-deep-box .tabs.ts-error-parent nav ul');
    if (button && buttonInput && container) {
      container.insertBefore(button, container.firstChild);
      container.insertBefore(buttonInput, container.firstChild);
    }
  }

  function allShow() {
    var ulElement = document.querySelector('.inner-deep-box .tabs.ts-error-parent nav ul');

    var labelElements = ulElement.querySelectorAll('label');

    labelElements.forEach((label) => {
      if (window.innerWidth >= 768) {
        label.parentNode.style.display = 'inline-block';
      } else if (window.innerWidth < 768) {
        label.parentNode.style.display = 'block';
      }
    });
  }

  function hideSecondButton() {
    var buttons = document.querySelectorAll('label[for="payment_tab_ST"]');
    allShow();
    if (buttons.length > 1) {
      buttons[1].parentNode.style.display = 'none';
    }
  }

  function clickChangeCountry() {
    var countryContainer = document.querySelector('.tabs.ts-error-parent .ts-error-parent');
    if (countryContainer) {
      countryContainer.addEventListener('click', function () {
        moveFirst();
        hideSecondButton();
      });
    }
  }

  if (culture === 'es-CL' && document.querySelector('label[for="payment_tab_ST"]')) {
    moveFirst();
    hideSecondButton();
    clickChangeCountry();
  }
}, 600);