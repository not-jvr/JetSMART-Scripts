var initHideFacturas = setInterval(function(){
	if(!document.querySelector("body > div > div > div > ac-reservations-page > div > div:nth-child(4) > ac-cug-confirmed-reservations > div.flex.items-center.flex-col.sm\\:flex-row.justify-end.mt-8 > button:nth-child(1)")
		) return;
		clearInterval(initHideFacturas);
	var classname = document.getElementsByClassName('menu-button with-flag  ');
	var subclass = classname[0].children
	var span = subclass[1]
	var culture = span.textContent.trim()
	if(culture != 'Chile'){
		document.querySelector("body > div > div > div > ac-reservations-page > div > div:nth-child(4) > ac-cug-confirmed-reservations > div.flex.items-center.flex-col.sm\\:flex-row.justify-end.mt-8 > button:nth-child(1)").style.display = 'none';
	}
}, 200);

