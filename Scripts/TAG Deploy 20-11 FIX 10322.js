var fix10322 = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Itinerary') return;
    clearInterval(fix10322);

    var role = bookingData.Role;

    function addCSS() {
        var css = `

        [data-test-id="itinerary-tab--c|Modify"], [data-test-id="itinerary-tab--c|Modify-m|1"] {
            display: none !important;
        }
        `;

        var style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }

    function hasCuentaPeruCompras() {
        const table = document.querySelector('.i2-transactions-table');

        if (!table) {
            return false;
        }

        return Array.from(table.querySelectorAll('td')).some(td => td.textContent.trim() === 'Cuenta Perú Compras');
    }

    function isWebA() {
        if (role === 'WWW Anonymous') {
            return true;
        } else {
            return false;
        }
    }

    if (hasCuentaPeruCompras() && isWebA()) {
        addCSS();
    }

}, 600);