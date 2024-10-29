var initAddMsg = setInterval(function () {
	if (window.location.pathname.toLowerCase() !== '/pe/es/quienes-somos/home') return;
	clearInterval(initAddMsg);

	function addMsjePeru(selector) {
		var msgAutoCheckin = document.querySelector('#text-msje-peru');
		if (!msgAutoCheckin) {
			const container = document.querySelector(selector);
			const newElement = document.createElement('div');
			newElement.id = 'text-msje-peru';
			newElement.innerHTML = `
			<strong>Comunicación Beneficiario Final</strong>
			<p>
			De acuerdo a lo dispuesto en el segundo párrafo del inciso c) del párrafo 6.3 del artículo 6 del Decreto Legislativo No. 1372 y en el párrafo 7.3 del artículo 7 del Decreto Supremo No. 003-2019-EF, se comunica que JETSMART AIRLINES PERÚ S.A.C. ha realizado los mecanismos razonables para obtener la información del beneficiario final, considerando los criterios de propiedad y control previstos en los literales a) y b) del párrafo 4.1 del artículo 4 del Decreto Legislativo 1372 y en los párrafos 5.1 al 5.4 de su Reglamento y documentado estos, respectivamente.
			</p>
			<p>
			Es por ello que, habiendo realizado el análisis correspondiente, se determinó que no existe ninguna persona natural que califique como Beneficiario Final según los criterios de propiedad y control detallados en los literales a) y b) del párrafo 4.1 del artículo 4 del Decreto Legislativo 1372 y en los párrafos 5.1 al 5.4 de su Reglamento y documentado estos, respectivamente.
			</p>
			<p>
			En dicho sentido, de conformidad con el inciso c) del párrafo 4.1 del Decreto Legislativo 1372 y el inciso c) párrafo 4.1 del artículo 4 del Decreto Supremo N.° 003-2019-EF, hemos considerado como beneficiario final a la persona que ocupa el puesto administrativo superior.
			</p>
			`;
			const css = `
			#text-msje-peru {
				display: flex;
				flex-direction: column;
				color: #193969;
				text-align: center;
			}

			#text-msje-peru strong {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 10px;
			}

			#text-msje-peru p {
				font-size: 15px;
				line-height: 20px;
				margin-bottom: 10px;
			}

			@media screen and (max-width: 767px) {

				#text-msje-peru strong {
					font-size: 15px;
					font-weight: bold;
					margin-bottom: 5px;
				}

				#text-msje-peru p {
					font-size: 12px;
					line-height: 16px;
				}
			}
			`;
			const head = document.head || document.getElementsByTagName('head')[0];
			const style = document.createElement('style');
			head.appendChild(style);
			style.type = 'text/css';
			if (style.styleSheet) {
				style.styleSheet.cssText = css;
			} else {
				style.appendChild(document.createTextNode(css));
			}
			container.insertAdjacentElement('afterend', newElement);
		}
	}

	if(window.location.pathname.toLowerCase() === '/pe/es/quienes-somos/home' && document.querySelector('#page-content')){
		addMsjePeru('#page-content');
	}

}, 600);