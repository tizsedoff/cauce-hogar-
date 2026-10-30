// Simple placeholder for 3D lamp rendering
// In a production site, use three.js or similar.

function initCanvas() {
    const canvas = document.getElementById('lampCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#333';
    ctx.font = '20px Arial';
    ctx.fillText('3D Lamp viewer placeholder', 10, 30);
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
    initCanvas();
    showCookieBanner();
});
