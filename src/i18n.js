import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import tr from "./locales/tr.json";
import en from "./locales/en.json";

// Self-contained: locale files live inside landing-new (no shared/ dependency),
// so this app can be lifted into its own repo untouched. Keys are FLAT and
// dot-separated ("landing.hero.title"), so keySeparator/nsSeparator must be
// disabled or i18next would traverse the dots as nesting and never find them.
const SUPPORTED = ["tr", "en"];
const pick = (l) => (SUPPORTED.includes(l) ? l : null);

const urlLang = pick(new URLSearchParams(window.location.search).get("lng"));
const savedLang = pick(localStorage.getItem("devu_language"));
const browserLang = navigator.language?.startsWith("tr") ? "tr" : "en";

i18n.use(initReactI18next).init({
  resources: {
    tr: { translation: tr },
    en: { translation: en },
  },
  lng: urlLang || savedLang || browserLang || "tr",
  fallbackLng: "tr",
  keySeparator: false,
  nsSeparator: false,
  returnObjects: true,
  interpolation: { escapeValue: false },
});

// Keep <html lang="..."> in sync so Turkish uppercase rules don't apply to English.
function syncDocumentLang(lng) {
  if (typeof document !== "undefined" && lng) {
    document.documentElement.lang = lng;
  }
}
syncDocumentLang(i18n.language);
i18n.on("languageChanged", (lng) => {
  syncDocumentLang(lng);
  try {
    localStorage.setItem("devu_language", lng);
  } catch {
    // ignore storage errors (private mode etc.)
  }
});

export default i18n;
