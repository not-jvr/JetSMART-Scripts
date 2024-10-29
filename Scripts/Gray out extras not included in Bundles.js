var initGreyNoExtras = setInterval(function() {
  if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
  clearInterval(initGreyNoExtras);

  var postB = bookingData.PostBooking;
  var culture = bookingData.Culture;
  var staff = bookingData.Role;

  function addCSS() {
    var css = `
    .bundle-ssr-items .js-bundle-circle-x-full , .bundle-ssr-items [data-test-value="0"], .bundle-ssr-items [data-test-value="0"] .js-icon-bundle, .bundle-ssr-items [data-test-value="0"] .js-icon, [data-test-id="bundle-ssr-item--j|0-c|none|FLXB"] [data-test-id="bundle-ssr-item-name--j|0-c|none|FLXB"] span, [data-test-id="bundle-ssr-item--j|1-c|none|FLXB"] [data-test-id="bundle-ssr-item-name--j|1-c|none|FLXB"] span {
      color: #E0E0E0 !important;
    }

    .bundle-ssr-items [data-test-value="0"] .allseats-extra {
      background-color: #E0E0E0 !important;
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

  function noHideExtras(){
    if (!isBE()) {
      var elements = document.querySelectorAll('[data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|FLXB"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|LBGC|LBGD|LBGC|LBAG|BAGC|BAGD"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|PBOA|PBA|PBD|PBP"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|SOMESEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|ALLSEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|APCH|APCA|APCD|APCP"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|simple|ALLSEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|simple|APCH|APCA|APCD|APCP"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|FLXB"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|LBGC|LBGD|LBGC|LBAG|BAGC|BAGD"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|PBOA|PBA|PBD|PBP"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|SOMESEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|ALLSEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|APCH|APCA|APCD|APCP"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|simple|ALLSEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|simple|APCH|APCA|APCD|APCP"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|LBGC|LBGD|LBGC|LBAG|LBG1|LBG2|BAGC|BAGD|BAG1|BAG2"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|LBGC|LBGD|LBGC|LBAG|LBG1|LBG2|BAGC|BAGD|BAG1|BAG2"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|APCH|APCA|APCD|APCP|APCF"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|simple|APCH|APCA|APCD|APCP|APCF"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|APCH|APCA|APCD|APCP|APCF"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|simple|APCH|APCA|APCD|APCP|APCF"]');
      elements.forEach(function (element) {
        if(element){
          element.style.visibility = 'unset';
        }
      });
    } else if (isBE()) {
      console.log("chao")
      var elementos = document.querySelectorAll('[data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|FLXB"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|LBGC|LBGD|LBGC|LBAG|LBG1|LBG2|BAGC|BAGD|BAG1|BAG2"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|SOMESEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|ALLSEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|APCH|APCA|APCD|APCP"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|simple|SOMESEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|simple|ALLSEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|FLXB"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|LBGC|LBGD|LBGC|LBAG|LBG1|LBG2|BAGC|BAGD|BAG1|BAG2"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|SOMESEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|ALLSEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|APCH|APCA|APCD|APCP"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|simple|SOMESEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|simple|ALLSEATS"]');
      elementos.forEach(function(elemento) {
        elemento.style.visibility = 'unset';
      });
    }
  }

  function clickButtons() {
    var smartFeeButtons = document.querySelectorAll('[data-test-id*="flight-smart-fee"], [data-test-id*="flight-club-fee"]');
    var buttonClickHandler = function() {
      noHideExtras();
    };
    smartFeeButtons.forEach(function(button) {
      button.addEventListener('click', buttonClickHandler);
    });
  }

  function isBE() {
    return Array.isArray(bookingData.AgentProgramDetails) &&
    bookingData.AgentProgramDetails.length > 0 &&
    bookingData.AgentProgramDetails[0]?.ProgramCode === 'BEC'
  }

  if (culture && staff !== 'WWW Staff Travel' && postB === false && !isBE()) {
    addCSS();
    noHideExtras();
    clickButtons();
    window.eventBus.subscribe({
      name: "bundlesMoreSimpleV2",
      callback: function(e) {
        noHideExtras();
        clickButtons();
      }
    });
  }

}, 600);