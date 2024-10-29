var initNuevoEcuador = setInterval(function () {
    if (!window.location.href.startsWith('https://jetsmart.com/cl/es/') && !window.location.href.startsWith('https://jetsmart.com/ar/es/') && !window.location.href.startsWith('https://jetsmart.com/pe/es/') && !window.location.href.startsWith('https://jetsmart.com/uy/es/') && !window.location.href.startsWith('https://jetsmart.com/py/es/') && !window.location.href.startsWith('https://jetsmart.com/co/es/') && !window.location.href.startsWith('https://jetsmart.com/br/pt/') && !window.location.href.startsWith('https://jetsmart.com/us/en/') && !window.location.href.startsWith('https://jetsmart.com/ec/es/')) return;
    clearInterval(initNuevoEcuador);

    var culture = JetSmart.TealiumData.culture;

    function addCSS() {
        var css = `
        .dg-station-new2 {
            --text-opacity: 1;
            align-items: center;
            background: #ae2535;
            border-radius: 10px;
            color: #fff;
            color: rgba(255,255,255,var(--text-opacity));
            display: flex;
            font-size: 11px;
            height: 20px;
            justify-content: center;
            line-height: 1.3;
            right: 8px;
            text-transform: capitalize;
            top: 11px;
            transition: all .25s ease-in-out;
            width: 42px;
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

    function addNuevoEcuador() {
        setTimeout(function () {
            var listItem = document.querySelector('.dg-country-selector-list-item [data-test-value="EC"]');

            if (listItem) {
                var nuevoEcuador = document.querySelector('.dg-country-selector-list-item #EcuadorNuevo');

                if (!nuevoEcuador) {
                    var nuevoElemento = document.createElement('span');
                    nuevoElemento.className = 'dg-station-new2';
                    nuevoElemento.id = 'EcuadorNuevo';

                    switch (culture) {
                    case "en-US":
                        nuevoElemento.innerHTML = 'new';
                        break;
                    case "pt-BR":
                        nuevoElemento.innerHTML = 'novo';
                        break;
                    default:
                        nuevoElemento.innerHTML = 'nuevo';
                        break;
                    }

                    listItem.parentNode.insertBefore(nuevoElemento, listItem.nextSibling);
                }
            }
        }, 500);
    }

    function addNuevoCitys() {
        setTimeout(function () {
            var city1 = document.querySelector('li.dg-ts-list-item.dg-city-selector-list-item[data-test-value="GYE"]');
            var city2 = document.querySelector('li.dg-ts-list-item.dg-city-selector-list-item[data-test-value="UIO"]');
            if (city1) {
                var idcity1 = document.querySelector('li.dg-ts-list-item.dg-city-selector-list-item[data-test-value="GYE"]  #CityNuevo');
                if (!idcity1) {
                    var spanElement = document.createElement('span');
                    spanElement.className = 'dg-station-new';
                    spanElement.id = 'CityNuevo';
                    switch (culture) {
                    case "en-US":
                        spanElement.appendChild(document.createTextNode('new'));
                        break;
                    case "pt-BR":
                        spanElement.appendChild(document.createTextNode('novo'));
                        break;
                    default:
                        spanElement.appendChild(document.createTextNode('nuevo'));
                        break;
                    }
                    city1.appendChild(spanElement);
                }
            }

            if (city2) {
                var idcity2 = document.querySelector('li.dg-ts-list-item.dg-city-selector-list-item[data-test-value="UIO"]  #CityNuevo');
                if (!idcity2) {
                    var spanElement = document.createElement('span');
                    spanElement.className = 'dg-station-new';
                    spanElement.id = 'CityNuevo';
                    switch (culture) {
                    case "en-US":
                        spanElement.appendChild(document.createTextNode('new'));
                        break;
                    case "pt-BR":
                        spanElement.appendChild(document.createTextNode('novo'));
                        break;
                    default:
                        spanElement.appendChild(document.createTextNode('nuevo'));
                        break;
                    }
                    city2.appendChild(spanElement);
                }
            }
        }, 500);
    }

    function eliminarCityNuevo() {
        var citiesNuevo = document.querySelectorAll('#CityNuevo');

        citiesNuevo.forEach(function(cityNew) {
            if (cityNew) {
                cityNew.parentNode.removeChild(cityNew);
            }
        });
    }

    function eliminarEcuadorNuevo() {
        setTimeout(function () {
            var ecuadorNuevoElemento = document.querySelector('#EcuadorNuevo');

            if (ecuadorNuevoElemento) {
                ecuadorNuevoElemento.parentNode.removeChild(ecuadorNuevoElemento); 
            }
        }, 500);
    }

    function addNuevoMobile(selector) {
        setTimeout(function () {
            var container = document.querySelector('[data-test-id="ROUTE_CITY_LIST--m|1"] [data-test-id="ROUTE_CITY_LIST_ITEM--m|1"][data-test-value="' + selector + '"]');

            if (container) {
                var added = container.querySelector('.dg-station-new');

                if (!added) {
                    var spanElement = document.createElement('span');
                    spanElement.className = 'dg-station-new';
                    switch (culture) {
                    case "en-US":
                        spanElement.appendChild(document.createTextNode('new'));
                        break;
                    case "pt-BR":
                        spanElement.appendChild(document.createTextNode('novo'));
                        break;
                    default:
                        spanElement.appendChild(document.createTextNode('nuevo'));
                        break;
                    }
                    container.appendChild(spanElement);
                }
            }
        }, 600);
    }

    function removeNuevoMobile() {
        setTimeout(function () {
            var containers = document.querySelectorAll('[data-test-id="ROUTE_CITY_LIST--m|1"] [data-test-id="ROUTE_CITY_LIST_ITEM--m|1"]');

            containers.forEach(function (container) {
                var added = container.querySelector('.dg-station-new');
                if (added) {
                    container.removeChild(added);
                }
            });
        }, 500);
    }

    function clickSearchBoxOrigenReturn() {
        var inputOrigin = document.querySelector('[data-test-id="ROUTE_ORIGIN_INPUT"]');
        var inputReturn = document.querySelector('[data-test-id="ROUTE_DESTINATION_INPUT"]');


        if (inputOrigin) {
            inputOrigin.addEventListener('click', function() {
                console.log('Hola');
                clickSearchCityMobile();
                removeNuevoMobile();
                addNuevoMobile('GYE');
                addNuevoMobile('UIO');
                eliminarEcuadorNuevo();
                eliminarCityNuevo();
                addNuevoEcuador();
                addNuevoCitys();
                clickSearchCountry();
                clickSearchCity();
            });
        }


        if (inputReturn) {
            inputReturn.addEventListener('click', function() {
                console.log('Hola2');
                clickSearchCityMobile();
                removeNuevoMobile();
                addNuevoMobile('GYE');
                addNuevoMobile('UIO');
                eliminarEcuadorNuevo();
                eliminarCityNuevo();
                addNuevoEcuador();
                addNuevoCitys();
                clickSearchCountry();
                clickSearchCity();
            });
        }
    }

    function clickSearchCountry() {
        setTimeout(function () {
            var inputCountry = document.querySelectorAll('.dg-country-selector-list-item');
            if (inputCountry) {
                inputCountry.forEach(function(country) {
                    country.addEventListener('click', function() {
                        console.log('Hola3');
                        clickSearchCity();
                        eliminarCityNuevo();
                        addNuevoCitys();
                    });
                });
            }
        }, 500);
    }

    function clickSearchCity() {
        setTimeout(function () {
            var inputCity = document.querySelectorAll('.dg-city-selector-list-item');
            if (inputCity) {
                inputCity.forEach(function(city) {
                    city.addEventListener('click', function() {
                        console.log('Hola4');
                        eliminarEcuadorNuevo();
                        eliminarCityNuevo();
                        addNuevoEcuador();
                        addNuevoCitys();
                    });
                });
            }
        }, 500);
    }

    function clickSearchCityMobile() {
        setTimeout(function () {
            var inputCity = document.querySelectorAll('.dg-ts-list-item.dg-mobile-list-item');
            if (inputCity) {
                inputCity.forEach(function(city) {
                    city.addEventListener('click', function() {
                        console.log('Hola4');
                        removeNuevoMobile();
                        addNuevoMobile('GYE');
                        addNuevoMobile('UIO');
                        
                    });
                });
            }
        }, 500);
    }

    addCSS();
    clickSearchBoxOrigenReturn();

}, 600);