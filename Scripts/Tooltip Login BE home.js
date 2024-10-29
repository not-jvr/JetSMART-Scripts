var initMsgBE = setInterval(function() {
    if (!window.location.href.startsWith('https://jetsmart.com/cl/es/')) return;
    clearInterval(initMsgBE);

    function isLogin() {
        var userType = document.querySelector('.user-data');
        if (userType !== null) {
            return true;
        } else {
            return false;
        }
    }

    function isHome() {
        var searchBox = document.querySelector('[data-test-id="SEARCHBOX_CONTAINER"]');
        if (searchBox) {
            return true;
        } else {
            return false;
        }
    }

    function isDesktop() {
        if (window.innerWidth >= 768) {
            return true;
        } else {
            return false;
        }
    }

    function addCSS() {
        var css = `
        .message-capsule {
            position: absolute;
            top: 65px;
            right: 190px;
            background-color: #fff;
            border: 1px solid #204071;
            border-radius: 1rem;
            padding: 20px;
            z-index: 9999999;
            max-width: 400px;
        }

        .message-capsule::before {
            content: "";
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 10px solid #204071;
        }

        .message-capsule h2 {
            font-size: 16px;
            margin-bottom: 5px;
            color: #204071;
            text-align: center;
        }

        .message-capsule ul {
            margin-bottom: 5px;
            color: #204071;
        }

        .message-capsule li {
            padding-bottom: 5px;
            display: flex;
            align-items: flex-start;
        }

        .action-buttons {
            display: flex;
            justify-content: space-between;
        }

        .action-buttons #create-account {
            display: flex;
            justify-content: center;
            cursor: pointer;
            --bg-opacity: 1;
            background-color: rgba(255, 255, 255, var(--text-opacity));
            --text-opacity: 1;
            color: #ff9100;
            position: relative;
            border-radius: 9999px;
            letter-spacing: 0;
            text-transform: none;
            font-weight: 700;
            -moz-appearance: none;
            appearance: none;
            border-style: solid;
            border-width: 2px;
            --border-opacity: 1;
            border-color: #ff9100;
            line-height: 1;
            font-family: Lato, sans-serif;
            white-space: normal;
            text-align: center;
            font-size: 16px;
            max-width: 150px;
            padding: 10px 15px;
        }

        .action-buttons #create-account:hover {
            background-color: #ff9100;
            color: rgba(255, 255, 255, var(--text-opacity));
        }

        .action-buttons #login-account {
            display: flex;
            justify-content: center;
            cursor: pointer;
            --bg-opacity: 1;
            background-color: #ff9100;
            --text-opacity: 1;
            color: rgba(255, 255, 255, var(--text-opacity));
            position: relative;
            border-radius: 9999px;
            letter-spacing: 0;
            text-transform: none;
            font-weight: 700;
            -moz-appearance: none;
            appearance: none;
            border-style: solid;
            border-width: 2px;
            --border-opacity: 1;
            border-color: #ff9100;
            line-height: 1;
            font-family: Lato, sans-serif;
            white-space: normal;
            text-align: center;
            font-size: 16px;
            max-width: 150px;
            padding: 10px 15px;
        }

        .action-buttons #login-account:hover {
            background-color: rgba(255, 255, 255, var(--text-opacity));
            color: #ff9100
        }

        .message-capsule .close-button-capsule {
            position: absolute;
            top: 5px;
            right: 10px;
            cursor: pointer;
            font-size: 16px;
            color: #204071;
        }

        .center-image {
            text-align: center;
            margin-bottom: 10px;
        }

        .message-capsule .center-image img {
            max-width: 60%;
            height: auto;
        }

        .message-capsule .tick-icon {
            max-width: 5%;
            margin-top: 5px;
            margin-right: 5px;
        }

        @media screen and (min-width: 1024px) and (max-width: 1199px) {
            .message-capsule {
                top: 75px;
                right: 45px;
            }
        }

        @media screen and (min-width: 1200px) and (max-width: 1300px) {
            .message-capsule {
                right: 125px;
            }
        }

        @media screen and (min-width: 1700px) and (max-width: 1920px) {
            .message-capsule {
                right: 355px;
            }
        }

        @media screen and (max-width: 1023px) {
            .message-capsule {
                display: none;
            }
        }
        `;

        var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

        head.appendChild(style);

        style.type = 'text/css';
        if (style.styleSheet){
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    }

    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    
    var popupShown = getCookie("popupShown");
    if (popupShown === "true") {
        return;
    }
    
    function hideCustomMessage() {
        var messageCapsule = document.querySelector(".message-capsule");
        if (messageCapsule) {
            messageCapsule.style.display = "none";
        }
    }

    function showCustomMessage() {
        if (!document.querySelector('.message-capsule')) {
            var msgTemplate = `
            <div class="message-capsule">
            <div class="close-button-capsule">X</div>
            <h2>REGÍSTRATE Y OBTÉN BENEFICIOS</h2>
            <div class="center-image">
            <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/579d9b92-ea3a-470a-bbce-4028afe073b8/JS-BE.png" alt="Beneficios">
            </div>
            <ul>
            <li><img class="tick-icon" src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/08e9a016-1a49-4034-8755-b48aa5bfd019/garrapata.png"> Bono de bienvenida para todas las tarjetas Débito y Crédito.</li>
            <li><img class="tick-icon" src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/08e9a016-1a49-4034-8755-b48aa5bfd019/garrapata.png"> Asientos con precios preferenciales y embarque prioritario</li>
            <li><img class="tick-icon" src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/08e9a016-1a49-4034-8755-b48aa5bfd019/garrapata.png"> 6 o 12 cuotas sin interés para pagos en todas las tarjetas de crédito.</li>
            <li><img class="tick-icon" src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/08e9a016-1a49-4034-8755-b48aa5bfd019/garrapata.png"> Canjea puntos TodoSuma en boletos JetSMART</li>
            </ul>
            <div class="action-buttons">
            <div class="buttonCapsule" id="create-account">Crear cuenta</div>
            <div class="buttonCapsule" id="login-account">Iniciar sesión</div>
            </div>
            </div>
            `;

            var body = document.body,
            container = document.createElement('div');

            container.innerHTML = msgTemplate;
            body.appendChild(container);

            document.querySelector("#create-account").addEventListener("click", function() {
                window.location.href = "https://booking.jetsmart.com/V2/Login?bancoe=1&culture=es-cl&url=https://jetsmart.com/cl/es/";
            });

            document.querySelector("#login-account").addEventListener("click", function() {
                window.location.href = "https://booking.jetsmart.com/V2/Login?bancoe=1&culture=es-cl&url=https://jetsmart.com/cl/es/";
            });

            document.querySelector(".close-button-capsule").addEventListener("click", function() {
                hideCustomMessage();
            });

            document.querySelector('[data-test-id="SEARCHBOX_CONTAINER"]').addEventListener("click", function() {
                hideCustomMessage();
            });

            window.addEventListener("scroll", function () {
                hideCustomMessage();
            });

            document.addEventListener('click', function(event) {
            if (!event.target.matches('.message-capsule')) {
                hideCustomMessage();
            }
        });

            setCookie("popupShown", "true", 3);
        }
    }

    if (!isLogin() && isHome() && isDesktop()) {
        addCSS();
        showCustomMessage();
    }

}, 600);