/* Ficha de producto */
(function(){
  const C = window.CAUCE, S = C.store, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const root = $('#root');
  const id = new URLSearchParams(location.search).get('id');
  const p = C.byId(id);

  if (!p) {
    root.innerHTML = `<div class="pagehead"><div class="crumb"><a href="index.html">Inicio</a><span>/</span><a href="catalogo.html">Catálogo</a></div><h2 class="t">No encontramos ese <em>producto</em></h2><div class="cta-row"><a class="btn dark" href="catalogo.html">Ver catálogo</a></div></div>`;
    document.title = 'Producto no encontrado — CAUCE hogar (Preview)';
    return;
  }
  document.title = p.name + ' — CAUCE hogar (Preview)';
  const setMeta = (sel, attr, v) => { let el = document.querySelector(sel); if (!el) { el = document.createElement('meta'); const m = sel.match(/\[(name|property)="([^"]+)"\]/); el.setAttribute(m[1], m[2]); document.head.appendChild(el); } el.setAttribute(attr, v); };
  setMeta('meta[name="description"]', 'content', p.desc.slice(0, 155));
  setMeta('meta[property="og:title"]', 'content', p.name + ' — CAUCE hogar');
  setMeta('meta[property="og:description"]', 'content', p.desc.slice(0, 155));
  if (p.photos) setMeta('meta[property="og:image"]', 'content', new URL(p.photos[0].src, location.href).href);
  const ld = document.createElement('script'); ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Product', name: p.name, description: p.desc, brand: { '@type': 'Brand', name: 'CAUCE hogar' },
    image: p.photos ? p.photos.map(x => new URL(x.src, location.href).href) : undefined,
    offers: { '@type': 'Offer', priceCurrency: 'ARS', price: p.price, availability: p.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' } });
  document.head.appendChild(ld);

  const slides = C.art.gallery(p, 'g' + p.id);
  const variants = C.PRODUCTS.filter(x => x.cat === p.cat && x.n === p.n);
  const related = C.PRODUCTS.filter(x => x.id !== p.id);
  const off = C.offPct(p), vol = C.CFG.volume;

  root.innerHTML = `
  <div class="pdp">
    <div class="gal rv in">
      <div class="main"><span class="lbl" id="glbl"></span><div id="gmain"></div></div>
      <div class="thumbs" style="grid-template-columns:repeat(${slides.length},1fr)">${slides.map((s, i) => `<button data-i="${i}" aria-label="${s.label}" class="${i ? '' : 'on'}">${s.svg}</button>`).join('')}</div>
      ${p.photos ? '' : '<p class="hint">Ilustración de referencia. Las fotos del modelo blanco se suman cuando el negocio las tenga.</p>'}
    </div>
    <div class="buy rv in">
      <div class="crumb"><a href="index.html">Inicio</a><span>/</span><a href="catalogo.html">Catálogo</a><span>/</span>${p.name}</div>
      <h1>${p.name}</h1>
      <p class="sub">${p.short}</p>
      <div class="price"><b>${C.money(p.price)}</b>${p.old ? `<s>${C.money(p.old)}</s><span class="off">${off}% OFF</span>` : ''}</div>
      <div class="pnote" style="margin-top:8px"><b>${C.money(C.transferPrice(p))}</b> con transferencia (${C.CFG.transferOff}% OFF)<br>${C.CFG.cuotas} cuotas sin interés de <b>${C.money(p.price / C.CFG.cuotas)}</b></div>
      ${variants.length > 1 ? `<div class="lbl2">Color</div><div class="opts">${variants.map(v => `<a class="opt ${v.id === p.id ? 'on' : ''}" href="producto.html?id=${v.id}"><i class="sw" style="background:${C.art.MODELS[v.color].head}"></i>${C.art.MODELS[v.color].name}</a>`).join('')}</div>` : ''}
      <div class="lbl2">Cantidad</div>
      <div class="buyrow">
        <div class="qty"><button id="qm" aria-label="Menos">−</button><input id="qn" type="number" min="1" max="${p.stock}" value="1" aria-label="Cantidad"><button id="qp" aria-label="Más">+</button></div>
        <button class="btn dark" id="addBtn">Agregar al carrito</button>
      </div>
      <div class="buyrow" style="margin-top:12px"><a class="btn wa" style="flex:1" id="waBtn" target="_blank" rel="noopener" href="#">Consultar por WhatsApp</a></div>
      <p class="urg">${p.stock <= 5 ? `¡Quedan solo ${p.stock} unidades!` : `Stock disponible: ${p.stock} unidades`} <span style="color:#8a7966">(dato de ejemplo)</span></p>
      ${p.cat === 'individual' ? `<p class="pnote" style="margin-top:6px">Llevá <b>2 lámparas y ahorrá ${vol[0].off}%</b>, o <b>3 o más y ahorrá ${vol[1].off}%</b>. Se aplica automáticamente en el carrito.</p>` : `<p class="pnote" style="margin-top:6px">El pack ya incluye el precio promocional de octubre.</p>`}

      <ul class="perks">
        <li><b>Medios de pago</b>Transferencia (${C.CFG.transferOff}% OFF), Mercado Pago y tarjeta en ${C.CFG.cuotas} cuotas sin interés.</li>
        <li><b>Envío a todo el país</b>Gratis desde ${C.money(C.CFG.freeFrom)}. También podés retirar en Paraná.</li>
        <li><b>10 días para arrepentirte</b>Devolución sin costo. <a href="legal.html#devoluciones">Ver política</a>.</li>
      </ul>

      <div class="lbl2">Calculá tu envío</div>
      <div class="mini"><input class="fld" id="cp" inputmode="numeric" placeholder="Tu código postal" maxlength="8" value="${S.st.cp || ''}"><button class="btn out" id="cpBtn">Calcular</button></div>
      <div class="shipres" id="shipres"></div>

      <div class="acc">
        <details open><summary>Descripción</summary><p>${p.desc}</p><ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul></details>
        <details><summary>Especificaciones</summary><table class="spec">${p.specs.map(r => `<tr><td>${r[0]}</td><td>${r[1] || '<span class="tbc">A confirmar con el negocio</span>'}</td></tr>`).join('')}</table></details>
        <details><summary>Qué incluye</summary><ul>${p.box.map(b => `<li>${b}</li>`).join('')}</ul></details>
        <details><summary>Envíos y devoluciones</summary><p>Enviamos a todo el país desde ${C.CFG.city}. El costo y el plazo se calculan con tu código postal. Tenés 10 días corridos para arrepentirte de la compra. <a href="envios.html" style="color:var(--brick)">Ver envíos y pagos</a> · <a href="legal.html#devoluciones" style="color:var(--brick)">Devoluciones</a>.</p></details>
        ${p.faq.map(f => `<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('')}
      </div>
    </div>
  </div>
  <section class="s"><div class="lab">Cómo funciona</div><h2 class="t">Lista en <em>minutos</em></h2>
    <div class="how" style="margin-top:40px">${C.HOW.map(h => `<figure class="hw"><img src="${h.img}" alt="${h.t}" loading="lazy" decoding="async"><figcaption><b>${h.t}</b>${h.d}</figcaption></figure>`).join('')}</div>
    ${p.color === 'white' ? '<p class="note">Las fotos corresponden al modelo negro; el proceso es el mismo.</p>' : ''}
  </section>
  <section class="s alt"><div class="head2"><div><div class="lab">Seguí explorando</div><h2 class="t">También te puede <em>gustar</em></h2></div><a class="btn out" href="catalogo.html">Ver todo</a></div><div class="grid">${related.map(C.card).join('')}</div></section>
  <div class="sbar" id="sbar"><div><b>${p.name}</b><span>${C.money(p.price)}</span></div><button class="btn dark" id="sbtn">Agregar</button></div>`;
  document.body.classList.add('has-sbar');

  /* galería */
  const main = $('#gmain'), lbl = $('#glbl');
  function show(i){ main.innerHTML = slides[i].svg; lbl.textContent = slides[i].label; $$('.thumbs button').forEach((b, k) => b.classList.toggle('on', k === i)); }
  $$('.thumbs button').forEach(b => b.addEventListener('click', () => show(Number(b.dataset.i))));
  show(0);

  /* cantidad + agregar */
  const qn = $('#qn');
  const clampQ = () => { const v = Math.floor(Number(qn.value)) || 1; qn.value = Math.max(1, Math.min(p.stock, v)); return Number(qn.value); };
  $('#qm').onclick = () => { qn.value = Number(qn.value) - 1; clampQ(); };
  $('#qp').onclick = () => { qn.value = Number(qn.value) + 1; clampQ(); };
  qn.addEventListener('change', clampQ);
  $('#addBtn').onclick = () => { S.add(p.id, clampQ()); C.ui.toast('Agregado al carrito'); C.ui.openCart(true); };
  $('#sbtn').onclick = () => { S.add(p.id, 1); C.ui.toast('Agregado al carrito'); C.ui.openCart(true); };
  $('#waBtn').addEventListener('click', e => { e.currentTarget.href = C.WA('Hola CAUCE hogar! Vi la web preview y quiero consultar por: ' + clampQ() + ' x ' + p.name + ' (' + C.money(p.price) + ').'); });

  /* envío */
  function ship(){
    const cp = $('#cp').value.trim(), el = $('#shipres'), est = C.shipEstimate(cp);
    if (!est) { el.className = 'shipres err'; el.textContent = 'Ingresá un código postal válido de 4 dígitos.'; return; }
    S.setCp(cp);
    el.className = 'shipres';
    el.innerHTML = `Envío a <b>${est.zone}</b>: <b>${C.money(est.cost)}</b> · ${est.days}<br><span style="font-size:12px;color:#8a7966">Estimación de ejemplo para la preview. ${C.money(C.CFG.freeFrom)} o más: envío gratis.</span>`;
  }
  $('#cpBtn').onclick = ship; $('#cp').addEventListener('keydown', e => { if (e.key === 'Enter') ship(); });
  if (S.st.cp && C.shipEstimate(S.st.cp)) ship();
  C.ui.reveal();
})();
