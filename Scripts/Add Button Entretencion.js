var addButtonLandingEntretencion = setInterval(function () {
    if (!document.querySelector('.container-selecction') || (!window.location.pathname.includes('/cl/es/minisitios/entretencion') && !window.location.pathname.includes('/ar/es/minisitios/entretencion') && !window.location.pathname.includes('/pe/es/minisitios/entretencion'))) return;
    clearInterval(addButtonLandingEntretencion);

    function addButton() {
        if (!document.querySelector('#botonNuevoClonado')) {
            var ultimoElemento = document.querySelector('.group-card.pb-4 .container-selecction .row:last-child');
            var elementoClonado = ultimoElemento.cloneNode(true);
            var h3Element = elementoClonado.querySelector('h3');
            h3Element.textContent = 'Protocolo de autocuidado';
            elementoClonado.id = 'botonNuevoClonado';

            var respuestaBox = elementoClonado.querySelector('.respuesta-box');
            respuestaBox.style.backgroundImage = 'url(https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/acec42ca-48f5-4a8a-ba1c-01b99e722401/Protocolo%20de%20autocuidado%20-%20Desktop%20-%20V4.png)';

            elementoClonado.querySelector('div[type="button"]').setAttribute('onclick', "location.href='https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/08d67cb3-266d-4b51-883c-37c95b7cbb5f/Cancer%20de%20Mama%2019%20OCT.pdf'");

            ultimoElemento.parentNode.appendChild(elementoClonado);
        }
    }

    addButton();
    
}, 500);
