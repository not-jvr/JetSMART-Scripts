 var removePSMART = setInterval(function() {
  if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
  clearInterval(removePSMART);

  var bancoEstado = JetSmart.AppContext.bancoEstadoCategory;

  function hideExtras(){
    if (bancoEstado < 1) {
      var elements = document.querySelectorAll('ac-bundles-selector [data-test-id="bundle-ssr-item--j|0-c|simple|PBOA|PBA|PBD|PBP"], ac-bundles-selector [data-test-id="bundle-ssr-item--j|1-c|simple|PBOA|PBA|PBD|PBP"]');
      elements.forEach(function (element) {
        if(element){
          element.style.visibility = 'hidden';
        }
      });
    }
  }

  function hideExtrasPostSelect(){
    if (bancoEstado < 1) {
      var elements = document.querySelectorAll('ac-bundle-selected [data-test-id="bundle-ssr-item--j|0-c|simple|PBOA|PBA|PBD|PBP"], ac-bundle-selected [data-test-id="bundle-ssr-item--j|1-c|simple|PBOA|PBA|PBD|PBP"]');
      elements.forEach(function (element) {
        if(element){
          element.remove();
        }
      });
    }
  }

  function reorderListItems(ulSelector) {
    var ulList = document.querySelectorAll(ulSelector);

    ulList.forEach(ul => {
      var visibleItems = [];
      var hiddenItems = [];

      ul.querySelectorAll('li').forEach(li => {
        if (li.style.visibility === 'hidden') {
          hiddenItems.push(li);
        } else {
          visibleItems.push(li);
        }
      });

      var newList = document.createElement('ul');

      visibleItems.forEach(item => newList.appendChild(item));

      hiddenItems.forEach(item => newList.appendChild(item));

      ul.parentNode.replaceChild(newList, ul);
    });
  }

  function allFunctions() {
    hideExtras();
    hideExtrasPostSelect();
    reorderListItems('ul[data-test-id="bundle-ssrs--j|0-c|simple"]');
    reorderListItems('ul[data-test-id="bundle-ssrs--j|1-c|simple"]');
  }

  function clickButtons() {
    var smartFeeButtons = document.querySelectorAll('.smart-fee.nowrap.big, .discount-fee.nowrap.small, .smart-fee.nowrap.small, .discount-fee.nowrap.big');
    var buttonClickHandler = function() {
      allFunctions();
    };
    smartFeeButtons.forEach(function(button) {
      button.addEventListener('click', buttonClickHandler);
    });
  }

  if (bancoEstado < 1) {
    clickButtons();
    allFunctions();

    window.eventBus.subscribe({
      name: "hidePriority",
      callback: function(e) {
        clickButtons();
        allFunctions();
      }
    });
  }
  
}, 600);