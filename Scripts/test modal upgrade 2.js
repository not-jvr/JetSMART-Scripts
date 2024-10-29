function addCSS() {
    var css = `
    .fakeClickBundle {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: 1;
    }
    `;

    var head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
}

function fakeBundle(selector) {
    var targetDiv = document.querySelector(selector);
    if (targetDiv) {
        targetDiv.style.position = 'relative';
        var coverDiv = document.createElement('div');
        var dataTestValue = targetDiv.getAttribute('data-test-value');
        
        coverDiv.classList.add('fakeClickBundle');
        coverDiv.id = 'fake-' + dataTestValue;

        coverDiv.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Se está intentando hacer click en ' + dataTestValue);
        });

        targetDiv.appendChild(coverDiv);
    }
}

addCSS();
fakeBundle('[data-test-value="BND0"]');

function clicktest() {
    testbutton = document.querySelector('[data-test-value="BND0"]');
    testbutton.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Se está intentando hacer click en');
        });
}

clicktest()