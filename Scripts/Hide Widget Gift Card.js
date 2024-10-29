  var initHideWidgetGiftCard = setInterval(function () {
  	if (window.location.pathname !== '/V2/Profile') return;
  	clearInterval(initHideWidgetGiftCard);

  	var widgetGiftCard = document.querySelector('.profile-widget.profile-giftcard-widget');
  	if(widgetGiftCard){
  		widgetGiftCard.style.display = 'none';
  	}

  }, 400);