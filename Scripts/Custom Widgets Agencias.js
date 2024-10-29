var initChangeWidgetsAgencia = setInterval(function () {
	if ((!window.location.pathname.toLowerCase().startsWith('/v2agency/summary') && !window.location.pathname.toLowerCase().startsWith('/v2/agency/summary'))) return;
	clearInterval(initChangeWidgetsAgencia);

	function esEmpresa() {
		var elemento = document.querySelector('.cug2b-container.flex.items-center.h-full.relative');
		var imagen = elemento.querySelector('img');
		var esSrcCorrecto = imagen && imagen.getAttribute('src') === "/Images/Cug22/cug-logo-company-white-es.svg";

		if (esSrcCorrecto) {
			return true;
		} else {
			return false;
		}
	}

///WIDGET_1/////

	function changeImageDesktopWidget1(selector) {
		var div = document.querySelector('.cug2b-frame .cug2b-summary-banner.hidden-sm-down');
		if (div) {
			var newImageUrl = selector;
			div.style.backgroundImage = 'url(' + newImageUrl + ')';
		}
	}

	function changeImageTabletWidget1(selector) {
		var div = document.querySelector('.cug2b-frame .cug2b-summary-banner.hidden-xs.hidden-md-up');
		if (div) {
			var newImageUrl = selector;
			div.style.backgroundImage = 'url(' + newImageUrl + ')';
		}
	}

	function changeImageMobileWidget1(selector) {
		var div = document.querySelector('.cug2b-frame .cug2b-summary-banner.hidden-sm-up');
		if (div) {
			var newImageUrl = selector;
			div.style.backgroundImage = 'url(' + newImageUrl + ')';
		}
	}

	function allImagesChangesWidget1() {
	//WIDGET 4//
	//Link entremedio de comillas simples, SI NO DESEO MODIFICAR POR EJEMPLO, LA DE TABLET, COMENTAR CON // AL PRINCIPIO DEJANDOLO //changeImageTablet('')
	var imageDesktop = ''; //link desktop
	var imageTablet = ''; //link tablet
	var imageMobile = ''; //link mobile

	changeImageDesktopWidget1(imageDesktop);   
	changeImageTabletWidget1(imageTablet);    
	changeImageMobileWidget1(imageMobile);    
}

///////////////

///WIDGET_2///

function changeImageDesktopWidget2(selector) {
	var div = document.querySelector('ac-cug-group-booking-widget .cug2b-widget.hidden-sm-down');
	if (div) {
		var newImageUrl = selector;
		div.style.backgroundImage = 'url(' + newImageUrl + ')';
	}
}

function changeImageTabletWidget2(selector) {
	var div = document.querySelector('ac-cug-group-booking-widget .cug2b-widget.hidden-xs.hidden-md-up');
	if (div) {
		var newImageUrl = selector;
		div.style.backgroundImage = 'url(' + newImageUrl + ')';
	}
}

function changeImageMobileWidget2(selector) {
	var div = document.querySelector('ac-cug-group-booking-widget .cug2b-widget.hidden-sm-up');
	if (div) {
		var newImageUrl = selector;
		div.style.backgroundImage = 'url(' + newImageUrl + ')';
	}
}

function hideButtonWidget2() {
	var buttons = document.querySelectorAll('ac-cug-group-booking-widget .rounded-primary-btn');

	buttons.forEach(function(button) {
		button.style.display = 'none';
	});
}

function changeButtonTextWidget2() {
	var buttons = document.querySelectorAll('ac-cug-group-booking-widget .rounded-primary-btn');

	buttons.forEach(function(button) {
        button.textContent = 'Nuevo texto aquí'; //AQUÍ TEXTO DESEADO PARA EL BOTON
    });
}

function allImagesChangesWidget2() {
	//WIDGET 2//
	//Link entremedio de comillas simples, SI NO DESEO MODIFICAR POR EJEMPLO, LA DE TABLET, COMENTAR CON // AL PRINCIPIO DEJANDOLO //changeImageTablet('')
	var imageDesktop = ''; //link desktop
	var imageTablet = ''; //link tablet
	var imageMobile = ''; //link mobile

	changeImageDesktopWidget2(imageDesktop);   
	changeImageTabletWidget2(imageTablet);    
	changeImageMobileWidget2(imageMobile);    
}

///////////////

///WIDGET_3///

function changeImageDesktopWidget3(selector) {
	var div = document.querySelector('ac-cug-destinations-widget .cug2b-widget.hidden-sm-down');
	if (div) {
		var newImageUrl = selector;
		div.style.backgroundImage = 'url(' + newImageUrl + ')';
	}
}

function changeImageTabletWidget3(selector) {
	var div = document.querySelector('ac-cug-destinations-widget .cug2b-widget.hidden-xs.hidden-md-up');
	if (div) {
		var newImageUrl = selector;
		div.style.backgroundImage = 'url(' + newImageUrl + ')';
	}
}

function changeImageMobileWidget3(selector) {
	var div = document.querySelector('ac-cug-destinations-widget .cug2b-widget.hidden-sm-up');
	if (div) {
		var newImageUrl = selector;
		div.style.backgroundImage = 'url(' + newImageUrl + ')';
	}
}

function hideButtonWidget3() {
	var buttons = document.querySelectorAll('ac-cug-destinations-widget .rounded-primary-btn');

	buttons.forEach(function(button) {
		button.style.display = 'none';
	});
}

function changeButtonTextWidget3() {
	var buttons = document.querySelectorAll('ac-cug-destinations-widget .rounded-primary-btn');

	buttons.forEach(function(button) {
        button.textContent = 'Nuevo texto aquí'; //AQUÍ TEXTO DESEADO PARA EL BOTON
    });
}

function allImagesChangesWidget3() {
	//WIDGET 3//
	//Link entremedio de comillas simples, SI NO DESEO MODIFICAR POR EJEMPLO, LA DE TABLET, COMENTAR CON // AL PRINCIPIO DEJANDOLO //changeImageTablet('')
	var imageDesktop = ''; //link desktop
	var imageTablet = ''; //link tablet
	var imageMobile = ''; //link mobile

	changeImageDesktopWidget3(imageDesktop);   
	changeImageTabletWidget3(imageTablet);    
	changeImageMobileWidget3(imageMobile);    
}

///////////////

///WIDGET_4///

function changeImageDesktopWidget4(selector) {
	var div = document.querySelector('ac-cug-agency-fee-widget .cug2b-widget.w-full.hidden-sm-down');
	if (div) {
		var newImageUrl = selector;
		div.style.backgroundImage = 'url(' + newImageUrl + ')';
	}
}

function changeImageTabletWidget4(selector) {
	var div = document.querySelector('ac-cug-agency-fee-widget .cug2b-widget.w-full.hidden-xs.hidden-md-up');
	if (div) {
		var newImageUrl = selector;
		div.style.backgroundImage = 'url(' + newImageUrl + ')';
	}
}

function changeImageMobileWidget4(selector) {
	var div = document.querySelector('ac-cug-agency-fee-widget .cug2b-widget.w-full.hidden-sm-up');
	if (div) {
		var newImageUrl = selector;
		div.style.backgroundImage = 'url(' + newImageUrl + ')';
	}
}

function allImagesChangesWidget4() {
	//WIDGET 4//
	//Link entremedio de comillas simples, SI NO DESEO MODIFICAR POR EJEMPLO, LA DE TABLET, COMENTAR CON // AL PRINCIPIO DEJANDOLO //changeImageTablet('')
	var imageDesktop = ''; //link desktop
	var imageTablet = ''; //link tablet
	var imageMobile = ''; //link mobile

	changeImageDesktopWidget4(imageDesktop);   
	changeImageTabletWidget4(imageTablet);    
	changeImageMobileWidget4(imageMobile);    
}

///FUNCIONES///

/* Para modificar imagenes hay que buscar las funciones allImagesChangesWidgetNUMERO segun el widget q deseamos modificar y ahí agregar los urls de las imagenes.
	Para ocultar boton del widget 2 o 3, utilizar la funcion hideButtonWidgetNUMERO correspondiente, si desean cambiar nombre ir a la funcion changeButtonTextWidgetNUMERO correspondiente y colocar el texto nuevo.
	Se dejara todo comentado, es decir con // antes de la funcion, si desea utilizar una, quitar el // */

if (!esEmpresa()) {
	//widget_1
	//allImagesChangesWidget1();

	//widget_2
	//allImagesChangesWidget2();
	//hideButtonWidget2();
	//changeButtonTextWidget2();

	//widget_3
	//allImagesChangesWidget3();
	//hideButtonWidget3();
	//changeButtonTextWidget3();

	//widget_4
	//allImagesChangesWidget4();
}

/////////////

}, 600);