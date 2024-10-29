var initChanges_buttonChangeBag = setInterval(function(){
    if(typeof bookingData === "undefined" || typeof JetSmart === "undefined" || typeof JetSmart.AppContext === "undefined" || window.location.pathname !== '/V2/Baggage') return;
    clearInterval(initChanges_buttonChangeBag);
    var culture = bookingData.Culture;
    
	if(culture === 'es-CL'){
		 window.eventBus.subscribe({
            name: "editButton", callback: function (e) {
		if(JetSmart.AppContext.isLoggedIn === "True" && (JetSmart.AppContext.hasStandardDcMembership === "False" || JetSmart.AppContext.hasGroupDcMembership === "True" || JetSmart.AppContext.isStaff === "True" || JetSmart.AppContext.isCug2Member === "True")){
				
			}else{
			var listenerButtonPerBookingMobile_cabin = function(evt){
				var textEditBag = document.querySelectorAll("ac-per-booking-view-switch .b2-openable > div > button, ac-per-booking-mobile > .b2m-view > button").forEach(function (e) {
												e.innerHTML = `Editar`;
											});
											
				var editTextMobile = document.querySelectorAll("ac-per-booking-view-switch .b2-openable .b2-view-info, ac-per-booking-mobile > .b2m-view .b2m-view-info").forEach(function (e) {
													e.innerHTML = `Edita tu equipaje`;
												});
												
				var editText2Mobile = document.querySelectorAll("ac-per-booking-view-switch .b2-openable .b2-pax-amount, ac-per-booking-mobile > .b2m-view .b2m-pax-amount").forEach(function (e) {
													e.innerHTML = `por pasajero o por tramo`;
												});
				
				if(document.querySelector("ac-select-cabin-bag ac-per-journey-per-pax-mobile .b2-reset-button")){
					var elm1 = document.querySelector("ac-select-cabin-bag ac-per-journey-per-pax-mobile .b2-reset-button");
						elm1.addEventListener('click',listenerButtonAllBookingMobile_cabin, false);
				}
			}
			listenerButtonPerBookingMobile_cabin();

			var listenerButtonAllBookingMobile_cabin = function(evt){
				var textEditBag = document.querySelectorAll("ac-per-booking-view-switch .b2-openable > div > button, ac-per-booking-mobile > .b2m-view > button").forEach(function (e) {
												e.innerHTML = `Editar`;
											});
											
				var editTextMobile = document.querySelectorAll("ac-per-booking-view-switch .b2-openable .b2-view-info, ac-per-booking-mobile > .b2m-view .b2m-view-info").forEach(function (e) {
													e.innerHTML = `Edita tu equipaje`;
												});
												
				var editText2Mobile = document.querySelectorAll("ac-per-booking-view-switch .b2-openable .b2-pax-amount, ac-per-booking-mobile > .b2m-view .b2m-pax-amount").forEach(function (e) {
													e.innerHTML = `por pasajero o por tramo`;
												});
			   
				if(document.querySelector("ac-select-cabin-bag ac-per-booking-mobile .b2m-view button")){
					var elm2 = document.querySelector("ac-select-cabin-bag ac-per-booking-mobile .b2m-view button");
						elm2.addEventListener('click', listenerButtonPerBookingMobile_cabin, false);
				}
			}

			listenerButtonAllBookingMobile_cabin();
						
				if(document.querySelector("ac-select-cabin-bag ac-per-journey-per-pax-mobile .b2-reset-button")){
					var elm1 = document.querySelector("ac-select-cabin-bag ac-per-journey-per-pax-mobile .b2-reset-button");
					elm1.addEventListener('click',listenerButtonAllBookingMobile_cabin, false);
				}
				if(document.querySelector("ac-select-cabin-bag ac-per-journey-per-pax .b2-reset-button")){
					var elm1_d = document.querySelector("ac-select-cabin-bag ac-per-journey-per-pax .b2-reset-button");
					elm1_d.addEventListener('click',listenerButtonAllBookingMobile_cabin, false);
				}
				
				//boton por tramo
				if(document.querySelector("ac-select-cabin-bag ac-per-booking-mobile .b2m-view button")){
					var elm2 = document.querySelector("ac-select-cabin-bag ac-per-booking-mobile .b2m-view button");
					elm2.addEventListener('click', listenerButtonPerBookingMobile_cabin, false);
				}
				if(document.querySelector("ac-select-cabin-bag ac-per-booking-view-switch button.b2-link-button")){
					var elm2_d = document.querySelector("ac-select-cabin-bag ac-per-booking-view-switch button.b2-link-button");
					elm2_d.addEventListener('click', listenerButtonPerBookingMobile_cabin, false);
				}

			var listenerButtonPerBookingMobile_checked = function(evt){
				var textEditBag = document.querySelectorAll("ac-per-booking-view-switch .b2-openable > div > button, ac-per-booking-mobile > .b2m-view > button").forEach(function (e) {
												e.innerHTML = `Editar`;
											});
											
				var editTextMobile = document.querySelectorAll("ac-per-booking-view-switch .b2-openable .b2-view-info, ac-per-booking-mobile > .b2m-view .b2m-view-info").forEach(function (e) {
													e.innerHTML = `Edita tu equipaje`;
												});
												
				var editText2Mobile = document.querySelectorAll("ac-per-booking-view-switch .b2-openable .b2-pax-amount, ac-per-booking-mobile > .b2m-view .b2m-pax-amount").forEach(function (e) {
													e.innerHTML = `por pasajero o por tramo`;
												});
					if(document.querySelector("ac-select-checked-bag ac-per-journey-per-pax-mobile .b2-reset-button")){
						var elm1 = document.querySelector("ac-select-checked-bag ac-per-journey-per-pax-mobile .b2-reset-button");
							elm1.addEventListener('click',listenerButtonAllBookingMobile_checked, false);
					}
				}
			listenerButtonPerBookingMobile_checked();

			var listenerButtonAllBookingMobile_checked = function(evt){
				var textEditBag = document.querySelectorAll("ac-per-booking-view-switch .b2-openable > div > button, ac-per-booking-mobile > .b2m-view > button").forEach(function (e) {
												e.innerHTML = `Editar`;
											});
											
				var editTextMobile = document.querySelectorAll("ac-per-booking-view-switch .b2-openable .b2-view-info, ac-per-booking-mobile > .b2m-view .b2m-view-info").forEach(function (e) {
													e.innerHTML = `Edita tu equipaje`;
												});
												
				var editText2Mobile = document.querySelectorAll("ac-per-booking-view-switch .b2-openable .b2-pax-amount, ac-per-booking-mobile > .b2m-view .b2m-pax-amount").forEach(function (e) {
													e.innerHTML = `por pasajero o por tramo`;
												});
				if(document.querySelector("ac-select-checked-bag ac-per-booking-mobile .b2m-view button")){
						var elm2 = document.querySelector("ac-select-checked-bag ac-per-booking-mobile .b2m-view button");
							elm2.addEventListener('click', listenerButtonPerBookingMobile_checked, false);
					}
			}
			listenerButtonAllBookingMobile_checked();
			
			if(document.querySelector("ac-select-checked-bag ac-per-journey-per-pax-mobile .b2-reset-button")){
				var elm1Checked = document.querySelector("ac-select-checked-bag ac-per-journey-per-pax-mobile .b2-reset-button");
				elm1Checked.addEventListener('click',listenerButtonAllBookingMobile_checked, false);
				
			}
			if(document.querySelector("ac-select-checked-bag ac-per-journey-per-pax .b2-reset-button")){
				var elm1_dChecked = document.querySelector("ac-select-checked-bag ac-per-journey-per-pax .b2-reset-button");
				elm1_dChecked.addEventListener('click',listenerButtonAllBookingMobile_checked, false);
			}
			
			//boton por tramo
			if(document.querySelector("ac-select-checked-bag ac-per-booking-mobile .b2m-view button")){
				var elm2Checked = document.querySelector("ac-select-checked-bag ac-per-booking-mobile .b2m-view button");
				elm2Checked.addEventListener('click', listenerButtonPerBookingMobile_checked, false);
			}
			if(document.querySelector("ac-select-checked-bag ac-per-booking-view-switch button.b2-link-button")){
				var elm2_dChecked = document.querySelector("ac-select-checked-bag ac-per-booking-view-switch button.b2-link-button");
				elm2_dChecked.addEventListener('click', listenerButtonPerBookingMobile_checked, false);
			}
			
			const Maleta = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/79dbe5ad-d743-4dd2-bd38-ecfbf570af49/Equipaje%20facturado.png'
			    

		    

			var css = `
					ac-per-booking-view-switch .b2-openable > div > button{
						border: 1px solid #1c355e;
						padding: 6px 60px 6px 60px;
						border-radius: 10px;
						color: #1c355e;
						background: url(https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/478a9d7c-1135-4605-b8d1-bdb512dbedcb/pencil.png);
						background-repeat: no-repeat;
						background-size: 18px 18px;
						background-position: 77% 51%;
						background-color: #fff;
						font-size: 17px !important;
					}
					ac-per-booking-mobile > .b2m-view > button{
						border: 1px solid #1c355e;
						padding: 3px 40px 3px 40px;
						border-radius: 10px;
						color: #1c355e;
						background: url(https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/478a9d7c-1135-4605-b8d1-bdb512dbedcb/pencil.png);
						background-repeat: no-repeat;
						background-size: 14px 14px;
						background-position: 81% 51%;
						background-color: #fff;
						font-size: 15px !important;
						max-width: 168px;
					}
					ac-per-booking-mobile > .b2m-view > button:hover{
						background-color: #b2292e !important;
						color: #fff;
						border: 1px solid #b2292e;
						background: url(https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/d8a6fed6-2ac5-44a0-b99a-a2d198cabd02/pencil%20%281%29.png);
						background-repeat: no-repeat;
						background-size: 14px 14px;
						background-position: 81% 51%;
						padding: 3px 40px 3px 40px;
						font-size: 15px !important;
					}
					ac-per-booking-view-switch .b2-openable > div > button:hover{
						background-color: #b2292e !important;
						color: #fff;
						border: 1px solid #b2292e;
						background: url(https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/d8a6fed6-2ac5-44a0-b99a-a2d198cabd02/pencil%20%281%29.png);
						background-repeat: no-repeat;
						background-size: 18px 18px;
						background-position: 77% 51%;
						padding: 6px 60px 6px 60px;
						font-size: 17px !important;
					}
					ac-per-booking-view-switch .b2-openable > div > button:after, ac-per-booking-mobile > .b2m-view > button:after{
						display: none;
					}
					.icon-boligrafo{
						width: 17px;
						position: relative;
						top: 0.1rem;
						left: 0.5rem;
					}
				`,
				  head = document.head || document.getElementsByTagName('head')[0],
				  style = document.createElement('style');

				head.appendChild(style);

				style.type = 'text/css';
				if (style.styleSheet) {
				  // This is required for IE8 and below.
				  style.styleSheet.cssText = css;
				} else {
				  style.appendChild(document.createTextNode(css));
				}
		}
		 }
        });
	}
}, 400);