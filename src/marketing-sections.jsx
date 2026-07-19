import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BellRing,
  CalendarDays,
  Camera,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleUser,
  CreditCard,
  Image as ImageIcon,
  MessageCircle,
  Mic,
  Monitor,
  MoreVertical,
  MousePointer2,
  Paperclip,
  Phone,
  PlayCircle,
  Plus,
  Settings,
  SlidersHorizontal,
  Smartphone,
  Smile,
  Sparkles,
  UsersRound,
  Users,
  Video,
  X,
  Zap
} from "lucide-react";
import "./marketing.css";

const SIGNUP_URL = "https://app.devuapp.com/#/register";
const LOGIN_URL = "https://app.devuapp.com/#/login";

// Structure only — all display copy comes from shared/locales via i18n
// (landing.*). Icons, ids, visual/media types stay in code and are zipped with
// the translated text arrays by index.
const navHrefs = ["/#features", "/#pricing", "/whatsapp-setup"];
const minimalMicroIcons = [Zap, MousePointer2, Sparkles];

// icons map to: reminders / notifications / team / replies / setup
const whatsappTabsMeta = [
  { id: "reminders", icon: BellRing, visual: "reminder" },
  { id: "notifications", icon: CheckCheck, visual: "appointment-change" },
  { id: "team", icon: Users, visual: "team-digest" },
  { id: "replies", icon: MessageCircle, visual: "quick-reply" },
  { id: "config", icon: Settings, visual: "embedded-signup" }
];

// icons map to: workspace / calendar / client cards / payments / mobile
const featuresMeta = [
  { id: "workspace", icon: UsersRound, thumb: "screenshot", media: "screenshot" },
  { id: "calendar", icon: CalendarDays, thumb: "screenshot", media: "calendar" },
  { id: "client", icon: CircleUser, thumb: "screenshot", media: "client" },
  { id: "payment", icon: CreditCard, thumb: "screenshot", media: "screenshot" },
  { id: "mobile", icon: Smartphone, thumb: "phone", media: "phone" },
  { id: "customfields", icon: SlidersHorizontal, thumb: "screenshot", media: "screenshot" }
];

const demosMeta = [{ id: "today" }, { id: "calendar" }, { id: "client" }, { id: "whatsapp" }];

/* ── shared helpers ───────────────────────────────────────────────────────── */

function Reveal({ children, delay = 0, className, y = 22 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Skeleton() {
  return (
    <div className="ph-skeleton" aria-hidden="true">
      <div className="ph-sk-row w-40" />
      <div className="ph-sk-row w-80" />
      <div className="ph-sk-card" />
      <div className="ph-sk-row w-60" />
      <div className="ph-sk-card" />
    </div>
  );
}

/**
 * Placeholder — stands in for real assets.
 *  - kind="screenshot": browser-framed SaaS UI capture
 *  - kind="photo": contextual stock image (caption describes the intended shot)
 *  - kind="phone": mobile screen frame
 */
function Placeholder({ kind = "screenshot", label, sublabel, aspect = "", tag }) {
  const Icon = kind === "photo" ? ImageIcon : kind === "phone" ? Smartphone : Monitor;
  const inner = (
    <>
      <Skeleton />
      <div className="ph-placeholder-inner">
        <span className="ph-icon">
          <Icon />
        </span>
        <span className="ph-label">{label}</span>
        {sublabel && <span className="ph-sublabel">{sublabel}</span>}
      </div>
    </>
  );

  if (kind === "phone") {
    return (
      <div className="ph-phone">
        <i className="ph-notch" />
        <div className="ph-canvas">{inner}</div>
      </div>
    );
  }

  return (
    <div className={`ph ph-${kind}`}>
      {tag && (
        <span className="ph-tag">
          <Icon />
          {tag}
        </span>
      )}
      {kind === "screenshot" && (
        <div className="ph-chrome">
          <i className="ph-dot" />
          <i className="ph-dot" />
          <i className="ph-dot" />
          <span className="ph-url" />
        </div>
      )}
      <div className={`ph-canvas ${aspect}`}>{inner}</div>
    </div>
  );
}

/* ── reusable on-brand mockups (styled by global styles.css classes) ──────── */

function WhatsAppPhoneFrame({ children, previewLabel, compact = false }) {
  const { t } = useTranslation();
  const shared = t("landing.whatsapp.mockup.shared", { returnObjects: true });

  return (
    <div className={`product-scene chat-scene ${compact ? "product-scene-compact" : ""}`} role="img" aria-label={previewLabel}>
      <div className="chat-header">
        <button type="button" className="chat-icon-btn chat-back" aria-label={shared.backLabel} tabIndex={-1}>
          <ArrowLeft size={18} />
        </button>
        <div className="chat-avatar" aria-hidden="true">{shared.businessInitials}</div>
        <div className="chat-contact">
          <strong>{shared.businessName}</strong>
          <span>
            <i className="chat-presence" aria-hidden="true" />
            {shared.online}
          </span>
        </div>
        <div className="chat-header-actions">
          <button type="button" className="chat-icon-btn" aria-label={shared.videoLabel} tabIndex={-1}><Video size={18} /></button>
          <button type="button" className="chat-icon-btn" aria-label={shared.callLabel} tabIndex={-1}><Phone size={18} /></button>
          <button type="button" className="chat-icon-btn" aria-label={shared.moreLabel} tabIndex={-1}><MoreVertical size={18} /></button>
        </div>
      </div>

      {children}

      <div className="chat-input">
        <button type="button" className="chat-icon-btn" aria-label={shared.emojiLabel} tabIndex={-1}><Smile size={18} /></button>
        <div className="chat-input-field">{shared.messagePlaceholder}</div>
        <button type="button" className="chat-icon-btn" aria-label={shared.attachLabel} tabIndex={-1}><Paperclip size={18} /></button>
        <button type="button" className="chat-icon-btn" aria-label={shared.cameraLabel} tabIndex={-1}><Camera size={18} /></button>
        <button type="button" className="chat-mic-btn" aria-label={shared.voiceLabel} tabIndex={-1}><Mic size={16} /></button>
      </div>
    </div>
  );
}

function AutomaticBadge({ children, icon: Icon = Sparkles }) {
  return (
    <span className="chat-bubble-badge">
      <Icon size={11} />
      {children}
    </span>
  );
}

function BubbleMeta({ time, read = true }) {
  return (
    <span className="chat-bubble-meta">
      <time>{time}</time>
      {read && <CheckCheck size={14} className="chat-receipt is-read" />}
    </span>
  );
}

function ReminderBubble({ shared, copy, selectedAction = null }) {
  return (
    <div className="chat-bubble chat-bubble-received mkt-wa-reminder-bubble">
      <AutomaticBadge>{shared.automaticBadge}</AutomaticBadge>
      <div className="chat-bubble-body">
        <p>{copy.greeting}</p>
        <p className="mkt-wa-message-main">{copy.message}</p>
        <p className="mkt-wa-message-detail">{copy.detail}</p>
        <div className="chat-quick-replies" aria-label={shared.quickRepliesLabel}>
          <span className={selectedAction === "confirm" ? "chat-quick-reply-selected" : ""}>{shared.confirm}</span>
          <span className={selectedAction === "cancel" ? "chat-quick-reply-selected" : ""}>{shared.cancel}</span>
        </div>
      </div>
      <BubbleMeta time={copy.sentAt} />
    </div>
  );
}

function ChatMockup({ compact = false }) {
  const { t } = useTranslation();
  const shared = t("landing.whatsapp.mockup.shared", { returnObjects: true });
  const reminder = t("landing.whatsapp.mockup.reminder", { returnObjects: true });
  const quickReply = t("landing.whatsapp.mockup.quickReply", { returnObjects: true });

  return (
    <WhatsAppPhoneFrame compact={compact} previewLabel={quickReply.previewLabel}>
      <div className="chat-body">
        <div className="chat-date"><span>{shared.today}</span></div>
        <ReminderBubble shared={shared} copy={reminder} selectedAction="confirm" />
        <div className="chat-bubble chat-bubble-sent chat-bubble-quick-reply">
          <div className="chat-bubble-body"><p>{shared.confirm}</p></div>
          <BubbleMeta time={quickReply.replyTime} read={false} />
        </div>
        <div className="chat-bubble chat-bubble-received">
          <AutomaticBadge>{shared.automaticBadge}</AutomaticBadge>
          <div className="chat-bubble-body"><p>{quickReply.confirmationMessage}</p></div>
          <BubbleMeta time={quickReply.replyTime} />
        </div>
        <div className="chat-typing" aria-hidden="true"><span /><span /><span /></div>
      </div>
    </WhatsAppPhoneFrame>
  );
}

function ReminderMockup() {
  const { t } = useTranslation();
  const shared = t("landing.whatsapp.mockup.shared", { returnObjects: true });
  const copy = t("landing.whatsapp.mockup.reminder", { returnObjects: true });

  return (
    <WhatsAppPhoneFrame previewLabel={copy.previewLabel}>
      <div className="chat-body mkt-wa-scenario-body">
        <div className="chat-date"><span>{shared.today}</span></div>
        <ReminderBubble shared={shared} copy={copy} />
      </div>
    </WhatsAppPhoneFrame>
  );
}

function AppointmentChangeMockup() {
  const { t } = useTranslation();
  const shared = t("landing.whatsapp.mockup.shared", { returnObjects: true });
  const copy = t("landing.whatsapp.mockup.changes", { returnObjects: true });

  return (
    <WhatsAppPhoneFrame previewLabel={copy.previewLabel}>
      <div className="chat-body mkt-wa-scenario-body mkt-wa-changes">
        <div className="chat-date"><span>{shared.today}</span></div>
        <div className="chat-bubble chat-bubble-received mkt-wa-change-bubble is-update">
          <AutomaticBadge icon={CalendarDays}>{copy.updatedBadge}</AutomaticBadge>
          <div className="chat-bubble-body">
            <p className="mkt-wa-message-main">{copy.updatedTitle}</p>
            <p>{copy.updatedDetails}</p>
            <p className="mkt-wa-message-detail">{copy.updatedVenue}</p>
          </div>
          <BubbleMeta time={copy.updatedAt} />
        </div>
        <div className="chat-bubble chat-bubble-received mkt-wa-change-bubble is-cancelled">
          <AutomaticBadge icon={X}>{copy.cancelledBadge}</AutomaticBadge>
          <div className="chat-bubble-body">
            <p className="mkt-wa-message-main">{copy.cancelledTitle}</p>
            <p>{copy.cancelledDetails}</p>
            <p className="mkt-wa-message-detail">{copy.cancelledNote}</p>
          </div>
          <BubbleMeta time={copy.cancelledAt} />
        </div>
      </div>
    </WhatsAppPhoneFrame>
  );
}

function TeamDigestMockup() {
  const { t } = useTranslation();
  const shared = t("landing.whatsapp.mockup.shared", { returnObjects: true });
  const copy = t("landing.whatsapp.mockup.teamDigest", { returnObjects: true });

  return (
    <WhatsAppPhoneFrame previewLabel={copy.previewLabel}>
      <div className="chat-body mkt-wa-scenario-body">
        <div className="chat-date"><span>{copy.dateLabel}</span></div>
        <div className="chat-bubble chat-bubble-received mkt-wa-digest-bubble">
          <AutomaticBadge icon={Users}>{copy.badge}</AutomaticBadge>
          <div className="chat-bubble-body">
            <p className="mkt-wa-message-main">{copy.greeting}</p>
            <p>{copy.summary}</p>
            <div className="mkt-wa-digest-list">
              {copy.appointments.map((appointment) => (
                <div className="mkt-wa-digest-row" key={`${appointment.time}-${appointment.client}`}>
                  <time>{appointment.time}</time>
                  <span>
                    <strong>{appointment.client}</strong>
                    <small>{appointment.service} · {appointment.venue}</small>
                  </span>
                </div>
              ))}
            </div>
            <p className="mkt-wa-digest-note">{copy.note}</p>
          </div>
          <BubbleMeta time={copy.sentAt} />
        </div>
      </div>
    </WhatsAppPhoneFrame>
  );
}

function QuickReplyMockup({ active }) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const shared = t("landing.whatsapp.mockup.shared", { returnObjects: true });
  const reminder = t("landing.whatsapp.mockup.reminder", { returnObjects: true });
  const copy = t("landing.whatsapp.mockup.quickReply", { returnObjects: true });
  const [demo, setDemo] = useState({ action: "confirm", phase: 0 });

  useEffect(() => {
    if (!active) {
      setDemo({ action: "confirm", phase: 0 });
      return undefined;
    }
    if (reduceMotion) {
      setDemo({ action: "confirm", phase: 3 });
      return undefined;
    }

    const timeouts = new Set();
    let stopped = false;
    const schedule = (callback, delay) => {
      const timeout = window.setTimeout(() => {
        timeouts.delete(timeout);
        if (!stopped) callback();
      }, delay);
      timeouts.add(timeout);
    };
    const run = (action) => {
      setDemo({ action, phase: 0 });
      schedule(() => setDemo({ action, phase: 1 }), 1000);
      schedule(() => setDemo({ action, phase: 2 }), 1800);
      schedule(() => setDemo({ action, phase: 3 }), 2700);
      schedule(() => run(action === "confirm" ? "cancel" : "confirm"), 6500);
    };

    run("confirm");
    return () => {
      stopped = true;
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, [active, reduceMotion]);

  const actionLabel = demo.action === "confirm" ? shared.confirm : shared.cancel;
  const replyMessage = demo.action === "confirm" ? copy.confirmationMessage : copy.cancellationMessage;

  return (
    <WhatsAppPhoneFrame previewLabel={copy.previewLabel}>
      <div className="chat-body mkt-wa-scenario-body" aria-live="polite">
        <div className="chat-date"><span>{shared.today}</span></div>
        <ReminderBubble
          shared={shared}
          copy={reminder}
          selectedAction={demo.phase >= 1 ? demo.action : null}
        />
        {demo.phase >= 2 && (
          <div className="chat-bubble chat-bubble-sent chat-bubble-quick-reply mkt-wa-demo-enter" key={`action-${demo.action}`}>
            <div className="chat-bubble-body"><p>{actionLabel}</p></div>
            <BubbleMeta time={copy.replyTime} read={false} />
          </div>
        )}
        {demo.phase === 2 && <div className="chat-typing mkt-wa-demo-enter" aria-hidden="true"><span /><span /><span /></div>}
        {demo.phase >= 3 && (
          <div className="chat-bubble chat-bubble-received mkt-wa-demo-enter" key={`reply-${demo.action}`}>
            <AutomaticBadge>{shared.automaticBadge}</AutomaticBadge>
            <div className="chat-bubble-body"><p>{replyMessage}</p></div>
            <BubbleMeta time={copy.replyTime} />
          </div>
        )}
      </div>
    </WhatsAppPhoneFrame>
  );
}

function EmbeddedSignupMockup({ active }) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const copy = t("landing.whatsapp.mockup.setup", { returnObjects: true });
  const [phase, setPhase] = useState(0);
  const icons = [
    <span className="mkt-meta-mark" key="meta">f</span>,
    <UsersRound key="business" />,
    <Smartphone key="phone" />,
    <CircleCheck key="ready" />
  ];

  useEffect(() => {
    if (!active) {
      setPhase(0);
      return undefined;
    }
    if (reduceMotion) {
      setPhase(3);
      return undefined;
    }

    setPhase(0);
    const timeouts = [
      window.setTimeout(() => setPhase(1), 900),
      window.setTimeout(() => setPhase(2), 1800),
      window.setTimeout(() => setPhase(3), 2700)
    ];
    return () => timeouts.forEach((timeout) => window.clearTimeout(timeout));
  }, [active, reduceMotion]);

  return (
    <div className="mkt-signup-mockup" role="img" aria-label={copy.previewLabel}>
      <div className="mkt-signup-head">
        <span className="mkt-signup-brand"><MessageCircle size={19} />devu</span>
        <span className="mkt-signup-secure"><CircleCheck size={14} />{copy.secure}</span>
      </div>
      <div className="mkt-signup-copy">
        <span>{copy.eyebrow}</span>
        <h3>{copy.title}</h3>
        <p>{copy.body}</p>
      </div>
      <div className="mkt-signup-steps">
        {copy.steps.map((step, index) => {
          const isDone = phase === 3 || index < phase;
          const isCurrent = phase === index && phase < 3;
          return (
            <div className={`mkt-signup-step ${isDone ? "is-done" : ""} ${isCurrent ? "is-current" : ""}`} key={step}>
              <span className="mkt-signup-step-icon">{isDone ? <CheckCheck /> : icons[index]}</span>
              <span>{step}</span>
              {isCurrent && <i aria-hidden="true" />}
            </div>
          );
        })}
      </div>
      <div className={`mkt-signup-ready ${phase === 3 ? "is-visible" : ""}`} aria-live="polite">
        <CircleCheck size={22} />
        <span><strong>{copy.readyTitle}</strong><small>{copy.readyBody}</small></span>
      </div>
    </div>
  );
}

function CalendarMock() {
  const days = Array.from({ length: 35 }, (_, i) => i + 1);
  return (
    <div className="calendar-mockup">
      <div className="mockup-bar">
        <strong>Lorem 2026</strong>
        <span>3 lorem · 2 ipsum</span>
      </div>
      <div className="calendar-grid">
        {days.map((day) => (
          <div className={day % 7 === 2 ? "busy" : day % 5 === 0 ? "soft" : ""} key={day}>
            <span>{day}</span>
            {day % 3 === 0 && <i />}
            {day % 7 === 2 && <i />}
          </div>
        ))}
      </div>
    </div>
  );
}

function ClientMock() {
  return (
    <div className="client-mockup">
      <div className="client-head">
        <div className="avatar">LI</div>
        <div>
          <strong>Lorem Ipsum</strong>
          <span>Dolor sit · Amet Elit</span>
        </div>
      </div>
      <div className="alert-note">Lorem ipsum dolor note</div>
      <div className="photo-grid">
        <span />
        <span />
        <span />
      </div>
      <div className="history-list">
        <p>Lorem · dolor sit amet</p>
        <p>Ipsum · consectetur elit</p>
        <p>Dolor · adipiscing sed</p>
      </div>
    </div>
  );
}

function WaVisual({ visual, active }) {
  if (visual === "reminder") return <ReminderMockup />;
  if (visual === "appointment-change") return <AppointmentChangeMockup />;
  if (visual === "team-digest") return <TeamDigestMockup />;
  if (visual === "quick-reply") return <QuickReplyMockup active={active} />;
  return <EmbeddedSignupMockup active={active} />;
}

/* ── Sticky navbar — rendered above the hero so it spans the whole page and is
   not clipped by the hero's overflow:hidden ───────────────────────────────── */

export function SiteNav() {
  const { t, i18n } = useTranslation();
  const items = t("landing.nav.items");
  const nextLng = i18n.language === "tr" ? "en" : "tr";
  return (
    <div className="mkt-nav">
      <header className="site-header site-header-dark">
        <a className="brand" href="/" aria-label="devu home">
          <img src="/devu-logo.png" alt="devu" />
        </a>
        <nav aria-label="Primary">
          {navHrefs.map((href, i) => (
            <a href={href} key={href}>{Array.isArray(items) ? items[i] : ""}</a>
          ))}
        </nav>
        <div className="mkt-nav-right">
          <button
            type="button"
            className="mkt-lang-toggle"
            onClick={() => i18n.changeLanguage(nextLng)}
            aria-label={t("landing.nav.langLabel")}
            title={t("landing.nav.langLabel")}
          >
            {nextLng.toUpperCase()}
          </button>
          <a className="header-login" href={LOGIN_URL}>{t("landing.nav.login")}</a>
        </div>
      </header>
    </div>
  );
}

/* ── 1. HERO ──────────────────────────────────────────────────────────────── */

export function HeroSection() {
  const { t } = useTranslation();
  const trust = t("landing.hero.trust");
  return (
    <section className="mkt-hero" id="hero">
      <div className="mkt-hero-glow" aria-hidden="true" />

      <div className="mkt-hero-inner">
        <Reveal>
          <span className="mkt-hero-badge">
            <b><Sparkles size={12} /> {t("landing.hero.badgeStrong")}</b>
            <span className="mkt-hero-badge-text">{t("landing.hero.badgeText")}</span>
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mkt-hero-title">
            <Trans
              i18nKey="landing.hero.title"
              components={{ accent: <span className="mkt-hero-title-accent" /> }}
            />
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mkt-hero-sub">{t("landing.hero.subtitle")}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mkt-hero-actions mkt-hero-primary-actions">
            <a className="primary-cta" href={SIGNUP_URL}>
              {t("landing.hero.ctaPrimary")}
              <ArrowRight size={18} />
            </a>
            <a className="btn-secondary-light" href="#demo">
              <PlayCircle size={18} />
              {t("landing.hero.ctaSecondary")}
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mkt-hero-note">{t("landing.hero.note")}</p>
        </Reveal>

        <motion.div
          className="mkt-hero-stage"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Placeholder kind="screenshot" aspect="ph-wide" tag={t("landing.hero.shotTag")} label={t("landing.hero.shotLabel")} sublabel={t("landing.hero.shotSub")} />
          <div className="mkt-hero-pill">
            <i className="dot" />
            {t("landing.hero.pill")}
          </div>
          <div className="mkt-hero-float">
            <ChatMockup compact />
          </div>
        </motion.div>

        <Reveal delay={0.1}>
          <div className="mkt-trust">
            {(Array.isArray(trust) ? trust : []).map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 2. HIGHLIGHT 1 — MINIMALISTIC APPROACH ───────────────────────────────── */

export function MinimalSection() {
  const { t } = useTranslation();
  const points = t("landing.minimal.points");
  const micros = t("landing.minimal.micros");
  return (
    <section className="section mkt-minimal" id="minimal">
      <div className="mkt-split">
        <Reveal className="mkt-minimal-copy">
          <p className="eyebrow">{t("landing.minimal.eyebrow")}</p>
          <h2>{t("landing.minimal.title")}</h2>
          <p>{t("landing.minimal.body")}</p>
          <ul className="mkt-checklist">
            {(Array.isArray(points) ? points : []).map((p) => (
              <li key={p}>
                <CircleCheck size={20} />
                {p}
              </li>
            ))}
          </ul>
          <div className="mkt-hero-actions" style={{ marginTop: 30 }}>
            <a className="primary-cta" href={SIGNUP_URL}>
              {t("landing.minimal.cta")}
              <ArrowRight size={18} />
            </a>
          </div>
        </Reveal>

        <Reveal className="mkt-minimal-visual" delay={0.1}>
          <span className="mkt-minimal-badge">{t("landing.minimal.badge")}</span>
          <Placeholder kind="screenshot" aspect="ph-tall" tag={t("landing.minimal.shotTag")} label={t("landing.minimal.shotLabel")} sublabel={t("landing.minimal.shotSub")} />
        </Reveal>
      </div>

      <div className="mkt-microrow">
        {minimalMicroIcons.map((Icon, i) => {
          const m = (Array.isArray(micros) && micros[i]) || { title: "", body: "" };
          return (
            <Reveal key={i} delay={0.05 * i} className="mkt-micro">
              <span className="mkt-micro-icon">
                <Icon size={20} />
              </span>
              <h3>{m.title}</h3>
              <p>{m.body}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ── 3. HIGHLIGHT 2 — WHATSAPP INTEGRATION (interactive tabs) ──────────────── */

export function WhatsAppSection() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const tabsRef = useRef(null);
  const tabsText = t("landing.whatsapp.tabs");
  const controls = t("landing.whatsapp.controls", { returnObjects: true });
  const count = whatsappTabsMeta.length;
  const go = (dir) => setActive((a) => (a + dir + count) % count);

  // On the mobile/medium slider (control below the viewer), keep the active
  // feature scrolled into view. No-op on desktop where the list is vertical.
  useEffect(() => {
    const container = tabsRef.current;
    if (!container || container.scrollWidth <= container.clientWidth + 1) return;
    const btn = container.children[active];
    if (!btn) return;
    const c = container.getBoundingClientRect();
    const b = btn.getBoundingClientRect();
    const delta = b.left - c.left - (c.width - b.width) / 2;
    container.scrollBy({ left: delta, behavior: "smooth" });
  }, [active]);

  return (
    <section className="mkt-wa-wrap" id="whatsapp">
      <Reveal className="mkt-wa">
        <div className="mkt-head">
          <p className="eyebrow">{t("landing.whatsapp.eyebrow")}</p>
          <h2>{t("landing.whatsapp.title")}</h2>
          <p>{t("landing.whatsapp.body")}</p>
        </div>

        <div className="mkt-wa-body">
          <div className="mkt-wa-tabs" role="tablist" aria-label={controls.tabsLabel} ref={tabsRef}>
            {whatsappTabsMeta.map((tab, i) => {
              const Icon = tab.icon;
              const txt = (Array.isArray(tabsText) && tabsText[i]) || {};
              const isActive = i === active;
              return (
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`mkt-wa-tab ${isActive ? "is-active" : ""}`}
                  key={tab.id}
                  onClick={() => setActive(i)}
                >
                  <span className="mkt-wa-tab-icon">
                    <Icon size={20} />
                  </span>
                  <span>
                    <h3>{txt.title}</h3>
                    <p>{txt.sub}</p>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Paddle nav — visible only on the mobile/medium slider */}
          <div className="mkt-wa-slidernav">
            <span className="mkt-wa-slidercount">
              <b>{active + 1}</b> / {count}
            </span>
            <div className="mkt-wa-sliderbtns">
              <button type="button" onClick={() => go(-1)} aria-label={controls.previous}>
                <ChevronLeft size={18} />
              </button>
              <button type="button" onClick={() => go(1)} aria-label={controls.next}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* All panels are stacked (grid) so the stage keeps the height of the
              tallest one — switching features never shifts the layout. */}
          <div className="mkt-wa-stage">
            {whatsappTabsMeta.map((tab, i) => {
              const txt = (Array.isArray(tabsText) && tabsText[i]) || {};
              const isActive = i === active;
              return (
                <div
                  className={`mkt-wa-panel ${isActive ? "is-active" : ""}`}
                  key={tab.id}
                  aria-hidden={!isActive}
                >
                  <div className="mkt-wa-visual">
                    <WaVisual visual={tab.visual} active={isActive} />
                  </div>
                  <div className="mkt-wa-caption">
                    <span className="num">{i + 1}</span>
                    <span>
                      <strong>{txt.captionTitle}</strong>
                      <br />
                      <span>{txt.captionText}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ── 4. SECONDARY FEATURES — SLIDER CARDS + MODAL ─────────────────────────── */

function FeatureModal({ feature, onClose }) {
  const { t } = useTranslation();
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const Icon = feature.icon;

  return (
    <motion.div
      className="mkt-modal-overlay"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="mkt-modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
      >
        <button type="button" className="mkt-modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        <div className="mkt-modal-media">
          {feature.mediaType === "calendar" && <CalendarMock />}
          {feature.mediaType === "client" && <ClientMock />}
          {feature.mediaType === "phone" && <Placeholder kind="phone" label={feature.mediaLabel} />}
          {feature.mediaType === "screenshot" && <Placeholder kind="screenshot" tag={t("landing.hero.shotTag")} label={feature.mediaLabel} />}
        </div>
        <div className="mkt-modal-body">
          <span className="mkt-modal-icon">
            <Icon size={22} />
          </span>
          <h3>{feature.title}</h3>
          <p>{t("landing.features.modalDesc")}</p>
          <ul className="mkt-modal-list">
            {(feature.bullets || []).map((b) => (
              <li key={b}>
                <CircleCheck size={19} />
                {b}
              </li>
            ))}
          </ul>
          <div className="mkt-modal-cta">
            <a className="primary-cta" href={SIGNUP_URL}>
              {t("landing.features.modalCta")}
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FeaturesSection() {
  const { t } = useTranslation();
  const trackRef = useRef(null);
  const [active, setActive] = useState(null);
  const items = t("landing.features.items");

  const scrollByCards = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".mkt-feat-card");
    const amount = card ? card.offsetWidth + 16 : 320;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="section mkt-feat" id="features">
      <div className="mkt-feat-headrow">
        <Reveal className="mkt-head left" y={16}>
          <p className="eyebrow">{t("landing.features.eyebrow")}</p>
          <h2>{t("landing.features.title")}</h2>
          <p>{t("landing.features.body")}</p>
        </Reveal>
        <div className="mkt-feat-nav" aria-hidden="true">
          <button type="button" onClick={() => scrollByCards(-1)} aria-label="Previous">
            <ChevronLeft size={20} />
          </button>
          <button type="button" onClick={() => scrollByCards(1)} aria-label="Next">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="mkt-feat-track" ref={trackRef}>
        {featuresMeta.map((meta, i) => {
          const Icon = meta.icon;
          const txt = (Array.isArray(items) && items[i]) || {};
          return (
            <motion.button
              type="button"
              className="mkt-feat-card"
              key={meta.id}
              onClick={() =>
                setActive({
                  icon: meta.icon,
                  mediaType: meta.media,
                  mediaLabel: txt.mediaLabel,
                  title: txt.title,
                  bullets: txt.bullets
                })
              }
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mkt-feat-thumb">
                {meta.thumb === "phone" ? (
                  <div className="ph-canvas ph-wide" style={{ display: "grid", placeItems: "center" }}>
                    <span className="ph-icon"><Smartphone /></span>
                  </div>
                ) : (
                  <div className="ph-canvas ph-wide">
                    <Skeleton />
                    <div className="ph-placeholder-inner">
                      <span className="ph-icon"><Monitor /></span>
                      <span className="ph-label">{txt.thumbLabel}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="mkt-feat-card-body">
                <span className="mkt-feat-icon">
                  <Icon size={20} />
                </span>
                <h3>{txt.title}</h3>
                <p>{txt.body}</p>
                <span className="mkt-feat-more">
                  {t("landing.features.learnMore")}
                  <ArrowUpRight size={15} />
                </span>
              </div>
              <span className="mkt-feat-plus" aria-hidden="true">
                <Plus size={18} />
              </span>
            </motion.button>
          );
        })}
      </div>
      <p className="mkt-feat-hint">{t("landing.features.hint")}</p>

      <AnimatePresence>
        {active && <FeatureModal feature={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}

/* ── 5. DEMO VIDEOS ───────────────────────────────────────────────────────── */

function FocusedDemoModal({ demo, controls, onClose, reduceMotion }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    window.requestAnimationFrame(() => closeRef.current?.focus({ preventScroll: true }));

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  return (
    <motion.div
      className="mkt-demo-focus-overlay"
      onClick={onClose}
      initial={{ opacity: reduceMotion ? 1 : 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: reduceMotion ? 1 : 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.18 }}
    >
      <motion.div
        className="mkt-demo-focus-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mkt-demo-focus-title"
        aria-describedby="mkt-demo-focus-caption"
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 0.97, y: reduceMotion ? 0 : 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 0.98, y: reduceMotion ? 0 : 8 }}
        transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          className="mkt-demo-focus-close"
          onClick={onClose}
          aria-label={controls.close}
          ref={closeRef}
        >
          <X size={19} />
        </button>

        <div className="mkt-demo-focus-frame">
          <span className="ph-tag">
            <Video />
            {controls.playerTag}
          </span>
          <button type="button" className="mkt-demo-focus-play" aria-label={controls.play}>
            <PlayCircle />
          </button>
        </div>
        <div className="mkt-demo-focus-meta">
          <span>{controls.focusedLabel}</span>
          <h3 id="mkt-demo-focus-title">{demo.title}</h3>
          <p id="mkt-demo-focus-caption">{demo.caption}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function DemosSection() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const dockRef = useRef(null);
  const items = t("landing.demos.items");
  const controls = t("landing.demos.controls", { returnObjects: true });
  const demo = (Array.isArray(items) && items[active]) || {};
  const count = demosMeta.length;
  const selectDemo = (index) => setActive((index + count) % count);
  const openFocusedDemo = () => {
    if (window.matchMedia("(max-width: 980px)").matches) setIsFocused(true);
  };

  useEffect(() => {
    const rail = dockRef.current;
    const button = rail?.querySelector(`[data-demo-index="${active}"]`);
    if (!rail || !button || rail.clientWidth === 0) return;
    const left = button.offsetLeft - (rail.clientWidth - button.offsetWidth) / 2;
    rail.scrollTo({ left: Math.max(0, left), behavior: reduceMotion ? "auto" : "smooth" });
  }, [active, reduceMotion]);

  useEffect(() => {
    if (!isFocused) return undefined;
    const viewport = window.matchMedia("(max-width: 980px)");
    const handleViewportChange = (event) => {
      if (!event.matches) setIsFocused(false);
    };
    viewport.addEventListener("change", handleViewportChange);
    return () => viewport.removeEventListener("change", handleViewportChange);
  }, [isFocused]);

  const handleDockKeyDown = (event, index) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const next = (index + (event.key === "ArrowRight" ? 1 : -1) + count) % count;
    selectDemo(next);
    window.requestAnimationFrame(() => {
      dockRef.current
        ?.querySelector(`[data-demo-index="${next}"]`)
        ?.focus({ preventScroll: true });
    });
  };

  return (
    <section className="section mkt-demos" id="demo">
      <Reveal className="mkt-head">
        <p className="eyebrow">{t("landing.demos.eyebrow")}</p>
        <h2>{t("landing.demos.title")}</h2>
        <p>{t("landing.demos.body")}</p>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mkt-demo-player-shell">
          <AnimatePresence mode="wait">
            <motion.div
              className="mkt-demos-stage"
              key={active}
              initial={{ opacity: reduceMotion ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: reduceMotion ? 1 : 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
            >
              <div className="mkt-demo-frame">
                <span className="ph-tag">
                  <Video />
                  {t("landing.demos.tag")}
                </span>
                <button type="button" className="mkt-demo-play" aria-label={controls.play} onClick={openFocusedDemo}>
                  <PlayCircle />
                </button>
                <div className="mkt-demo-meta" aria-live="polite">
                  <span className="tag">
                    <PlayCircle size={13} />
                    {t("landing.demos.duration")}
                  </span>
                  <h3>{demo.title}</h3>
                  <p>{demo.caption}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mkt-demo-dock">
            <span
              className="mkt-demo-dock-count"
              aria-label={t("landing.demos.controls.position", { current: active + 1, total: count })}
            >
              <b>{active + 1}</b>
              <span>/ {count}</span>
            </span>

            <div className="mkt-demo-chapters" role="tablist" aria-label={controls.tabsLabel} ref={dockRef}>
              {demosMeta.map((meta, i) => {
                const d = (Array.isArray(items) && items[i]) || {};
                const isActive = i === active;
                return (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={t("landing.demos.controls.select", {
                      index: i + 1,
                      total: count,
                      label: d.label
                    })}
                    tabIndex={isActive ? 0 : -1}
                    className={`mkt-demo-chapter ${isActive ? "is-active" : ""}`}
                    data-demo-index={i}
                    key={meta.id}
                    onClick={() => selectDemo(i)}
                    onKeyDown={(event) => handleDockKeyDown(event, i)}
                  >
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <strong>{d.label}</strong>
                  </button>
                );
              })}
            </div>

            <div className="mkt-demo-dock-paddles">
              <button type="button" onClick={() => selectDemo(active - 1)} aria-label={controls.previous}>
                <ChevronLeft size={18} />
              </button>
              <button type="button" onClick={() => selectDemo(active + 1)} aria-label={controls.next}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mkt-demos-thumbs">
        {demosMeta.map((meta, i) => {
          const d = (Array.isArray(items) && items[i]) || {};
          return (
            <button
              type="button"
              className={`mkt-demo-thumb ${i === active ? "is-active" : ""}`}
              key={meta.id}
              onClick={() => selectDemo(i)}
            >
              <div className="ph-canvas">
                <div className="ph-placeholder-inner">
                  <span className="ph-icon"><PlayCircle /></span>
                </div>
              </div>
              <span className="mkt-demo-thumb-label">
                <span className="idx">{i + 1}</span>
                <strong>{d.label}</strong>
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isFocused && (
          <FocusedDemoModal
            demo={demo}
            controls={{ ...controls, playerTag: t("landing.demos.tag") }}
            onClose={() => setIsFocused(false)}
            reduceMotion={reduceMotion}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
