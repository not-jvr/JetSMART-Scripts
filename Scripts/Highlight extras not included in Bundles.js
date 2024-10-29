var newBaggageBundles = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
  clearInterval(newBaggageBundles);

  var culture = bookingData.Culture;

  function addCSS() {
    var css = `
.equipaje-contenedor {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #F7F7F7;
  padding: 10px 15px;
}

.equipaje-texto {
  font-size: 14px;
  color: #2b3e72;
  font-weight: bold;
}

.equipaje-items {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.item img {
  width: 25px;
  height: 25px;
}

.textkg {
  font-size: 11px;
  color: #1c355e;
}

.notextkg {
  font-size: 11px;
  color: #C1C1C1;
}

[data-test-id*="bundle-ssrs--j|"][data-test-id$="|simple"] .equipaje-texto,
[data-test-id*="bundle-ssrs--j|"][data-test-id$="|simple"] .textkg,
[data-test-id*="bundle-ssrs--j|"][data-test-id$="|simple"] .notextkg,
[data-test-id*="bundle-selector-option--j|"][data-test-id$="|simple"] .equipaje-texto,
[data-test-id*="bundle-selector-option--j|"][data-test-id$="|simple"] .textkg,
[data-test-id*="bundle-selector-option--j|"][data-test-id$="|simple"] .notextkg {
    color: #00abc8;
}


[data-test-id*="bundle-ssrs--j|"][data-test-id$="|full"] .equipaje-texto,
[data-test-id*="bundle-ssrs--j|"][data-test-id$="|full"] .textkg,
[data-test-id*="bundle-ssrs--j|"][data-test-id$="|full"] .notextkg,
[data-test-id*="bundle-selector-option--j|"][data-test-id$="|full"] .equipaje-texto,
[data-test-id*="bundle-selector-option--j|"][data-test-id$="|full"] .textkg,
[data-test-id*="bundle-selector-option--j|"][data-test-id$="|full"] .notextkg {
    color: #1c355e;
}

[data-test-id="bundle-ssr-item--j|0-c|none|none"]:first-of-type,
[data-test-id="bundle-ssr-item--j|1-c|none|none"]:first-of-type,
[data-test-id="bundle-ssr-item--j|0-c|simple|none"]:first-of-type,
[data-test-id="bundle-ssr-item--j|1-c|simple|none"]:first-of-type,
[data-test-id="bundle-ssr-item--j|0-c|full|none"]:first-of-type,
[data-test-id="bundle-ssr-item--j|1-c|full|none"]:first-of-type {
    display: none !important;
}

/* Estilos para dispositivos móviles */
@media (max-width: 767px) {
  .equipaje-contenedor {
    padding: 10px;
  }

  .equipaje-texto {
    font-size: 10px;
    white-space: normal;
  }

  .equipaje-items {
    gap: 5px;
  }

  .item img {
    width: 20px;
    height: 20px;
  }

  .textkg, .notextkg {
    font-size: 10px;
    white-space: normal;
  }

  .bundle-content .bundle-header {
    height: 100px;
    justify-content: center;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .bundle-content .bundle-header .bundle-price.no-bundle {
    margin-top: 0px;
  }
}
 `;
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  document.querySelectorAll('[data-test-id="bundle-selector-option--j|0-c|none"] ul')


  function addHTML() {
    const contenedores = document.querySelectorAll('[data-test-id^="bundle-selector-option--j|0-c|"] ul, [data-test-id^="bundle-selector-option--j|1-c|"] ul');

    contenedores.forEach(contenedor => {
      if (contenedor.querySelector('.equipaje-contenedor')) {
        return;
      }

      let text1 = 'Equipaje incluido:';
      let text2 = 'Mochila';
      let equipajeHTML;
      let dataTestId = contenedor.closest('[data-test-id]').getAttribute('data-test-id');

      // Verificar si el data-test-id existe antes de usar split
      if (!dataTestId || !dataTestId.includes('-c|')) {
        console.error("data-test-id no tiene el formato esperado", dataTestId);
        return;
      }

      let tipoBundle = dataTestId.split('-c|')[1];

      let imagenBolsoDeMano, imagenEquipajeDeMano, imagenEquipajeFacturado;

      switch (tipoBundle) {
        case 'none':
          imagenBolsoDeMano = "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/4e0a5097-df7f-4335-b12b-71739688b5bf/Bolso%20de%20mano.png";
          imagenEquipajeDeMano = "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/0fa9e1ae-7a0e-4f70-9b49-b7f1101ce6f3/Equipaje%20de%20Mano.png";
          imagenEquipajeFacturado = "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/c71ee7f2-0e50-4424-b4bd-9216d7ff1ccc/Equipaje%20Facturado.png";
          break;
        case 'simple':
          imagenBolsoDeMano = "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/b998e278-82d4-404d-a556-c3ea72b65e44/Bolso%20de%20mano%20%281%29.png";
          imagenEquipajeDeMano = "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/dd4e7fc4-e50b-4825-a48c-2df140b0c927/Equipaje%20de%20Mano%20%281%29.png";
          imagenEquipajeFacturado = "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/f59722b8-d157-4705-b763-568edc6bdcf0/Equipaje%20Facturado%20%281%29.png";
          break;
        case 'full':
          imagenBolsoDeMano = "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/4e0a5097-df7f-4335-b12b-71739688b5bf/Bolso%20de%20mano.png";
          imagenEquipajeDeMano = "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/1aac48a2-e7e9-4e8d-b82c-be2cdc111ac9/Equipaje%20de%20Mano%20%282%29.png";
          imagenEquipajeFacturado = "https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/382b1e02-273c-453e-ae33-97c5f30b91fa/Equipaje%20Facturado%20%282%29.png";
          break;
        default:
          return;
      }

      switch (culture) {
        case 'en-US':
          text1 = 'Baggage included:';
          text2 = 'Handbag';
          break;
        case 'pt-BR':
          text1 = 'Bagagem incluída:';
          break;
      }

      equipajeHTML = `
            <div class="equipaje-contenedor">
              <div class="equipaje-texto">
                ${text1}
              </div>
              <div class="equipaje-items">
                <div class="item">
                  <img src="${imagenBolsoDeMano}" alt="Bolso de mano">
                  <div class="textkg">${text2}</div>
                </div>
                <div class="item">
                  <img src="${imagenEquipajeDeMano}" alt="Equipaje de mano">
                  <div class="notextkg">10 kg</div>
                </div>
                <div class="item">
                  <img src="${imagenEquipajeFacturado}" alt="Equipaje facturado">
                  <div class="notextkg">23 kg</div>
                </div>
              </div>
            </div>
          `;

      // Insertar el HTML al principio del ul
      contenedor.insertAdjacentHTML('afterbegin', equipajeHTML);
    });
  }

  if (culture) {
    addCSS();
    addHTML();
    window.eventBus.subscribe({
      name: "bundleMaletas",
      callback: function (e) {
        console.log("newnew")
        addHTML();
      }
    });
  }

}, 600);