var initNoCovidSeguro = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/extras') return;
  clearInterval(initNoCovidSeguro);

  var culture = bookingData.Culture;

  function changeImage() {
    const elementoExistente = document.querySelector(".js-icon-covid.js-cv-covid-shield");

    if (elementoExistente) {
      const imagen = document.createElement("img");
      imagen.setAttribute("src", "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/dd70833b-7411-4142-8b3a-dcbb910429e9/medico.png");
      imagen.setAttribute("id", "shieldImage");
      elementoExistente.replaceWith(imagen);
    }
  }

  function changeText() {
    var elemento = document.querySelector('.eic-info');
    var spanElemento = elemento.querySelector('span');

    if (spanElemento) {
      spanElemento.parentNode.removeChild(spanElemento);
    }

    var textoContenido = elemento.textContent;
    var nuevoContenido = '';

    switch (culture) {
    case 'pt-BR':
      nuevoContenido = textoContenido.replace(' e agora', '');
      break;
    case 'en-US':
      nuevoContenido = textoContenido.replace(' and now', '');
      break;
    default:
      nuevoContenido = textoContenido.replace(' y ahora', '');
      break;
    }

    elemento.textContent = nuevoContenido;
  }

  function addCSS() {
    var css = `
    #shieldImage {
      width: 25%;
    }

    @media (max-width: 767px) {
      #shieldImage {
        width: 30%;
      }
    }
    `;

    var style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));

    var head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(style);
  }

  function allFunctions() {
    addCSS();
    changeImage();
    changeText();
  }

  function continueClick() {
    var button = document.querySelector('[data-test-id="extras-submit-button"]');
    if(button){
      button.addEventListener('click', allFunctions);
    }
  }

  function hideCovidShield() {
    var covidShield = document.querySelector('.js-icon-covid.js-cv-covid-shield-tick');
    if (covidShield) {
      covidShield.style.display = 'none';
    }
  }

  function changeText2() {
    var spanElement = document.querySelector('.insurance-banner-text');

    if (spanElement) {
      var currentText = spanElement.innerHTML;

      if (currentText.includes('Ahora tu seguro de viaje con cobertura COVID-19 incluida')) {
        var newText = currentText.replace('Ahora tu seguro de viaje con cobertura COVID-19 incluida', 'Incluye cobertura en gastos médicos por accidente o enfermedad.');
        spanElement.innerHTML = newText;
      } else if (currentText.includes('Aproveite seu destino sem se preocupar! Agora seu seguro de viagem com cobertura COVID-19 incluída')) {
        var newText = currentText.replace('Agora seu seguro de viagem com cobertura COVID-19 incluída', 'Inclui cobertura de despesas médicas por acidente ou doença.');
        spanElement.innerHTML = newText;
      } else if (currentText.includes('Enjoy your destination without worries! Now your travel insurance with COVID-19 coverage included')) {
        var newText = currentText.replace('Now your travel insurance with COVID-19 coverage included', 'Includes coverage for medical expenses due to accident or illness.');
        spanElement.innerHTML = newText;
      }
    }
  }

  function changeText3() {
    var divElement = document.querySelector('[data-test-id="extras-insurance-version"] .extras-binary-name');

    if (divElement) {
      var currentText = divElement.innerText;

      if (currentText.includes('con cobertura COVID-19 incluida')) {
        var newText = currentText.replace('con cobertura COVID-19 incluida', '');
        divElement.innerText = newText;
      } else if (currentText.includes('with COVID-19 coverage included from ')) {
        var newText = currentText.replace('with COVID-19 coverage included from ', '');
        divElement.innerText = newText;
      } else if (currentText.includes('com cobertura COVID-19 incluída a partir de ')) {
        var newText = currentText.replace('com cobertura COVID-19 incluída a partir de ', '');
        divElement.innerText = newText;
      }
    }
  }

  function editsSeguros() {
    hideCovidShield();
    changeText2();
    changeText3();
  }

  editsSeguros();
  continueClick();

}, 600);