var initChangePrice = setInterval(function () {
	if (!window.location.pathname.toLowerCase().startsWith('/cl/es/buscador-smart')) return;
	clearInterval(initChangePrice);

	function changePrice(selector, selectorchange) {
		var elements = document.querySelectorAll('#nac .price-table');

		elements.forEach(element => {
			if (element.textContent.trim() === "$ " + selector) {
				element.textContent = "$ " + selectorchange;
			}
		});
	}

	//PRIMERO VA EL PRECIO BUSCADO Y SEGUNDO EL PRECIO POR EL QUE SE DESEA CAMBIAR, SI DESEAN CAMBIAR MAS DE UNO ES COSA DE VOLVER A LLAMAR A LA FUNCION
	console.log("sirve utag");
	//changePrice("30.349", "1.000");
	
}, 600);