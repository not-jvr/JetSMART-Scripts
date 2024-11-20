var imageLoginAA = setInterval(function () {
    if (window.location.pathname !== '/V2/Login' || typeof JetSmart === "undefined") return;
    clearInterval(imageLoginAA);

    var culture = JetSmart.AppContext.culture;

    function addCSS() {
        var img = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/314f0a8f-6e47-4abf-a332-a4f5fbdef255/Widget-AA.png';
        var imgMobile = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/8f1fb121-454f-461b-aaec-59840ebd189a/Banner-portal%20empresas-desktop-ES.png';

        switch (culture) {
            case 'pt-BR':
                img = '';
                imgMobile = '';
                break;
            case 'en-US':
                img = '';
                imgMobile = '';
                break;
        }

        var css = `
    .col-xs-1.col-md-1-2:first-of-type {
        background-image: url('${img}');
        background-size: cover;
        background-position: center;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        cursor: pointer;
    }

    .col-xs-1.col-md-1-2:first-of-type > * {
        visibility: hidden;
    }

    .booking-wrapper.ts-error-parent.ts-error-container .row {
        margin: 0;
    }

    .booking-wrapper.ts-error-parent.ts-error-container {
        padding: 0;
    }

    .booking-wrapper.ts-error-parent.ts-error-container .col-xs-1.col-md-1-2 {
        padding: 25px;
    }

    @media (max-width: 1023px) {

    .col-xs-1.col-md-1-2:first-of-type {
        border-bottom-left-radius: 0;
        border-top-right-radius: 10px;
        background-image: url('${imgMobile}');
    }

    }

    `;
        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');

        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);
    }

    function addClickEvent() {
        var firstContainer = document.querySelector('.booking-wrapper.ts-error-parent.ts-error-container .col-xs-1.col-md-1-2:first-of-type');
        if (firstContainer) {
            firstContainer.addEventListener('click', function () {
                window.open('https://www.example.com', '_blank'); // Reemplaza con la URL deseada
            });
        }
    }

    function addClickEvent2() {

        var firstContainer2 = document.querySelector('.ts-error-parent');

        if (firstContainer2) {
            firstContainer2.addEventListener('click', function () {
                addClickEvent();
            });
        }

    }

    // Ejecuta las funciones
    addCSS();
    addClickEvent2();
    addClickEvent();

}, 600);