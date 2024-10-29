var initWeeklyButton = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
  clearInterval(initWeeklyButton);

  function handleWeekSelector(index) {
    const leftButton = document.querySelector(`[data-test-id="flight-weekly-selector-left--j|${index}"]`);
    const rightButton = document.querySelector(`[data-test-id="flight-weekly-selector-right--j|${index}"]`);
    const weekSelector = document.querySelector(`[data-test-id="flight-options-list--j|${index}"] [data-test-id="flight-weekly-selector--j|${index}"] ul`);

    if (!weekSelector) {
      return;
    }

    function getSelected() {
      return weekSelector.querySelector('li.selected');
    }

    if (leftButton) {
      leftButton.addEventListener('click', () => {
        const selected = getSelected();
        if (selected && selected.previousElementSibling) {
          selected.previousElementSibling.click();
        }
      });
    }

    if (rightButton) {
      rightButton.addEventListener('click', () => {
        const selected = getSelected();
        if (selected && selected.nextElementSibling) {
          selected.nextElementSibling.click();
        }
      });
    }
  }

  handleWeekSelector(0);
  handleWeekSelector(1);
  window.eventBus.subscribe({
    name: "weeklyButton", callback: function (e) {
      handleWeekSelector(0);
      handleWeekSelector(1);
    }
  });

}, 600);