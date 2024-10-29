var initFixSpaceXL = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/seat/map') return;
    clearInterval(initFixSpaceXL);

    function addCSS() {
        var css = `
        .cf-seatmap-row.cf-gap-before.extra-room[data-test-id="seatmap-row--j|0-s|0"] {
            padding-top: 0; 
        }
        `;

        var style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }

    addCSS();

}, 600);