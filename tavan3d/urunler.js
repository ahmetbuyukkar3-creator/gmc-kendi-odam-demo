// GMC Tavan Stüdyo · ürün listesi (saf veri, DOM yok)
// Ürün adları, kodları ve görseller: gmcled.com (2026-10-11). Teknik değerler: GMCLED_KATALOG.pdf.
// Sitede lümen ve ışık açısı yazmıyor. Magnet ürünler için katalogdaki aynı güç ve gövdeli eşdeğer serinin değeri alındı:
//   mercek lensli lineer = Reflect, opal lineer = Diffucer, hareketli mercekli = Moving Reflect, hareketli opal = Moving Diffucer,
//   ray spot = Rotary, sarkıt = Pendant. Bu eşleştirme [Tahmin]; katalogdaki değer [Kesin]. esd alanı eşdeğeri ve sayfayı yazar.
// Gömme spotlar (Opus, Rotun, Dark, Midy, Tiny, Daisy) katalogda doğrudan var: real = true.
// Katalogda aralık verilmişse (ör. 832–887 lm) ortası alındı.

const A = 'assets/urun/';
const L = (o) => ({ ...o, src: A + o.sku.toLowerCase() + '.jpg' });
const REFLECT = [15, 24, 40], ROTARY = [15, 24, 34, 48, 60], PENDANT = [24, 34, 48];

// fam: hangi raya takılır (standard / slim). type: uygulamadaki ışık ve gövde modeli.
export const MAGNET = [
  // ---- standart magnet (sıva üstü, sıva altı yaylı, trimless raylara) ----
  L({ sku: 'GMC6025', old: 'GMC6225', name: '30 CM Lineer Magnet', fam: 'standard', type: 'lineer', watts: 10, lengthCm: 30.5, lenses: 0, lm: 720, beam: 120, esd: 'Diffucer · 72 lm/W (s.23–24)' }),
  L({ sku: 'GMC6026', old: 'GMC6226', name: '60 CM Lineer Magnet', fam: 'standard', type: 'lineer', watts: 20, lengthCm: 60.5, lenses: 0, lm: 1440, beam: 120, esd: 'Diffucer · 72 lm/W (s.23–24)' }),
  L({ sku: 'GMC6027', name: '90 CM Lineer Magnet', fam: 'standard', type: 'lineer', watts: 30, lengthCm: 90.5, lenses: 0, lm: 2160, beam: 120, esd: 'Diffucer · 72 lm/W; güç sitede yok [Tahmin]' }),
  L({ sku: 'GMC6028', old: 'GMC6228', name: '6W Mercek Lensli Magnet', fam: 'standard', type: 'mercek', watts: 6, lengthCm: 13.4, lenses: 6, lm: 430, beam: 24, beamOpts: REFLECT, esd: 'Reflect 6 (s.19)' }),
  L({ sku: 'GMC6029', old: 'GMC6229', name: '12W Mercek Lensli Magnet', fam: 'standard', type: 'mercek', watts: 12, lengthCm: 22, lenses: 12, lm: 860, beam: 24, beamOpts: REFLECT, esd: 'Reflect 12 (s.20)' }),
  L({ sku: 'GMC6030', old: 'GMC6230', name: '18W Mercek Lensli Magnet', fam: 'standard', type: 'mercek', watts: 18, lengthCm: 32.8, lenses: 16, lm: 1295, beam: 24, beamOpts: REFLECT, esd: 'Reflect 18 (s.20)' }),
  L({ sku: 'GMC6031', name: '10W Ray Spot Magnet', fam: 'standard', type: 'spot', watts: 10, lengthCm: 10, lenses: 0, lm: 1020, beam: 24, beamOpts: ROTARY, esd: 'Rotary 60 · 8,9 W (s.8)' }),
  L({ sku: 'GMC6036', name: '20W Ray Spot Magnet', fam: 'standard', type: 'spot', watts: 20, lengthCm: 12, lenses: 0, lm: 1705, beam: 24, beamOpts: ROTARY, esd: 'Rotary 70 · 20 W (s.8)' }),
  L({ sku: 'GMC6032', old: 'GMC6232', name: '6W Hareketli Mercekli', fam: 'standard', type: 'hareketli', watts: 6, lengthCm: 13.4, lenses: 6, lm: 430, beam: 24, beamOpts: REFLECT, esd: 'Moving Reflect 6 (s.16)' }),
  L({ sku: 'GMC6033', old: 'GMC6233', name: '12W Hareketli Mercekli', fam: 'standard', type: 'hareketli', watts: 12, lengthCm: 22, lenses: 12, lm: 860, beam: 24, beamOpts: REFLECT, esd: 'Moving Reflect 12 (s.16)' }),
  // ---- slim magnet ----
  L({ sku: 'GMC6051', old: 'GMC6610', name: '30 CM Slim Lineer (opal)', fam: 'slim', type: 'lineer', watts: 18, lengthCm: 30, lenses: 0, lm: 1295, beam: 120, esd: 'Diffucer 18 (s.24)' }),
  L({ sku: 'GMC6052', old: 'GMC6611', name: '60 CM Slim Lineer (opal)', fam: 'slim', type: 'lineer', watts: 24, lengthCm: 60, lenses: 0, lm: 1585, beam: 120, esd: 'Diffucer 24 (s.24)' }),
  L({ sku: 'GMC6053', name: '90 CM Slim Lineer (opal)', fam: 'slim', type: 'lineer', watts: 30, lengthCm: 90, lenses: 0, lm: 1980, beam: 120, esd: 'Diffucer · 66 lm/W [Tahmin]' }),
  L({ sku: 'GMC6054', name: '6W Slim Mercek Lensli', fam: 'slim', type: 'mercek', watts: 6, lengthCm: 12.2, lenses: 6, lm: 430, beam: 24, beamOpts: REFLECT, esd: 'Reflect 6 · 120 mm (s.19)' }),
  L({ sku: 'GMC6055', name: '12W Slim Mercek Lensli', fam: 'slim', type: 'mercek', watts: 12, lengthCm: 23, lenses: 12, lm: 860, beam: 24, beamOpts: REFLECT, esd: 'Reflect 12 · 234 mm (s.20)' }),
  L({ sku: 'GMC6056', name: '18W Slim Mercek Lensli', fam: 'slim', type: 'mercek', watts: 18, lengthCm: 33, lenses: 18, lm: 1295, beam: 24, beamOpts: REFLECT, esd: 'Reflect 18 · 348 mm (s.20)' }),
  L({ sku: 'GMC6057', name: '24W Slim Mercek Lensli', fam: 'slim', type: 'mercek', watts: 24, lengthCm: 44, lenses: 24, lm: 1585, beam: 24, beamOpts: REFLECT, esd: 'Reflect 24 · 462 mm (s.20)' }),
  L({ sku: 'GMC6058', name: '30W Slim Mercek Lensli', fam: 'slim', type: 'mercek', watts: 30, lengthCm: 55, lenses: 30, lm: 1980, beam: 24, beamOpts: REFLECT, esd: 'Reflect · 66 lm/W [Tahmin]' }),
  L({ sku: 'GMC6059', name: '6W Slim Hareketli Opal', fam: 'slim', type: 'hareketli', opal: true, watts: 6, lengthCm: 12, lenses: 0, lm: 430, beam: 120, esd: 'Moving Diffucer 6 (s.18)' }),
  L({ sku: 'GMC6060', name: '12W Slim Hareketli Opal', fam: 'slim', type: 'hareketli', opal: true, watts: 12, lengthCm: 23, lenses: 0, lm: 860, beam: 120, esd: 'Moving Diffucer 12 (s.18)' }),
  L({ sku: 'GMC6061', name: '6W Slim Hareketli Mercekli', fam: 'slim', type: 'hareketli', watts: 6, lengthCm: 12, lenses: 6, lm: 430, beam: 24, beamOpts: REFLECT, esd: 'Moving Reflect 6 (s.16)' }),
  L({ sku: 'GMC6062', name: '12W Slim Hareketli Mercekli', fam: 'slim', type: 'hareketli', watts: 12, lengthCm: 23, lenses: 12, lm: 860, beam: 24, beamOpts: REFLECT, esd: 'Moving Reflect 12 (s.16)' }),
  L({ sku: 'GMC6083', name: '6W Slim Ray Spot', fam: 'slim', type: 'spot', watts: 6, lengthCm: 9, lenses: 0, lm: 750, beam: 24, beamOpts: ROTARY, esd: 'Rotary 40 · 6,1 W (s.7)' }),
  L({ sku: 'GMC6064', name: '10W Slim Ray Spot', fam: 'slim', type: 'spot', watts: 10, lengthCm: 11, lenses: 0, lm: 1020, beam: 24, beamOpts: ROTARY, esd: 'Rotary 60 · 8,9 W (s.8)' }),
  L({ sku: 'GMC6065', name: '20W Slim Ray Spot', fam: 'slim', type: 'spot', watts: 20, lengthCm: 12, lenses: 0, lm: 1705, beam: 24, beamOpts: ROTARY, esd: 'Rotary 70 · 20 W (s.8)' }),
  L({ sku: 'GMC6066', name: '30W Slim Ray Spot', fam: 'slim', type: 'spot', watts: 30, lengthCm: 13, lenses: 0, lm: 2550, beam: 24, beamOpts: ROTARY, esd: 'Rotary · 85 lm/W [Tahmin]' }),
  L({ sku: 'GMC6063', name: '2×10W İkili Ray Spot', fam: 'slim', type: 'spot', heads: 2, watts: 20, lengthCm: 18, lenses: 0, lm: 2040, beam: 24, beamOpts: ROTARY, esd: '2 × Rotary 60 (s.8)' }),
  L({ sku: 'GMC6071', name: '6W Slim Sarkıt', fam: 'slim', type: 'sarkit', watts: 6, lengthCm: 4, lenses: 0, lm: 750, beam: 34, beamOpts: PENDANT, esd: 'Pendant 41 · 6,1 W (s.30)' }),
  L({ sku: 'GMC6072', name: '6W Ay Sarkıt', fam: 'slim', type: 'sarkit', opal: true, watts: 6, lengthCm: 12, lenses: 0, lm: 430, beam: 120, esd: 'opal · Diffucer 6 değeri [Tahmin]' }),
  L({ sku: 'GMC6073', name: '12W Slim Sarkıt', fam: 'slim', type: 'sarkit', watts: 12, lengthCm: 6, lenses: 0, lm: 1300, beam: 34, beamOpts: PENDANT, esd: 'Pendant 60 oranı · 110 lm/W [Tahmin]' }),
  // ---- 2026-10-13 gmcled.com/magnet-aydinlatma-urunleri sayfasından eklenenler (sitede yeni; lümen sitede yok) ----
  L({ sku: 'GMC6074', name: '9W Slim Lineer Tüp (30 cm)', fam: 'slim', type: 'lineer', opal: true, watts: 9, lengthCm: 30, lenses: 0, lm: 650, beam: 120, esd: 'Diffucer · 72 lm/W [Tahmin]' }),
  L({ sku: 'GMC6075', name: '18W Slim Lineer Tüp (60 cm)', fam: 'slim', type: 'lineer', opal: true, watts: 18, lengthCm: 60, lenses: 0, lm: 1295, beam: 120, esd: 'Diffucer 18 (s.24) [Tahmin]' }),
  L({ sku: 'GMC6076', name: '25W Slim Lineer Tüp (90 cm)', fam: 'slim', type: 'lineer', opal: true, watts: 25, lengthCm: 90, lenses: 0, lm: 1800, beam: 120, esd: 'Diffucer · 72 lm/W [Tahmin]' }),
  L({ sku: 'GMC6069', name: '9W Slim Hareketli Opal', fam: 'slim', type: 'hareketli', opal: true, watts: 9, lengthCm: 9.5, lenses: 0, lm: 650, beam: 120, esd: 'Moving Diffucer · 72 lm/W [Tahmin]' }),
  L({ sku: 'GMC6070', name: '9W Slim Hareketli Mercekli', fam: 'slim', type: 'hareketli', watts: 9, lengthCm: 9.5, lenses: 8, lm: 645, beam: 24, beamOpts: REFLECT, esd: 'Moving Reflect · 72 lm/W [Tahmin]' }),
  L({ sku: 'GMC6082', name: '3W Slim Ray Spot', fam: 'slim', type: 'spot', watts: 3, lengthCm: 8, lenses: 0, lm: 255, beam: 24, beamOpts: ROTARY, esd: 'Rotary · 85 lm/W [Tahmin]' }),
  L({ sku: 'GMC6067', name: 'Üçlü Silindir', fam: 'slim', type: 'spot', heads: 3, watts: 18, lengthCm: 12.2, lenses: 0, lm: 1530, beam: 24, beamOpts: ROTARY, esd: '3 × 6 W Rotary · güç sitede yok [Tahmin]' }),
  L({ sku: 'GMC6068', name: 'Bal Petekli Silindir', fam: 'slim', type: 'spot', watts: 10, lengthCm: 7.5, lenses: 0, lm: 850, beam: 24, beamOpts: ROTARY, esd: 'Rotary · 85 lm/W; güç sitede yok [Tahmin]' }),
  // Esnek hortum: iki ucu raya takılır, aradaki hortum U gibi sarkar; rayda kapladığı yer [Tahmin], güç 10 W/m [Tahmin]
  L({ sku: 'GMC6077', name: '100 CM Esnek Hortum', fam: 'slim', type: 'lineer', opal: true, watts: 10, lengthCm: 25, lenses: 0, lm: 720, beam: 120, esd: 'opal hortum · 10 W/m, 72 lm/W [Tahmin]' }),
  L({ sku: 'GMC6078', name: '200 CM Esnek Hortum', fam: 'slim', type: 'lineer', opal: true, watts: 20, lengthCm: 45, lenses: 0, lm: 1440, beam: 120, esd: 'opal hortum · 10 W/m, 72 lm/W [Tahmin]' }),
  L({ sku: 'GMC6079', name: '300 CM Esnek Hortum', fam: 'slim', type: 'lineer', opal: true, watts: 30, lengthCm: 65, lenses: 0, lm: 2160, beam: 120, esd: 'opal hortum · 10 W/m, 72 lm/W [Tahmin]' }),
  // L köşe dönüş: rayın köşesine takılır (30 + 30 cm); uygulamada düz parçada 30 cm lineer olarak gösterilir
  L({ sku: 'GMC6084', name: 'L Köşe Dönüş Lineer (30+30 cm)', fam: 'slim', type: 'lineer', watts: 12, lengthCm: 30, lenses: 0, lm: 860, beam: 120, esd: 'opal · 72 lm/W; güç sitede yok [Tahmin]' }),
];

// Linear sarkıt (gmcled.com/urun-kategori/mimari-teknik-aydinlatma/linear-sarkit-aydinlatmalar, 2026-10-13).
// Raysız, tavandan askıyla sarkar, kendi 220V sürücüsü. Sitede sadece kod, şekil ve ölçü var; güç 15 W/m, 100 lm/W [Tahmin].
// Her model tek kart olarak listelenir; ölçü seçenekleri (sizes) seçili ürün kutusundan değiştirilir.
// paths: tavandan bakınca profilin çizgisi (metre, ürün merkezine göre). panel: alt yüzün tamamı yanar (davul, oval).
const circle = (r, n = 48) => Array.from({ length: n }, (_, i) => [Math.cos(i / n * Math.PI * 2) * r, Math.sin(i / n * Math.PI * 2) * r]);
const rectP = (a, b) => [[-a / 2, -b / 2], [a / 2, -b / 2], [a / 2, b / 2], [-a / 2, b / 2]];
const roundRect = (a, b, r) => {
  const out = [], q = 10, cx = a / 2 - r, cz = b / 2 - r;
  for (const [sx, sz, a0] of [[1, 1, 0], [-1, 1, .5], [-1, -1, 1], [1, -1, 1.5]])
    for (let i = 0; i <= q; i++) { const t = (a0 + i / q * .5) * Math.PI; out.push([sx * cx + Math.cos(t) * r, sz * cz + Math.sin(t) * r]); }
  return out;
};
const ngon = (n, side) => { const R = side / (2 * Math.sin(Math.PI / n)); return Array.from({ length: n }, (_, i) => [Math.cos((i / n - .25) * Math.PI * 2) * R, Math.sin((i / n - .25) * Math.PI * 2) * R]); };
const shapes = {
  duz: L => [{ pts: [[-L / 2, 0], [L / 2, 0]] }],
  halka: D => [{ pts: circle(D / 2), closed: true }],
  kare: (a, b = a) => [{ pts: rectP(a, b), closed: true }],
  oval: (a, b, r) => [{ pts: roundRect(a, b, r), closed: true }],
  ngon: (n, s) => [{ pts: ngon(n, s), closed: true }],
  x: L => { const h = L / 2 * Math.SQRT1_2; return [{ pts: [[-h, -h], [h, h]] }, { pts: [[-h, h], [h, -h]] }]; },
  v: (a, b) => [{ pts: [[-a / 2, -b / 2], [-a / 2, b / 2], [a / 2, b / 2]] }],
  // Hasır (ürün görseli): 4 çubuk altta bir yönde, 4 çubuk üstte dik yönde; çubuklar kendi boyunca kaydırmalı. dy: üst kat (m)
  hasir: L => { const s = L * .17, sh = [-.12, .08, -.04, .12], o = [];
    for (let i = 0; i < 4; i++) { const k = (i - 1.5) * s, d = sh[i] * L; o.push({ pts: [[-L / 2 + d, k], [L / 2 + d, k]] }, { pts: [[k, -L / 2 - d], [k, L / 2 - d]], dy: .038 }); }
    return o; },
};
const plen = paths => paths.reduce((a, { pts, closed }) => { let s = 0; const n = closed ? pts.length : pts.length - 1; for (let i = 0; i < n; i++) { const [x0, z0] = pts[i], [x1, z1] = pts[(i + 1) % pts.length]; s += Math.hypot(x1 - x0, z1 - z0); } return a + s; }, 0);
// m: model; sizes: [etiket, şekil fonksiyonu] (cm); def: varsayılan ölçünün sırası
const MODELS = [
  { code: 'GMC212', name: 'Düz Linear Sarkıt', sizes: [100, 120, 200, 300].map(L => [`${L} cm`, () => shapes.duz(L / 100)]), def: 1 },
  { code: 'GMC215', name: 'Oval Kenar Linear Sarkıt', sizes: [100, 120, 200].map(L => [`${L} cm`, () => shapes.duz(L / 100)]), def: 1 },
  { code: 'GMC235', name: 'Hasır Linear Sarkıt', drop: .13, pw: .032, ph: .038, sizes: [60, 80, 100].map(L => [`8 × ${L} cm`, () => shapes.hasir(L / 100)]), def: 0 },
  { code: 'GMC220', name: 'Simit Linear Sarkıt', sizes: [50, 60, 70, 80, 100].map(D => [`Ø${D} cm`, () => shapes.halka(D / 100)]), def: 1 },
  { code: 'GMC221', name: 'Davul Linear Sarkıt', panel: true, sizes: [50, 60, 70, 80, 100].map(D => [`Ø${D} cm`, () => shapes.halka(D / 100)]), def: 1 },
  { code: 'GMC222', name: 'Altıgen Linear Sarkıt', sizes: [30, 45].map(s => [`6 × ${s} cm`, () => shapes.ngon(6, s / 100)]), def: 0 },
  { code: 'GMC227', name: 'Üçgen Linear Sarkıt', sizes: [60, 90].map(s => [`${s} × ${s} × ${s} cm`, () => shapes.ngon(3, s / 100)]), def: 0 },
  { code: 'GMC224', name: 'Kare Linear Sarkıt', sizes: [50, 80, 100].map(a => [`${a} × ${a} cm`, () => shapes.kare(a / 100)]), def: 1 },
  { code: 'GMC225', name: 'Kare Davul Linear Sarkıt', panel: true, sizes: [40, 60].map(a => [`${a} × ${a} cm`, () => shapes.oval(a / 100, a / 100, .04)]), def: 1 },
  { code: 'GMC223', name: 'Dikdörtgen Linear Sarkıt', sizes: [[50, 100], [60, 120], [80, 160], [100, 200]].map(([b, a]) => [`${b} × ${a} cm`, () => shapes.kare(a / 100, b / 100)]), def: 1 },
  { code: 'GMC228', name: 'Oval Linear Sarkıt', panel: true, sizes: [90, 120, 150].map(a => [`30 × ${a} cm`, () => shapes.oval(a / 100, .3, .15)]), def: 1 },
  { code: 'GMC229', name: 'Oval Dikdörtgen Linear Sarkıt', panel: true, sizes: [90, 120, 150].map(a => [`30 × ${a} cm`, () => shapes.oval(a / 100, .3, .07)]), def: 1 },
  { code: 'GMC231', name: 'V Linear Sarkıt', sizes: [50, 80, 100].map(a => [`${a} × ${a} cm`, () => shapes.v(a / 100, a / 100)]), def: 1 },
  { code: 'GMC230', name: 'X Linear Sarkıt', sizes: [80, 100, 120].map(L => [`${L} cm kol (özel ölçü)`, () => shapes.x(L / 100)]), def: 1 },
];
export const LSARKIT = [];        // listede görünenler (her modelin varsayılan ölçüsü)
export const LSARKIT_ALL = [];    // tüm ölçüler (seçili ürün kutusunda ölçü değişince bunlardan biri kullanılır)
for (const m of MODELS) {
  const vars = m.sizes.map(([label, f], i) => {
    const paths = f(), xs = paths.flatMap(p => p.pts.map(q => q[0])), zs = paths.flatMap(p => p.pts.map(q => q[1]));
    const len = plen(paths), watts = Math.max(6, Math.round(len * 15));
    return { sku: `${m.code}-${i + 1}`, model: m.code, name: `${m.name} · ${label}`, size: label, fam: 'gomme', grp: 'lsarkit', type: 'lsarkit',
      paths, panel: !!m.panel, lengthCm: Math.round((Math.max(...xs) - Math.min(...xs)) * 1000) / 10, widthCm: Math.max(5, Math.round((Math.max(...zs) - Math.min(...zs)) * 1000) / 10),
      drop: m.drop || .8, pw: m.pw, ph: m.ph, watts, lm: watts * 100, beam: 120, src: A + m.code.toLowerCase() + '.jpg' };
  });
  vars.forEach((v, i) => { v.variants = vars.map(x => x.sku); v.alt = i !== m.def; });   // alt: listede görünmez, ölçü seçimiyle gelir
  LSARKIT.push(vars[m.def]); LSARKIT_ALL.push(...vars);
}

// Gömme spotlar: tavana gömülür, raysız, kendi 220V sürücüsü. Ölçüler cm. shape: round (çap = lengthCm) / rect.
// heads: ışık veren göz sayısı (Dark, Daisy çok gözlü). opal: geniş, yumuşak ışık (Opus).
const S = (o) => L({ fam: 'gomme', grp: 'spot', type: 'downlight', real: true, ...o });
export const SPOTS = [
  S({ sku: 'OPUS-5', name: 'Opus 5', watts: 14, lm: 2170, shape: 'round', lengthCm: 14.2, widthCm: 14.2, cut: 'Ø12 cm', opal: true, beam: 110, kat: 's.72' }),
  S({ sku: 'OPUS-6', name: 'Opus 6', watts: 20, lm: 3220, shape: 'round', lengthCm: 17.7, widthCm: 17.7, cut: 'Ø16 cm', opal: true, beam: 110, kat: 's.72' }),
  S({ sku: 'OPUS-8', name: 'Opus 8', watts: 40, lm: 6440, shape: 'round', lengthCm: 23, widthCm: 23, cut: 'Ø21 cm', opal: true, beam: 110, kat: 's.72' }),
  S({ sku: 'ROTUN-6', name: 'Rotun 6', watts: 10, lm: 1770, shape: 'round', lengthCm: 12, widthCm: 12, cut: 'Ø10 cm', beam: 45, beamOpts: [45, 60], kat: 's.63' }),
  S({ sku: 'ROTUN-12', name: 'Rotun 12', watts: 21, lm: 2124, shape: 'round', lengthCm: 17.7, widthCm: 17.7, cut: 'Ø16 cm', beam: 45, beamOpts: [45, 60], kat: 's.64' }),
  S({ sku: 'ROTUN-18', name: 'Rotun 18', watts: 30, lm: 5310, shape: 'round', lengthCm: 17.7, widthCm: 17.7, cut: 'Ø16 cm', beam: 45, beamOpts: [45, 60], kat: 's.64' }),
  S({ sku: 'MIDY', name: 'Midy', watts: 10, lm: 1600, shape: 'round', lengthCm: 5.9, widthCm: 5.9, cut: 'Ø5,5 cm', beam: 40, kat: 's.68' }),
  S({ sku: 'TINY', name: 'Tiny', watts: 2.2, lm: 390, shape: 'round', lengthCm: 4.7, widthCm: 4.7, cut: 'Ø4 cm', beam: 25, beamOpts: [25, 38], kat: 's.68' }),
  S({ sku: 'DARK-1', name: 'Dark 1', watts: 2.2, lm: 390, shape: 'rect', lengthCm: 5.7, widthCm: 5.7, cut: '5 × 5 cm', heads: 1, beam: 34, beamOpts: [20, 34, 48], kat: 's.65' }),
  S({ sku: 'DARK-3', name: 'Dark 3', watts: 3, lm: 530, shape: 'rect', lengthCm: 10.7, widthCm: 5.5, cut: '10 × 4 cm', heads: 3, beam: 34, beamOpts: [20, 34, 48], kat: 's.65' }),
  S({ sku: 'DARK-5', name: 'Dark 5', watts: 8, lm: 1280, shape: 'rect', lengthCm: 16, widthCm: 5.5, cut: '15 × 4 cm', heads: 5, beam: 34, beamOpts: [20, 34, 48], kat: 's.65' }),
  S({ sku: 'DAISY-4L', name: 'Daisy 4 L', watts: 14, lm: 2240, shape: 'rect', lengthCm: 19.6, widthCm: 6.6, cut: '17,5 × 4,5 cm', heads: 4, beam: 50, beamOpts: [50, 90], kat: 's.66' }),
  S({ sku: 'DAISY-7L', name: 'Daisy 7 L', watts: 20, lm: 3200, shape: 'rect', lengthCm: 30.5, widthCm: 6.6, cut: '29,5 × 4,5 cm', heads: 7, beam: 50, beamOpts: [50, 90], kat: 's.66' }),
];

// Eski kodlarla kaydedilmiş projeler açılsın (dist/catalog.json'daki GMC62xx kodları sitede GMC60xx)
export const ALIAS = Object.fromEntries(MAGNET.filter(p => p.old).map(p => [p.old, p.sku]));
