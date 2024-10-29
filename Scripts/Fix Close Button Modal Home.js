var fixFloatBox = setInterval(function() {
    if (!window.location.href.startsWith('https://jetsmart.com') || !document.querySelector('.float-box')) return;
    clearInterval(fixFloatBox);

    function addCSS() {
        var css = `
        .float-box .close-btn {
            position: absolute;
            top: 0;
            right: 0;
            margin: 10px;
        }
        `;

        var style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }

    function addX() {
        var closeButton = document.createElement('span');
        closeButton.classList.add('close-btn');
        closeButton.textContent = 'X';
    closeButton.id = 'custom-close-btn'; // Agregamos un ID al botón de cierre

    var container = document.querySelector('.float-box');
    if (container) {
        container.appendChild(closeButton);
    }
}

function closeFloatBox() {
    var floatBox = document.querySelector('.float-box');
    if (floatBox) {
        floatBox.style.display = 'none';
    }
}

// Evento de clic en el botón de cierre para cerrar el float box
document.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'custom-close-btn') {
        closeFloatBox();
    }
});

addCSS();
addX();

}, 600);