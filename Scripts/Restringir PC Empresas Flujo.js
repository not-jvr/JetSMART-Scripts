var initPCEmpresasFlujo = setInterval(function () {
    if (typeof bookingData == "undefined" || (window.location.pathname !== '/V2/Flight' && window.location.pathname !== '/V2/Passengers' && window.location.pathname !== '/V2/Baggage' && window.location.pathname !== '/Seat/Map' && window.location.pathname !== '/V2/Extras' && window.location.pathname !== '/V2/Payment')) return;
    clearInterval(initPCEmpresasFlujo);

    var culture = bookingData.Culture;
    var staff = JetSmart.AppContext.isStaff;
    var webA = bookingData.Role;

    function addCSS() {
        var css = `
        #containerTextPCEmpresas {
            margin: 0px 20px 10px 20px;
            width: auto;
            text-align: center;
        }

        .textPCEmpresas {
            background: #e299a1;
            border-radius: 5px;
            color: #163a6f;
            display: inline-block;
            font-size: 14px;
            padding: 10px 25px;
        }

        .textPCEmpresas a {
            color: #163a6f;
            text-decoration: underline;
            font-weight: 700;
        }

        .textPCEmpresas a:hover {
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

        if (!document.querySelector('#containerTextPCEmpresas') && promoElement) {  
            var lineText1, lineText2, link = '';
            lineText1 = 'Para utilizar el código ingresado, debes iniciar sesión como <strong>Empresa</strong>.';

            if (webA === 'WWW Anonymous') {
                lineText2 = 'AQUÍ';
            }

            switch (culture) {
            case 'en-US':
                lineText1 = 'To use the entered code, you must log in as <strong>Company</strong>.';
                link = 'https://booking.jetsmart.com/V2/Login?company=1&culture=en-us&url=https://jetsmart.com/us/en/';
                if (webA === 'WWW Anonymous') lineText2 = 'HERE';
                break;
            case 'pt-BR':
                lineText1 = 'Para utilizar o código inserido, você deve fazer login como <strong>Empresa</strong>.';
                link = 'https://booking.jetsmart.com/V2/Login?company=1&culture=pt-br&url=https://jetsmart.com/br/pt/';
                if (webA === 'WWW Anonymous') lineText2 = 'AQUI';
                break;
            case 'es-CL':
                link = 'https://booking.jetsmart.com/V2/Login?company=1&culture=es-cl&url=https://jetsmart.com/cl/es/'
                break;
            case 'es-AR':
                link = 'https://booking.jetsmart.com/V2/Login?company=1&culture=es-ar&url=https://jetsmart.com/ar/es/'
                break;
            case 'es-PE':
                link = 'https://booking.jetsmart.com/V2/Login?company=1&culture=es-pe&url=https://jetsmart.com/pe/es/'
                break;
            case 'es-EC':
                link = 'https://booking.jetsmart.com/V2/Login?company=1&culture=es-ec&url=https://jetsmart.com/ec/es/'
                break;
            case 'es-CO':
                link = 'https://booking.jetsmart.com/V2/Login?company=1&culture=es-co&url=https://jetsmart.com/co/es/'
                break;
            case 'es-PY':
                link = 'https://booking.jetsmart.com/V2/Login?company=1&culture=es-py&url=https://jetsmart.com/py/es/'
                break;
            case 'es-UY':
                link = 'https://booking.jetsmart.com/V2/Login?company=1&culture=es-uy&url=https://jetsmart.com/uy/es/'
                break;
            }
            
            var alertPC = `
            <div id="containerTextPCEmpresas" style="display: none;">
            <div class="textPCEmpresas">
            ${lineText1}
            ${lineText2 ? `<a href="${link}" class="login-link">${lineText2}</a>` : ''}
            </div>
            </div>
            `;

            promoElement.insertAdjacentHTML('afterend', alertPC);
        }
    }

    function inputPC() {
        var promoCodeInput = document.querySelector('[data-test-id="sidebar-promo-code-input"]');
        
        var addPC = document.querySelector('[data-test-id="sidebar-promo-code-button"]');

        promoCodeInput.addEventListener('input', function() {
            var textBE = document.querySelector('#containerTextPCEmpresas');
            var inputValue = promoCodeInput.value.toLowerCase();
            addText();
            if (inputValue.substring(0, 3) === 'ewd' && textBE) {
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
                inputPC();
            });
        }
    }

    function esEmpresaAgencia() {
        var role = bookingData.Culture;
        if (role) {
            return bookingData.Role.includes('CUG2');
        }
        return false;
    }

    if (!esEmpresaAgencia() && staff === 'False') {
        addCSS();
        addText();
        clickPC();
        inputPC();
    }

}, 600);