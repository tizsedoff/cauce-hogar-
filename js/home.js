/* Home: hero con video, nav, frases que se revelan, destacados y teaser del visualizador */
(function(){
  const C = window.CAUCE, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* hero video: si no existe el archivo (o falla), se muestra un fondo animado de respaldo */
  const hero = $('.hero'), v = $('#heroVideo'), btn = $('#vctl');
  if (hero && v) {
    const noVideo = () => hero.classList.add('no-video');
    const src = v.querySelector('source');
    if (src) src.addEventListener('error', noVideo);
    v.addEventListener('error', noVideo);
    v.addEventListener('loadeddata', () => hero.classList.remove('no-video'));
    const chk = () => { if (v.networkState === 3 || v.error) noVideo(); };
    chk(); addEventListener('load', chk); setTimeout(chk, 800);
    setTimeout(() => { if (v.readyState < 2) noVideo(); }, 4500);
    if (reduce) { v.removeAttribute('autoplay'); v.pause(); btn.textContent = '▶'; }
    else { const p = v.play(); if (p && p.catch) p.catch(() => {}); }
    btn.onclick = () => { if (v.paused) { v.play(); btn.textContent = '❚❚'; btn.setAttribute('aria-label', 'Pausar video'); } else { v.pause(); btn.textContent = '▶'; btn.setAttribute('aria-label', 'Reproducir video'); } };
  }

  /* navegación: transparente sobre hero + escena 3D, sólida después */
  const stage = $('#stage');
  function nav(){ const end = stage ? stage.offsetTop + stage.offsetHeight - innerHeight * .9 : innerHeight * .8; document.body.classList.toggle('solid', scrollY > end); }
  addEventListener('scroll', nav, { passive: true }); addEventListener('resize', nav); nav();

  /* frase que se revela palabra por palabra */
  const big = $('#big');
  if (big) {
    big.innerHTML = big.textContent.trim().split(/\s+/).map(w => { const it = /^\*.*\*[.,]?$/.test(w); return `<span class="w${it ? ' i' : ''}">${w.replace(/\*/g, '')}</span>`; }).join(' ');
    const bw = $$('.w', big);
    const rv = () => { const r = big.getBoundingClientRect(), vh = innerHeight, t = Math.max(0, Math.min(1, (vh * .85 - r.top) / (vh * .55 + r.height * .55))), n = Math.round(t * bw.length); bw.forEach((w, i) => w.classList.toggle('on', i < n)); };
    addEventListener('scroll', rv, { passive: true }); rv();
  }

  /* destacados */
  const feat = $('#featured');
  if (feat) { feat.innerHTML = C.PRODUCTS.map(C.card).join(''); C.ui.reveal(); }

  /* teaser del visualizador */
  const tz = $('#tzv');
  if (tz) tz.innerHTML = C.art.roomSVG({ amb: 'dorm', mod: 'white', lvl: 1, tmp: 'warm', mode: 'dusk', x: 188, y: 215 }, 'tz');
})();
