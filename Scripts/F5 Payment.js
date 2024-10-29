var initF5PaymentBack = setInterval(function () {
  if (typeof bookingData === "undefined" || window.location.pathname !== '/V2/Payment') return;
  clearInterval(initF5PaymentBack);

  let previousPathname = window.location.pathname;

  const originalPushState = history.pushState;
  history.pushState = function() {
    originalPushState.apply(this, arguments);
    verificarCambioPathname();
  };

  const originalReplaceState = history.replaceState;
  history.replaceState = function() {
    originalReplaceState.apply(this, arguments);
    verificarCambioPathname();
  };

  window.addEventListener("popstate", verificarCambioPathname);

  function verificarCambioPathname() {
    const currentPathname = window.location.pathname;
    if (previousPathname === "/V2/Payment" && currentPathname !== "/V2/Payment") {
      console.log("CAMBIO");
      location.reload(); // Recargar la página
    }
    previousPathname = currentPathname;
  }

}, 800);