var initBotones = setInterval(function(){
	if(!document.querySelector("#box-1 > div.container > div.row.mt-3.mt-md-5 > div.col-11.col-sm-6.col-lg-4.col-xl-3.mx-auto > a")) return;
	clearInterval(initBotones);
	var agencias = "https://booking.jetsmart.com/V2/Login?agency=1&culture=es-CL&url=https://jetsmart.com/cl/es/agencias"
	var empresas = "https://booking.jetsmart.com/V2/Login?company=1&culture=es-CL&url=https://jetsmart.com/cl/es/"
	if(document.querySelector("#box-1 > div.container > div.row.mt-3.mt-md-5 > div.col-11.col-sm-6.col-lg-4.col-xl-3.mx-auto > a")){
		var block = document.getElementsByClassName("col-11 col-sm-6 col-lg-4 col-xl-3 mx-auto")
		var boton = document.querySelector("#box-1 > div.container > div.row.mt-3.mt-md-5 > div.col-11.col-sm-6.col-lg-4.col-xl-3.mx-auto > a");
		pos = block[0];
		var botonclone = boton.cloneNode(true);
		if(!document.querySelector("#box-1 > div.container > div.row.mt-3.mt-md-5 > div.col-11.col-sm-6.col-lg-4.col-xl-3.mx-auto > a:nth-child(2)")){
			pos.appendChild(botonclone)
			document.querySelector("#box-1 > div.container > div.row.mt-3.mt-md-5 > div.col-11.col-sm-6.col-lg-4.col-xl-3.mx-auto > a:nth-child(1) > div.col-10.p-1.align-self-center > h2").textContent = 'Registro Empresas'
			document.querySelector("#box-1 > div.container > div.row.mt-3.mt-md-5 > div.col-11.col-sm-6.col-lg-4.col-xl-3.mx-auto > a:nth-child(2) > div.col-10.p-1.align-self-center > h2").textContent = 'Registro Agencias'
			document.querySelector("#box-1 > div.container > div.row.mt-3.mt-md-5 > div.col-11.col-sm-6.col-lg-4.col-xl-3.mx-auto > a:nth-child(1)").setAttribute("href", empresas);
			document.querySelector("#box-1 > div.container > div.row.mt-3.mt-md-5 > div.col-11.col-sm-6.col-lg-4.col-xl-3.mx-auto > a:nth-child(2)").setAttribute("href", agencias);
		}
	}
}, 200);