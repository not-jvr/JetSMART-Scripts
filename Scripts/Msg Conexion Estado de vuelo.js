var initMsgEstadoVuelo = setInterval(function () {
  if (!window.location.pathname.includes('/estado-de-vuelo')) return;
  clearInterval(initMsgEstadoVuelo);
  
  var culture = 'default';
  if (window.location.pathname.includes('/br/pt')) {
    culture = 'pt-BR';
  } else if (window.location.pathname.includes('/us/en')) {
    culture = 'en-US';
  }

  function addMsgConexionEV(selector) {
  var elements = document.querySelectorAll(selector);
  if (elements.length >= 2 && !document.querySelector('#msg-conexion')) {
    var container = elements[1];
    var mensaje;
    switch (culture) {
      case 'en-US':
        mensaje = 'If you have a connecting flight, you can check its status on the airport screens.';
        break;
      case 'pt-BR':
        mensaje = 'Se você tiver um voo de conexão, poderá verificar o status dele nas telas do aeroporto.';
        break;
      default:
        mensaje = 'Si tienes vuelo en conexión podrás ver su estado en las pantallas del aeropuerto.';
        break;
    }
    var newElement = document.createElement('div');
    newElement.id = 'msg-conexion';
    newElement.innerHTML = `<span>${mensaje}</span>`;
    var css = `
      #msg-conexion {
        display: flex;
        justify-content: center;
        padding: 5px;
        position: relative;
        background-color: #00ACC8;
        line-height: 30px;
        color: white;
        border: 1px;
        border-radius: 5px;
        align-items: center;
        margin: 10px;
        margin-left: 10px;
      }

      #msg-conexion span {
        font-size: 16px;
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
    container.parentNode.insertBefore(newElement, container.nextElementSibling);
  }
}

  addMsgConexionEV('.custom-control.custom-radio.custom-control-inline')
}, 400);