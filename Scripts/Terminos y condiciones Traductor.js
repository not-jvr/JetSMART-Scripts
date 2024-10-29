var initTermAndCond = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/payment') return;
  clearInterval(initTermAndCond);

  var culture = bookingData.Culture;

  function traductor() {
    const element = document.querySelector('[data-test-id="payment-accept-checkbox-label-text"] .cb-title');
    const spanishText = `<span class="mdl-checkbox__label cb-amount-label" data-test-id="payment-accept-checkbox-label-text">
    <span class="cb-title">Acepto <a target="_blank" href="https://jetsmart.com/br/pt/tyc/condiciones-generales">Términos e Condições</a> e <a target="_blank" href="https://jetsmart.com/br/pt/tyc/politica-privacidad">Política de Privacidade</a>, e declaro que sou maior de idade ou tenho o consentimento expresso de quem possui capacidade legal para me representar. Além disso, declaro que na minha reserva, se apenas um menor entre 14 e 17 anos estiver voando, ele não poderá transportar mais de uma criança ou bebê.</span>
    </span>`;

    const englishText = `<span class="cb-title">I accept <a target="_blank" href="https://jetsmart.com/us/en/tyc/condiciones-generales">Terms and Conditions</a> and <a target="_blank" href="https://jetsmart.com/us/en/tyc/politica-privacidad">Privacy Policy</a>, and declare that I am of legal age or have the express consent of someone with legal capacity to represent me. Furthermore, I declare that in my reservation, if only one minor between 14 and 17 years old flies, he/she will not be able to carry more than one child or infant.</span>`;

    let translatedText;

    if (culture === "pt-BR") {
      const portugueseText = `<span class="cb-title">Eu aceito <a target="_blank" href="https://jetsmart.com/br/pt/tyc/condiciones-generales">Termos e Condições</a> e <a target="_blank" href="https://jetsmart.com/br/pt/tyc/politica-privacidad">Política de Privacidade</a>, e declaro que sou maior de idade ou tenho o consentimento expresso de quem possui capacidade legal para me representar. Além disso, declaro que na minha reserva, se apenas um menor entre 14 e 17 anos estiver voando, ele não poderá transportar mais de uma criança ou bebê.</span>`;
      translatedText = portugueseText;
    } else if (culture === "en-US") {
      translatedText = englishText;
    } 
    element.innerHTML = translatedText;
  }

  if(culture==='pt-BR' || culture === 'en-US'){
    traductor();
  }

}, 600);