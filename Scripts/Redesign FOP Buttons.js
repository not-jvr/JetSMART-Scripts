var newImageColorPayments = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Payment' || !document.querySelector('#mainContentPayment .inner-deep-box ul')) return;
    clearInterval(newImageColorPayments);

    culture = bookingData.Culture;

    function addCSS() {
        var css = `
        #mainContentPayment .tabs [id^=payment_tab_]:checked+li label img {
            border: 4px solid #59c3d9;
        }

        #mainContentPayment .tabs [id^=payment_tab_]:checked+li label:after {
            display: none;
        }
        `,
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
        head.appendChild(style);
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    }

    function changeImage() {
        if (culture === 'es-CL') {
            document.querySelectorAll('#mainContentPayment .payment-card-img').forEach((img) => {
                const dataTestId = img.getAttribute('data-test-id');
                if (dataTestId.endsWith('BB') || dataTestId.endsWith('MM')) {
                    img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/3a87fdd1-62be-46d5-a3a7-14783ddbc668/Tarjeta%20Credito%20CL.png';
                } else if (dataTestId.endsWith('MF') || dataTestId.endsWith('BE')) {
                    img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/1ad0b296-8161-45ff-b16c-b654aa0e4f14/Tarjeta%20Debito%20CL.png';
                } else if (dataTestId.endsWith('ST')) {
                    img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/40795f2b-9455-4950-a958-fab1af7fd301/Paga%20desde%20tu%20banco%20CL.png';
                } else if (dataTestId.endsWith('KB')) {
                    img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/ceb52fde-5d5a-4a8a-b071-ac1a5e911b8d/Tarjeta%20Credito%2C%20Debito%20y%20Dinero%20en%20cuenta%20CL.png';
                } else if (dataTestId.endsWith('SC')) {
                    img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/0d9b9b63-4855-400f-a08c-f711de86330f/Pago%20en%20efectivo%20CL.png';
                }
            });
        } else if (culture === 'es-AR') {
            document.querySelectorAll('#mainContentPayment .payment-card-img').forEach((img) => {
                const dataTestId = img.getAttribute('data-test-id');
                if (dataTestId.endsWith('WW') || dataTestId.endsWith('MP Debit') || dataTestId.endsWith('Pri Debit')) {
                    img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/ba2eb298-bd72-454d-a0ee-b5bf246a90a5/D%C3%A9bito%20AR.png';
                } else if (dataTestId.endsWith('WorldPay') || dataTestId.endsWith('MR') || dataTestId.endsWith('Ing. Credit')) { //TODO: FALTA WORLDPAY - MR - AR ING CREDIT
                    img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/8291fcc1-1319-41c1-bbef-c7648cfd5918/Cr%C3%A9dito%20AR.png';
                } else if (dataTestId.endsWith('KA')) {
                    img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/1ed00874-479a-4a2a-8462-20dc2293b5f1/Dinero%20en%20cuenta%20AR.png';
                } else if (dataTestId.endsWith('KD')) {
                    img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/c45da11a-cb5e-4d67-b168-8a5c713204a6/Efectivo%20AR.png'
                }
            });
        } else if (culture === 'es-PE') {
            document.querySelectorAll('#mainContentPayment .payment-card-img').forEach((img) => {
                const dataTestId = img.getAttribute('data-test-id');
                if (dataTestId.endsWith('MK')) {
                    img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/3bc6d8d9-f0c3-4887-8bd9-662af1b3ce8a/Tarjeta%20D%C3%A9bito%20Soles%20PE.png';
                } else if (dataTestId.endsWith('WW')) {
                    img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/54eb69c5-8911-4ccc-b4bb-4ab13497ef8e/Tarjeta%20D%C3%A9bito%20USD%20PE.png';
                } else if (dataTestId.endsWith('MZ')) {
                    img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/527d5810-3f97-41e0-874f-2dd0a9d0337d/Tarjeta%20Credito%20Soles%20PE.png';
                } else if (dataTestId.endsWith('WorldPay')) {
                    img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/bb3bbed4-d57a-4f76-9b19-329345911edc/Tarjeta%20Credito%20USD%20PE.png'
                } else if (dataTestId.endsWith('PT')) {
                    img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/c5e5f0ee-ae6e-4d2f-9452-c7b69eac42a0/Paga%20desde%20tu%20banco%20PE.png'
                } else if (dataTestId.endsWith('AL')) {
                    img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/db8f28c8-b6f2-480c-addf-bdfdbfb1990b/Yape%20Plin%20Cuotealo.png'
                }
            });
        } else if (culture === 'es-CO') {
            document.querySelectorAll('#mainContentPayment .payment-card-img').forEach((img) => {
                const dataTestId = img.getAttribute('data-test-id');
                if (dataTestId.endsWith('MB') || dataTestId.endsWith('BA')) {
                    img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/d24b85cc-b980-443c-8134-323e0cb581b2/D%C3%A9bito%20CO.png';
                } else if (dataTestId.endsWith('ME') || dataTestId.endsWith('BR')) {
                    img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/1ff538b7-ef5b-4c20-bf6a-323399b200b9/Cr%C3%A9dito%20CO.png';
                } else if (dataTestId.endsWith('CC')) {
                    img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/7c959faf-064b-49fd-a925-b291045b6aae/Efectivo%20CO.png';
                } else if (dataTestId.endsWith('CT')) {
                    img.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/932b48b9-9ca6-437e-81a9-2e8befd0a94f/Paga%20desde%20tu%20banco%20CO.png'
                }
            });

            var labelElement = document.querySelector('[data-test-id="payment-method-selector-icon-label--c|CT"]');
            
            if (labelElement && labelElement.querySelector('span')) {
                var spanElement = labelElement.querySelector('span');
                spanElement.textContent = 'Paga desde tu banco';
            }

        } else {

            var link1 = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/d3015326-5f44-4a09-8397-96a1cdc113de/Debito%20ES.png';
            var link2 = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/42de7a71-1910-46e2-9c54-cce48b1856cb/Credito%20ES.png';

            switch (culture) {
            case 'en-US':
                link1 = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/827b6494-a31a-414c-9711-b33cdfc55b84/Debito%20EN.png'
                link2 = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/4d8bf12b-7f21-4014-9a27-567a4b41a64c/Credito%20EN.png'
                break;
            case 'pt-BR':
                link1 = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/d3015326-5f44-4a09-8397-96a1cdc113de/Debito%20ES.png'
                link2 = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/4971c966-99c5-4e4e-97dc-2fa2ed65fbe1/Credito%20PT.png'
                break;
            }

            document.querySelectorAll('#mainContentPayment .payment-card-img').forEach((img) => {
                const dataTestId = img.getAttribute('data-test-id');
                if (dataTestId.endsWith('WW')) {
                    img.src = link1;
                } else if (dataTestId.endsWith('WorldPay')) {
                    img.src = link2;
                }
            });
        }
    }

    if (culture !== 'es-AR') {
        addCSS();
        changeImage();
    }

}, 600);