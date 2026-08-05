import React, { useEffect } from "react";
import { ArrowUpRight, MessageCircle, ShieldCheck } from "lucide-react";

const COPY = {
  tr: {
    eyebrow: "Devu üzerinden güvenli yönlendirme",
    title: "İşletmeyle WhatsApp'ta iletişime geçin",
    body: "Aşağıdaki düğme sizi işletmenin müşteri iletişim numarasıyla yeni bir WhatsApp sohbetine götürür.",
    action: "WhatsApp'ta açın",
    privacy: "Bu sohbet işletmeyle sizin aranızdadır. Devu konuşmanın içeriğini görmez veya saklamaz.",
    invalidTitle: "İletişim bağlantısı geçersiz",
    invalidBody: "Bu bağlantı eksik veya hatalı görünüyor. Lütfen size gönderilen bildirimdeki Bize Yaz düğmesini yeniden kullanın.",
    home: "Devu ana sayfasına dönün",
  },
  en: {
    eyebrow: "Secure handoff by Devu",
    title: "Message the business on WhatsApp",
    body: "The button below opens a new WhatsApp chat with the business's customer contact number.",
    action: "Open WhatsApp",
    privacy: "This conversation is between you and the business. Devu does not view or store its contents.",
    invalidTitle: "Invalid contact link",
    invalidBody: "This link appears to be incomplete or invalid. Please use the Message us button in your notification again.",
    home: "Return to Devu",
  },
};

export default function WhatsAppContactPage({ language = "tr", phoneDigits = "" }) {
  const locale = language === "en" ? "en" : "tr";
  const copy = COPY[locale];
  const normalizedPhone = String(phoneDigits).replace(/\D/g, "");
  const isValid = /^\d{8,15}$/.test(normalizedPhone);

  useEffect(() => {
    document.body.classList.add("whatsapp-contact-route");
    document.title = isValid ? `${copy.action} | Devu` : `${copy.invalidTitle} | Devu`;
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = "noindex,nofollow";
    return () => document.body.classList.remove("whatsapp-contact-route");
  }, [copy.action, copy.invalidTitle, isValid]);

  return (
    <div className="whatsapp-contact-page">
      <header className="whatsapp-contact-header">
        <a href="/" aria-label="Devu">
          <img src="/devu-logo.png" alt="Devu" />
        </a>
      </header>

      <main className="whatsapp-contact-main">
        <section className="whatsapp-contact-panel" aria-labelledby="whatsapp-contact-title">
          <div className="whatsapp-contact-icon" aria-hidden="true">
            <MessageCircle />
          </div>
          <p className="whatsapp-contact-eyebrow">{copy.eyebrow}</p>
          <h1 id="whatsapp-contact-title">
            {isValid ? copy.title : copy.invalidTitle}
          </h1>
          <p className="whatsapp-contact-copy">
            {isValid ? copy.body : copy.invalidBody}
          </p>

          {isValid ? (
            <>
              <div className="whatsapp-contact-number" aria-label={`+${normalizedPhone}`}>
                +{normalizedPhone}
              </div>
              <a
                className="whatsapp-contact-action"
                href={`https://wa.me/${normalizedPhone}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle aria-hidden="true" />
                <span>{copy.action}</span>
                <ArrowUpRight aria-hidden="true" />
              </a>
              <p className="whatsapp-contact-privacy">
                <ShieldCheck aria-hidden="true" />
                <span>{copy.privacy}</span>
              </p>
            </>
          ) : (
            <a className="whatsapp-contact-home" href="/">
              {copy.home}
              <ArrowUpRight aria-hidden="true" />
            </a>
          )}
        </section>
      </main>

      <footer className="whatsapp-contact-footer">
        <span>Devu</span>
        <a href="mailto:support@devuapp.com">support@devuapp.com</a>
      </footer>
    </div>
  );
}
