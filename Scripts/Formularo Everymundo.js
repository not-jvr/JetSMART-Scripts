function addCSS() {
    var css = `
        .center-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 400px;
            font-family: 'Lato', sans-serif;
        }

        .form-container {
            background-color: #cacaca;
            padding: 17px;
            width: 340px;
            border-radius: 8px;
            text-align: center;
        }

        .form-container h2 {
            font-size: 16px;
            color: #af272f;
            margin-bottom: 10px;
            font-weight: 800;
        }

        form input,
        form select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            box-sizing: border-box;
            font-size: 14px;
        }

        .form-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
        }

        .form-container form button {
            padding: 10px;
            background-color: #af272f;
            color: white;
            border: none;
            border-radius: 999px;
            width: 120px;
            font-weight: 700;
            cursor: pointer;
            font-family: 'Lato', sans-serif;
        }

        form button:hover {
            background-color: #8b0000;
        }

        .legal-link {
            font-size: 14px;
            color: #00AEC7;
            text-decoration: none;
        }

        .legal-link:hover {
            text-decoration: underline;
        }
    `;

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
}

function htmlForms() {
    const mainElement = document.querySelector('#main');
    
    if (mainElement && !document.querySelector('.center-container')) {
        const formHTML = `
            <div class="center-container">
                <div class="form-container">
                    <h2>DÉJANOS TUS DATOS PARA PARTICIPAR EN EL SORTEO</h2>
                    <form>
                        <input type="text" placeholder="Nombre y Apellido" required>
                        <input type="text" placeholder="Colegio" required>
                        <input type="email" placeholder="Email" required>
                        <select required>
                            <option value="" disabled selected>Región</option>
                            <option value="region1">Arica y Parinacota</option>
                            <option value="region2">Atacama</option>
                            <option value="region2">Tarapacá</option>
                            <option value="region2">Antofagasta</option>
                            <option value="region2">Coquimbo</option>
                            <option value="region2">Metropolitana</option>
                            <option value="region2">Valparaíso</option>
                            <option value="region2">Aysén</option>
                            <option value="region2">Magallanes</option>
                            <option value="region2">Biobío</option>
                            <option value="region2">O’Higgins</option>
                            <option value="region2">Los Ríos</option>
                            <option value="region2">Maule</option>
                            <option value="region2">Ñuble</option>
                            <option value="region2">Araucanía</option>
                        </select>
                        <div class="form-footer">
                            <a href="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/3a82a584-988a-4f52-9037-37f784fe7f3f/BBLL_Charlas%20Vocacionales%20con%20nuestras%20Pilotos_CL.pdf" class="legal-link" target="_blank">Bases Legales</a>
                            <button type="submit">ENVIAR</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        mainElement.insertAdjacentHTML('afterend', formHTML);
    }
}

addCSS();
htmlForms();