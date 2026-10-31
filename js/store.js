/* Carrito: estado, persistencia (localStorage) y totales */
(function(){
  const C = window.CAUCE, KEY = 'cauce_cart_v1';
  const st = { items: {}, coupon: '', cp: '', pay: 'transfer', ship: 'home' };
  const subs = [];

  function load(){
    try {
      const j = JSON.parse(localStorage.getItem(KEY) || '{}');
      st.items = j.items || {}; st.coupon = j.coupon || ''; st.cp = j.cp || ''; st.pay = j.pay || 'transfer'; st.ship = j.ship || 'home';
      Object.keys(st.items).forEach(k => { if (!C.byId(k) || !(st.items[k] > 0)) delete st.items[k]; });
    } catch (e) {}
  }
  function save(){
    try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {}
    subs.forEach(f => f());
  }
  load();
  addEventListener('storage', e => { if (e.key === KEY) { load(); subs.forEach(f => f()); } });

  const PAY = { transfer: 'Transferencia', mp: 'Mercado Pago', card: 'Tarjeta en ' + C.CFG.cuotas + ' cuotas' };
  const S = C.store = {
    st, PAY,
    subscribe(f){ subs.push(f); },
    count(){ return Object.values(st.items).reduce((a, b) => a + b, 0); },
    add(id, q){ const p = C.byId(id); if (!p) return; st.items[id] = Math.min(p.stock, (st.items[id] || 0) + (q || 1)); save(); },
    setQty(id, q){
      const p = C.byId(id); if (!p) return;
      q = Math.max(0, Math.min(p.stock, Math.floor(q) || 0));
      if (q === 0) delete st.items[id]; else st.items[id] = q; save();
    },
    remove(id){ delete st.items[id]; save(); },
    clear(){ st.items = {}; save(); },
    setCoupon(code){
      code = String(code || '').trim().toUpperCase();
      if (!code) { st.coupon = ''; save(); return true; }
      if (C.CFG.coupons[code]) { st.coupon = code; save(); return true; }
      return false;
    },
    setCp(cp){ st.cp = cp; save(); },
    setPay(p){ st.pay = p; save(); },
    setShip(m){ st.ship = m; save(); },
    totals(){
      const lines = Object.keys(st.items).map(id => { const p = C.byId(id), q = st.items[id]; return { p, q, sub: p.price * q }; });
      const sub = lines.reduce((a, l) => a + l.sub, 0);
      const indiv = lines.filter(l => l.p.cat === 'individual');
      const indivUnits = indiv.reduce((a, l) => a + l.q, 0), indivSub = indiv.reduce((a, l) => a + l.sub, 0);
      let volPct = 0; C.CFG.volume.forEach(v => { if (indivUnits >= v.q) volPct = v.off; });
      const volDisc = indivSub * volPct / 100;
      const cpPct = st.coupon ? (C.CFG.coupons[st.coupon] || 0) : 0;
      const cpDisc = (sub - volDisc) * cpPct / 100;
      const base = sub - volDisc - cpDisc;
      const pickup = st.ship === 'pickup';
      const est = pickup ? null : C.shipEstimate(st.cp);
      const free = base >= C.CFG.freeFrom && base > 0;
      const ship = pickup ? 0 : (est ? (free ? 0 : est.cost) : null);
      const trDisc = st.pay === 'transfer' ? base * C.CFG.transferOff / 100 : 0;
      const total = base - trDisc + (ship || 0);
      const cuota = (base + (ship || 0)) / C.CFG.cuotas;
      return { lines, sub, volPct, volDisc, cpPct, cpDisc, base, pickup, est, free, ship, trDisc, total, cuota,
        missing: Math.max(0, C.CFG.freeFrom - base), progress: Math.min(100, base / C.CFG.freeFrom * 100) };
    },
    waMessage(extra){
      const t = S.totals();
      let m = 'Hola CAUCE hogar! Quiero hacer este pedido (vi la web preview):\n';
      t.lines.forEach(l => { m += '• ' + l.q + ' x ' + l.p.name + ' — ' + C.money(l.sub) + '\n'; });
      if (t.volDisc) m += 'Descuento por cantidad (' + t.volPct + '%): -' + C.money(t.volDisc) + '\n';
      if (t.cpDisc) m += 'Cupón ' + st.coupon + ': -' + C.money(t.cpDisc) + '\n';
      if (t.trDisc) m += 'Transferencia (-' + C.CFG.transferOff + '%): -' + C.money(t.trDisc) + '\n';
      if (t.pickup) m += 'Entrega: retiro en Paraná (a coordinar)\n';
      else if (t.est) m += 'Envío a CP ' + st.cp + ' (' + t.est.zone + '): ' + (t.ship === 0 ? 'gratis' : C.money(t.ship)) + ' (estimado)\n';
      m += 'Total estimado: ' + C.money(t.total) + '\n';
      m += 'Medio de pago: ' + (PAY[st.pay] || st.pay) + '\n';
      if (extra) m += extra;
      return m;
    }
  };
})();
