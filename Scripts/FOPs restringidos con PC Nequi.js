var initPCNEQUI = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Payment' || !document.querySelector('label[for="payment_tab_BA"]')) return;
    clearInterval(initPCNEQUI);

    var PC = bookingData.PromotionCode;
    var culture = bookingData.Culture;

    function addCSS() {
        var css = `
        .msgNequiContainer {
            display: flex;
            margin: 10px;
        }

        .msgNequi {
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

    function showOnlySelected(forValue) {
        const labels = document.querySelectorAll('#mainContentPayment .inner-deep-box .tabs.ts-error-parent ul label');

        labels.forEach(label => {
            const forAttr = label.getAttribute('for');

            if (forAttr === `payment_tab_${forValue}`) {
            //no hace nada
            } else {
                label.style.display = 'none';
            }
        });
    }

    function changeName() {
        var paymentMethodSpan = document.querySelector('label[data-test-id="payment-method-selector-icon-label--c|BA"] span');

        if (paymentMethodSpan) {
            paymentMethodSpan.textContent = 'Tarjeta Nequi';
        }
    }

    function changeImage() {
        var paymentMethod = document.querySelector('label[data-test-id="payment-method-selector-icon-label--c|BA"]');

        if (paymentMethod) {
            var imgElement = paymentMethod.querySelector('img.payment-card-img');

            if (imgElement) {
                imgElement.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/a87e3f85-cd98-46a6-bb30-3fe1ef30cf47/fop%20nequi.png';
            }
        }
    }

    function addMSG() {
        var section = document.querySelector('#mainContentPayment section.inner-deep-box');
        if (section && !document.querySelector('.msgNequiContainer')) {
            var MSG = `
            <div class="msgNequiContainer">
            <div class="msgNequi">
            *Recuerda que el descuento aplicado es sólo válido con tus tarjetas Nequi.
            </div>
            </div>
            `;

            section.insertAdjacentHTML('afterbegin', MSG);
        }
    }

    function hideOnlySelected(forValue) {
        const labels = document.querySelectorAll('#mainContentPayment .inner-deep-box .tabs.ts-error-parent ul label');

        labels.forEach(label => {
            const forAttr = label.getAttribute('for');

            if (forAttr === `payment_tab_${forValue}`) {
                label.style.display = 'none';
            } else {
                //nada
            }
        });
    }

    function allChangesPayment() {
        showOnlySelected('BA');
        changeName();
        changeImage();
    }

    //H10NEQU1
    if (culture === 'es-CO') {
        if (PC === 'H10NEQU1') {
            addCSS();
            addMSG();
            allChangesPayment();
        } else {
            hideOnlySelected('BA');
        }
    }

}, 1000);