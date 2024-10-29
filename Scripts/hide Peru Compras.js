var initHideInputPeruCompras = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/login') return;
    clearInterval(initHideInputPeruCompras);

    var allPage = document.querySelector('.content-wrapper.condensed.pull-up');

    function hidePeruCompras() {
        var loginPeruComprasInput = document.querySelector('label[for=option2b]');
        console.log(loginPeruComprasInput)        
        if (loginPeruComprasInput) {
            loginPeruComprasInput.style.display = 'none';
        }
    }

    allPage.addEventListener('click', hidePeruCompras);

}, 600);