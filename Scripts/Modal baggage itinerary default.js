var intModBggDefault = setInterval(function(){
    if(typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/itinerary') return;
    clearInterval(intModBggDefault);

    var culture = bookingData.Culture;
    var currency = bookingData.TotalPriceCurrencyLocal;

    function addModal() {
        var outboundCL = false;
        var arrivalCL = false;
        var rutasCL = ["SCL", "ARI", "IQQ", "CJC", "ANF", "LSC", "CCP", "ZCO", "ZAL", "PMC", "MHC", "BBA", "PNT", "PUQ"];

        var outboundAR = false;
        var arrivalAR = false;
        var rutasAR = ["EZE", "JUJ", "SLA", "IGR", "TUC", "PSS", "CNQ", "COR", "COR", "MDZ", "NQN", "BRC", "CRD", "FTE", "USH", "CPC"];

        var outboundPE = false;
        var arrivalPE = false;
        var rutasPE = ["IQT", "TPP", "TYL", "PIU", "CIX", "CJA", "TRU", "LIM", "CUZ", "AQP"];

        if (bookingData.OutboundJourney.DepartureStationCode) {
            outboundCL = (rutasCL.indexOf(bookingData.OutboundJourney.DepartureStationCode) > -1);
            outboundAR = (rutasAR.indexOf(bookingData.OutboundJourney.DepartureStationCode) > -1);
            outboundPE = (rutasPE.indexOf(bookingData.OutboundJourney.DepartureStationCode) > -1);
        }

        if (bookingData.OutboundJourney.ArrivalStationCode) {
            arrivalCL = (rutasCL.indexOf(bookingData.OutboundJourney.ArrivalStationCode) > -1);
            arrivalAR = (rutasAR.indexOf(bookingData.OutboundJourney.ArrivalStationCode) > -1);
            arrivalPE = (rutasPE.indexOf(bookingData.OutboundJourney.ArrivalStationCode) > -1);
        }

        var price = '$33 USD*';
        var percentage = '84%'

        if(outboundCL && arrivalCL){
            price = '$17.400 CLP*';
            percentage = '30%'
        }

        if(outboundAR && arrivalAR){
            price = '$3.840 ARS*';
            percentage = '4%'
        }

        if(outboundPE && arrivalPE){
            price = '$16 USD*';
            percentage = '38%';
        }
        var text_header = '<b>¡Hemos visto que<br>viajas y no<br>llevas equipaje!<br> </b>';       
        var text_body = 'La mayoría de personas que viajan<br>añaden un equipaje<br>para que no les cobren en aeropuerto';
        var text_button = '¡Lo quiero!';

        var modalBaggage = `
        <paid-bag-modal>
        <div id="modalBaggageAB" class="modal i2-itinerary-section" style="display: block;">
        <div class="modal-content">
        <div class="header-cont-custom">
        <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/8f6926ce-42cd-4dd3-8ac4-bde56a5402c5/bg_m.png" class="background">
        <div class="modal-header text-left">
        <div>
        <div class="font-SB">
        ${text_header}
        </div>
        <div class="modal_body text-left">
        <div class="font-sm">${text_body}
        </div>
        </div>
        </div>
        <button id="close-modal">×</button>
        </div>
        </div>
        <div class="modal-body text-center">
        <div class="top-text-red">Ahorra hasta un ${percentage}</div>
        <div class="container-modal">
        <div class="left-image">
        <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/9aeaf33c-2e13-4ae8-9cb8-7767a89f3b8d/bag-icon.png"/>
        </div>
        <div class="right-price">
        <div>
        <p class="text-1">Equipaje facturado</p>
        <p class="text-2">Hasta 23 kg</p>
        <div class="price-box-m">
        <small>Desde</small>
        <p>${price}</p>
        <small class="small-2">*Precio aplica solo a algunas rutas</small>
        </div>
        </div>
        </div>
        </div>
        <div class="modal-button-container modification-buttons-container">
        <button id="clickButton" class="rounded-primary-btn lightblue-btn">
        ${text_button}
        </button>
        </div>
        <div class="bottom-text-close"><a href="javascript:void(0);">No quiero agregar equipaje</a></div>
        </div>
        </div>
        </div>
        </paid-bag-modal>`;

        var footer = document.querySelector('body > app > footer');
        footer.insertAdjacentHTML('afterend', modalBaggage);

        document.querySelector('#close-modal').addEventListener('click', function(){
            document.querySelector('#modalBaggageAB').style.display = 'none';
        })

        document.querySelector(".bottom-text-close a").addEventListener('click', function(){
            document.querySelector('#modalBaggageAB').style.display = 'none';
        })

        document.querySelector('#modalBaggageAB #clickButton').addEventListener('click', function(){
            var buttonBaggage = document.querySelector('[data-test-id="itinerary-baggage-a"]')
            if (buttonBaggage) {
                buttonBaggage.click();
            }
        })
    }

    function addCSSModal() {
        var css = `
        modal-seat {
            display: none;
        }

        #modalBaggageAB.modal {
            z-index: 1000;
        }
        #modalBaggageAB .header-cont-custom {
            position: relative;
        }

        #modalBaggageAB .background {
            margin-top: -9%;
            max-width: 100%;
        }

        #modalBaggageAB .rounded-primary-btn {
            display: flex;
            justify-content: center;
            --bg-opacity: 1;
            --text-opacity: 1;
            color: rgba(255,255,255,var(--text-opacity));
            position: relative;
            border-radius: 9999px;
            letter-spacing: 0;
            text-transform: none;
            font-weight: 700;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            --border-opacity: 1;
            border: 2px solid rgba(178,41,46,var(--border-opacity));
            line-height: 1;
            font-family: Lato,sans-serif;
            white-space: normal;
            text-align: center;
            padding: 10px 35px 10px 15px;
        }

        #modalBaggageAB .modal-content {
            padding: 0;
            width:800px;
        }

        #modalBaggageAB .modal-content .modal-header.text-left {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: transparent;
            text-align: left;
            justify-content: start;
            font-family: 'ClanOT-News', 'Lato Medium';
            display: flex;
            align-items: center;
            padding: 20px;
            border-radius: 10px;
            font-weight: 100;
            font-size: 22px;
            line-height: 1.2;
        }

        #modalBaggageAB .modal-content .modal_body.text-left {
            font-family: 'ClanOT-News', 'Lato Medium';
            font-weight: 100;
            font-size: 15px;
            line-height: 1.2;
        }

        #modalBaggageAB .modal-content .modal-header.text-left * {
            color: #ffffff;
        }

        #modalBaggageAB .modal-content .modal-header button {
            top: 32px;
            right: 15px;
            color: #ffffff;
            border: 3px solid #ffffff;
            border-radius: 26px;
            padding: 1px 8px 1px 9px;
            font-size: 36px;
            position: absolute;
            transform: translateY(-50%);
            background: transparent;
            cursor: pointer;
            font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
            line-height: 1;
        }

        #modalBaggageAB .modal-body {
            padding: 0px 30px 70px 30px;
        }

        #modalBaggageAB .logo {
            width: 40vw;
            max-width: max-content;
        }

        #modalBaggageAB .modal-button-container.modification-buttons-container {
            margin-top: 20px;
        }

        #modalBaggageAB .lightblue-btn {
            margin: 0 auto 15px;
            background-color: rgba(36,170,197,1);
            border-color: rgba(36,170,197,1);
            width: 530px;
            font-size: 33px;
            font-weight: bold;
            padding: 20px 35px 20px 15px;
            border: 0;
        }

        #modalBaggageAB .lightblue-btn:not(.disabled):hover {
            background-color: rgba(36,170,197,0.9) !important;
        }

        #modalBaggageAB .lightblue-btn.rounded-primary-btn:after{
            font-size: 58px;
        }
        #modalBaggageAB .rounded-primary-btn:not(.disabled):hover:after {
            font-weight: 100;
        }

        #modalBaggageAB .font-SB {
            font-size: 31px;
            margin-left: 30px;
            font-family: 'ClanOT-Book', 'Lato Medium';
        }

        #modalBaggageAB .font-SB b {
            font-size: 36px;
            font-family: "ClanOT-Bold", "Lato";
            font-weight: 700;
        }

        #modalBaggageAB .modal-body p {
            font-family: 'Lato',sans-serif;
            font-size: 18px;
            color: #1C355E;
            line-height: 1.2;
        }

        #modalBaggageAB .top-text-red{
            display: inline-block;
            background: #B2292E;
            padding: 15px 70px;
            border-radius: 30px;
            font-size: 20px;
            color: #FFFFFF;
            font-family: 'Lato', sans-serif;
            font-weight: 700;
            position: relative;
            z-index: 2;
            bottom: -23px;
        }
        #modalBaggageAB .container-modal{
            display: flex;
            width: 530px;
            margin: 0 auto;
        }
        #modalBaggageAB .container-modal p{
            margin-bottom:0;
        }
        #modalBaggageAB .left-image{
            width: 35%;
            border: 3px solid #E6E6E6;
            border-radius: 25px 0 0 25px;
            padding: 35px 15px 20px 15px;   
        }

        #modalBaggageAB .right-price{
            width: 65%;
            border: 3px solid #E6E6E6;
            border-left: 0;
            border-radius: 0 25px 25px 0;
            padding: 35px 15px 20px 40px;
            text-align: left;
            display: flex;
            align-items: center;
        }
        #modalBaggageAB .right-price .text-1{
            color: #2A385D;
            font-weight: bold;
            font-size: 23px;
        }
        #modalBaggageAB .right-price .text-2{
            color: #B3B3B3;
            font-weight: 500;
            font-size: 23px;
        }
        #modalBaggageAB .right-price .price-box-m{
            margin-top: 10px;
        }
        #modalBaggageAB .right-price .price-box-m small{
            font-family: 'Lato', sans-serif;
            font-size: 16px;
            font-weight: bold;
            color: #2A385D;
            display:block;
        }
        #modalBaggageAB .right-price .price-box-m p{
            font-family: 'Lato', sans-serif;
            font-size: 36px;
            font-weight: 800;
        }
        #modalBaggageAB .right-price .price-box-m small.small-2{
            font-size: 12px;
        }
        #modalBaggageAB .bottom-text-close a{
            color: #B3B3B3;
            text-decoration: underline;
            font-size: 23px;
            font-family: 'Lato', sans-serif;
            margin-top: 10px;
        }
        #modalBaggageAB .bottom-text-close a:hover{
            color:#8b8989;
        }
        @media(max-width:1200px), (max-height:880px){
            #modalBaggageAB .modal-content {
                padding: 0;
                width: 600px;
            }
            #modalBaggageAB .modal-body {
                padding: 0px 30px 30px 30px;
            }
            #modalBaggageAB .font-SB {
                font-size: 24px;
                margin-left: 20px;
            }
            #modalBaggageAB .font-SB b {
                font-size: 26px;
            }
            #modalBaggageAB .lightblue-btn{
                font-size: 30px;
                padding: 16px 35px 16px 15px;
            }
            #modalBaggageAB .lightblue-btn.rounded-primary-btn:after{
                font-size: 52px;
            }
        }

        @media (max-width: 768px), (max-height:720px) {
            #modalBaggageAB .modal-content .modal-header button{
                padding: 1px 6px 1px 7px;
                font-size: 26px;
            }
            #modalBaggageAB .modal-body{
                padding: 0px 30px 30px 30px;
            }
            #modalBaggageAB .font-SB {
                font-size: 20px;
                margin-left: 10px;
            }
            #modalBaggageAB .font-SB b {
                font-size: 22px;
            }
            #modalBaggageAB .left-image img {
                max-width: 100%;
                width: 65px;
            }
            #modalBaggageAB .modal-content{
                width: 480px;
            }
            #modalBaggageAB .modal-content .modal-header.text-left {
                max-height: none;
            }
            #modalBaggageAB .container-modal{
                width: 420px;
            }
            #modalBaggageAB .top-text-red{
                padding: 10px 50px;
                font-size: 16px;
                bottom: -20px;
            }
            #modalBaggageAB .right-price .text-1, #modalBaggageAB .right-price .text-2{
                font-size: 19px;
            }
            #modalBaggageAB .right-price .price-box-m{
                margin-top: 5px;
            }
            #modalBaggageAB .right-price .price-box-m small{
                font-size: 14px;
            }
            #modalBaggageAB .right-price .price-box-m p{
                font-size: 30px;
            }
            #modalBaggageAB .lightblue-btn{
                width: 420px;
                font-size: 24px;
                padding: 12px 35px 12px 15px;
            }
            #modalBaggageAB .lightblue-btn.rounded-primary-btn:after{
                font-size: 38px;
            }
            #modalBaggageAB .bottom-text-close a{
                font-size: 18px;
            }
        }

        @media (max-width: 569px), (max-height:610px) {
            #modalBaggageAB .modal-content{
                width: 300px;
            }
            #modalBaggageAB .modal-content .modal-header button{
                top: 20px;
                right: 8px;
                padding: 1px 4px 1px 5px;
                font-size: 20px;
                border: 2px solid;
            }
            #modalBaggageAB .modal-content .modal-header.text-left{
                padding: 15px;
            }

            #modalBaggageAB .font-SB{
                font-size: 14px;
                margin-left: 0;
            }

            #modalBaggageAB .font-SB b{
                font-size: 15px;    
            }
            #modalBaggageAB .modal-body{
                padding: 0px 15px 5px 15px;
                margin-top: -10px;
            }   
            #modalBaggageAB .top-text-red{
                padding: 2px 35px;
                font-size: 12px;
                bottom: -12px;
            }
            #modalBaggageAB .container-modal{
                width: 270px;
            }
            #modalBaggageAB .left-image{
                padding: 12px 15px 5px 15px;
            }
            #modalBaggageAB .left-image img{
                width: 39px;
            }
            #modalBaggageAB .right-price{
                padding: 12px 15px 5px 15px;
            }
            #modalBaggageAB .right-price .text-1, #modalBaggageAB .right-price .text-2{
                font-size: 14px;
            }
            #modalBaggageAB .right-price .price-box-m {
                margin-top: 0px;
                line-height: 1;
            }
            #modalBaggageAB .right-price .price-box-m small{
                font-size: 12px;
            }
            #modalBaggageAB .right-price .price-box-m p{
                font-size: 18px;
            }
            #modalBaggageAB .right-price .price-box-m small.small-2{
                font-size: 9px;
            }
            #modalBaggageAB .modal-button-container.modification-buttons-container{
                margin-top: 5px;
            }
            #modalBaggageAB .lightblue-btn{
                width: 270px;
                font-size: 17px;
                padding: 7px 35px 7px 15px;
                margin: 0 auto 5px;
            }
            #modalBaggageAB .lightblue-btn.rounded-primary-btn:after{
                font-size: 26px;
            }
            #modalBaggageAB .bottom-text-close a{
                font-size: 12px;
                line-height: 1;
                display: block;
                margin: 0;
            }
            #modalBaggageAB p {
                max-width: 100% !important;
            }

            @media (max-width: 568px) {
                .smart-fee .seat-count,
                #modalBaggageAB .font-SB b {
                    font-size: 12px !important;
                }

                #modalBaggageAB .modal-content .modal-header.text-left * {
                    font-size: 11px;
                }
            }
            `;
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');
            head.appendChild(style);
            style.type = 'text/css';
            if (style.styleSheet){

                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
        }

        function haveBaggage() {
          var ssr_to_check = ["BAGC", "BAGD", "BAGP", "LBGC", "LBGD", "LBGP"];
          var contieneSsr = false;

          for (var i = 0; i < bookingData.Passengers.length; i++) {
            var maletas = bookingData.Passengers[i].OutboundJourneySsrs;

            if (ssr_to_check.some(function(ssr) {
              return maletas.includes(ssr);
          })) {
              contieneSsr = true;
              break;
          }
      }

      return contieneSsr;
  }

  function esIda() {
    var fechaIda = bookingData.OutboundJourney.DepartureDate;
    var fechaViaje = new Date(fechaIda);
    var esIda = false;
    var hoy = new Date();

    if (fechaViaje.getTime() > hoy.getTime()) {
        esIda = true;
    }
    return esIda;
}

function checkinON() {
  var element = document.querySelector('[data-test-id="checkin-button"]');
  var buttonText = element.textContent.trim();
  if (!element.classList.contains('disabled') && buttonText !== 'Tarjeta de embarque') {
    return true;
} else {
    return false;
}
}

function isCulture() {
    if (culture === 'es-CL' || culture === 'es-AR' || culture === 'es-PE') {
        return true;
    } else {
        return false;
    }
}

function verificacion() {
    if (!haveBaggage() && esIda() && checkinON() && isCulture() && bookingData.ReturnJourney !== null) {
        return true;
    } else {
        return false;
    }
}

if (verificacion()) {
    addCSSModal();
    addModal();
}
}, 600);