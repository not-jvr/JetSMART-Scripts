var initRemoveRecommenderMsg = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/baggage') return;
  clearInterval(initRemoveRecommenderMsg);

  function clickButton1() {
   var button = document.querySelector('[data-test-id="baggage-open-per-journey-per-pax-view-button--c|CabinBaggage-m|1"]');
   button.addEventListener('click', function() {
    setTimeout(() => {
      hideRecommender();
      clickButton2();
    }, 500);
  });
 }

 function clickButton2() {
   var button = document.querySelector('[data-test-id="baggage-close-per-journey-per-pax-view-button--c|CabinBaggage-m|1"]');
   button.addEventListener('click', function() {
    setTimeout(() => {
      hideRecommender();
      clickButton1();
    }, 300);
  });
 }

 function hideRecommender(){
   var elements = document.querySelectorAll('.b2-illustration-ribbon');
   var elementsMobile = document.querySelectorAll('.b2m-ribbon');
   if (elements.length > 0) {
    elements.forEach(function(element) {
      element.style.display = 'none';
    });
  }

  if (elementsMobile.length > 0) {
    elementsMobile.forEach(function(elementMobile) {
      elementMobile.style.display = 'none';
    });
  }
}

function allFunctions(){
  clickButton1();
  hideRecommender();
}

allFunctions();

}, 400);