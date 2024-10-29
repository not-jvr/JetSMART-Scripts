var initBundles = setInterval(function () {
    if (typeof bookingData === "undefined") return;
    clearInterval(initBundles);
    var culture = bookingData.Culture;
    window.eventBus.subscribe({
        name: "hidden_bundle", callback: function (e) {
            const smartFeeButtons = document.querySelectorAll('.smart-fee.nowrap.big, .discount-fee.nowrap.small, .smart-fee.nowrap.small, .discount-fee.nowrap.big');
            const buttonClickHandler = function () {
                if (culture == 'es-AR') {
                    const elements = document.querySelectorAll('[data-test-id="bundle-ssr-item--j|0-c|none|FLXB"], [data-test-id="bundle-ssr-item--j|0-c|none|LBGC|LBGD|LBGC|LBAG|BAGC|BAGD"], [data-test-id="bundle-ssr-item--j|0-c|none|PBOA|PBA|PBD|PBP"], [data-test-id="bundle-ssr-item--j|0-c|none|SOMESEATS"], [data-test-id="bundle-ssr-item--j|0-c|none|ALLSEATS"], [data-test-id="bundle-ssr-item--j|0-c|none|APCH|APCA|APCD|APCP"], [data-test-id="bundle-ssr-item--j|0-c|simple|ALLSEATS"], [data-test-id="bundle-ssr-item--j|0-c|simple|APCH|APCA|APCD|APCP"], [data-test-id="bundle-ssr-item--j|1-c|none|FLXB"], [data-test-id="bundle-ssr-item--j|1-c|none|LBGC|LBGD|LBGC|LBAG|BAGC|BAGD"], [data-test-id="bundle-ssr-item--j|1-c|none|PBOA|PBA|PBD|PBP"], [data-test-id="bundle-ssr-item--j|1-c|none|SOMESEATS"], [data-test-id="bundle-ssr-item--j|1-c|none|ALLSEATS"], [data-test-id="bundle-ssr-item--j|1-c|none|APCH|APCA|APCD|APCP"], [data-test-id="bundle-ssr-item--j|1-c|simple|ALLSEATS"], [data-test-id="bundle-ssr-item--j|1-c|simple|APCH|APCA|APCD|APCP"]');
                    elements.forEach(function (element) {
                        element.style.visibility = 'hidden';
                    });
                }
            };
            smartFeeButtons.forEach(button => button.addEventListener('click', buttonClickHandler));
        }
    });

}, 200);