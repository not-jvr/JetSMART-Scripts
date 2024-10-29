var initPaymentsHide72hrs = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Payment' || !document.querySelector('#mainContentWrapper .inner-deep-box ul')) return;
    clearInterval(initPaymentsHide72hrs);

    var postBooking = bookingData.PostBooking;

    function hideOnlySelected() {
        const labels = document.querySelectorAll('#mainContentPayment .inner-deep-box .tabs.ts-error-parent ul label');

        const valuesToHide = ['KA', 'KD', 'KP', 'KE', 'KB', 'ST', 'PT', 'CT', 'CC', 'PC', 'SC'];

        valuesToHide.forEach(forValue => {
            labels.forEach(label => {
                const forAttr = label.getAttribute('for');

                if (forAttr === `payment_tab_${forValue}`) {
                    label.style.display = 'none';
                }
            });
        });
    }

    function esIda() {
        var fechaIda = bookingData.OutboundJourney.DepartureDate;
        var fechaViaje = new Date(fechaIda);
        var esIda = false;
        var hoy = new Date();

        if (fechaViaje.getTime() > hoy.getTime()) {
            esIda = true;
        }
        return esIda;
    }

    function menos72hrs() {
        var hoy = new Date();
        var fecha;
        var fechaViaje;
        var timeDifference;
        var hoursDifference;
        if (esIda()) {
            fecha = bookingData.OutboundJourney.DepartureDate;
            fechaViaje = new Date(fecha);
            timeDifference = fechaViaje.getTime() - hoy.getTime();
            hoursDifference = timeDifference / (1000 * 60 * 60);
            return hoursDifference <= 72;
        } else if (bookingData.ReturnJourney) {
            fecha = bookingData.ReturnJourney.DepartureDate;
            fechaViaje = new Date(fecha);
            timeDifference = fechaViaje.getTime() - hoy.getTime();
            hoursDifference = timeDifference / (1000 * 60 * 60);
            return hoursDifference <= 72;
        } else {
            return false;
        }
    }

    if (menos72hrs() && postBooking === true) {
        hideOnlySelected();
    }

}, 1000);