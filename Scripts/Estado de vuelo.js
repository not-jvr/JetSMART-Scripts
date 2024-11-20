var initEstadoVuelo = setInterval(function () {
    if (!window.location.pathname.includes('/estado-de-vuelo')) return;
    clearInterval(initEstadoVuelo);

    function changeText() {
        const element = document.querySelector('#card-container .font-weight-bold.h5');
        if (element) {
            let text;
            switch (true) {
                case window.location.pathname.includes('/ar/es'):
                    text = 'Si tienes una escala revisa <a href="https://jetsmart.com/ar/es/?show_madv=true" class="connection-flight-redirect">AQUÍ</a> o búscalo por número de vuelo.';
                    break;
                case window.location.pathname.includes('/cl/es'):
                    text = 'Si tienes una escala revisa <a href="https://jetsmart.com/cl/es/?show_madv=true" class="connection-flight-redirect">AQUÍ</a> o búscalo por número de vuelo.';
                    break;
                case window.location.pathname.includes('/co/es'):
                    text = 'Si tienes una escala revisa <a href="https://jetsmart.com/co/es/?show_madv=true" class="connection-flight-redirect">AQUÍ</a> o búscalo por número de vuelo.';
                    break;
                case window.location.pathname.includes('/ec/es'):
                    text = 'Si tienes una escala revisa <a href="https://jetsmart.com/ec/es/?show_madv=true" class="connection-flight-redirect">AQUÍ</a> o búscalo por número de vuelo.';
                    break;
                case window.location.pathname.includes('/pe/es'):
                    text = 'Si tienes una escala revisa <a href="https://jetsmart.com/pe/es/?show_madv=true" class="connection-flight-redirect">AQUÍ</a> o búscalo por número de vuelo.';
                    break;
                case window.location.pathname.includes('/uy/es'):
                    text = 'Si tienes una escala revisa <a href="https://jetsmart.com/uy/es/?show_madv=true" class="connection-flight-redirect">AQUÍ</a> o búscalo por número de vuelo.';
                    break;
                case window.location.pathname.includes('/py/es'):
                    text = 'Si tienes una escala revisa <a href="https://jetsmart.com/py/es/?show_madv=true" class="connection-flight-redirect">AQUÍ</a> o búscalo por número de vuelo.';
                    break;
                case window.location.pathname.includes('/br/pt'):
                    text = 'Se você tiver uma escala, verifique <a href="https://jetsmart.com/br/pt/?show_madv=true" class="connection-flight-redirect">AQUI</a> ou procure pelo número do voo.';
                    break;
                case window.location.pathname.includes('/en/us'):
                    text = 'If you have a connection, check <a href="https://jetsmart.com/us/en/?show_madv=true" class="connection-flight-redirect">HERE</a> or search by flight number.';
                    break;
                default:
                    text = 'Si tienes una escala revisa <a href="https://jetsmart.com/cl/es/?show_madv=true" class="connection-flight-redirect">AQUÍ</a> o búscalo por número de vuelo.';
                    break;
            }
            element.innerHTML = text;
        }
    }

    changeText();

}, 600);
