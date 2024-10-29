var notFlexiSMART = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/flight') return;
    clearInterval(notFlexiSMART);
    var culture = bookingData.Culture;

    function moveFlexi() {
  var elementsToMove = document.querySelectorAll('[data-test-id="bundle-ssr-item--j|0-c|simple|FLXB"]');
  var referenceElements = document.querySelectorAll('[data-test-id="bundle-ssr-item--j|0-c|simple|SOMESEATS"]');
  if (elementsToMove.length === referenceElements.length) {
    elementsToMove.forEach(function(elementToMove, index) {
      var referenceElement = referenceElements[index];
      var iconElement = elementToMove.querySelector('.js-icon.js-flight-tick');
      if (iconElement) {
        iconElement.className = 'js-icon-bundle js-bundle-circle-x-full';

        var costElement = elementToMove.querySelector('.ssr-line-name span');
        if (costElement && costElement.textContent.includes('costo $0')) {
          costElement.style.display = 'none';
        }

        if (referenceElement) {
          referenceElement.insertAdjacentElement('afterend', elementToMove);
        }
      }
    });
  }
}

function moveFlexi2() {
  var elementsToMove = document.querySelectorAll('[data-test-id="bundle-ssr-item--j|1-c|simple|FLXB"]');
  var referenceElements = document.querySelectorAll('[data-test-id="bundle-ssr-item--j|1-c|simple|SOMESEATS"]');
  if (elementsToMove.length === referenceElements.length) {
    elementsToMove.forEach(function(elementToMove, index) {
      var referenceElement = referenceElements[index];
      var iconElement = elementToMove.querySelector('.js-icon.js-flight-tick');
      if (iconElement) {
        iconElement.className = 'js-icon-bundle js-bundle-circle-x-full';

        var costElement = elementToMove.querySelector('.ssr-line-name span');
        if (costElement && costElement.textContent.includes('costo $0')) {
          costElement.style.display = 'none';
        }

        if (referenceElement) {
          referenceElement.insertAdjacentElement('afterend', elementToMove);
        }
      }
    });
  }
}



function allEdits(){
    moveFlexi();
    moveFlexi2();
}

function allEditsClick() {
    var smartFeeButtons = document.querySelectorAll('.smart-fee.nowrap.big, .discount-fee.nowrap.small, .smart-fee.nowrap.small, .discount-fee.nowrap.big');
    var buttonClickHandler = function () {
       moveFlexi();
       moveFlexi2();
   };
   smartFeeButtons.forEach(button => button.addEventListener('click', buttonClickHandler));
}

if(culture === 'es-CL'){
    allEdits();
    allEditsClick();
    window.eventBus.subscribe({
        name: "SameBundleSize", callback: function (e) {
            allEdits();
            allEditsClick();
        }
    });
}

}, 600);