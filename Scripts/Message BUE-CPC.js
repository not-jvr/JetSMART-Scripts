var intSujetoAprobacion = setInterval(function() {
    if (typeof bookingData === "undefined") return;
    clearInterval(intSujetoAprobacion);
    var targets = ["BUE", "CPC"];
    var market = true;

    document.querySelectorAll('.flight-itinerary .station span:last-child').forEach(function(el) {
        if (targets.indexOf(el.textContent) === -1) {
            market = false;
        }
    })

    var esVueloAfectado = function(x) {
        var vuelos_a = ["WJ3550", "WJ3551"];
        return vuelos_a.indexOf(x) !== -1;
    };

    var vueloIda = bookingData.AvailableOutboundJourneys.map(function(x) {
        return x.FlightNumber;
    }).filter(esVueloAfectado);

    var vuelosdevuelta = (bookingData.AvailableReturnJourneys) ? bookingData.AvailableReturnJourneys : [];

    var vueloVuelta = vuelosdevuelta.map(function(x) {
        return x.FlightNumber;
    }).filter(esVueloAfectado);

    var esFechaVueloAfectado = function(x) {
        return x >= "2023-07-03 00:00:00" && x < "2024-07-04 11:59:59";
    };

    var fechaVueloIda = bookingData.AvailableOutboundJourneys.map(function(x) {
        return x.ArrivalDate;
    }).filter(esFechaVueloAfectado);


    var fechaVueloVuelta = vuelosdevuelta.map(function(x) {
        return x.ArrivalDate;
    }).filter(esFechaVueloAfectado);

    var vuelosIda = document.querySelectorAll("ac-flight-page div.ts-error-parent.ts-flight-error-parent > section > div:nth-child(1) div.itinerary");
    var vuelosVuelta = document.querySelectorAll("ac-flight-page div.ts-error-parent.ts-flight-error-parent > section > div:nth-child(2) div.itinerary");

    if (market) {
        for (var i = 0; i < vuelosIda.length; i++) {
            if (vueloIda != 0 && fechaVueloIda != 0) {
                var node = document.createElement("div");
                node.style.marginBottom = "2px";
                node.style.marginLeft = "10px";
                node.style.color = "#163a70";
                node.style.fontSize = "12px";
                node.innerHTML = "*Sujeto a aprobación gubernamental";
                if (bookingData.Culture === 'pt-BR') node.innerHTML = "Vôo sujeito à aprovação do governo";
                if (bookingData.Culture === 'en-US') node.innerHTML = "Flight subject to government approval";
                vuelosIda[i].parentElement.appendChild(node);
            }
        }

        for (var i = 0; i < vuelosVuelta.length; i++) {
            if (vueloVuelta != 0 && fechaVueloVuelta != 0) {
                var node = document.createElement("div");
                node.style.marginBottom = "2px";
                node.style.marginLeft = "10px";
                node.style.color = "#163a70";
                node.style.fontSize = "12px";
                node.innerHTML = "*Sujeto a aprobación gubernamental";
                if (bookingData.Culture === 'pt-BR') node.innerHTML = "Vôo sujeito à aprovação do governo";
                if (bookingData.Culture === 'en-US') node.innerHTML = "Flight subject to government approval";
                vuelosVuelta[i].parentElement.appendChild(node);
            }
        }
    }
}, 400);