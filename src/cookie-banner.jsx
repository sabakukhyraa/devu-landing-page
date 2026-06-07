import React, { useState, useEffect, useCallback } from "react";
import { Cookie, X } from "lucide-react";
import {
  getConsent,
  setConsent,
  acceptAll,
  rejectAll,
  applyTrackerConsent,
} from "./cookie-consent.js";

/**
 * Cookie consent banner + preferences modal.
 *
 * Davranış:
 *  - İlk ziyarette altta sticky banner çıkar (3 CTA)
 *  - Reddet kadar Kabul Et de öne çıkar (KVKK m.5/1 + ETK uyumu)
 *  - "Tercihleri Yönet" → modal'da kategori toggle'ları
 *  - Footer'daki "Çerez Tercihleri" linki banner'ı yeniden açar (window event)
 *  - Mount'ta mevcut consent varsa tracker'ları yükler
 */
export default function CookieBanner() {
  const [decision, setDecision] = useState(() => getConsent());
  const [bannerOpen, setBannerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState({ functional: true, analytics: false, marketing: false });

  // Sayfa açılışında: consent varsa tracker'ları başlat
  useEffect(() => {
    if (decision) {
      applyTrackerConsent(decision);
    } else {
      setBannerOpen(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Footer linki banner'ı yeniden açabilsin diye custom event dinleyicisi
  useEffect(() => {
    const handler = () => {
      setDraft({
        functional: decision?.functional ?? true,
        analytics: decision?.analytics ?? false,
        marketing: decision?.marketing ?? false,
      });
      setModalOpen(true);
    };
    window.addEventListener("devu:open-cookie-preferences", handler);
    return () => window.removeEventListener("devu:open-cookie-preferences", handler);
  }, [decision]);

  const handleAcceptAll = useCallback(() => {
    acceptAll();
    setDecision(getConsent());
    setBannerOpen(false);
    setModalOpen(false);
  }, []);

  const handleRejectAll = useCallback(() => {
    rejectAll();
    setDecision(getConsent());
    setBannerOpen(false);
    setModalOpen(false);
  }, []);

  const handleOpenPreferences = useCallback(() => {
    setDraft({
      functional: decision?.functional ?? true,
      analytics: decision?.analytics ?? false,
      marketing: decision?.marketing ?? false,
    });
    setModalOpen(true);
  }, [decision]);

  const handleSavePreferences = useCallback(() => {
    setConsent(draft);
    setDecision(getConsent());
    setBannerOpen(false);
    setModalOpen(false);
  }, [draft]);

  if (!bannerOpen && !modalOpen) return null;

  return (
    <>
      {bannerOpen && (
        <div className="cookie-banner" role="dialog" aria-labelledby="cookie-banner-title">
          <div className="cookie-banner-inner">
            <div className="cookie-banner-icon" aria-hidden="true">
              <Cookie size={22} />
            </div>
            <div className="cookie-banner-text">
              <strong id="cookie-banner-title">Çerez tercihleriniz</strong>
              <p>
                devu; oturum güvenliği için zorunlu çerezleri ve onayınızla web analizi (Google Analytics 4)
                ile reklam ölçümü (Meta Pixel) çerezlerini kullanır. Yurt dışı veri aktarımı söz konusudur.
                Detay için <a href="/cerez-politikasi">Çerez Politikası</a>.
              </p>
            </div>
            <div className="cookie-banner-actions">
              <button type="button" className="cookie-btn cookie-btn-secondary" onClick={handleRejectAll}>
                Reddet
              </button>
              <button type="button" className="cookie-btn cookie-btn-secondary" onClick={handleOpenPreferences}>
                Tercihleri Yönet
              </button>
              <button type="button" className="cookie-btn cookie-btn-primary" onClick={handleAcceptAll}>
                Tümünü Kabul Et
              </button>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <div
          className="cookie-modal-overlay"
          role="dialog"
          aria-labelledby="cookie-modal-title"
          aria-modal="true"
          onClick={(event) => {
            if (event.target === event.currentTarget) setModalOpen(false);
          }}
        >
          <div className="cookie-modal">
            <div className="cookie-modal-head">
              <div>
                <p className="cookie-modal-kicker">Gizlilik kontrolü</p>
                <h2 id="cookie-modal-title">Çerez tercihleri</h2>
              </div>
              <button type="button" className="cookie-modal-close" aria-label="Kapat" onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="cookie-modal-body">
              <p className="cookie-modal-intro">
                Zorunlu çerezler devu'nun güvenli çalışması için her zaman aktiftir. Diğer kategorileri dilediğiniz zaman açıp kapatabilirsiniz.
              </p>
              <CategoryRow
                title="Zorunlu çerezler"
                description="Platform'un çalışması için zorunludur. Oturum güvenliği, kimlik doğrulama, CSRF token. Kapatılamaz."
                checked
                disabled
              />
              <CategoryRow
                title="İşlevsellik çerezleri"
                description="Dil tercihi, son seçilen lokasyon gibi kullanıcı tercihlerini hatırlar."
                checked={draft.functional}
                onChange={(v) => setDraft((d) => ({ ...d, functional: v }))}
              />
              <CategoryRow
                title="Performans / Analiz (Google Analytics 4)"
                description="Anonim/pseudonim cihaz tanımlayıcısı ile web sitesi/uygulama kullanımını ölçer. Veri ABD'ye aktarılır."
                checked={draft.analytics}
                onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
              />
              <CategoryRow
                title="Pazarlama (Meta Pixel)"
                description="Reklam etkinliği ölçümü, dönüşüm takibi ve yeniden hedefleme (retargeting). Veri ABD'ye aktarılır."
                checked={draft.marketing}
                onChange={(v) => setDraft((d) => ({ ...d, marketing: v }))}
              />
              <a className="cookie-policy-link" href="/cerez-politikasi">
                Çerez Politikası'nı incele
              </a>
            </div>
            <div className="cookie-modal-foot">
              <button type="button" className="cookie-btn cookie-btn-secondary" onClick={handleRejectAll}>
                Sadece Zorunlu
              </button>
              <button type="button" className="cookie-btn cookie-btn-primary" onClick={handleSavePreferences}>
                Tercihleri Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function CategoryRow({ title, description, checked, onChange, disabled }) {
  return (
    <div className={`cookie-category${disabled ? " cookie-category-disabled" : ""}`}>
      <div>
        <div className="cookie-category-title">
          <strong>{title}</strong>
          {disabled && <span>Zorunlu</span>}
        </div>
        <p>{description}</p>
      </div>
      <label className="cookie-toggle">
        <input
          type="checkbox"
          checked={!!checked}
          disabled={!!disabled}
          onChange={(e) => onChange && onChange(e.target.checked)}
        />
        <span className="cookie-toggle-track" />
        <span className="cookie-toggle-thumb" />
      </label>
    </div>
  );
}
