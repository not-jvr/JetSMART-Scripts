var bundlesMoreSimpleV3 = setInterval(function() {
  if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
  clearInterval(bundlesMoreSimpleV3);

  var culture = bookingData.Culture;
  var bancoEstado = JetSmart.AppContext.bancoEstadoCategory;
  var staff = JetSmart.AppContext.isStaff;

  function addCSS() {
    var css = `
      /* AJUSTES GENERALES */

    .bundle-price {
      font-size: 24px;
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

      /* VUELA FULL */

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

    /* ESCONDE TITULO 
    .bundles-header {
      display: none;
    }
    */

    /* ESCONDE TRAMO X PASAJERO */
    .bundle-per-person-info {
      display: none;
    }

    /* ESCONDE MENSAJE FOOTER DC */
    .bundles-footer {
      display: none;
    }

    /* ESCONDE ESPACIO VACIO ARRIBA DEL PRECIO */
    .bundle-savings-container {
      display: none;
    }

    /* ESCONDE EL MOSTRAR MAS BENEFICIOS EN MOBILE, Q NO SIRVE DE NADA */
    .extra-line-container {
      display: none !important;
    }

    /* ESCONDE EL MEJOR PRECIO PACK FULL */
    .best-price-label {
      display: none;
    }

    .bundle-header.full .header-img {
      position: relative;
      top: 0;
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
    document.querySelectorAll('[data-test-id="bundle-header--j|0-c|none"], [data-test-id="bundle-header--j|1-c|none"], [data-test-id="bundle-selected-header--j|0-c|None"], [data-test-id="bundle-selected-header--j|1-c|None"], [data-test-id="bundle-selector-option--j|0-c|none"], [data-test-id="bundle-selector-option--j|1-c|none"]').forEach(function(element) {
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
      element.querySelector('img').src = new_src;
    });
  }

  function hideExtras(){
    if (bancoEstado < 1) {
      var elements = document.querySelectorAll('[data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|FLXB"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|LBGC|LBGD|LBGC|LBAG|BAGC|BAGD"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|PBOA|PBA|PBD|PBP"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|SOMESEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|ALLSEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|APCH|APCA|APCD|APCP"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|simple|ALLSEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|simple|APCH|APCA|APCD|APCP"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|FLXB"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|LBGC|LBGD|LBGC|LBAG|BAGC|BAGD"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|PBOA|PBA|PBD|PBP"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|SOMESEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|ALLSEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|APCH|APCA|APCD|APCP"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|simple|ALLSEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|simple|APCH|APCA|APCD|APCP"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|LBGC|LBGD|LBGC|LBAG|LBG1|LBG2|BAGC|BAGD|BAG1|BAG2"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|LBGC|LBGD|LBGC|LBAG|LBG1|LBG2|BAGC|BAGD|BAG1|BAG2"]');
      elements.forEach(function (element) {
        if(element){
          element.style.visibility = 'hidden';
        }
      });
    } else if (bancoEstado >= 1) {
      console.log("chao")
      var elementos = document.querySelectorAll('[data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|FLXB"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|LBGC|LBGD|LBGC|LBAG|LBG1|LBG2|BAGC|BAGD|BAG1|BAG2"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|SOMESEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|ALLSEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|APCH|APCA|APCD|APCP"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|simple|SOMESEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|simple|ALLSEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|FLXB"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|LBGC|LBGD|LBGC|LBAG|LBG1|LBG2|BAGC|BAGD|BAG1|BAG2"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|SOMESEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|ALLSEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|APCH|APCA|APCD|APCP"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|simple|SOMESEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|simple|ALLSEATS"]');
      elementos.forEach(function(elemento) {
        elemento.style.visibility = 'hidden';
      });
      extrasBE();
    }
  }

  function reorderListItems(ulSelector) {
    var ulList = document.querySelectorAll(ulSelector);

    ulList.forEach(ul => {
      var visibleItems = [];
      var hiddenItems = [];

      ul.querySelectorAll('li').forEach(li => {
        if (li.style.visibility === 'hidden') {
          hiddenItems.push(li);
        } else {
          visibleItems.push(li);
        }
      });

      var newList = document.createElement('ul');

      visibleItems.forEach(item => newList.appendChild(item));

      hiddenItems.forEach(item => newList.appendChild(item));

      ul.parentNode.replaceChild(newList, ul);
    });
  }

  function changeIcon(selector) {
    var liElements = document.querySelectorAll(selector);

    liElements.forEach(function(liElement) {
      var iElements = liElement.querySelectorAll('i');

      iElements.forEach(function(iElement) {
        if (iElement.classList.contains('js-icon-bundle') && iElement.classList.contains('js-bundle-circle-x-full')) {
          iElement.classList.remove('js-icon-bundle', 'js-bundle-circle-x-full');
          iElement.classList.add('js-icon', 'js-flight-tick');
          iElement.setAttribute('data-test-id', 'bundle-ssr-tick--j|0-i|4');
        }
      });
    });
  }

  function extrasBE() {
    reorderListItems('ul[data-test-id="bundle-ssrs--j|0-c|none"]');
    reorderListItems('ul[data-test-id="bundle-ssrs--j|1-c|none"]');
    reorderListItems('ul[data-test-id="bundle-ssrs--j|0-c|simple"]');
    reorderListItems('ul[data-test-id="bundle-ssrs--j|1-c|simple"]');
    changeIcon('li[data-test-id="bundle-ssr-item--j|0-c|none|PBOA|PBA|PBD|PBP"]');
    changeIcon('li[data-test-id="bundle-ssr-item--j|1-c|none|PBOA|PBA|PBD|PBP"]');
    changeIcon('li[data-test-id="bundle-ssr-item--j|0-c|simple|APCH|APCA|APCD|APCP"]');
    changeIcon('li[data-test-id="bundle-ssr-item--j|1-c|simple|APCH|APCA|APCD|APCP"]');
  }

  function clickButtons() {
    var smartFeeButtons = document.querySelectorAll('[data-test-id*="flight-smart-fee"], [data-test-id*="flight-club-fee"]');
    var buttonClickHandler = function() {
      allFunctions();
    };
    smartFeeButtons.forEach(function(button) {
      button.addEventListener('click', buttonClickHandler);
    });
  }

  function allFunctions() {
    changeImageVueloLigero();
    hideExtras();
  }

  if (culture && bancoEstado < 1 && staff === 'False') {
    console.log("gola")
    addCSS();
    allFunctions();
    window.eventBus.subscribe({
      name: "bundlesMoreSimpleV2",
      callback: function(e) {
        allFunctions();
        clickButtons();
      }
    });
  }

}, 600);