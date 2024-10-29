  var initNoHayVuelos = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
    clearInterval(initNoHayVuelos);
    var culture = bookingData.Culture;
    const listItems = document.querySelectorAll('.week-selector li');

    function addMsgNoHayVuelos(selector, tipoVuelo) {
      if (culture === 'pt-BR') {
        vueloDe = tipoVuelo === 'ida' ? 'ida' : 'volta';
      } else if (culture === 'en-US') {
        vueloDe = tipoVuelo === 'ida' ? 'departure' : 'return';
      } else {
        vueloDe = tipoVuelo === 'ida' ? 'ida' : 'vuelta';
      }  let mensaje = '';

      switch (culture) {
      case 'pt-BR':
        mensaje = `Não há voos ${vueloDe} disponíveis para esta data.`;
        break;
      case 'en-US':
        mensaje = `No ${vueloDe} flights available for this date.`;
        break;
      default:
        mensaje = `No hay vuelos de ${vueloDe} disponibles para esta fecha.`;
        break;
      }

      const newElement = document.createElement('div');
      newElement.id = 'noVuelos';
      newElement.innerHTML = `<i class="fas fa-exclamation-circle notification-icon custom-alert" style="margin-right: 10px;"></i><span>${mensaje}</span>`;

      const css = `
      #noVuelos {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        position: relative;
        background-color: #f0ad4e;
        line-height: 30px;
        color: white;
        border: 1px;
        border-radius: 5px;
        margin: 0 auto;
        width: 100%;
      }

      #noVuelos span {
        font-size: 16px;
        font-family: Lato, sans-serif;
      }

      @media screen and (max-width: 767px) {
        #noVuelos {
          width: 95%;
          padding: 5px;
        }

        #noVuelos span {
          font-size: 14px;
        }
      }

      @media screen and (max-width: 375px) and (min-width: 361px){
        #noVuelos {
          width: 95%;
          padding: 5px;
        }

        #noVuelos span {
          font-size: 13px;
        }
      }
      `;

      const head = document.head || document.getElementsByTagName('head')[0];
      const style = document.createElement('style');
      head.appendChild(style);
      style.type = 'text/css';

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }

      const parentElement1 = document.querySelector(selector);
      parentElement1.parentNode.insertBefore(newElement, parentElement1.nextSibling);
    }

    function verificarVueloIda() {
      if(document.querySelector('div[data-test-id="flight-weekly-selector--j|0"]')){
        let element = document.querySelector('div[data-test-id="flight-weekly-selector--j|0"]');
        let selectedElement = element.querySelector('.selected');
        let content = selectedElement.querySelectorAll('span')[1].textContent;
        if (content.trim() === 'x') {
          addMsgNoHayVuelos('[data-test-id="flight-weekly-selector--j|0"]', 'ida')
        }
      }
    }

    function verificarVueloVuelta() {
      if(document.querySelector('div[data-test-id="flight-weekly-selector--j|1"]')){
        let element2 = document.querySelector('div[data-test-id="flight-weekly-selector--j|1"]');
        let selectedElement2 = element2.querySelector('.selected');
        let content2 = selectedElement2.querySelectorAll('span')[1].textContent;
        if (content2.trim() === 'x') {
          addMsgNoHayVuelos('[data-test-id="flight-weekly-selector--j|1"]', 'vuelta')
        }
      }
    }

    function verificarVuelos() {
      verificarVueloIda();
      verificarVueloVuelta();
      listItems.forEach(item => {
        const secondSpan = item.querySelectorAll('span')[1];
        if (secondSpan.textContent.trim() === 'x') {
          if(window.innerWidth < 768){
            secondSpan.style.lineHeight = '1';
          } else if(window.innerWidth >= 768){
            secondSpan.style.lineHeight = '1';
          }
          switch (culture) {
          case 'pt-BR':
            secondSpan.innerHTML = 'Não há<br/>voos';
            break;
          case 'en-US':
            secondSpan.innerHTML = 'No flights<br/>available';
            break;
          default:
            secondSpan.innerHTML = 'No hay<br/>vuelos';
            break;
          }
        }
      });
    }

    if(culture){
      verificarVuelos();
    }

  }, 400);