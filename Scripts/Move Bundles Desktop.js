var initMoveBundles = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/flight') return;
    clearInterval(initMoveBundles);
    var culture = bookingData.Culture;
    var esEmpresaAgencia = JetSmart.AppContext.isCug2Member;

    function moverBundle(){
        const bundlesContainers = document.querySelectorAll('.bundles-container');

        bundlesContainers.forEach((bundlesContainer) => {

            const bundleContainers = bundlesContainer.querySelectorAll('.bundle-container');

            const bnd0 = bundlesContainer.querySelector('[data-test-value="BND0"]');
            const bnd2 = bundlesContainer.querySelector('[data-test-value="BND2"]');

            const bnc0 = bundlesContainer.querySelector('[data-test-value="BNC0"]');
            const bnc2 = bundlesContainer.querySelector('[data-test-value="BNC2"]');

            if (bundlesContainer && bundleContainers.length) {
                if(bnd0 && bnd2){
                    bundlesContainer.insertBefore(bnd2, bundleContainers[0]);
                    bundlesContainer.appendChild(bnd0);
                }else if(bnc0 && bnc2){
                    bundlesContainer.insertBefore(bnc2, bundleContainers[0]);
                    bundlesContainer.appendChild(bnc0);
                }
            }
        });
    }

    function buttonsClick() {
        var smartFeeButtons = document.querySelectorAll('.smart-fee.nowrap.big, .discount-fee.nowrap.small, .smart-fee.nowrap.small, .discount-fee.nowrap.big');
        var buttonClickHandler = function () {
         moverBundle();
     };
     smartFeeButtons.forEach(button => button.addEventListener('click', buttonClickHandler));
 }

 if(esEmpresaAgencia === 'False'){
    moverBundle();
    buttonsClick();
    window.eventBus.subscribe({
        name: "move_bundles", callback: function (e) {
            moverBundle();
            buttonsClick();
        }
    });
}

}, 400);