var initHidePaymentsMethods = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/payment') return;
  clearInterval(initHidePaymentsMethods);
  var culture = bookingData.Culture;

  function addCSS() {
    var css = `
    #newIcon {
        font-size: 28px;
        vertical-align: middle;
        display: inline-block;
        margin-left: 10px;
    }

    .paymentsMethodsCointainer {
        text-align: center;
        color: #59c3d9;
        margin: 20px 0 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .buttonContainer {
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .buttonContainer:hover .containerText {
        text-decoration: underline;
    }

    .containerText {
        font-weight: 600;
    }
    `;

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    head.appendChild(style);
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
}

function addButton() {
    if (!document.querySelector('.paymentsMethodsCointainer')) {
        var navElement = document.querySelector('.tabs.ts-error-parent nav');
        var nuevoDiv = document.createElement('div');
        nuevoDiv.classList.add('paymentsMethodsCointainer');

        var innerHTML = `
        <div class="buttonContainer">
        <div class="containerText" id="showMorePaymentMethods">
        Mostrar más métodos de pago
        </div>
        <i class="js-circle-chevron-right js-icon" id="newIcon"></i>
        </div>
        `;

        nuevoDiv.innerHTML = innerHTML;

        navElement.insertAdjacentElement('afterend', nuevoDiv);
    }
    
}

function clickButton(selectors) {
    var showMoreButton = document.querySelector('#showMorePaymentMethods');
    var icon = document.querySelector('#newIcon');
    var containerButton = document.querySelector('.buttonContainer');

    var isRotated = false;
    var isExpanded = false;

    containerButton.addEventListener('click', function () {
        isRotated = !isRotated;
        isExpanded = !isExpanded;

        showMoreButton.textContent = isExpanded ? 'Mostrar menos métodos de pago' : 'Mostrar más métodos de pago';

        icon.style.transition = 'transform 0.3s ease-in-out';
        icon.style.transform = isRotated ? 'rotate(180deg)' : 'rotate(0deg)';

        if (isExpanded) {
            showElements(selectors);
        } else {
            hideElements(selectors);
        }
    });
}

function hideElements(selectors) {
    for (var i = 0; i < selectors.length; i++) {
        var payment = document.querySelector(selectors[i]);
        if (payment) {
            payment.parentNode.style.display = 'none';
        }
    }
}

function showElements(selectors) {
    for (var i = 0; i < selectors.length; i++) {
        var payment = document.querySelector(selectors[i]);
        if (payment) {
            payment.parentNode.style.display = '';
        }
    }
}

function deleteHideChangeCountry() {
    var paymentMethodSelector = document.querySelector('ac-payment-method-selector');

    var hiddenLiElements = paymentMethodSelector.querySelectorAll('li[style="display: none;"]');

    hiddenLiElements.forEach(function(liElement) {
      liElement.style.display = '';
  });
}

function customButton(selectors) {
    var paymentsMethodsCointainer = document.querySelector('.paymentsMethodsCointainer');

    if (paymentsMethodsCointainer) {
        var displayStyle = "none";

        for (var i = 0; i < selectors.length; i++) {
            var payment = document.querySelector(selectors[i]);
            if (payment) {
                displayStyle = "flex";
                break;
            }
        }
        paymentsMethodsCointainer.style.display = displayStyle;
    }
}

function fakeClick() {
    var showMoreButton = document.querySelector('#showMorePaymentMethods');
    if (showMoreButton.textContent === 'Mostrar más métodos de pago') {
        showMoreButton.click();
    }
}

function clickChangeCountry(selectors) {
    var changeCountry = document.querySelector('ac-input-issuer-country');
    if (changeCountry) {
      changeCountry.addEventListener('click', function() {
        var currentCountryValue = document.querySelector('[data-test-id="payment-card-issuer-country"]').value;

        if (previousCountryValue === null) {
          console.log("No");
      } else if (currentCountryValue === previousCountryValue) {
          console.log("No");
      } else {
        fakeClick();
        deleteHideChangeCountry();
        customButton(selectors);
        console.log("Sí");
    }
    previousCountryValue = currentCountryValue;
});
  }
}

function allFunctions(selectors) {
    addButton();
    clickButton(selectors);
    hideElements(selectors);
    clickChangeCountry(selectors);
}
var previousCountryValue = null; // Variable global para almacenar los valores previos del país seleccionado
var paymentMethods = [ //METODOS DE PAGO PARA ESCONDER
    '[data-test-id="payment-method-selector-icon-label--c|TC"]',
    '[data-test-id="payment-method-selector-icon-label--c|BE"]'
    ];

if (culture === 'es-CL') {
    addCSS();
    allFunctions(paymentMethods);
}

}, 600);