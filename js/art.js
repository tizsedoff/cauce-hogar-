/* Ilustraciones SVG: lámparas, ambientes, luz, galería de producto (placeholders hasta tener fotos reales) */
(function(){
  const C = window.CAUCE;

  const brick = '<pattern id="brk" width="80" height="40" patternUnits="userSpaceOnUse"><rect width="80" height="40" fill="#5e392c"/><rect x="1" y="1" width="38" height="18" fill="#8b5441"/><rect x="41" y="1" width="38" height="18" fill="#94593f"/><rect x="-19" y="21" width="38" height="18" fill="#85503c"/><rect x="21" y="21" width="38" height="18" fill="#915842"/><rect x="61" y="21" width="38" height="18" fill="#87513d"/></pattern>';

  const SCENES = {
    living: { name: 'Living con ladrillo', cap: 'Living · ladrillo a la vista', lamp: [330, 165], svg: `<defs>${brick}<linearGradient id="fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a4e36"/><stop offset="1" stop-color="#4a3424"/></linearGradient></defs>
      <rect width="800" height="500" fill="url(#brk)"/><rect y="400" width="800" height="100" fill="url(#fl)"/><rect y="396" width="800" height="6" fill="#2d2018"/>
      <rect x="590" y="90" width="92" height="120" fill="#e7ddc9" stroke="#7a5a3a" stroke-width="6"/><circle cx="636" cy="140" r="22" fill="#c9a77f"/><rect x="606" y="172" width="60" height="22" fill="#a68b6c"/>
      <rect x="170" y="280" width="400" height="60" rx="16" fill="#b8a78c"/><rect x="150" y="318" width="440" height="82" rx="18" fill="#c7b79c"/><rect x="150" y="318" width="60" height="82" rx="16" fill="#b2a186"/><rect x="530" y="318" width="60" height="82" rx="16" fill="#b2a186"/>
      <rect x="226" y="324" width="136" height="52" rx="10" fill="#d3c4aa"/><rect x="378" y="324" width="136" height="52" rx="10" fill="#d3c4aa"/><rect x="450" y="290" width="62" height="52" rx="10" fill="#8b9378" transform="rotate(-8 480 316)"/>
      <rect x="150" y="398" width="14" height="14" fill="#3b2f26"/><rect x="576" y="398" width="14" height="14" fill="#3b2f26"/>
      <path d="M668 400h50l-6 -58h-38z" fill="#a67b5b"/><g fill="#5d6b4a"><ellipse cx="692" cy="300" rx="14" ry="42" transform="rotate(-18 692 340)"/><ellipse cx="692" cy="300" rx="14" ry="42" transform="rotate(22 692 340)"/><ellipse cx="692" cy="290" rx="12" ry="46"/></g>
      <ellipse cx="400" cy="440" rx="260" ry="26" fill="#d6c8ad" opacity=".55"/>` },
    dorm: { name: 'Dormitorio', cap: 'Dormitorio · luz de descanso', lamp: [188, 215], svg: `<defs><linearGradient id="pl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9cebb"/><stop offset="1" stop-color="#c8bba5"/></linearGradient></defs>
      <rect width="800" height="500" fill="url(#pl)"/><rect y="410" width="800" height="90" fill="#8a6c4c"/><rect y="406" width="800" height="6" fill="#6d5237"/>
      <rect x="236" y="180" width="330" height="170" rx="8" fill="#a78763" opacity=".92"/><g stroke="#8a6a49" stroke-width="2"><path d="M260 186v160M300 186v160M340 186v160M380 186v160M420 186v160M460 186v160M500 186v160M540 186v160"/></g>
      <rect x="210" y="320" width="380" height="96" rx="14" fill="#e8dfcf"/><rect x="210" y="360" width="380" height="56" rx="8" fill="#cfc2aa"/>
      <rect x="236" y="296" width="130" height="44" rx="18" fill="#f3eee3"/><rect x="434" y="296" width="130" height="44" rx="18" fill="#f3eee3"/><rect x="300" y="344" width="240" height="40" rx="10" fill="#8b9378" opacity=".85"/>
      <rect x="120" y="330" width="76" height="86" fill="#8b6b49"/><rect x="120" y="326" width="76" height="8" fill="#a07f59"/><rect x="132" y="296" width="52" height="34" rx="4" fill="#d9cebb" stroke="#6d5237"/>
      <rect x="632" y="120" width="70" height="90" fill="#efe7d6" stroke="#8b6b49" stroke-width="5"/><path d="M646 190q18-50 40-8" stroke="#8b9378" stroke-width="3" fill="none"/>
      <ellipse cx="400" cy="450" rx="280" ry="22" fill="#cdbf9f" opacity=".6"/>` },
    escr: { name: 'Escritorio y lectura', cap: 'Escritorio · luz de tarea', lamp: [420, 150], svg: `<defs><linearGradient id="pe" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d1c5ae"/><stop offset="1" stop-color="#bdb097"/></linearGradient></defs>
      <rect width="800" height="500" fill="url(#pe)"/><rect y="420" width="800" height="80" fill="#7c6244"/><rect y="416" width="800" height="6" fill="#5e4830"/>
      <rect x="80" y="110" width="170" height="10" fill="#8b6b49"/><rect x="80" y="200" width="170" height="10" fill="#8b6b49"/>
      <rect x="96" y="70" width="18" height="40" fill="#a68b6c"/><rect x="118" y="78" width="14" height="32" fill="#8a5a44"/><rect x="136" y="64" width="20" height="46" fill="#e1d6c0"/><rect x="170" y="150" width="60" height="50" fill="#e7ddc9"/><rect x="100" y="164" width="52" height="36" fill="#8b9378"/>
      <path d="M570 420h54l-6 -62h-42z" fill="#a67b5b"/><g fill="#5d6b4a"><ellipse cx="597" cy="320" rx="12" ry="38" transform="rotate(-20 597 358)"/><ellipse cx="597" cy="320" rx="12" ry="38" transform="rotate(20 597 358)"/><ellipse cx="597" cy="312" rx="11" ry="42"/></g>
      <rect x="220" y="350" width="360" height="16" rx="3" fill="#a07f59"/><rect x="240" y="366" width="14" height="60" fill="#6d5237"/><rect x="546" y="366" width="14" height="60" fill="#6d5237"/>
      <path d="M300 350l16-86h140l16 86z" fill="#2a2622"/><rect x="316" y="272" width="124" height="70" fill="#e9e3d6" opacity=".92"/><rect x="290" y="344" width="188" height="8" rx="3" fill="#3a332c"/>
      <rect x="500" y="326" width="24" height="24" rx="3" fill="#e7ddc9"/><rect x="258" y="332" width="30" height="18" fill="#8a5a44"/><rect x="258" y="322" width="30" height="10" fill="#e1d6c0"/>` },
    entr: { name: 'Pasillo y entrada', cap: 'Entrada · bienvenida cálida', lamp: [225, 190], svg: `<defs><linearGradient id="pn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfc2aa"/><stop offset="1" stop-color="#b9ab90"/></linearGradient></defs>
      <rect width="800" height="500" fill="url(#pn)"/><g stroke="#a89a80" stroke-width="3">${Array.from({ length: 20 }, (_, i) => `<path d="M${i * 42} 0V410"/>`).join('')}</g>
      <rect y="410" width="800" height="90" fill="#5d4833"/><rect y="404" width="800" height="8" fill="#46341f"/>
      <ellipse cx="460" cy="190" rx="78" ry="110" fill="#e9e3d6" stroke="#8b6b49" stroke-width="8"/><ellipse cx="460" cy="190" rx="66" ry="98" fill="#d7d1c4" opacity=".7"/>
      <rect x="290" y="320" width="340" height="16" rx="3" fill="#a07f59"/><rect x="306" y="336" width="14" height="76" fill="#6d5237"/><rect x="600" y="336" width="14" height="76" fill="#6d5237"/>
      <rect x="320" y="342" width="270" height="44" rx="3" fill="#8b6b49" opacity=".85"/>
      <path d="M520 320h40l-4 -62h-32z" fill="#e7ddc9"/><g stroke="#cdb88e" stroke-width="3"><path d="M540 258l-20-60M540 258l0-70M540 258l22-56"/></g>
      <rect x="352" y="292" width="60" height="28" fill="#8b9378"/><rect x="360" y="270" width="44" height="22" fill="#e1d6c0"/>
      <rect x="680" y="210" width="40" height="200" rx="3" fill="#8b6b49"/><circle cx="706" cy="320" r="4" fill="#d9c9a6"/>` }
  };
  const MODELS = {
    black: { name: 'Negra', head: '#1c1916', plate: '#2a2622', stroke: '#554b40', pid: 'neg' },
    white: { name: 'Blanca', head: '#f3eee4', plate: '#e4ddcf', stroke: '#b8ad99', pid: 'bla' }
  };
  const LEVELS = [{ n: 'Baja', i: .35 }, { n: 'Media', i: .65 }, { n: 'Alta', i: 1 }];
  const TEMPS = { warm: { n: 'Cálida', c: '#ffb259' }, soft: { n: 'Ámbar suave', c: '#ffd08a' }, neutral: { n: 'Neutra', c: '#ffe9c8' } };
  const MODES = { day: { n: 'Día', dark: .04, col: '#2a2018', k: .3 }, dusk: { n: 'Atardecer', dark: .42, col: '#2b1708', k: .85 }, night: { n: 'Noche', dark: .76, col: '#07050a', k: 1 } };

  function lightMarkup(V, u){
    u = u || '';
    const T = TEMPS[V.tmp].c, M = MODES[V.mode], li = LEVELS[V.lvl].i, I = li * M.k, x = V.x, y = V.y;
    const L = 120 + 280 * li, W = 50 + 160 * li;
    return `<defs>
      <radialGradient id="wash${u}"><stop offset="0" stop-color="${T}" stop-opacity=".95"/><stop offset=".5" stop-color="${T}" stop-opacity=".3"/><stop offset="1" stop-color="${T}" stop-opacity="0"/></radialGradient>
      <linearGradient id="cone${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${T}" stop-opacity=".85"/><stop offset="1" stop-color="${T}" stop-opacity="0"/></linearGradient>
      <filter id="bl${u}" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="14"/></filter></defs>
      <g style="mix-blend-mode:screen" opacity="${I.toFixed(3)}">
        <ellipse cx="${x}" cy="${y + L * .5}" rx="${90 + 230 * li}" ry="${L * .82}" fill="url(#wash${u})" opacity=".55"/>
        <polygon points="${x - 18},${y + 44} ${x + 18},${y + 44} ${x + W},${y + L} ${x - W},${y + L}" fill="url(#cone${u})" filter="url(#bl${u})"/>
        <ellipse cx="${x}" cy="${y - 18}" rx="${34 + 40 * li}" ry="${22 + 26 * li}" fill="url(#wash${u})" opacity=".5"/>
        <circle cx="${x}" cy="${y + 44}" r="${22 + 40 * li}" fill="url(#wash${u})"/>
      </g>`;
  }
  function lampMarkup(V){
    const m = MODELS[V.mod], T = TEMPS[V.tmp].c, I = LEVELS[V.lvl].i * MODES[V.mode].k;
    return `<g transform="translate(${V.x} ${V.y})"><circle r="16" fill="${m.plate}" stroke="${m.stroke}" stroke-width="1"/>
      <rect x="-26" y="8" width="52" height="38" rx="13" fill="${m.head}" stroke="${m.stroke}" stroke-width="1"/>
      <ellipse cx="0" cy="45" rx="21" ry="5.5" fill="${T}" opacity="${(.35 + .65 * I).toFixed(2)}"/><rect x="-40" y="-26" width="80" height="84" fill="transparent"/></g>`;
  }
  function roomSVG(V, u){
    const M = MODES[V.mode];
    return `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g>${SCENES[V.amb].svg}</g>
      <rect width="800" height="500" fill="${M.col}" opacity="${M.dark}"/>${lightMarkup(V, u)}${lampMarkup(V)}</svg>`;
  }

  /* lámpara sola, para tarjetas de producto */
  function lampSVG(color, n, id){
    const black = color === 'black';
    const wall = black ? ['#d9cdb6', '#bfae92'] : ['#7d6a58', '#4b3c30'];
    const head = black ? '#1d1916' : '#f4eee3', plate = black ? '#2a2622' : '#e6dfd1', stroke = black ? '#4a423a' : '#c2b8a5';
    const lamps = n === 2 ? [62, 138] : [100];
    let s = `<svg viewBox="0 0 200 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>
      <linearGradient id="w${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${wall[0]}"/><stop offset="1" stop-color="${wall[1]}"/></linearGradient>
      <radialGradient id="g${id}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd8a0" stop-opacity=".95"/><stop offset=".45" stop-color="#ffbb6a" stop-opacity=".35"/><stop offset="1" stop-color="#ffb060" stop-opacity="0"/></radialGradient>
      <filter id="b${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter></defs>
      <rect width="200" height="220" fill="url(#w${id})"/>
      <g opacity=".35">${Array.from({ length: 22 }, (_, i) => `<rect x="${(i * 37) % 200}" y="${(i * 53) % 220}" width="2" height="2" fill="${black ? '#6b5a45' : '#000'}"/>`).join('')}</g>`;
    lamps.forEach(x => {
      const y = n === 2 ? 64 : 70, k = n === 2 ? .8 : 1;
      s += `<g class="glowL" style="transform-origin:${x}px ${y + 30}px;transform-box:view-box"><ellipse cx="${x}" cy="${y + 62 * k}" rx="${58 * k}" ry="${70 * k}" fill="url(#g${id})" filter="url(#b${id})"/></g>
      <g transform="translate(${x} ${y}) scale(${k})"><circle r="15" fill="${plate}" stroke="${stroke}" stroke-width=".8"/>
      <rect x="-24" y="8" width="48" height="36" rx="12" fill="${head}" stroke="${stroke}" stroke-width=".8"/>
      <ellipse cx="0" cy="43" rx="20" ry="5" fill="#ffd9a0"/></g>`;
    });
    return s + '</svg>';
  }

  /* tres intensidades lado a lado */
  function intensitiesSVG(color, u){
    let s = '<svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">';
    ['Baja', 'Media', 'Alta'].forEach((lab, i) => {
      const V = { amb: 'living', mod: color, lvl: i, tmp: 'warm', mode: 'night', x: 66.6, y: 70 };
      s += `<svg x="${i * 133.33}" y="0" width="133.33" height="400" viewBox="0 0 133.33 400">
        <rect width="134" height="400" fill="#cdbfa6"/><rect width="134" height="400" fill="#07050a" opacity=".72"/>${lightMarkup(V, u + i)}${lampMarkup(V)}
        <text x="66.6" y="378" text-anchor="middle" font-size="12" letter-spacing="3" fill="#f3ead9" font-family="Jost,sans-serif">${lab.toUpperCase()}</text></svg>`;
      if (i) s += `<rect x="${i * 133.33 - .5}" width="1" height="400" fill="#0f0b08"/>`;
    });
    return s + '</svg>';
  }

  /* control remoto */
  function remoteSVG(color, u){
    const V = { amb: 'living', mod: color, lvl: 1, tmp: 'warm', mode: 'night', x: 200, y: 56 };
    let btn = '';
    [0, 1, 2].forEach(i => {
      const y = 214 + i * 46;
      btn += `<circle cx="200" cy="${y}" r="16" fill="#2f2822" stroke="#6b5a45"/>` +
        Array.from({ length: i + 1 }, (_, k) => `<rect x="${192 - 0}" y="${y - 6 + k * 5 - i * 2.5}" width="16" height="2.4" rx="1" fill="#ffd08a"/>`).join('');
    });
    return `<svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="400" height="400" fill="#cdbfa6"/><rect width="400" height="400" fill="#07050a" opacity=".7"/>
      ${lightMarkup(V, u)}${lampMarkup(V)}
      <rect x="150" y="160" width="100" height="210" rx="30" fill="#1b1511" stroke="#4a3d30" stroke-width="2"/>
      <circle cx="200" cy="184" r="8" fill="#8a5a44"/>${btn}
      <text x="200" y="392" text-anchor="middle" font-size="11" letter-spacing="3" fill="#f3ead9" font-family="Jost,sans-serif">CONTROL REMOTO INCLUIDO</text></svg>`;
  }

  function gallery(p, u){
    return [
      { label: 'Producto', svg: lampSVG(p.color, p.n, u + 'a') },
      { label: 'En el living', svg: roomSVG({ amb: 'living', mod: p.color, lvl: 1, tmp: 'warm', mode: 'dusk', x: 330, y: 165 }, u + 'b') },
      { label: 'Tres intensidades', svg: intensitiesSVG(p.color, u + 'c') },
      { label: 'Control remoto', svg: remoteSVG(p.color, u + 'd') }
    ];
  }

  C.art = { SCENES, MODELS, LEVELS, TEMPS, MODES, lightMarkup, lampMarkup, roomSVG, lampSVG, intensitiesSVG, remoteSVG, gallery };
})();
