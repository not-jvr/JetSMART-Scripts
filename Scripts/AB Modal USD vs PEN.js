var intmodalUSDvsPEN = setInterval(function(){
  if(typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
  clearInterval(intmodalUSDvsPEN);
  var culture = bookingData.Culture;

  function closeModal() {
    var modal = document.querySelector('#modalUSDvsPEN');
    modal.style.display = 'none';
  }

  function handleButtonClick(value) {
    var modal = document.getElementById('modalUSDvsPEN');
    var currencySelect = document.querySelector('[data-test-id="sidebar-currency-switch"]');
    var event = new Event('change');

    modal.style.display = 'none';
    currencySelect.value = value;
    currencySelect.dispatchEvent(event);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'modalUsdvsPENContinue'
    });
  }

  function createmodalUSDvsPEN(){
    if(!document.querySelector('#modalUSDvsPEN')){
      var text_header = '¿En qué moneda te<br>gustaría cotizar<br>tu vuelo?';        
      var text_button = 'S/ PEN';
      var text_button2 = '$ USD';
      var modalUSDvsPEN = `<usdvspen-modal>
      <div id="modalUSDvsPEN" class="modal i2-itinerary-section" style="display: block;">
      <div class="modal-content booking-modal-content">
      <div class="header-cont-custom">
      <img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/7ec0edb7-0a86-48f2-bfd1-13cb3ab6891f/MODAL%20US%20VS%20PEN.png" class="background">
      <div class="modal-header text-left">
      <div>
      <div class="font-SB">
      ${text_header}
      </div>
      </div>
      <button id="close-modal">×</button>
      </div>
      </div>
      <div class="modal-body text-center">
      <div class="modal-button-container modification-buttons-container">
      <button id="clickButton" class="rounded-primary-btn first-btn" >
      ${text_button}
      </button>
      <button id="clickButton2" class="rounded-primary-btn second-btn" >
      ${text_button2}
      </button>
      </div>            
      </div>
      </div>
      </div>
      </usdvspen-modal>`;

      var footer = document.querySelector('body > app > footer');
      footer.insertAdjacentHTML('afterend', modalUSDvsPEN);
      var css = `
      #modalUSDvsPEN .header-cont-custom {
        position: relative;
      }

      #modalUSDvsPEN .background {
        margin-top: -10%;
        max-width: 100%;
      }

      #modalUSDvsPEN .rounded-primary-btn {
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

      #modalUSDvsPEN .modal-content {
        padding: 0;
      }

      #modalUSDvsPEN .modal-content .modal-header.text-left {
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

      #modalUSDvsPEN .modal-content .modal-header.text-left * {
        color: #ffffff;
      }

      #modalUSDvsPEN .modal-content .modal-header button {
        top: 37px;
        right: 15px;
        color: #ffffff;
        border: 3px solid #ffffff;
        border-radius: 20px;
        padding: 1px 6px;
        font-size: 29px;
        position: absolute;
        transform: translateY(-50%);
        background: transparent;
        cursor: pointer;
        font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
        line-height: 1;
      }

      #modalUSDvsPEN .modal-body {
        padding: 1.5rem;
      }

      #modalUSDvsPEN .modal-body p {
        font-family: 'ClanOT-News', "Lato Medium";
        font-size: 18px;
        color: #1C355E;
        max-width: 80%;
        margin: 0 auto;
        line-height: 1.4;
      }

      #modalUSDvsPEN .font-bold {
        font-family: "ClanOT-Bold", "Lato";
        font-weight: 700;
      }

      #modalUSDvsPEN .logo {
        width: 40vw;
        max-width: max-content;
      }

      #modalUSDvsPEN .modal-button-container.modification-buttons-container {
        margin-top: 20px;
      }

      #modalUSDvsPEN .first-btn {
        margin: 0 auto 15px;
        margin-right: 3%;
        margin-left: 3%;
        background-color: rgb(185, 34, 52);
        border-color: rgb(185, 34, 52);
        width: 80%;
      }

      #modalUSDvsPEN .first-btn:hover {
        color: rgb(185, 34, 52);
        background-color: rgb(255, 255, 255);
      }

      #modalUSDvsPEN .second-btn {
        margin: 0 auto 15px;
        margin-right: 3%;
        margin-left: 3%;
        background-color: rgb(185, 34, 52);
        border-color: rgb(185, 34, 52);
        width: 80%;
      }

      #modalUSDvsPEN .second-btn:hover {
        color: rgb(185, 34, 52);
        background-color: rgba(255, 255, 255);
      }

      #modalUSDvsPEN .rounded-primary-btn:not(.disabled):hover:after {
        font-weight: 100;
      }

      #modalUSDvsPEN .font-SB {
        position : relative;
        width : 291.969px;
        height : 46.7812px;
      }


      #modalUSDvsPEN .font-B {
        font-size: 38px;
      }

      #modalUSDvsPEN .btnNo {
        color: #B3B3B3;
        cursor: pointer;
      }

      #modalUSDvsPEN .terms {
        margin-top: 20px;
        color: #B3B3B3;
        text-align: left;
        font-size: 14px;
      }

      #modalUSDvsPEN.modal {
        z-index: 105000;
      }

      @media (max-width: 768px) {
        #modalUSDvsPEN .modal-content .modal-header.text-left {
          max-height: none;
        }
      }

      @media (max-width: 568px) {
        #modalUSDvsPEN #close-modal {
          top: 19px;
          right: 4px;
          padding: 0 5px;
          font-size: 20px;
          line-height: 1.1;
        }

        #modalUSDvsPEN p {
          max-width: 100% !important;
        }
      }

      @media (max-width: 459px) {
        #modalUSDvsPEN .modal-content .modal-header.text-left {
          max-height: none;
          padding: 10px;
        }

        #modalUSDvsPEN .font-SB {
          font-size: 16px;
        }

        #modalUSDvsPEN .font-B {
          font-size: 24px;
        }
      }
      `;

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (style.styleSheet){
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));  
      }

      head.appendChild(style);

      var buttonPEN = document.querySelector('#clickButton');
      var buttonUSD = document.querySelector('#clickButton2');
      var closeModalButton = document.querySelector('#close-modal');
      var currencySelect = document.querySelector('[data-test-id="sidebar-currency-switch"]');

      document.getElementById('clickButton').addEventListener('click', function() {
        handleButtonClick('PEN');
      });

      document.getElementById('clickButton2').addEventListener('click', function() {
        handleButtonClick('USD');
      });

      closeModalButton.addEventListener('click', closeModal);
    }
  }

  if(culture === 'es-PE'){
    createmodalUSDvsPEN();
  }
  
}, 600);