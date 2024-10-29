var initCSSBundles = setInterval(function() {
  if (typeof bookingData === "undefined" || typeof window.eventBus === "undefined" || window.location.pathname !== '/V2/Flight') return;
  clearInterval(initCSSBundles);

  //OPACA VUELA LIGERO CON GRISES Y DESTACA FULL+CAMBIO DE TAMAÑO LETRAS Y PRECIOS+CAMBIO TAMAÑO BUNDLE//
  var culture = bookingData.Culture;

  function addCSS() {
    var css = `
      /* AJUSTES GENERALES */

      .bundle-price {
        font-size: 24px;
      }
      .bundle-non-discounted-price {
        font-size: 21px;
      }
      .bundle-per-person-info {
        font-size: 17px;
      }
      .bundle-footer {
        padding-bottom: 20px;
      }
      .bundles-container {
        align-items: center;
      }
      
      /* VUELA LIGERO */

      .bundle-price[data-test-id="bundle-price--j|0-c|none"], .bundle-price[data-test-id="bundle-price--j|1-c|none"] {
        color: #757575;
      }
      .bundle-per-person-info[data-test-id="bundle-price-info--j|0-c|none"], .bundle-per-person-info[data-test-id="bundle-price-info--j|1-c|none"] {
        color: #757575;
      }
      [data-test-id="bundle-selector-option--j|0-c|none"] .bundle-savings-container, [data-test-id="bundle-selector-option--j|1-c|none"] .bundle-savings-container {
        height: auto; /* AJUSTA TAMAÑO DEL BUNDLE */
        margin: 0; /* AJUSTA TAMAÑO DEL BUNDLE */
      }
      .bundle-button[data-test-value="BND0"], .bundle-button[data-test-value="BNC0"] {
        border-color: #757575;
        color: #757575;
      }
      .bundle-button[data-test-value="BND0"] i, .bundle-button[data-test-value="BNC0"] i {
        border: 1px solid #757575;
      }
      .bundle-content .bundle-header .bundle-price.no-bundle {
        color: #757575; /* GRIS TEXTO PRECIO MOBILE */
      }
      
      /* VUELA SMART */
      
      /* VUELA FULL */
      
      [data-test-id="bundle-selector-option--j|0-c|full"] .bundle-savings-container, [data-test-id="bundle-selector-option--j|1-c|full"] .bundle-savings-container {
        margin: 35px auto; /* AJUSTA TAMAÑO DEL BUNDLE */
      }
      .bundle-button[data-test-value="BND2"], .bundle-button[data-test-value="BNC2"] {
        color: #ffffff;
        background-color: #1c355e;
      }
      .bundle-button[data-test-value="BND2"]:hover, .bundle-button[data-test-value="BNC2"]:hover {
        color: #1c355e;
        background-color: #ffffff;
      }
      .bundle-button[data-test-value="BND2"] i, .bundle-button[data-test-value="BNC2"] i {
        color: #fff;
        border-color: #fff;
      }
      .bundle-button[data-test-value="BND2"]:not(disabled):hover i, .bundle-button[data-test-value="BNC2"]:not(disabled):hover i {
        color: #1c355e;
        border-color: #1c355e;
      }
      
      /* ESCONDE MENSAJE FOOTER DC */
      .bundles-footer {
        display: none;
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

    head.appendChild(style);
  }

  function changeImageVueloLigero() {
    // Seleccionar los elementos que necesitan cambiar de imagen
    document.querySelectorAll('[data-test-id="bundle-header--j|0-c|none"], [data-test-id="bundle-header--j|1-c|none"], [data-test-id="bundle-selected-header--j|0-c|None"], [data-test-id="bundle-selected-header--j|1-c|None"], [data-test-id="bundle-selector-option--j|0-c|none"], [data-test-id="bundle-selector-option--j|1-c|none"], [data-test-id="bundle-selected-container--j|0-m|1"], [data-test-id="bundle-selected-container--j|1-m|1"]').forEach(function(element) {
      // Determinar la cultura y asignar la URL de la imagen correspondiente
      switch (bookingData.Culture) {
        case "en-US":
          new_src = "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/2e0193db-7c0b-4b44-8e9a-9d9a7bbfbe56/noBundle_en.png";
          break;
        case "pt-BR":
          new_src = "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/58375bc2-5388-4894-a129-b56f568cf708/noBundle_pt.png";
          break;
        default:
          new_src = "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/eac5fc9d-7469-43ef-b38d-67faa8c5d568/noBundle.png";
          break;
      }
      // Cambiar la URL de la imagen para el elemento actual
      element.querySelector('img').src = new_src;
    });
  }

  function clickButtons() {
    var smartFeeButtons = document.querySelectorAll('.smart-fee.nowrap.big, .discount-fee.nowrap.small, .smart-fee.nowrap.small, .discount-fee.nowrap.big');
    var buttonClickHandler = function() {
      changeImageVueloLigero();
    };
    smartFeeButtons.forEach(function(button) {
      button.addEventListener('click', buttonClickHandler);
    });
  }

  addCSS();

  if (culture) {
    changeImageVueloLigero();
    window.eventBus.subscribe({
      name: "SidebarReloaded",
      callback: function(e) {
        clickButtons();
      }
    });
  }

}, 400);