var initFullClick = setInterval(function () {
	if (typeof bookingData === "undefined") return;
	clearInterval(initFullClick);
	var culture = bookingData.Culture;
	if (culture) {
		window.eventBus.subscribe({
			name: "fullclick",
			callback: function (e) {
				const smartFeeButtons = document.querySelectorAll('.smart-fee.nowrap.big, .discount-fee.nowrap.small, .smart-fee.nowrap.small, .discount-fee.nowrap.big, [data-test-id="bundle-edit-selected--j|0"], [data-test-id="bundle-edit-selected--j|1"]');
				const buttonClickH = function () {
					const targetElements = document.querySelectorAll('[data-test-value="BND0"], [data-test-value="BND1"], [data-test-value="BND2"], [data-test-value="BNC0"], [data-test-value="BNC1"], [data-test-value="BNC2"], [data-test-id="bundle-button-mobile--c|none"], [data-test-id="bundle-button-mobile--c|full"], [data-test-id="bundle-button-mobile--c|simple"]');
					const buttonClickBund = function () {
						const bannerContainers = document.querySelectorAll('.bundle-upgrade-offer-container');
						bannerContainers.forEach(function(bannerContainer) {
							setTimeout(function() {
								bannerContainer.addEventListener('click', function() {
									const upgradeButton = bannerContainer.querySelector('.bundle-upgrade-button');
									upgradeButton.click();
								});
							}, 500);
						});
					};
					targetElements.forEach(button => button.addEventListener('click', buttonClickBund));
				};
				smartFeeButtons.forEach(button => button.addEventListener('click', buttonClickH));
			}
		});
	}
	}, 800);