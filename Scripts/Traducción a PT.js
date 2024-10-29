var initChangeText = setInterval(function () {
	if (window.location.pathname.toLowerCase() !== '/member/register') return;
	clearInterval(initChangeText);

	function changeText() {
    /////TITULO/////
		var titulo = document.querySelector('[data-test-id="register-main-title"]');
		titulo.textContent = "Inscreva-se";

    //////PRIMER PARRAFO///////
		var parrafo = document.querySelector('[data-test-id="register-main-content-container"] p');
		parrafo.textContent = "Aproveite ao máximo o JetSMART criando uma conta. Depois de registrado, você poderá desfrutar de uma experiência feita sob medida para você. Aqui estão alguns dos benefícios de criar sua conta:";

    ////SIGUIENTES LINEAS//////
		var lista = document.querySelector('[data-test-id="register-description-list"]');
		var itemsLista = lista.querySelectorAll('li');

		var nuevosTextos = [
			"Obtenha ofertas feitas para você",
			"Gerencie sua viagem",
			"Reservas fáceis com preenchimento automático"
			];

		itemsLista.forEach(function(item, index) {
			if (index < nuevosTextos.length) {
				item.textContent = nuevosTextos[index];
			} else {
				item.textContent = "Texto genérico para elemento " + (index + 1);
			}
		});

    //// INPUTS ////
		var labels = document.querySelectorAll('.mdl-textfield__label');

		if (labels.length >= 6) {
        labels[0].textContent = "Email*"; //Correo electrónico*
        labels[1].textContent = "Confirme seu email*"; //Confirma tu correo electrónico*
        labels[2].textContent = "Crie sua senha*"; //Crea tu contraseña*
        labels[3].textContent = "Confirme sua senha*"; //Confirma tu contraseña*
        labels[4].textContent = "Nomes*"; //Nombres*
        labels[5].textContent = "Sobrenomes*"; //Apellidos*
    } else {
    	console.error("No se encontraron suficientes elementos con la clase 'mdl-textfield__label'");
    }

    ///// TERMINOS Y CONDICIONES ////
    var aceptarTerminosLabel = document.querySelector('[data-test-id="register-form"] .cb-title');
    if (aceptarTerminosLabel) {
    	aceptarTerminosLabel.innerHTML = 'Aceito os <a target="_blank" href="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/f2ec29e4-83b6-4a49-9184-809a8a25e050/Términos%20y%20Condiciones%20de%20Transporte%20-%20JetSMART%20Colombia.pdf">Termos e Condições</a>, <a target="_blank" href="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/dcd8ad2a-c2bd-4142-b092-bce1251b052f/20240123-Pol%C3%ADtica%20de%20Privacidad%20CO%20%28Final%29.pdf">Políticas de Privacidade</a> e <a target="_blank" href="https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/cf176d9f-2076-4d75-b69f-41674fe4b88c/20240123-Tratamiento%20de%20Datos%20CO%20%28Final%29.pdf">Tratamento de Dados Pessoais.</a>';
    } else {
    	console.error("No se encontró el elemento para aceptar los términos");
    }

    ///// BOTON ////
    var guardarButton = document.querySelector('[data-test-id="register-submit-button"]');
    if (guardarButton) {
    	guardarButton.textContent = "Guardar";
    } else {
    	console.error("No se encontró el botón para guardar");
    }

    ///// MODIFICACIÓN DE TÍTULOS DE SECCIÓN /////
    var h1Elements = document.querySelectorAll('h1');

    if (h1Elements.length >= 2) {
        h1Elements[0].textContent = "Informações do usuário"; //Información de usuario
        h1Elements[1].textContent = "Informações de contato"; //Información de contacto
    } else {
    	console.error("No se encontraron suficientes elementos h1 para modificar");
    }
}

changeText();

}, 600);