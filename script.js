// Simple 3D cube rotation for placeholder viewer
function initCube() {
  const cube = document.getElementById('lampCube');
  if (!cube) return;
  // Nothing else; CSS handles animation
}

// Cookie banner handling
function showCookieBanner() {
  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.innerHTML = 'Este sitio usa cookies para garantizar la mejor experiencia. <button id="cookiAccept">Aceptar</button>';
  document.body.appendChild(banner);
  document.getElementById('cookiAccept').addEventListener('click', () => { banner.remove(); });
}

document.addEventListener('DOMContentLoaded', () => {
  initCube();
  showCookieBanner();
});
