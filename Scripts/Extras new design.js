var culture = bookingData.Culture;

function addCSS() {
    var css = `
    .containerNewExtras {
        background: #fff;
        border: 1px solid #e1e4e8;
        border-radius: 10px;
        box-shadow: 0 0 15px 2px rgba(0, 0, 0, .15);
        padding: 25px;
    }

    .card-container {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }

    .card {
        background: #fff;
        border: 2px solid #F0F0F0;
        border-radius: 10px;
        width: 300px;
        text-align: left;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .card-header {
        display: flex;
        align-items: center;
        padding: 15px 15px 5px;;
    }

    .card-body {
        padding: 15px 15px 0px;
        flex: 1;
    }

    .card-footer {
        padding: 15px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .card-icon {
        margin-right: 5px;
        display: inline-block;
        vertical-align: middle;
    }

    .card-icon img {
        width: 40px;
        height: 40px;
    }

    .card .newTitleExtras {
        font-weight: 900;
        font-size: 21px;
        font-family: Lato, sans-serif;
        color: #163a70;
        display: inline-block;
        vertical-align: middle;
    }

    .card .textoNew {
        font-family: Lato, sans-serif;
        font-size: 14px;
        color: #163a70;
        font-weight: 600;
    }

    .card-footer .newBotonExtras {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        background-color: #00abc8;
        color: #fff;
        position: relative;
        border-radius: 9999px;
        --border-opacity: 1;
        font-size: 16px;
        padding: 10px 35px 10px 15px;
        border: 2px solid #00abc8;
        text-align: center;
        width: auto;
        min-width: 100px;
    }

    .card-footer .newBotonExtras::after {
        position: absolute;
        font-weight: 400;
        top: 50%;
        transform: translateY(-50%);
        font-family: jetsmart-v2 !important;
        right: 5px;
        content: "\\E9BA";
        font-size: 25px;
    }

    .newBotonExtras:hover {
        background-color: #fff;
        color: #00abc8;
    }

    /* SELECTED */

    .card.selected {
        border-color: #00abc8;
    }

    .card.selected .card-header {
        background-color: #00abc8;
    }

    .card.selected .newTitleExtras, .card.selected .title-icon {
        color: #fff;
    }

    .card-footer .newBotonExtras.selected {
        background-color: #fff;
        color: #00abc8;
        border-color: #00abc8;
    }

    .card.selected .circuloTicket {
       border: 2px solid #fff;
       border-radius: 50%;
       background-color: #00abc8;
       height: 25px;
       width: 25px;
       position: absolute;
       transform: rotate(-45deg);
       right: 5px;
       top: 6px;
   }

   .card.selected .ticket {
       border-bottom: 2px solid #fff;
       border-left: 2px solid #fff;
       content: "";
       height: 7px;
       position: absolute;
       transform: rotate(-13deg);
       width: 13px;
       right: 3px;
       top: 6px;
   }

   @media (max-width: 767px) {
    .newBotonExtras:hover {
        background-color: #00abc8;
        color: #fff;
    }

    [data-test-id="extras-priority-boarding-container"] .btn-boarding:hover, [data-test-id="extras-pet-in-cabin-container"] .btn-boarding:hover{
        background-color: #00abc8;
        color: #fff;
    }
}

/*CAMBIOS EXTRAS ANTIGUOS*/

.outer-box {
    border: none !important;
}

.inner-box {
    background: #fff !important; 
    border: 2px solid #F0F0F0 !important;
}

.inner-box.upper-half {
    border-bottom: none !important;
}

.inner-box.bottom-half {
    border-top: none !important;
}

.basic-checkbox-wrapper {
    border: none;
    background: #f7f7f7;
}

.checkin-type-info-container, .extras-binary-name, pet-container {
    color: #163a70;
}

.inner-border-box {
    border: none !important;
    background: #f7f7f7 !important;
}

[data-test-id="extras-priority-boarding-container"] .btn-boarding, [data-test-id="extras-pet-in-cabin-container"] .btn-boarding {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #00abc8;
    color: #fff;
    position: relative;
    border-radius: 9999px;
    --border-opacity: 1;
    font-size: 16px;
    padding: 10px;
    border: 2px solid #00abc8 !important;
    text-align: center;
    width: auto;
    height: auto;
    min-width: 100px;
}

[data-test-id="extras-priority-boarding-container"] .btn-boarding.selected, [data-test-id="extras-pet-in-cabin-container"] .btn-boarding.selected {
    background-color: #fff;
    color: #00abc8 !important;
}

@media (min-width: 768px) {
    [data-test-id="extras-priority-boarding-container"] .btn-boarding:hover, [data-test-id="extras-pet-in-cabin-container"] .btn-boarding:hover {
        background-color: #fff;
        color: #00abc8 !important;
    }
}
`;
var head = document.head || document.getElementsByTagName('head')[0];
var style = document.createElement('style');
head.appendChild(style);
style.type = 'text/css';
if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}
}

function addNewDesign() {
    var promoElement = document.querySelector('[data-test-id="extras-checkin-container"]');

    if (!document.querySelector('#containerTextPC') && promoElement) {  
        var alertPC = `
        <div class="containerNewExtras">
        <div class="card-container">
        <div class="card" id="newBPCard">
        <div class="card-header">
        <div class="card-icon">
        <i class="js-boarding-man js-icon title-icon"></i>
        </div>
        <div class="newTitleExtras">Embarque Prioritario</div>
        </div>
        <div class="card-body">
        <div class="textoNew">Ahórrate la fila y embárcate al avión antes que todos.</div>
        </div>
        <div class="card-footer">
        <div class="newBotonExtras">Agregar</div>
        </div>
        <div class="circuloTicket">
        <div class="ticket"></div>
        </div>
        </div>
        <div class="card" id="newFlexiCard">
        <div class="card-header">
        <div class="card-icon">
        <i class="js-flexi-fee js-icon title-icon"></i>
        </div>
        <div class="newTitleExtras">FlexiSMART</div>
        </div>
        <div class="card-body">
        <div class="textoNew">Podrás modificar tu reserva cuantas veces quieras por un año, hasta una hora antes del vuelo sin pagar el cargo por cambio.</div>
        </div>
        <div class="card-footer">
        <div class="newBotonExtras">Agregar</div>
        </div>
        <div class="circuloTicket">
        <div class="ticket"></div>
        </div>
        </div>
        <div class="card" id="newMascotaCard">
        <div class="card-header">
        <div class="card-icon">
        <i class="js-pet js-icon title-icon"></i>
        </div>
        <div class="newTitleExtras">Mascota a bordo</div>
        </div>
        <div class="card-body">
        <div class="textoNew">Te recomendamos comprarlo online o por Contact Center ya que sólo podemos llevar un máximo de 4 mascotas...</div>
        </div>
        <div class="card-footer">
        <div class="newBotonExtras">Agregar</div>
        </div>
        <div class="circuloTicket">
        <div class="ticket"></div>
        </div>
        </div>
        </div>
        </div>
        `;
        promoElement.insertAdjacentHTML('afterend', alertPC);
    }
}

function hideExtras() {
    var flexiSmart = document.querySelector('[data-test-id="extras-flexi-fee-container"]');
    var embarqueP = document.querySelector('[data-test-id="extras-priority-boarding-container"]');
    var mascota = document.querySelector('[data-test-id="extras-pet-in-cabin-container"]');

    if (flexiSmart) {
        flexiSmart.style.display = 'none';
    }

    if (embarqueP) {
        embarqueP.style.display = 'none';
    }

    if (mascota) {
        mascota.style.display = 'none';
    }
}

function toggleButton(event) {
    var button = event.currentTarget;
    var isSelected = button.classList.contains('selected');

    var card = button.closest('.card');
    if (card) {
        if (isSelected) {
            button.classList.remove('selected');
            button.textContent = 'Agregar';
            card.classList.remove('selected');
            manageVisibility(card.id, false);
        } else {
            button.classList.add('selected');
            button.textContent = 'Quitar';
            card.classList.add('selected');
            manageVisibility(card.id, true);
        }
    }
}

function manageVisibility(cardId, show) {
    var targetElement;
    
    switch (cardId) {
    case 'newBPCard':
        targetElement = document.querySelector('[data-test-id="extras-priority-boarding-container"]');
        break;
    case 'newFlexiCard':
        targetElement = document.querySelector('[data-test-id="extras-flexi-fee-container"]');
        break;
    case 'newMascotaCard':
        targetElement = document.querySelector('[data-test-id="extras-pet-in-cabin-container"]');
        break;
    }

    if (targetElement) {
        if (show) {
            targetElement.style.display = 'block';
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            targetElement.style.display = 'none';
        }
    }
}

function clickNewCards() {
    var buttons = document.querySelectorAll('.newBotonExtras');
    buttons.forEach(function(button) {
        button.addEventListener('click', toggleButton);
    });
}

function moveTarjetaEmbarqueFirst() {
    var checkinContainer = document.querySelector('[data-test-id="extras-checkin-container"]');
    var extrasPage = document.querySelector('[data-test-id="extras-page"]');

    if (checkinContainer && extrasPage) {
        extrasPage.insertBefore(checkinContainer, extrasPage.firstChild);
    }
}

addCSS();
moveTarjetaEmbarqueFirst();
hideExtras();
addNewDesign();
clickNewCards();