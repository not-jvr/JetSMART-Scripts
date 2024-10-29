var initKHIPUButton = setInterval(function () {
  if (typeof bookingData === "undefined" || typeof window.eventBus === "undefined" || window.location.pathname !== '/V2/Payment') return;
  clearInterval(initKHIPUButton);
  var culture = bookingData.Culture;

  function addButtonKHIPU() {
    const clonedElement = document.querySelector('li label[for="payment_tab_KHIPU"]');
    if(!clonedElement && document.querySelector('li label[for="payment_tab_ST"]')){
      const originalElement = document.querySelector('li label[for="payment_tab_ST"]').parentElement;
      const positionToInsert = originalElement.nextSibling;
      const clonedElement = originalElement.cloneNode(true);
      clonedElement.querySelector('label').setAttribute('for', 'payment_tab_KHIPU');
      clonedElement.querySelector('img').setAttribute('alt', 'Paga con Khipu');

      const originalInput = document.querySelector('input#payment_tab_ST');
      const clonedInput = originalInput.cloneNode();
      clonedInput.setAttribute('id', 'payment_tab_KHIPU');
      clonedInput.setAttribute('name', 'pct');
      originalInput.parentNode.insertBefore(clonedInput, originalInput);

      originalElement.parentNode.insertBefore(clonedInput, positionToInsert);
      originalElement.parentNode.insertBefore(clonedElement, positionToInsert);

      const originalButtonImg = document.querySelector('label[for="payment_tab_ST"] img');
      originalButtonImg.setAttribute('src', 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/e8093b44-a24b-4d4a-9f9e-b74e7136d4a2/FoP-Transf-khipu.png');

      const clonedButtonImg = document.querySelector('label[for="payment_tab_KHIPU"] img');
      clonedButtonImg.setAttribute('src', 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/81908854-11f6-40ac-8a93-bc8a304139e0/FoP-%20khipu.png');

      var clonedButtonText = document.querySelector('li label[for="payment_tab_KHIPU"] span');
      if(clonedButtonText){
        if(clonedButtonText.textContent === 'Transferencia Electrónica' || clonedButtonText.textContent === 'Paga desde tu banco'){

          clonedButtonText.textContent = 'Paga con Khipu';

        }
      }
      const clonedButton = document.querySelector('li label[for="payment_tab_KHIPU"]');
      clonedButton.addEventListener('click', function() {
        originalInput.click();
        document.querySelector("#payment_tab_KHIPU").click();
      });
    }
  }

  if (culture === 'es-CL') {
    addButtonKHIPU()
    window.eventBus.subscribe({
      name: "khipuButton", callback: function (e) {
        var innerDeepBox = document.querySelector('.inner-deep-box.ts-hide-on-voucher-only-payment.ts-hide-on-credit-only-payment');
        if (innerDeepBox) {
          innerDeepBox.addEventListener('click', function () {
            var selectElement = document.querySelector('[data-test-id="payment-card-issuer-country"]');
            if(selectElement){
              var selectValue = selectElement.value;
              if(selectValue === 'CL'){
                addButtonKHIPU()
              }
            }
          });
        }
      }
    });
  }
}, 400);