var initbannerClubDesc = setInterval(function () {
  if(typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
  const bannerWrapper = document.querySelector('.flight-button-container .banner-wrapper');
  const bannerLoader = document.querySelector('.banner-wrapper .banner-container-loader');
  const bannerCD = document.querySelector('.banner-wrapper .dc-banner-container');

  if (bannerWrapper) {
    const flightButtonContainer = bannerWrapper.parentNode;
    flightButtonContainer.insertAdjacentElement('beforebegin', bannerWrapper);
  }
  if(bannerLoader && bannerCD){
    bannerLoader.style.display = 'none';
  }
}, 300);