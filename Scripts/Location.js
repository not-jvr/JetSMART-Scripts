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
})();