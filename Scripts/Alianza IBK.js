var fopIBK = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Payment' || !document.querySelector('#mainContentPayment .inner-deep-box ul')) return;
    clearInterval(fopIBK);

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
            *Recuerda que el descuento aplicado es sólo válido con tus tarjetas Interbank.
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

    if (culture === 'es-PE' && PC === 'IB30KPE') {
        addCSS();
        updatePaymentMethod('MK', 'Tarjeta Débito SOL', 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/75672d8c-8f19-41c4-b76c-82629debea1e/IBK%20D%C3%A9bito%20SOL.png');
        updatePaymentMethod('WW', 'USD Interbank', 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/b1875023-b11c-4259-855e-c12b32ccc3ae/IBK%20D%C3%A9bito%20USD.png');
        updatePaymentMethod('MZ', 'Tarjeta Crédito SOL', 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/9a6ea7bb-4c13-4251-a83d-1c527709de30/IBK%20Credito%20SOL.png');
        updatePaymentMethod('WV', 'USD Interbank', 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/a0e80307-227f-4e45-842f-530eede71379/IBK%20Credito%20USD.png');
        updatePaymentMethod('WM', 'USD Interbank', 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/a0e80307-227f-4e45-842f-530eede71379/IBK%20Credito%20USD.png');
        updatePaymentMethod('WD', 'USD Interbank', 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/a0e80307-227f-4e45-842f-530eede71379/IBK%20Credito%20USD.png');
        showOnlySelected(['MK', 'WW', 'MZ', 'WV', 'WM', 'WD']);
        addMSG();
    }

}, 700);