var intervalFix = setInterval(function(){
    if(!document.querySelector("body > div:nth-child(5) > app-header > loader")) return;
    clearInterval(intervalFix);

    document.querySelector("body > div:nth-child(5) > app-header > loader").style.display = 'none'

    
}, 200);