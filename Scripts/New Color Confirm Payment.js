var newColorPayments = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Payments') return;
    clearInterval(newColorPayments);

    function addCSS() {

        var css = `
        #mainContentPayment .tabs [id^=payment_tab_]:checked+li label img {
            border: 4px solid #59c3d9;
        }

        #mainContentPayment .tabs [id^=payment_tab_]:checked+li label:after {
            display: none;
        }
    `,
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');
        head.appendChild(style);
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    }

    addCSS();

}, 600);