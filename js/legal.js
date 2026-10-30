/* Textos legales (modelo de ejemplo para la preview — deben ser revisados por el titular y su asesor legal) */
(function(){
  const C = window.CAUCE, $ = (s, r = document) => r.querySelector(s);
  const warn = '<div class="warn"><b>Preview.</b> Texto modelo de ejemplo. El titular de CAUCE hogar y su asesor legal deben revisarlo y completarlo antes de publicar el sitio.</div>';
  const DOCS = {
    terminos: ['Términos y condiciones', warn + `
      <h4>1. Titular del sitio</h4><p>Este sitio pertenece a CAUCE hogar, emprendimiento radicado en ${C.CFG.city}, Argentina. Datos del titular (razón social, CUIT y domicilio): <i>a completar al publicar</i>.</p>
      <h4>2. Naturaleza de esta versión</h4><p>La presente es una versión preview creada por APS Developer con fines de presentación. No procesa pagos ni pedidos reales y la información puede cambiar.</p>
      <h4>3. Productos y precios</h4><p>Las imágenes, colores y simulaciones de iluminación son ilustrativas y pueden diferir levemente del producto real y de la luz de tu ambiente. Los precios se expresan en pesos argentinos con impuestos incluidos, salvo indicación contraria, y pueden modificarse sin previo aviso hasta confirmar el pedido. Las promociones, descuentos por cantidad, cupones y medios de pago mostrados son ejemplos.</p>
      <h4>4. Pedidos y pago</h4><p>Los pedidos se envían por WhatsApp. La compra se perfecciona cuando el vendedor confirma disponibilidad, precio total, forma de pago y envío.</p>
      <h4>5. Envíos</h4><p>Se realizan a todo el país. El costo y el plazo dependen del destino y del correo o transporte, y se informan antes de abonar. Los valores que muestra la web son estimaciones.</p>
      <h4>6. Garantía y revocación</h4><p>Rigen los derechos de la Ley 24.240 de Defensa del Consumidor: garantía legal de 6 meses para cosas nuevas (art. 11) y derecho de revocar la aceptación dentro de los 10 días corridos desde la entrega (art. 34), sin costo para el consumidor.</p>
      <h4>7. Propiedad intelectual</h4><p>La marca, el nombre y los contenidos de CAUCE hogar pertenecen a sus titulares. El diseño y desarrollo del sitio corresponden a APS Developer.</p>
      <h4>8. Jurisdicción</h4><p>Se aplican las leyes de la República Argentina. Para consumidores rige la jurisdicción de su domicilio. Podés presentar reclamos ante la autoridad de aplicación de tu jurisdicción o en argentina.gob.ar/produccion/defensadelconsumidor.</p>`],
    privacidad: ['Política de privacidad', warn + `
      <h4>Responsable</h4><p>CAUCE hogar, ${C.CFG.city}. Contacto: WhatsApp +54 9 3435 03-2402 · Instagram @${C.CFG.ig}.</p>
      <h4>Qué datos tratamos</h4><ul><li>Datos que enviás por WhatsApp para gestionar tu consulta o pedido (nombre, teléfono, ciudad y código postal).</li><li>Tu carrito, que se guarda solo en tu navegador.</li><li>Datos técnicos de navegación, solo si aceptás cookies analíticas.</li></ul>
      <h4>Finalidad</h4><p>Responder consultas, gestionar pedidos y envíos y mejorar el sitio. No vendemos tus datos.</p>
      <h4>Tus derechos</h4><p>Conforme a la Ley 25.326 de Protección de los Datos Personales, podés acceder, rectificar y suprimir tus datos escribiéndonos. La Agencia de Acceso a la Información Pública es el órgano de control y atiende denuncias y reclamos.</p>
      <h4>Seguridad y conservación</h4><p>Aplicamos medidas razonables para proteger tu información y la conservamos solo el tiempo necesario para las finalidades indicadas.</p>
      <h4>Preview</h4><p>Esta versión de prueba no envía tus datos a ningún servidor propio: el formulario del carrito solo arma un mensaje de WhatsApp.</p>`],
    cookies: ['Política de cookies', warn + `
      <h4>¿Qué son?</h4><p>Pequeños archivos o datos que se guardan en tu dispositivo para recordar preferencias y medir el uso del sitio.</p>
      <h4>Tipos</h4><ul><li><b>Necesarias:</b> permiten navegar, recordar tu carrito y tu elección de cookies. No se pueden desactivar.</li><li><b>Analíticas:</b> estadísticas anónimas de uso. Solo con tu consentimiento.</li><li><b>Marketing:</b> medición de campañas. Solo con tu consentimiento.</li></ul>
      <h4>Tu elección</h4><p>Podés cambiar tu decisión cuando quieras desde “Preferencias de cookies” en el pie de página o borrando los datos del sitio en tu navegador.</p>
      <h4>Preview</h4><p>Esta versión no instala cookies de seguimiento. Se describe el funcionamiento previsto para el sitio final.</p>`],
    devoluciones: ['Devoluciones y botón de arrepentimiento', warn + `
      <h4>Tu derecho</h4><p>Según el art. 34 de la Ley 24.240 y la Res. 424/2020, si compraste a distancia podés revocar la compra dentro de los 10 días corridos desde que recibiste el producto o desde la celebración del contrato, lo último que ocurra. La revocación no tiene costo para vos.</p>
      <h4>Cómo hacerlo</h4><p>Completá el formulario: se abrirá WhatsApp con tu solicitud. Te confirmamos la recepción y coordinamos la devolución del producto en su estado original y el reintegro.</p>
      <h4>Cambios por falla</h4><p>Si tu lámpara llega con un defecto, escribinos y lo resolvemos dentro de la garantía legal.</p>
      <div class="form" id="arrep"><input class="fld" id="an" placeholder="Nombre y apellido"><input class="fld" id="ap" placeholder="Producto comprado"><input class="fld" id="af" placeholder="Fecha de compra o número de pedido"><button class="btn dark" id="aSend" type="button">Solicitar arrepentimiento por WhatsApp</button></div>`]
  };

  const tabs = $('#tabs'), box = $('#doc');
  tabs.innerHTML = Object.keys(DOCS).map(k => `<button class="chip" data-k="${k}">${DOCS[k][0].split(' y ')[0]}</button>`).join('');
  function show(k){
    if (!DOCS[k]) k = 'terminos';
    box.innerHTML = '<h2>' + DOCS[k][0] + '</h2>' + DOCS[k][1];
    Array.from(tabs.children).forEach(b => b.classList.toggle('on', b.dataset.k === k));
    const s = $('#aSend');
    if (s) s.onclick = () => {
      const n = $('#an').value.trim(), p = $('#ap').value.trim(), f = $('#af').value.trim();
      if (!n || !p) { C.ui.toast('Completá tu nombre y el producto'); return; }
      window.open(C.WA('Hola CAUCE hogar! Quiero ejercer mi derecho de arrepentimiento.\nNombre: ' + n + '\nProducto: ' + p + (f ? '\nCompra: ' + f : '')), '_blank', 'noopener');
    };
  }
  tabs.addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) { location.hash = b.dataset.k; } });
  addEventListener('hashchange', () => show(location.hash.slice(1)));
  show(location.hash.slice(1));
})();
