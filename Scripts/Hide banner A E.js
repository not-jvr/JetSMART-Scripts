var initHideBanner = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Agency/Summary') return;
    clearInterval(initHideBanner);

    const element = document.querySelector('ac-agency-info-modal');

    if (element) {
        element.parentNode.removeChild(element);
    }
}, 200);