var initPCEmpresasHome = setInterval(function() {
    if (!window.location.href.startsWith('https://jetsmart.com') || !document.querySelector('[data-test-id="SEARCHBOX_CONTAINER"]')) return;
    clearInterval(initPCEmpresasHome);

    var culture = JetSmart.TealiumData.culture;
    
    function scheduleTime(start_date, end_date) { // fecha en forma de YYYY-MM-DD HH:MM
        return new Date() >= new Date(start_date) && new Date() < new Date(end_date);
    }

    let start_date = '2024-07-25 23:30';
    let end_date = '2024-09-01 10:00';

    function addCSS() {
        var css = `
        #containerTextPCEmpresa {
            margin: 5px 25px;
            width: auto;
            text-align: center;
        }

        .textPCEmpresa {
            background: #e299a1;
            border-radius: 5px;
            color: #163a6f;
            display: inline-block;
            font-size: 14px;
            padding: 10px 25px;
        }

        .textPCEmpresa a {
            color: #163a6f;
            text-decoration: underline;
            font-weight: 700;
        }

        .textPCEmpresa a:hover {
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

        if (!document.querySelector('#containerTextPCEmpresa') && promoElement) {
            var lineText1, lineText2, link = '';
            lineText1 = 'Para utilizar el código ingresado, debes iniciar sesión como <strong>Empresa</strong>.';

            if (!logeado) {
                lineText2 = 'AQUÍ';
            }

            switch (culture) {
            case 'en-US':
                lineText1 = 'To use the entered code, you must log in as <strong>Company</strong>.';
                link = 'https://booking.jetsmart.com/V2/Login?company=1&culture=en-us&url=https://jetsmart.com/us/en/';
                if (!logeado) lineText2 = 'HERE';
                break;
            case 'pt-BR':
                lineText1 = 'Para utilizar o código inserido, você deve fazer login como <strong>Empresa</strong>.';
                link = 'https://booking.jetsmart.com/V2/Login?company=1&culture=pt-br&url=https://jetsmart.com/br/pt/';
                if (!logeado) lineText2 = 'AQUI';
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
            <div id="containerTextPCEmpresa" style="display: none;">
            <div class="textPCEmpresa">
            ${lineText1}
            ${lineText2 ? `<a href="${link}" class="login-link">${lineText2}</a>` : ''}
            </div>
            </div>
            `;

            promoElement.insertAdjacentHTML('afterend', alertPC);
        }
    }

    function inputPC() {
        var promoCodeInput = document.querySelector('.dg-promo-code input');
        var textError = document.querySelector('#containerTextPCEmpresa');
        var buttonSearch = document.querySelector('[data-test-id="SUBMIT_SEARCH_BUTTON"]');
        var lastSearch = document.querySelector('.px-0.pb-0.m-0.w-full.pt-2.text-center');

        promoCodeInput.addEventListener('input', function() {
            var inputValue = promoCodeInput.value.toLowerCase();

            if (inputValue.substring(0, 3) === 'ewd' && textError) {
                console.log('si es EWD');
                textError.style.display = 'block';
                if (buttonSearch) {
                    buttonSearch.style.display = 'none';
                }
                if (lastSearch) {
                    lastSearch.style.display = 'none';
                }
            } else {
                console.log('no es EWD');
                textError.style.display = 'none';
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

    function empresaOagencia() {
        let encodedCookieValue = getCookie("JS_UserInfo");

        if (encodedCookieValue) {
            let decodedValue = decodeBase64(encodedCookieValue);
            try {
                let userInfo = JSON.parse(decodedValue);
                let roleCode = userInfo.RoleCode;
                const validRoleCodes = ["CUAD", "CUGS", "CUGG", "EMPL"];
                return validRoleCodes.includes(roleCode);
            } catch (e) {
                console.error('Error parsing JSON:', e);
                return false;
            }
        } else {
            console.log("Cookie not found.");
            return false;
        }
    }

    if (empresaOagencia()) {
        console.log("RoleCode es válido.");
    } else {
    }


    if (!empresaOagencia()) {
        console.log('no es agencia/empresa')
        addCSS();
        addText();
        inputPC();
    } else {
     console.log('es empresa/agencia')
 }

}, 600);