 var initBackgroundColor = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Baggage') return;
    clearInterval(initBackgroundColor);
    var css = `
    .b2-section-header {    
        background-color: #f2f2f2;
        border-radius: 10px;
        padding: 10px 20px 10px 40px;
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
}, 400);