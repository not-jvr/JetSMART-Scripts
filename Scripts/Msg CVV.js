var initMsgCVV = setInterval(function () {
    if (typeof bookingData === "undefined" || typeof window.eventBus === "undefined" || window.location.pathname !== '/V2/Payment') return;
    clearInterval(initMsgCVV);
    var culture = bookingData.Culture;

    function verificarCVV(){
        var cvvField = document.querySelector('[data-test-id*="payment-card-cvv"]');
        cvvField.addEventListener('input', function() {
            if (this.value.length > 3) {
                addMsgCVV('[data-test-id*="payment-card-cvv"]')
                console.log("hola")
            }
            if(this.value.length < 4 && document.querySelector('#msg-cvv')){
                console.log("chao")
                document.querySelector('#msg-cvv').remove();
            }
        });
    }

    function addMsgCVV(selector) {
        if(!document.querySelector('#msg-cvv')){
            var container = document.querySelector(selector)
            switch (culture) {
            case 'en-US':
                mensaje = 'Remember that the CVV contains only 3 or 4 digits depending on your card.';
                break;
            case 'pt-BR':
                mensaje = 'Lembre-se de que o CVV contém apenas 3 ou 4 dígitos, dependendo do seu cartão.';
                break;
            default:
                mensaje = 'Recuerda que el CVV contiene solo 3 o 4 dígitos dependiendo de tu tarjeta.';
                break;
            }
            var newElement = document.createElement('div');
            newElement.id = 'msg-cvv';
            newElement.innerHTML = `<i class="fas fa-exclamation-circle notification-icon custom-alert" style="margin-right: 10px;"></i><span>${mensaje}</span>`;
            var css = `
            #msg-cvv {
                display: flex;
                padding: 5px;
                position: relative;
                background-color: rgb(89, 195, 217);
                line-height: 30px;
                color: white;
                border: 1px;
                border-radius: 5px;
                align-items: center;
                margin: 10px;
                margin-left: 10px;
            }
            `;
            var head = document.head || document.getElementsByTagName('head')[0];
            var style = document.createElement('style');
            head.appendChild(style);
            style.type = 'text/css';
            if (style.styleSheet){
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            container.insertAdjacentElement('afterend', newElement);
        }
    }

    var targetNode = document.querySelector('ac-payment-form');

// Opciones del observer (qué mutaciones observar)
    var config = { attributes: true, childList: true, subtree: true };

// Función de callback a ejecutar cuando las mutaciones son observadas
    var callback = function(mutationsList, observer) {
        for(let mutation of mutationsList) {
        // Si el nodo objetivo ha mutado de alguna manera, imprime 'hola'
            if(document.querySelector('[data-test-id*="payment-card-cvv"]')){
                verificarCVV();
            }
        }
    };

    var observer = new MutationObserver(callback);

    observer.observe(targetNode, config);

}, 400);