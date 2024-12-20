var initSeatsLeftInButtons = setInterval(function () {
	if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/flight') return;
	clearInterval(initSeatsLeftInButtons);

	var seatCounts = {};
	var culture = bookingData.Culture;

	function addCSS() {
		var css = `
		.smart-fee .seat-count,
		.discount-fee .seat-count {
			color: #ac272f !important;
			font-size: 11px !important;
			margin-bottom: 0px !important;
		}

		.smart-fee:hover .seat-count,
		.discount-fee:hover .seat-count {
			color: white !important;
		}

		@media (max-width: 767px) {
			.smart-fee .seat-count,
			.discount-fee .seat-count {
				top: 70px !important;
				background: none !important;
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

	function deleteSeatsLeft(){
		if (window.innerWidth >= 768) {
			setTimeout(function () {
				var elements = document.querySelectorAll('.bundle-availability');
				elements.forEach(function (element) {
					if(element){
						element.parentNode.removeChild(element);
					}
				});
			}, 1100);
		}
	}

	function addRandomSeatCount() {
		var passCount = bookingData.PassengersAdultCount + bookingData.PassengersInfantCount;
		if (passCount < 3) {
			passCount = 3;
		}
		var smartFeeElements = document.querySelectorAll('.smart-fee.nowrap.big, .discount-fee.nowrap.big');

		if (smartFeeElements) {
			smartFeeElements.forEach(function (element) {
				if (!element.querySelector('.seat-count')) {
					var seatCountElement = document.createElement('span');
					seatCountElement.classList.add('seat-count');

        var parentElement = findParentWithTestId(element); // Encuentra el elemento padre con el atributo data-test-id

        if (parentElement) {
          var testId = parentElement.getAttribute('data-test-id'); // Obtiene el data-test-id del elemento padre

          if (!seatCounts[testId]) {
          	seatCounts[testId] = getRandomNumber(passCount, 10);
          }

          switch (culture) {
          case 'pt-BR':
          	var seatCountText = 'Restam ' + seatCounts[testId] + ' assentos disponíveis';
          	break;
          case 'en-US':
          	var seatCountText = seatCounts[testId] + ' seats left';
          	break;
          default:
          	var seatCountText = 'Quedan ' + seatCounts[testId] + ' asientos disponibles';
          	break;
          }
          seatCountElement.textContent = seatCountText;
          element.appendChild(seatCountElement);
      }
  }
});
		}
	}

	function findParentWithTestId(element) {
		while (element) {
			if (element.getAttribute('data-test-id')) {
				return element;
			}
			element = element.parentNode;
		}
		return null;
	}

	function getRandomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function allEditsClick() {
		var smartFeeButtons = document.querySelectorAll('.smart-fee.nowrap.big, .discount-fee.nowrap.small, .smart-fee.nowrap.small, .discount-fee.nowrap.big');
		var buttonClickHandler = function () {
			deleteSeatsLeft();
		};
		smartFeeButtons.forEach(button => button.addEventListener('click', buttonClickHandler));
	}

	if (culture) {
		addCSS();
		deleteSeatsLeft();
		window.eventBus.subscribe({
			name: "countSeats", callback: function (e) {
				allEditsClick();
				addRandomSeatCount();
				deleteSeatsLeft();
			}
		});
	}

}, 600);