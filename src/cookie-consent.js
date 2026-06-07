/**
 * Cookie consent helpers — paylaşılan cross-subdomain cookie üzerinden
 * landing (devuapp.com) ve app (app.devuapp.com) tek bir consent kararını
 * kullanır.
 *
 * Cookie format: v=1&t=<unix>&n=1&f=<0|1>&a=<0|1>&m=<0|1>
 *   - n: necessary  (her zaman 1)
 *   - f: functional
 *   - a: analytics  (GA4)
 *   - m: marketing  (Meta Pixel)
 *
 * GA4 / Meta Pixel ID'leri env üzerinden enjekte edilir; ID boşsa yükleyici
 * sessizce hiçbir şey yapmaz.
 */

const COOKIE_NAME = 'devu_cookie_consent';
const COOKIE_VERSION = 1;
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 1 yıl
const COOKIE_DOMAIN = '.devuapp.com';

// Production'da parent-domain'e yaz; localhost'ta hostsuz set
function buildCookieAttributes() {
  const isProdHost = typeof window !== 'undefined'
    && /(^|\.)devuapp\.com$/.test(window.location.hostname);
  const domainPart = isProdHost ? `domain=${COOKIE_DOMAIN}; ` : '';
  const securePart = typeof window !== 'undefined' && window.location.protocol === 'https:'
    ? 'secure; '
    : '';
  return `path=/; ${domainPart}max-age=${COOKIE_MAX_AGE_SECONDS}; ${securePart}samesite=lax`;
}

function readCookie(name) {
  if (typeof document === 'undefined') return null;
  const prefix = `${name}=`;
  const parts = document.cookie.split(';');
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.startsWith(prefix)) {
      return decodeURIComponent(trimmed.substring(prefix.length));
    }
  }
  return null;
}

function writeCookie(name, value) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=${encodeURIComponent(value)}; ${buildCookieAttributes()}`;
}

export function getConsent() {
  const raw = readCookie(COOKIE_NAME);
  if (!raw) return null;
  const params = new URLSearchParams(raw);
  const version = parseInt(params.get('v') || '0', 10);
  if (version !== COOKIE_VERSION) return null;
  return {
    version,
    timestamp: parseInt(params.get('t') || '0', 10),
    necessary: true,
    functional: params.get('f') === '1',
    analytics: params.get('a') === '1',
    marketing: params.get('m') === '1',
  };
}

export function setConsent({ functional, analytics, marketing }) {
  const params = new URLSearchParams();
  params.set('v', String(COOKIE_VERSION));
  params.set('t', String(Math.floor(Date.now() / 1000)));
  params.set('n', '1');
  params.set('f', functional ? '1' : '0');
  params.set('a', analytics ? '1' : '0');
  params.set('m', marketing ? '1' : '0');
  writeCookie(COOKIE_NAME, params.toString());

  // Yeni kararla tracker'ları (yeniden) yüklemeyi tetikle
  applyTrackerConsent({ analytics, marketing });
}

export function acceptAll() {
  setConsent({ functional: true, analytics: true, marketing: true });
}

export function rejectAll() {
  setConsent({ functional: false, analytics: false, marketing: false });
}

// ── Tracker yükleyicileri (ID boşsa no-op) ────────────────────────────────

const GA_MEASUREMENT_ID = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GA_MEASUREMENT_ID) || '';
const META_PIXEL_ID = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_META_PIXEL_ID) || '';

let gaLoaded = false;
let pixelLoaded = false;

function loadGoogleAnalytics() {
  if (gaLoaded || !GA_MEASUREMENT_ID) return;
  gaLoaded = true;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
}

function loadMetaPixel() {
  if (pixelLoaded || !META_PIXEL_ID) return;
  pixelLoaded = true;
  /* eslint-disable */
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
    n.queue = []; t = b.createElement(e); t.async = !0;
    t.src = v; s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  window.fbq('init', META_PIXEL_ID);
  window.fbq('track', 'PageView');
  /* eslint-enable */
}

export function applyTrackerConsent(overrides) {
  const consent = overrides ?? getConsent();
  if (!consent) return;
  if (consent.analytics) loadGoogleAnalytics();
  if (consent.marketing) loadMetaPixel();
  // Not: GA/Pixel scriptleri yüklendikten sonra "unload" etmek mümkün değil;
  // kullanıcı consent'i geri çekerse sayfa yenilenince yeniden yüklenmez.
}
