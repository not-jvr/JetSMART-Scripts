var changeImageMR = setInterval(function () {
    if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Payment' || !document.querySelector('#mainContentPayment .inner-deep-box ul')) return;
    clearInterval(changeImageMR);

    culture = bookingData.Culture;

    function changeIMG() {
        var imgMR = document.querySelector('#mainContentPayment .payment-card-img[data-test-id="payment-method-selector-icon--c|MR"]');
        if (imgMR) {
            imgMR.src = 'https://assets-us-01.kc-usercontent.com/b2956330-c34f-0064-2c6f-27bd5c0147fc/8a88ddb4-ccb9-4b0d-8b21-094cc576dffb/credito%20AR.png';
        }   
    }

    if (culture === 'es-AR') {
        changeIMG();
    }

}, 600);