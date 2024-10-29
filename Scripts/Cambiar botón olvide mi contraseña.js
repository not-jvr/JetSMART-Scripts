var initContrasena = setInterval(function () {
  if (window.location.pathname.toLowerCase() !== '/v2/login' || typeof JetSmart === "undefined") return;
  clearInterval(initContrasena);

  var culture =  JetSmart.AppContext.culture;

  function addCSS() {
    var css = `
    .custom-forgot-password {
      background-color: transparent;
      border: none;
      padding: 17px;
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
    head.appendChild(style);
    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  function changeButton() {
    if(!document.querySelector('.custom-forgot-password') && document.querySelector('a[href="/V2/ForgotPassword"]')){
      var loginButtonContainer = document.querySelector('.login-button-container');
      var forgotPasswordButton = loginButtonContainer.querySelector('a[href="/V2/ForgotPassword"]');

      forgotPasswordButton.className = 'custom-forgot-password';

      var forgotPasswordContainer = document.createElement('div');
      forgotPasswordContainer.className = 'custom-forgot-password-container';

      forgotPasswordContainer.appendChild(forgotPasswordButton);

      loginButtonContainer.insertAdjacentElement('afterend', forgotPasswordContainer);

    }
  }

  function clickPantalla() {
    document.querySelector('ac-login-page').addEventListener('click', function() {
      changeButton();
    });
  }

  if (document.querySelector('a[href="/V2/ForgotPassword"]')) {
    addCSS();
    changeButton();
    clickPantalla();
  }
  
}, 600);