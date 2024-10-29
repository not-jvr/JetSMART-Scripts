var newBundlesAA = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
  clearInterval(newBundlesAA);

  var postB = bookingData.PostBooking;
  var culture = bookingData.Culture;
  var staff = bookingData.Role;

  function addCSS() {
    var css = `
    .bundle-ssr-items .js-bundle-circle-x-full , .bundle-ssr-items [data-test-value="0"], .bundle-ssr-items [data-test-value="0"] .js-icon-bundle, .bundle-ssr-items [data-test-value="0"] .js-icon, [data-test-id="bundle-ssr-item--j|0-c|none|FLXB"] [data-test-id="bundle-ssr-item-name--j|0-c|none|FLXB"] span, [data-test-id="bundle-ssr-item--j|1-c|none|FLXB"] [data-test-id="bundle-ssr-item-name--j|1-c|none|FLXB"] span {
      color: #E0E0E0 !important;
    }

    .bundle-ssr-items [data-test-value="0"] .allseats-extra {
      background-color: #fff !important;
      color: #E0E0E0 !important;
    }

    .js-flight-tick, .js-bundle-circle-x-full {
      display: none;
      }

    [data-test-value="1"] .ssr-line-name span.allseats-extra {
      color: #1c355e;
      background-color: #fff;
    }

    .extra-info {
      font-size: 11px;
      color: #1c355e;
      padding: 1px 5px;
      border: 1px solid #1c355e;
      border-radius: 5px;
      display: inline-block;
      background-color: #fff;
    }

    [data-test-id="bundle-ssr-item-name--j|1-c|simple|ACAA"] .extra-info, [data-test-id="bundle-ssr-item-name--j|0-c|simple|ACAA"] .extra-info {
      border: 1px solid #00abc8;
      background-color: #00abc8;
      color: #fff;
    }

    [data-test-id="bundle-ssr-item-name--j|1-c|full|ACAA"] .extra-info, [data-test-id="bundle-ssr-item-name--j|0-c|full|ACAA"] .extra-info {
      border: 1px solid #1c355e;
      background-color: #1c355e;
      color: #fff;
    }

    [data-test-value="0"] .bundle-tooltip {
      display: none !important;
    }

    @media (max-width: 767px) {
      .extra-info {
        font-size: 9px;
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

    head.appendChild(style);
  }

  function noHideExtras() {
    if (!isBE()) {
      var elements = document.querySelectorAll('[data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|FLXB"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|LBGC|LBGD|LBGC|LBAG|BAGC|BAGD"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|PBOA|PBA|PBD|PBP"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|SOMESEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|ALLSEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|APCH|APCA|APCD|APCP"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|simple|ALLSEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|simple|APCH|APCA|APCD|APCP"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|FLXB"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|LBGC|LBGD|LBGC|LBAG|BAGC|BAGD"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|PBOA|PBA|PBD|PBP"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|SOMESEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|ALLSEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|APCH|APCA|APCD|APCP"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|simple|ALLSEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|simple|APCH|APCA|APCD|APCP"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|LBGC|LBGD|LBGC|LBAG|LBG1|LBG2|BAGC|BAGD|BAG1|BAG2"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|LBGC|LBGD|LBGC|LBAG|LBG1|LBG2|BAGC|BAGD|BAG1|BAG2"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|APCH|APCA|APCD|APCP|APCF"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|simple|APCH|APCA|APCD|APCP|APCF"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|APCH|APCA|APCD|APCP|APCF"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|simple|APCH|APCA|APCD|APCP|APCF"]');
      elements.forEach(function (element) {
        if (element) {
          element.style.visibility = 'unset';
        }
      });
    } else if (isBE()) {
      console.log("chao")
      var elementos = document.querySelectorAll('[data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|FLXB"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|LBGC|LBGD|LBGC|LBAG|LBG1|LBG2|BAGC|BAGD|BAG1|BAG2"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|SOMESEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|ALLSEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|none|APCH|APCA|APCD|APCP"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|simple|SOMESEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|0-c|simple|ALLSEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|FLXB"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|LBGC|LBGD|LBGC|LBAG|LBG1|LBG2|BAGC|BAGD|BAG1|BAG2"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|SOMESEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|ALLSEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|none|APCH|APCA|APCD|APCP"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|simple|SOMESEATS"], [data-test-id*="bundle-selector--"] [data-test-id="bundle-ssr-item--j|1-c|simple|ALLSEATS"]');
      elementos.forEach(function (elemento) {
        elemento.style.visibility = 'unset';
      });
    }
  }

  function reNames() {
    var ssrLineNames = document.querySelectorAll('[data-test-id^="bundle-ssr-item-name--j|0-c|none|ACAA"], [data-test-id^="bundle-ssr-item-name--j|1-c|none|ACAA"], [data-test-id^="bundle-ssr-item-name--j|0-c|simple|ACAA"], [data-test-id^="bundle-ssr-item-name--j|1-c|simple|ACAA"], [data-test-id^="bundle-ssr-item-name--j|0-c|full|ACAA"], [data-test-id^="bundle-ssr-item-name--j|1-c|full|ACAA"]');

    var text1 = 'Millas AAdvantage<span class="relative font-body top-[-1px]">®</span> x2';
    var text2 = 'Millas AAdvantage<span class="relative font-body top-[-1px]">®</span> x5';
    var extraText = '<div class="extra-info">- Acumula 2 millas por dólar</div>';
    var extraText2 = '<div class="extra-info">- Acumula 5 millas por dólar</div>';

    switch (culture) {
      case 'en-US':
        text1 = 'AAdvantage<span class="relative font-body top-[-1px]">®</span> miles x2';
        text2 = 'AAdvantage<span class="relative font-body top-[-1px]">®</span> miles x5';
        extraText = '<div class="extra-info">- Earn 2 miles per US dollar</div>';
        extraText2 = '<div class="extra-info">- Earn 5 miles per US dollar</div>';
        break;
      case 'pt-BR':
        text1 = 'Milhas AAdvantage<span class="relative font-body top-[-1px]">®</span> x2';
        text2 = 'Milhas AAdvantage<span class="relative font-body top-[-1px]">®</span> x5';
        extraText = '<div class="extra-info">- Acumula 2 milhas por dólar</div>';
        extraText2 = '<div class="extra-info">- Acumula 5 milhas por dólar</div>';
        break;
    }

    ssrLineNames.forEach(element => {
      var dataTestId = element.getAttribute('data-test-id');

      if (dataTestId.includes('none')) {
        element.innerHTML = text1 + extraText;
      }
      else if (dataTestId.includes('simple') || dataTestId.includes('full')) {
        element.innerHTML = text2 + extraText2;
      }
    });
  }


  function clickButtons() {
    var smartFeeButtons = document.querySelectorAll('[data-test-id*="flight-smart-fee"], [data-test-id*="flight-club-fee"]');
    var buttonClickHandler = function () {
      noHideExtras();
    };
    smartFeeButtons.forEach(function (button) {
      button.addEventListener('click', buttonClickHandler);
    });
  }

  function isBE() {
    return Array.isArray(bookingData.AgentProgramDetails) &&
      bookingData.AgentProgramDetails.length > 0 &&
      bookingData.AgentProgramDetails[0]?.ProgramCode === 'BEC'
  }

  function allFunctions() {
    noHideExtras();
    clickButtons();
    reNames();
  }

  if (culture && staff !== 'WWW Staff Travel' && postB === false) {
    console.log("asdas")
    addCSS();
    allFunctions();
    window.eventBus.subscribe({
      name: "newBundleAA",
      callback: function (e) {
        console.log("newnew")
        allFunctions();
      }
    });
  }

}, 600);