var fix9238 = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Itinerary') return;
    clearInterval(fix9238);

    function hideButton() {
        document.querySelectorAll('.rounded-primary-btn').forEach((button) => {
            const buttonText = button.textContent.trim();
            if (
                buttonText === "Consultar estado de pago" ||
                buttonText === "Verifique o status do pagamento" ||
                buttonText === "Check payment status"
            ) {
                button.style.display = "none";
            }
        });
    }
    
    hideButton();

}, 600);