/* Animación con scroll (2D): la lámpara pasa de alta a baja intensidad sobre un living.
   Sin WebGL ni librerías: capas SVG con fundido + cámara con leve zoom/desplazamiento. */
(function(){
  const stage = document.getElementById('stage'), cam = document.getElementById('cam') || document.getElementById('lcam');
  if (!stage || !cam || !window.CAUCE || !CAUCE.art) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const steps = Array.from(stage.querySelectorAll('.step')), dots = Array.from(stage.querySelectorAll('.progress b'));
  const meterS = Array.from(stage.querySelectorAll('.meter span'));
  const base = { amb: 'living', mod: 'black', tmp: 'warm', x: 470, y: 150 };
  // intro (atardecer) · alta · media · baja
  const LAYERS = [
    Object.assign({}, base, { lvl: 1, mode: 'dusk' }),
    Object.assign({}, base, { lvl: 2, mode: 'night' }),
    Object.assign({}, base, { lvl: 1, mode: 'night' }),
    Object.assign({}, base, { lvl: 0, mode: 'night' })
  ];
  const COUNT = [0, 3, 2, 1];
  cam.innerHTML = LAYERS.map((V, i) => '<div class="ly' + (i ? '' : ' on') + '">' + CAUCE.art.roomSVG(V, 'ls' + i) + '</div>').join('');
  const layers = Array.from(cam.querySelectorAll('.ly'));
  let idx = -1, P = 0, raf = 0;
  function apply(){
    raf = 0;
    const r = stage.getBoundingClientRect();
    P = clamp(-r.top / (stage.offsetHeight - innerHeight), 0, .9999);
    const i = Math.min(steps.length - 1, Math.floor(P * steps.length));
    if (i !== idx) {
      idx = i;
      steps.forEach((s, k) => s.classList.toggle('on', k === i));
      dots.forEach((d, k) => d.classList.toggle('on', k === i));
      layers.forEach((l, k) => l.classList.toggle('on', k === i));
      meterS.forEach((s, k) => s.classList.toggle('l', k < (COUNT[i] || 0)));
    }
    if (!reduce) cam.style.transform = 'translate3d(' + (-P * 3).toFixed(2) + '%,' + (-P * 2).toFixed(2) + '%,0) scale(' + (1 + P * .1).toFixed(4) + ')';
  }
  const req = () => { if (!raf) raf = requestAnimationFrame(apply); };
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', req);
  if (!reduce) cam.classList.add('breathe');
  apply();
})();
