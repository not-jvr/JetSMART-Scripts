var initHrefModal = setInterval(function () {
    if (!window.location.pathname.includes('/minisitios/promo')) return;
    clearInterval(initHrefModal);

    document.addEventListener('click', function (event) {
        if (event.target.matches('#modal_btn')) {
            event.preventDefault();

            var newHref = "https://www.jetsmart.com";
            switch(true) {
                case window.location.pathname.includes("/cl/es"):
                    newHref += "/cl/es";
                    break;
                case window.location.pathname.includes("/ar"):
                    newHref += "/ar";
                    break;
                case window.location.pathname.includes("/co/es"):
                    newHref += "/co/es";
                    break;
                case window.location.pathname.includes("/pe/es"):
                    newHref += "/pe/es";
                    break;
                case window.location.pathname.includes("/uy/es"):
                    newHref += "/uy/es";
                    break;
                case window.location.pathname.includes("/py/es"):
                    newHref += "/py/es";
                    break;
                case window.location.pathname.includes("/br/pt"):
                    newHref += "/br/pt";
                    break;
                case window.location.pathname.includes("/us/en"):
                    newHref += "/us/en";
                    break;
                default:
                    break;
            }
            
            location.href = newHref;
        }
    }, false);
    
}, 400);