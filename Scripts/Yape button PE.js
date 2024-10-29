var initYape = setInterval(function () {
    if (typeof bookingData === "undefined" || typeof window.eventBus === "undefined" || window.location.pathname !== '/V2/Payment') return;
    clearInterval(initYape);
    var culture = bookingData.Culture;

    function addCSS() {
        var css = `
        #payment-img {
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
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
        const clonedElement = document.querySelector('li label[for="payment_tab_YAPE"]');
        if(!clonedElement){
            const originalElement = document.querySelector('li label[for="payment_tab_PT"]').parentElement;
            const positionToInsert = originalElement.nextSibling;
            const clonedElement = originalElement.cloneNode(true);
            clonedElement.querySelector('label').setAttribute('for', 'payment_tab_YAPE');
            clonedElement.querySelector('img').setAttribute('alt', 'Yape');

            const originalInput = document.querySelector('input#payment_tab_PT');
            const clonedInput = originalInput.cloneNode();
            clonedInput.setAttribute('id', 'payment_tab_YAPE');
            clonedInput.setAttribute('name', 'pct');
            originalInput.parentNode.insertBefore(clonedInput, originalInput);

            originalElement.parentNode.insertBefore(clonedInput, positionToInsert);
            originalElement.parentNode.insertBefore(clonedElement, positionToInsert);

            const clonedButtonImg = document.querySelector('label[for="payment_tab_YAPE"] img');
            clonedButtonImg.setAttribute('src', 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/ac7463bb-dcfa-41a6-aca7-029c036d227f/YAPE.png');

            const clonedButtonText = document.querySelector('li label[for="payment_tab_YAPE"] span');
            if (clonedButtonText) {
                if (clonedButtonText.textContent === 'Transferencia Electrónica' || clonedButtonText.textContent === 'Paga desde tu banco' || clonedButtonText.textContent === 'Transferencia Bancaria') {
                  clonedButtonText.textContent = 'Yape';
              }
          }

          const clonedButton = document.querySelector('li label[for="payment_tab_YAPE"]');
          clonedButton.addEventListener('click', function() {
            originalInput.click();
            document.querySelector("#payment_tab_YAPE").click();
            setTimeout(function() {
              var paymentLogos = document.querySelector('.peru-payment-logos');
              paymentLogos.style.display = 'none';
              var paymentInfo = document.querySelector('.col-xs-1.col-sm-2-3.col-md-3-4');
              var paymentImg = document.getElementById('payment-img');
              const h2Element = document.querySelector('.peru-payment-info h2');
              const pElement = document.querySelector('.peru-payment-info p');
              h2Element.style.display = 'none'
              pElement.style.fontSize = "18px"
              pElement.textContent = 'Una vez hagas clic en "Pagar ahora" serás redirigido a safetypay. Aquí escoge "Yape".';
              pElement.innerHTML = pElement.innerHTML.replace('Pagar ahora', '<span style="color:red"><b>Pagar ahora</b></span>');
              pElement.innerHTML = pElement.innerHTML.replace('Yape', '<span style="color:red"><b>Yape</b></span>');

              if (!paymentImg && window.innerWidth >= 768) {
                var img = document.createElement('img');
                img.id = 'payment-img';
                img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/0a171efb-a2ca-419c-84d3-8098a3563921/Yape_img_payment.png';
                paymentInfo.appendChild(img);
            }

            if (paymentImg && window.innerWidth >= 768) {
              if(paymentImg.src !== 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/0a171efb-a2ca-419c-84d3-8098a3563921/Yape_img_payment.png'){
                paymentImg.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/0a171efb-a2ca-419c-84d3-8098a3563921/Yape_img_payment.png'
            }
        }

        if (!paymentImg && window.innerWidth < 768) {
            var img = document.createElement('img');
            img.id = 'payment-img';
            img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/8ebc4144-5909-4803-afd8-55c6c9815ee6/Yape_img_payment_mobile.png';
            paymentInfo.appendChild(img);
            const paymentImgStyle = document.querySelector('#payment-img');
            paymentImgStyle.style.display = 'block';
            paymentImgStyle.style.margin = 'auto';
        }

        if (paymentImg && window.innerWidth < 768) {
          if(paymentImg.src !== 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/8ebc4144-5909-4803-afd8-55c6c9815ee6/Yape_img_payment_mobile.png'){
            paymentImg.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/8ebc4144-5909-4803-afd8-55c6c9815ee6/Yape_img_payment_mobile.png'
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
    addCSS();
    addButton();
    window.eventBus.subscribe({
        name: "YapeButton", callback: function (e) {
            var innerDeepBox = document.querySelector('.inner-deep-box.ts-hide-on-voucher-only-payment.ts-hide-on-credit-only-payment');
            if (innerDeepBox) {
                innerDeepBox.addEventListener('click', function () {
                    var selectElement = document.querySelector('[data-test-id="payment-card-issuer-country"]');
                    var selectValue = selectElement.value;
                    if(selectValue === 'PE'){
                        addButton()
                        handleOriginalButtonClick()
                    }else{
                        if(document.querySelector('li label[for="payment_tab_YAPE"]')){
                            var labelYape = document.querySelector('li label[for="payment_tab_YAPE"]');
                            var liYape = labelYape.parentElement;
                            var inputYape = document.querySelector('input#payment_tab_YAPE');
                            liYape.remove();
                            inputYape.remove();
                        }
                    }
                });
            }
        }
    });
}
}, 600);