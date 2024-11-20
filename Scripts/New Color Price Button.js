var newColorOfertas = setInterval(function () {
    if (!window.location.pathname.includes('/ofertas')) return;
    clearInterval(newColorOfertas);

    function addCSS() {
        var css = `
        [data-test="price"] {
            color: rgb(0, 174, 199) !important;
        }

        [data-test="book-now"] {
            background-color: rgb(0, 174, 199) !important;
            border: 1px solid rgb(0, 174, 199) !important;
        }

        [data-test="book-now"]:hover {
            background-color: #fff !important;
            border: 1px solid rgb(0, 174, 199) !important;
            color: rgb(0, 174, 199) !important;
        }

        
    `;

        var style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }

    addCSS();

}, 600);