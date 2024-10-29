var initFixTextReview = setInterval(function () {
  if (window.location.pathname.toLowerCase() !== '/v2/review') return;
  clearInterval(initFixTextReview);

  var culture = JetSmart.AppContext.culture;

  function changeText() {
    var elemento = document.querySelector('.extras-changes .inner-deep-box-header');
    if (elemento) {
     elemento.innerText = "Opcionais";
   }
 }

 if (culture === 'pt-BR') {
  changeText();
 }

}, 600);