var moreSimpleAB = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
  clearInterval(moreSimpleAB);

  var postB = bookingData.PostBooking;
  var culture = bookingData.Culture;
  var staff = bookingData.Role;

  function addCSS() {
    var css = `
    .equipaje-contenedor {
      display: none !important;
    }

    .bundle-ssr-items [data-test-value="0"] {
      visibility: hidden !important;
    }

    @media (max-width: 767px) {
    .bundle-content .bundle-header {
        height: 165px;
        justify-content: center;
        border-bottom-left-radius: 50% 25%;
        border-bottom-right-radius: 50% 25%;
      }
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

    head.appendChild(style);
  }

  if (culture && staff !== 'WWW Staff Travel') {
    addCSS();
  }

}, 600);