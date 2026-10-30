/* Visualizador interactivo de lámparas en ambientes */
(function(){
  const C = window.CAUCE, A = C.art, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const V = { amb: 'living', mod: 'black', lvl: 1, tmp: 'warm', mode: 'night', x: 330, y: 165 };
  const vz = $('#vz');

  function mk(id, obj, key, fmt){
    const el = $(id);
    el.innerHTML = (Array.isArray(obj) ? obj.map((o, i) => [i, o]) : Object.entries(obj)).map(([k, o]) => `<button class="opt" data-k="${k}">${fmt(k, o)}</button>`).join('');
    el.addEventListener('click', e => {
      const b = e.target.closest('.opt'); if (!b) return;
      V[key] = key === 'lvl' ? Number(b.dataset.k) : b.dataset.k;
      if (key === 'amb') { V.x = A.SCENES[V.amb].lamp[0]; V.y = A.SCENES[V.amb].lamp[1]; drawBg(); }
      $('#vhint').style.opacity = 0; sync(); update();
    });
  }
  mk('#oAmb', A.SCENES, 'amb', (k, o) => o.name);
  mk('#oMod', A.MODELS, 'mod', (k, o) => `<i class="sw" style="background:${o.head};margin-right:8px"></i>${o.name}`);
  mk('#oLvl', A.LEVELS, 'lvl', (k, o) => o.n);
  mk('#oTmp', A.TEMPS, 'tmp', (k, o) => `<i class="sw" style="background:${o.c};margin-right:8px"></i>${o.n}`);
  mk('#oMode', A.MODES, 'mode', (k, o) => o.n);

  function sync(){ [['#oAmb', 'amb'], ['#oMod', 'mod'], ['#oLvl', 'lvl'], ['#oTmp', 'tmp'], ['#oMode', 'mode']].forEach(([id, k]) => $$('.opt', $(id)).forEach(b => b.classList.toggle('on', String(b.dataset.k) === String(V[k])))); }
  function drawBg(){ $('#bg').innerHTML = A.SCENES[V.amb].svg; $('#cap').textContent = A.SCENES[V.amb].cap; }
  function update(){
    const M = A.MODES[V.mode];
    $('#dark').setAttribute('fill', M.col); $('#dark').setAttribute('opacity', M.dark);
    $('#lightL').innerHTML = A.lightMarkup(V, 'v');
    $('#lampG').innerHTML = A.lampMarkup(V);
    const p = C.byId(A.MODELS[V.mod].pid);
    $('#vzPrice').textContent = p.name + ' · ' + C.money(p.price);
  }

  /* arrastrar la lámpara */
  const g = $('#lampG'); let drag = false;
  const pt = e => { const p = vz.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(vz.getScreenCTM().inverse()); };
  g.addEventListener('pointerdown', e => { drag = true; g.setPointerCapture(e.pointerId); $('#vhint').style.opacity = 0; e.preventDefault(); });
  g.addEventListener('pointermove', e => { if (!drag) return; const p = pt(e); V.x = clamp(p.x, 60, 740); V.y = clamp(p.y - 10, 60, 300); update(); });
  const up = () => { drag = false; };
  g.addEventListener('pointerup', up); g.addEventListener('pointercancel', up);
  g.addEventListener('keydown', e => { const d = { ArrowLeft: [-14, 0], ArrowRight: [14, 0], ArrowUp: [0, -14], ArrowDown: [0, 14] }[e.key]; if (d) { V.x = clamp(V.x + d[0], 60, 740); V.y = clamp(V.y + d[1], 60, 300); update(); e.preventDefault(); } });

  $('#vzAdd').onclick = () => { C.store.add(A.MODELS[V.mod].pid, 1); C.ui.toast('Agregado al carrito'); C.ui.openCart(true); };
  $('#vzSee').onclick = () => { location.href = 'producto.html?id=' + A.MODELS[V.mod].pid; };
  drawBg(); sync(); update();
})();
