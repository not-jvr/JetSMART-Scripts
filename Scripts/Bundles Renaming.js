var initNewTitleBundles = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
    clearInterval(initNewTitleBundles);

    var culture = bookingData.Culture;
    var postB = bookingData.PostBooking;
    var staff = bookingData.Role;

    function addCSS() {
     var css = `
     @media only screen and (min-width: 768px) {
        .bundle-header .header-img {
            height: 40px !important;
        }

        [data-test-value="None"] img, [data-test-value="Simple"] img, [data-test-value="Full"] img {
            width: 40%;
            max-height: 100%;
        }
    }

    @media only screen and (max-width: 767px) {
        .bundle-content .bundle-header .header-img {
            height: 30px;
        }

        [data-test-value="None"] img, [data-test-value="Simple"] img, [data-test-value="Full"] img {
            max-height: 40px;
        }

        [data-test-value="None"]>div, [data-test-value="Simple"]>div, [data-test-value="Full"]>div {
            top: 4px;
        }
    }
    `;

    var style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
}

function cambiarImagenes() {
    var imageUrls = {
        'none': "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/2c1fcf3a-15d9-4216-8a20-e8c319238936/B%C3%A1sica.png",
        'simple': "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/7365bffd-b5aa-4599-a2e4-9a4cd67ad47e/Plus%2B.png",
        'full': "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/7aa21e15-23fe-46a9-a432-eefad47eaee9/Premium.png"
    };

    document.querySelectorAll(`[data-test-id="bundle-selector-option--j|0-c|none"] .bundle-header .header-img`).forEach(img => {
        img.src = imageUrls['none'];
    });
    document.querySelectorAll(`[data-test-id="bundle-selector-option--j|1-c|none"] .bundle-header .header-img`).forEach(img => {
        img.src = imageUrls['none'];
    });
    document.querySelectorAll(`[data-test-id="bundle-selector-option--j|0-c|simple"] .bundle-header .header-img`).forEach(img => {
        img.src = imageUrls['simple'];
    });
    document.querySelectorAll(`[data-test-id="bundle-selector-option--j|1-c|simple"] .bundle-header .header-img`).forEach(img => {
        img.src = imageUrls['simple'];
    });
    document.querySelectorAll(`[data-test-id="bundle-selector-option--j|0-c|full"] .bundle-header .header-img`).forEach(img => {
        img.src = imageUrls['full'];
    });
    document.querySelectorAll(`[data-test-id="bundle-selector-option--j|1-c|full"] .bundle-header .header-img`).forEach(img => {
        img.src = imageUrls['full'];
    });
}

function cambiarImagenes2() {
    document.querySelectorAll('[data-test-value="None"] img, [data-test-value="Simple"] img, [data-test-value="Full"] img').forEach(function(imgElement) {
        var testValue = imgElement.closest('[data-test-value]').getAttribute('data-test-value');

        if (testValue === "None") {
            imgElement.src = "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/2c1fcf3a-15d9-4216-8a20-e8c319238936/B%C3%A1sica.png";
        } else if (testValue === "Simple") {
            imgElement.src = "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/7365bffd-b5aa-4599-a2e4-9a4cd67ad47e/Plus%2B.png";
        } else if (testValue === "Full") {
            imgElement.src = "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/7aa21e15-23fe-46a9-a432-eefad47eaee9/Premium.png";
        }
    });
}

function allChanges() {
    cambiarImagenes2();
    cambiarImagenes();
}

if (culture !== 'pt-BR' && culture !== 'en-US' && postB === false && staff !== 'EMPL') {
    addCSS();
    allChanges();
    window.eventBus.subscribe({
        name: "editImageBundles", callback: function (e) {
            allChanges();
        }
    });
}

}, 600);