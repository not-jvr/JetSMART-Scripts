var initHideInterPE = setInterval(function () {
  if (!window.location.pathname.toLowerCase().startsWith('/pe/es/buscador-smart')) return;
  clearInterval(initHideInterPE);

  function hideInter() {
    var elementos = document.getElementsByClassName('nav-link');

    for (var i = 0; i < elementos.length; i++) {
        if (elementos[i].getAttribute('aria-controls') === 'int') {
            elementos[i].style.display = 'none';
        }
    }
}

hideInter();

}, 600);