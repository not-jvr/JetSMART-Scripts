var initRevistaCheckin = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname.toLowerCase() !== '/v2checkin/print') return;
  clearInterval(initRevistaCheckin);

  var culture = bookingData.Culture;

  function addModal() {
    if (!document.querySelector('#modal-revista')) {
        var imageURL
        var revistaURL;

        if (culture === 'es-CL' || culture === 'es-CO' || culture === 'es-PE' || culture === 'es-PY') {
            revistaURL = 'https://deviajemagazine.com/revista/revista-actual.pdf';
            if (window.innerWidth >= 768) {
              imageURL = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/dccdb20b-9477-43a2-b99d-a1f8baf49011/PopUp_Revistadeviaje_popup%20450x380.png';
          } else if (window.innerWidth < 768) {
            imageURL = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/d3213f5a-fb58-49eb-a9c2-6e7dcc80049d/PopUp_Revistadeviaje_popup%20220x330.png';
        }
    }

    if (culture === 'es-AR' || culture === 'es-UY') {
        revistaURL = 'https://deviajemagazine.com/revista/revista-actual-arg-uy.pdf';
        if (window.innerWidth >= 768) {
          imageURL = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/d5784f54-0cca-4765-b88b-804c7aa83b5c/PopUp_Revistadeviaje_popup%20450x380_AR.png';
      } else if (window.innerWidth < 768) {
        imageURL = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/f78fb069-b6ce-4808-a213-561bc44e88c8/PopUp_Revistadeviaje_popup%20220x330_AR.png';
    }
}

var modalTemplate = `
<div id="modal-revista" style="display: block;">
<div class="modal-content-revista">
<div class="closeButtonRevista">×</div>
<img class="modal-image" src="${imageURL}" alt="Modal Image">
<div class="centered-button">
<div class="container-new-button-revista">
Ver Revista
</div>
</div>
</div>
</div>
`;

document.body.insertAdjacentHTML('beforeend', modalTemplate);

document.querySelector('.closeButtonRevista').addEventListener('click', function() {
    document.querySelector('#modal-revista').style.display = 'none';
});

document.querySelector('.container-new-button-revista').addEventListener('click', function() {
    window.location.href = revistaURL;
});

}
}

function addCSS() {
  var css = `
  #modal-revista {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(5px);
  }

  .modal-content-revista {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);  
  }

  .closeButtonRevista {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      font-size: 30px;
      color: #163a70;
  }

  .closeButtonRevista:hover {
      color: white;
  }

  .modal-image {
      width: 100%;
      border-radius: 5px;
  }

  .centered-button {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      width: 100%;
  }

  .container-new-button-revista {
      display: inline-block;
      position: relative;
      background-color: #b2292e;
      color: #fff;
      border: 2px solid #b2292e;
      padding: 10px 35px 10px 15px;
      border-radius: 9999px;
      font-weight: 700;
      font-size: 18px;
      cursor: pointer;
  }

  .container-new-button-revista:after {
      position: absolute;
      font-weight: 400;
      top: 50%;
      transform: translateY(-50%);
      font-family: jetsmart-v2!important;
      right: 5px;
      content: "\\E9BA";
      font-size: 25px;
  }

  .container-new-button-revista:hover {
      background-color: #fff;
      color: #b2292e;
  }

  @media (max-width: 767px) {
    .container-new-button-revista {
      padding: 5px 15px; /* Ajusta el padding para el botón en pantallas pequeñas */
      font-size: 14px; /* Ajusta el tamaño de fuente para el botón en pantallas pequeñas */
    }

    .container-new-button-revista:after {
      content: "";
  }
}
`;

var head = document.head || document.getElementsByTagName('head')[0],
style = document.createElement('style');

head.appendChild(style);

style.type = 'text/css';
if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}
}

if (culture !== 'en-US' && culture !== 'pt-BR') {
    addCSS();
    addModal();
}

}, 4000);