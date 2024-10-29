var initNoQuieroSeguro = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/extras') return;
  clearInterval(initNoQuieroSeguro);

  var culture = bookingData.Culture;

  function addCSS() {
    var css = `
    .modal-content button[data-test-id="insurance-modal-close-button"] {
      display: none;
    }

    .extras-insurance-covid-modal .modal-content .rounded-primary-btn {
      margin: 10px auto;
    }

    .modal-content .no-quiero-container {
      display: flex;
      justify-content: center;
    }

    .modal-content .no-quiero-text {
      display: inline-block;
      margin-bottom: 10px;
      color: #75787b;
      text-decoration: underline;
      cursor: pointer;
      text-align: center;
    }

    .modal-content .no-quiero-text:hover {
      text-decoration: underline;
      color: #b2292e;
    }
    `;

    var style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));

    var head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(style);
  }

  function addNoQuieroText() {

    if(document.querySelector('.modal.extras-insurance-covid-modal')){
      var modalBody = document.querySelector('.modal-content .modal-body');
      if(!document.querySelector('.no-quiero-container')){
        var noQuieroContainer = document.createElement('div');
        noQuieroContainer.className = 'no-quiero-container';

        var noQuieroText = document.createElement('span');
        noQuieroText.className = 'no-quiero-text';

        switch (culture) {
        case 'pt-BR':
          noQuieroText.textContent = 'Não quero';
          break;
        case 'en-US':
          noQuieroText.textContent = 'No quiero';
          break;
        default:
          noQuieroText.textContent = 'No quiero';
          break;
        }
        noQuieroText.addEventListener('click', function() {
          var closeButton = document.querySelector('.modal-content button[data-test-id="insurance-modal-close-button"]');
          closeButton.click();
        });
        noQuieroContainer.appendChild(noQuieroText);
        modalBody.appendChild(noQuieroContainer);
      }  
    }
  }

  function allFunctions() {
    addCSS();
    addNoQuieroText(); 
  }

  function continueClick() {
    var button = document.querySelector('[data-test-id="extras-submit-button"]');
    if(button){
      button.addEventListener('click', allFunctions);
    }
  }

  continueClick();

}, 600);