var initToggleSwitch = setInterval(function () {
    if (typeof bookingData === "undefined" || typeof window.eventBus === "undefined" || window.location.pathname !== '/V2/Flight') return;
    clearInterval(initToggleSwitch);
    var culture = bookingData.Culture;

    function addToggleSwitch(selector) {
        if (!document.querySelector('.switch')) {
            var currencySelect = document.querySelector('[data-test-id="sidebar-currency-switch"]');
            if (currencySelect) {
                var container = document.querySelector(selector);

                var switchWrapper = document.createElement('div');
                switchWrapper.className = 'switch-wrapper';

                var switchTitle = document.createElement('h2');
                switchTitle.className = 'switch-title';
                switchTitle.textContent = 'COTIZAR VUELOS EN:';

                var leftText = document.createElement('span');
                leftText.className = 'switch-text';
                leftText.textContent = currencySelect.value === 'USD' ? 'SOL' : (currencySelect.value === 'PEN' ? 'SOL' : currencySelect.value);

                var rightText = document.createElement('span');
                rightText.className = 'switch-text';
                rightText.textContent = 'USD';

                var switchContainer = document.createElement('div');
                var switchLabel = document.createElement('label');
                var switchInput = document.createElement('input');
                var switchSlider = document.createElement('span');

                switchContainer.className = 'switch';
                switchInput.type = 'checkbox';
                switchInput.className = 'switch-input';
                switchInput.checked = currencySelect.value === 'USD';
                switchSlider.className = 'slider';
                switchLabel.appendChild(switchInput);
                switchLabel.appendChild(switchSlider);
                switchContainer.appendChild(switchLabel);

                var switchAndTextContainer = document.createElement('div');
                switchAndTextContainer.className = 'switch-and-text-container';
                switchAndTextContainer.appendChild(leftText);
                switchAndTextContainer.appendChild(switchContainer);
                switchAndTextContainer.appendChild(rightText);

                switchWrapper.appendChild(switchTitle);
                switchWrapper.appendChild(switchAndTextContainer);
                container.parentNode.insertBefore(switchWrapper, container);

                switchInput.addEventListener('change', function() {
                  if (this.checked) {
                    handleSwitchToggle('USD');
                } else {
                    handleSwitchToggle('PEN');  // Cambio aquí.
                }
            });
            }
        }
    }

    function addCSS() {
        var css = `
                .switch-wrapper {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-end;
                    background-color: #f2f2f2;
                    padding: 0px;
                    border-radius: 10px;
                    margin: 20px auto;
                    max-width: 305px;
                    border: 1px solid #163a70;
                }

                .switch-title {
                    flex: 1;
                    text-align: left;
                    margin-left: 10px;
                    font-family: Lato, sans-serif;
                    line-height: 1rem;
                    color: #163a70;
                    font-size: 0.85rem;
                    font-weight: 900;
                }

                .switch-text {
                    margin: 12px;
                    color: #163a70;
                    font-size: 0.85rem;
                    font-weight: 900;
                }

                .switch-and-text-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .switch {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 45px;
                    height: 22px;
                    position: relative;
                    margin: 0 auto;
                }

                .switch input {
                    display: none;
                }

                .slider {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    border-radius: 16px;
                    box-shadow: 0 0 0 2px #163a70, 0 0 4px #163a70;
                    cursor: pointer;
                    border: 2px solid transparent;
                    overflow: hidden;
                    transition: 0.2s;
                }

                .slider:before {
                    position: absolute;
                    content: "";
                    width: 100%;
                    height: 100%;
                    background-color: #163a70;
                    border-radius: 16px;
                    transform: translateX(-22px);
                    transition: 0.2s;
                }

                input:checked + .slider:before {
                    transform: translateX(22px);
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

    function handleSwitchToggle(value) {
        var currencySelect = document.querySelector('[data-test-id="sidebar-currency-switch"]');
        var event = new Event('change');

        currencySelect.value = value;
        currencySelect.dispatchEvent(event);

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'switchToggle',
            'currency': value
        });
    }

    if(culture === 'es-PE'){
        addCSS();
        addToggleSwitch('[data-test-id="flight-itinerary"]');
        window.eventBus.subscribe({
            name: "toggleSwitchUSDvsPEN", callback: function (e) {
                addToggleSwitch('[data-test-id="flight-itinerary"]');
            }
        });
    }

}, 600);