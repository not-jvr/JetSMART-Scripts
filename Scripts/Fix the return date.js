var initChangeDate = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Flight') return;
    clearInterval(initChangeDate);

    function fixDate(){
        var returnJourneyDate = bookingData.AvailableReturnJourneys[0].DepartureDate;
        var culture = bookingData.Culture;
        var dateObject = new Date(returnJourneyDate);

        var day = dateObject.getDate().toString().padStart(2, '0');
        var month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        var dayAndMonth = day + '-' + month;

        var options = { weekday: 'long' };
        var dayOfWeek = new Intl.DateTimeFormat(culture, options).format(dateObject);

        switch(culture) {
        case 'en-US':
            switch(dayOfWeek) {
            case 'Monday':
                dayOfWeek = 'Mon';
                break;
            case 'Tuesday':
                dayOfWeek = 'Tue';
                break;
            case 'Wednesday':
                dayOfWeek = 'Wed';
                break;
            case 'Thursday':
                dayOfWeek = 'Thu';
                break;
            case 'Friday':
                dayOfWeek = 'Fri';
                break;
            case 'Saturday':
                dayOfWeek = 'Sat';
                break;
            case 'Sunday':
                dayOfWeek = 'Sun';
                break;
            }
            break;
        case 'pt-BR':
            switch(dayOfWeek) {
            case 'segunda-feira':
                dayOfWeek = 'Seg';
                break;
            case 'terça-feira':
                dayOfWeek = 'Ter';
                break;
            case 'quarta-feira':
                dayOfWeek = 'Qua';
                break;
            case 'quinta-feira':
                dayOfWeek = 'Qui';
                break;
            case 'sexta-feira':
                dayOfWeek = 'Sex';
                break;
            case 'sábado':
                dayOfWeek = 'Sab';
                break;
            case 'domingo':
                dayOfWeek = 'Dom';
                break;
            }
            break;
        default:
            switch(dayOfWeek) {
            case 'lunes':
                dayOfWeek = 'Lun';
                break;
            case 'martes':
                dayOfWeek = 'Mar';
                break;
            case 'miércoles':
                dayOfWeek = 'Mie';
                break;
            case 'jueves':
                dayOfWeek = 'Jue';
                break;
            case 'viernes':
                dayOfWeek = 'Vie';
                break;
            case 'sábado':
                dayOfWeek = 'Sab';
                break;
            case 'domingo':
                dayOfWeek = 'Dom';
                break;
            }
            break;
        }

        var formattedDate = dayOfWeek + ' ' + dayAndMonth;
        document.querySelector('.flight-date [data-test-id="flight-itinerary-inbound-date-mobile"]').textContent = formattedDate;
    }
    
    if (window.innerWidth < 768) {
        fixDate();
        window.eventBus.subscribe({
            name: "fixDateFlight", callback: function (e) {
                fixDate();
            }
        });
    }

}, 600);