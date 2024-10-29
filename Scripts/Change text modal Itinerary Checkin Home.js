var initChangeTextModal = setInterval(function () {
    if (typeof JetSmart.TealiumData.culture === 'undefined' || !window.location.href.startsWith('https://jetsmart.com')) return;
    clearInterval(initChangeTextModal);

    var culture = JetSmart.TealiumData.culture;

    function addCSS() {
        var css = `
        #newTextModal {
          display: flex;
          padding: 5px;
          position: relative;
          color: white;
          align-items: center;
          font-size: 15px;
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

function changeMSG() {
    var infoBar = document.querySelector('.dg-new-modal-info-bar');

    if (infoBar) {
        var message;
        switch (culture) {
        case 'en-US':
            message = `
            <div>
            Available from 72 hours up to 80 minutes before your flight.<br>
            <div id="newTextModal">
            (*) If you purchased your flight on American Airlines, click 
            <a href="https://aa.com/">HERE</a> to see your booking details.
            </div>
            </div>
            `;
            break;
        case 'pt-BR':
            message = `
            <div>
            Disponível de 72 horas até 80 minutos antes do seu voo.<br>
            <div id="newTextModal">
            (*) Se você comprou seu voo na American Airlines, clique 
            <a href="https://aa.com/">AQUI</a> para ver os detalhes da sua reserva.
            </div>
            </div>
            `;
            break;
        default:
            message = `
            <div>
            Disponible desde 72 horas hasta 80 minutos antes de tu vuelo.<br>
            <div id="newTextModal">
            (*) Si compraste tu vuelo en American Airlines, haz clic 
            <a href="https://aa.com/">AQUÍ</a> para ver los detalles de tu reserva.
            </div>
            </div>
            `;
            break;
        }

        infoBar.innerHTML = message;
    }
}

function clickTopBar() {
    var topBar = document.querySelector('.login-container');
    if (topBar) {
        topBar.addEventListener('click', function() {
            changeMSG();
        });
    }
}

addCSS();
clickTopBar();

}, 600);