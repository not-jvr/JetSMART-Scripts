var fixMarginPayments = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Payment') return;
    clearInterval(fixMarginPayments);

    function addCSS() {
     var css = `
     #mainContentPayment .tabs nav ul li {
        margin-left: 0px;
    }

    #mainContentPayment .tabs nav ul li label {
        margin-right: 10px;
    }
    `;

    var style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
}

addCSS();

}, 600);