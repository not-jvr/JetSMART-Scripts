var css = `
  #mainContentPayment .tabs nav ul li {
    border: 1px solid #163a70;
    border-radius: 5px;
    padding: 10px;
    position: relative;
    background: #fff;
    display: flex; /* Agregado para la alineación de elementos */
    align-items: center; /* Centra los elementos verticalmente */
  }

  #mainContentPayment .tabs nav ul li label {
    display: flex; /* Usar flexbox para alinear elementos */
    align-items: center; /* Centra los elementos verticalmente */
  }

  #mainContentPayment .tabs nav ul li label .payment-card-img {
    margin: 0;
    border: none;
    max-width: 30%;
    height: auto;
    background: none;
  }
`;

var head = document.head || document.getElementsByTagName('head')[0];
var style = document.createElement('style');
head.appendChild(style);
style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}
