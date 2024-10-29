var initAddLastSearch = setInterval(function() {
    if (!window.location.href.startsWith('https://jetsmart.com/cl/es/') && !window.location.href.startsWith('https://jetsmart.com/ar/es/') && !window.location.href.startsWith('https://jetsmart.com/pe/es/') && !window.location.href.startsWith('https://jetsmart.com/uy/es/') && !window.location.href.startsWith('https://jetsmart.com/py/es/') && !window.location.href.startsWith('https://jetsmart.com/co/es/') && !window.location.href.startsWith('https://jetsmart.com/br/pt/') && !window.location.href.startsWith('https://jetsmart.com/us/en/')) return;
    clearInterval(initAddLastSearch);

    function showOverlay() {
        const overlay = document.createElement('div');
        overlay.setAttribute('id', 'loading-overlay');

        const elementToBlock = document.querySelector('.dg-tab.dg-flights.dg-for-loader');
        const rect = elementToBlock.getBoundingClientRect();

        const css = `
        #loading-overlay {
            position: absolute;
            top: 0;
            left: 108px;
            width: ${rect.width}px;
            height: 446px;
            background-color: rgba(255, 255, 255, 0.95);
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
        }

        @media screen and (max-width: 767px) {
            #loading-overlay {
                left: 0;
            }
        }
        `;

        const head = document.head || document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        head.appendChild(style);

        overlay.addEventListener('click', function(event) {
            event.stopPropagation();
        });

        elementToBlock.parentNode.insertBefore(overlay, elementToBlock);
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 50);
    }

    function hideOverlay() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            overlay.addEventListener('transitionend', () => {
                overlay.parentNode.removeChild(overlay);
            });
        }
    }

    function getLastSearch() {
        var cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.startsWith('lastSearch=')) {
                return decodeURIComponent(cookie.substring('lastSearch='.length));
            }
        }
        return null;
    }

    function waitForElement(selector, maxAttempts = 15, interval = 500) {
        return new Promise((resolve, reject) => {
            let attempts = 0;

            const intervalId = setInterval(() => {
                const element = document.querySelector(selector);

                if (element) {
                    clearInterval(intervalId);
                    resolve(element);
                } else if (attempts >= maxAttempts) {
                    clearInterval(intervalId);
                    reject(new Error(`Element not found: ${selector}`));
                }

                attempts++;
            }, interval);
        });
    }

    async function setPassengers(paxInfo) {
        const paxTranslations = {
            "adultos": "ADULT",
            "adulto": "ADULT",
            "adult": "ADULT",
            "adolescente": "TEEN",
            "teen": "TEEN",
            "niño": "CHILD",
            "niños": "CHILD",
            "child": "CHILD",
            "infante": "INFANT",
            "infantes": "INFANT",
            "infant": "INFANT",
            "crianças": "CHILD",
            "criança": "CHILD",
            "bebês": "INFANT",
            "bebê": "INFANT"
        };

        const paxTypes = ["ADULT", "TEEN", "CHILD", "INFANT"];
        const paxData = paxInfo.toLowerCase().split(',').map(s => s.trim().split(' '));

        let desiredPax = {};
        for (let data of paxData) {
            const qty = parseInt(data[0], 10);
            const type = paxTranslations[data[1]];
            if (type && !isNaN(qty)) {
                desiredPax[type] = qty;
            }
        }

        for (let type of paxTypes) {
            const qty = desiredPax[type] || 0;
            const currentQtyElem = document.querySelector(`[data-test-id="PAX_${type}_AMOUNT"]`);
            const currentQty = parseInt(currentQtyElem.innerText, 10);
            const addButton = document.querySelector(`[data-test-id="PAX_ADD_${type}"]`);
            const removeButton = document.querySelector(`[data-test-id="PAX_REMOVE_${type}"]`);

            for (let j = currentQty; j < qty; j++) {
                addButton.click();
                await new Promise(resolve => setTimeout(resolve, 200));
            }

            for (let j = currentQty; j > qty; j--) {
                removeButton.click();
                await new Promise(resolve => setTimeout(resolve, 200));
            }
        }
    }

    async function clickLastSearch() {
        showOverlay();
        try {
            const cookieData = getLastSearch();
            if (!cookieData) return;

            const searchJSON = JSON.parse(cookieData);
            const departureDate = new Date(searchJSON.departureDate);
            const currentDate = new Date();

            hideElements(".dg-location-selector", ".dg-calendar");

            // Dejar en < ; ESTÁ EN > PARA TESTEAR
            if (departureDate < currentDate) {
                console.log("hola");
                await handleFutureDepartureDate(searchJSON);
                return;
            }

            if (isOneWay(searchJSON.returnDate)) {
                await clickElement('[data-test-id="DATE_ONE_WAY_SELECTOR"]');
            }

            await clickElement('[data-test-id="ROUTE_ORIGIN_INPUT"]');

            const originCode = extractCodeFrom(searchJSON.origin);
            if (originCode) {
                await clickElement(`[data-test-value="${originCode}"]`);
            }

            const destinationCode = extractCodeFrom(searchJSON.destination);
            if (destinationCode) {
                await clickElement(`[data-test-value="${destinationCode}"]`);
            }

            if (searchJSON.departureDate) {
                await clickElement(`[data-test-value="${searchJSON.departureDate}"]`);
            }

            if (!isOneWay(searchJSON.returnDate) && searchJSON.returnDate) {
                await clickElement(`[data-test-value="${searchJSON.returnDate}"]`);
            }

            await setPassengers(searchJSON.paxNumber);
            showElementsDependingOnWidth(".dg-location-selector", ".dg-calendar");
        } catch (error) {
            console.error('Error al hacer click en los elementos:', error);
        } finally {
            hideOverlay();
        }
    }

    function isOneWay(returnDate) {
        return returnDate === "Solo Ida" || returnDate === "Somente Ida" || returnDate === "One way";
    }

    function hideElements(...selectors) {
        selectors.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.display = "none";
            }
        });
    }

    async function clickElement(selector) {
        const element = await waitForElement(selector);
        element.click();
    }

    function extractCodeFrom(text) {
        const codePattern = /\(([^)]+)\)/;
        const codeMatch = codePattern.exec(text);
        return codeMatch ? codeMatch[1] : null;
    }

    function showElementsDependingOnWidth(citySelector, calendarSelector) {
        const selectCity = document.querySelector(citySelector);
        const selectCalendar = document.querySelector(calendarSelector);

        if (window.innerWidth >= 768) {
            if (selectCity) selectCity.style.display = "block";
            if (selectCalendar) selectCalendar.style.display = "block";
        } else {
            if (selectCity) selectCity.removeAttribute('style');
            if (selectCalendar) selectCalendar.style.display = "block";
        }
    }

    async function handleFutureDepartureDate(searchJSON) {
        var searchJSON = JSON.parse(cookieData);
        var departureDate = searchJSON.departureDate;

        if (isOneWay(searchJSON.returnDate)) {
            await clickElement('[data-test-id="DATE_ONE_WAY_SELECTOR"]');
        }

        await clickElement('[data-test-id="ROUTE_ORIGIN_INPUT"]');

        const originCode = extractCodeFrom(searchJSON.origin);
        if (originCode) {
            await clickElement(`[data-test-value="${originCode}"]`);
        }

        const destinationCode = extractCodeFrom(searchJSON.destination);
        if (destinationCode) {
            await clickElement(`[data-test-value="${destinationCode}"]`);
        }

        var departureDateSelect = await waitForElement(`[data-test-value="${departureDate}"]`);

        var clickRandom = document.querySelector('.button-wrapper');
        clickRandom.click();

        await setPassengers(searchJSON.paxNumber);
        showElementsDependingOnWidth(".dg-location-selector", ".dg-calendar");
    }

    function getButtonMessage() {
        var url = window.location.href;
        
        if (url.includes('https://jetsmart.com/br/pt/')) {
            return '<u>↻ Refazer minha última busca</u>';
        } else if (url.includes('https://jetsmart.com/us/en/')) {
            return '<u>↻ Remake my last search</u>';
        } else {
            return '<u>↻ Rearmar mi última búsqueda</u>';
        }
    }

    function addLastSearch(selector) {
        var cookieLastSearch = getLastSearch();
        if (cookieLastSearch && !document.querySelector('.button-wrapper')) {
            var container = document.querySelector(selector);
            var wrapper = document.createElement('div');
            wrapper.className = 'button-wrapper';
            var newElement = document.createElement('button-last-search');
            newElement.id = 'last-search';
            newElement.type = 'button';
            newElement.innerHTML = getButtonMessage();

            var css = `
            .dg-btn-container {
                margin: 0;
            }

            .dg-tab.dg-flights.dg-for-loader {
                height: 446px;
            }

            .dg-tab-selector {
                height: 446px;
            }

            .button-wrapper {
                display: flex;
                justify-content: center;
                padding: 5px;
            }

            #last-search {
                display: inline-flex;
                justify-content: center;
                padding: 3px;
                position: relative;
                color: #1b365d;
                border-radius: 5px;
                align-items: center;
                font-size: 16px;
                font-weight: 550;
                user-select: none;
                cursor: pointer;
            }

            #last-search:hover {
                color: #B2292E;
            }

            @media screen and (max-width: 767px) {

                .searchbox-container .searchbox .dg-tab.dg-flights {
                    height: 330px;
                }

                .button-wrapper {
                    display: block;
                    padding: 5px 0;
                    text-align: center;
                }

                #last-search {
                    font-size: 15px;
                }

                #last-search:hover {
                    color: #1b365d;
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

            newElement.addEventListener("click", function() {
                clickLastSearch();
            });

            wrapper.appendChild(newElement);

            container.parentNode.insertBefore(wrapper, container.nextElementSibling);
        }
    }

    var position = document.querySelector('.dg-clear-on-mobile.hidden-xs');

    if (position) {
        addLastSearch('.dg-clear-on-mobile.hidden-xs');
    }
}, 600);