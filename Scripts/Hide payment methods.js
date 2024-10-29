var initPayments = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/payment') return;
  clearInterval(initPayments);

  var culture = bookingData.Culture;

  function hideElement(selector) {
    var element = document.querySelector(selector);
    if (element) {
      var elementSelect = element.parentElement;
      elementSelect.style.transition = "opacity 0.5s ease-out";
      elementSelect.style.opacity = "0";
      setTimeout(function() {
        elementSelect.style.display = "none";
    }, 500); // Tiempo en milisegundos, debe coincidir con la duración de la transición
    }
  }

  function showElement(selector) {
    var element = document.querySelector(selector);
    if (element) {
      var elementSelect = element.parentElement;
      elementSelect.style.transition = "opacity 0.5s ease-in";
      if (window.innerWidth >= 768) {
        elementSelect.style.display = "inline-block";
      } else if (window.innerWidth < 768) {
        elementSelect.style.display = "block";
      }
      setTimeout(function() {
        elementSelect.style.opacity = "1";
    }, 10); // Un pequeño delay para asegurar que la propiedad 'display' se haya aplicado
    }
  }

  function addCSS() {
    var css = `
    .mostrar-mas-circle {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #fff;
      font-size: 30px;
      font-weight: bold;
      text-decoration: none;
      border: 4px solid #ccc;
      color: #163a70 !important;
      cursor: pointer;
      transform: translate3d(100%, 50%, 0);
    }

    .mostrar-mas-circle:hover {
      border-color: #163a70;
      color: #163a70 !important;
    }

    #miId {
      margin-bottom: 30px;
    }

    #mostrarTexto {
      display: block;
      text-align: center;
      transform: translate3d(12%, 120%, 0);
      color: #163a70;
      text-decoration: underline;
      cursor: pointer;
    }

    @media (max-width: 767px) {
      .mostrar-mas-circle {
        transform: translate3d(0, 0, 0);
        margin-left: 40%;
      }

      .mostrar-mas-circle:hover {
        border-color: #ccc;
        color: #163a70 !important;
      }

      #mostrarTexto {
        transform: translate3d(0, 0, 0);
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
  }

  function addButton() {
    var navElement = document.querySelector('ac-payment-methods-container nav');
    if(navElement && !document.querySelector('#mostrarMas')){
      var mostrarMasElement = document.createElement('li');
  mostrarMasElement.id = 'miId'; // Agrega un ID al elemento
  mostrarMasElement.innerHTML = '<a id="mostrarMas" class="mostrar-mas-circle">+</a><span id="mostrarTexto">Más métodos de pago</span>'; // Agrega un span con el texto

  var ulElement = navElement.querySelector('ul');
  ulElement.appendChild(mostrarMasElement);
}
}

function clickButton(selector1, selector2) {
  var completeButton = document.querySelector('#miId');
  var buttonElement = document.querySelector('#mostrarMas');
  var textoElement = document.querySelector('#mostrarTexto');

  completeButton.addEventListener('click', function () {
    // Establecer la transición de opacidad y desvanecer los elementos
    buttonElement.style.transition = "opacity 0.5s ease-out";
    textoElement.style.transition = "opacity 0.5s ease-out";
    buttonElement.style.opacity = "0";
    textoElement.style.opacity = "0";

    // Cambiar el contenido después de que la animación de desvanecimiento esté completa
    setTimeout(function() {
      var content = buttonElement.textContent.trim();
      if (content === '+') {
        showElement(selector1);
        showElement(selector2);
        buttonElement.textContent = '-';
        textoElement.textContent = 'Menos métodos de pago';
        if (window.innerWidth >= 768) {
          textoElement.style.transform = "translate3d(9%, 120%, 0)";
        }
      } else {
        hideElement(selector1);
        hideElement(selector2);
        buttonElement.textContent = '+';
        textoElement.textContent = 'Más métodos de pago';
        if (window.innerWidth >= 768) {
          textoElement.style.transform = "translate3d(12%, 120%, 0)";
        }
      }

      // Hacer que los elementos reaparezcan con la misma duración de la transición
      buttonElement.style.transition = "opacity 0.5s ease-in";
      textoElement.style.transition = "opacity 0.5s ease-in";
      buttonElement.style.opacity = "1";
      textoElement.style.opacity = "1";

    }, 500); // Duración de la animación de desvanecimiento (en milisegundos)
  });
}

function clickPage() {
  var element = document.querySelector('.booking-wrapper');
  element.addEventListener('click', function() {
    hideMostrarMasMenos();
  });
}

function hideMostrarMasMenos() {
  var elemento = document.querySelector('[data-test-id="payment-card-issuer-country"]');
  var buttonElement = document.querySelector('#mostrarMas');
  var textElement = document.querySelector('#mostrarTexto');
  if (elemento && buttonElement && textElement) {
    var valor = elemento.getAttribute('value');
    if (valor === 'CL') {
      buttonElement.style.display = 'flex';
      textElement.style.display = 'block';
    } else {
      buttonElement.style.display = 'none';
      textElement.style.display = 'none';
    }
  }
}

function moveButton(button, input){
  var paymentButtonTarget = document.querySelector(button);
  if(paymentButtonTarget){
    var paymentButton = document.querySelector(button).parentNode; 
    var inputButton = document.querySelector(input);
    var parentElement = document.querySelector('ac-payment-method-selector');
    parentElement.insertBefore(paymentButton, parentElement.lastChild);
    parentElement.insertBefore(inputButton, parentElement.lastChild);
  }
}

function allFunctions(selector1, selector2) {
  moveButton(selector1, 'input#payment_tab_TC');
  moveButton(selector2, 'input#payment_tab_SC');
  hideElement(selector1);
  hideElement(selector2);
  addCSS();
  addButton();
  clickButton(selector1, selector2);
  clickPage();
}

function buttonTrue() {
  var button1 = document.querySelector('[for="payment_tab_TC"]');
  var button2 = document.querySelector('[for="payment_tab_SC"]');
  if (button1 || button2) {
    return true;
  } else {
    return false;
  }
}

if (culture === 'es-CL' && buttonTrue) {
  allFunctions('[for="payment_tab_TC"]', '[for="payment_tab_SC"]');
}

}, 600);