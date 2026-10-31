/* Páginas Envíos y pagos / Contacto */
(function(){
  const C = window.CAUCE, $ = (s, r = document) => r.querySelector(s);

  const zt = $('#zones');
  if (zt) zt.innerHTML = '<tr><th>Zona</th><th>Código postal</th><th>Costo estimado</th><th>Plazo</th></tr>' +
    C.ZONES.map(z => `<tr><td>${z.zone}</td><td>${z.cp}</td><td>${C.money(z.cost)}</td><td>${z.days}</td></tr>`).join('');

  const calc = $('#calcBtn');
  if (calc) {
    const run = () => {
      const est = C.shipEstimate($('#calcCp').value), el = $('#calcRes');
      if (!est) { el.className = 'shipres err'; el.textContent = 'Ingresá un código postal válido de 4 dígitos.'; return; }
      el.className = 'shipres';
      el.innerHTML = `Envío a <b>${est.zone}</b>: <b>${C.money(est.cost)}</b> · ${est.days}<br><span style="font-size:12px;color:#8a7966">Estimación de ejemplo. Gratis desde ${C.money(C.CFG.freeFrom)}.</span>`;
      C.store.setCp($('#calcCp').value.trim());
    };
    calc.onclick = run; $('#calcCp').addEventListener('keydown', e => { if (e.key === 'Enter') run(); });
    if (C.store.st.cp) { $('#calcCp').value = C.store.st.cp; run(); }
  }

  const cf = $('#contactForm');
  if (cf) cf.addEventListener('submit', e => {
    e.preventDefault();
    const n = $('#cn').value.trim(), t = $('#ct').value.trim(), m = $('#cm').value.trim(), why = $('#cw').value;
    if (!n || !m) { C.ui.toast('Completá tu nombre y el mensaje'); return; }
    window.open(C.WA('Hola CAUCE hogar! Les escribo desde la web (preview).\nMotivo: ' + why + '\nNombre: ' + n + (t ? '\nTeléfono: ' + t : '') + '\nMensaje: ' + m), '_blank', 'noopener');
  });
})();
