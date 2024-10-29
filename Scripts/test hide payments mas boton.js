function hideOthersPayments() {
  var gc = document.querySelector('.ts-hide-on-credit-only-payment');
  if (gc) {
    gc.style.display = 'none';
  }
  var carrusel = document.querySelector('[data-test-id="payment-card-issuer-country"]');
  if (carrusel) {
    carrusel.style.display = 'none';
  }
  var otherPaymentLabels = document.querySelectorAll('label[for^="payment_tab_"]:not([for="payment_tab_TC"])');
  otherPaymentLabels.forEach(function (label) {
    label.style.display = 'none';
  });
}

function showOthersPayments() {
  var gc = document.querySelector('.ts-hide-on-credit-only-payment');
  if (gc) {
    gc.style.display = '';
  }
  var carrusel = document.querySelector('[data-test-id="payment-card-issuer-country"]');
  if (carrusel) {
    carrusel.style.display = '';
  }
  var otherPaymentLabels = document.querySelectorAll('label[for^="payment_tab_"]:not([for="payment_tab_TC"])');
  otherPaymentLabels.forEach(function (label) {
    label.style.display = '';
  });
}

function addShowButton() {
  var container = document.querySelector('.inner-deep-box.ts-hide-on-voucher-only-payment.ts-hide-on-credit-only-payment');
  if (container) {
    var showButton = document.createElement('button');
    showButton.innerText = 'Mostrar';
    showButton.addEventListener('click', showOthersPayments);
    container.appendChild(showButton);
  }
}

hideOthersPayments();
addShowButton();
