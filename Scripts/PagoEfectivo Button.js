var initPagoEfectivo = setInterval(function () {
    if (typeof bookingData === "undefined" || typeof window.eventBus === "undefined" || window.location.pathname !== '/V2/Payment') return;
    clearInterval(initPagoEfectivo);
    var culture = bookingData.Culture;

    function addButton() {
        const clonedElement = document.querySelector('li label[for="payment_tab_PAGOEFECTIVO"]');
        if(!clonedElement){
            const originalElement = document.querySelector('li label[for="payment_tab_PT"]').parentElement;
            const positionToInsert = originalElement.nextSibling;
            const clonedElement = originalElement.cloneNode(true);
            clonedElement.querySelector('label').setAttribute('for', 'payment_tab_PAGOEFECTIVO');
            clonedElement.querySelector('img').setAttribute('alt', 'PagoEfectivo');

            const originalInput = document.querySelector('input#payment_tab_PT');
            const clonedInput = originalInput.cloneNode();
            clonedInput.setAttribute('id', 'payment_tab_PAGOEFECTIVO');
            clonedInput.setAttribute('name', 'pct');
            originalInput.parentNode.insertBefore(clonedInput, originalInput);

            originalElement.parentNode.insertBefore(clonedInput, positionToInsert);
            originalElement.parentNode.insertBefore(clonedElement, positionToInsert);

            const clonedButtonImg = document.querySelector('label[for="payment_tab_PAGOEFECTIVO"] img');
            clonedButtonImg.setAttribute('src', 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/ad3fe361-8370-4155-aa31-718bb41721af/PagoEfectivo.png');

            const clonedButtonText = document.querySelector('li label[for="payment_tab_PAGOEFECTIVO"] span');
            if (clonedButtonText) {
                if (clonedButtonText.textContent === 'Transferencia Electrónica' || clonedButtonText.textContent === 'Paga desde tu banco' || clonedButtonText.textContent === 'Transferencia Bancaria') {
                  clonedButtonText.textContent = 'PagoEfectivo';
              }
          }

          const clonedButton = document.querySelector('li label[for="payment_tab_PAGOEFECTIVO"]');
          clonedButton.addEventListener('click', function() {
            originalInput.click();
            document.querySelector("#payment_tab_PAGOEFECTIVO").click();
            setTimeout(function() {
              var paymentLogos = document.querySelector('.peru-payment-logos');
              paymentLogos.style.display = 'none';
              var paymentInfo = document.querySelector('.col-xs-1.col-sm-2-3.col-md-3-4');
              var paymentImg = document.getElementById('payment-img');
              const h2Element = document.querySelector('.peru-payment-info h2');
              const pElement = document.querySelector('.peru-payment-info p');
              h2Element.style.display = 'none'
              pElement.style.fontSize = "18px"
              pElement.textContent = 'Una vez hagas clic en "Pagar ahora" serás redirigido a safetypay. Aquí escoge "PagoEfectivo".';
              pElement.innerHTML = pElement.innerHTML.replace('Pagar ahora', '<span style="color:red"><b>Pagar ahora</b></span>');
              pElement.innerHTML = pElement.innerHTML.replace('PagoEfectivo', '<span style="color:red"><b>PagoEfectivo</b></span>');

              if (!paymentImg && window.innerWidth >= 768) {
                var img = document.createElement('img');
                img.id = 'payment-img';
                img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/74397c85-7c1a-4d53-9a1b-3cc19f5ba28f/PagoEfectivo2.png';
                paymentInfo.appendChild(img);
            }

            if (paymentImg && window.innerWidth >= 768) {
              if(paymentImg.src !== 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/74397c85-7c1a-4d53-9a1b-3cc19f5ba28f/PagoEfectivo2.png'){
                paymentImg.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/74397c85-7c1a-4d53-9a1b-3cc19f5ba28f/PagoEfectivo2.png'
              }
            }

            if (!paymentImg && window.innerWidth < 768) {
                var img = document.createElement('img');
                img.id = 'payment-img';
                img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/3b386b2a-3c27-4dec-8e46-cb6fc935a23e/PagoEfectivo2_mobile.png';
                paymentInfo.appendChild(img);
                const paymentImgStyle = document.querySelector('#payment-img');
                paymentImgStyle.style.display = 'block';
                paymentImgStyle.style.margin = 'auto';
            }

            if (paymentImg && window.innerWidth < 768) {
              if(paymentImg.src !== 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/3b386b2a-3c27-4dec-8e46-cb6fc935a23e/PagoEfectivo2_mobile.png'){
                paymentImg.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/3b386b2a-3c27-4dec-8e46-cb6fc935a23e/PagoEfectivo2_mobile.png'
              }
            }

            if (paymentImg && paymentImg.style.display === 'none'){
                paymentImg.style.display = 'block'
            }
            const pagarAhoraElement = document.querySelector('#payment-tab-checkout-label');
            if (pagarAhoraElement) {
                pagarAhoraElement.style.color = 'red';
            }
            const pagarEnCuotasElement = document.querySelector('.sprKw');
            if (pagarEnCuotasElement) {
                pagarEnCuotasElement.style.color = 'red';
            }
        }, 400);
        });
      }
  }

  function handleOriginalButtonClick() {
      const clonedButton = document.querySelector('li label[for="payment_tab_PT"]');
      if (clonedButton) {
        clonedButton.addEventListener('click', function () {
          setTimeout(function () {
            const h2Element = document.querySelector('.peru-payment-info h2');
            const pElement = document.querySelector('.peru-payment-info p');
            h2Element.textContent = 'Transferencia Bancaria';
            pElement.textContent = 'Podrás pagar en las siguientes entidades financieras';

            if (h2Element.style.display === 'none') {
              h2Element.style.display = 'block';
              pElement.style.fontSize = "14px";
          }

          const paymentLogos = document.querySelector('.peru-payment-logos');
          if (paymentLogos.style.display === 'none') {
              paymentLogos.style.display = 'grid';
          }

          const paymentImg = document.getElementById('payment-img');
          if (paymentImg) {
              paymentImg.style.display = 'none';
          }
      }, 400);
      });
    }
}

if (culture === 'es-PE') {
    addButton()
    window.eventBus.subscribe({
        name: "pagoefectivoButton", callback: function (e) {
            var innerDeepBox = document.querySelector('.inner-deep-box.ts-hide-on-voucher-only-payment.ts-hide-on-credit-only-payment');
            if (innerDeepBox) {
                innerDeepBox.addEventListener('click', function () {
                    var selectElement = document.querySelector('[data-test-id="payment-card-issuer-country"]');
                    var selectValue = selectElement.value;
                    if(selectValue === 'PE'){
                        addButton()
                        handleOriginalButtonClick()
                    }else{
                        if(document.querySelector('li label[for="payment_tab_PAGOEFECTIVO"]')){
                            var labelPagoEfectivo = document.querySelector('li label[for="payment_tab_PAGOEFECTIVO"]');
                            var liPagoEfectivo = labelPagoEfectivo.parentElement;
                            var inputPagoEfectivo = document.querySelector('input#payment_tab_PAGOEFECTIVO');
                            liPagoEfectivo.remove();
                            inputPagoEfectivo.remove();
                        }
                    }
                });
            }
        }
    });
}
}, 400);