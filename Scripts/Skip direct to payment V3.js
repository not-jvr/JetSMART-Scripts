var initSKIPButtonV3 = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/baggage') return;
  clearInterval(initSKIPButtonV3);

  var culture = bookingData.Culture;
  var roundTrip = bookingData.Roundtrip;

  function addCSS() {
    var css = `
    .modalSkipPayment {
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0,0,0,0.5);
    }

    .modalContent {
      border-radius: 10px;
      left: 50%;
      position: fixed;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .modalContent img {
      max-width: 70% !important;
      width: auto;
      height: auto;
    }

    .customButton {
      background-color: #ffff;
      border: 2px solid #ffff;
      border-color: #ffff;
      border-radius: 9999px;
      color: #00abc8;
      cursor: pointer;
      font-size: 1vw;
      font-weight: 700;
      line-height: 1;
      min-width: 10vw;
      padding: 0.5vw 1vw;
    }

    .customButton:hover {
      color: #ffff;
      background-color: #00abc8;
    }

    .modalButton {
      position: absolute;
      bottom: 13%;
      left: 35%;
      transform: translateX(-50%);
    }

    .modalButton2 {
      position: absolute;
      bottom: 7%;
      left: 35%;
      transform: translateX(-50%);
    }

    .customButton2 {
      color: #ffff;
      cursor: pointer;
      font-size: 0.8vw;
      padding: 0.5vw 1vw;
      font-weight: 700;
    }

    .customButton2:hover {
      text-decoration: underline;
    }

    .closeButtonSkip {
      position: absolute;
      top: -2%;
      right: 29%;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      font-size: 24px;
      background-color: #b92234;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: white;
      z-index: 1001;
    }

    .closeButtonSkip:hover {
      background-color: #ffff;
      color: #b92234;
    }

    #packSmart {
      color: #17386c;
    }

    #packSmart:hover {
      background-color: #17386c;
      color: #ffff;
    }
    `;
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    head.appendChild(style);
    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  function addModalSMART() {
    if (!document.querySelector('#myModalSkip')) { 
      var modalLink;
      var buttonSkip;
      var noSkipText;

      switch (culture) {
      case 'en-US':
        modalLink = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/c1086bf5-94ac-4a2c-a537-901834307851/Modal%20Pack%20SMART%20EN-US.png';
        buttonSkip = 'Go straight to PAY';
        noSkipText = 'Add more extras to my booking';
        break;
      case 'pt-BR':
        modalLink = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/a23d845e-7afe-40ce-af8a-a15099be1872/Modal%20Pack%20SMART%20PT-BR.png';
        buttonSkip = 'Ir direto para PAGAR';
        noSkipText = 'Adicionar mais extras à minha reserva';
        break;
      default:
        modalLink = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/4743e6a8-4f94-4350-a37e-3a8d3e80a1d0/Modal%20Pack%20SMART.png';
        buttonSkip = 'Ir directo a PAGAR';
        noSkipText = 'Añadir más extras a mi reserva';
        break;
      }

      var modalTemplate = `
      <div id="myModalSkip" class="modalSkipPayment">
      <div class="modalContent">
      <img src="${modalLink}" alt="Modal Image">
      <div class="closeButtonSkip">&times;</div> <!-- Botón X -->
      <div class="modalButton">
      <div class="customButton">${buttonSkip}</div>
      </div>
      <div class="modalButton2">
      <div class="customButton2">${noSkipText}</div>
      </div>
      </div>
      </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalTemplate);

      var skipButton = document.querySelector('.customButton');
      skipButton.addEventListener('click', function() {
        var modal = document.querySelector('#myModalSkip');
        modal.style.display = 'none';
        window.location.href = 'https://booking.jetsmart.com/V2/Payment';
      });

      var noSkip = document.querySelector('.customButton2');
      noSkip.addEventListener('click', function() {
        var modal = document.querySelector('#myModalSkip');
        modal.remove();
      });

      var closeButton = document.querySelector('.closeButtonSkip');
      closeButton.addEventListener('click', function () {
        var modal = document.querySelector('#myModalSkip');
        modal.remove();
      });
    } 
  }

  function addModalFULL() {
    if (!document.querySelector('#myModalSkip')) { 
      var modalLink;
      var buttonSkip;
      var noSkipText;

      switch (culture) {
      case 'en-US':
        modalLink = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/eaf19e8c-590f-41b3-b0bf-977b73561f3b/Modal%20Pack%20FULL%20EN-US.png';
        buttonSkip = 'Go straight to PAY';
        noSkipText = 'Add more extras to my booking';
        break;
      case 'pt-BR':
        modalLink = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/e1dfa1f0-7f27-4200-af32-3f77c573ebc8/Modal%20Pack%20FULLPT-BR.png';
        buttonSkip = 'Ir direto para PAGAR';
        noSkipText = 'Adicionar mais extras à minha reserva';
        break;
      default:
        modalLink = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/0062817f-2bf8-4b9a-855b-54411b7666e1/Modal%20Pack%20FULL.png';
        buttonSkip = 'Ir directo a PAGAR';
        noSkipText = 'Añadir más extras a mi reserva';
        break;
      }

      var modalTemplate = `
      <div id="myModalSkip" class="modalSkipPayment">
      <div class="modalContent">
      <img src="${modalLink}" alt="Modal Image">
      <div class="closeButtonSkip">&times;</div> <!-- Botón X -->
      <div class="modalButton">
      <div class="customButton" id="packSmart">${buttonSkip}</div>
      </div>
      <div class="modalButton2">
      <div class="customButton2">${noSkipText}</div>
      </div>
      </div>
      </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalTemplate);

      var skipButton = document.querySelector('.customButton');
      skipButton.addEventListener('click', function() {
        var modal = document.querySelector('#myModalSkip');
        modal.style.display = 'none';
        window.location.href = 'https://booking.jetsmart.com/V2/Payment';
      });

      var noSkip = document.querySelector('.customButton2');
      noSkip.addEventListener('click', function() {
        var modal = document.querySelector('#myModalSkip');
        modal.remove();
      });

      var closeButton = document.querySelector('.closeButtonSkip');
      closeButton.addEventListener('click', function () {
        var modal = document.querySelector('#myModalSkip');
        modal.remove();
      });
    } 
  }

  function addModal() {
    var outboundBundle = bookingData.OutboundBundleCode;
    var returnBundle = bookingData.ReturnBundleCode;

    if (roundTrip === true) {
      if (outboundBundle && returnBundle && outboundBundle === 'BND2' && returnBundle === 'BND2') {
        addModalFULL();
      } else if (outboundBundle && returnBundle && outboundBundle === 'BND1' && returnBundle === 'BND1') {
        addModalSMART();
      }
    } else if (roundTrip === false || roundTrip === null) {
      if (outboundBundle && outboundBundle === 'BND2') {
        addModalFULL();
      } else if (outboundBundle && outboundBundle === 'BND1') {
        console.log("aa")
        addModalSMART();
      }
    }
 }

 addCSS();
 addModal();

}, 600);