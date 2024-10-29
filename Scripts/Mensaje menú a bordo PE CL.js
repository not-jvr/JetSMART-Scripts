var initMenuChilePe = setInterval(function () {
  if (!window.location.pathname.toLowerCase().startsWith('/pe/es/minisitios/entretencion')) return;
  clearInterval(initMenuChilePe);

  function addCSS() {
    var css = `
    .newText {
      text-align: center;
    }

    .newText .textContainer {
      cursor: pointer;
      text-decoration: underline;
    }

    .newText .textContainer:hover {
      color: #b2292e;
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
  }

  function addText() {
    var headText = document.querySelector('#head-text');
    var newText = document.querySelector('.newText');
    if (!headText || newText) {
      return;
    }

    var rowContainer = headText.closest('.row');
    var newDiv = '<div class="newText">Si viajas desde Chile y quieres ver nuestro menú chileno, <span class="textContainer">descárgalo aquí</span></div>';
    rowContainer.insertAdjacentHTML('afterend', newDiv);

    var textContainer = document.querySelector('.textContainer');
    textContainer.addEventListener('click', function () {
      window.location.href = 'https://jetsmart.com/cl/es/minisitios/menu-a-bordo';
    });
  }

  addText();
  addCSS();
}, 600);