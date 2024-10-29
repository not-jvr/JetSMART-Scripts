var initRapiPago = setInterval(function () {
	clearInterval(initRapiPago);
	(function() {

		var css = `
		@import url('https://fonts.googleapis.com/css?family=Lato:400,700,900');

  body{
   margin: 0;
 }
 
 #topbar {
   display: none;
 }
 
 #topbar2 {
   width: 100%;
   height: 100px;
   font-family: Lato,sans-serif;
   margin: 0;
   padding: .3em .5em .1em;
   color: #FFFFFF;
   background-color: #b82033;
   position: block;
   z-index: 10;
   margin-top: 30px;
 }
 
 .tb-content-wrapper {
   text-align: center;
 }
 
 .tb-content-wrapper p {
   margin-top: 0;
   margin-bottom: 0;
 }
 
 .tb-text-wrapper {
   margin-right: .67em;
   display: inline-block;
   line-height: 1.3;
 }
 
 .tb-text-wrapper .tb-headline-text {
   font-size: 1em;
   display: inline-block;
   vertical-align: middle;
   margin-top: 7px;
 }
 
 .tb-close-wrapper {
   display: table-cell;
   width: 1.6em;
 }
 
 .tb-close-wrapper .icon-close {
   font-size: 14px;
   top: 105px;
   right: 25px;
   width: 15px;
   height: 15px;
   color: #FFFFFF;
   cursor: pointer;
   position: absolute;
   text-align: center;
   line-height: 15px;
   z-index: 1000;
   text-decoration: none;
 }
 
 .span-text-1{
   float: left;
   margin-top: 32px;
   margin-right: 10px;
 }
 
 .span-text-2{
   float: left;
   margin-top: 32px;
   margin-left: 10px;
 }
 
 .flipdown .rotor-group:nth-child(1) .rotor-group-heading:before {
   content: "Días";
 }
 
 @media (max-width: 1024px) {
    #topbar2 {
      margin-top: 0px;
    }
    .tb-close-wrapper .icon-close {
      top: 76px;  
    }
  }

  @media (max-width: 992px) { 
    .span-text-1, .span-text-2, .span-countdown{
      width: 100%;
      margin-top: 5px;
      margin-left: 0px;
      margin-right: 0px;
    }

    .flipdown{
      margin:0 auto;
    }
    
    .span-countdown {
      text-align: center;
      display: block;
    }

    #topbar2{
      height: 140px;
    }
  }

  @media (max-width: 576px) { 
    .hidden-mobile {
      display: none;
    }
    .flipdown .rotor {
      font-size: 1.8rem;
      margin-right: 3px;
    }
    .flipdown .rotor-leaf, .flipdown .rotor {
      height: 30px;
    }
    .flipdown .rotor-leaf-front, .flipdown .rotor-leaf-rear, .flipdown .rotor-top, .flipdown .rotor-bottom, .flipdown .rotor:after {
      height: 15px;
    }
    .flipdown .rotor-leaf-front, .flipdown .rotor-top {
      line-height: 30px;
    }

    .flipdown .rotor-group:nth-child(n+2):nth-child(-n+3):before {
      bottom: 8px;
    }
    .flipdown .rotor-group:nth-child(n+2):nth-child(-n+3):after {
      bottom: 16px;
    }
    .flipdown .rotor-group:nth-child(n+2):nth-child(-n+3):before, .flipdown .rotor-group:nth-child(n+2):nth-child(-n+3):after {
      left: 65px;
    }
    .flipdown .rotor-group:nth-child(n+2):nth-child(-n+3):before, .flipdown .rotor-group:nth-child(n+2):nth-child(-n+3):after {
      height: 5px;
      width: 5px;
    }
    .flipdown {
      height: 50px;
      width: 282px;
    }
    .span-text-1, .span-text-2, .span-countdown {
      margin-top: 2px;
    }
    .flipdown .rotor-group {
      padding-right: 10px;
    }
    .tb-text-wrapper {
      margin-right: 0;
    }
    .tb-close-wrapper .icon-close {
      top: 62px;
      right: 15px;
    }
    img.img-number{
      width: 25px;
    }

    span.c img{
      height: 38px;
    }

    span.a, span.d{
      font-size: 11px;
    }

     
   }
		`;
		var style = document.createElement('style');
		style.type = 'text/css';
		style.appendChild(document.createTextNode(css));
		document.head.appendChild(style);

		var html = `
		<div id="topbar2" class="topbar2">
		<div class="tb-content-wrapper">
		<div class="tb-text-wrapper">
		<div class="tb-headline-text">
		<div>
		<span class="span-text-1"></span>
		<span class="span-countdown">
		<span id="flipdown" class="flipdown flipdown flipdown__theme-light"></span>
		</span>
		<span class="span-text-2"> </span>
		</div>
		</div>
		</div>
		</div>
		</div>
		`;
		var div = document.createElement('div');
		div.innerHTML = html;
		document.body.insertBefore(div, document.body.firstChild);

		var script = document.createElement('script');
		script.src = 'https://jetsmart.com/ar/es/minisitios/_static/smart-week/js/flipdown.js';
		script.async = true;
		document.head.appendChild(script);

		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = 'https://jetsmart.com/ar/es/minisitios/_static/smart-week/css/flipdown.css';
		document.head.appendChild(link);

		script.onload = function() {
    // Código JavaScript original
			var spanText;
			switch(window.location.pathname) {
			case '/ar/es/':
				spanText = '<span class="hidden-mobile"><b>Aprovecha</b></span><span><b>Compra HOY tu próximo viaje:</b></span>';
				break;
			case '/cl/es/':
				spanText = '<span class="hidden-mobile"><b>Aprovecha</b></span><span><b>Compra HOY tu próximo viaje:</b></span>';
				break;
			case '/pe/es/':
				spanText = '<span class="hidden-mobile"><b>Aprovecha</b></span><span><b>Compra HOY tu próximo viaje:</b></span>';
				break;
			}

			function insertBefore(el, referenceNode) {
				referenceNode.parentNode.insertBefore(el, referenceNode);
			}

			var topbar = document.getElementById('topbar2');
			document.querySelector('#topbar2 .span-text-1').innerHTML = spanText;
			var ref = document.querySelector('.site-content');
			ref.style.paddingTop = '0px';

    //oculta la notificación
			function toggle_visibility(id) {
				var e = document.getElementById(id);
				e.style.display = 'none';
				var ref = document.querySelector('.site-content');
				ref.style.paddingTop = '';
			}

			insertBefore(topbar, ref);
			var flipdown = new FlipDown(new Date(2023,11,02,9,59,59).getTime()/1000).start()
		};
	})();

}, 400);