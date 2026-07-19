import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, Check, ChevronDown } from "lucide-react";

// Pricing / FAQ / Final CTA / Footer — all display copy comes from
// shared/locales (landing.*). Prices and link targets stay in code.
const SIGNUP_URL = "https://app.devuapp.com/#/register";
const LOGIN_URL = "https://app.devuapp.com/#/login";
const formatPrice = (value) => `₺${new Intl.NumberFormat("tr-TR").format(value)}`;

const planMeta = [
  { monthlyPrice: 449, featured: false },
  { monthlyPrice: 1799, featured: true }
];

function LegalNotes() {
  const { t } = useTranslation();
  const notes = t("landing.legalNotes.items");
  const list = Array.isArray(notes) ? notes : [];
  return (
    <section className="legal-notes" aria-label="WhatsApp pricing notes">
      <div className="legal-notes-inner">
        <ol>
          {list.map((text, index) => (
            <li id={`footnote-${index + 1}`} key={index} value={index + 1}>
              {text}
            </li>
          ))}
          <li id={`footnote-${list.length + 1}`} value={list.length + 1}>
            {t("landing.legalNotes.rateLabel")}{" "}
            <a href="https://developers.facebook.com/docs/whatsapp/pricing" target="_blank" rel="noopener noreferrer">
              developers.facebook.com/docs/whatsapp/pricing
            </a>
          </li>
        </ol>
      </div>
    </section>
  );
}

export function Pricing() {
  const { t } = useTranslation();
  const [billing, setBilling] = useState("monthly");
  const [yearlyPulse, setYearlyPulse] = useState(0);
  const yearly = billing === "yearly";
  const planText = t("landing.pricing.plans");

  function selectBilling(next) {
    setBilling(next);
    if (next === "yearly") setYearlyPulse((c) => c + 1);
  }

  return (
    <section className="section pricing-section" id="pricing">
      <div className="section-heading narrow">
        <p className="eyebrow">{t("landing.pricing.eyebrow")}</p>
        <h2>{t("landing.pricing.title")}</h2>
        <p>{t("landing.pricing.subtitle")}</p>
      </div>
      <div className="pricing-controls">
        <div className="billing-toggle" aria-label={t("landing.pricing.monthly")}>
          <button className={!yearly ? "active" : ""} type="button" onClick={() => selectBilling("monthly")}>
            {t("landing.pricing.monthly")}
          </button>
          <button className={yearly ? "active" : ""} type="button" onClick={() => selectBilling("yearly")}>
            <span>{t("landing.pricing.yearly")}</span>
            <em
              className={`yearly-chip ${yearly ? "active" : ""}`}
              key={yearly ? `yearly-${yearlyPulse}` : "monthly-chip"}
            >
              {t("landing.pricing.yearlyChip")}
            </em>
          </button>
        </div>
      </div>
      <div className="pricing-grid">
        {planMeta.map((plan, i) => {
          const txt = (Array.isArray(planText) && planText[i]) || {};
          const items = Array.isArray(txt.items) ? txt.items : [];
          const price = yearly ? formatPrice(plan.monthlyPrice * 10) : formatPrice(plan.monthlyPrice);
          return (
            <article className={`pricing-card ${plan.featured ? "featured" : ""}`} key={i}>
              <div className="plan-top">
                <span className={`plan-badge ${plan.featured ? "" : "plan-badge-placeholder"}`}>
                  {plan.featured ? t("landing.pricing.badgeFeatured") : t("landing.pricing.badgeDefault")}
                </span>
                <h3>{txt.name}</h3>
                <p>{txt.description}</p>
              </div>
              <div className="price">
                <strong>{price}</strong>
                <span>{yearly ? t("landing.pricing.perYear") : t("landing.pricing.perMonth")}</span>
              </div>
              {yearly && (
                <p className="annual-equivalent">
                  {formatPrice(Math.round((plan.monthlyPrice * 10) / 12))} {t("landing.pricing.perMonth")}
                </p>
              )}
              <a href={SIGNUP_URL}>{t("landing.pricing.cta")}</a>
              <ul>
                {items.map((item) => (
                  <li key={item}>
                    <Check size={18} />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      <div className="pricing-trust">
        <div className="pricing-trust-pay">
          <span>{t("landing.pricing.trustPay")}</span>
          <img src="/payment/iyzico-ile-ode-colored.svg" alt="iyzico" width="120" height="auto" />
        </div>
        <div className="pricing-trust-cards" aria-label="Visa, Mastercard, Maestro, American Express, Troy">
          <img
            src="/payment/iyzico-logo-band-colored.svg"
            alt="Visa, Mastercard, Maestro, American Express, Troy"
            height="22"
          />
        </div>
        <p>{t("landing.pricing.trustNote")}</p>
      </div>
    </section>
  );
}

export function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);
  const items = t("landing.faq.items");
  const list = Array.isArray(items) ? items : [];

  return (
    <section className="section faq-section" id="faq">
      <div className="section-heading narrow">
        <p className="eyebrow">{t("landing.faq.eyebrow")}</p>
        <h2>{t("landing.faq.title")}</h2>
      </div>
      <div className="faq-list">
        {list.map((faq, index) => {
          const open = openIndex === index;
          return (
            <article className={open ? "open" : ""} key={index}>
              <button type="button" onClick={() => setOpenIndex(open ? -1 : index)} aria-expanded={open}>
                <span>{faq.question}</span>
                <ChevronDown size={18} />
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function FinalCTA() {
  const { t } = useTranslation();
  return (
    <section className="final-cta">
      <div>
        <p className="eyebrow">{t("landing.finalCta.eyebrow")}</p>
        <h2>{t("landing.finalCta.title")}</h2>
        <p>{t("landing.finalCta.body")}</p>
      </div>
      <a className="primary-cta final-cta-button" href={SIGNUP_URL}>
        {t("landing.finalCta.cta")}
        <ArrowRight size={18} />
      </a>
    </section>
  );
}

export function SiteFooter({ showLegalNotes = false }) {
  const { t, i18n } = useTranslation();
  const nextLng = i18n.language === "tr" ? "en" : "tr";
  return (
    <footer className="site-footer">
      {showLegalNotes && <LegalNotes />}
      <div className="footer-main">
        <div className="footer-brand">
          <img src="/devu-logo.png" alt="devu" />
          <p>{t("landing.footer.tagline")}</p>
        </div>
        <div className="footer-column">
          <h3>{t("landing.footer.colProduct")}</h3>
          <a href="/#features">{t("landing.footer.linkFeatures")}</a>
          <a href={LOGIN_URL}>{t("landing.footer.linkLogin")}</a>
          <a href={SIGNUP_URL}>{t("landing.footer.linkStart")}</a>
        </div>
        <div className="footer-column">
          <h3>{t("landing.footer.colResources")}</h3>
          <a href="/whatsapp-setup">{t("landing.footer.linkGuide")}</a>
        </div>
        <div className="footer-column">
          <h3>{t("landing.footer.colLegal")}</h3>
          <a href="/terms">{t("landing.footer.linkTerms")}</a>
          <a href="/privacy">{t("landing.footer.linkPrivacy")}</a>
          <a href="/kvkk">{t("landing.footer.linkKvkk")}</a>
          <a href="/cerez-politikasi">{t("landing.footer.linkCookie")}</a>
          <button
            type="button"
            className="footer-link-btn"
            onClick={() => window.dispatchEvent(new Event("devu:open-cookie-preferences"))}
          >
            {t("landing.footer.cookiePrefs")}
          </button>
          <a href="/mesafeli-satis-sozlesmesi">{t("landing.footer.linkDistanceSales")}</a>
          <a href="/on-bilgilendirme-formu">{t("landing.footer.linkPreInfo")}</a>
          <a href="/iade-politikasi">{t("landing.footer.linkRefund")}</a>
        </div>
      </div>
      <div className="footer-payment">
        <span className="footer-payment-label">{t("landing.footer.paymentLabel")}</span>
        <img
          src="/payment/iyzico-logo-band-white.svg"
          alt="iyzico — Visa, Mastercard, Maestro, American Express, Troy"
          className="footer-payment-band"
        />
      </div>
      <div className="footer-bottom">
        <span>{t("landing.footer.copyright")}</span>
        <button type="button" onClick={() => i18n.changeLanguage(nextLng)}>
          {nextLng.toUpperCase()}
        </button>
      </div>
    </footer>
  );
}
