var initCSSPayment = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/payment') return;
  clearInterval(initCSSPayment);

  function addCSS() {
    var css = `
    .basic-checkbox-wrapper label:before {
        z-index: 0;
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

addCSS();

}, 600);