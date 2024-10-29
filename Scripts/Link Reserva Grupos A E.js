var initLinkGrupos = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2Agency/Contact') return;
    clearInterval(initLinkGrupos);
    var culture = bookingData.Culture;

    const solicitudesGrupos = document.querySelector("div.cug2b-contact-info h2:nth-of-type(3) + p");
    const iconoSolicitudesGrupos = solicitudesGrupos.querySelector("i");
    
     switch (culture) {
        case "en-US":
            solicitudesGrupos.textContent = "https://jetsmart.com/us/en/reservas-en-grupo/";
            break;
        case "es-PE":
            solicitudesGrupos.textContent = "https://jetsmart.com/pe/es/reservas-en-grupo/";
            break;
        case "es-AR":
            solicitudesGrupos.textContent = "https://jetsmart.com/ar/es/reservas-en-grupo/";
            break;
        case "pt-BR":
            solicitudesGrupos.textContent = "https://jetsmart.com/br/pt/reservas-en-grupo/";
            break;
        case "es-CO":
            solicitudesGrupos.textContent = "https://jetsmart.com/co/es/reservas-en-grupo/";
            break;
        case "es-PY":
            solicitudesGrupos.textContent = "https://jetsmart.com/py/es/reservas-en-grupo/";
            break;
        case "es-UY":
            solicitudesGrupos.textContent = "https://jetsmart.com/uy/es/reservas-en-grupo/";
            break;
        // Agregar más casos según las culturas necesarias
            //es-CL
        default:
            solicitudesGrupos.textContent = "https://jetsmart.com/cl/es/reservas-en-grupo/";
            break;
    }
    solicitudesGrupos.insertBefore(iconoSolicitudesGrupos, solicitudesGrupos.firstChild);
}, 400);