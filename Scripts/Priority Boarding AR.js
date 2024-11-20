var IMP_PBAR = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Extras' || !document.querySelector('[data-test-id="extras-priority-boarding-container"]')) return;
  clearInterval(IMP_PBAR);

  var culture = bookingData.Culture;
  var RT = bookingData.Roundtrip;

  function addCSS1() {
    var css = `

    .aeropuertos-restriccion {
      text-align: center;
      padding: 10px 10px 0px 10px;
      color: #919191;
      font-size: 14px;
    }

    .booking-wrapper.extras-step.ts-priority-boarding.ts-error-container {
      position: relative;
    }
    .priority-boarding-img {
      position: absolute;
      top: 10px;
      right: 10px;
      height: auto;
      width: 150px;
    }

    .js-boarding-man.js-icon.title-icon {
      color: #163a70;
    }

    .priority-banner {
      background-color: #163a70;
      padding: 15px 10px 15px 10px;
      line-height: 1.3;
      color: #fff;
      margin-bottom: 25px;
    }

    .custom-background-priority-boarding {
      background-color: #163a70;
    }

    [data-test-id="extras-priority-boarding-container"] .row.hidden-xs .col-xs-1.col-sm-1-2.col-sm-offset-1-4 {
      background-color: #163a70;
      padding: 10px 20px 0px 20px;
      border-radius: 10px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    [data-test-id="extras-priority-boarding-container"] [data-test-id="extras-priority-boarding-journey--j|0"] {
      background-color: #163a70;
      padding: 0px 20px 20px 20px;
      border-radius: 10px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    [data-test-id="extras-priority-boarding-container"] .inner-border-box {
      background: none;
      border: none;
      margin: 0px 15px -15px;
    }

    [data-test-id="extras-priority-boarding-container"] .btn-boarding.select-dependent-text {
      display: flex;
      justify-content: center;
      cursor: pointer;
      --bg-opacity: 1;
      height: 30px;
      background-color: #b92234;
      --text-opacity: 1;
      color: #fff;
      position: relative;
      border-radius: 9999px;
      letter-spacing: 0;
      --border-opacity: 1;
      border-color: #fff;
      font-size: 16px;
      padding: 10px 35px 10px 15px;
      user-select: none;
      border: 2px solid #b92234;
      margin-right: 40%;
    }

    [data-test-id="extras-priority-boarding-container"] .btn-boarding.select-dependent-text:hover {
      background-color: #fff;
      color: #b92234;
    }

    [data-test-id="extras-priority-boarding-container"] .btn-boarding.select-dependent-text:after {
      position: absolute;
      font-weight: 400;
      top: 50%;
      transform: translateY(-50%);
      font-family: jetsmart-v2 !important;
      right: 5px;
      content: "\\E9BA";
      font-size: 20px;
    }

    [data-test-id="extras-priority-boarding-container"] .btn-boarding.selected {
      background-color: #fff;
      color: #b92234;
    }

    [data-test-id="extras-priority-boarding-container"] .btn-boarding.selected:hover {
      background-color: #b92234;
      color: #fff;
    }

    .new-titulo-priorityb {
      margin-bottom: 10px;
      color: #fff;
      text-align: center;
    }

    [data-test-id="extras-priority-boarding-container"] .inner-box.upper-half h3 {
      text-align: center;
    }

    [data-test-id="extras-priority-boarding-container"] .extras-binary-name {
      color: #163a70;
      margin-left: 25%;
    }



    [data-test-id="extras-priority-boarding-container"] .col-xs-1.col-sm-1-2.col-sm-offset-1-4 {
      margin-left: 15%;
      flex-basis: 70%;
      max-width: 70%;
    }

    @media (min-width: 768px) and (max-width: 999px) {

      [data-test-id="extras-priority-boarding-container"] .btn-boarding.select-dependent-text {

        margin-right: 5%;
      }
    }

    @media (min-width: 1000px) and (max-width: 1099px) {

      [data-test-id="extras-priority-boarding-container"] .btn-boarding.select-dependent-text {

        margin-right: -5%;
      }
    }

    @media (min-width: 1100px) and (max-width: 1350px) {

      [data-test-id="extras-priority-boarding-container"] .btn-boarding.select-dependent-text {

        margin-right: 15%;
      }
    }

    @media (min-width: 768px) {
      .new-titulo-priorityb-mobile {
        display: none;
      }
    }

    @media (max-width: 767px) {
      [data-test-id="extras-priority-boarding-container"] .col-xs-1.col-sm-1-2.col-sm-offset-1-4 {
        margin-left: 2%;
        flex-basis: 96%;
        max-width: 96%;
      }

      [data-test-id="extras-priority-boarding-container"].booking-wrapper {
        padding: 38px 25px 25px 25px;
      }

      [data-test-id="extras-priority-boarding-container"] .extras-binary-name {
        margin-left: 0;
      }

      [data-test-id="extras-priority-boarding-container"] .col-md-2-3.col-xs-2-3, [data-test-id="extras-priority-boarding-container"] .col-md-1-3.col-xs-1-3 {
        flex-basis: 50%;
        max-width: 50%;
      }

      [data-test-id="extras-priority-boarding-container"] .btn-boarding.select-dependent-text {
        margin-right: 0;
      }

      .new-titulo-priorityb-mobile {
        margin-bottom: 10px;
        color: #fff;
        text-align: center;
        background-color: #163a70;
        padding: 10px;
        margin-left: -1px;
        margin-right: -1px;
      }

      [data-test-id="extras-priority-boarding-container"] [data-test-id="extras-priority-boarding-journey--j|0"] {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
    }

    `;
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  function addCSS2() {

    var css = `

    .aeropuertos-restriccion {
      text-align: center;
      padding: 10px 10px 0px 10px;
      color: #919191;
      font-size: 14px;
    }

    ac-priority-boarding .col-md-2-3.col-xs-2-3, ac-priority-boarding .col-md-1-3.col-xs-1-3 {
      flex-basis: 50%;
      max-width: 50%;
    }

    .booking-wrapper.extras-step.ts-priority-boarding.ts-error-container {
      position: relative;
    }
    .priority-boarding-img {
      position: absolute;
      top: 10px;
      right: 10px;
      height: auto;
      width: 150px;
    }

    .js-boarding-man.js-icon.title-icon {
      color: #163a70;
    }

    .priority-banner {
      background-color: #163a70;
      padding: 15px 10px 15px 10px;
      line-height: 1.3;
      color: #fff;
      margin-bottom: 25px;
    }

    .custom-background-priority-boarding {
      background-color: #163a70;
    }

    [data-test-id="extras-priority-boarding-container"] .row.hidden-xs .col-xs-1.col-sm-1-2.col-sm-offset-1-4, [data-test-id="extras-priority-boarding-container"] .row.hidden-xs {
      background-color: #163a70;
      padding: 10px 12px 0px 12px;
      border-radius: 10px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    [data-test-id="extras-priority-boarding-container"] [data-test-id="extras-priority-boarding-journey--j|0"] {
      background-color: #163a70;
      padding: 0px 8px 20px 20px;
      border-radius: 10px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    [data-test-id="extras-priority-boarding-container"] [data-test-id="extras-priority-boarding-journey--j|1"] {
      background-color: #163a70;
      padding: 0px 20px 20px 8px;
      border-radius: 10px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-bottom-left-radius: 0;
    }

    [data-test-id="extras-priority-boarding-container"] .inner-border-box {
      background: none;
      border: none;
      margin: 0px 15px -15px;
    }

    [data-test-id="extras-priority-boarding-container"] .btn-boarding.select-dependent-text {
      display: flex;
      justify-content: center;
      cursor: pointer;
      --bg-opacity: 1;
      height: 30px;
      background-color: #b92234;
      --text-opacity: 1;
      color: #fff;
      position: relative;
      border-radius: 9999px;
      letter-spacing: 0;
      --border-opacity: 1;
      border-color: #fff;
      font-size: 16px;
      padding: 10px 35px 10px 15px;
      user-select: none;
      border: 2px solid #b92234;
      max-width: 80%;
    }

    [data-test-id="extras-priority-boarding-container"] .btn-boarding.select-dependent-text:hover {
      background-color: #fff;
      color: #b92234;
    }

    [data-test-id="extras-priority-boarding-container"] .btn-boarding.select-dependent-text:after {
      position: absolute;
      font-weight: 400;
      top: 50%;
      transform: translateY(-50%);
      font-family: jetsmart-v2 !important;
      right: 5px;
      content: "\\E9BA";
      font-size: 20px;
    }

    [data-test-id="extras-priority-boarding-container"] .btn-boarding.selected {
      background-color: #fff;
      color: #b92234;
    }

    [data-test-id="extras-priority-boarding-container"] .btn-boarding.selected:hover {
      background-color: #b92234;
      color: #fff;
    }

    .new-titulo-priorityb {
      margin: 0 auto 10px auto;
      color: #fff;
    }

    [data-test-id="extras-priority-boarding-container"] .inner-box.upper-half h3 {
      text-align: center;
    }

    [data-test-id="extras-priority-boarding-container"] .extras-binary-name {
      color: #163a70;
    }

    [data-test-id="extras-priority-boarding-container"] .col-xs-1.col-sm-1-2.col-sm-offset-1-4 {
      margin-left: 15%;
      flex-basis: 70%;
      max-width: 70%;
    }

    @media (min-width: 768px) and (max-width: 999px) {

      [data-test-id="extras-priority-boarding-container"] .btn-boarding.select-dependent-text {

        margin-right: 5%;
      }
    }

    @media (min-width: 1000px) and (max-width: 1099px) {

      [data-test-id="extras-priority-boarding-container"] .btn-boarding.select-dependent-text {

        margin-right: -5%;
      }
    }

    @media (min-width: 1100px) and (max-width: 1350px) {

      [data-test-id="extras-priority-boarding-container"] .btn-boarding.select-dependent-text {

        margin-right: 15%;
      }
    }

    @media (min-width: 768px) {
      .new-titulo-priorityb-mobile {
        display: none;
      }
    }

    @media (max-width: 767px) {
      [data-test-id="extras-priority-boarding-container"] .col-xs-1.col-sm-1-2.col-sm-offset-1-4 {
        margin-left: 2%;
        flex-basis: 96%;
        max-width: 96%;
      }

      [data-test-id="extras-priority-boarding-container"] .extras-binary-name {
        margin-left: 0;
      }

      [data-test-id="extras-priority-boarding-container"] .col-md-2-3.col-xs-2-3, [data-test-id="extras-priority-boarding-container"] .col-md-1-3.col-xs-1-3 {
        flex-basis: 50%;
        max-width: 50%;
      }

      [data-test-id="extras-priority-boarding-container"] .btn-boarding.select-dependent-text {
        margin-right: 0;
      }

      .new-titulo-priorityb-mobile {
        margin-bottom: 10px;
        color: #fff;
        text-align: center;
        background-color: #163a70;
        padding: 10px;
        margin-left: -1px;
        margin-right: -1px;
      }

      [data-test-id="extras-priority-boarding-container"] [data-test-id="extras-priority-boarding-journey--j|0"] {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }

      [data-test-id="extras-priority-boarding-container"].booking-wrapper {
        padding: 38px 25px 25px 25px;
      }

      [data-test-id="extras-priority-boarding-container"] [data-test-id="extras-priority-boarding-journey--j|0"] {
      padding: 0px 20px 20px 20px;
      border-bottom-left-radius: 0;
    }

    [data-test-id="extras-priority-boarding-container"] [data-test-id="extras-priority-boarding-journey--j|1"] {
      padding: 0px 20px 20px 20px;
      border-bottom-left-radius: 10px;
    }

    [data-test-id="extras-priority-boarding-container"] .btn-boarding.select-dependent-text {
      max-width: 100%;
    }

    }

    `;
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  function addMsg() {
    const htmlMessage = `<div class="aeropuertos-restriccion">
            *Solo válido en los aeropuertos BUE, COR, MDZ, BRC, LIM, SCL, GIG, ASU
            </div>`;

    const targetElement = document.querySelector(".priority-boarding-img");

    if (targetElement && !document.querySelector('.aeropuertos-restriccion')) {
      targetElement.insertAdjacentHTML("beforebegin", htmlMessage);
    }
  }

  function changeText() {
    var selectTitulo = document.querySelector('[data-test-id="extras-priority-boarding-container"] [data-test-id="extras-priority-boarding-title"]');
    var selectSubtitulo = document.querySelector('[data-test-id="extras-priority-boarding-container"] [data-test-id="extras-priority-boarding-subtitle"]');
    var titulo = 'Full Priority*';
    var subtitulo;

    switch (culture) {
      case 'en-US':
        subtitulo = 'Avoid the lines by checking in your luggage with priority and also board the plane with priority boarding.';
        break;
      case 'pt-BR':
        subtitulo = 'Evite as filas despachando sua bagagem com prioridade e, além disso, embarque no avião com embarque prioritário.';
        break;
      default:
        subtitulo = 'Evita las filas entregando tu maleta con prioridad y además accede al avión con embarque prioritario.';
    }

    if (selectTitulo) {
      selectTitulo.textContent = titulo;
    }

    if (selectSubtitulo) {
      selectSubtitulo.textContent = subtitulo;
    }
  }

  function insertImage() {
    var img = document.createElement('img');
    var linkimg;

    switch (culture) {
      case 'en-US':
        linkimg = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/db1122fb-f4c8-4f9b-bc1b-15731238db92/NuevoEN.png';
        break;
      case 'pt-BR':
        linkimg = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/79b773ca-9403-4178-90a9-a71b221aebff/NuevoPT.png';
        break;
      default:
        linkimg = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/ab3778c8-ec7e-4169-9808-5a95a7fcb149/NuevoES.png';
    }
    img.src = linkimg;
    img.classList.add('priority-boarding-img');
    var container = document.querySelector('.booking-wrapper.extras-step.ts-priority-boarding.ts-error-container');
    container.appendChild(img);
  }

  function havePB() {
    let o = false
    bookingData.Passengers.forEach(function (a) {
      if (!o) {
        o = a.hasOwnProperty("OutboundJourneySsrs") && a.OutboundJourneySsrs &&
          (a.OutboundJourneySsrs.indexOf("PBD") !== -1 || a.OutboundJourneySsrs.indexOf("PBP") !== -1);
      }
    });
    return o;
  }
  
  function haveBAG() {
    let o = false
    bookingData.Passengers.forEach(function (a) {
      if (!o) {
        o = a.hasOwnProperty("OutboundJourneySsrs") && a.OutboundJourneySsrs &&
          (a.OutboundJourneySsrs.indexOf("BAGD") !== -1 || a.OutboundJourneySsrs.indexOf("BAGP") !== -1);
      }
    });
    return o;
  }

  function checkWebAnonymous() {
    if (bookingData.Role === "WWW Anonymous") {
      return true;
    } else {
      return false;
    }
  }

  function addText() {
    var referenceElement = document.querySelector('[data-test-id="extras-priority-boarding-container"] header');
    if (referenceElement && !document.querySelector('.priority-banner')) {
      var text1;
      var text2;
      switch (culture) {
        case 'en-US':
          text1 = 'Drop off your suitcase at the counter with first priority, you will have a priority line.';
          text2 = 'Board the plane with priority boarding, you will also have a priority line.';
          break;
        case 'pt-BR':
          text1 = 'Entregue sua mala no balcão com prioridade máxima, você terá uma fila preferencial.';
          text2 = 'Embarque no avião com embarque prioritário, você também terá uma fila preferencial.';
          break;
        default:
          text1 = 'Entrega tu maleta en el counter con primera prioridad, tendrás una fila preferencial.';
          text2 = 'Ingresa al avión con embarque prioritario, también tendrás una fila preferencial.';
      }
      var htmlToInsert = `
      <div class="priority-banner">
      <i class="js-flexi-tick js-icon"></i>
      <span class="span-style">${text1}</span><br>
      <i class="js-icon js-flexi-tick"></i>
      <span class="span-style">${text2}</span><br>
      </div>`;

      referenceElement.insertAdjacentHTML('afterend', htmlToInsert);
    }

  }

  function addTitle() {

    var targetElement;

    if (RT) {
      targetElement = document.querySelector('[data-test-id="extras-priority-boarding-container"] .row.hidden-xs');
    } else {
      targetElement = document.querySelector('[data-test-id="extras-priority-boarding-container"] .col-xs-1.col-sm-1-2.col-sm-offset-1-4');
    }

    if (targetElement && !document.querySelector('.new-titulo-priorityb')) {
      var text;
      switch (culture) {
        case 'en-US':
          text = 'I want FULL PRIORITY and access to PREFERENTIAL lines at the airport!';
          break;
        case 'pt-BR':
          text = 'Quero PRIORIDADE TOTAL e acesso a filas PREFERENCIAIS no aeroporto!';
          break;
        default:
          text = '¡Quiero FULL PRIORIDAD y acceder a filas PREFERENCIALES en el aeropuerto!';
      }
      var newHTML = `<div class="new-titulo-priorityb">${text}</div>`;
      targetElement.insertAdjacentHTML('afterbegin', newHTML);
    }
  }

  function addTitleMobile() {

    var targetElement = document.querySelector('[data-test-id="extras-priority-boarding-container"] .inner-box.bottom-half.padded-bottom-half.ts-error-parent.ts-error-container');

    if (targetElement && !document.querySelector('.new-titulo-priorityb-mobile')) {
      var text;
      switch (culture) {
        case 'en-US':
          text = 'I want FULL PRIORITY and access to PREFERENTIAL lines at the airport!';
          break;
        case 'pt-BR':
          text = 'Quero PRIORIDADE TOTAL e acesso a filas PREFERENCIAIS no aeroporto!';
          break;
        default:
          text = '¡Quiero FULL PRIORIDAD y acceder a filas PREFERENCIALES en el aeropuerto!';
      }
      var newHTML = `<div class="new-titulo-priorityb-mobile">${text}</div>`;
      targetElement.insertAdjacentHTML('beforebegin', newHTML);
    }
  }

  function allFunctions() {
    changeText();
    insertImage();
    addText();
    addTitle();
    addTitleMobile();
    addMsg();
  }

  if (!havePB() && haveBAG() && checkWebAnonymous() && culture === 'es-AR') {
    if (RT) {
      addCSS2();
    } else {
      addCSS1();
    }
    allFunctions();
  }

}, 800);