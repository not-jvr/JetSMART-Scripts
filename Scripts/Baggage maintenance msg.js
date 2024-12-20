var initMsgMantencionBaggage = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Baggage') return;
  clearInterval(initMsgMantencionBaggage);

  var culture = bookingData.Culture;
  function addMsgMantencion(selector) {
    if(!document.querySelector('#mantencion-msg-baggage')){
      var container = document.querySelector(selector)
      switch (culture) {
      case 'en-US':
        mensaje = 'We are performing a maintenance to our website. If you experience any problems, please try again in a few minutes.';
        break;
      case 'pt-BR':
        mensaje = 'No momento, estamos realizando manutenção em nosso site. Se tiver algum problema, tente novamente em alguns minutos.';
        break;
      default:
        mensaje = 'Estamos realizando una mantención a nuestro sitio web. Si tienes algún inconveniente, por favor intenta nuevamente en unos minutos.';
        break;
      }
      var newElement = document.createElement('div');
      newElement.id = 'mantencion-msg-baggage';
      newElement.innerHTML = `<i class="fas fa-exclamation-circle notification-icon custom-alert" style="margin-right: 10px;"></i><span>${mensaje}</span>`;
      var css = `
      #mantencion-msg-baggage {
        display: flex;
        padding: 5px;
        position: relative;
        background-color: rgb(89, 195, 217);
        line-height: 30px;
        color: white;
        border: 1px;
        border-radius: 5px;
        align-items: center;
        margin: 10px;
        margin-left: 10px;
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
      container.parentNode.insertBefore(newElement, container);
    }
  }
  addMsgMantencion('ac-select-cabin-bag')
}, 400);