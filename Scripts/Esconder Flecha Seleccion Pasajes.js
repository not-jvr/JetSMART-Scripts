var initHideArrowSeleccionPasajes = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
  clearInterval(initHideArrowSeleccionPasajes);

  var css = `
  .active:after {
    display: none !important;
}
`;

var head = document.head || document.getElementsByTagName('head')[0];
var style = document.createElement('style');
head.appendChild(style);
style.type = 'text/css';

if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}

}, 400);