var intDesempeño = setInterval(function(){
    if(typeof bookingData === "undefined") return;
    clearInterval(intDesempeño);
    // anotar el nombre de vuelo, variable o algo asi
    var culture = bookingData.Culture;
    if(culture == 'pt-BR'){
        window.eventBus.subscribe({
            name: "Desempeño", callback: function (e) {
                const flightInfos = document.querySelectorAll('.operator-information');
                flightInfos.forEach(flightInfo => {
                    const duplicated = flightInfo.parentElement.querySelectorAll('.duplicated-operator-information');
                    if(duplicated.length > 1) {
                        duplicated.forEach((dup, index) => {
                            if(index !== 0) dup.remove();
                        });
                    } else if(duplicated.length === 0) {
                        const duplicatedText = flightInfo.cloneNode(true);
                        duplicatedText.classList.add('duplicated-operator-information');
                        duplicatedText.textContent = "Utilizar FlexiSMART"
                        flightInfo.insertAdjacentElement('beforebegin', duplicatedText);
                    }
                });
                document.querySelectorAll('.itinerary').forEach(itinerary => {
                    itinerary.style.height = '90px';
                });
            }
        });
    }
}, 200);