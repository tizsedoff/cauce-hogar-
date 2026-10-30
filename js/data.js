/* Datos del negocio y catálogo (ejemplo para la preview — editar al publicar) */
(function(){
  const C = window.CAUCE = window.CAUCE || {};

  C.CFG = {
    wa: '5493435032402',
    ig: 'cauce.hogar',
    igUrl: 'https://www.instagram.com/cauce.hogar',
    city: 'Paraná, Entre Ríos',
    transferOff: 10,          // % de descuento por transferencia (ejemplo)
    cuotas: 3,                // cuotas sin interés (ejemplo)
    freeFrom: 100000,         // envío gratis desde este monto (ejemplo)
    volume: [{ q: 2, off: 10 }, { q: 3, off: 15 }], // descuento por cantidad de lámparas individuales (ejemplo)
    coupons: { BIENVENIDA: 5, CAUCE10: 10 }          // cupones de ejemplo
  };

  C.money = n => '$ ' + Math.round(n).toLocaleString('es-AR');
  C.WA = text => 'https://wa.me/' + C.CFG.wa + '?text=' + encodeURIComponent(text);

  const common = [
    'Magnética: se coloca y se retira sin obra',
    'Tres intensidades: alta, media y baja',
    'Control remoto incluido',
    'Luz cálida que realza texturas naturales',
    'Envío a todo el país desde Paraná'
  ];
  const faq = [
    ['¿Cómo regulo la intensidad?', 'Mantené el botón de la lámpara apretado para pasar entre alta, media y baja, o usá el control remoto incluido.'],
    ['¿Necesito hacer una obra para instalarla?', 'No. Es una lámpara de pared magnética: se coloca sin obra. Con cada pedido te enviamos las indicaciones.'],
    ['¿Puedo devolverla?', 'Sí. Tenés 10 días corridos para arrepentirte de la compra. Mirá la política en Devoluciones.']
  ];

  C.PRODUCTS = [
    {
      id: 'neg', name: 'Lámpara de pared Negra', short: 'Magnética · control remoto · 3 intensidades',
      cat: 'individual', color: 'black', n: 1, units: 1, price: 34500, stock: 8, tag: 'Más elegida',
      desc: 'Una lámpara de pared que transforma tu rincón y te ayuda a habitar más lento. Acabado negro mate que se funde con la pared y deja que sea la luz la que hable. Mantené el botón apretado para regular la intensidad o elegí desde el sillón con el control remoto.',
      features: common,
      specs: [['Tipo', 'Aplique de pared magnético'], ['Color', 'Negro'], ['Intensidades', '3 (alta · media · baja)'], ['Control', 'Botón + control remoto'], ['Tono de luz', 'Cálido'], ['Instalación', 'Sin obra'], ['Medidas, potencia y batería', null]],
      box: ['1 lámpara de pared', 'Control remoto', 'Indicaciones de uso'],
      faq
    },
    {
      id: 'bla', name: 'Lámpara de pared Blanca', short: 'Magnética · control remoto · 3 intensidades',
      cat: 'individual', color: 'white', n: 1, units: 1, price: 34500, stock: 5, tag: '',
      desc: 'La versión clara de CAUCE: se integra a paredes de cal, lino y tonos arena. Luz cálida y tres intensidades para acompañar cada momento de la casa, con control remoto incluido.',
      features: common,
      specs: [['Tipo', 'Aplique de pared magnético'], ['Color', 'Blanco'], ['Intensidades', '3 (alta · media · baja)'], ['Control', 'Botón + control remoto'], ['Tono de luz', 'Cálido'], ['Instalación', 'Sin obra'], ['Medidas, potencia y batería', null]],
      box: ['1 lámpara de pared', 'Control remoto', 'Indicaciones de uso'],
      faq
    },
    {
      id: 'pkn', name: 'Pack x2 Negras', short: 'Promo de octubre · dos lámparas',
      cat: 'pack', color: 'black', n: 2, units: 2, price: 59500, old: 69000, stock: 6, tag: 'Promo',
      desc: 'Dos lámparas negras para iluminar a ambos lados de la cama, flanquear un espejo o recorrer un pasillo. Precio promocional de octubre sobre el valor de dos unidades.',
      features: common,
      specs: [['Tipo', 'Pack de 2 apliques de pared magnéticos'], ['Color', 'Negro'], ['Intensidades', '3 (alta · media · baja)'], ['Control', 'Botón + control remoto'], ['Tono de luz', 'Cálido'], ['Instalación', 'Sin obra'], ['Medidas, potencia y batería', null]],
      box: ['2 lámparas de pared', 'Control remoto', 'Indicaciones de uso'],
      faq
    },
    {
      id: 'pkb', name: 'Pack x2 Blancas', short: 'Promo de octubre · dos lámparas',
      cat: 'pack', color: 'white', n: 2, units: 2, price: 59500, old: 69000, stock: 3, tag: 'Promo',
      desc: 'Dos lámparas blancas para crear simetría y una atmósfera pareja en dormitorios, livings y pasillos. Precio promocional de octubre sobre el valor de dos unidades.',
      features: common,
      specs: [['Tipo', 'Pack de 2 apliques de pared magnéticos'], ['Color', 'Blanco'], ['Intensidades', '3 (alta · media · baja)'], ['Control', 'Botón + control remoto'], ['Tono de luz', 'Cálido'], ['Instalación', 'Sin obra'], ['Medidas, potencia y batería', null]],
      box: ['2 lámparas de pared', 'Control remoto', 'Indicaciones de uso'],
      faq
    }
  ];

  C.byId = id => C.PRODUCTS.find(p => p.id === id);
  C.offPct = p => p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
  C.transferPrice = p => p.price * (1 - C.CFG.transferOff / 100);

  /* Estimación de envío por código postal (valores de ejemplo para la preview) */
  C.shipEstimate = function(cp){
    const m = String(cp || '').toUpperCase().match(/(\d{4})/);
    if (!m) return null;
    const n = Number(m[1]), d = String(n);
    if (n < 1000) return null;
    if (d.startsWith('31')) return { zone: 'Paraná y zona', cost: 4500, days: '1 a 2 días hábiles' };
    if (d.startsWith('32')) return { zone: 'Entre Ríos', cost: 6500, days: '3 a 4 días hábiles' };
    if (d[0] === '1') return { zone: 'CABA y GBA', cost: 8900, days: '3 a 5 días hábiles' };
    if (d[0] === '8' || d[0] === '9') return { zone: 'Patagonia', cost: 13900, days: '5 a 8 días hábiles' };
    if (d[0] === '4') return { zone: 'Noroeste', cost: 11200, days: '4 a 7 días hábiles' };
    return { zone: 'Resto del país', cost: 9800, days: '4 a 6 días hábiles' };
  };
})();
