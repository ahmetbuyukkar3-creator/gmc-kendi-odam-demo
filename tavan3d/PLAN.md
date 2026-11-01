# GMC Tavan Stüdyo · 3D ışık planı

Amaç: Müşteri salonunun fotoğrafını yükler, uygulama odayı 3D'ye çevirir, GMC ürünleri tavana eklenir/çıkarılır ve ışık anında görünür. Sonunda ışıklı görsel + malzeme listesi alınır.

## Yöntem (onaylandı 2026-10-10)
- **Oda kutusu:** Kullanıcı arka duvarın 4 köşesini ve 2 yan tavan çizgisini işaretler. Lens, kamera yönü ve yüksekliği tüm çizgilere birlikte uydurularak hesaplanır. Tavan yüksekliği (varsayılan 2,70 m) ölçeği verir.
- **Fotoğraf kutuya yansıtılır.** Fotoğraf açısından bakınca birebir aynı görünür.
- **Işık fotoğrafın üstüne eklenir:** Her ürün kendi ışık şekliyle hesaplanır (spot koni, mercek dar noktalar, lineer geniş). Gündüz↔akşam sürgüsü var.
- **Sonra:** Derinlik modeli (Depth Anything) eklenip mobilyalar ayrı yüzey olacak.
- Tamamen tarayıcıda çalışır, fotoğraf sunucuya gitmez, ücretli servis yok.

## Aşamalar
| # | İş | Durum |
|---|---|---|
| 0 | Deneme: kutu yöntemi + spot/mercek/lineer ışık + ekle/sil/sürükle | ✅ 2026-10-10 |
| 1 | Fotoğraf çekim rehberi, işaretlemede büyüteç, geri al | ✅ 2026-10-10 |
| 2 | Ray çizme (düz/L/U/kare), ürünler raya oturur, plan (üstten) görünümü | ✅ 2026-10-10 |
| 3 | Tüm katalog + gerçek lümen/açı verisi + önce–sonra kaydırıcı + kuyumcu vitrini (ETNA) | ✅ 2026-10-10 |
| 3b | Kuyumcu vitrini modu: sitedeki kuyumcu aracıyla birleşim (ölçü + yerleşim önerisi + ölçüyle kalibrasyon) | ✅ 2026-10-11 |
| 3c | Ölçülü model (sitedeki görünüm) + fotoğrafta ölçü çizgileri + lüks hesabı | ✅ 2026-10-11 |
| 3d | Banko üzeri modu + Blender test sahnesi (ölçüsü kesin) + derinlik güvenilirliği | ✅ 2026-10-11 |
| 4 | Çıktı (görsel + malzeme listesi + WhatsApp) + Codex tasarımıyla birleştirme | |
| 5 | Derinlik modeli, L oda, asma tavan, gmcled.com'a yerleştirme | |

## Faz 0 sonucu
- Salon örneğinde lens 16,5 mm ve kamera yüksekliği 1,32 m çıktı. Blender kaydında aynı fotoğraf için 15,6 mm ve 1,18 m var; fark yaklaşık %10. Kalan fark, koltuk arkasında kalan zemin köşesinin tahmininden geliyor.
- Tarayıcı içi test 12/12 geçti: ekle, konum, sürükle, döndür, sil, 3000/4000K, aç/kapa, mobilde taşma.

## Aşama 1 sonucu
- Çekim rehberi; fotoğraf kontrolü (karanlık, dikey, düşük çözünürlük uyarısı); EXIF'ten lens okuma (gerçek kamera fotoğrafında 20 mm doğru okundu).
- Sırayla işaretleme (1/6 … 6/6), basılı tutup kaydırma, büyüteç; yan çizgi görünmüyorsa "atla".
- Geri al / ileri al (Ctrl+Z / Ctrl+Y): işaretleme ve ürün işlemleri.
- Test: işaretleme 9/9, düzenleme 16/16; ikisi de 375 px telefon genişliğinde de geçti.

## Aşama 2 sonucu
- 4 ray sistemi (sıva üstü, slim, sıva altı yaylı, trimless). Slim raya sadece slim ürünler; diğer üçüne standart ürünler. Sistem değişince uymayan ürünler kaldırılır, geri alınabilir.
- Ray şekilleri: düz, L, U, kare, dikdörtgen; ölçü, taşıma, 90° döndürme, silme.
- Ürünler raya oturur. Ray boyunca kayar, köşeye ve birbirinin üstüne binmez. Ray taşınınca ya da döndürülünce birlikte gider. Başka raya ancak 30 cm yaklaştırılınca geçer.
- Görünüm: sıva üstünde siyah profil; trimless'ta sadece yarık; yaylıda ince kulak.
- Plan görünümü: ölçülü, ray parça boyları, seçili rayın duvarlara mesafesi, ışık alanları, fotoğrafın çekildiği yer.
- Tüm katalog (18 ürün) ve tür filtreleri. Oda derinliği elle girilebilir.
- Malzeme listesi (Codex hesabıyla aynı): 3/2/1 m parçalar, köşe, düz bağlantı, besleme, uç kapak, toplam W, trafo.
- Test: düzenleme 21/21, işaretleme 9/9; ikisi de 375 px telefon genişliğinde de geçti.

## Aşama 3 sonucu
- ETNA 6/12/26 (kuyumcu vitrin serisi, gömme, raysız) eklendi. [Kesin] Değerler `Downloads/GMCLED_KATALOG.pdf` s.50-51'den: 10/21/44 W, 1770/3717/7788 lm, 340×65/117/180 mm, açı 24/34/48°, eğim 25/38°, 3000/4000/6500K. ETNA 26 = 50 W (GMC teyidi 29 Eki 2026; katalogdaki 44 W eski seri). ETNA 6/12 değerleri (10/21 W) HENÜZ teyit edilmedi.
- ETNA'nın görünüşü gerçek ürün fotoğrafından: doku olarak kaplandı; mercek merkezleri fotoğraftan otomatik bulundu (6/6, 12/12, 26/26). Işık açıkken mercekler kendi yerlerinde parlıyor.
- Kuyumcu örneği: GMC'nin ETNA 26 tanıtım görselinin vitrin kısmı. ETNA'lar mağaza tavanında, vitrinin önünde, 25° eğimle vitrine dönük (Ahmet'in seçimi). İlk denenen mağaza fotoğrafı (Wikimedia) ölçek yanlış olduğu için çıkarıldı.
- Yönlendirme: ray spotu ve hareketli ürünlerde eğim 0-60° + yön; ETNA'da açı ve eğim seçimi.
- Önce–sonra kaydırıcısı (fotoğraf ve serbest 3D görünümde).
- 6500K seçeneği. Otomatik pozlama: küçük ve çok ışıklı alanlarda (vitrin) görüntü yanmıyor; salonda değişiklik yok.
- Işık verisi ekran kartı dokusuna taşındı: 256 kaynak; Adreno gibi telefon ekran kartlarındaki uniform sınırına takılmaz.
- Malzeme listesi: ETNA kendi 220V sürücüsüyle gelir, 48V magnet trafo hesabına girmez.
- Vitrin fotoğrafındaki tavan armatürleri silindi (OpenCV: mercek noktaları + cam yansımaları; tavan düz yüzey). Örnek boş açılır, ürün listesi ETNA'da başlar.
- İnce döndürme: seçili ürün/ray için ±1°, ±5°, açı sürgüsü; klavye Q/E (Shift ile 5°). Ray dönünce ürünler rayda kalır.
- Kılavuz çizgi aracı (✏): tavanda köşelere sırayla tıkla, ilk noktaya tıklayınca kapanır. Köşeye yapışma (4 cm) ve 90° düzeltme (±5°). Fotoğraf, serbest 3D ve planda görünür; planda kenar ölçüleri yazar. Köşeler sürüklenip düzeltilebilir, seçilip silinebilir. ETNA için "Çizgiye hizala".
- Test: düzenleme 44/44, işaretleme 9/9.

## Aşama 3b sonucu (2026-10-11): kuyumcu aracıyla birleşim
- Adım 1'de mod seçimi: **Oda / salon** ya da **Kuyumcu vitrini**. Vitrin modunda gmcled.com'daki kuyumcu aracının alanları var: bölge kartları (Dış vitrin aktif; banko, niş ve genel alan sonraki aşama), genişlik, derinlik, vitrin tavanı ve tabla (cm), ETNA 6/12/26, yön, montaj (vitrin tavanı ya da mağaza tavanı, cam önü).
- **Yerleşim önerisi sitedekiyle birebir aynı.** Ferah / Önerilen / Yoğun, yaklaşık 8 ve 4 cm boşluk; kod `vitrin.js` içinde. Node testinde 7176 ölçü kombinasyonunun hepsinde sitedeki kodla aynı sonuç çıktı. Uyarı mesajları da sitedekiyle aynı.
- **Ölçüyle kesin kalibrasyon (tavandan, 11 Eki Ahmet'in isteği):** Kullanıcı ışıkların takılacağı tavanın 4 köşesini işaretler: sol arka, sağ arka, sağ ön, sol ön. Arka, vitrin tarafı demek.
  - **Vitrin tavanında:** Genişlik ve derinlik ölçü olarak kesin kabul edilir. Fotoğraf derinliği ayrıca kontrol eder; farklıysa "Fotoğraftakini kullan" önerisi çıkar.
  - **Cam önünde (mağaza tavanı):** Genişlik ölçüden, derinlik fotoğraftan, yükseklik yerden girilen değerden gelir.
  - Tavan alttan eğik görüldüğü için lens de fotoğraftan hesaplanır. Sentetik testte kamera <1 cm hassasiyetle bulundu, yanlış girilen derinlik (80 cm, gerçek 70) fotoğraftan 70 olarak yakalandı.
  - Kadraj dışında kalan köşe, kadrajın dışına dokunularak verilir. Örnek fotoğrafta sol ön köşe dışarıda; perspektiften bulundu, uyum ±0,1 px.
- 3. adıma geçince seçilen yerleşim fotoğraftaki vitrine **otomatik dizilir**. Kartlar 3. adımda da var, seçince yeniden dizer. Cam önü montajda tek sıra kullanılır: mağaza tavanında, camdan girilen uzaklıkta, 25° eğimle vitrine dönük.
- Vitrinin çevresi (çerçeve, mağaza tavanı, alt dolap) cam düzleminde ayrı bir yüzey. Fotoğraf aynen üstüne düşer; cam önündeki ETNA'nın ışığı da bu yüzeye vurur.
- **Fotoğrafsız:** "ölçüden çiz" girilen ölçülerden sade bir vitrin görüntüsü çizer, kalibrasyon kendi kamerasını <1 cm hassasiyetle bulur.
- **Proje dosyası:** Sitedeki aracın `GMC-LED-Vitrin-Projesi.json` dosyası açılır, aynı biçimde kaydedilir (ek `studio` alanında ürün konumları var).
- **Siteden bağlantı:** `tavan3d/?mod=vitrin&g=200&d=80&y=180&t=45&yon=0&urun=26&adet=4x2&montaj=ic`. Sitedeki araca sadece bu linkli bir buton eklemek yeterli.
- Test: `?vitrintest=1` 34/34 (masaüstü ve 375 px telefon). Eski testler bozulmadı: selftest 44/44, placetest 9/9.
- ~~ETNA 26 gücü~~ KAPANDI: 50 W (GMC, 29 Eki 2026); araç güncellendi. **Açık:** ETNA 6/12 güçleri teyit edilmedi. Gerçek, ışıksız bir vitrin fotoğrafıyla henüz denenmedi. Örnek vitrinin ölçüleri [Tahmin].
- **Sonraki olası adımlar:** Köşeleri otomatik bulma (kenar tespiti; köşe kenara mıknatısla yapışır). Telefonda çalışan derinlik modeli (Depth Anything V2 Small, bedava) ile raf ve büst gibi nesnelerin ayrı yüzey olması. Banko, niş ve genel alan bölgeleri.

## Aşama 3c sonucu (2026-10-11): ölçülü model + gerçek ölçüler + lüks
- **📦 Ölçülü model** (vitrin modu): sitedeki kuyumcu aracı gibi çizilmiş vitrin (alt dolap, tabla, altın dikmeler, cam, vitrin tavanı; cam önünde mağaza tavanı ve saçak). Perspektif (döndürülebilir) + ölçekli Ön / Sağ / Sol / Üst. Aynı proje: modelde sürüklenen ETNA fotoğrafta da aynı cm'ye gider (model ↔ fotoğraf dünyası sadece öteleme). Işık konileri tablaya kadar çizilir.
- **📏 Ölçüler**: fotoğrafın perspektifinde ve modelde aynı ölçü çizgileri (cm): genişlik, derinlik, tabla → tavan, ETNA–duvar ve ETNA–ETNA boşlukları (sıra sıra), cam önünde camdan uzaklık. Zemin gibi fotoğrafta görünmeyenler sadece modelde. PNG çıktısına da girer.
- **🌡 Lüks**: tablaya (odada zemine) düşen doğrudan ışık; ortalama, en düşük, en yüksek, düzgünlük + ısı haritası (fotoğrafta, modelde, planda). Hesap `isik.js` (node testi `node isik.test.mjs` 11/11: akı = katalog lümeni, ters kare, ışın açısı kenarında %50). Cam önünde ışık camdan vitrin açıklığından geçmek zorunda (çerçeveye çarpan sayılmaz), cam geçirgenliği %92 [Tahmin].
- Işık modeli düzeltildi: katalogdaki ışın açısı artık yarı şiddet açısı (önceden koni kenarında %66 idi); şiddet, akı tam katalog lümeni olacak şekilde.
- Serbest 3D: tekerlek kamerayı yürütmüyor, objektif gibi büyütüyor (yakınlaşınca eşyaların erimesi bitti). Modelde kamera vitrinin içine giremez.
- **◎ Işık izi**: her ürünün ışın açısı kenarının (şiddet %50) ilk çarptığı yüzey (vitrinde tabla, arka pano, yanlar; odada zemin), koyu kenarlı kesik çizgi + merkez noktası; her fotoğrafta okunur. Cam önünde çerçeveye çarpan kısım çizilmez.
- **Toplu seçim**: Shift / Ctrl + tıkla (ekle / çıkar), ☑ Tümünü seç (Ctrl+A). Seçilenler birlikte sürüklenir (grup tavandan taşmaz, aralıklar korunur), birlikte döner, ışık açısı / eğim / yön hepsine uygulanır, birlikte silinir.
- **Montaj değişince** (vitrin tavanı ↔ cam önü) fotoğrafta yeniden 4 köşe işaretlenir: işaretlenen tavan başka bir yüzey. (Önceden eski noktalar yanlış tavana uygulanıyordu; vitrin tavanında ışığın görünmemesinin sebebi buydu.)
- Test: vitrintest 66/66, selftest 44/44, placetest 9/9 (masaüstü ve 375 px), ışık 11/11.
- **Açık:** Katalog lümeni ürün mü LED çipi mi bilinmiyor; çipse gerçek lüks %10-20 düşük olur [Tahmin]. Yansıyan ışık hesaba girmiyor (açık renk vitrinde gerçek değer biraz daha yüksek).

## Aşama 3d sonucu (2026-10-11): banko üzeri + gerçek değerle doğrulama
- **Banko üzeri** (sitedeki 2. bölge): uzunluk, derinlik, banko üstü yüksekliği, mağaza tavanı, ETNA'ların tavanda bankonun ortasından kaydırması (cm). Fotoğrafta banko üstünün 4 köşesi işaretlenir; ölçüler bilindiği için tam karşıdan çekimde de kalibrasyon kurulur. ETNA'lar mağaza tavanına tek sıra dizilir; kaydırma 10 cm'den fazlaysa 25° eğimle bankoya döner. Lüks, ışık izi ve ölçüler banko üstünde; ölçülü modelde banko + tavan. Dış vitrin ↔ banko geçişinde iki ölçü takımı ayrı saklanır. Fotoğrafsız "ölçüden çiz" bankoda da var.
- **Blender test sahnesi** `test_sahne/kuyumcu_sahne.py` (Eevee, dizüstünde ~8 dk tam kalite): mağaza 5,2 × 7,6 m, tavan 3 m; banko 240 × 60, üstü 95 cm; dış vitrin 200 × 80, tabla 45, iç tavan 180. Çıktı `test_sahne/cikti/` (banko.jpg, vitrin.jpg, gercek.json: ölçüler, kamera, köşelerin gerçek pikselleri). Uygulamada "Blender test bankosu / vitrini" örnekleri: ölçüler dolu gelir, köşeleri kullanıcı işaretler; gerçek kamera değeri alt köşede yazar.
- **Doğruluk** `node test_sahne/dogruluk.test.mjs` 4/4: gerçek köşelerle kamera yüksekliği 0,0 cm, lens 26,0 mm (ön bilgi bilerek 30 mm verildi). Köşeler ±3 px kayınca banko 3,8 cm, vitrin 0,3 cm fark.
- **Derinlik güvenilirliği:** fotoğraftan derinlik tahmini artık hata payıyla (köşe başına 1 px türev → 2 px işaretleme hatası). Önden çekilmiş vitrinde ±22 cm (güvenilmez → girilen ölçü kullanılır, boş uyarı yok), bankoda ±1,3 cm. Hata payı nokta bırakılınca hesaplanır (~1 sn), sürüklerken değil.
- Test: vitrintest 80/80, selftest 44/44, placetest 9/9 (masaüstü ve 375 px), ışık 11/11.
- **Açık:** Tarayıcıdaki `?sahnetest=1` Chrome'un sanal saatiyle sonuç döndürmüyor (büyük fotoğraf çözülmeden döküm alınıyor); doğruluk Node testiyle ölçülüyor, tarayıcıda gerçek pencerede açılınca çalışır.

## Bilinen sınırlar
- Mobilya, duvar ya da zemin yüzeyi sayılıyor. Duvar–zemin sınırına denk gelen mobilyada düz bir ışık çizgisi oluşuyor. Aşama 5'teki derinlik modeli bunu çözer.
- Fotoğrafta zaten yanan lambalar akşam modunda da yanık görünür.
- [Tahmin] Magnet ürünlerin lümeni katalogda yok; 90 lm/W kullanıldı. GMC'nin diğer ürünleri katalogda 160-177 lm/W, yani magnetler düşük gösteriliyor olabilir.
- Vitrin örneğinin 'önce' hali zaten ışıklı (tanıtım görseli). Gerçek, ışıksız bir vitrin fotoğrafıyla test edilmeli.

## Çalıştırma
`gmc-led-tavan-studio` klasöründe `python -m http.server 5199` → http://127.0.0.1:5199/tavan3d/
Test: `?demo=salon&fx=1&selftest=1` ve `?placetest=1` (sekme başlığında sonuç yazar). Telefon genişliği: `test-mobil.html?<aynı sorgu>`

## Otomatik tarama · Aşama 1 sonucu (2026-10-12): deneme, arayüz değişmedi
- Hedef: fotoğraf yüklenince tavan ve köşeler kendiliğinden bulunsun, kullanıcı sadece düzeltsin (önce sadece oda modu).
- Modeller (tarayıcıda Transformers.js ile çalışacak, bedava): yüzey tanıma SegFormer-b2 ADE20K (28 MB; b0 beyaz duvar–tavanı karıştırdı, b4 daha iyi değil) + Depth Anything V2 Small (27 MB). Toplam ~55 MB, ilk açılışta iner.
- Yöntem (`tavan3d/tarama.js`, saf hesap): tavanın alt sınırı en fazla 5 parçaya bölünüp aynı eğimdekiler aynı duvar sayılır → TL, TR, SL, SR. Dikey çizgiler + tavan çizgileri → kamera yönü ve lens. Zemin yüksekliği: zemin–duvar sınırı; tutarsızsa derinlik haritası (tavanla ölçeklenir); zemin az görünüyorsa kamera 1,45 m sayılır + uyarı.
- Ölçüsü bilinen 5 Blender odası (`test_sahne/oda_sahne.py`, `tarama_deneme/degerlendir.mjs`): genişlik −3…+4 %, kamera yüksekliği ≤5 cm, duvara uzaklık −6…+4 %, lens ≤1 mm. Köşe farkı fotoğraf genişliğinin %0,1–1,9'u.
- Gerçek salon: elle işaretlemeye 15–69 px (2400 px'te). Gerçek mutfak (açık plan, asma tavan): kutu modeline uymuyor → uyarı verir, kullanıcı düzeltmeli.
- Süre (bu laptop, Node/CPU): yüzey ~11 sn, derinlik ~3,5 sn, hesap ~1–2 sn. Tarayıcıda farklı olabilir [Tahmin].
- Deneme dosyaları: `tarama_deneme/` (node_modules ve model_cache git dışı), özet görsel `tarama_deneme/cikti/ASAMA1_OZET.jpg`.

## Otomatik tarama · Aşama 2 (2026-10-12): uygulamaya bağlandı
- Fotoğraf yüklenince (ya da elle işaretlenmemiş örnekte, ya da 🔍 Otomatik tara düğmesiyle) tarama arka planda çalışır (`tarayici.js` Web Worker, Transformers.js 3.8.1 jsDelivr'dan, modeller Hugging Face'ten; fotoğraf cihazdan çıkmaz).
- Bitince: tavan sarı boyalı, 6 nokta yerinde, kullanıcı sürükleyip düzeltir. Yan çizgilerden biri yoksa ikisi bırakılır, lens taramadan. Uyarılar tarama kutusunda. "Baştan işaretle" elle akışa döner.
- Süre (bu laptop, Chrome, tek iş parçacıklı WASM): ilk sefer model indirme dahil ~70 sn, sonra ~24 sn. Hızlandırma (WebGPU / çok iş parçacığı) sonra.
- Testler: oda 51/51, vitrin 80/80. Yedek: _yedek/*_tarama_oncesi_2026-10-12.*
