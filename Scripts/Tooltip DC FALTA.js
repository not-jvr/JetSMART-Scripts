var initTooltip = setInterval(function() {
  if (typeof bookingData === "undefined" || typeof window.eventBus === "undefined" || window.location.pathname !== '/V2/Flight') return;
  clearInterval(initTooltip);

var css = `
.dc-tooltip-opener-button {
    border-radius: 9999px;
    background-color: #ffa400;
    color: #fff;
    font-weight: 900;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -7px;
    right: -7px;
    cursor: pointer;
    line-height: 1;
    width: 15px;
    height: 15px;
    font-size: 10px;
}

.dc-tooltip-container-button {
    position: absolute;
    top: 5px;
    right: 0;
}

.dc-tooltip-button {
    position: absolute;
    --bg-opacity: 1;
    background-color: #ffffcc;  /* Cambia el color de fondo aquí */
    color: #ffa400;
    --border-opacity: 1;
    border-color: #ffa400;
    border: 1px solid rgba(255,164,0,var(--border-opacity));
    padding: 0.5rem;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,.3);
    border-radius: 5px;
    bottom: 10px;  /* Ajustar este valor para acercar el tooltip al botón '?' */
    left: 7px;
    transform: translateX(-50%);
    display: none;
    font-size: 0.8em; /* Ajustar el tamaño a tu preferencia */
    width: 300px; /* Ajustar al ancho deseado */
}

.dc-tooltip-button::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -10px; /* Ajustar este valor para cambiar la posición horizontal de la punta triangular */
    border-width: 10px;  /* Ajustar este valor para hacer la punta triangular más grande */
    border-style: solid;
    border-color: #ffa400 transparent transparent transparent;
}

.dc-tooltip-button .benefit-title {
    font-weight: bold;
}

.dc-tooltip-button .benefit-item {
    line-height: 1; /* Esto controla el espacio entre las líneas de texto dentro del mismo elemento de la lista */
    margin: 0; /* Esto controla el espacio entre los elementos de la lista */
    content: '• '; /* Aquí puedes cambiar '• ' por cualquier otro caracter, como un check */
    margin-right: 5px; /* Agrega un pequeño espacio después del punto */
}

.dc-tooltip-button .benefit-item::before {
    content: '• '; /* Aquí puedes cambiar '• ' por cualquier otro caracter, como un check */
    margin-right: 5px; /* Agrega un pequeño espacio después del punto */
}

@media screen and (max-width: 767px) {
    .dc-tooltip-opener-button {
        z-index: 1;
    }

    .dc-tooltip-container-button {
        z-index: 1;
    }

    .dc-tooltip-button {
    font-size: 11px; /* Ajustar el tamaño a tu preferencia */
    width: 250px; /* Ajustar al ancho deseado */
}
}
`;


var head = document.head || document.getElementsByTagName('head')[0];
var style = document.createElement('style');
style.type = 'text/css';

if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}

head.appendChild(style);

function updateTooltips() {
    var buttonsForTooltip = document.querySelectorAll('.discount-fee.nowrap.small, .discount-fee.nowrap.big');
    var buttonsForClick = document.querySelectorAll('.discount-fee.nowrap.small, .discount-fee.nowrap.big, .smart-fee.nowrap.small, .smart-fee.nowrap.big');

    buttonsForTooltip.forEach(function(button) {
        var rect = button.getBoundingClientRect();

        var tooltipOpener = document.createElement('div');
        tooltipOpener.innerHTML = '?';
        tooltipOpener.className = 'dc-tooltip-opener-button';
        tooltipOpener.style.top = (window.scrollY + rect.top - 2) + 'px';
        tooltipOpener.style.left = (window.scrollX + rect.right - 10) + 'px';
        document.body.appendChild(tooltipOpener);

        var tooltipContainer = document.createElement('div');
        tooltipContainer.className = 'dc-tooltip-container-button';
        tooltipContainer.style.top = (window.scrollY + rect.top - 10) + 'px';
        tooltipContainer.style.left = (window.scrollX + rect.right - 10) + 'px';

        var tooltip = document.createElement('div');
        tooltip.innerHTML = `
    <span class="benefit-title">Beneficios del Club</span>
    <ul>
        <li class="benefit-item">Descuento mínimo de $5.000 por tramo para tarifas sobre $150.000.</li>
        <li class="benefit-item">Descuento mínimo de $1.000 en equipaje de mano o facturado.</li>
        <li class="benefit-item">Descuentos aplican para ti y acompañantes, según membresia.</li>
        <li class="benefit-item">Acceso a promociones especiales.</li>
    </ul>
`;
        tooltip.className = 'dc-tooltip-button';
        tooltip.style.display = 'none';
        tooltipContainer.appendChild(tooltip);
        document.body.appendChild(tooltipContainer);

        // Agregar comportamiento de clic para mobile (ancho de pantalla < 768px)
        if (window.innerWidth < 768) {
            tooltipOpener.addEventListener('click', function(event) {
                event.stopPropagation();
                if (tooltip.style.display === 'none') {
                    tooltip.style.display = 'block';
                } else {
                    tooltip.style.display = 'none';
                }
            });

            // Para cerrar el tooltip cuando se hace clic fuera de él
            document.addEventListener('click', function(event) {
                if (!event.target.classList.contains('dc-tooltip-opener-button') && !event.target.classList.contains('dc-tooltip-button')) {
                    tooltip.style.display = 'none';
                }
            });
        } 
        // Agregar comportamiento de hover para desktop (ancho de pantalla >= 768px)
        else {
            tooltipOpener.addEventListener('mouseenter', function() {
                tooltip.style.display = 'block';
            });

            tooltipOpener.addEventListener('mouseleave', function() {
                tooltip.style.display = 'none';
            });
        }
    });

    buttonsForClick.forEach(function(button) {
        button.addEventListener('click', function() {
            document.querySelectorAll('.dc-tooltip-opener-button, .dc-tooltip-container-button').forEach(function(el) {
                el.remove();
            });
        });
    });
}

updateTooltips();
window.eventBus.subscribe({
    name: "pagoefectivoButton", callback: function (e) {
       updateTooltips();
   }
});

}, 200);