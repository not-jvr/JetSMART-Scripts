var initHideRutasCO = setInterval(function () {
    //if (!window.location.href.startsWith('https://jetsmart.com/cl/es/') && !window.location.href.startsWith('https://jetsmart.com/ar/es/') && !window.location.href.startsWith('https://jetsmart.com/pe/es/') && !window.location.href.startsWith('https://jetsmart.com/uy/es/') && !window.location.href.startsWith('https://jetsmart.com/py/es/') && !window.location.href.startsWith('https://jetsmart.com/co/es/') && !window.location.href.startsWith('https://jetsmart.com/br/pt/') && !window.location.href.startsWith('https://jetsmart.com/us/en/') && !window.location.href.startsWith('https://jetsmart.com/ec/es/')) return;
    if (!window.location.href.startsWith('https://uat.jetsmart.dev/cl/es/') && !window.location.href.startsWith('https://uat.jetsmart.dev/ar/es/') && !window.location.href.startsWith('https://uat.jetsmart.dev/pe/es/') && !window.location.href.startsWith('https://uat.jetsmart.dev/uy/es/') && !window.location.href.startsWith('https://uat.jetsmart.dev/py/es/') && !window.location.href.startsWith('https://uat.jetsmart.dev/co/es/') && !window.location.href.startsWith('https://uat.jetsmart.dev/br/pt/') && !window.location.href.startsWith('https://uat.jetsmart.dev/us/en/') && !window.location.href.startsWith('https://uat.jetsmart.dev/ec/es/')) return;
    clearInterval(initHideRutasCO);

    var idaovuelta = 0;

    function clickSearchBoxOrigenReturn() {
        var inputOrigin = document.querySelector('[data-test-id="ROUTE_ORIGIN_INPUT"]');
        var inputReturn = document.querySelector('[data-test-id="ROUTE_DESTINATION_INPUT"]');


        if (inputOrigin) {
            inputOrigin.addEventListener('click', function() {
                idaovuelta = 1;
                clickSearchCountry();
                clickSearchCity();
                clickSearchCityMobile();
                removeHide();
            });
        }


        if (inputReturn) {
            inputReturn.addEventListener('click', function() {
                clickSearchCountry();
                clickSearchCity();
                clickSearchCityMobile();
                idaovuelta = 0;
                hideCities();
            });
        }
    }

    function clickSearchCountry() {
        setTimeout(function () {
            var inputCountry = document.querySelectorAll('.dg-country-selector-list-item');
            if (inputCountry) {
                inputCountry.forEach(function(country) {
                    country.addEventListener('click', function() {
                        console.log('click 3');
                        clickSearchCountry();
                        clickSearchCity();
                        hideCities();
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
                        clickSearchCountry();
                        clickSearchCity();
                        idaovuelta = 0;
                        hideCities();
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
                        clickSearchCityMobile();
                        idaovuelta = 0;
                        hideCities();
                    });
                });
            }
        }, 500);
    }

    function hideCities() {
        if (idaovuelta === 0) {
            allBlock();
            setTimeout(function () {
                var origenInput = document.querySelector('[data-test-id="ROUTE_ORIGIN_INPUT"]');
                var valorOrigen = origenInput.value;
        //desktop
                var mdeDesktop = document.querySelector('[data-test-id="ROUTE_CITY_LIST_ITEM"][data-test-value="MDE"]');
                var ctgDesktop = document.querySelector('[data-test-id="ROUTE_CITY_LIST_ITEM"][data-test-value="CTG"]');
                var bogDesktop = document.querySelector('[data-test-id="ROUTE_CITY_LIST_ITEM"][data-test-value="BOG"]');
                var smrDesktop = document.querySelector('[data-test-id="ROUTE_CITY_LIST_ITEM"][data-test-value="SMR"]');
                var peiDesktop = document.querySelector('[data-test-id="ROUTE_CITY_LIST_ITEM"][data-test-value="PEI"]');

        //mobile
                var mdeMobile = document.querySelector('.dg-ts-list-item.dg-mobile-list-item[data-test-value="MDE"]');
                var ctgMobile = document.querySelector('.dg-ts-list-item.dg-mobile-list-item[data-test-value="CTG"]');
                var bogMobile = document.querySelector('.dg-ts-list-item.dg-mobile-list-item[data-test-value="BOG"]');
                var smrMobile = document.querySelector('.dg-ts-list-item.dg-mobile-list-item[data-test-value="SMR"]');
                var peiMobile = document.querySelector('.dg-ts-list-item.dg-mobile-list-item[data-test-value="PEI"]');

                if (valorOrigen === 'Bogotá (BOG)' || valorOrigen === 'Bogota (BOG)') {
                    if (mdeDesktop) {
                        mdeDesktop.style.display = 'none';
                    }
                    if (ctgDesktop) {
                        ctgDesktop.style.display = 'none';
                    }
                    if (smrDesktop) {
                        smrDesktop.style.display = 'none';
                    }
                    if (peiDesktop) {
                        peiDesktop.style.display = 'none';
                    }
                    if (mdeMobile) {
                        mdeMobile.style.display = 'none';
                    }
                    if (ctgMobile) {
                        ctgMobile.style.display = 'none';
                    }
                    if (smrMobile) {
                        smrMobile.style.display = 'none';
                    }
                    if (peiMobile) {
                        peiMobile.style.display = 'none';
                    }
                }

                if (valorOrigen === 'Medellin (MDE)') {
                    if (bogDesktop) {
                        bogDesktop.style.display = 'none';
                    }
                    if (ctgDesktop) {
                        ctgDesktop.style.display = 'none';
                    }
                    if (smrDesktop) {
                        smrDesktop.style.display = 'none';
                    }
                    if (bogMobile) {
                        bogMobile.style.display = 'none';
                    }
                    if (ctgMobile) {
                        ctgMobile.style.display = 'none';
                    }
                    if (smrMobile) {
                        smrMobile.style.display = 'none';
                    }
                }

                if (valorOrigen === 'Cartagena de Indias (CTG)') {
                    if (bogDesktop) {
                        bogDesktop.style.display = 'none';
                    }
                    if (mdeDesktop) {
                        mdeDesktop.style.display = 'none';
                    }
                    if (peiDesktop) {
                        peiDesktop.style.display = 'none';
                    }
                    if (bogMobile) {
                        bogMobile.style.display = 'none';
                    }
                    if (mdeMobile) {
                        mdeMobile.style.display = 'none';
                    }
                    if (peiMobile) {
                        peiMobile.style.display = 'none';
                    }
                }

                if (valorOrigen === 'Santa Marta (SMR)') {
                    if (bogDesktop) {
                        bogDesktop.style.display = 'none';
                    }
                    if (mdeDesktop) {
                        mdeDesktop.style.display = 'none';
                    }
                    if (bogMobile) {
                        bogMobile.style.display = 'none';
                    }
                    if (mdeMobile) {
                        mdeMobile.style.display = 'none';
                    }
                }

                if (valorOrigen === 'Pereira (PEI)') {
                    if (bogDesktop) {
                        bogDesktop.style.display = 'none';
                    }
                    if (ctgDesktop) {
                        ctgDesktop.style.display = 'none';
                    }
                    if (bogMobile) {
                        bogMobile.style.display = 'none';
                    }
                    if (ctgMobile) {
                        ctgMobile.style.display = 'none';
                    }
                }
            }, 600);
        }     
    }

    function allBlock() {
        var listaElementos = document.querySelectorAll('ul.dg-city-selector-list li');

        listaElementos.forEach(function(elemento) {
            elemento.style.display = 'block';
        });

    }

    function removeHide() {
        setTimeout(function () {
        //desktop
            var mdeDesktop = document.querySelector('[data-test-id="ROUTE_CITY_LIST_ITEM"][data-test-value="MDE"]');
            var ctgDesktop = document.querySelector('[data-test-id="ROUTE_CITY_LIST_ITEM"][data-test-value="CTG"]');
            var bogDesktop = document.querySelector('[data-test-id="ROUTE_CITY_LIST_ITEM"][data-test-value="BOG"]');
            var smrDesktop = document.querySelector('[data-test-id="ROUTE_CITY_LIST_ITEM"][data-test-value="SMR"]');
            var peiDesktop = document.querySelector('[data-test-id="ROUTE_CITY_LIST_ITEM"][data-test-value="PEI"]');
            
        //mobile
            var mdeMobile = document.querySelector('.dg-ts-list-item.dg-mobile-list-item[data-test-value="MDE"]');
            var ctgMobile = document.querySelector('.dg-ts-list-item.dg-mobile-list-item[data-test-value="CTG"]');
            var bogMobile = document.querySelector('.dg-ts-list-item.dg-mobile-list-item[data-test-value="BOG"]');
            var smrMobile = document.querySelector('.dg-ts-list-item.dg-mobile-list-item[data-test-value="SMR"]');
            var peiMobile = document.querySelector('.dg-ts-list-item.dg-mobile-list-item[data-test-value="PEI"]');
            
            if (mdeDesktop) {
                mdeDesktop.style.display = 'block';
            }
            if (ctgDesktop) {
                ctgDesktop.style.display = 'block';
            }
            if (bogDesktop) {
                bogDesktop.style.display = 'block';
            }
            if (smrDesktop) {
                smrDesktop.style.display = 'block';
            }
            if (peiDesktop) {
                peiDesktop.style.display = 'block';
            }

            if (mdeMobile) {
                mdeMobile.style.display = 'block';
            }
            if (ctgMobile) {
                ctgMobile.style.display = 'block';
            }
            if (bogMobile) {
                bogMobile.style.display = 'block';
            }
            if (smrMobile) {
                smrMobile.style.display = 'block';
            }
            if (peiMobile) {
                peiMobile.style.display = 'block';
            }
        }, 500);
    }


    clickSearchBoxOrigenReturn();
    clickSearchCountry();
    clickSearchCity();
    clickSearchCityMobile();

}, 600);