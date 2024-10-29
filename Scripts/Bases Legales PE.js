var initBasesLegalesPE = setInterval(function () {
    if(window.location.pathname !== '/pe/es/minisitios/peruvuelasmart') return;
    clearInterval(initBasesLegalesPE);

    const mainContainer = document.querySelector('.form-group.mb-0.text-right');
    const linkContainer = document.createElement('div');
    const link = document.createElement('a');
    link.textContent = 'Ver bases legales';
    link.href = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/5f17c249-93f8-41ee-b71f-98c3ade06c29/%5BBBLL%5D%20Gana%20con%20el%20Cyber%20SMART%20-%20Marzo%202023%20%281%29.pdf';
    link.classList.add('bases-legales');

    // Aplicar estilos CSS al enlace
    link.style.marginRight = '20px';
    link.style.fontSize = '14px';

    // Aplicar estilos CSS al contenedor del enlace
    linkContainer.style.position = 'absolute';
    linkContainer.style.left = '0';
    linkContainer.style.bottom = '0';
    linkContainer.appendChild(link);

    // Asegurarse de que el contenedor principal tenga posición relativa
    mainContainer.style.position = 'relative';

    mainContainer.insertBefore(linkContainer, document.getElementById('register-button'));
}, 200);