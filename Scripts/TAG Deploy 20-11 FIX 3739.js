var fix3739 = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2Checkin/AditionalInfo') return;
    clearInterval(fix3739);

    var culture = bookingData.Culture;

    function changeTextButton() {
        var buttons = document.querySelectorAll('.modal-content .rounded-primary-btn');
        var textsToChange = ['Ir a la página de reservas en grupos', 'Go to the group booking page', 'Ir para a página de reservas de grupos'];
        var newText = 'Administrar reserva';

        switch (culture) {
            case 'en-US':
                newText = 'Manage your booking';
                break;
            case 'pt-BR':
                newText = 'Gerenciar sua reserva';
                break;
        }

        buttons.forEach(button => {
            if (textsToChange.includes(button.textContent.trim())) {
                button.textContent = newText;
            }
        });
    }

    changeTextButton();

}, 600);