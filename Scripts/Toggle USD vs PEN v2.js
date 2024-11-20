var initToggleSwitch = setInterval(function () {
    if (typeof bookingData === "undefined" || typeof window.eventBus === "undefined" || window.location.pathname !== '/V2/Flight') return;
    clearInterval(initToggleSwitch);

    var culture = bookingData.Culture;

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

    function addToggleSwitch(currency) {
        if (!document.querySelector('.switch-wrapper')) {
            if (currency) {
                var container = document.querySelector('[data-test-id="flight-itinerary"]');

                container.insertAdjacentHTML('beforebegin', `
                    <div class="switch-wrapper">
                        <h2 class="switch-title">COTIZAR VUELOS EN:</h2>
                        <div class="switch-and-text-container">
                            <span class="switch-text">${currency === 'USD' ? 'SOL' : (currency === 'PEN' ? 'SOL' : currency)}</span>
                            <div class="switch">
                                <label>
                                    <input type="checkbox" class="switch-input" ${currency === 'USD' ? 'checked' : ''}>
                                    <span class="slider"></span>
                                </label>
                            </div>
                            <span class="switch-text">USD</span>
                        </div>
                    </div>
                `);

                var switchInput = document.querySelector('.switch-input');
                switchInput.addEventListener('change', function () {
                    if (this.checked) {
                        handleSwitchToggle('USD');
                    } else {
                        handleSwitchToggle('PEN');
                    }
                });
            }
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

    function getCurrentCurrency() {
        var currencyElement = document.querySelector(".flight-currency-select");
        if (currencyElement) {
            return currencyElement.value;
        } else {
            var currencyElementAE = document.querySelector('[data-test-id="sidebar-total-currency"]');
            var currencyAE = currencyElementAE.textContent.trim();

            if (currencyAE === 'CLP' || currencyAE === 'COP' || currencyAE === 'SOL' || currencyAE === 'USD' || currencyAE === 'ARS') {
                return currencyAE;
            } else {
                currencyAE = 'BRL'
                return currencyAE;
            }
        }
    }

    function isPECO() {
        if (role === 'WWW PE Compras Gestor' || role === 'WWW PE Compras Delegado') {
            return true;
        } else {
            return false;
        }
    }

    if (culture === 'es-PE' && !isPECO()) {
        var currency = getCurrentCurrency();
        addCSS();
        addToggleSwitch(currency);
        window.eventBus.subscribe({
            name: "toggleSwitchUSDvsPEN", callback: function (e) {
                setTimeout(function () {
                    var currency = getCurrentCurrency();
                    addToggleSwitch(currency);
                }, 1000);
            }
        });
    }

}, 600);