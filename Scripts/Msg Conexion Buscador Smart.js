var initMsgBuscadorSmart = setInterval(function () {
  if (!window.location.pathname.includes('/buscador-smart')) return;
  clearInterval(initMsgBuscadorSmart);

  var culture = 'default';
  var redirectUrl = 'https://jetsmart.com/';
  if (window.location.pathname.includes('/br/pt')) {
    culture = 'pt-BR';
    redirectUrl += 'br/pt';
  } else if (window.location.pathname.includes('/us/en')) {
    culture = 'en-US';
    redirectUrl += 'us/en';
  } else if (window.location.pathname.includes('/cl/es')) {
    culture = 'cl-ES';
    redirectUrl += 'cl/es';
  } else if (window.location.pathname.includes('/ar/es')) {
    culture = 'ar-ES';
    redirectUrl += 'ar/es';
  } else if (window.location.pathname.includes('/co/es')) {
    culture = 'co-ES';
    redirectUrl += 'co/es';
  } else if (window.location.pathname.includes('/pe/es')) {
    culture = 'pe-ES';
    redirectUrl += 'pe/es';
  } else if (window.location.pathname.includes('/uy/es')) {
    culture = 'uy-ES';
    redirectUrl += 'uy/es';
  } else if (window.location.pathname.includes('/py/es')) {
    culture = 'py-ES';
    redirectUrl += 'py/es';
  }

  function addMsgConexion(selector) {
    if(!document.querySelector('#msg-conexion')){
      var container = document.querySelector(selector)
      var mensaje;
      switch (culture) {
      case 'en-US':
        mensaje = 'If you want to quote connecting flights, search for it directly <a href="' + redirectUrl + '">HERE</a>.';
        break;
      case 'pt-BR':
        mensaje = 'Se você deseja cotar voos de conexão, procure diretamente <a href="' + redirectUrl + '">AQUI</a>.';
        break;
      case 'cl-ES':
      case 'ar-ES':
      case 'co-ES':
        mensaje = 'Si quieres cotizar vuelos con conexión, búscalo directamente <a href="' + redirectUrl + '">AQUÍ</a>.';
        break;
      default:
        mensaje = 'Si quieres cotizar vuelos con conexión, búscalo directamente <a href="' + redirectUrl + '">AQUÍ</a>.';
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
        font-size: 18px;
      }

      #msg-conexion a {
        color: white;
        text-decoration: underline;
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
  addMsgConexion('.subtitle.blue.center')
}, 400);