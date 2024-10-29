var fakeInput = setInterval(function () {
    if (!window.location.pathname.toLowerCase().startsWith('/ar/es/minisitios/codigos-descuento')) return;
    clearInterval(fakeInput);

    function addCSS() {
        var css = `
        #fakeDNILabel {
            top: auto;
        }

        #fakeCointaier {
            margin-bottom: 1rem;
        }

        .MSG {
            font-size: 16px;
            text-align: center;
            font-weight: 700;
        }
        `;

        var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

        head.appendChild(style);

        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    }

    function addFakeInput() {
        if (!document.querySelector('#fakeCointaier')) {
            var container = document.createElement("div");
            container.id = "fakeCointaier";
            var input = document.createElement("input");
            input.id = "fakeDNI";
            input.type = "text";

            var label = document.createElement("label");
            label.textContent = "DNI de jubilado";
            label.id = "fakeDNILabel";

            container.appendChild(label);
            container.appendChild(input);

            var formGroup = document.querySelector(".form-group");

            formGroup.parentNode.insertBefore(container, formGroup.nextSibling);
        }
    }

    function hideContinueButton() {
        var button = document.querySelector('#continueBtn1');
        if (button) {
            button.style.display = 'none';
        }
    }

    function showContinueButton() {
        var button = document.querySelector('#continueBtn1');
        if (button) {
            button.style.display = 'block';
        }
    }

    function addMSG() {
        var msg = document.querySelector('.MSG');
        if (!msg) {
            var mainHeader = document.querySelector('#fakeCointaier');
            mensaje = '<div class="MSG">IMPORTANTE: Si el/los pasajero/s no son personas que se encuentren dentro de la base de jubilados ANSES, las reservas serán dadas de baja.</div>';
            mainHeader.insertAdjacentHTML('afterend', mensaje);
        } else if (msg) {
            msg.style.display = 'block';
        }
    }

    function hideMSG() {
        var msg = document.querySelector('.MSG');
        if (msg) {
            msg.style.display = 'none';
        }
    }

    function inputText() {
        var inputElement = document.querySelector('#fakeDNI');
        inputElement.addEventListener("input", function() {
            var inputValue = inputElement.value;

            var numerosEnInput = inputValue.match(/\d/g);

            if (numerosEnInput && numerosEnInput.length === 8) {
                showContinueButton();
                addMSG();
            } else {
                hideContinueButton();
                hideMSG();
            }
        });
    }

    addCSS();
    hideContinueButton();
    addFakeInput();
    inputText();

}, 600);