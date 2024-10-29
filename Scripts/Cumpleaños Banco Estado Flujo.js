var initPCBEFLUJO = setInterval(function () {
    if (typeof bookingData == "undefined" || (window.location.pathname !== '/V2/Flight' && window.location.pathname !== '/V2/Passengers' && window.location.pathname !== '/V2/Baggage' && window.location.pathname !== '/Seat/Map' && window.location.pathname !== '/V2/Extras' && window.location.pathname !== '/V2/Payment')) return;
    clearInterval(initPCBEFLUJO);

    var culture = bookingData.Culture;
    var BE = JetSmart.AppContext.bancoEstadoCategory;
    var staff = JetSmart.AppContext.isStaff;
    var webA = bookingData.Role;

    function addCSS() {
        var css = `
        #containerTextPC {
            margin: 0px 20px 10px 20px;
            width: auto;
            text-align: center;
        }

        .textPC {
            background: #e299a1;
            border-radius: 5px;
            color: #163a6f;
            display: inline-block;
            font-size: 14px;
            padding: 10px 25px;
        }

        .textPC a {
            color: #163a6f;
            text-decoration: underline;
            font-weight: 700;
        }

        .textPC a:hover {
            color: #a62733;
        }

        @media (max-width: 767px) {
            /* Puedes agregar estilos adicionales para dispositivos móviles aquí */
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
    }

    function addText() {
        var promoElement = document.querySelector('.promo-code-content [data-upgraded=",MaterialTextfield"]');

        if (!document.querySelector('#containerTextPC') && promoElement) {  
            var lineText1, lineText2 = '';

            switch (culture) {
            case 'en-US':
                lineText1 = 'To use the promocode you entered, you must log in as a <strong>Banco Estado Client</strong>.';
                if (webA === 'WWW Anonymous') lineText2 = 'HERE';
                break;
            case 'pt-BR':
                lineText1 = 'Para usar o código que você inseriu, é necessário fazer login como <strong>Cliente do Banco Estado</strong>.';
                if (webA === 'WWW Anonymous') lineText2 = 'AQUI';
                break;
            default:
                lineText1 = 'Para utilizar el código ingresado, debes iniciar sesión como <strong>Cliente Banco Estado</strong>.';
                if (webA === 'WWW Anonymous') lineText2 = 'AQUÍ';
                break;
            }

            var alertPC = `
            <div id="containerTextPC" style="display: none;">
            <div class="textPC">
            ${lineText1} 
            ${lineText2 ? `<a href="https://booking.jetsmart.com/V2/Login?bancoe=1&culture=es-cl&url=https://jetsmart.com/cl/es/" class="login-link">${lineText2}</a>` : ''}
            </div>
            </div>
            `;

            promoElement.insertAdjacentHTML('afterend', alertPC);
        }
    }

    function inputPCBE() {
        var promoCodeInput = document.querySelector('[data-test-id="sidebar-promo-code-input"]');
        
        var addPC = document.querySelector('[data-test-id="sidebar-promo-code-button"]');

        promoCodeInput.addEventListener('input', function() {
            var textBE = document.querySelector('#containerTextPC');
            var inputValue = promoCodeInput.value.toLowerCase();
            addText();
            if (inputValue.substring(0, 3) === 'cbe' && textBE) {
                textBE.style.display = 'block';
                if (addPC) {
                    addPC.style.display = 'none';
                }

            } else {
                textBE.style.display = 'none';
                if (addPC) {
                    addPC.style.display = 'block';
                }
            }
        });
    }

    function clickPC() {
        var promoCodeBox = document.querySelector('ac-promo-code-box');
        if (promoCodeBox) {
            promoCodeBox.addEventListener('click', () => {
                addText();
                console.log("clickenPC");
                inputPCBE();
            });
        }
    }

    if (BE < 1 && staff === 'False') {
        addCSS();
        addText();
        clickPC();
        inputPCBE();
    }

}, 600);