/* Escena 3D corta (Three.js): lámpara de pared que cambia de intensidad con el scroll */
(function(){
  const stage = document.getElementById('stage');
  const canvas = document.getElementById('gl');
  if (!stage || !canvas) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v)), lerp = (a, b, t) => a + (b - a) * t;
  const steps = Array.from(stage.querySelectorAll('.step')), dots = Array.from(stage.querySelectorAll('.progress b'));
  const meterS = Array.from(stage.querySelectorAll('.meter span')), meterT = stage.querySelector('.meter em');
  const LV = [.55, 1, .5, .16];       // intro, alta, media, baja
  const LEVELCOUNT = [0, 3, 2, 1], LEVELNAME = ['', 'Alta', 'Media', 'Baja'];
  let P = 0, idx = -1, inView = true, S = null, clock = 0, last = performance.now();

  function onScroll(){
    const r = stage.getBoundingClientRect();
    P = clamp(-r.top / (stage.offsetHeight - innerHeight), 0, .9999);
    const i = Math.min(steps.length - 1, Math.floor(P * steps.length));
    if (i !== idx) {
      idx = i;
      steps.forEach((s, k) => s.classList.toggle('on', k === i));
      dots.forEach((d, k) => d.classList.toggle('on', k === i));
      const c = LEVELCOUNT[i] || 0;
      meterS.forEach((s, k) => s.classList.toggle('l', k < c));
      if (meterT) meterT.textContent = LEVELNAME[i] || '';
    }
  }
  addEventListener('scroll', onScroll, { passive: true });
  if ('IntersectionObserver' in window) new IntersectionObserver(es => { inView = es[0].isIntersecting; }, { rootMargin: '100px' }).observe(stage);

  function fallback(){ canvas.style.background = 'radial-gradient(60% 50% at 70% 45%,#5a4026,#1b1511 70%)'; }
  function init(){
    if (!window.THREE) return fallback();
    try {
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
      renderer.outputEncoding = THREE.sRGBEncoding; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.15;
      const scene = new THREE.Scene(); scene.background = new THREE.Color(0x1b1511); scene.fog = new THREE.Fog(0x1b1511, 9, 22);
      const cam = new THREE.PerspectiveCamera(38, 1, .1, 60);

      const plaster = () => {
        const c = document.createElement('canvas'); c.width = c.height = 512; const x = c.getContext('2d');
        x.fillStyle = '#b8a78d'; x.fillRect(0, 0, 512, 512);
        for (let i = 0; i < 46; i++) { const gx = Math.random() * 512, gy = Math.random() * 512, r = 40 + Math.random() * 120, g = x.createRadialGradient(gx, gy, 0, gx, gy, r); g.addColorStop(0, Math.random() > .5 ? 'rgba(255,245,225,.10)' : 'rgba(70,50,30,.10)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 0, 512, 512); }
        for (let i = 0; i < 16000; i++) { x.fillStyle = Math.random() > .5 ? 'rgba(255,240,215,' + Math.random() * .1 + ')' : 'rgba(60,40,25,' + Math.random() * .12 + ')'; x.fillRect(Math.random() * 512, Math.random() * 512, 1 + Math.random() * 3, 1 + Math.random() * 3); }
        const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(4, 3); t.encoding = THREE.sRGBEncoding; return t;
      };
      const glowTex = () => {
        const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d'), g = x.createRadialGradient(128, 128, 0, 128, 128, 128);
        g.addColorStop(0, 'rgba(255,225,170,1)'); g.addColorStop(.25, 'rgba(255,196,120,.45)'); g.addColorStop(.6, 'rgba(255,170,90,.12)'); g.addColorStop(1, 'rgba(255,160,80,0)');
        x.fillStyle = g; x.fillRect(0, 0, 256, 256); const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; return t;
      };
      const woodTex = () => {
        const c = document.createElement('canvas'); c.width = 512; c.height = 128; const x = c.getContext('2d'); x.fillStyle = '#8a6a48'; x.fillRect(0, 0, 512, 128);
        for (let i = 0; i < 90; i++) { x.strokeStyle = 'rgba(' + (Math.random() > .5 ? '50,32,16' : '200,160,110') + ',' + Math.random() * .16 + ')'; x.lineWidth = 1 + Math.random() * 2; x.beginPath(); const y = Math.random() * 128; x.moveTo(0, y); x.bezierCurveTo(170, y + Math.random() * 8 - 4, 340, y + Math.random() * 8 - 4, 512, y + Math.random() * 6 - 3); x.stroke(); }
        const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; return t;
      };

      const wall = new THREE.Mesh(new THREE.PlaneGeometry(40, 24), new THREE.MeshStandardMaterial({ map: plaster(), roughness: 1, color: 0xd8cdb8 })); wall.position.z = -.02; scene.add(wall);
      const lamp = new THREE.Group(); scene.add(lamp);
      const blackM = new THREE.MeshStandardMaterial({ color: 0x211d19, roughness: .5, metalness: .35 });
      const plate = new THREE.Mesh(new THREE.CylinderGeometry(.44, .44, .1, 56), blackM); plate.rotation.x = Math.PI / 2; plate.position.z = .05; lamp.add(plate);
      const knuckle = new THREE.Mesh(new THREE.SphereGeometry(.2, 32, 24), blackM); knuckle.position.z = .28; lamp.add(knuckle);
      const pivot = new THREE.Group(); pivot.position.z = .3; lamp.add(pivot);
      const headG = new THREE.Group(); headG.position.z = .46; pivot.add(headG);
      headG.add(new THREE.Mesh(new THREE.CylinderGeometry(.5, .5, .64, 64, 1, true), blackM));
      const capT = new THREE.Mesh(new THREE.CircleGeometry(.5, 48), blackM); capT.rotation.x = -Math.PI / 2; capT.position.y = .32; headG.add(capT);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(.5, .025, 12, 64), blackM); rim.rotation.x = Math.PI / 2; rim.position.y = -.32; headG.add(rim);
      const faceM = new THREE.MeshBasicMaterial({ color: 0xffd9a0, toneMapped: false });
      const face = new THREE.Mesh(new THREE.CircleGeometry(.46, 56), faceM); face.rotation.x = Math.PI / 2; face.position.y = -.318; headG.add(face);
      headG.rotation.x = .42;
      const spot = new THREE.SpotLight(0xffc27a, 2.4, 16, 1.0, 1, 1.4); spot.position.set(0, -.32, 0); headG.add(spot);
      const tgt = new THREE.Object3D(); tgt.position.set(0, -5, -.9); headG.add(tgt); spot.target = tgt;
      const pt = new THREE.PointLight(0xffb66a, .8, 6, 1.6); pt.position.set(0, -.55, .2); headG.add(pt);
      const gMat = new THREE.SpriteMaterial({ map: glowTex(), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: .8 });
      const gSpr = new THREE.Sprite(gMat); gSpr.position.set(0, -.4, .05); headG.add(gSpr);
      scene.add(new THREE.HemisphereLight(0x6d5a47, 0x1a130e, .55));

      const wood = new THREE.MeshStandardMaterial({ map: woodTex(), roughness: .8 });
      const shelf = new THREE.Mesh(new THREE.BoxGeometry(3.2, .1, .7), wood); shelf.position.set(.2, -2.5, .35); scene.add(shelf);
      const mat = c => new THREE.MeshStandardMaterial({ color: c, roughness: .9 });
      const vase = new THREE.Mesh(new THREE.CylinderGeometry(.16, .26, .78, 32), mat(0xb48562)); vase.position.set(-.85, -2.06, .35); scene.add(vase);
      const ball = new THREE.Mesh(new THREE.SphereGeometry(.2, 32, 24), mat(0xe6dccb)); ball.position.set(.95, -2.35, .4); scene.add(ball);
      const b1 = new THREE.Mesh(new THREE.BoxGeometry(.7, .12, .5), mat(0xe6dccb)); b1.position.set(.2, -2.39, .35); scene.add(b1);
      const b2 = new THREE.Mesh(new THREE.BoxGeometry(.62, .1, .45), mat(0x7e8a6a)); b2.position.set(.2, -2.28, .35); b2.rotation.y = .2; scene.add(b2);
      for (let i = 0; i < 7; i++) { const s = new THREE.Mesh(new THREE.CylinderGeometry(.006, .01, 1.1 + Math.random() * .5, 5), mat(0xcdb88e)); s.position.set(-.85 + (i - 3) * .045, -1.1, .35); s.rotation.z = (i - 3) * .08; s.rotation.x = (Math.random() - .5) * .2; scene.add(s); }

      const N = 120, pg = new THREE.BufferGeometry(), pa = new Float32Array(N * 3), pv = new Float32Array(N);
      for (let i = 0; i < N; i++) { pa[i * 3] = (Math.random() - .5) * 6; pa[i * 3 + 1] = -4 + Math.random() * 6; pa[i * 3 + 2] = .3 + Math.random() * 3; pv[i] = .05 + Math.random() * .15; }
      pg.setAttribute('position', new THREE.BufferAttribute(pa, 3));
      const dust = new THREE.Points(pg, new THREE.PointsMaterial({ map: glowTex(), size: .16, transparent: true, opacity: .4, blending: THREE.AdditiveBlending, depthWrite: false, color: 0xffd29a })); scene.add(dust);

      S = { renderer, scene, cam, pivot, headG, faceM, spot, pt, gSpr, gMat, dust, pa, pv, N, I: .5, mouse: { x: 0, y: 0 }, mob: false };
      addEventListener('pointermove', e => { S.mouse.x = (e.clientX / innerWidth - .5) * 2; S.mouse.y = (e.clientY / innerHeight - .5) * 2; }, { passive: true });
      resize();
    } catch (err) { console.warn('WebGL no disponible', err); S = null; fallback(); }
  }
  function resize(){
    if (!S) return;
    const w = canvas.clientWidth || innerWidth, h = canvas.clientHeight || innerHeight;
    S.renderer.setSize(w, h, false); S.cam.aspect = w / h; S.cam.updateProjectionMatrix(); S.mob = w / h < .9;
  }
  addEventListener('resize', () => { resize(); onScroll(); });

  function frame(now){
    requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, .05); last = now; clock += dt;
    if (!S || !inView || document.hidden) return;
    const I0 = LV[Math.max(0, idx)];
    S.I += (I0 - S.I) * Math.min(1, dt * 3.2);
    const I = S.I, br = reduce ? 0 : Math.sin(clock * 1.3) * .03;
    S.spot.intensity = 3.2 * I + .15; S.pt.intensity = .25 + 1.3 * I;
    S.faceM.color.setHSL(.09, .9, .55 + .3 * I).multiplyScalar(.35 + .9 * I);
    S.gSpr.scale.setScalar(.8 + 2.8 * I + br * 3); S.gMat.opacity = .25 + .6 * I; S.dust.material.opacity = .12 + .5 * I;
    S.pivot.rotation.y += (Math.sin(P * Math.PI * 1.6) * .7 - S.pivot.rotation.y) * .06;
    S.headG.rotation.x += ((.25 + .35 * I) - S.headG.rotation.x) * .05;
    const b = S.mob ? { x: 0, y: -1.9, z: 9.6, lx: 0, ly: -2.7 } : { x: -1.45, y: -.9, z: 7.4, lx: -1.45, ly: -1.15 };
    const orbit = Math.sin(P * Math.PI) * .8, zoom = Math.sin(P * Math.PI) * .9;
    S.cam.position.x = lerp(S.cam.position.x, b.x + orbit * (S.mob ? .4 : 1) + S.mouse.x * .35, .05);
    S.cam.position.y = lerp(S.cam.position.y, b.y - S.mouse.y * .22 - P * .3, .05);
    S.cam.position.z = lerp(S.cam.position.z, b.z - zoom, .05);
    S.cam.lookAt(b.lx * .6, b.ly, 0);
    if (!reduce) { for (let i = 0; i < S.N; i++) { let y = S.pa[i * 3 + 1] + S.pv[i] * dt; if (y > 2.2) y = -4; S.pa[i * 3 + 1] = y; S.pa[i * 3] += Math.sin(clock * .4 + i) * .0016; } S.dust.geometry.attributes.position.needsUpdate = true; }
    S.renderer.render(S.scene, S.cam);
  }
  init(); onScroll(); requestAnimationFrame(frame);
})();
