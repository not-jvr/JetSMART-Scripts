var initForceMPARG = setInterval(function () {
  if(typeof bookingData === "undefined" || !document.querySelector('label[for="payment_tab_KA"]') || window.location.pathname !== '/V2/Payment') return;
  clearInterval(initForceMPARG);
  var culture = bookingData.Culture;
  
  if(culture === 'es-AR'){
    function addMercadoPagoMsje(selector){
      const newElement = document.createElement('div');
      newElement.id = 'mercadopago-suggestion';
      newElement.innerHTML = '<span>Recordá que ya podés pagar desde tu billetera de mercado pago, en simples pasos.</span>';
      const css = `
      #mercadopago-suggestion {
        display: flex;
        padding: 5px;
        position: relative;
        background-color: rgb(89, 195, 217);
        line-height: 30px;
        color: white;
        border: 1px;
        border-radius: 5px;
        align-items: center;
        margin: 10px;
        margin-left: 10px;
      }
      `;
      const head = document.head || document.getElementsByTagName('head')[0];
      const style = document.createElement('style');
      head.appendChild(style);
      style.type = 'text/css';
      if (style.styleSheet){
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
      const parentElement1 = document.querySelector(selector);
      parentElement1.parentNode.insertBefore(newElement, parentElement1.nextSibling);
    }

    addMercadoPagoMsje("ac-payment-method-selector")
    //boton
    const mercadoPago = document.querySelector('label[for="payment_tab_KA"]').parentNode;
    const mercadoPagoInput = document.querySelector('input#payment_tab_KA');
    const parentElement = document.querySelector('ac-payment-method-selector');
    parentElement.insertBefore(mercadoPago, parentElement.firstChild);
    parentElement.insertBefore(mercadoPagoInput, parentElement.firstChild);
    //

    let initialScrollTop = window.scrollY;
    const onScroll = () => {
      if (window.scrollY > initialScrollTop) {
        window.scrollTo({
          top: initialScrollTop,
          behavior: 'smooth',
        });
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll);
    mercadoPagoInput.click();
    
    if(culture === 'es-AR'){
      window.eventBus.subscribe({
        name: "Payment_buttons", callback: function (e) {
          const paymentButtons = document.querySelectorAll('[for="payment_tab_AR - MP Debit"], [for="payment_tab_MR"], [for="payment_tab_KD"]');
          const buttonClick = function () {
            if(document.querySelector('[id="mercadopago-suggestion"]')){
              const msjeMPARG = document.querySelector('[id="mercadopago-suggestion"]')
              msjeMPARG.parentNode.removeChild(msjeMPARG)
            } 
          };
          paymentButtons.forEach(button => button.addEventListener('click', buttonClick));

          const mercadopagoButton = document.querySelectorAll('[for="payment_tab_KA"]')
          const mercadopagobuttonClick = function () {
            if(!document.querySelector('[id="mercadopago-suggestion"]')){
              addMercadoPagoMsje(".inner-deep-box.ts-hide-on-voucher-only-payment.ts-hide-on-credit-only-payment")
            } 
          };
          mercadopagoButton.forEach(button => button.addEventListener('click', mercadopagobuttonClick));
        }
      });
    }
  }
}, 600);