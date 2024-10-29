var initBundleNoDiscount = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/flight') return;
    clearInterval(initBundleNoDiscount);
    var culture = bookingData.Culture;

    function deleteEtiqueta(){
        var elements = document.querySelectorAll('[data-test-id="bundle-savings--j|0-c|simple"], [data-test-id="bundle-savings--j|0-c|full"], [data-test-id="bundle-savings--j|1-c|simple"], [data-test-id="bundle-savings--j|1-c|full"]');
        elements.forEach(function (element) {
            if(element){
               element.parentNode.removeChild(element);
           }
       });
    }

    function allEdits(){
        deleteEtiqueta();
    }

    function allEditsClick() {
        var smartFeeButtons = document.querySelectorAll('.smart-fee.nowrap.big, .discount-fee.nowrap.small, .smart-fee.nowrap.small, .discount-fee.nowrap.big');
        var buttonClickHandler = function () {
         deleteEtiqueta();
     };
     smartFeeButtons.forEach(button => button.addEventListener('click', buttonClickHandler));
 }

 if(culture === 'es-CL'){
    allEdits();
    allEditsClick();
    window.eventBus.subscribe({
        name: "BundlesNoDiscount", callback: function (e) {
            allEdits();
            allEditsClick();
        }
    });
}

}, 600);