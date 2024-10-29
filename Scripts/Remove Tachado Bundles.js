var initRemoveTachado = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/flight') return;
    clearInterval(initRemoveTachado);
    var culture = bookingData.Culture;

    function removeTachado(){
        var elements = document.querySelectorAll('.bundle-non-discounted-price')
        elements.forEach(function (element) {
            if(element){
                element.remove();
            }
        });
    }

    function allEdits(){
        removeTachado();
    }

    function allEditsClick() {
        var smartFeeButtons = document.querySelectorAll('.smart-fee.nowrap.big, .discount-fee.nowrap.small, .smart-fee.nowrap.small, .discount-fee.nowrap.big');
        var buttonClickHandler = function () {
        hideTachado();
     };
     smartFeeButtons.forEach(button => button.addEventListener('click', buttonClickHandler));
 }

 if(culture){
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