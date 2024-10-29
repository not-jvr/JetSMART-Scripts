var initOcultarBotonBanner = setInterval(function () {
    if (typeof bookingData === "undefined") return;
    clearInterval(initOcultarBotonBanner);
    culture = bookingData.Culture;
    if(culture === 'es-CL'){
        var divPC = document.querySelector(".cug2b-login-banner");
        var divMobile = document.querySelector(".cug2b-login-banner.hidden-sm-up");
        var divTablet = document.querySelector(".cug2b-login-banner.hidden-md-up.hidden-xs");
        var botonPC = divPC.querySelector(".rounded-primary-btn");
        var botonMobile = divMobile.querySelector(".rounded-primary-btn");
        var botonTablet = divTablet.querySelector(".rounded-primary-btn");
        botonPC.style.display = "none";
        botonMobile.style.display = "none";
        botonTablet.style.display = "none";
    }
}, 400);