var initPCBEHOME = setInterval(function() {
    if (!window.location.href.startsWith('https://jetsmart.com') || !document.querySelector('[data-test-id="SEARCHBOX_CONTAINER"]')) return;
    clearInterval(initPCBEHOME);

    var culture = JetSmart.TealiumData.culture;
    
    function scheduleTime(start_date, end_date) { // fecha en forma de YYYY-MM-DD HH:MM
        return new Date() >= new Date(start_date) && new Date() < new Date(end_date);
    }

    let start_date = '2024-07-25 23:30';
    let end_date = '2024-09-01 10:00';

    function addCSS() {
        var css = `
        #containerTextPC {
            margin: 5px 25px;
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
        var promoElement = document.querySelector('.dg-promo-code');
        var logeado = document.querySelector('[data-test-id="MENU_LOGOUT_OPENER"]');

        if (!document.querySelector('#containerTextPC') && promoElement) {
            var lineText1, lineText2 = '';

            switch (culture) {
            case 'en-US':
                lineText1 = 'To use the promocode you entered, you must log in as a <strong>Banco Estado Client</strong>.';
                if (!logeado) lineText2 = 'HERE';
                break;
            case 'pt-BR':
                lineText1 = 'Para usar o código que você inseriu, é necessário fazer login como <strong>Cliente do Banco Estado</strong>.';
                if (!logeado) lineText2 = 'AQUI';
                break;
            default:
                lineText1 = 'Para utilizar el código ingresado, debes iniciar sesión como <strong>Cliente Banco Estado</strong>.';
                if (!logeado) lineText2 = 'AQUÍ';
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

    function isBE() {
        var BEHome = document.querySelector('.user-data-banco-estado');
        var BEHome2 = document.querySelector('.dg-banco-estado-name');
        var BEHome3 = document.querySelector('.dg-banco-estado-org-name');

        if (BEHome || BEHome2 || BEHome3) {
            return true;
        } else {
            return false;
        }
    }

    function inputPCBE() {
        var promoCodeInput = document.querySelector('.dg-promo-code input');
        var textBE = document.querySelector('#containerTextPC');
        var buttonSearch = document.querySelector('[data-test-id="SUBMIT_SEARCH_BUTTON"]');
        var lastSearch = document.querySelector('.px-0.pb-0.m-0.w-full.pt-2.text-center');

        promoCodeInput.addEventListener('input', function() {
            var inputValue = promoCodeInput.value.toLowerCase();

            if (inputValue.substring(0, 3) === 'cbe' && textBE) {
                console.log('si es CBE');
                textBE.style.display = 'block';
                if (buttonSearch) {
                    buttonSearch.style.display = 'none';
                }
                if (lastSearch) {
                    lastSearch.style.display = 'none';
                }
            } else {
                console.log('no es CBE');
                textBE.style.display = 'none';
                if (buttonSearch) {
                    buttonSearch.style.display = 'flex';
                }
                if (lastSearch) {
                    lastSearch.style.display = 'block';
                }
            }
        });
    }

    function getCookie(name) {
        let cookieArr = document.cookie.split(";");
        for (let i = 0; i < cookieArr.length; i++) {
            let cookiePair = cookieArr[i].split("=");
            if (name === cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
        return null;
    }

    function decodeBase64(base64String) {
        try {
            return atob(base64String);
        } catch (e) {
            console.error('Error decoding base64:', e);
            return null;
        }
    }

    function isRoleCodeEMPL(cookieName) {
        let encodedCookieValue = getCookie(cookieName);

        if (encodedCookieValue) {
            let decodedValue = decodeBase64(encodedCookieValue);
            if (decodedValue) {
                try {
                    let userInfo = JSON.parse(decodedValue);
                    return userInfo.RoleCode === "EMPL";
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                    return false;
                }
            }
        }

        return false;
    }

    if (isBE() === false && isRoleCodeEMPL("JS_UserInfo") === false && scheduleTime(start_date, end_date)) {
        console.log('no es staff')
        addCSS();
        addText();
        inputPCBE();
    } else {
         console.log('es staff')
    }

}, 600);