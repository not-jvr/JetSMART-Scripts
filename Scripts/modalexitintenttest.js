// crear el HTML de la modal
var modalHTML = `
  <div id="farelock-modal" class="farelock-modal">
    <div class="farelock-modal-content">
      <span class="farelock-modal-close">&times;</span>
      <p>No te vayas</p>
    </div>
  </div>
`;

// crear el CSS para la modal
var modalCSS = `
  .farelock-modal {
    display: none;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .farelock-modal-content {
    background-color: #fefefe;
    margin: 10% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    text-align: center;
    position: relative;
  }

  .farelock-modal-close {
    color: #aaaaaa;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }

  .farelock-modal-close:hover,
  .farelock-modal-close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`;

// agregar el HTML y CSS al DOM
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = modalCSS;
document.getElementsByTagName('head')[0].appendChild(style);
document.body.insertAdjacentHTML('beforeend', modalHTML);

// obtener la modal y el botón de cerrar
var modal = document.getElementById("farelock-modal");
var closeBtn = document.getElementsByClassName("farelock-modal-close")[0];

// mostrar la modal cuando el cursor se mueve fuera de la ventana del navegador
window.addEventListener("mouseleave", function(event) {
  if (event.clientY < 0) {
    modal.style.display = "block";
  }
});

// cerrar la modal cuando se hace clic en el botón de cerrar
closeBtn.onclick = function() {
  modal.style.display = "none";
}
