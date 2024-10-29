var initHideSMARTICKET = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
  clearInterval(initHideSMARTICKET);

  var culture = bookingData.Culture;

  function hideSMARTICKET(selector, selector2) {
    var elements = document.querySelectorAll(`[data-test-id="bundle-ssr-item--j|${selector}-c|${selector2}|none"]`);

    elements.forEach(function(element) {
        var lineNameElement = element.querySelector('.ssr-line-name');
        if (lineNameElement) {
            var content = lineNameElement.textContent.trim();
            var shouldHide = content === "SMARTICKET" || content === "Tarifa Aérea";

            if (shouldHide) {
                element.style.display = 'none';
            }
        }
    });
}

function allEdits() {
    hideSMARTICKET(0, 'none');
    hideSMARTICKET(1, 'none');
    hideSMARTICKET(0, 'simple');
    hideSMARTICKET(1, 'simple');
    hideSMARTICKET(0, 'full');
    hideSMARTICKET(1, 'full');
}

if (culture) {
    allEdits();
    window.eventBus.subscribe({
        name: "hideSMARTICKETALL",
        callback: function(e) {
            allEdits();
        }
    });
}

}, 600);