/* Catálogo: búsqueda, filtros y orden */
(function(){
  const C = window.CAUCE, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const grid = $('#grid'), qEl = $('#q'), sortEl = $('#sort'), colEl = $('#col'), count = $('#count');
  const F = { cat: 'all', q: '', sort: 'feat', col: 'all' };
  const params = new URLSearchParams(location.search);
  if (['individual', 'pack'].includes(params.get('cat'))) F.cat = params.get('cat');
  $$('.chip').forEach(c => c.classList.toggle('on', c.dataset.f === F.cat));

  function render(){
    let list = C.PRODUCTS.filter(p => (F.cat === 'all' || p.cat === F.cat) && (F.col === 'all' || p.color === F.col) &&
      (!F.q || (p.name + ' ' + p.short + ' ' + p.desc).toLowerCase().includes(F.q)));
    if (F.sort === 'asc') list = list.slice().sort((a, b) => a.price - b.price);
    if (F.sort === 'desc') list = list.slice().sort((a, b) => b.price - a.price);
    count.textContent = list.length + (list.length === 1 ? ' producto' : ' productos');
    grid.innerHTML = list.length ? list.map(C.card).join('') : '<div class="empty" style="grid-column:1/-1">No encontramos lámparas con ese filtro.</div>';
    C.ui.reveal();
  }
  $('#chips').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; F.cat = b.dataset.f; $$('.chip').forEach(c => c.classList.toggle('on', c === b)); render(); });
  qEl.addEventListener('input', () => { F.q = qEl.value.trim().toLowerCase(); render(); });
  sortEl.addEventListener('change', () => { F.sort = sortEl.value; render(); });
  colEl.addEventListener('change', () => { F.col = colEl.value; render(); });
  render();
})();
