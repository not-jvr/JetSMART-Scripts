var initMACHButton = setInterval(function () {
  if (typeof bookingData === "undefined" || typeof window.eventBus === "undefined" || window.location.pathname !== '/V2/Payment') return;
  clearInterval(initMACHButton);
  var culture = bookingData.Culture;

  function addButtonMACH() {
    const clonedElement = document.querySelector('li label[for="payment_tab_MACH"]');
    if(!clonedElement && document.querySelector('li label[for="payment_tab_ST"]')){
      const originalElement = document.querySelector('li label[for="payment_tab_ST"]').parentElement;
      const positionToInsert = originalElement.nextSibling;
      const clonedElement = originalElement.cloneNode(true);
      clonedElement.querySelector('label').setAttribute('for', 'payment_tab_MACH');
      clonedElement.querySelector('img').setAttribute('alt', 'Paga con MACH');

      const originalInput = document.querySelector('input#payment_tab_ST');
      const clonedInput = originalInput.cloneNode();
      clonedInput.setAttribute('id', 'payment_tab_MACH');
      clonedInput.setAttribute('name', 'pct');
      originalInput.parentNode.insertBefore(clonedInput, originalInput);

      originalElement.parentNode.insertBefore(clonedInput, positionToInsert);
      originalElement.parentNode.insertBefore(clonedElement, positionToInsert);

      const originalButtonImg = document.querySelector('label[for="payment_tab_ST"] img');
      originalButtonImg.setAttribute('src', 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/59bae605-404e-4ba7-8861-b00805553fde/FoP-Transf-mach.png');

      const clonedButtonImg = document.querySelector('label[for="payment_tab_MACH"] img');
      clonedButtonImg.setAttribute('src', 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/904a4048-6d92-4a13-baa2-806e82f36775/FoP-Mach.png');

      var clonedButtonText = document.querySelector('li label[for="payment_tab_MACH"] span');
      if(clonedButtonText){
        if(clonedButtonText.textContent === 'Transferencia Electrónica' || clonedButtonText.textContent === 'Paga desde tu banco'){

          clonedButtonText.textContent = 'Paga con MACH';

        }
      }
      const clonedButton = document.querySelector('li label[for="payment_tab_MACH"]');
      clonedButton.addEventListener('click', function() {
        originalInput.click();
        document.querySelector("#payment_tab_MACH").click();
      });
    }
  }

  if (culture === 'es-CL') {
    addButtonMACH()
    window.eventBus.subscribe({
      name: "machButton", callback: function (e) {
        var innerDeepBox = document.querySelector('.inner-deep-box.ts-hide-on-voucher-only-payment.ts-hide-on-credit-only-payment');
        if (innerDeepBox) {
          innerDeepBox.addEventListener('click', function () {
            var selectElement = document.querySelector('[data-test-id="payment-card-issuer-country"]');
            if(selectElement){
              var selectValue = selectElement.value;
              if(selectValue === 'CL'){
                addButtonMACH()
              }
            }
          });
        }
      }
    });
  }
}, 400);