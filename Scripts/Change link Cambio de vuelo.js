var initDevolucionRedirect = setInterval(function () {
    if (typeof bookingData === "undefined" || typeof window.eventBus === "undefined" || window.location.pathname !== '/V2/Itinerary') return;
    clearInterval(initDevolucionRedirect);
    var PNR = bookingData.PNR;
    var email = bookingData.Contact.Email;
    
    if (PNR) {
        window.eventBus.subscribe({
            name: "change_link_modal", callback: function (e) {
                const modifyButtons = document.querySelectorAll('.rounded-primary-btn.i2-btn.i2-btn-blue');
                const buttonClickHandler = function () {
                   setTimeout(function() {
                    console.log("click")
                    if(document.querySelector('.modal.primary-modal')){
                        const button = document.querySelector('.modal-content.flight-move-modal-content .rounded-primary-btn');
                        button.href = `https://jetsmart.com/cl/es/cambios-y-devoluciones?pnr=${PNR}&lname=${email}`;
                    }
                }, 500);
               };
               modifyButtons.forEach(button => button.addEventListener('click', buttonClickHandler));
           }
       });
    }
}, 600);