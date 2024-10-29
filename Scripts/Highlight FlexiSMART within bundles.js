var newNameFlexi = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
    clearInterval(newNameFlexi);

    var culture = bookingData.Culture;

    function addCSS() {
        var css = `
        .ssr-line-name .extraFlexi {
            font-weight: 400;
            font-size: 16px;
            display: unset;
        }

        .selected-bundle .ssr-line-name .extraFlexi {
            font-size: 13px;
        }

        @media (max-width: 767px) {

            .ssr-line-name .extraFlexi {
                font-size: 11px;
            }

            .selected-bundle .ssr-line-name .extraFlexi {
                font-size: 11px;
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

    function changeNames() {
        var text = 'Flexibilidad: <span class="extraFlexi">Cambios sin costos</span>';

        switch (culture) {
            case 'en-US':
                text = 'Flexibility: <span class="extraFlexi">Free changes</span>';
                break;
            case 'pt-BR':
                text = 'Flexibilidade: <span class="extraFlexi">Alterações sem custos</span>';
                break;
        }

        document.querySelectorAll('[data-test-id^="bundle-ssr-item-name--j"][data-test-id*="FLXB"]').forEach(element => {
            element.innerHTML = `${text}`;
        });
    }

    function changeNames2() {
        var text = 'Flexibilidad:';

        switch (culture) {
            case 'en-US':
                text = 'Flexibility:';
                break;
            case 'pt-BR':
                text = 'Flexibilidade:';
                break;
        }

        document.querySelectorAll('[data-test-id="bundle-tooltip-title--j|0-c|FLXB"], [data-test-id="bundle-tooltip-title--j|1-c|FLXB"]').forEach(element => {
            element.innerHTML = `${text}`;
        });
    }

    function allFunctions() {
        changeNames();
        changeNames2();
    }

    addCSS();
    allFunctions();
    window.eventBus.subscribe({
        name: "newFlexiName",
        callback: function (e) {
            allFunctions();
        }
    });

}, 600);