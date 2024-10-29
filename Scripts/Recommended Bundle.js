var initRecommendedBundle = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/flight') return;
    clearInterval(initRecommendedBundle);

    var culture = bookingData.Culture;

    function addCSS() {
      var css = `
      .bundle-footer {
          padding-bottom: 25px;
      }

      .new-button-container-bundle {
          border-top: 1px solid #d9d9d9;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #1c355e;
          padding: 15px;
      }

      .new-button-container-bundle span {
        font-weight: 900;
    }

    .new-button-container-bundle .circle {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid #1c355e;
      margin-right: 10px;
      position: relative;
  }

  .bundle-container:hover .circle::before {
      content: "";
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #1c355e;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
  }

  .new-button-container-bundle .circle.selected {
      border: 2px solid #00abcd;
  }

  .new-button-container-bundle .circle.selected::before {
      content: "";
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #00abcd;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
  }

  .selected {
      color: #00abcd;
  }

  .bundle-container {
      cursor: pointer;
  }

  .bundles-container.hidden-xs .bundle-container[data-test-value="BND0"] .line-container {
      margin: 15px 0 25px;
  }

  .bundles-container.hidden-xs .bundle-container[data-test-value="BNC0"] .line-container {
      margin: 15px 0 25px;
  }

  .bundles-container.hidden-xs .bundle-container[data-test-value="BND2"] .desc-bundle {
      margin: 0;
      margin-bottom: 15px;
  }

  .bundles-container.hidden-xs .bundle-container[data-test-value="BNC2"] .desc-bundle {
      margin: 0;
      margin-bottom: 15px;
  }

  .offer-bundle {
     position: relative;
     width: 100%;
     height: 70px;
     margin-bottom: 15px;
 }

 .offer-bundle .container-offer {
     position: absolute;
     top: 0;
     bottom: 0;
     left: -7px;
     right: -7px;
     background: #b02b32;
     color: #fff;
     display: flex;
     align-items: center;
     justify-content: center;
 }

 .text-center-offer {
     text-align: center;
 }

 .offer-bundle .container-offer-emphasis {
     font-family: Lato,sans-serif;
     font-size: 16px;
     line-height: 1;
     margin-bottom: 3px;
     margin-left: 3px;
     margin-right: 3px;
 }

 .offer-bundle .container-offer:before {
     content: "";
     position: absolute;
     top: 100%;
     left: 0;
     width: 0;
     height: 0;
     border-style: solid;
     border-width: 0 7px 12px 0;
     border-color: transparent #b02b32 transparent transparent;
 }

 .offer-bundle .container-offer:after {
     content: "";
     position: absolute;
     top: 100%;
     right: 0;
     width: 0;
     height: 0;
     border-style: solid;
     border-width: 0 0 12px 7px;
     border-color: transparent transparent transparent #b02b32;
 }

 .desc-bundle {
    display: none;
}

.desc-bundle .container-desc {
 background: #00abcd;
}

.desc-bundle .container-desc:before {
 border-color: transparent #00abcd transparent transparent;
}

.desc-bundle .container-desc:after {
 border-color: transparent transparent transparent #00abcd;
}

.container-new-button {
    position: relative;
    display: flex;
    background-color: #b2292e;
    color: #fff;
    border: 2px solid #b2292e;
    padding: 10px 35px 10px 15px;
    border-radius: 9999px;
    font-weight: 700;
    font-size: 18px;
    align-items: center;
    line-height: 1;
    margin: 0 auto 0 auto;
    cursor: pointer;
}

.container-new-button:after {
    position: absolute;
    font-weight: 400;
    top: 50%;
    transform: translateY(-50%);
    font-family: jetsmart-v2!important;
    right: 5px;
    content: "\\E9BA";
    font-size: 25px;
}

.container-new-button:hover {
    background-color: #fff;
    color: #b2292e;
}

.per-leg-bundles-selector.open .bundles-container {
    margin: 10px auto 20px;
}

.bundle-availability {
    display: none;
}

.best-price-label {
    display: none;
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
}

function deleteSeatsLeft(){
	if (window.innerWidth >= 768) {
		setTimeout(function () {
			var elements = document.querySelectorAll('.bundle-availability');
			elements.forEach(function (element) {
				if(element){
					element.parentNode.removeChild(element);
				}
			});
		}, 1100);
	}
}

function hideOldButtons() {
	var buttons = document.querySelectorAll('button[data-test-value="BND0"], button[data-test-value="BND1"], button[data-test-value="BND2"], button[data-test-value="BNC0"], button[data-test-value="BNC1"], button[data-test-value="BNC2"]')
	buttons.forEach(function (element) {
		element.style.display = 'none';
	});
}

function hideDiscount() {
    setTimeout(function () {
        var elements = document.querySelectorAll('.desc-bundle');
        elements.forEach(function (element) {
            if(element){
                element.style.display = 'none';
            }
        });
    }, 500);
}

function allRemoveBundles() {
	//deleteSeatsLeft();
	hideOldButtons();
    //hideDiscount();
}

function addNewButton(selector) {
  var targetElements = document.querySelectorAll('.bundles-container.hidden-xs .bundle-container');

  targetElements.forEach(function (targetElement) {
    var dataTestValue = targetElement.getAttribute('data-test-value');
    if (dataTestValue) {
      if (targetElement.querySelector('.new-button-container-bundle')) {
        return;
    }

      // Obtén el último dígito del selector
    var lastDigit = selector.slice(-1);

      // Construye los posibles selectores
    var possibleSelectors = ['BND' + lastDigit, 'BNC' + lastDigit];

      // Verifica si dataTestValue está en possibleSelectors
    var isSelected = possibleSelectors.includes(dataTestValue);

    var buttonText = isSelected ? "Seleccionado" : "¡Lo quiero!";
    var selectedClass = isSelected ? "selected" : "";

    var html = `
    <div class="new-button-container-bundle" data-test-value="${dataTestValue}">
    <div class="circle ${selectedClass}" id="circle-${dataTestValue}"></div>
    <span class="${selectedClass}">${buttonText}</span>
    </div>
    `;

    targetElement.insertAdjacentHTML('beforeend', html);

    if (lastDigit === '0') {
      var lineContainer = targetElement.querySelector('.line-container');
      if (lineContainer) {
        lineContainer.style.margin = '15px 0 25px';
    }
}
}
});
}

function addOffer(selector) {
    var elements = document.querySelectorAll('[data-test-value="' + selector + '"] .line-container');

    var html = `
    <div class="offer-bundle">
    <div class="container-offer">
    <div class="text-center-offer">
    <div class="container-offer-emphasis">
    Hemos seleccionado la mejor opción para tu viaje, puedes escoger otra seleccionando el botón <b>¡Lo quiero!</b>
    </div>
    </div>
    </div>
    </div>
    `;

    elements.forEach(function(element) {
        var nextSibling = element.nextElementSibling;
        if (nextSibling && nextSibling.classList.contains('offer-bundle')) {
            return;
        }
        element.insertAdjacentHTML('afterend', html);
    });
}

function addContinueButton(selector) {
    var targetElement = document.querySelector('[data-test-id="bundle-selector--j|0"] .bundles-header');
    var targetElement2 = document.querySelector('[data-test-id="bundle-selector--j|1"] .bundles-header');
    
    var selector2 = selector.replace('BND', 'BNC');

    if (targetElement) {
        var existingButton = targetElement.parentNode.querySelector('.container-new-button');
        if (!existingButton) {
            var div = document.createElement('div');
            div.style.display = 'flex';
            div.innerHTML = '<div class="container-new-button" id="recomendadorIda">Continuar con el recomendado</div>';
            targetElement.insertAdjacentElement('afterend', div);
            var button = document.querySelector('#recomendadorIda');
            button.addEventListener('click', function() {
                var elementToClick = document.querySelector('[data-test-id="bundle-selector--j|0"] [data-test-value="' + selector + '"]');
                if(!elementToClick) {
                    elementToClick = document.querySelector('[data-test-id="bundle-selector--j|0"] [data-test-value="' + selector2 + '"]');
                }
                if(elementToClick) {
                    elementToClick.click();
                }
            });
        }
    }
    
    if (targetElement2) {
        var existingButton2 = targetElement2.parentNode.querySelector('.container-new-button');
        if (!existingButton2) {
            var div2 = document.createElement('div');
            div2.style.display = 'flex';
            div2.innerHTML = '<div class="container-new-button" id="recomendadorVuelta">Continuar con el recomendado</div>';
            targetElement2.insertAdjacentElement('afterend', div2);
            var button2 = document.querySelector('#recomendadorVuelta');
            button2.addEventListener('click', function() {
                var elementToClick = document.querySelector('[data-test-id="bundle-selector--j|1"] [data-test-value="' + selector + '"]');
                if(!elementToClick) {
                    elementToClick = document.querySelector('[data-test-id="bundle-selector--j|1"] [data-test-value="' + selector2 + '"]');
                }
                if(elementToClick) {
                    elementToClick.click();
                }
            });
        }
    }  
}

function isDesktop() {
    if (window.innerWidth >= 768) {
        return true;
    } else {
        return false;
    }
}

function selectBundle(selector) {
    addNewButton(selector);
    addOffer(selector);
    var alternateSelector = selector.replace('D', 'C');
    addNewButton(alternateSelector);
    addOffer(alternateSelector);
}

function allFunctions(selector) {
    allRemoveBundles();
    selectBundle(selector)
    addContinueButton(selector);
}

function allFunctionsClicks(selector) {
    var smartFeeButtons = document.querySelectorAll('.smart-fee.nowrap.big, .discount-fee.nowrap.small, .smart-fee.nowrap.small, .discount-fee.nowrap.big');
    var buttonClickHandler = function () {
     allRemoveBundles();
     selectBundle(selector)
     addContinueButton(selector);
 };
 smartFeeButtons.forEach(button => button.addEventListener('click', buttonClickHandler));
}

var bundleSelected = 'BND1' // BUNDLE A RECOMENDAR

if (culture === 'es-CL' && isDesktop()){
    addCSS();
    allFunctionsClicks(bundleSelected);
    allFunctions(bundleSelected);
    window.eventBus.subscribe({
        name: "recommendedBundle", callback: function (e) {
            allFunctionsClicks(bundleSelected);
            allFunctions(bundleSelected);
        }
    });
}

}, 600);