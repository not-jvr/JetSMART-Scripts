  var initTagPeruComprasExtras = setInterval(function() {
  	if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Extras') return;
  	clearInterval(initTagPeruComprasExtras);

  	function isPeruCompras() {
        var peruCompras1 = JetSmart.AppContext.isPeruCompraAdmin;
        var peruCompras2 = JetSmart.AppContext.isPeruCompraBooking;
        var peruCompras3 = JetSmart.AppContext.isPeruCompraMember;

        if (peruCompras1 && peruCompras1 === 'True') {
            return true;
        } else if (peruCompras2 && peruCompras2 === 'True') {
            return true;
        } else if (peruCompras3 && peruCompras3 === 'True') {
            return true;
        } else {
            return false;
        }
    }

    function addCSS() {
        var css = `
        [data-test-id="extras-checkin-container"]{
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

   function autoSelect() {
    const elements = document.querySelectorAll('.checkin-type-label[data-test-id="extras-checkin-paid-option--j|0-p|0"], .checkin-type-label[data-test-id="extras-checkin-paid-option--j|1-p|0"]');
    let index = 0;

    function clickElement() {
       if (index < elements.length) {
          elements[index].click();
          index++;
          setTimeout(clickElement, 1000);
      }
  }
  clickElement();
}

function selectAll() {
    var allSelect = document.querySelector('[data-test-id="extras-checkin-copy-checkbox"]')
    if (allSelect) {
       allSelect.click();
   }
}

if (isPeruCompras()) {
    addCSS();
    autoSelect();
    setTimeout(function () {
       selectAll();
   }, 2000);
}

}, 600);