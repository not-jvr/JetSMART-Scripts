var initRefund = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/flight') return;
  clearInterval(initRefund);

  var culture = bookingData.Culture;

  function addCSS() {
    var css = `
    [data-test-id="bundle-selector-option--j|0-c|full"] .desc-bundle {
      margin: 10px auto !important;
    }

    [data-test-id="bundle-selector-option--j|1-c|full"] .desc-bundle {
      margin: 10px auto !important;
    }
    `;
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');
    head.appendChild(style);
    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  function addRefund(selector) {
    var targetElement = document.querySelector(selector);
    if (targetElement) {
      var existingElement = targetElement.querySelector('#refundFULL');
      if (existingElement) {
      existingElement.remove(); // Elimina el elemento existente si lo encuentra
    }

    var newElementHTML = `
    <li class=" " id="refundFULL">
    <div class="ssr-line">
    <i class="js-icon-bundle js-bundle-flexi-smart-no-border"></i>

    <div class="ssr-line-name" data-test-value="1">Devolución total</div>
    <div class="bundle-tooltip">
    <i class="js-icon-bundle js-bundle-flexi-smart-no-border"></i>
    <div class="bundle-tooltip-text">
    <h3>Devolución total</h3>
    <div>
    ¡Ahora tus pasajes con devolución total!.
    </div>
    </div>
    </div>
    <div class="bundle-tooltip">
    <i class="js-icon-bundle js-bundle-flexi-smart-no-border"></i>
    <div class="bundle-tooltip-text">
    <h3>Devolución total</h3>
    <div>
    ¡Ahora tus pasajes con devolución total!
    </div>
    </div>
    </div>
    </div>

    <i class="js-icon js-flight-tick" data-test-id="bundle-ssr-tick--j|0-i|0"></i>
    </li>
    `;

    targetElement.insertAdjacentHTML('afterbegin', newElementHTML);
  }
}

function addRefund2(selector) {
  var targetElement = document.querySelector(selector);
  if (targetElement) {
    var existingElement = targetElement.querySelector('#refundFULL');
    if (existingElement) {
      existingElement.remove(); // Elimina el elemento existente si lo encuentra
    }

    var newElementHTML = `
    <li class=" " id="refundFULL">
    <div class="ssr-line">
    <i class="js-icon-bundle js-bundle-flexi-smart-no-border"></i>

    <div class="ssr-line-name" data-test-value="1">Devolución total</div>
    </div>

    <i class="js-icon js-flight-tick" data-test-id="bundle-ssr-tick--j|0-i|0"></i>
    </li>
    `.trim();



    var tempElement = document.createElement('div');
    tempElement.innerHTML = newElementHTML;

    targetElement.insertBefore(tempElement.firstChild, targetElement.firstChild);
  }
  
}

function removeSmartTicket() {
  var bundleElements = document.querySelectorAll('[data-test-value="Full"] ac-bundle-ssr-items .hidden-xs.selected-bundle li[data-test-value="1"]');

  bundleElements.forEach(function(element) {
    var ssrLineName = element.querySelector('.ssr-line-name');
    if (ssrLineName && ssrLineName.textContent.includes('SMARTICKET')) {
      element.remove();
    }
  });

}

function allFunctions() {
  addRefund('[data-test-value="BND2"] [data-test-id="bundle-ssrs--j|0-c|full"]');
  addRefund('[data-test-value="BND2"] [data-test-id="bundle-ssrs--j|1-c|full"]');
  addRefund('[data-test-value="BNC2"] [data-test-id="bundle-ssrs--j|0-c|full"]');
  addRefund('[data-test-value="BNC2"] [data-test-id="bundle-ssrs--j|1-c|full"]');
  addRefund('[data-test-value="BNB2"] [data-test-id="bundle-ssrs--j|0-c|full"]');
  addRefund('[data-test-value="BNB2"] [data-test-id="bundle-ssrs--j|1-c|full"]');
  addRefund('[data-test-id="bundle-selector-option--j|0-c|full"] .hidden-sm-up [data-test-id="bundle-ssrs--j|0-c|full"]');
  addRefund('[data-test-id="bundle-selector-option--j|1-c|full"] .hidden-sm-up [data-test-id="bundle-ssrs--j|1-c|full"]');
  removeSmartTicket();
  addRefund2('[data-test-id="bundle-selected-container--j|0"][data-test-value="Full"] ac-bundle-ssr-items .hidden-xs.selected-bundle');
  addRefund2('[data-test-id="bundle-selected-container--j|1"][data-test-value="Full"] ac-bundle-ssr-items .hidden-xs.selected-bundle');
}

if (culture === 'es-CL') {
  addCSS();
  allFunctions();

  window.eventBus.subscribe({
    name: "100REFUND",
    callback: function (e) {
      allFunctions();
    }
  });
}

}, 600);