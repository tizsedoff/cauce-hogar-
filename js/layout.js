/* Layout compartido: barra preview, anuncios, navegación, carrito lateral, footer, cookies */
(function(){
  const C = window.CAUCE, S = C.store, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const page = document.body.dataset.page || '';
  const ui = C.ui = {};
  if (page !== 'home') document.body.classList.add('solid');

  const NAV = [['index.html', 'Inicio', 'home'], ['catalogo.html', 'Catálogo', 'catalogo'], ['ambientes.html', 'Ambientes', 'ambientes'], ['envios.html', 'Envíos y pagos', 'envios'], ['nosotros.html', 'Nosotros', 'nosotros'], ['contacto.html', 'Contacto', 'contacto']];
  const ANN = [
    C.CFG.cuotas + ' cuotas sin interés',
    C.CFG.transferOff + '% OFF por transferencia',
    'Envíos a todo el país desde Paraná',
    'Envío gratis desde ' + C.money(C.CFG.freeFrom),
    'Retiro gratis en Paraná',
    'Pack x2 desde $ 59.500 · Promo de octubre',
    'Pagá con Mercado Pago',
    '10 días para arrepentirte'
  ];
  const annHalf = ANN.concat(ANN).map(t => '<span>' + t + '</span>').join('');

  const header = `
  <div id="pv" role="note"><span class="dot"></span><span><b>Versión preview</b> · Propuesta de diseño, no es el sitio oficial de CAUCE hogar</span><span class="hide">· by APS Developer</span></div>
  <div id="ann" role="marquee" aria-label="Cuotas, envíos y promociones"><div class="annT"><div class="annH">${annHalf}</div><div class="annH" aria-hidden="true">${annHalf}</div></div></div>
  <nav class="top">
    <a class="logo" href="index.html" aria-label="CAUCE hogar, inicio">CAUCE<small>HOGAR</small></a>
    <ul class="links">${NAV.map(n => `<li><a href="${n[0]}" class="${n[2] === page ? 'act' : ''}">${n[1]}</a></li>`).join('')}</ul>
    <div class="navr"><button class="cartbtn" id="openCart" aria-label="Abrir carrito"><span>Carrito</span><i id="cartN">0</i></button><button class="burger" id="burger" aria-label="Menú"><i></i><i></i></button></div>
  </nav>`;

  const footer = `
  <footer class="ft"><div class="fg">
    <div><a class="logo" href="index.html">CAUCE<small>HOGAR</small></a>
      <p style="margin-top:20px;font-size:14px;max-width:290px">Lámparas que transforman tu rincón y te ayudan a habitar más lento.<br>${C.CFG.city} · Envíos a todo el país.</p>
      <div class="pays"><span>Transferencia</span><span>Mercado Pago</span><span>Tarjetas</span></div>
      <form class="news" id="newsForm" novalidate><label for="newsIn">Enterate de las novedades</label><div><input class="fld" id="newsIn" type="email" placeholder="Tu email" autocomplete="email"><button class="btn fill" type="submit">Suscribirme</button></div><small>Preview: el email no se envía a ningún servidor.</small></form></div>
    <div><h5>Tienda</h5><ul><li><a href="catalogo.html">Catálogo</a></li><li><a href="catalogo.html?cat=pack">Packs</a></li><li><a href="ambientes.html">Probar en tu ambiente</a></li><li><a href="carrito.html">Carrito</a></li></ul></div>
    <div><h5>Información</h5><ul><li><a href="nosotros.html">Nosotros</a></li><li><a href="envios.html">Envíos y medios de pago</a></li><li><a href="contacto.html">Contacto</a></li><li><a href="legal.html#terminos">Términos y condiciones</a></li><li><a href="legal.html#privacidad">Política de privacidad</a></li><li><a href="legal.html#cookies">Política de cookies</a></li><li><a href="legal.html#devoluciones">Devoluciones y arrepentimiento</a></li><li><button class="lnk" id="ckReopen">Preferencias de cookies</button></li></ul></div>
    <div class="seal"><svg viewBox="0 0 120 120" aria-hidden="true"><defs><path id="circ" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"/></defs>
      <g class="ring"><text font-size="9.4" letter-spacing="2.2" fill="currentColor" font-family="Jost,sans-serif"><textPath href="#circ" textLength="278" lengthAdjust="spacing">APS DEVELOPER · DISEÑO WEB · ESTUDIO DIGITAL ·</textPath></text></g>
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" stroke-width=".8"/><circle cx="60" cy="60" r="31" fill="none" stroke="currentColor" stroke-width=".8"/>
      <text x="60" y="67" text-anchor="middle" font-size="21" fill="currentColor" font-family="Cormorant Garamond,serif" font-weight="600" letter-spacing="2">APS</text></svg>
      <p><b>APS Developer</b>Diseño y desarrollo web.<br>Preview creada para CAUCE hogar.</p></div>
  </div>
  <div class="prev"><b>Aviso de preview.</b> Este sitio es una propuesta de diseño elaborada por APS Developer para CAUCE hogar. No es el sitio oficial, no procesa pagos ni pedidos reales (los pedidos se envían por WhatsApp) y los precios, promociones, stock, cupones, costos de envío y textos legales son de ejemplo hasta su validación y publicación. Marca, nombre y contenidos pertenecen a sus titulares.</div>
  <div class="copy"><span>© 2026 Preview · Diseño por APS Developer</span><span>Hecho con calma en Misiones, Argentina</span></div></footer>
  <a class="wafab" href="${C.WA('Hola CAUCE hogar! Vi la web preview y quiero consultar por sus lámparas.')}" target="_blank" rel="noopener" aria-label="Escribir por WhatsApp"><svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.600-4-4.700-4.200-.1-.1-1.100-1.500-1.100-2.800 0-1.300.7-1.900.9-2.200.2-.2.500-.3.700-.3h.5c.2 0 .4 0 .6.500l.8 2c.1.200.1.300 0 .5l-.4.600-.3.300c-.1.100-.3.300-.1.600.2.300.8 1.300 1.700 2.100 1.200 1 2.100 1.300 2.400 1.500.3.100.5.100.6-.1l.9-1c.2-.3.400-.2.600-.1l1.900.9c.3.100.5.200.5.300.1.200.1.800-.1 1.400Z"/></svg></a>
  <div id="veil"></div>
  <aside id="drawer" aria-label="Carrito" aria-hidden="true">
    <div class="dh"><h3>Tu carrito</h3><button class="x" id="closeCart" aria-label="Cerrar">×</button></div>
    <div id="dList"></div>
    <div id="dFoot"></div>
  </aside>
  <div id="ck" role="dialog" aria-label="Cookies" aria-live="polite"><h4>🍪 Cookies, con calma</h4>
    <p>Usamos cookies necesarias para que el sitio funcione (por ejemplo, recordar tu carrito) y, si lo permitís, analíticas y de marketing. Podés cambiarlo cuando quieras. <a href="legal.html#cookies">Política de cookies</a>.</p>
    <div class="ckc" id="ckc"><label><span>Necesarias<small>Funcionamiento del sitio y tu carrito. Siempre activas.</small></span><input type="checkbox" checked disabled></label>
      <label><span>Analíticas<small>Nos ayudan a entender qué secciones se usan.</small></span><input type="checkbox" id="ckA"></label>
      <label><span>Marketing<small>Medición de campañas y contenido personalizado.</small></span><input type="checkbox" id="ckM"></label></div>
    <div class="ckb"><button class="pri" id="ckAll">Aceptar todas</button><button id="ckNec">Solo necesarias</button><button id="ckCfg">Configurar</button></div></div>
  <div class="toast" id="toast" role="status"></div>`;

  document.body.insertAdjacentHTML('afterbegin', header);
  document.body.insertAdjacentHTML('beforeend', footer);


  /* menú móvil */
  $('#burger').onclick = () => document.body.classList.toggle('menu');
  $$('.links a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('menu')));

  /* toast */
  ui.toast = t => { const el = $('#toast'); el.textContent = t; el.classList.add('on'); clearTimeout(ui.toast._t); ui.toast._t = setTimeout(() => el.classList.remove('on'), 2200); };

  /* reveal */
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' }) : null;
  ui.reveal = () => $$('.rv:not(.in)').forEach(el => io ? io.observe(el) : el.classList.add('in'));

  /* tarjeta de producto compartida */
  C.card = function(p){
    const off = C.offPct(p), href = 'producto.html?id=' + p.id;
    return `<article class="card rv">
      <a class="pic" href="${href}" aria-label="Ver ${p.name}">${p.tag ? `<span class="tag${p.tag === 'Promo' ? ' promo' : ''}">${p.tag}</span>` : ''}${p.stock <= 5 ? `<span class="tag stock">Quedan ${p.stock}</span>` : ''}${C.cover(p, 'c' + p.id)}</a>
      <div class="info"><h3><a href="${href}">${p.name}</a></h3><div class="sub">${p.short}</div>
        <div class="price"><b>${C.money(p.price)}</b>${p.old ? `<s>${C.money(p.old)}</s><span class="off">${off}% OFF</span>` : ''}</div>
        <div class="pnote"><b>${C.money(C.transferPrice(p))}</b> con transferencia · ${C.CFG.cuotas} cuotas de ${C.money(p.price / C.CFG.cuotas)}</div>
        <div class="row"><a class="btn out" href="${href}">Ver más</a><button class="btn dark" data-add="${p.id}">Agregar</button></div></div></article>`;
  };
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-add]'); if (!b) return;
    S.add(b.dataset.add, 1); ui.toast('Agregado al carrito'); ui.openCart(true);
  });

  /* carrito lateral */
  const drawer = $('#drawer'), veil = $('#veil');
  ui.openCart = o => { drawer.classList.toggle('on', o); veil.classList.toggle('on', o); drawer.setAttribute('aria-hidden', !o); };
  $('#openCart').onclick = () => ui.openCart(true);
  $('#closeCart').onclick = () => ui.openCart(false);
  veil.onclick = () => ui.openCart(false);
  addEventListener('keydown', e => { if (e.key === 'Escape') ui.openCart(false); });
  function renderDrawer(){
    const t = S.totals();
    $('#cartN').textContent = S.count();
    if (!t.lines.length) {
      $('#dList').innerHTML = '<div class="empty">Tu carrito está vacío.<br>Elegí una luz.</div>';
      $('#dFoot').innerHTML = '<a class="btn dark" href="catalogo.html">Ver catálogo</a>';
      return;
    }
    $('#dList').innerHTML = t.lines.map(l => `<div class="di"><a class="im" href="producto.html?id=${l.p.id}">${C.cover(l.p, 'd' + l.p.id)}</a>
      <div><b>${l.p.name}</b><small>${C.money(l.p.price)} c/u</small><div class="q"><button data-q="${l.p.id}" data-d="-1" aria-label="Quitar uno">−</button>${l.q}<button data-q="${l.p.id}" data-d="1" aria-label="Agregar uno">+</button></div></div>
      <div class="lt">${C.money(l.sub)}</div></div>`).join('');
    $('#dFoot').innerHTML = `<div class="prog" style="margin:0 0 14px">${t.free ? '¡Tenés <b>envío gratis</b>!' : 'Te faltan <b>' + C.money(t.missing) + '</b> para el envío gratis'}<i><b style="width:${t.progress}%"></b></i></div>
      <div class="tot"><span>Subtotal</span><b>${C.money(t.base)}</b></div><small style="color:#7a6858;font-size:12px">${t.volDisc ? 'Incluye descuento por cantidad. ' : ''}Envío y descuentos de pago en el carrito.</small>
      <a class="btn dark" href="carrito.html">Ver carrito y finalizar</a>`;
  }
  $('#dList').addEventListener('click', e => {
    const b = e.target.closest('[data-q]'); if (!b) return;
    S.setQty(b.dataset.q, (S.st.items[b.dataset.q] || 0) + Number(b.dataset.d));
  });
  S.subscribe(renderDrawer); renderDrawer();

  /* cookies */
  const ck = $('#ck'), KEY = 'cauce_ck';
  const get = () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  function saveCk(a, m){ try { localStorage.setItem(KEY, JSON.stringify({ a, m, t: Date.now() })); } catch (e) {} ck.classList.remove('on'); ui.toast('Preferencias de cookies guardadas'); }
  $('#ckAll').onclick = () => saveCk(true, true);
  $('#ckNec').onclick = () => saveCk(false, false);
  $('#ckCfg').onclick = function(){ const c = $('#ckc'); if (c.classList.contains('on')) saveCk($('#ckA').checked, $('#ckM').checked); else { c.classList.add('on'); this.textContent = 'Guardar selección'; this.classList.add('pri'); } };
  $('#ckReopen').onclick = () => ck.classList.add('on');
  if (!get()) setTimeout(() => ck.classList.add('on'), 1400);

  /* newsletter (preview: solo valida y guarda localmente) */
  const nf = $('#newsForm');
  if (nf) nf.addEventListener('submit', e => {
    e.preventDefault(); const v = $('#newsIn').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { ui.toast('Ingresá un email válido'); $('#newsIn').focus(); return; }
    try { localStorage.setItem('cauce_news', v); } catch (err) {}
    $('#newsIn').value = ''; ui.toast('¡Gracias! Te sumamos a la lista (preview)');
  });

  ui.reveal();
  addEventListener('load', ui.reveal);
})();
