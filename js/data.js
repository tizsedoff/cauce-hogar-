/* Datos del negocio y catálogo (ejemplo para la preview — editar al publicar) */
(function(){
  const C = window.CAUCE = window.CAUCE || {};

  C.CFG = {
    wa: '5493435032402',
    waShow: '+54 9 3435 03-2402',
    ig: 'cauce.hogar',
    igUrl: 'https://www.instagram.com/cauce.hogar',
    city: 'Paraná, Entre Ríos',
    hours: 'Lunes a sábados · horario a confirmar',
    transferOff: 10,          // % de descuento por transferencia (ejemplo)
    cuotas: 3,                // cuotas sin interés (ejemplo)
    freeFrom: 100000,         // envío gratis desde este monto (ejemplo)
    volume: [{ q: 2, off: 10 }, { q: 3, off: 15 }], // descuento por cantidad de lámparas individuales (ejemplo)
    coupons: { BIENVENIDA: 5, CAUCE10: 10 }          // cupones de ejemplo
  };

  C.money = n => '$ ' + Math.round(n).toLocaleString('es-AR');
  C.WA = text => 'https://wa.me/' + C.CFG.wa + '?text=' + encodeURIComponent(text);

  const common = [
    'Inalámbrica y recargable por USB: sin instalación eléctrica',
    'Soporte magnético: la lámpara se coloca y se retira al instante',
    'Fijación con adhesivo o con 2 tornillos (incluidos)',
    'Giro de 360° para direccionar la luz',
    'Luz fría, neutra o cálida, con intensidad regulable',
    'Control remoto incluido',
    'Envío a todo el país desde Paraná'
  ];
  const faq = [
    ['¿Necesito hacer una instalación eléctrica?', 'No. Es inalámbrica y recargable por USB. Se fija a la pared con adhesivo o con los 2 tornillos incluidos y la lámpara se acopla al soporte de forma magnética.'],
    ['¿Cómo regulo la luz?', 'Podés elegir luz fría, neutra o cálida. Manteniendo el dedo en el botón de encendido subís o bajás la intensidad, o usás el control remoto incluido.'],
    ['¿Cómo se carga?', 'Por cable USB. Cuando la luz roja se apaga, está lista para volver a usarse.'],
    ['¿Puedo devolverla?', 'Sí. Tenés 10 días corridos para arrepentirte de la compra. Mirá la política en Devoluciones.']
  ];

  C.PHOTOS = [
    { src: 'assets/img/glow.webp', label: 'Luz cálida con giro de 360°' },
    { src: 'assets/img/lectura.webp', label: 'En casa, luz puntual o decorativa' },
    { src: 'assets/img/giro.webp', label: 'Direccionable' },
    { src: 'assets/img/pared.webp', label: 'Soporte fijado en la pared' },
    { src: 'assets/img/usb.webp', label: 'Carga por USB' }
  ];

  C.HOW = [
    { img: 'assets/img/pared.webp', t: 'Fijá el soporte', d: 'Con adhesivo o con los dos tornillos incluidos. Sin obra ni cables.' },
    { img: 'assets/img/colocar.webp', t: 'Acoplá la lámpara', d: 'Es magnética: la colocás y ya está lista para usar.' },
    { img: 'assets/img/giro.webp', t: 'Direccioná la luz', d: 'Giro de 360° para apuntarla donde la necesites.' },
    { img: 'assets/img/usb.webp', t: 'Cargala por USB', d: 'Cuando la luz roja se apaga, está lista para volver a usarse.' }
  ];

  C.PRODUCTS = [
    {
      id: 'neg', name: 'Lámpara de pared Negra', cat: 'individual', color: 'black', n: 1, units: 1, price: 34500, stock: 8, tag: 'Más elegida',
      desc: 'Una lámpara de pared que transforma tu rincón y te ayuda a habitar más lento. Inalámbrica, magnética y con giro de 360°: la colocás donde la necesites y elegís luz fría, neutra o cálida con la intensidad que quieras.'
    },
    {
      id: 'bla', name: 'Lámpara de pared Blanca', cat: 'individual', color: 'white', n: 1, units: 1, price: 34500, stock: 5, tag: '',
      desc: 'La versión clara de CAUCE: se integra a paredes de cal, lino y tonos arena. Inalámbrica y magnética, con luz fría, neutra o cálida y control remoto incluido.'
    },
    {
      id: 'pkn', name: 'Pack x2 Negras', cat: 'pack', color: 'black', n: 2, units: 2, price: 59500, old: 69000, stock: 6, tag: 'Promo',
      desc: 'Dos lámparas negras para iluminar a ambos lados de la cama, flanquear un espejo o recorrer un pasillo. Precio promocional de octubre sobre el valor de dos unidades.'
    },
    {
      id: 'pkb', name: 'Pack x2 Blancas', cat: 'pack', color: 'white', n: 2, units: 2, price: 59500, old: 69000, stock: 3, tag: 'Promo',
      desc: 'Dos lámparas blancas para crear simetría y una atmósfera pareja en dormitorios, livings y pasillos. Precio promocional de octubre sobre el valor de dos unidades.'
    }
  ];
  C.PRODUCTS.forEach(p => {
    const colorN = p.color === 'black' ? 'Negro' : 'Blanco';
    p.short = p.cat === 'pack' ? 'Promo de octubre · dos lámparas inalámbricas' : 'Inalámbrica · magnética · control remoto';
    p.features = common; p.faq = faq;
    p.specs = [
      ['Tipo', p.n === 2 ? 'Pack de 2 apliques de pared inalámbricos y recargables' : 'Aplique de pared inalámbrico y recargable'],
      ['Color', colorN], ['Soporte', 'Magnético'], ['Fijación', 'Adhesivo o 2 tornillos (incluidos)'], ['Giro', '360°'],
      ['Tonos de luz', 'Fría · neutra · cálida'], ['Intensidad', 'Regulable'], ['Carga', 'USB'], ['Control', 'Botón + control remoto'],
      ['Medidas, potencia y autonomía', null]
    ];
    p.box = [(p.n === 2 ? '2 lámparas de pared' : '1 lámpara de pared'), 'Soporte magnético con adhesivo y tornillos', 'Cable de carga USB', 'Control remoto', 'Indicaciones de uso'];
    if (p.color === 'black') p.photos = C.PHOTOS;   // fotos reales (modelo negro). Falta material del modelo blanco.
  });

  C.byId = id => C.PRODUCTS.find(p => p.id === id);
  C.offPct = p => p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
  C.transferPrice = p => p.price * (1 - C.CFG.transferOff / 100);

  /* Zonas de envío (valores de ejemplo para la preview) */
  C.ZONES = [
    { zone: 'Paraná y zona', cp: '31xx', cost: 4500, days: '1 a 2 días hábiles', test: d => d.startsWith('31') },
    { zone: 'Entre Ríos', cp: '32xx', cost: 6500, days: '3 a 4 días hábiles', test: d => d.startsWith('32') },
    { zone: 'CABA y GBA', cp: '1xxx', cost: 8900, days: '3 a 5 días hábiles', test: d => d[0] === '1' },
    { zone: 'Noroeste', cp: '4xxx', cost: 11200, days: '4 a 7 días hábiles', test: d => d[0] === '4' },
    { zone: 'Patagonia', cp: '8xxx · 9xxx', cost: 13900, days: '5 a 8 días hábiles', test: d => d[0] === '8' || d[0] === '9' },
    { zone: 'Resto del país', cp: 'Otros', cost: 9800, days: '4 a 6 días hábiles', test: () => true }
  ];
  C.shipEstimate = function(cp){
    const m = String(cp || '').match(/(\d{4})/);
    if (!m) return null;
    const d = String(Number(m[1]));
    if (Number(m[1]) < 1000) return null;
    const z = C.ZONES.find(z => z.test(d));
    return { zone: z.zone, cost: z.cost, days: z.days };
  };
})();
