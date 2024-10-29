var redirectModal = setInterval(function () {
    if (!window.location.pathname.includes('cambios-y-devoluciones')) return;
    clearInterval(redirectModal);

    function addCSS() {
        var css = `
        #redirectURL {
            cursor: pointer;
            text-decoration: underline;
        }

        #redirectURL:hover {
            color: #B2292E;
        }
        `;

        var style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }

    function addNewID() {
        var consultaAquiText = document.querySelector("#modalCosto #costo_text");
        if (consultaAquiText && !document.querySelector('#redirectURL')) {
            var contenidoTexto = consultaAquiText.innerHTML;

            var currentURL = window.location.href;
            var replacement = 'aquí';

            if (currentURL.includes('/br/pt')) {
                replacement = 'aqui';
                contenidoTexto = contenidoTexto.replace(/(aqui)/gi, '<span id="redirectURL">' + replacement + '</span>');

                consultaAquiText.innerHTML = contenidoTexto;

            } else if (currentURL.includes('/us/en')) {
                replacement = 'here';
                contenidoTexto = contenidoTexto.replace(/\b(here)\b/gi, '<span id="redirectURL">' + replacement + '</span>');

                consultaAquiText.innerHTML = contenidoTexto;
            } else {
                contenidoTexto = contenidoTexto.replace(/(aqu[ií])/gi, '<span id="redirectURL">' + replacement + '</span>');

                consultaAquiText.innerHTML = contenidoTexto;
            }
        }
    }

    function clickRedirect() {
        var redirectElement = document.querySelector('#redirectURL');
        if (redirectElement) {
            redirectElement.addEventListener('click', function() {
                var currentURL = window.location.href;
                var newURL;

                if (currentURL.includes('/ar/es')) {
                    newURL = 'https://jetsmart.com/ar/es/opcionales/home';
                } else if (currentURL.includes('/cl/es')) {
                    newURL = 'https://jetsmart.com/cl/es/opcionales/home';
                } else if (currentURL.includes('/pe/es')) {
                    newURL = 'https://jetsmart.com/pe/es/opcionales/home';
                } else if (currentURL.includes('/co/es')) {
                    newURL = 'https://jetsmart.com/co/es/opcionales/home';
                } else if (currentURL.includes('/uy/es')) {
                    newURL = 'https://jetsmart.com/uy/es/opcionales/home';
                } else if (currentURL.includes('/py/es')) {
                    newURL = 'https://jetsmart.com/py/es/opcionales/home';
                } else if (currentURL.includes('/br/pt')) {
                    newURL = 'https://jetsmart.com/br/pt/opcionales/home';
                } else if (currentURL.includes('/us/en')) {
                    newURL = 'https://jetsmart.com/us/en/opcionales/home';
                } else {
                    newURL = 'https://jetsmart.com/cl/es/opcionales/home';
                }

                window.open(newURL, '_blank');
            });
        }
    }

    function clickContinueButton() {
        console.log("aaa")
        var continueButton = document.querySelector('#continueBtn1');
        if (continueButton) {
            addCSS();
            continueButton.addEventListener('click', function() {
                setTimeout(function () {
                    addNewID();
                    clickRedirect();
                }, 2000);
            });
        }
    }

    clickContinueButton();

}, 600);