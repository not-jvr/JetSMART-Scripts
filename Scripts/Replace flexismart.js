var initFlexiSMARTChange = setInterval(function () {
    if (typeof bookingData === "undefined" || typeof window.eventBus === "undefined" || window.location.pathname !== '/V2/Flight') return;
    clearInterval(initFlexiSMARTChange);

    var culture = bookingData.Culture;
    if (culture === 'es-CL' || culture === 'es-PE' || culture === 'es-AR') {
        window.eventBus.subscribe({
            name: "SidebarReloaded", callback: function (e) {
                document.querySelectorAll('div.ssr-line-name').forEach(function (element) {
                    for (var i = 0; i < element.childNodes.length; i++) {
                        if (element.childNodes[i].nodeType === Node.TEXT_NODE && element.childNodes[i].nodeValue.trim() === 'FlexiSMART') {
                            element.childNodes[i].nodeValue = 'Un cambio gratis';
                        }
                    }
                });
            }
        });
    }
}, 200);