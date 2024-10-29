var initDescuentoSeguros = setInterval(function() {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Extras') return;
    clearInterval(initDescuentoSeguros);

    var tipoVuelo = bookingData.RouteMarket;

    function addCSS() {
        var css = `
        #precio-original {
            color: #263F6A;
            font-size: 13px;
            margin-left: -1rem;
            font-weight: 900;
            text-decoration: line-through;
        }

        #precio-descuento {
            color: #263F6A;
            font-size: 16px;
            margin-left: 1rem;
            font-weight: 900;
            padding-right: 39px;
        }

        .precio-rojo {
            color: #9c3434;
            font-size: 16px;
            font-weight: 900;
        }

        @media (min-width: 768px) {
            .extras-insurance-header {
                height: 200px;
            }

            @media (min-width: 768px) {
                .extras-insurance-header {
                    height: 200px;
                }
            }

            @media (min-width: 1256px) and (max-width: 1500px) {
                .extras-insurance-header {
                    height: 170px;
                }
            }

            @media (min-width: 1112px) and (max-width: 1255px) {
                .extras-insurance-header {
                    height: 140px;
                }
            }

            @media (min-width: 1024px) and (max-width: 1110px) {
                .extras-insurance-header {
                    height: 120px;
                }
            }

            `;

            var style = document.createElement('style');
            style.appendChild(document.createTextNode(css));
            document.head.appendChild(style);
        }

        function obtenerNumero() {
            var elemento = document.querySelector('.data-opener-title .text-pasajero');
            var currencyInsurance = bookingData.TotalPriceCurrencyLocal;

            if (elemento && currencyInsurance === 'CLP') {
                var texto = elemento.textContent;
                var numeroLimpio = texto.replace(/[^0-9]/g, '');
                var numero = parseInt(numeroLimpio, 10);
                return numero;
            } else if (elemento && currencyInsurance === 'USD'){
                var texto = elemento.textContent;
                var numeroLimpio = texto.replace(/[^0-9,.]/g, '').replace(',', '.');
                var numero = parseFloat(numeroLimpio);
                return numero;
            } else {
                return null;
            }
        }

        function numeroSinDescuento(porcentajeDescuentoAplicado) {
            var numeroDescuento = obtenerNumero();
            var currencyInsurance = bookingData.TotalPriceCurrencyLocal;
            if (numeroDescuento !== null && currencyInsurance === 'USD') {
                var precioOriginal = numeroDescuento / (1 - porcentajeDescuentoAplicado / 100);
                return parseFloat(precioOriginal.toFixed(2));
            } else if (numeroDescuento !== null && currencyInsurance === 'CLP') {
                var porcentajeRestante = 100 - porcentajeDescuentoAplicado;
                var porcentajeDecimal = porcentajeRestante / 100;
                var precioOriginal = Math.round(numeroDescuento / porcentajeDecimal);
                return precioOriginal;
            }
        }

        function editarTextoPasajero(porcentajeDescuentoAplicado) {
            var precioOriginal = numeroSinDescuento(porcentajeDescuentoAplicado);
            var agregado = document.querySelector('.text-pasajero #precio-original');
            if (precioOriginal !== null && !agregado) {
                var currencyInsurance = bookingData.TotalPriceCurrencyLocal;
                var precioFormateado;
                if (currencyInsurance === 'USD') {
                precioFormateado = precioOriginal.toFixed(2).replace('.', ','); // Formato con coma decimal para USD
            } else if (currencyInsurance === 'CLP') {
                precioFormateado = precioOriginal.toLocaleString('es-CL'); // Formato con puntuación para CLP
            }
            var elemento = document.querySelector('.data-opener-title .text-pasajero');
            if (elemento && currencyInsurance) {
                var textoOriginal = elemento.textContent;

                var spanPrecioOriginal = document.createElement('span');
                spanPrecioOriginal.id = 'precio-original';
                spanPrecioOriginal.textContent = `$${precioFormateado} ${currencyInsurance}`;

                var spanPrecioDescuento = document.createElement('span');
                spanPrecioDescuento.id = 'precio-descuento';
                spanPrecioDescuento.innerHTML = '<br>' + textoOriginal;

                elemento.innerHTML = '';
                elemento.appendChild(spanPrecioOriginal);
                elemento.appendChild(spanPrecioDescuento);
            } else {
                console.log('No se encontró el elemento original para editar.');
            }
        }
    }

    function cambiarImagenDeFondo(nuevaUrl) {
        var elemento = document.querySelector('.extras-insurance-header');

        if (elemento && nuevaUrl) {
            // Cambiar la URL de la imagen de fondo
            elemento.style.backgroundImage = 'url("' + nuevaUrl + '")';
        } else {
            console.error('No se pudo cambiar la imagen de fondo.');
        }
    }

    function hideTitle() {
        var icon = document.querySelector('.js-icon-covid.js-cv-covid-shield-plane.insurance-title-icon');
        var title = document.querySelector('.extras-insurance-title-box');
        if (icon) {
            icon.style.display = 'none';
        }
        if (title) {
            title.style.display = 'none';
        }
    }

    function getDeviceType() {
        const width = window.innerWidth;
        if (width > 1024) {
            return 'desktop';
        } else if (width >= 768) {
            return 'tablet';
        } else {
            return 'mobile';
        }
    }

    function setBackgroundImageBasedOnDevice() {
        const deviceType = getDeviceType();
        let imageUrl;

        switch (deviceType) {
        case 'desktop':
            if (tipoVuelo === 'INTER') {
                imageUrl = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/93f2241c-92ac-4d8b-988e-ad1213d89e7c/Cyber_Seguros_Desktop_Inter.png';
            } else if (tipoVuelo === 'DOM-CL') {
                imageUrl = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/94d5f089-4ea7-4e9a-b8fc-c9ccc3172609/Cyber_Seguros_Desktop_Dom.png';
            }
            break;
        case 'tablet':
            if (tipoVuelo === 'INTER') {
                imageUrl = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/07b55cc7-ae66-4809-b033-b9a4110c7884/Cyber_Seguros_Tablet_Inter.png';
            } else if (tipoVuelo === 'DOM-CL') {
                imageUrl = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/9d52bce8-320f-4ae3-b228-caeb317012fc/Cyber_Seguros_Tablet_Dom.png';
            }
            break;
        case 'mobile':
            if (tipoVuelo === 'INTER') {
                imageUrl = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/0c0b49ee-04c4-4902-8494-1fa01596a2f1/Cyber_Seguros_Mobile_Inter.png';
            } else if (tipoVuelo === 'DOM-CL') {
                imageUrl = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/4f58455c-c788-4022-a7a5-b656ab7090d5/Cyber_Seguros_Mobile_Dom.png';
            }
            break;
        }
        cambiarImagenDeFondo(imageUrl);
    }

    function textRed() {
        var precioDescuentoElement = document.querySelector("#precio-descuento");

        if (precioDescuentoElement) {
            var precioDescuentoText = precioDescuentoElement.innerHTML.trim();

            var precioMatch = precioDescuentoText.match(/(\$[0-9,.]+\s(?:CLP|USD))/);

            if (precioMatch && precioMatch.length > 0) {
                var precioCompleto = precioMatch[0]; 

                var nuevoSpan = `<br><span class="precio-rojo">${precioCompleto}</span> por pasajero`;
                precioDescuentoElement.innerHTML = nuevoSpan;
            }
        }
    }

    var descuento;

    if (tipoVuelo === 'INTER') {
        descuento = 20;
    } else if (tipoVuelo === 'DOM-CL') {
        descuento = 10;
    }
    
    setTimeout(function () {
        addCSS();
        editarTextoPasajero(descuento);
        textRed();
        hideTitle();
        setBackgroundImageBasedOnDevice();
        window.addEventListener('resize', setBackgroundImageBasedOnDevice);
        window.eventBus.subscribe({
            name: "newDesc",
            callback: function(e) {
                editarTextoPasajero(30);
                textRed();
            }
        });
    }, 3000);

}, 700);