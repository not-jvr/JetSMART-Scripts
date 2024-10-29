var initFixLinks = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2/itinerary') return;
  clearInterval(initFixLinks);

  function fixLinksClcik() {
    var links = document.querySelectorAll('.rw-terms-link');

    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            var href = event.target.getAttribute('href');
            window.open(href, '_blank');
        });
    });
}

fixLinksClcik();

}, 600);