var initChangeForgotPassword = setInterval(function () {
  if (typeof JetSmart.AppContext === "undefined" || typeof bookingData === "undefined" || (window.location.pathname !== '/V2/Flight' && window.location.pathname !== '/V2/Passengers' && window.location.pathname !== '/V2/Baggage' && window.location.pathname !== '/Seat/Map' && window.location.pathname !== '/V2/Extras')) return;
  clearInterval(initChangeForgotPassword);

  var loggedIn = JetSmart.AppContext.isLoggedIn;

  function clickLogin(){
    var loginMobile = document.querySelector('.mobile-anonymus-btn-template.pointer-squash [data-test-id="login-button-container"]');
    if (loginMobile) {
      loginMobile.addEventListener('click', function () {
        changeForgotPasswordButton();
      });
    }
    var loginDesktop = document.querySelector('.desktop-anonymus-btn-template [data-test-id="login-button-container"]');
    if (loginDesktop) {
      loginDesktop.addEventListener('click', function () {
        changeForgotPasswordButton();
      });
    }
  }

  function changeForgotPasswordButton(){

    var forgotPasswordButton = document.querySelector('[data-test-id="login-modal-forgot-password-button"]');

    if(forgotPasswordButton){
      forgotPasswordButton.className = 'custom-forgot-password';
      var forgotPasswordContainer = document.createElement('div');

      forgotPasswordContainer.className = 'custom-forgot-password-container';
      forgotPasswordContainer.appendChild(forgotPasswordButton);

      var loginButtonContainer = document.querySelector('[data-test-id="login-modal-submit-button"]').parentNode;
      loginButtonContainer.insertAdjacentElement('afterend', forgotPasswordContainer);

      var css = `
      .custom-forgot-password {
        background-color: transparent;
        border: none;
        margin-right: 17px;
        color: #163a70;
      }
      .custom-forgot-password:hover {
        color: #b2292e;
      }
      .custom-forgot-password-container {
        text-align: right;
        margin-top: 10px;
      }
      @media (max-width: 767px) {
        .custom-forgot-password-container {
          text-align: center;
        }
      }
      `;

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';
      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
      head.appendChild(style);
    }
  }

  if(loggedIn === 'False'){
    clickLogin();
  }

}, 600);