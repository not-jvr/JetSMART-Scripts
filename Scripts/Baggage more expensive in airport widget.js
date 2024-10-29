var addWidgetCabinBaggage = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/baggage') return;
  clearInterval(addWidgetCabinBaggage);

  var culture = bookingData.Culture;
  var postBooking = bookingData.PostBooking;
  var firstClick = 0;

  function addCSS() {
   var css = `
   .btn-equipaje{
    display: flex;
    position: relative;
    padding: 2px 2px 2px 16px;
    align-items: center;
    border-radius: 19px;
    background: #00ABC8;
    font-size: 13px;
    color: #fff;
    font-weight: 700;
    cursor: pointer;
    width: 158px;
    height: 38px;
    text-align: center;
    margin-left: 3rem;
    min-width: 157px;
    padding: 10px 35px 10px 15px;
}
.btn-equipaje:after{
    position: absolute;
    font-weight: 400;
    top: 50%;
    transform: translateY(-50%);
    font-family: jetsmart-v2!important;
    right: 5px;
    content: "\\E9BA";
    font-size: 25px;
}
.btn-equipaje:hover{
    background: #fff;
    color: #00ABC8;
    border: 2px solid #00ABC8;
}
.text-reserva{
    line-height: 1.3 !important;
    font-size: 15px !important;
}
.text-sin-equi{
    font-size: 16px !important;
}
.bag-expensive{
    padding: 10px 20px 10px 0px;
}
.porc-dcto{
    line-height: 0.6;
    padding: 2px;
}
.text-dcto{
    font-size: 10px;
}
.text-porc{
    font-size: 25px;
}
.text-60{
    font-size: 34px;
}
.icon-equipaje{
    margin-top: -8%;
    max-width: 100%;
}
.container-dcto{
    border-radius: 60px;
    background: #1c355e;
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin-right: 1rem;
    padding: 10px;
}
@media (min-width: 64rem) and (max-width: 74.9375rem){
    .icon-equipaje{
        width: 17%;
    }
    .container-dcto{
        width: 65px;
        height: 65px;
    }
    .text-60 {
        font-size: 30px;
    }
    .text-porc {
        font-size: 20px;
    }
    .text-dcto {
        font-size: 9px;
    }
    .btn-equipaje{
        margin-left: 0;
    }
}
@media (min-width: 48rem) and (max-width: 63.9375rem){
    .icon-equipaje{
        margin-top: -4%;
    }
    .container-dcto{
        width: 65px;
        height: 65px;
    }
    .text-60 {
        font-size: 30px;
    }
    .text-porc {
        font-size: 20px;
    }
    .btn-equipaje{
        margin-left: 0;
    }
}
@media (max-width: 47.9375rem){
    .bag-expensive {
        padding: 10px 20px 50px 0px !important;
    }
    .btn-equipaje{
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: -8rem;
        margin-left: 0;
    }
    .icon-equipaje{
        width: 72px;
        height: 85px;
        margin-top: 0%;
    }
    .container-dcto{
        width: 48px;
        height: 48px;
        margin-right: 0rem;
    }
    .text-60 {
        font-size: 19px;
    }
    .text-porc {
        font-size: 14px;
    }
    .text-dcto {
        font-size: 7px;
    }
    .container-text{
        position: relative;
        left: 5px;
    }
}
@media only screen and (max-width: 450px) and (min-width: 372px){
    .btn-equipaje{
        margin-bottom: -9rem;
    }
    .bag-expensive {
        padding: 10px 20px 60px 0px !important;
    }
}
@media only screen and (max-width: 372px) and (min-width: 320px){
    .btn-equipaje{
        margin-bottom: -12.5rem;
    }
    .bag-expensive {
        padding: 10px 20px 63px 0px !important;
    }
}`
,
head = document.head || document.getElementsByTagName('head')[0],
style = document.createElement('style');
head.appendChild(style);
style.type = 'text/css';
if (style.styleSheet) {
                // This is required for IE8 and below.
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}
}

function addHTML() {
    var targetElement = document.querySelector('ac-select-cabin-bag');

    switch (culture) {
    case 'en-US':
        var text1 = 'Are you sure you want to travel without luggage?';
        var text2 = 'Remember you can now save <strong>60%</strong> if you add it to your booking.';
        var buttontext = 'Add cabin luggage';
        break;
    case 'pt-BR':
        var text1 = 'Você tem certeza de que deseja viajar sem bagagem?';
        var text2 = 'Lembre-se de que agora você pode economizar <strong>60%</strong> se adicioná-la à sua reserva.';
        var buttontext = 'Adicionar bagagem';
        break;
    default:
        var text1 = '¿Seguro que quieres viajar sin equipaje?';
        var text2 = 'Recuerda que ahora puedes ahorrar un <strong>60%</strong> si lo agregas a tu reserva.';
        var buttontext = 'Agregar equipaje<br>de cabina';
        break;
    }
    
    if (targetElement && !document.querySelector('#msgViajarSinEquipaje') && firstClick === 0) {
        var newHTML = `
        <header class="b2-section-header push-down b2-checked-scroll-to-on-close bag-expensive" id="msgViajarSinEquipaje">
        <div class="flex items-center">
        <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/e563874a-fc74-419b-bd7f-1b3c43894369/image%2071.png" class="icon-equipaje">
        <div class="container-dcto">
        <strong class="text-60">
        60
        </strong>
        <div class="porc-dcto">
        <strong class="text-porc">
        %
        </strong><br>
        <span class="text-dcto">
        dcto.
        </span>
        </div>
        </div>
        <div class="container-text">
        <h3 class="text-sin-equi">${text1}</h3>
        <h4 class="text-reserva">${text2}</h4>
        </div>
        <div class="btn-equipaje" id="buttonAgregarEquipaje">${buttontext}</div>
        </div>
        </header>
        `;

        targetElement.insertAdjacentHTML('afterend', newHTML);
        
        var bannerBaggage = document.querySelector('#msgViajarSinEquipaje');
        var addBaggage = document.querySelector("ac-select-cabin-bag ac-per-booking-paid-option .b2-primary-button");
        var alertMobile = document.querySelector("ac-select-cabin-bag ac-per-booking-mobile .alerta-equipaje");

        var button = document.querySelector('#buttonAgregarEquipaje');
        if (button) {
            button.addEventListener("click", function() {
                if (addBaggage) {
                    addBaggage.click();
                    if (bannerBaggage) {
                        bannerBaggage.remove();
                    }
                    if (alertMobile) {
                        alertMobile.remove();
                    }
                }
            });
        }

        var containerCabinBagMobile = document.querySelector("ac-select-cabin-bag ac-per-booking-mobile .b2m-per-booking-section.padded");
        if (containerCabinBagMobile) {
            containerCabinBagMobile.onclick = function () {
                if (bannerBaggage) {
                    bannerBaggage.remove();
                }
            };
        }     

        var desktopButtonCabin = document.querySelector('.b2-paid-bag-option');
        if (desktopButtonCabin) {
            desktopButtonCabin.onclick = function () {
                if (bannerBaggage) {
                    bannerBaggage.remove();
                }
            };
        }

        var desktopButtonCabin2 = document.querySelector('[data-test-id="baggage-per-booking-add-first-button--c|CabinBaggage"]');
        if (desktopButtonCabin2) {
            desktopButtonCabin2.onclick = function () {
                if (bannerBaggage) {
                    bannerBaggage.remove();
                }
            };
        }   
    }
}

function maybeAdd() {
    var autoSelectNoCabin = document.querySelector('.b2-free-bag-option.selected');
    if (autoSelectNoCabin) {
        addHTML();
        firstClick = 1;
    }
}

function clicksAddHTML(selector) {
    var button = document.querySelector(selector);
    if (button) {
        button.addEventListener("click", function() {
            addHTML();
            firstClick = 1;
        });
    }
}

function allClicks() {
    clicksAddHTML('.b2-free-bag-option');
    clicksAddHTML('[data-test-id="baggage-per-booking-reset-button--c|CabinBaggage"]');
    clicksAddHTML('ac-per-booking-mobile .b2m-per-booking-section.free')
}

if (culture && !postBooking) {

    var o, r = false;
    var hasBundle = bookingData.Passengers.map(function (a) {
        if (!o) o = a.hasOwnProperty("OutboundJourneySsrs") && a.OutboundJourneySsrs && (a.OutboundJourneySsrs.indexOf("STB1") !== -1 || a.OutboundJourneySsrs.indexOf("STB2") !== -1);
        if (!r) r = a.hasOwnProperty("ReturnJourneySsrs") && a.ReturnJourneySsrs && (a.ReturnJourneySsrs.indexOf("STB1") !== -1 || a.ReturnJourneySsrs.indexOf("STB2") !== -1);
    })

    if (!o && !r) {
        addCSS();
        maybeAdd();
        allClicks();
    }
}

}, 600);