/* Home: hero con video, nav, frases que se revelan, destacados y teaser del visualizador */
(function(){
  const C = window.CAUCE, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* hero video: autoplay robusto (caché, bfcache, autoplay bloqueado) + respaldo animado si el archivo no existe */
  const hero = $('.hero'), v = $('#heroVideo'), btn = $('#vctl');
  if (hero && v) {
    let userPaused = false;
    const noVideo = () => hero.classList.add('no-video');
    const ok = () => hero.classList.remove('no-video');
    const icon = () => { const p = v.paused; btn.textContent = p ? '\u25B6' : '\u275A\u275A'; btn.setAttribute('aria-label', p ? 'Reproducir video' : 'Pausar video'); };
    const play = () => { if (userPaused || reduce) return; v.muted = true; const p = v.play(); if (p && p.catch) p.catch(() => {}); };

    v.muted = true; v.defaultMuted = true; v.playsInline = true; v.loop = true;
    v.addEventListener('loadeddata', () => { ok(); play(); });
    v.addEventListener('canplay', () => { ok(); play(); });
    v.addEventListener('playing', () => { ok(); icon(); });
    v.addEventListener('play', icon); v.addEventListener('pause', icon);
    v.addEventListener('error', noVideo);
    const src = v.querySelector('source:last-of-type'); if (src) src.addEventListener('error', noVideo);

    // si ya estaba cargado (caché) los eventos pudieron dispararse antes: revisar el estado actual
    if (v.readyState >= 2) { ok(); play(); }
    play();

    // solo se oculta si, ya estabilizada la carga, el navegador no encontró ninguna fuente
    setTimeout(() => { if (v.readyState === 0 && (v.networkState === 3 || v.error)) noVideo(); else if (v.readyState >= 2) ok(); }, 3500);

    // autoplay bloqueado (ahorro de batería, etc.): reintentar con la primera interacción
    ['touchstart', 'pointerdown', 'keydown', 'scroll'].forEach(ev => addEventListener(ev, () => { if (v.paused) play(); }, { once: true, passive: true }));
    // volver a la pestaña o a la página (bfcache)
    document.addEventListener('visibilitychange', () => { if (!document.hidden && v.paused) play(); });
    addEventListener('pageshow', () => { if (v.paused) play(); });
    // pausar fuera de pantalla y retomar al volver
    if ('IntersectionObserver' in window) new IntersectionObserver(es => { es[0].isIntersecting ? (v.paused && play()) : (!userPaused && v.pause()); }, { threshold: .05 }).observe(hero);

    btn.onclick = () => { if (v.paused) { userPaused = false; v.muted = true; v.play().catch(() => {}); } else { userPaused = true; v.pause(); } };
    if (reduce) { v.removeAttribute('autoplay'); v.pause(); }
    icon();
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
