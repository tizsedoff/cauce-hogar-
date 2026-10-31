/* Página de carrito: líneas, cupón, entrega, envío, medio de pago y pedido por WhatsApp */
(function(){
  const C = window.CAUCE, S = C.store, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const lines = $('#lines'), totals = $('#totals'), cpMsg = $('#cpMsg'), cupMsg = $('#cupMsg');
  const PAYINFO = {
    transfer: 'Te pasamos los datos de la cuenta por WhatsApp. Incluye el ' + C.CFG.transferOff + '% de descuento. <i>(Datos bancarios a completar por el negocio.)</i>',
    mp: 'Te enviamos un link de pago de Mercado Pago por WhatsApp para pagar con dinero en cuenta, débito o crédito.',
    card: 'Pagás en ' + C.CFG.cuotas + ' cuotas sin interés con tarjeta de crédito a través de un link de pago.'
  };

  function render(){
    const t = S.totals();
    $('#wrap').style.display = t.lines.length ? '' : 'none';
    $('#emptyBox').style.display = t.lines.length ? 'none' : '';
    lines.innerHTML = t.lines.map(l => `<div class="cl"><a class="im" href="producto.html?id=${l.p.id}">${C.cover(l.p, 'cl' + l.p.id)}</a>
      <div><h3><a href="producto.html?id=${l.p.id}">${l.p.name}</a></h3><small>${C.money(l.p.price)} c/u${l.q >= l.p.stock ? ' · máximo disponible' : ''}</small>
        <div class="qty" style="margin-top:10px"><button data-q="${l.p.id}" data-d="-1" aria-label="Menos">−</button><input value="${l.q}" readonly aria-label="Cantidad"><button data-q="${l.p.id}" data-d="1" aria-label="Más">+</button></div>
        <button class="rm" data-rm="${l.p.id}">Quitar</button></div>
      <div class="lt">${C.money(l.sub)}</div></div>`).join('');
    $('#prog').innerHTML = t.pickup ? 'Retiro en Paraná: <b>sin costo de envío</b>' : (t.free ? '¡Tenés <b>envío gratis</b>!' : 'Te faltan <b>' + C.money(t.missing) + '</b> para el envío gratis') + `<i><b style="width:${t.progress}%"></b></i>`;
    const row = (a, b, c) => `<div class="r ${c || ''}"><span>${a}</span><span>${b}</span></div>`;
    totals.innerHTML = row('Subtotal', C.money(t.sub)) +
      (t.volDisc ? row('Descuento por cantidad (' + t.volPct + '%)', '− ' + C.money(t.volDisc), 'd') : '') +
      (t.cpDisc ? row('Cupón ' + S.st.coupon + ' (' + t.cpPct + '%)', '− ' + C.money(t.cpDisc), 'd') : '') +
      (t.trDisc ? row('Transferencia (' + C.CFG.transferOff + '%)', '− ' + C.money(t.trDisc), 'd') : '') +
      row('Envío', t.pickup ? 'Retiro en Paraná · Gratis' : t.est ? (t.ship === 0 ? 'Gratis' : C.money(t.ship)) : 'Calculalo abajo') +
      `<div class="r tot"><span>Total</span><span>${C.money(t.total)}</span></div>` +
      (S.st.pay === 'card' ? `<div class="cuo">${C.CFG.cuotas} cuotas sin interés de ${C.money(t.cuota)}</div>` : '');
    $('#cpBox').style.display = t.pickup ? 'none' : '';
    if (t.est) { cpMsg.className = 'hint'; cpMsg.style.color = ''; cpMsg.textContent = t.est.zone + ' · ' + t.est.days + ' (estimado)'; }
    $('#payinfo').innerHTML = PAYINFO[S.st.pay] || '';
    $$('input[name=ship]').forEach(i => { i.checked = i.value === S.st.ship; });
    $$('input[name=pay]').forEach(i => { i.checked = i.value === S.st.pay; });
  }

  lines.addEventListener('click', e => {
    const q = e.target.closest('[data-q]'), r = e.target.closest('[data-rm]');
    if (q) S.setQty(q.dataset.q, (S.st.items[q.dataset.q] || 0) + Number(q.dataset.d));
    if (r) S.remove(r.dataset.rm);
  });

  $('#cupIn').value = S.st.coupon;
  $('#cupBtn').onclick = () => {
    const v = $('#cupIn').value;
    if (S.setCoupon(v)) { cupMsg.style.color = ''; cupMsg.textContent = v.trim() ? 'Cupón aplicado.' : ''; }
    else { cupMsg.style.color = '#a2432e'; cupMsg.textContent = 'Ese cupón no es válido.'; }
  };

  $('#cpIn').value = S.st.cp;
  function calcCp(){
    const v = $('#cpIn').value.trim();
    if (!C.shipEstimate(v)) { cpMsg.style.color = '#a2432e'; cpMsg.textContent = 'Ingresá un código postal válido de 4 dígitos.'; return; }
    cpMsg.style.color = ''; S.setCp(v);
  }
  $('#cpBtn').onclick = calcCp; $('#cpIn').addEventListener('keydown', e => { if (e.key === 'Enter') calcCp(); });

  $$('input[name=pay]').forEach(i => i.addEventListener('change', () => S.setPay(i.value)));
  $$('input[name=ship]').forEach(i => i.addEventListener('change', () => S.setShip(i.value)));

  $('#send').onclick = () => {
    const name = $('#fn').value.trim(), tel = $('#ft').value.trim(), city = $('#fc').value.trim(), note = $('#fo').value.trim();
    if (!name) { $('#fn').focus(); C.ui.toast('Contanos tu nombre para armar el pedido'); return; }
    if (S.st.ship !== 'pickup' && !C.shipEstimate(S.st.cp)) { $('#cpIn').focus(); C.ui.toast('Calculá el envío con tu código postal'); return; }
    const extra = 'Nombre: ' + name + '\n' + (tel ? 'Teléfono: ' + tel + '\n' : '') + (city ? 'Ciudad: ' + city + '\n' : '') + (note ? 'Notas: ' + note + '\n' : '');
    window.open(C.WA(S.waMessage(extra)), '_blank', 'noopener');
  };
  $('#clear').onclick = () => { S.clear(); };

  S.subscribe(render); render();
})();
