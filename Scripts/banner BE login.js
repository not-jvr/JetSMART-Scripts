var initBannerBE = setInterval(function () {
  if (typeof bookingData === "undefined") return;
  clearInterval(initBannerBE);
  var culture = bookingData.Culture;
  //////primera carga//////
  if(bookingData.Culture == "es-CL" && !document.querySelector('#img') && document.querySelector('ul.login-member-list')){
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);

    if(bookingData.Culture == "es-CL" && urlParams.has('agency') == false){
      var d1 = document.querySelector('#mainContentWrapper > section > div > div:nth-child(1) > ul');
      d1.insertAdjacentHTML('afterend', '<div id="img"><a href="https://booking.jetsmart.com/V2/Login?bancoe=1&culture=es-CL&url=https://jetsmart.com/cl/es/"><img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/9c3d69e5-80e9-4c0d-a2a7-b205f1764b07/Banner%20Banco%20Estado%20-%20Desktop.png" width="100%"/></a></div>');
  }else if(bookingData.Culture == "es-CL" && urlParams.has('agency') == true){
      var d2 = document.querySelector('#mainContentWrapper > section > div > div:nth-child(1) > div');
      d2.insertAdjacentHTML('afterend', '<div id="img"><a href="https://booking.jetsmart.com/V2/Login?bancoe=1&culture=es-CL&url=https://jetsmart.com/cl/es/"><img src="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/9c3d69e5-80e9-4c0d-a2a7-b205f1764b07/Banner%20Banco%20Estado%20-%20Desktop.png" width="100%"/></a></div>');
      document.querySelector('#img').style.display = "none";
  }
  
  var radios = document.getElementsByName('loginType');
  for (var i = 0; i < radios.length; i++) {
     radios[i].onchange = function () {
         if(this.value == "B2B" || this.value == "BE"){
             document.querySelector('#img').style.display = "none";
         }else{
             document.querySelector('#img').style.display = "block";
         }
     }
 }
 var img = document.querySelector('#img img');

 if (window.innerWidth <= 768) {

     img.setAttribute('src', 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/c571cbd4-902e-4617-b5b3-ef2822fad2e7/Banner%20Banco%20Estado%20-%20Mobile.png'); 
 }
}
////////////////////////
if (culture === 'es-CL') {
    var initBannerBE = function () {
      document.querySelectorAll('.logintype-tabs').forEach(function (e) {
      });
  };
}
}, 200);