var initChanges_forceAsientos = setInterval(function(){
	if(!document.querySelector("ac-seat-recommendator") || typeof bookingData === "undefined" || (window.location.pathname !== '/Seat/Map')) return;
	clearInterval(initChanges_forceAsientos);
	var culture = bookingData.Culture;
	var count = bookingData.PassengersAdultCount + bookingData.PassengersChildCount
	var bundleOut = bookingData.OutboundBundleCode
	var bundleReturn = bookingData.ReturnBundleCode
	var user = bookingData.Role
	if(user === 'WWW Member'){
		var BE = bookingData.AgentProgramDetails[0].ProgramCode
	}
	if(culture === 'es-CL' && count < 2 && bundleOut != 'BND1' && bundleOut != 'BND2' && bundleReturn != 'BND1' && bundleReturn != 'BND2' && BE != 'BEC'){
		const buttonForce = document.querySelector("ac-side-panel ac-seat-recommendator > div > div:nth-child(2) > div:nth-child(1) button");
		if(buttonForce){
			buttonForce.click()
		}
    /////Banner Desktop first force/////
		if(document.querySelector('.seatmap-recommendator-banner')){
			var bannerIdaDesktop = document.querySelector("#mainContentWrapper > div:nth-child(3) > ac-seatmap > section > div > div.row > div > div > ac-side-panel > div > div.seatmap-info-content.hidden-md-down > div.seatmap-recommendator-banner")
			var bannerCopyIdaDesktop = bannerIdaDesktop.cloneNode(true);
			bannerCopyIdaDesktop.id = "bannerCopyOriginal"
			var fondoBanner = document.querySelector("#mainContentWrapper > div:nth-child(3) > ac-seatmap > section > div > div.row > div > div > ac-side-panel > div > div.seatmap-info-content.hidden-md-down > h1")
			fondoBanner.parentNode.insertBefore(bannerCopyIdaDesktop, fondoBanner)
			const element = document.querySelector(".seatmap-recommendator-banner");
			const text = element.textContent.trim();
			const seat = text.match(/\d+[A-Z]/g)[0];
	////// funcion seleccionar asiento ///////
			function clickSeat(num,seat) {
				const seatId = `seatmap-seat--j|${num}-c|${seat}`;
				const seatElement = document.querySelector(`[data-test-id="${seatId}"]`);
				seatElement.click();
			}
	////////////////////////////////////////
			setTimeout(function() {
				clickSeat(0,seat);
			}, 500); 
		}
		var eventAssigned = false;
		var created = false;
		var firsttime = false;
    //////////////////////////////////////////////FUNCION/////////////////////////////////////////////////////////
		window.eventBus.subscribe({
			name: "force_button", callback: function (e) {
				if(eventAssigned) return;
				eventAssigned = true;
				const buttonVueltaDesktop = document.querySelectorAll("[data-test-id='seatmap-direction-switch--j|1']");
				const buttonClickVueltaDesktop = function () {
					var bannerIdaDesktop = document.querySelector("#mainContentWrapper > div:nth-child(3) > ac-seatmap > section > div > div.row > div > div > ac-side-panel > div > div.seatmap-info-content.hidden-md-down > div.seatmap-recommendator-banner").style.display = 'none'
					if(created){
						document.getElementById("bannerCopyOriginal").style.display = "none";
					}
					setTimeout(function() {
						console.log("chaoDesktop")
						if(buttonForce){
							let bannerVuelta = document.querySelector('[data-test-id="seatmap-recommendator-banner--j|1"]');
							if (bannerVuelta) {
								var bannerVueltaCopy = bannerVuelta.cloneNode(true);
								bannerVueltaCopy.id = "bannerCopyVuelta"
								var fondoBanner = document.querySelector("#mainContentWrapper > div:nth-child(3) > ac-seatmap > section > div > div.row > div > div > ac-side-panel > div > div.seatmap-info-content.hidden-md-down > h1")
								if(!created){
									console.log("ñau")
									fondoBanner.parentNode.insertBefore(bannerVueltaCopy, fondoBanner)
									created = true;
								}
								if(created){
									document.getElementById("bannerCopyVuelta").style.display = "flex";
								}
							}
							if(buttonForce){ 
								buttonForce.click()
							}
							if(!firsttime){
								const element2 = document.querySelector(".seatmap-recommendator-banner");
								const text2 = element2.textContent.trim();
								const seat2 = text2.match(/\d+[A-Z]/g)[0];
								firsttime = true;
								console.log(seat2)
								setTimeout(function() {
									console.log("laggg")
									clickSeat(1,seat2);
								}, 500); 
							}
						}
					}, 800); 
				};
				buttonVueltaDesktop.forEach(button => button.addEventListener('click', buttonClickVueltaDesktop));
				const buttonIdaDesktop = document.querySelectorAll("[data-test-id='seatmap-direction-switch--j|0']");
				const buttonClickIdaDesktop = function () {
					var bannerIdaDesktop = document.querySelector("#mainContentWrapper > div:nth-child(3) > ac-seatmap > section > div > div.row > div > div > ac-side-panel > div > div.seatmap-info-content.hidden-md-down > div.seatmap-recommendator-banner").style.display = 'none'
					if(created){
						document.getElementById("bannerCopyVuelta").style.display = "none"; 
					}
					setTimeout(function() {
						console.log("holaDesktop");
						if(created){
							document.getElementById("bannerCopyOriginal").style.display = "flex";
						}
						if(buttonForce){ 
							buttonForce.click()
						}
					}, 800);
				};
				buttonIdaDesktop.forEach(button => button.addEventListener('click', buttonClickIdaDesktop));
				setTimeout(function() {
					const buttonContinue = document.querySelectorAll("[data-test-id='seatmap-continue-button']");
					const buttonClickContinue = function () {
						var bannerIdaDesktop = document.querySelector("#mainContentWrapper > div:nth-child(3) > ac-seatmap > section > div > div.row > div > div > ac-side-panel > div > div.seatmap-info-content.hidden-md-down > div.seatmap-recommendator-banner").style.display = 'none'
						if(created){
							document.getElementById("bannerCopyOriginal").style.display = "none";
						}
						setTimeout(function() {
							console.log("CONTINUE")
							if(buttonForce){
								let bannerVuelta = document.querySelector('[data-test-id="seatmap-recommendator-banner--j|1"]');
								if (bannerVuelta) {
									var bannerVueltaCopy = bannerVuelta.cloneNode(true);
									bannerVueltaCopy.id = "bannerCopyVuelta"
									var fondoBanner = document.querySelector("#mainContentWrapper > div:nth-child(3) > ac-seatmap > section > div > div.row > div > div > ac-side-panel > div > div.seatmap-info-content.hidden-md-down > h1")
									if(!created){
										fondoBanner.parentNode.insertBefore(bannerVueltaCopy, fondoBanner)
										created = true;
									}
									if(created){
										document.getElementById("bannerCopyVuelta").style.display = "flex";
									}
								}
								if(buttonForce){ 
									buttonForce.click()
								}
								if(!firsttime){
									const element2 = document.querySelector(".seatmap-recommendator-banner");
									const text2 = element2.textContent.trim();
									const seat2 = text2.match(/\d+[A-Z]/g)[0];
									firsttime = true;
									console.log(seat2)
									setTimeout(function() {
										console.log("laggg")
										clickSeat(1,seat2);
									}, 500); 
								}
							}
						}, 800); 
					};
					buttonContinue.forEach(button => button.addEventListener('click', buttonClickContinue));
				}, 800); 
			}
		});
}	
}, 200);