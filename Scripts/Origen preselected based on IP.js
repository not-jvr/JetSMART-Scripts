var initAutoSelectCity = setInterval(function () {
  if (!document.querySelector('[data-test-id="ROUTE_ORIGIN_INPUT"]') || window.location.pathname !== '/cl/es/') return;
  clearInterval(initAutoSelectCity);

  async function getIPLocation() {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return {
      city: data.city,
      country: data.country_name
    };
  }

  (async () => {
    const userLocation = await getIPLocation();
    console.log('User country:', userLocation.country);
    console.log('User city:', userLocation.city);

    const cityCodes = {
      "Santiago": "SCL",
      "Arica": "ARI",
      "Iquique": "IQQ",
      "Calama": "CJC",
      "Antofagasta": "ANF",
      "La Serena": "LSC",
      "Concepcion": "CCP",
      "Temuco": "ZCO",
      "Puerto Montt": "PMC",
      "Chiloe": "MHC",
      "Balmaceda": "BBA",
      "Puerto Natales": "PNT",
      "Punta Arenas": "PUQ"
    };

    let cityCode;

    if (cityCodes.hasOwnProperty(userLocation.city)) {
      cityCode = cityCodes[userLocation.city];
    } else {
      cityCode = "SCL"; // Si la ciudad del usuario no está en cityCodes, selecciona Santiago por defecto.
    }

    console.log('City code:', cityCode);

    const select = document.querySelector(".dg-location-selector");

    let ready = false;

    if (document.querySelector('[data-test-id="ROUTE_ORIGIN_INPUT"]') && !ready) {
      select.style.display = "none";
      const originInput = document.querySelector('[data-test-id="ROUTE_ORIGIN_INPUT"]');
      originInput.click();

      setTimeout(() => {
        const cityOrigen = document.querySelector(`[data-test-value="${cityCode}"]`);
        if (cityOrigen) {
          cityOrigen.click();
        }
      }, 500);

      if (window.innerWidth >= 768) {
        setTimeout(() => {
          const openLocations = document.querySelector(".dg-tab.dg-flights.dg-for-loader");
          if (openLocations) {
            openLocations.click();
            ready = true;

            if (ready) {
              select.style.display = "block";
            }
          }
        }, 1000);
      }

      if (window.innerWidth < 768) {
        setTimeout(() => {
          const xButton = document.querySelector('.dg-location-selector span:last-child');
          if(xButton){
            xButton.click();
            ready = true;
            if(ready){
              select.removeAttribute('style');
            }
          } 
        }, 1000);
        
      }
    }
  })();
}, 500);