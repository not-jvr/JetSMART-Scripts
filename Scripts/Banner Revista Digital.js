var initBannerRDigital = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Itinerary') return;
    clearInterval(initBannerRDigital);

    var culture = bookingData.Culture;

    function bannerRDigital() {
        if (document.querySelector('.i2-itinerary-section.RDigital')) return;

        const parentElement = document.querySelector('ac-itinerary-page-banners');
        const newDiv = document.createElement('div');
        newDiv.innerHTML = '<div class="i2-itinerary-section RDigital" data-test-id="RDigital">' +
            '    <a class="external-link-RD" target="_blank">' +
            '       <img class="max-w-full" src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/11059daa-441d-4dff-91b9-54c32d5d0f1f/Banner%20ADM%20tu%20vuelo.png">' +
            '    </a>' +
            '</div>';
        parentElement.prepend(newDiv);

        var css = `
        .i2-itinerary-section.RDigital .max-w-full {
            border-radius: 5px;
            display: block;
            width: 100%;
            height: auto;
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

        var enlaceExterno = document.querySelector('.external-link-RD');

        switch (culture) {
            case 'es-CL':
                enlaceExterno.href = 'https://deviajemagazine.com/revista/revista-actual.pdf';
                break;
            case 'es-AR':
                enlaceExterno.href = 'https://deviajemagazine.com/revista/revista-actual-arg-uy.pdf';
                enlaceExterno.querySelector('img').src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/7151a907-80a8-44a8-9f59-94f6ff3ab8c4/banner-admistra%20vuelo-DeViaje-ARG.png';
                break;
            case 'es-PE':
                enlaceExterno.href = 'https://deviajemagazine.com/revista/revista-actual.pdf';
                break;
        }
    }

    if (culture === 'es-CL' || culture === 'es-AR' || culture === 'es-PE') {
        bannerRDigital();
    }
}, 400);