var initBannerEmpresasAgencias = setInterval(function () {
  if (typeof JetSmart === "undefined") return;
  var culture =  JetSmart.AppContext.culture;

  if(!document.querySelector('#imgPortales') && document.querySelector('ul.login-member-list')){
    var css = `
    #btn-portales {
      margin: 0 auto 15px;
      margin-right: 3%;
      margin-left: 3%;
      background-color: rgb(44,52,56);
      border-color: rgb(44,52,56);
      width: 80%;
      font-family: Lato,sans-serif;
    }

    #btn-portales:hover {
      color: rgb(44,52,56);
      background-color: rgb(255,255,255);
    }

    .col-xs-1.col-md-1-2 {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 0vh;
    }

    @media (max-width: 768px) {
      #btn-portales {
        margin: 5px;
        min-width: auto;
        font-size: 13px;
        height: 30px;
        line-height: 5px;
      }
    }

    @media (max-width: 568px) {
      #btn-portales {
        margin: 5px;
        min-width: auto;
        font-size: 13px;
        height: 30px;
        line-height: 5px;
      }
    }

    @media (max-width: 459px) {
      #btn-portales {
        margin: 5px;
        min-width: auto;
        font-size: 13px;
        height: 30px;
        line-height: 5px;
      }
    }
    `;

    var style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

  // Ocultar elementos existentes
    var titulo = document.querySelector('div.title.full-width-title');
    titulo.style.display = 'none';

    var cuerpo = document.querySelector('div.login-body');
    cuerpo.style.display = 'none';

    var cuerpo2 = document.querySelector('ul.login-member-list');
    cuerpo2.style.display = 'none';

    if(culture != 'es-CL'){
      var contenedorPrincipal = document.querySelector('ul.login-member-list');
      var nuevoContenedor = document.createElement("div");
      nuevoContenedor.style.position = "relative";
      nuevoContenedor.style.marginTop = "auto";
      nuevoContenedor.style.marginBottom = "auto";
    }

    if(culture === 'es-CL'){
      if(document.getElementById("img")){
        var contenedor = document.getElementById("img");
      }else{
        var contenedor = document.querySelector('ul.login-member-list');
      }
      var nuevoContenedor = document.createElement("div");
      nuevoContenedor.style.position = "relative";
    }

    var empresaUrl = 'https://jetsmart.com/cl/es/';
    var agenciaUrl = 'https://jetsmart.com/cl/es/';
    switch (culture) {
    case 'es-CL':
      empresaUrl = 'https://booking.jetsmart.com/V2/Login?company=1&culture=es-cl&url=https://jetsmart.com/cl/es/';
      agenciaUrl = 'https://booking.jetsmart.com/V2/Login?agency=1&culture=es-cl&url=https://jetsmart.com/cl/es/';
      break;
    case 'es-PE':
      empresaUrl = 'https://booking.jetsmart.com/V2/Login?culture=es-PE&company=1&url=https://jetsmart.com/cl/es/';
      agenciaUrl = 'https://booking.jetsmart.com/V2/Login?culture=es-PE&agency=1&url=https://jetsmart.com/cl/es/';
      break;
    case 'es-AR':
      empresaUrl = 'https://booking.jetsmart.com/V2/Login?company=1&culture=es-ar&url=https://jetsmart.com/ar/es/';
      agenciaUrl = 'https://booking.jetsmart.com/V2/Login?agency=1&culture=es-ar&url=https://jetsmart.com/ar/es/';
      break;
    case 'es-CO':
      empresaUrl = 'https://booking.jetsmart.com/V2/Login?culture=es-CO&company=1&url=https://jetsmart.com/ar/es/';
      agenciaUrl = 'https://booking.jetsmart.com/V2/Login?culture=es-CO&agency=1&url=https://jetsmart.com/ar/es/';
      break;
    case 'es-PY':
      empresaUrl = 'https://booking.jetsmart.com/V2/Login?culture=es-PY&company=1&url=https://jetsmart.com/ar/es/';
      agenciaUrl = 'https://booking.jetsmart.com/V2/Login?culture=es-PY&agency=1&url=https://jetsmart.com/ar/es/';
      break;
    case 'es-UY':
      empresaUrl = 'https://booking.jetsmart.com/V2/Login?culture=es-UY&company=1&url=https://jetsmart.com/ar/es/';
      agenciaUrl = 'https://booking.jetsmart.com/V2/Login?culture=es-UY&agency=1&url=https://jetsmart.com/ar/es/';
      break;
    case 'pt-BR':
      empresaUrl = 'https://booking.jetsmart.com/V2/Login?culture=pt-BR&company=1&url=https://jetsmart.com/ar/es/';
      agenciaUrl = 'https://booking.jetsmart.com/V2/Login?culture=pt-BR&agency=1&url=https://jetsmart.com/ar/es/';
      break;
    case 'en-US':
      empresaUrl = 'https://booking.jetsmart.com/V2/Login?culture=en-US&company=1&url=https://jetsmart.com/ar/es/';
      agenciaUrl = 'https://booking.jetsmart.com/V2/Login?culture=en-US&agency=1&url=https://jetsmart.com/ar/es/';
      break;
    }

    var codigoHTML = `
    <div id="imgPortales">
    <a>
    <img src="${culture === 'pt-BR' ? 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/f3ca7188-a91f-471a-ad53-9acbe428963e/Banner%20Portal%20E%26A%20-%20Desktop%20-%20PT.png' : culture === 'en-US' ? 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/1d5c905d-a20e-4b88-86d7-7aa8dfe0614b/Banner%20Portal%20E%26A%20-%20Desktop%20-%20EN.png' : 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/952856b3-ba31-4bc2-869f-95035775a665/Banner%20Portal%20E%26A%20-%20Desktop1.png'}" width="100%">
    </a>
    <div style="position: absolute; bottom: 10px; display: flex; justify-content: space-between; width: 100%;">
    <a id="btn-portales" href="${agenciaUrl}" class="rounded-primary-btn portales" style="margin-left: 10px;"><!---->${culture === 'en-US' ? 'Agency' : culture === 'pt-BR' ? 'Agência' : 'Agencia'}<!----></a>
    <a id="btn-portales" href="${empresaUrl}" class="rounded-primary-btn portales" style="margin-right: 10px;"><!---->${culture === 'en-US' ? 'Company' : culture === 'pt-BR' ? 'Empresa' : 'Empresa'}<!----></a>
    </div>
    </div>
    `;
    if(culture != 'es-CL'){
      nuevoContenedor.insertAdjacentHTML("beforeend", codigoHTML);
      contenedorPrincipal.insertAdjacentElement("afterend", nuevoContenedor);
    }
    if(culture === 'es-CL'){
      nuevoContenedor.insertAdjacentHTML("beforeend", codigoHTML);
      contenedor.insertAdjacentElement("afterend", nuevoContenedor);
    }
    var imgBanner = document.querySelector('#imgPortales img');
    if (window.innerWidth < 768) {
      if(culture === 'pt-BR'){
       imgBanner.setAttribute('src', 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/e315eb72-899c-4293-9ce2-2ca82c12f633/Banner%20Portal%20E%26A%20-%20Mobile%20-%20PT.png'); 
     }
     if(culture === 'en-US'){
       imgBanner.setAttribute('src', 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/662b933e-fc6a-4bce-9952-6f3f8269a77a/Banner%20Portal%20E%26A%20-%20Mobile%20-%20EN.png'); 
     }
     if(culture != 'en-US' && culture != 'pt-BR'){
       imgBanner.setAttribute('src', 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/d8b7ec42-7eba-44fa-a17b-82ee5bbe8a57/Banner%20Portal%20E%26A%20-%20Mobile1.png'); 
     }
   }
 }
}, 600);