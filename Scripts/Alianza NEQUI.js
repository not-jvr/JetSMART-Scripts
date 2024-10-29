var fopNEQUI = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Payment' || !document.querySelector('#mainContentPayment .inner-deep-box ul')) return;
    clearInterval(fopNEQUI);

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
            *Recuerda que el descuento aplicado es sólo válido con tus tarjetas Nequi.
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

    if (culture === 'es-CO' && PC === 'H10NEQU1') {
        addCSS();
        updatePaymentMethod('BA', 'Tarjeta Nequi', 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/b89df877-d3ec-4028-ab40-083e1beaa4d8/logo%20nequi.png');
        updatePaymentMethod('MB', 'Tarjeta Nequi', 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/b89df877-d3ec-4028-ab40-083e1beaa4d8/logo%20nequi.png');
        showOnlySelected(['BA', 'MB']);
        addMSG();
    }

}, 700);