var newBDANC = setInterval(function () {
	if (typeof bookingData === "undefined" || (window.location.pathname.toLowerCase() !== '/v2/baggage' && window.location.pathname.toLowerCase() !== '/seat/map' && window.location.pathname.toLowerCase() !== '/v2/extras')) return;
	clearInterval(newBDANC);

	var culture = bookingData.Culture;
	var isStaff = JetSmart.AppContext.isStaff;

	function addCSS() {
		var css = `
		.BDNEW {
			margin-left: 35px;
		}
		.textoBD {
			color: #55595c;
			text-decoration: none;
		}
		.textoBD::before {
			content: "● ";
			margin-right: 25px;
		}
		.textoBD:hover,
		.textoBD:hover::before {
			text-decoration: underline !important;
			color: #59c3d9 !important;
			cursor: pointer !important;
		}
		@media (max-width: 1023px) {
			.BDNEW {
				display: none;
			}
		}
		`;

		var style = document.createElement('style');
		style.appendChild(document.createTextNode(css));
		document.head.appendChild(style);
	}

	function addHTML() {
		if (!document.querySelector('.BDNEW')) {
			var elemento = document.querySelector('[data-test-id="sidebar-booking-breadcrumb--i|1"]');
			if (elemento) {
				var text1, text2, text3;

				switch (culture) {
				case 'en-US':
					text1 = 'Luggage';
					text2 = 'Seats';
					text3 = 'Optional';
					break;
				case 'pt-BR':
					text1 = 'Bagagem';
					text2 = 'Assentos';
					text3 = 'Opcionais';
					break;
				default:
					text1 = 'Equipaje';
					text2 = 'Asientos';
					text3 = 'Opcionales';
					break;
				}

				var divHTML = '<div class="BDNEW"><a href="https://booking.jetsmart.com/V2/Baggage" class="textoBD" id="BD1">' + text1 + '</a><br><a href="https://booking.jetsmart.com/Seat/Map" class="textoBD" id="BD2">' + text2 + '</a><br><a href="https://booking.jetsmart.com/V2/Extras" class="textoBD" id="B3">' + text3 + '</a></div>';

				elemento.insertAdjacentHTML('afterend', divHTML);
			}
		}
	}

	if (isStaff !== 'True') {
		addCSS();
		window.eventBus.subscribe({
			name: "newBD",
			callback: function(e) {
				addHTML();
			}
		});
	}
	
}, 600);