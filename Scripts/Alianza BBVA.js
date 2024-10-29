var fopBBVA = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Payment' || !document.querySelector('#mainContentPayment .inner-deep-box ul')) return;
    clearInterval(fopBBVA);

    var PC = bookingData.PromotionCode;
    var culture = bookingData.Culture;

    function addCSS() {
        var css = `
        .msgPCContainer {
            display: flex;
            margin: 10px;
        }

        .msgPC {
            background-color: #59c3d9;
            color: white;
            padding: 5px;
            border-radius: 4px;
            max-width: 100%;
            box-sizing: border-box;
        }
        `;

        var style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }

    function addMSG() {
        var section = document.querySelector('#mainContentPayment section.inner-deep-box');
        if (section && !document.querySelector('.msgPCContainer')) {
            var MSG = `
            <div class="msgPCContainer">
            <div class="msgPC">
            *Recuerda que el descuento aplicado es sólo válido con tus tarjetas BBVA.
            </div>
            </div>
            `;

            section.insertAdjacentHTML('afterbegin', MSG);
        }
    }

    function updatePaymentMethod(selector, newName, newImageUrl) {
        var paymentMethodLabel = document.querySelector(`label[data-test-id="payment-method-selector-icon-label--c|${selector}"]`);

        if (paymentMethodLabel) {
            var paymentMethodSpan = paymentMethodLabel.querySelector('span');
            if (paymentMethodSpan) {
                paymentMethodSpan.textContent = newName;
            }

            var imgElement = paymentMethodLabel.querySelector('img.payment-card-img');
            if (imgElement) {
                imgElement.src = newImageUrl;
            }
        } else {
            console.warn('No se encontró el selector especificado.');
        }
    }

    function showOnlySelected(forValues) {
        const labels = document.querySelectorAll('#mainContentPayment .inner-deep-box .tabs.ts-error-parent ul label');

        labels.forEach(label => {
            const forAttr = label.getAttribute('for');

            if (forValues.includes(forAttr.replace('payment_tab_', ''))) {
                //no hace nada
            } else {
                label.style.display = 'none';
            }
        });
    }

    if (culture === 'es-PE' && PC === 'PEBV0622') {
        addCSS();
        updatePaymentMethod('MK', 'Tarjeta Débito SOL', 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/9f618ad1-7e5d-4e3f-9a07-d1eaea012785/BBVA%20D%C3%A9bito%20SOL.png');
        updatePaymentMethod('WW', 'USD BBVA', 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/457445bd-9b41-4b04-979e-4ae252d51b02/BBVA%20D%C3%A9bito%20USD.png');
        updatePaymentMethod('MZ', 'Tarjeta Crédito SOL', 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/e787ad0f-c621-4cc2-9d40-fd8f49bd90ed/BBVA%20Credito%20SOL.png');
        updatePaymentMethod('WV', 'USD BBVA', 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/8ffc453e-9f40-478c-98f2-5c0644f211b9/BBVA%20Credito%20USD.png');
        updatePaymentMethod('WM', 'USD BBVA', 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/8ffc453e-9f40-478c-98f2-5c0644f211b9/BBVA%20Credito%20USD.png');
        updatePaymentMethod('WD', 'USD BBVA', 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/8ffc453e-9f40-478c-98f2-5c0644f211b9/BBVA%20Credito%20USD.png');
        showOnlySelected(['MK', 'WW', 'MZ', 'WV', 'WM', 'WD']);
        addMSG();
    }

}, 700);