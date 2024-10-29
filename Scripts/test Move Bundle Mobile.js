function moverBundleTest() {
  moverCirculoTest();
  const bundleContainer = document.querySelector('.bundles-row');
  const bnd0 = document.querySelector('.bundles-row [data-test-id="bundle-selector-option--j|0-c|none"]');
  const bnd2 = document.querySelector('.bundles-row [data-test-id="bundle-selector-option--j|0-c|full"]');

  bundleContainer.insertBefore(bnd2, bundleContainer.firstChild);
  // Actualizar clases de los bundles
  const bnd0Content = document.querySelector('.bundles-row [data-test-id="bundle-selector-option--j|0-c|none"] .bundle-content');
  const bnd2Content = document.querySelector('.bundles-row [data-test-id="bundle-selector-option--j|0-c|full"] .bundle-content.active');
  bnd2Content.classList.remove('active');
  bnd0Content.classList.add('active');
}

function moverCirculoTest() {
  const selectorContainer = document.querySelector('.selector-buttons-container');
  const circuloFull = document.querySelector('.selector-buttons.js-icon-bundle.js-bundle-circle-full');

  // Mover el segundo círculo al principio del contenedor
  selectorContainer.insertBefore(circuloFull, selectorContainer.firstChild);
}

moverBundleTest();