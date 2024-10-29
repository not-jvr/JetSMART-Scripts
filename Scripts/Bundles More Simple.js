var initBundleMoreSimple = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/flight') return;
    clearInterval(initBundleMoreSimple);
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

    function deleteEtiquetaTAG(){
        var elements = document.querySelectorAll('.desc-bundle');
        setTimeout(function () {
            elements.forEach(function (element) {
                if(element){
                   element.style.display = 'none';
               }
           });
        }, 500);
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
            }, 200);
        }
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
        deleteSeatsLeft();
        deleteEtiquetaTAG();
    }

    function allEditsClick() {
        var smartFeeButtons = document.querySelectorAll('.smart-fee.nowrap.big, .discount-fee.nowrap.small, .smart-fee.nowrap.small, .discount-fee.nowrap.big');
        var buttonClickHandler = function () {
         hideExtras();
         deleteTitle();
         deleteEtiqueta();
         deleteTramoPorPasajero();
         changeImgVueloLigero();
         deleteSeatsLeft();
         deleteEtiquetaTAG();
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