var initNoLightBundle = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/flight') return;
    clearInterval(initNoLightBundle);

    var culture = bookingData.Culture;
    
    function esBancoEstado() {
        var bancoEstado = JetSmart.AppContext.bancoEstadoCategory;
        if (bancoEstado && bancoEstado !== '0') {
            return true;
        } else {
            return false;
        }
    }

    function addCSS() {
        var css = `
        .bundles-container {
            max-width: 90%;
        }

        .selected-flight .bundle-container {
            width: 45%;
        }

        [data-test-id="bundle-selector-option--j|0-c|full"] .desc-bundle {
            margin: 0;
            position: relative;
            width: 100%;
            height: 45px;
            margin-bottom: 15px !important;
        }

        .per-leg-bundles-selector.open .bundles-container {
            margin: 10px auto 20px !important;
        }

        .container-new-button {
            position: relative;
            display: flex;
            background-color: #fff;
            color: #b2292e;
            border: 2px solid #b2292e;
            padding: 10px 35px 10px 15px;
            border-radius: 9999px;
            font-weight: 700;
            font-size: 18px;
            align-items: center;
            line-height: 1;
            margin: 0 auto 20px auto;
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
            background-color: #b2292e;
            color: #fff;
        }

        #lightBundleModal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #lightBundleModal .modal-content {
            background: #ffffff;
            border-radius: 10px;
            padding: 0;
            z-index: 1;
            width: 22%;
        }

        #lightBundleModal .modal-header {
            background-color: #163a70;
            padding: 20px;
            color: #ffffff;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }

        #lightBundleModal .modal-header h4 {
            font-weight: bold;
            font-size: 23px;
            font-family: Lato, sans-serif;
            text-align: center;
        }

        #lightBundleModal .modal-header .closeButton {
            position: absolute;
            top: 5px;
            right: 10px;
            background: none;
            border: none;
            font-size: 30px;
            color: #ffffff;
            cursor: pointer;
            padding: 0;
        }

        #lightBundleModal .modal-header .closeButton:hover {
            color: rgb(185, 34, 52);
        }

        #lightBundleModal .modal-body {
            padding: 24px;
            font-family: 'Arial', sans-serif;
            font-size: 18px;
            color: #333333;
            text-align: center;
        }

        #lightBundleModal .modal-body p {
            margin: 0;
            font-size: 18px;
            color: #163a70;
        }

        #lightBundleModal .modal-body .buttonContainer {
            display: flex;
            justify-content: space-between;
        }

        #lightBundleModal .modal-body .buttonContinue {
            background-color: #163a70;
            color: #ffffff;
            border-radius: 20px;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            font-family: Lato,sans-serif;
            font-weight: bold;
            margin-top: 12px;
            border: 2px solid #163a70;
            --border-opacity: 1;
            width: 46%;
        }

        #lightBundleModal .buttonContinue:hover {
            color: #163a70;
            background-color: rgba(255, 255, 255);
        }

        #lightBundleModal .modal-body .buttonBack {
            background-color: rgba(255, 255, 255);
            color: #163a70;
            border-radius: 20px;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            font-family: Lato,sans-serif;
            font-weight: bold;
            margin-top: 12px;
            border: 2px solid #163a70;
            --border-opacity: 1;
            width: 46%;
        }

        #lightBundleModal .buttonBack:hover {
            background-color: #163a70;
            color: #ffffff;
        }

        @media (max-width: 767px) {
            #lightBundleModal .modal-content {
                width: 90%;
            }

            .container-new-button {
                display: none;
            }
        }
        `;

        var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

        head.appendChild(style);

        style.type = 'text/css';
        if (style.styleSheet){
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    }

    function hideLightBundle() {
      var lightBundles = document.querySelectorAll('[data-test-value="BND0"]');
      var lightBundles2 = document.querySelectorAll('[data-test-value="BNC0"]');

      lightBundles.forEach(function(bundle) {
        if (!bundle.classList.contains('bundle-upgrade-button')) {
          bundle.style.display = 'none';
      }
  });

      lightBundles2.forEach(function(bundle) {
        if (!bundle.classList.contains('bundle-upgrade-button')) {
          bundle.style.display = 'none';
      }
  });
  }

  function addContinueButtonOutbound() {
    var targetElement = document.querySelector('[data-test-id="bundle-selector--j|0"]');
    if (targetElement) {
        var existingButton = targetElement.parentNode.querySelector('.container-new-button');
        if (!existingButton) {
            var div = document.createElement('div');
            div.style.display = 'flex';
            div.innerHTML = '<div class="container-new-button" id="lightButtonOutbound">Continuar sin pack</div>';
            targetElement.insertAdjacentElement('afterend', div);
            var button = document.querySelector('#lightButtonOutbound');
            button.addEventListener('click', function () {
                if (document.querySelector('.modal.outbound')) {
                    var modal = document.querySelector('.modal.outbound');
                    if (modal.style.display === 'none') {
                        modal.style.display = 'block';
                    }
                } else {
                    addModal(0, 'outbound');
                }
            });
        }
    }
}

function addContinueButtonReturn() {
    var targetElement = document.querySelector('[data-test-id="bundle-selector--j|1"]');
    if (targetElement) {
        var existingButton = targetElement.parentNode.querySelector('.container-new-button');
        if (!existingButton) {
            var div = document.createElement('div');
            div.style.display = 'flex';
            div.innerHTML = '<div class="container-new-button" id="lightButtonReturn">Continuar sin pack</div>';
            targetElement.insertAdjacentElement('afterend', div);
            var button = document.querySelector('#lightButtonReturn');
            button.addEventListener('click', function () {
                if (document.querySelector('.modal.return')) {
                    var modal = document.querySelector('.modal.return');
                    if (modal.style.display === 'none') {
                        modal.style.display = 'block';
                    }
                } else {
                    addModal(1, 'return');
                }
            });
        }
    }
}

function addModal(selector, type) {
    if (!document.querySelector('.modal.' + type + '')) {
        var iconUrl = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/8ee53cdf-db14-4fc3-a0dd-00927ad372dc/Exclamaci%C3%B3n%20icon.png';
        var titleWithIcon = '<img src="' + iconUrl + '" alt="Icono de advertencia" style="vertical-align: middle; margin-right: 10px;"> Importante';

        var lineText1 = 'Si eliges continuar sin pack, solo tendrás incluido una mochila y SMARTICKET';
        var buttonContinue = 'Continuar';
        var buttonBack = 'Volver';

        var modalTemplate = `
        <div id="lightBundleModal" class="modal ${type}" style="display: block;">
        <div class="modal-content">
        <div class="modal-header">
        <h4>${titleWithIcon}</h4>
        <div class="closeButton">×</div>
        </div>
        <div class="modal-body">
        <p>${lineText1}</p>
        <div class="buttonContainer">
        <div class="buttonContinue">${buttonContinue}</div>
        <div class="buttonBack">${buttonBack}</div>
        </div>
        </div>
        </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalTemplate);

        var continueButton = document.querySelector('.modal.' + type + ' .buttonContinue');
        var backButton = document.querySelector('.modal.' + type + ' .buttonBack');
        var closeButton = document.querySelector('.modal.' + type + ' .closeButton');
        var modalContinue = document.querySelector('.modal.' + type + '');

        continueButton.addEventListener('click', function () {
            var lightBundle = document.querySelector('[data-test-id="bundle-selector--j|' + selector + '"] [data-test-value="BND0"]');
            var lightBundle2 = document.querySelector('[data-test-id="bundle-selector--j|' + selector + '"] [data-test-value="BNC0"]');
            if (lightBundle) {
                modalContinue.style.display = 'none';
                lightBundle.click();
            }
            if (lightBundle2) {
                modalContinue.style.display = 'none';
                lightBundle2.click();
            }
        });

        backButton.addEventListener('click', function () {
            modalContinue.style.display = 'none';
        });

        closeButton.addEventListener('click', function () {
            modalContinue.style.display = 'none';
        });
    }
}

function allFunctions() {
    hideLightBundle();
    addContinueButtonOutbound();
    addContinueButtonReturn();
}

function allFunctionsClicks() {
    var smartFeeButtons = document.querySelectorAll('.smart-fee.nowrap.big, .discount-fee.nowrap.small, .smart-fee.nowrap.small, .discount-fee.nowrap.big');
    var buttonClickHandler = function () {
        hideLightBundle();
        addContinueButtonOutbound();
        addContinueButtonReturn();
    };
    smartFeeButtons.forEach(button => button.addEventListener('click', buttonClickHandler));
}

if ((culture === 'es-CL' || culture === 'es-PE' || culture === 'es-AR') && !esBancoEstado()) {
   addCSS();
   allFunctions();
   allFunctionsClicks();
   window.eventBus.subscribe({
    name: "currency_change",
    callback: function (e) {
        allFunctions();
        allFunctionsClicks();
    },
});
}

}, 600);