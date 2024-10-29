function addCSS() {
    var css = `
            /* CSS COMUNES  */

    #modalUpgrade {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(22,58,112,.3);
        z-index: 1000;
    }

    .fligth-packs{
        text-align: center;
    }
    .btn-modals{
        width: 112px;
        height: 38px;
        font-size: 14px;
        background: #fff;
        cursor: pointer;
        border-radius: 9999px;
        letter-spacing: 0;
        font-weight: 700;
        line-height: 1;
        font-family: Lato,sans-serif;
        white-space: normal;
        padding: 10px 35px 10px 15px;
        text-transform: none;
        position: relative;
    }
    .btn-modals:after{
        position: absolute;
        font-weight: 400;
        top: 50%;
        transform: translateY(-50%);
        font-family: jetsmart-v2!important;
        right: 5px;
        content: "\\E9BA";
        font-size: 29px;
    }
    .text-price{
        font-size: 22px;
    }
    .container-ssr-line{
        padding: 0 15px;
        font-size: 13px;
    }
    li::marker{
        font-size: 0;
    }
    .container-ssrs{
        display: flex;
        justify-content: center;
    }
    .text-ssrs{
        font-weight: 600;
        font-size: 16px;
    }
    .icon-check{
        position: relative;
        bottom: 18px;
        right: 6px;
        width: 9.06px;
        font-size: 14px;
        margin-right: 0px !important;
    }
    .div-ssrs{
        width: 40px;
        height: 40px;
        border-radius: 7.55px;
        font-size: 21px;
        text-align: center;
        padding-top: 10px;
        margin-right: 0px !important;
    }
    .text-adicionales{
        font-size: 14px;
        margin: 18px 0px 14px 0px;
    }
    .btn-close-modal{
        position: relative;
        top: -11px;
        right: -25rem;
        width: 30px;
        height: 30px;
        background: #333;
        color: #fff;
        border-radius: 50%;
        border: none;
        font-size: 25px;
        line-height: 1;
        cursor: pointer;
        padding: 0;
        cursor: pointer;
        text-align: center;
    }

    .noWantText {
        margin-top: 8px;
        text-align: center;
    }

    .noAdd {
        font-size: 14px;
        color: #75787b;
        cursor: pointer;
        text-decoration: underline;
    }

    .noAdd:hover {
        color: #b2292e;
    }

        /* CSS MODAL SMART */
    .btn-smart:hover{
        background: #00ABC8 !important;
        color: #fff !important;
        border-color: #00ABC8 !important;
    }
    .btn-smart{
        color: #00ABC8;
        border-color: #00ABC8;
    }
    .div-seats{
        margin: 0px 13px 0px -10px;
    }
    .div-flexi{
        margin: 0px 20px 0px -66px;
    }
    .text-smart, .div-smart, .text-adi-smart, .icon-check-smart{
        color: #00ABC8;
    }
    .div-smart{
        border: 1px solid #00ABC8;
    }
    .containerModalSmart{
        background: #fff;
        width: 412px;
        height: 470px;
        border-radius: 10px;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.15);
    }
    .background-modal-smart{
        background: url("https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/08732702-816d-4240-b5d9-693dfd5a0a13/Imaegn.png") !important;
        border-radius: 10px 10px 0px 0px !important;
        height: 182px !important;
        background-repeat:no-repeat !important;
        background-size:contain !important;
        background-position:center !important;
        border-radius: 5px 5px 5px 5px !important;
        margin-top: -12px;
    }

        /* CSS MODAL PACK FULL */
    .background-modal-full{
        background: url("https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/59a02f1b-c973-4cfd-b9ce-c5cd4fe5d46e/Imaegn%20%281%29.png") !important;
        border-radius: 10px 10px 0px 0px !important;
        height: 182px !important;
        background-repeat:no-repeat !important;
        background-size:contain !important;
        background-position:center !important;
        border-radius: 5px 5px 5px 5px !important;
        margin-top: -12px;
    }
    .containerModalFull{
        background: #fff;
        width: 412px;
        height: 408px;
        border-radius: 10px;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.15);
    }
    .btn-full{
        color: #263F6A;
        border-color: #263F6A;
    }
    .div-full{
        border: 1px solid #263F6A;
    }
    .text-full, .div-full, .text-adi-full, .icon-check-full{
        color: #263F6A;
    }
    .div-asientos{
        margin: 0px 20px 0px -23px;
    }
    .btn-full:hover{
        background: #263F6A !important;
        color: #fff !important;
        border-color: #263F6A !important;
    }
    @media (max-width: 47.9375rem){
        .text-ssrs{
            line-height: unset;
        }
    }

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

function addUpgradeSmart() {
    var modalTemplate = `
    <div id="modalUpgrade" style="display: flex;">
    <div class="containerModalSmart">
    <div class="btn-close-modal">×</div>
    <div class="background-modal-smart">
    </div>
    <div class="container-ssrs">
    <li>
    <div class="ssr-line container-ssr-line div-flexi">
    <i class="js-icon-bundle js-bundle-flexi-smart-no-border div-ssrs div-smart"></i>
    <i class="js-icon js-flight-tick icon-check icon-check-smart"></i>
    <div class="ssr-line-name text-ssrs text-smart">
    FlexiSMART 
    </div>
    </div>
    </li>
    <li>
    <div class="ssr-line container-ssr-line">
    <i class="js-icon js-priority div-ssrs div-smart"></i>
    <i class="js-icon js-flight-tick icon-check icon-check-smart"></i>
    <div class="ssr-line-name text-ssrs text-smart">
    Embarque<br> prioritario 
    </div>
    </div>
    </li>
    </div>
    <div class="container-ssrs">
    <li>
    <div class="ssr-line container-ssr-line div-seats">
    <i class="js-icon js-cr-seats1 div-ssrs div-smart"></i>
    <i class="js-icon js-flight-tick icon-check icon-check-smart"></i>
    <div class="ssr-line-name text-ssrs text-smart">
    Asientos filas<br> 15-32 
    </div>
    </div>
    </li>
    <li>
    <div class="ssr-line container-ssr-line">
    <i class="js-icon-bundle js-bundle-cabin-and-checked-bags div-ssrs div-smart"></i>
    <i class="js-icon js-flight-tick icon-check icon-check-smart"></i>
    <div class="ssr-line-name text-ssrs text-smart">
    Equipaje de<br> Mano y Facturado 
    </div>
    </div>
    </li>
    </div>
    <div class="fligth-packs">
    <div class="text-adicionales text-adi-smart">Por sólo <strong class="text-price"> $10.000 </strong> adicionales<br>por pasajero.</div>
    <button class="btn-modals btn-smart" data-test-id="flight-continue-button">
    Cambiar
    </button>
    <div class="noWantText">
    <span class="noAdd">No quiero</span>
    </div>
    </div>
    </div><br>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalTemplate);

    var quieroButton = document.querySelector('.btn-modals.btn-smart')
    var noWant = document.querySelector('.noAdd');
    var closeButton = document.querySelector('.btn-close-modal');
    var bundleBND0 = document.querySelector('[data-test-value="BND0"]');
    var bundleBND1 = document.querySelector('[data-test-value="BND1"]');
    var modalUpgrade = document.querySelector('#modalUpgrade');

    quieroButton.addEventListener('click', function() {
        if (modalUpgrade) {
            modalUpgrade.remove();
        }
        if (bundleBND1) {
            bundleBND1.click();
        }
    });

    noWant.addEventListener('click', function() {
        if (modalUpgrade) {
            modalUpgrade.remove();
        }
        if (bundleBND0) {
            bundleBND0.click();
        }
    });

    closeButton.addEventListener('click', function() {
        if (modalUpgrade) {
            modalUpgrade.remove();
        }
    });
}

function addUpgradeFull() {
    var modalTemplate = `
    <div id="modalUpgrade" style="display: flex;">
    <div class="containerModalFull">
    <div class="btn-close-modal">×</div>
    <div class="background-modal-full">
    </div>
    <div class="container-ssrs">
    <li>
    <div class="ssr-line container-ssr-line div-asientos">
    <i class="js-icon js-seats-all div-ssrs div-full"></i>
    <i class="js-icon js-flight-tick icon-check icon-check-full"></i>
    <div class="ssr-line-name text-ssrs text-full">
    Asientos<br>primera fila 
    </div>
    </div>
    </li>
    <li>
    <div class="ssr-line container-ssr-line">
    <i class="js-icon js-boarding-card div-ssrs div-full"></i>
    <i class="js-icon js-flight-tick icon-check icon-check-full"></i>
    <div class="ssr-line-name text-ssrs text-full">
    Impresión tarjeta<br>de embarque 
    </div>
    </div>
    </li>
    </div>
    <div class="fligth-packs">
    <div class="text-adicionales text-adi-full">Por sólo <strong class="text-price"> $15.624 </strong> adicionales<br>por pasajero.</div>
    <button class="btn-modals btn-full" data-test-id="flight-continue-button">
    Cambiar
    </button>
    <div class="noWantText">
    <span class="noAdd">No quiero</span>
    </div>
    </div>
    </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalTemplate);

    var quieroButton = document.querySelector('.btn-modals.btn-full')
    var noWant = document.querySelector('.noAdd');
    var closeButton = document.querySelector('.btn-close-modal');
    var bundleBND1 = document.querySelector('[data-test-id="bundle-selector--j|0"] [data-test-value="BND1"]');
    var bundleBND2 = document.querySelector('[data-test-id="bundle-selector--j|0"] [data-test-value="BND2"]');
    var modalUpgrade = document.querySelector('#modalUpgrade');

    quieroButton.addEventListener('click', function() {
        if (modalUpgrade) {
            modalUpgrade.remove();
        }
        if (bundleBND2) {
            bundleBND2.click();
        }
    });

    noWant.addEventListener('click', function() {
        console.log("gola")
        if (modalUpgrade) {
            modalUpgrade.remove();
        }
        if (bundleBND1) {
            bundleBND1.click();
        }
    });

    closeButton.addEventListener('click', function() {
        if (modalUpgrade) {
            modalUpgrade.remove();
        }
    });
}

function fakeBundle(selector) {
    var targetDiv = document.querySelector(selector);
    if (targetDiv) {
        targetDiv.style.position = 'relative';
        var coverDiv = document.createElement('div');
        var dataTestValue = targetDiv.getAttribute('data-test-value');
        var isIda = selector.includes('bundle-selector--j|0');
        var isVuelta = selector.includes('bundle-selector--j|1');
        
        coverDiv.classList.add('fakeClickBundle');
        coverDiv.id = 'fake-' + dataTestValue;
        
        if (isIda) {
            coverDiv.classList.add('ida');
        } else if (isVuelta) {
            coverDiv.classList.add('vuelta');
        }

        coverDiv.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Se está intentando hacer click en ' + dataTestValue);
        });

        targetDiv.appendChild(coverDiv);
    }
}

function fakeClickSmart(selector) {
    var elemento = document.querySelector(selector);
    if (elemento) {
        elemento.addEventListener('click', function() {
            var ida = elemento.getAttribute('ida');
            var vuelta = elemento.getAttribute('vuelta');
            
            if (ida) {
                addUpgradeSmart(ida); // Llamar a la función con el valor de 'ida'
            }
            
            if (vuelta) {
                addUpgradeSmart(vuelta); // Llamar a la función con el valor de 'vuelta'
            }
        });
    }
}

function fakeClickFull(selector) {
    var elemento = document.querySelector(selector);
    if (elemento) {
        elemento.addEventListener('click', function() {
            addUpgradeFull();
        });
    }
}

addCSS();

fakeBundle('[data-test-id="bundle-selector--j|0"] [data-test-value="BND0"]');
fakeBundle('[data-test-id="bundle-selector--j|0"] [data-test-value="BND1"]');
fakeBundle('[data-test-id="bundle-selector--j|1"] [data-test-value="BND0"]');
fakeBundle('[data-test-id="bundle-selector--j|1"] [data-test-value="BND1"]');
fakeClickSmart('#fake-BND0.fakeClickBundle.ida');
fakeClickSmart('#fake-BND0.fakeClickBundle.vuelta');
fakeClickFull('#fake-BND1.fakeClickBundle.ida');
fakeClickSmart('#fake-BND0.fakeClickBundle.vuelta');
fakeClickFull('#fake-BND1.fakeClickBundle.vuelta');