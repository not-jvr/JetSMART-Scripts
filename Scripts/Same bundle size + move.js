var initSameBundleSize = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
    clearInterval(initSameBundleSize);
    var culture = bookingData.Culture;

    function hideExtras(){
        var elements = document.querySelectorAll('[data-test-id="bundle-ssr-item--j|0-c|none|FLXB"], [data-test-id="bundle-ssr-item--j|0-c|none|LBGC|LBGD|LBGC|LBAG|BAGC|BAGD"], [data-test-id="bundle-ssr-item--j|0-c|none|PBOA|PBA|PBD|PBP"], [data-test-id="bundle-ssr-item--j|0-c|none|SOMESEATS"], [data-test-id="bundle-ssr-item--j|0-c|none|ALLSEATS"], [data-test-id="bundle-ssr-item--j|0-c|none|APCH|APCA|APCD|APCP"], [data-test-id="bundle-ssr-item--j|0-c|simple|ALLSEATS"], [data-test-id="bundle-ssr-item--j|0-c|simple|APCH|APCA|APCD|APCP"], [data-test-id="bundle-ssr-item--j|1-c|none|FLXB"], [data-test-id="bundle-ssr-item--j|1-c|none|LBGC|LBGD|LBGC|LBAG|BAGC|BAGD"], [data-test-id="bundle-ssr-item--j|1-c|none|PBOA|PBA|PBD|PBP"], [data-test-id="bundle-ssr-item--j|1-c|none|SOMESEATS"], [data-test-id="bundle-ssr-item--j|1-c|none|ALLSEATS"], [data-test-id="bundle-ssr-item--j|1-c|none|APCH|APCA|APCD|APCP"], [data-test-id="bundle-ssr-item--j|1-c|simple|ALLSEATS"], [data-test-id="bundle-ssr-item--j|1-c|simple|APCH|APCA|APCD|APCP"], [data-test-id="bundle-ssr-item--j|0-c|none|LBGC|LBGD|LBGC|LBAG|LBG1|LBG2|BAGC|BAGD|BAG1|BAG2"], [data-test-id="bundle-ssr-item--j|1-c|none|LBGC|LBGD|LBGC|LBAG|LBG1|LBG2|BAGC|BAGD|BAG1|BAG2"]');
        elements.forEach(function (element) {
            if(element){
                element.style.visibility = 'hidden';
            }
        });
    }

    function deleteTitle(){
        var elements = document.querySelectorAll('.bundles-header');
        elements.forEach(function (element) {
            if(element){
             element.parentNode.removeChild(element);
         }
     });        
    }

    function deleteEtiqueta(){
        var elements = document.querySelectorAll('[data-test-id="bundle-savings--j|0-c|simple"], [data-test-id="bundle-savings--j|0-c|full"], [data-test-id="bundle-savings--j|1-c|simple"], [data-test-id="bundle-savings--j|1-c|full"]');
        elements.forEach(function (element) {
            if(element){
             element.parentNode.removeChild(element);
         }
     });
    }

    function deleteCount(){
        setTimeout(function () {
            var elements = document.querySelectorAll('.bundle-availability');
            elements.forEach(function (element) {
                if(element){
                 element.parentNode.removeChild(element);
             }
         });
        }, 1500);
    }

    function deleteTramoPorPasajero(){
        var elements = document.querySelectorAll('.bundle-per-person-info');
        elements.forEach(function (element) {
            if(element){
             element.parentNode.removeChild(element);
         }
     });
    }

    function changeImgVueloLigero(){
        var imgPersonalizaTuVuelo = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/1fdd14a0-e14d-40c5-b14a-7ad3d9db50ab/Personalizatuvuelo1.png';
        document.querySelectorAll('[data-test-id="bundle-header--j|0-c|none"], [data-test-id="bundle-header--j|1-c|none"], [data-test-id="bundle-selected-header--j|0-c|None"], [data-test-id="bundle-selected-header--j|1-c|None"]').forEach(function (element) {
            if(element){
                element.querySelector('img').src = imgPersonalizaTuVuelo;
            }
        });
    }

    function allEdits(){
        hideExtras();
        deleteTitle();
        deleteEtiqueta();
        deleteTramoPorPasajero();
        changeImgVueloLigero();
        deleteCount();
        moverBundles();
    }

    function moverBundles() {
        setTimeout(function () {
            var bundleIda = document.querySelector('[data-test-id="bundle-selector--j|0"]');
            var bundleVuelta = document.querySelector('[data-test-id="bundle-selector--j|1"]');
            var bnd0;
            var bnd1;
            var bnd2;
            var bnc0;
            var bnc1;
            var bnc2;

            if (bundleIda) {
                bnd0 = bundleIda.querySelector('div[data-test-value="BND0"]');
                bnd1 = bundleIda.querySelector('div[data-test-value="BND1"]');
                bnd2 = bundleIda.querySelector('div[data-test-value="BND2"]');
                bnc0 = bundleIda.querySelector('div[data-test-value="BNC0"]');
                bnc1 = bundleIda.querySelector('div[data-test-value="BNC1"]');
                bnc2 = bundleIda.querySelector('div[data-test-value="BNC2"]');

                if (bnd0 && bnd1 && bnd2) {
                    bnd0.parentNode.insertBefore(bnd2, bnd0);
                    bnd0.parentNode.insertBefore(bnd1, bnd0);
                    if (bnd0.querySelector('.bundle-savings-container')) {
                        bnd0.querySelector('.bundle-savings-container').style.display = 'none';
                    }
                }

                if (bnc0 && bnc1 && bnc2) {
                    bnc0.parentNode.insertBefore(bnc2, bnc0);
                    bnc0.parentNode.insertBefore(bnc1, bnc0);
                    if (bnc0.querySelector('.bundle-savings-container')) {
                        bnc0.querySelector('.bundle-savings-container').style.display = 'none';
                    }
                }
            }

            if (bundleVuelta) {
                bnd0 = bundleVuelta.querySelector('div[data-test-value="BND0"]');
                bnd1 = bundleVuelta.querySelector('div[data-test-value="BND1"]');
                bnd2 = bundleVuelta.querySelector('div[data-test-value="BND2"]');
                bnc0 = bundleVuelta.querySelector('div[data-test-value="BNC0"]');
                bnc1 = bundleVuelta.querySelector('div[data-test-value="BNC1"]');
                bnc2 = bundleVuelta.querySelector('div[data-test-value="BNC2"]');

                if (bnd0 && bnd1 && bnd2) {
                    bnd0.parentNode.insertBefore(bnd2, bnd0);
                    bnd0.parentNode.insertBefore(bnd1, bnd0);
                    if (bnd0.querySelector('.bundle-savings-container')) {
                        bnd0.querySelector('.bundle-savings-container').style.display = 'none';
                    }
                }

                if (bnc0 && bnc1 && bnc2) {
                    bnc0.parentNode.insertBefore(bnc2, bnc0);
                    bnc0.parentNode.insertBefore(bnc1, bnc0);
                    if (bnc0.querySelector('.bundle-savings-container')) {
                        bnc0.querySelector('.bundle-savings-container').style.display = 'none';
                    }
                }
            }
        }, 500);
    }

    if(culture === 'es-CL'){
        allEdits();
        window.eventBus.subscribe({
            name: "SameBundleSize", callback: function (e) {
                allEdits();
            }
        });
    }

}, 600);