/* GMC LED Tavan Stüdyo · "Kendi Odam" köprüsü v2.1.0
 * Erdem Bey'in tasarım aracının koduna DOKUNMAZ. Kendi Odam (ceiling) panelinin mevcut içeriğini
 * (Erdem'in fotoğraf yükleme alanı dahil) gizler, yerine bizim Tavan Stüdyo'yu çerçeve içinde gösterir.
 * Ürün/ray seçimi yalnız Erdem'in panelindedir; çerçeve sadece seçilen tasarımı gerçek fotoğraf + ışıkla gösterir.
 *   panel → çerçeve: gmc:magnet-design-update (+ ilk açılışta [data-configuration-input]) → postMessage 'gmc-tasarim'
 *   çerçeve → panel: ürün rayda sürüklenince 'gmc-konum' → gmc:magnet-fixture-position
 *   çerçeve → köprü: 'gmc-tavan-boyut' → çerçeve yüksekliği içeriğe göre her ekranda ayarlanır (iç kaydırma yok)
 * v2.1.0: tam ekran düğmesi kaldırıldı; yükseklik takibi masaüstünde de aktif; geç gelen panel için MutationObserver.
 */
(function () {
	'use strict';
	if (!window.GMC_TS || !GMC_TS.url) { return; }

	function kur(kok) {
		var panel = kok.querySelector('[data-preview-panel="ceiling"]');
		if (!panel || panel.querySelector('.gmc-ts-cerceve')) { return; }
		Array.prototype.forEach.call(panel.children, function (cocuk) { cocuk.classList.add('gmc-ts-gizli'); });
		var kutu = document.createElement('div');
		kutu.className = 'gmc-ts-cerceve gmc-ts-panelde';
		kutu.style.setProperty('--gmc-ts-h', (GMC_TS.yukseklik || 780) + 'px');
		var cerceve = document.createElement('iframe');
		cerceve.title = GMC_TS.baslik || 'GMC LED Tavan Stüdyo';
		cerceve.setAttribute('allow', 'fullscreen; clipboard-write; camera');
		cerceve.setAttribute('allowfullscreen', '');
		cerceve.loading = 'lazy';
		kutu.appendChild(cerceve);
		panel.appendChild(kutu);

		var girdi = kok.querySelector('[data-configuration-input]');
		var yuklendi = false, sonTasarim = null, sonJson = '';
		function mevcutTasarimiOku() {
			if (!girdi || !girdi.value) { return sonTasarim; }
			try { if (girdi.value !== sonJson) { sonTasarim = JSON.parse(girdi.value); sonJson = girdi.value; } } catch (e) { /* yarım ara durum: son sağlam tasarımı koru */ }
			return sonTasarim;
		}
		function yukle() { if (!yuklendi) { cerceve.src = GMC_TS.url + (GMC_TS.url.indexOf('?') === -1 ? '?' : '&') + 'entegre=1'; yuklendi = true; } }
		function ilet() {
			var tasarim = sonTasarim || mevcutTasarimiOku();
			if (yuklendi && tasarim && cerceve.contentWindow) { cerceve.contentWindow.postMessage({ tip: 'gmc-tasarim', tasarim: tasarim }, window.location.origin); }
		}
		cerceve.addEventListener('load', function () { mevcutTasarimiOku(); ilet(); });
		kok.addEventListener('gmc:magnet-design-update', function (olay) { sonTasarim = olay.detail || sonTasarim; ilet(); });
		/* Panel [data-configuration-input] değeri değişince de yakala (olay gönderilmeyen durumlar için) */
		var bekleyen = null;
		function guncelle() { window.clearTimeout(bekleyen); bekleyen = window.setTimeout(function () { mevcutTasarimiOku(); ilet(); }, 120); }
		kok.addEventListener('input', guncelle, true);
		kok.addEventListener('change', guncelle, true);
		if (typeof MutationObserver !== 'undefined') { new MutationObserver(guncelle).observe(kok, { childList: true, subtree: true, attributes: true, attributeFilter: ['value'] }); }
		/* iOS Safari: panel .value'yu property olarak yazar (attribute değişmez) ve CustomEvent her zaman yakalanmayabilir;
		   değeri sürekli yoklayıp değişince ilet → ürün ne zaman seçilirse seçilsin tasarım çerçeveye ulaşır. */
		window.setInterval(function () {
			if (!girdi || !yuklendi) { return; }
			var v = girdi.value;
			if (v && v !== sonJson) { mevcutTasarimiOku(); ilet(); }
		}, 700);

		window.addEventListener('message', function (olay) {
			if (olay.origin !== window.location.origin || olay.source !== cerceve.contentWindow || !olay.data) { return; }
			if (olay.data.tip === 'gmc-hazir' || olay.data.tip === 'gmc-tavan-hazir') { mevcutTasarimiOku(); ilet(); }
			if (olay.data.tip === 'gmc-tavan-boyut' && isFinite(Number(olay.data.yukseklik))) {
				var h = Math.max(380, Math.min(20000, Math.ceil(Number(olay.data.yukseklik))));
				kutu.style.height = h + 'px';                     // her ekranda içeriğe göre; iç kaydırma olmaz
			}
			if (olay.data.tip === 'gmc-konum' && olay.data.key && isFinite(olay.data.ratio)) {
				kok.dispatchEvent(new CustomEvent('gmc:magnet-fixture-position', { detail: { key: String(olay.data.key), ratio: Number(olay.data.ratio) } }));
			}
		});

		/* Sekme açıldığında yükle (sayfa ilk açılışta ağırlaşmasın) */
		kok.querySelectorAll('[data-preview-mode]').forEach(function (dugme) {
			dugme.addEventListener('click', function () { if (dugme.dataset.previewMode === 'ceiling') { yukle(); } });
		});
		if (!panel.hidden) { yukle(); }
	}

	function basla() { document.querySelectorAll('[data-gmc-magnet-designer]').forEach(kur); }
	if (typeof MutationObserver !== 'undefined') { new MutationObserver(basla).observe(document.documentElement, { childList: true, subtree: true }); }
	if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', basla); } else { basla(); }
}());
