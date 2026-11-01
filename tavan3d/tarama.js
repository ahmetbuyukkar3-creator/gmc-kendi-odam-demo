// GMC Tavan Stüdyo · otomatik oda tarama (saf hesap, DOM yok; node ile de test edilir)
// Girdi: yüzey etiketleri (yapay zekâ: 0 diğer, 1 tavan, 2 duvar, 3 zemin) + gri fotoğraf.
// 1) Tavanın alt sınırı 1-3 doğruya oturtulur: sol duvar–tavan, arka duvar–tavan, sağ duvar–tavan → TL, TR, SL, SR.
// 2) Fotoğraftaki dikey çizgiler (kapı, pencere, dolap kenarı) + tavan çizgileri → kamera yönü ve lens.
// 3) Zemin–duvar sınırı (görünen yerlerden) → kameranın yerden yüksekliği oranı → BL, BR (mobilya arkasında kalsa da).
// Çıktı: uygulamanın işaretleme noktaları (0-1, kadraj dışına taşabilir) + güven bilgisi.
import { nelderMead } from './vitrin.js';

const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const norm = a => { const l = Math.hypot(a[0], a[1], a[2]); return l > 1e-12 ? mul(a, 1 / l) : [0, 0, 0]; };
const median = a => { const s = [...a].sort((x, y) => x - y), n = s.length; return n ? (n % 2 ? s[n >> 1] : (s[n / 2 - 1] + s[n / 2]) / 2) : NaN; };

// Etiket haritasını küçült (en yakın komşu)
export function kucult(lab, W, H, w) {
  const h = Math.round(H * w / W), out = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) { const sy = Math.min(H - 1, (y + .5) * H / h | 0); for (let x = 0; x < w; x++) out[y * w + x] = lab[sy * W + Math.min(W - 1, (x + .5) * W / w | 0)]; }
  return { lab: out, W: w, H: h };
}

// En büyük tavan parçası
function tavanParcasi(lab, W, H) {
  const seen = new Uint8Array(W * H); let best = null;
  for (let s = 0; s < W * H; s++) {
    if (lab[s] !== 1 || seen[s]) continue;
    const st = [s], px = []; seen[s] = 1;
    while (st.length) {
      const p = st.pop(), x = p % W; px.push(p);
      for (const q of [x > 0 ? p - 1 : -1, x < W - 1 ? p + 1 : -1, p - W, p + W])
        if (q >= 0 && q < W * H && !seen[q] && lab[q] === 1) { seen[q] = 1; st.push(q); }
    }
    if (!best || px.length > best.length) best = px;
  }
  const m = new Uint8Array(W * H); if (best) for (const p of best) m[p] = 1;
  return { m, n: best ? best.length : 0 };
}

// Toplamlarla doğru uydurma (y = a + b x): her parça O(1)
function prefix(P) {
  const n = P.length, S = { x: [0], y: [0], xx: [0], xy: [0], yy: [0] };
  for (let i = 0; i < n; i++) {
    const [x, y] = P[i];
    S.x.push(S.x[i] + x); S.y.push(S.y[i] + y); S.xx.push(S.xx[i] + x * x); S.xy.push(S.xy[i] + x * y); S.yy.push(S.yy[i] + y * y);
  }
  return S;
}
function fitRange(S, i, j) {                               // [i, j) aralığı: {a, b, sse}
  const n = j - i; if (n < 2) return null;
  const sx = S.x[j] - S.x[i], sy = S.y[j] - S.y[i], sxx = S.xx[j] - S.xx[i], sxy = S.xy[j] - S.xy[i], syy = S.yy[j] - S.yy[i];
  const d = n * sxx - sx * sx; if (Math.abs(d) < 1e-9) return null;
  const b = (n * sxy - sx * sy) / d, a = (sy - b * sx) / n;
  const sse = Math.max(0, syy - 2 * a * sy - 2 * b * sxy + a * a * n + 2 * a * b * sx + b * b * sxx);
  return { a, b, sse, n };
}

// Tavan sınırını 1, 2 ya da 3 doğruya böl (BIC ile seçim; ardından aykırı noktalar atılıp yeniden)
export function parcala(P, tol) {
  // Aykırıya dayanıklı: her parça doğruya oturtulur, tol'dan uzak noktalar sabit ceza alır (tablo, perde, sarkıt lamba sınırı bozmasın)
  const n = P.length, minN = Math.max(4, Math.round(n * .03)), step = Math.max(1, Math.round(n / 160)), c2 = tol * tol;
  const G = []; for (let i = 0; i < n; i += step) G.push(i); if (G[G.length - 1] !== n) G.push(n);
  const memo = new Map();
  const seg = (i, j) => {
    const key = i * 100000 + j; if (memo.has(key)) return memo.get(key);
    let pts = P.slice(i, j), f = fitRange(prefix(pts), 0, pts.length), res = null;
    for (let it = 0; it < 3 && f; it++) {
      const inl = pts.filter(([x, y]) => Math.abs(y - f.a - f.b * x) < (it ? tol : 3 * tol));
      if (inl.length < 3) break;
      const g = fitRange(prefix(inl), 0, inl.length); if (!g) break; f = g;
    }
    if (f) {
      let cost = 0, sse = 0, m = 0;
      for (const [x, y] of pts) { const r2 = (y - f.a - f.b * x) ** 2; if (r2 < c2) { sse += r2; m++; } cost += Math.min(r2, c2); }
      res = { a: f.a, b: f.b, cost, rms: Math.sqrt(sse / Math.max(1, m)), inl: m / pts.length, x0: P[i][0], x1: P[j - 1][0] };
    }
    memo.set(key, res); return res;
  };
  // En fazla 5 parça (dinamik programlama); her yeni parça noktaların %2'si kadar aykırı düzeltmeli
  const pen = .02 * n * c2, K = 5, m = G.length;
  const dp = Array.from({ length: K + 1 }, () => new Array(m).fill(Infinity)), from = Array.from({ length: K + 1 }, () => new Array(m).fill(-1));
  dp[0][0] = 0;
  for (let k = 1; k <= K; k++) for (let jj = 1; jj < m; jj++) for (let ii = 0; ii < jj; ii++) {
    if (dp[k - 1][ii] === Infinity || G[jj] - G[ii] < minN) continue;
    const r = seg(G[ii], G[jj]); if (!r) continue;
    const v = dp[k - 1][ii] + r.cost + (k > 1 ? pen : 0);
    if (v < dp[k][jj]) { dp[k][jj] = v; from[k][jj] = ii; }
  }
  let bk = 1; for (let k = 2; k <= K; k++) if (dp[k][m - 1] < dp[bk][m - 1]) bk = k;
  if (dp[bk][m - 1] === Infinity) return null;
  const cuts = [m - 1]; for (let k = bk, j = m - 1; k > 0; k--) { j = from[k][j]; cuts.unshift(j); }
  const parts = []; for (let s = 0; s < cuts.length - 1; s++) parts.push(seg(G[cuts[s]], G[cuts[s + 1]]));
  // Aynı eğimdeki komşu parçalar aynı duvar (çıkıntı, kartonpiyer basamağı): grupla, grubun en uzun parçası o duvarın çizgisi
  const ang = l => Math.atan(l.b) * 180 / Math.PI, groups = [];
  for (const l of parts) {
    const g = groups[groups.length - 1];
    if (g && Math.abs(ang(g.main) - ang(l)) < 5) { g.parts.push(l); if (l.x1 - l.x0 > g.main.x1 - g.main.x0) g.main = l; g.x1 = l.x1; }
    else groups.push({ main: l, parts: [l], x0: l.x0, x1: l.x1 });
  }
  const lines = groups.map(g => ({ ...g.main, x0: g.x0, x1: g.x1, n: g.parts.length }));
  return { k: lines.length, lines, parcalar: parts.length, cost: dp[bk][m - 1] };
}
const kesis = (l1, l2) => { const x = (l2.a - l1.a) / (l1.b - l2.b); return [x, l1.a + l1.b * x]; };

// Dikeye yakın çizgiler (Hough): x = x0 + t (y - H/2)
export function dikeyCizgiler(g, W, H, opt = {}) {
  const gx = new Float32Array(W * H), gy = new Float32Array(W * H);
  for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
    const i = y * W + x, a = g[i - W - 1], b = g[i - W], c = g[i - W + 1], d = g[i - 1], e = g[i + 1], f = g[i + W - 1], h = g[i + W], k = g[i + W + 1];
    gx[i] = (c + 2 * e + k) - (a + 2 * d + f); gy[i] = (f + 2 * h + k) - (a + 2 * b + c);
  }
  const mags = []; for (let i = 0; i < W * H; i += 7) mags.push(Math.hypot(gx[i], gy[i]));
  mags.sort((a, b) => a - b); const thr = Math.max(40, mags[Math.floor(mags.length * .9)]);
  const T = [], tMax = .2, tStep = .005; for (let t = -tMax; t <= tMax + 1e-9; t += tStep) T.push(t);
  const acc = new Uint16Array(T.length * W), cy = H / 2;
  const edge = [];
  for (let y = 2; y < H - 2; y++) for (let x = 2; x < W - 2; x++) {
    const i = y * W + x, ax = Math.abs(gx[i]), ay = Math.abs(gy[i]);
    if (ax < thr || ax < 2.5 * ay) continue;
    edge.push(i);
    const t0 = -gy[i] / gx[i];                           // kenar yönü: dx/dy
    for (let ti = 0; ti < T.length; ti++) {
      if (Math.abs(T[ti] - t0) > .05) continue;
      const x0 = Math.round(x - T[ti] * (y - cy)); if (x0 >= 0 && x0 < W) acc[ti * W + x0]++;
    }
  }
  const minV = Math.round((opt.minLen || .1) * H), out = [];
  const used = new Uint8Array(acc.length);
  const peaks = []; for (let i = 0; i < acc.length; i++) if (acc[i] >= minV) peaks.push(i);
  peaks.sort((a, b) => acc[b] - acc[a]);
  for (const p of peaks) {
    if (used[p] || out.length >= (opt.max || 40)) continue;
    const ti = Math.floor(p / W), x0 = p % W, t = T[ti];
    for (let dt = -4; dt <= 4; dt++) for (let dx = -6; dx <= 6; dx++) { const q = (ti + dt) * W + x0 + dx; if (ti + dt >= 0 && ti + dt < T.length && x0 + dx >= 0 && x0 + dx < W) used[q] = 1; }
    // Çizginin destek aralığı (uç noktalar)
    let y0 = H, y1 = 0, cnt = 0;
    for (let y = 2; y < H - 2; y++) {
      const x = Math.round(x0 + t * (y - cy)); if (x < 2 || x >= W - 2) continue;
      let hit = false; for (let dx = -1; dx <= 1 && !hit; dx++) { const i = y * W + x + dx; if (Math.abs(gx[i]) >= thr && Math.abs(gx[i]) >= 2.5 * Math.abs(gy[i])) hit = true; }
      if (hit) { cnt++; y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    }
    if (cnt < minV || y1 - y0 < minV) continue;
    out.push({ a: [x0 + t * (y0 - cy), y0], b: [x0 + t * (y1 - cy), y1], v: cnt });
  }
  return out;
}

/* Kamera yönü: uygulamadaki rotDirs ile aynı (dünya x sağ, y yukarı, z kameraya → kamera x sağ, y aşağı, z ileri) */
function rotDirs(yaw, pitch, roll) {
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch), cr = Math.cos(roll), sr = Math.sin(roll);
  const ap = v => {
    let [x, y, z] = v;
    [x, z] = [cy * x + sy * z, -sy * x + cy * z];
    [y, z] = [cp * y - sp * z, sp * y + cp * z];
    [x, y] = [cr * x - sr * y, sr * x + cr * y];
    return [x, -y, -z];
  };
  return { ex: ap([1, 0, 0]), up: ap([0, 1, 0]), dz: ap([0, 0, 1]) };
}
function lineErr(a, b, d, f, W, H) {                       // çizginin, yönünün kaybolma noktasına sapması (fotoğraf uzun kenarına oranla)
  const v = [f * d[0] + W / 2 * d[2], f * d[1] + H / 2 * d[2], d[2]];
  const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, 1];
  const l = cross(m, v), k = Math.hypot(l[0], l[1]) || 1e-9;
  return Math.abs(dot(l, [a[0], a[1], 1])) / k / Math.max(W, H);
}

// Ana iş: etiket + gri foto → noktalar
export function tara({ lab, W, H, gray, gW, gH, depth, ceilH = 2.7 }) {
  const info = { uyari: [] };
  const L = kucult(lab, W, H, Math.min(W, 640)), w = L.W, h = L.H, sx = W / w;
  // 1) Tavan alt sınırı (her sütunda tavanın en alt pikseli)
  const { m, n } = tavanParcasi(L.lab, w, h);
  info.tavanOran = n / (w * h);
  if (info.tavanOran < .03) return { ok: false, info: { ...info, neden: 'Tavan bulunamadı ya da çok az görünüyor.' } };
  const P = [];
  for (let x = 0; x < w; x++) {
    let yb = -1; for (let y = h - 1; y >= 0; y--) if (m[y * w + x]) { yb = y; break; }
    if (yb < 0 || yb >= h - 2) continue;
    P.push([(x + .5) * sx, (yb + 1) * sx]);              // asıl çözünürlükte
  }
  if (P.length < w * .3) return { ok: false, info: { ...info, neden: 'Tavan sınırı fotoğrafın çok azında görünüyor.' } };
  const seg = parcala(P, 5 * sx); if (!seg) return { ok: false, info: { ...info, neden: 'Tavan sınırı doğrulara oturmadı.' } }; // Kenarda, fotoğrafın en üstüne yapışık parça = tavan orada kesilmiş (tablo, perde) → duvar çizgisi sayılmaz
  let lines = seg.lines.slice();
  const meanY = l => l.a + l.b * (l.x0 + l.x1) / 2;
  while (lines.length > 1 && meanY(lines[0]) < .04 * H) lines.shift();
  while (lines.length > 1 && meanY(lines[lines.length - 1]) < .04 * H) lines.pop();
  if (lines.length > 3) {                                  // en geniş ardışık üçlü
    let bi = 0, bw = -1; for (let i = 0; i + 3 <= lines.length; i++) { const wd = lines[i + 2].x1 - lines[i].x0; if (wd > bw) { bw = wd; bi = i; } }
    lines = lines.slice(bi, bi + 3);
  }
  seg.lines = lines; seg.k = lines.length;
  info.parca = seg.k; info.cizgiRms = seg.lines.map(l => +l.rms.toFixed(1));
  // Hangi parça arka duvar: 3 parçada orta; 2 parçada daha yatık olan; 1 parçada tek
  let back, left = null, right = null;
  if (seg.k === 3) [left, back, right] = seg.lines;
  else if (seg.k === 2) { const [a, b] = seg.lines; if (Math.abs(a.b) <= Math.abs(b.b)) { back = a; right = b; } else { left = a; back = b; } }
  else back = seg.lines[0];
  let TL = left ? kesis(left, back) : [back.x0, back.a + back.b * back.x0];
  let TR = right ? kesis(right, back) : [back.x1, back.a + back.b * back.x1];
  const SL = left ? [left.x0, left.a + left.b * left.x0] : null, SR = right ? [right.x1, right.a + right.b * right.x1] : null;
  // 2) Kamera yönü + lens: dikey çizgiler ve tavan çizgileri birlikte
  const V = gray ? dikeyCizgiler(gray, gW, gH).map(l => ({ a: mul2(l.a, W / gW), b: mul2(l.b, W / gW), v: l.v })) : [];
  info.dikey = V.length;
  const vSum = V.reduce((s, l) => s + l.v, 0) || 1;
  const cost = x => {
    const f = Math.max(W, H) * Math.exp(x[3]), d = rotDirs(x[0], x[1], x[2]);
    if (d.up[1] > -0.3 || f < .15 * Math.max(W, H) || f > 3 * Math.max(W, H)) return 1e3;
    let e = 0;
    for (const l of V) { const r = lineErr(l.a, l.b, d.up, f, W, H); e += (l.v / vSum) * Math.min(r, .01) ** 2 * 4; }   // aykırı çizgi sınırlı etki
    e += 3 * lineErr(TL, TR, d.ex, f, W, H) ** 2;
    if (SL) e += 3 * lineErr(SL, TL, d.dz, f, W, H) ** 2;
    if (SR) e += 3 * lineErr(TR, SR, d.dz, f, W, H) ** 2;
    if (!SL && !SR) e += .02 * (x[3] - Math.log(26 / 36)) ** 2;   // yan çizgi yoksa lens 26 mm'ye yakın kalsın
    if (V.length < 3) e += .05 * x[1] ** 2 + .05 * x[2] ** 2;      // dikey çizgi yoksa kamera düz tutulmuş say
    return e;
  };
  let best = null;
  for (const yaw of [-.9, -.5, -.2, .2, .5, .9]) for (const pitch of [-.25, .1]) for (const lf of [-.5, -.15]) {
    const r = nelderMead(cost, [yaw, pitch, 0, lf], [.15, .1, .05, .2]);
    if (!best || r.v < best.v) best = r;
  }
  if (!best || best.v >= 1e3) return { ok: false, info: { ...info, neden: 'Kamera açısı hesaplanamadı.' } };
  const f = Math.max(W, H) * Math.exp(best.x[3]), D = rotDirs(best.x[0], best.x[1], best.x[2]);
  info.lensMm = +(f / Math.max(W, H) * 36).toFixed(1); info.yonHata = +Math.sqrt(best.v).toFixed(4);
  const up = D.up, ray = p => [(p[0] - W / 2) / f, (p[1] - H / 2) / f, 1];
  const proj = X => [f * X[0] / X[2] + W / 2, f * X[1] / X[2] + H / 2];
  // Tavan düzlemi: kameradan 1 birim yukarıda (up · X = 1)
  const onCeil = p => { const r = ray(p), d = dot(up, r); return d > 1e-6 ? mul(r, 1 / d) : null; };
  const XTL = onCeil(TL), XTR = onCeil(TR);
  if (!XTL || !XTR) return { ok: false, info: { ...info, neden: 'Arka duvar köşeleri tavanda değil.' } };
  // Yan duvarlar arka duvara dik: arka duvar yönü (tavanda) → yan yön
  const ex = norm(sub(XTR, XTL)), side = norm(cross(up, ex));          // side: arka duvara dik, yatay
  const nB = norm(cross(ex, up));
  // 3) Zemin–duvar sınırı: duvarın hemen altında zemin başlayan pikseller → k (kameranın yerden yüksekliği / tavana uzaklığı)
  const ks = [];
  const xAt = (X0, k, py) => { const a = proj(X0), b = proj(sub(X0, mul(up, 1 + k))); return a[0] + (b[0] - a[0]) * (py - a[1]) / (b[1] - a[1]); };
  const wallHit = (p, plane) => { const r = ray(p), d = dot(plane.n, r); if (Math.abs(d) < 1e-6) return null; const s = dot(plane.n, plane.p) / d; return s > 0 ? mul(r, s) : null; };
  const planes = { back: { n: nB, p: XTL }, left: { n: ex, p: XTL }, right: { n: ex, p: XTR } };
  for (let pass = 0; pass < 2; pass++) {
    ks.length = 0; const k0 = pass ? info.k : 1.1;
    for (let x = 0; x < w; x++) for (let y = 1; y < h - 3; y++) {
      const i = y * w + x;
      if (L.lab[i] !== 2 || L.lab[i + w] !== 3 || L.lab[i + 2 * w] !== 3) continue;
      const p = [(x + .5) * sx, (y + 1) * sx];
      const xl = xAt(XTL, k0, p[1]), xr = xAt(XTR, k0, p[1]);
      const which = p[0] < xl - 4 * sx ? (SL || left ? 'left' : null) : p[0] > xr + 4 * sx ? (SR || right ? 'right' : null) : 'back';
      if (!which) continue;
      const X = wallHit(p, planes[which]); if (!X) continue;
      const k = -dot(up, X); if (k > .2 && k < 6) ks.push(k);
    }
    info.zeminNokta = ks.length;
    if (ks.length >= 8) {
      const md = median(ks), mad = median(ks.map(k => Math.abs(k - md))) * 1.4826;
      info.k = median(ks.filter(k => Math.abs(k - md) < 3 * mad + .02)); info.kSapma = +(mad / md).toFixed(3);
    } else { info.k = null; break; }
  }
  info.kSinir = info.k;
  // 3b) Derinlik haritası (3D tarama): tavan pikselleri ölçek verir (tavan düzlemi biliniyor), zemin piksellerinin yüksekliği oradan.
  // Model göreli ters derinlik verir: d = a / Z + b. a, b tavandan bulunur; zemindeki her pikselin Z'si → kameranın zeminden yüksekliği.
  if (depth) {
    const { data: Dd, dW, dH } = depth;
    const at = p => Dd[Math.min(dH - 1, p[1] * dH / H | 0) * dW + Math.min(dW - 1, p[0] * dW / W | 0)];
    const inner = (x, y, lb, msk) => { for (let dy = -3; dy <= 3; dy += 3) for (let dx = -3; dx <= 3; dx += 3) { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= w || yy >= h) return false; const j = yy * w + xx; if (msk ? !msk[j] : L.lab[j] !== lb) return false; } return true; };
    const C = [];
    for (let y = 0; y < h; y += 2) for (let x = 0; x < w; x += 2) if (m[y * w + x] && inner(x, y, 1, m)) {
      const p = [(x + .5) * sx, (y + .5) * sx], X = onCeil(p); if (X && X[2] > 0) C.push([1 / X[2], at(p)]);
    }
    let a = null, b = null, r2 = 0;
    if (C.length > 50) {
      let pts = C;
      for (let it = 0; it < 3; it++) {
        const f = fitRange(prefix(pts), 0, pts.length); if (!f) break; b = f.a; a = f.b;
        const res = pts.map(([u, d]) => Math.abs(d - b - a * u)), md = median(res) * 3 + 1e-6;
        pts = pts.filter((_, i) => res[i] < md);
      }
      const my = C.reduce((s, c) => s + c[1], 0) / C.length, st = C.reduce((s, c) => s + (c[1] - my) ** 2, 0), se = C.reduce((s, c) => s + (c[1] - b - a * c[0]) ** 2, 0);
      r2 = 1 - se / st;
    }
    info.derinR2 = +r2.toFixed(3);
    if (a > 0) {
      const kd = [];
      for (let y = 0; y < h; y += 2) for (let x = 0; x < w; x += 2) if (L.lab[y * w + x] === 3 && inner(x, y, 3)) {
        const p = [(x + .5) * sx, (y + .5) * sx], iz = (at(p) - b) / a; if (!(iz > 1e-4)) continue;
        const k = -dot(up, mul(ray(p), 1 / iz)); if (k > .2 && k < 6) kd.push(k);
      }
      info.zeminDerinNokta = kd.length; info.zeminOran = +(kd.length / (Math.ceil(w / 2) * Math.ceil(h / 2))).toFixed(4);
      if (kd.length > 50) { const md = median(kd); info.kDerin = md; info.kDerinSapma = +(median(kd.map(k => Math.abs(k - md))) * 1.4826 / md).toFixed(3); }
    }
  }
  // Karar: zemin–duvar sınırı tutarlıysa o (doğrudan geometri), değilse derinlik, ikisi de yoksa tahmini kamera yüksekliği
  if (info.kSinir && info.kSapma < .1 && info.zeminNokta >= 30) info.kKaynak = 'sinir';
  else if (info.kDerin && info.derinR2 > .6 && info.zeminOran > .04 && info.kDerinSapma < .1) { info.k = info.kDerin; info.kKaynak = 'derinlik'; }
  else if (info.kSinir) { info.kKaynak = 'sinir-zayif'; info.uyari.push('Oda tam kutu şeklinde görünmüyor (açık plan, asma tavan ya da çıkıntı olabilir); köşeleri kontrol edin.'); }
  else { info.k = 1.45 / Math.max(.5, ceilH - 1.45); info.kKaynak = 'tahmin'; info.uyari.push('Zemin az görünüyor; alt köşeler tahmini (kamera yerden 1,45 m sayıldı). Alt köşeleri kontrol edin.'); }
  const BL = proj(sub(XTL, mul(up, 1 + info.k))), BR = proj(sub(XTR, mul(up, 1 + info.k)));
  info.kameraYuk = +(info.k / (1 + info.k) * ceilH).toFixed(2);
  const pts = { TL, TR, BR, BL };
  if (SL) pts.SL = SL; if (SR) pts.SR = SR;
  if (!SL && !SR) info.uyari.push('Yan duvar–tavan çizgisi görünmüyor; lens tahmini.');
  const nrm = Object.fromEntries(Object.entries(pts).map(([k, p]) => [k, [+(p[0] / W).toFixed(4), +(p[1] / H).toFixed(4)]]));
  return { ok: true, pts: nrm, sideOff: !SL && !SR, info, cizgiler: { back, left, right, V, P } };
}
const mul2 = (p, k) => [p[0] * k, p[1] * k];
