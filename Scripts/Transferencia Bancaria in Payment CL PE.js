var intervalChangeTextTransferencia = setInterval(function(){
    if(typeof bookingData == "undefined" || !document.querySelector("#mainContentPayment > section > div > section > ac-payment-methods-container > div > nav > ul > ac-payment-method-selector > li:nth-child(2)")) return;
    clearInterval(intervalChangeTextTransferencia);
    var culture = bookingData.Culture;
    if(culture == 'es-CL' || culture == 'es-cl' || culture == 'es-PE' || culture == 'es-pe'){
        var count = document.getElementsByClassName('payment-card-img').length;
        var doble = count * 2;
        var pos = 0;
        for(var i = 2; i <= doble; i = i + 2){
            var y = document.getElementsByClassName('payment-card-img');
            var x = y[pos];
            if(x.alt == 'Transferencia Electrónica' || x.alt == 'Transferencia Bancaria'){
                z = document.querySelector(`#mainContentPayment > section > div > section > ac-payment-methods-container > div > nav > ul > ac-payment-method-selector > li:nth-child(${i}) > label > span`).textContent = 'Paga desde tu banco';
            } else {
                w = document.querySelector(`#mainContentPayment > section > div > section > ac-payment-methods-container > div > nav > ul > ac-payment-method-selector > li:nth-child(${i}) > label > span`).textContent = x.alt;
            }
            pos = pos + 1;
        }
        pos = 0;
    }

    document.querySelector("#mainContentPayment > section > div > section > ac-payment-methods-container > div > div > ac-input-issuer-country").onclick = function() {myFunction()};
    function myFunction() {
        setTimeout(function(){
           if(culture == 'es-CL' || culture == 'es-cl' || culture == 'es-PE' || culture == 'es-pe'){
            var count = document.getElementsByClassName('payment-card-img').length;
            var doble = count * 2;
            var pos = 0;
            for(var i = 2; i <= doble; i = i + 2){
                var y = document.getElementsByClassName('payment-card-img');
                var x = y[pos];
                if(x.alt == 'Transferencia Electrónica' || x.alt == 'Transferencia Bancaria'){
                    z = document.querySelector(`#mainContentPayment > section > div > section > ac-payment-methods-container > div > nav > ul > ac-payment-method-selector > li:nth-child(${i}) > label > span`).textContent = 'Paga desde tu banco';
                } else {
                    w = document.querySelector(`#mainContentPayment > section > div > section > ac-payment-methods-container > div > nav > ul > ac-payment-method-selector > li:nth-child(${i}) > label > span`).textContent = x.alt;
                }
                pos = pos + 1;
            }
            pos = 0;       
        }
        
    }, 250);
    }

}, 1000);
