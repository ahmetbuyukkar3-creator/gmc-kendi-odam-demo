// GMC Tavan Stüdyo · tarama işçisi (Web Worker): yüzey tanıma (tavan/duvar/zemin) + derinlik.
// Fotoğraf cihazdan çıkmaz; sadece modeller ilk seferde indirilir (~55 MB) ve tarayıcı önbelleğinde kalır.
import { pipeline, env, RawImage } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1';

env.allowLocalModels = false;
// iOS Safari: SharedArrayBuffer (çapraz-köken izolasyonu) olmadan iş parçacığı açılamaz; tek iş parçacığına sabitle
// ki model yüklenirken thread hatasıyla patlamasın. Diğer tarayıcılarda da zararsız (zaten tek iş parçacığı).
try { env.backends.onnx.wasm.numThreads = 1; env.backends.onnx.wasm.proxy = false; } catch { }
const IOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
let seg = null, dep = null, aktif = 0;
const IDS = { ceiling: 1, wall: 2, floor: 3 };
const prog = p => { if (p.status === 'progress') postMessage({ id: aktif, tip: 'indir', dosya: p.file, yuklendi: p.loaded || 0, toplam: p.total || 0 }); };

const getSeg = () => seg ??= pipeline('image-segmentation', 'Xenova/segformer-b2-finetuned-ade-512-512', { dtype: 'q8', device: 'wasm', progress_callback: prog });
const getDep = () => dep ??= pipeline('depth-estimation', 'onnx-community/depth-anything-v2-small', { dtype: 'q8', device: 'wasm', progress_callback: prog });
// iOS belleği iki modeli aynı anda kaldıramaz: birini çalıştırıp bırakmadan ötekini yükleme
async function serbest(p, isim) { try { await (await p)?.dispose?.(); } catch { } if (isim === 'seg') seg = null; else dep = null; }

onmessage = async e => {
  const { id, data, w, h } = e.data;
  aktif = id;
  try {
    postMessage({ id, tip: 'asama', asama: 'model' });
    const img = new RawImage(new Uint8ClampedArray(data), w, h, 4).rgb();
    // --- yüzey (tavan/duvar/zemin) ---
    const segModel = await getSeg();
    postMessage({ id, tip: 'asama', asama: 'yuzey' });
    let t = performance.now();
    const parts = await segModel(img);
    const W = parts[0].mask.width, H = parts[0].mask.height, lab = new Uint8Array(W * H);
    for (const p of parts) if (IDS[p.label]) { const m = p.mask.data; for (let i = 0; i < m.length; i++) if (m[i] > 127) lab[i] = IDS[p.label]; }
    const tYuzey = performance.now() - t;
    if (IOS) await serbest(segModel, 'seg');   // derinlik modelinden önce belleği boşalt
    // --- derinlik ---
    const depModel = await getDep();
    postMessage({ id, tip: 'asama', asama: 'derinlik' });
    t = performance.now();
    const d = await depModel(img), pd = d.predicted_depth;
    const depth = Float32Array.from(pd.data);
    const tDerin = performance.now() - t;
    if (IOS) await serbest(depModel, 'dep');
    postMessage({ id, tip: 'sonuc', lab, W, H, depth, dW: pd.dims[pd.dims.length - 1], dH: pd.dims[pd.dims.length - 2], ms: { yuzey: Math.round(tYuzey), derinlik: Math.round(tDerin) } },
      [lab.buffer, depth.buffer]);
  } catch (err) {
    postMessage({ id, tip: 'hata', mesaj: String(err?.message || err) });
  }
};
