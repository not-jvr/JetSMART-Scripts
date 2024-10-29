var initHideSBUAT = setInterval(function() {
	if (!window.location.href.startsWith('https://uat.jetsmart.dev/cl/es/')) return;
	clearInterval(initHideSBUAT);

	var searchBox = document.querySelector('[data-test-id="SEARCHBOX_CONTAINER"]');

	function hideSearchBox() {
		var searchBox = document.querySelector('[data-test-id="SEARCHBOX_CONTAINER"]');
		if (searchBox) {
			searchBox.style.display = 'none';
		}
	}


	hideSearchBox();
	
}, 600);