# CAUCE hogar — web preview (APS Developer)

Sitio estático multipágina (HTML + CSS + JS), sin build.

- `index.html` home con video de inicio, escena 3D corta con scroll y destacados
- `catalogo.html` catálogo con búsqueda, filtros y orden
- `producto.html?id=neg` ficha de producto (galería, variantes, specs, cálculo de envío)
- `carrito.html` carrito, cupón, envío por CP, medio de pago y pedido por WhatsApp
- `ambientes.html` visualizador interactivo de lámparas
- `nosotros.html` historia, envíos y preguntas frecuentes
- `legal.html` términos, privacidad, cookies y botón de arrepentimiento

## Para editar
- Productos, precios, stock, cupones, descuentos y envíos: `js/data.js`
- Video del inicio: poner un MP4 en `assets/video/hero.mp4` (se recomienda 1080p, H.264, sin audio, menos de 8 MB). Si no existe, se muestra un fondo animado.
- Fotos reales: hoy las lámparas son ilustraciones SVG (`js/art.js`); reemplazarlas por `<img>` en `C.card` (`js/layout.js`) y en `js/product.js`.
