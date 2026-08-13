import { useEffect } from "react";
import { ExternalLink, LifeBuoy, Mail, ShieldCheck, Trash2 } from "lucide-react";

const APP_URL = "https://app.devuapp.com";
const SUPPORT_EMAIL = "support@devuapp.com";

const DELETION_REQUEST_MAILTO = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
  "Account deletion request",
)}&body=${encodeURIComponent(
  "I request permanent deletion of my Devu account and the data it owns.\n\n"
  + "Account email address (required so we can verify the request): \n"
  + "Workspace name (if known): \n",
)}`;

const privacySections = [
  {
    title: "1. Who we are",
    body: "Devu is an appointment and client-management service operated by Ali Kerem Ata in Türkiye. For account data, Devu acts as the data controller. When a business enters information about its own clients, the business is the controller and Devu processes that information on its behalf.",
  },
  {
    title: "2. Information we collect",
    items: [
      "Account and profile information, including name, email address, encrypted password credentials, phone number, language, and workspace membership.",
      "Business and workspace information, including business name, category, venues, practitioners, availability, and team roles.",
      "Client and appointment information entered by authorized workspace members, including names, contact details, appointment times, services, notes, custom fields, and status history.",
      "Photos that an authorized user deliberately selects for a client or profile. The mobile app uses the system photo picker and does not request access to contacts, location, microphone, or camera.",
      "Push-notification information, including an Expo push token, platform, device model, notification preferences, delivery status, and notification interaction data needed to route the user to the relevant screen.",
      "WhatsApp integration records, such as connected business identifiers, recipient numbers, template parameters, message delivery status, and appointment-related reply actions. WhatsApp configuration is managed by workspace owners on the web app.",
      "Optional Google account data used for Google sign-in or Calendar sync, including Google subject identifier, verified email address, display name, encrypted OAuth grants, and identifiers of Devu-created calendar events.",
      "Technical and security information, such as IP address, request time, authentication events, API logs, error details, and basic device or browser information.",
      "Support communications and billing records. Devu does not store full payment-card details; payments are processed by the payment provider used on the web service.",
    ],
  },
  {
    title: "3. How we collect information",
    items: [
      "Directly from users when they create or update an account, workspace, client, practitioner, venue, or appointment.",
      "From device features only after the user takes an action, such as selecting a photo or enabling push notifications.",
      "From connected services, including Meta WhatsApp Business Platform and Google, after an authorized workspace owner or user grants access.",
      "Automatically through server logs and security controls when the app communicates with Devu's API.",
    ],
  },
  {
    title: "4. How we use information",
    items: [
      "Provide authentication, workspace access, appointment scheduling, client records, practitioner and venue management, and synchronization across devices.",
      "Send requested push notifications and display WhatsApp message activity related to appointments.",
      "Create, update, or remove Devu appointment events in a connected Google Calendar.",
      "Protect accounts, prevent abuse, diagnose failures, maintain service reliability, and provide customer support.",
      "Meet legal, accounting, and regulatory obligations and enforce our Terms of Service.",
      "Devu does not sell personal data and the mobile app does not use third-party advertising SDKs or track users across other companies' apps or websites.",
    ],
  },
  {
    title: "5. Service providers and data sharing",
    items: [
      "Google Cloud provides application hosting and infrastructure in Europe.",
      "MongoDB Atlas provides managed database infrastructure.",
      "Cloudinary provides storage and delivery for user-selected images.",
      "Resend provides transactional email delivery.",
      "Expo and Apple Push Notification service provide push-token and notification delivery infrastructure.",
      "Meta provides WhatsApp Business Platform functionality when a workspace connects WhatsApp.",
      "Google provides optional identity and Calendar services when a user connects Google.",
      "Payment providers process subscription payments initiated on the web service.",
      "We may disclose information to professional advisers or public authorities when required by applicable law. Service providers are required to process data only for the contracted service and to apply protections consistent with this policy and applicable law.",
    ],
  },
  {
    title: "6. Google API data and Limited Use",
    items: [
      "Google sign-in data is used only to authenticate the user, securely link an existing Devu account, and prevent duplicate accounts.",
      "Calendar access is used only to create, update, and delete calendar events corresponding to appointments managed in Devu. Devu does not bulk-read the user's existing calendar events.",
      "Google OAuth grants are encrypted at the application layer and removed when the connection is revoked or the relevant account is deleted.",
      "Google user data is not used for advertising, sold to third parties, used to train generalized artificial-intelligence or machine-learning models, or accessed by people except with explicit permission, for security, to comply with law, or for anonymized internal operations.",
      "Devu's use and transfer of information received from Google APIs complies with the Google API Services User Data Policy, including its Limited Use requirements.",
    ],
  },
  {
    title: "7. International transfers",
    body: "Devu is operated from Türkiye and uses service providers in Türkiye, the European Economic Area, and the United States. Where required, we rely on consent, contractual safeguards, provider data-protection terms, and other lawful transfer mechanisms.",
  },
  {
    title: "8. Retention and deletion",
    items: [
      "Active account and workspace data is retained while the account or service relationship remains active.",
      "After account deletion, operational data is removed or anonymized following a limited recovery and backup cycle, except where records must be retained for legal, fraud-prevention, accounting, or dispute-resolution purposes.",
      "Billing records may be retained for the period required by applicable tax and accounting law.",
      "Push tokens are removed when the device is unregistered or the user signs out where technically possible, and stale tokens are removed through service maintenance.",
      "Google and WhatsApp connection records are removed or disconnected when the relevant integration or account is deleted, subject to records that must be retained for security or legal compliance.",
    ],
  },
  {
    title: "9. Your choices and rights",
    items: [
      "Update profile information from Settings or contact support to request access, correction, restriction, portability, or deletion where applicable.",
      "Delete a Devu account from Mobile App > Settings > Delete account. Workspace owners may first need to transfer ownership, remove members, or resolve an active subscription.",
      "Disable push notifications through Devu settings or the operating system settings.",
      "Revoke photo access through the operating system and disconnect Google or WhatsApp through the available Devu web settings.",
      "Withdraw consent where processing relies on consent. Withdrawal does not affect processing that was lawful before withdrawal.",
    ],
  },
  {
    title: "10. Security",
    body: "Devu uses HTTPS in transit, hashed passwords, encrypted sensitive credentials, workspace-level authorization, rate limiting, security logging, and managed infrastructure safeguards. No method of storage or transmission is completely secure, but we work to prevent unauthorized access, loss, alteration, or disclosure.",
  },
  {
    title: "11. Children",
    body: "Devu is a business service and is not directed to children under 18. A business that records information about a minor client is responsible for having an appropriate legal basis and providing any notices or obtaining any consent required by law.",
  },
  {
    title: "12. Changes and contact",
    body: `We may update this policy as Devu or applicable requirements change. The effective date shown above will be updated for material revisions. Questions and privacy requests can be sent to ${SUPPORT_EMAIL}.`,
  },
];

const supportSections = [
  {
    title: "Contact Devu Support",
    body: "For help with your account, appointments, workspaces, notifications, or integrations, email our support team. Do not include your password, payment-card number, or other authentication secrets.",
    actions: [
      { label: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}?subject=Devu%20mobile%20support`, icon: Mail },
    ],
  },
  {
    title: "What to include in your request",
    items: [
      "The email address used for your Devu account.",
      "Your workspace name and whether you are the owner, practitioner, or assistant.",
      "Your device model, operating-system version, and Devu app version.",
      "A short description of what you expected, what happened, and the steps needed to reproduce the issue.",
      "Screenshots may help, but remove unrelated client or sensitive information before sending them.",
    ],
  },
  {
    title: "Sign-in and password help",
    body: "Use Forgot password on the Devu sign-in screen to request a reset email. If you no longer have access to the account email or the reset message does not arrive, contact support from an address you can access.",
    actions: [
      { label: "Open Devu web sign-in", href: `${APP_URL}/login`, icon: ExternalLink },
    ],
  },
  {
    title: "Account and data deletion",
    body: "In the mobile app, open Settings and select Delete account. This permanently deletes eligible accounts and owned workspace data. If deletion is blocked because the workspace has members or active billing, follow the on-screen instructions or contact support.",
  },
  {
    title: "Privacy and security",
    body: "To report a suspected security or privacy issue, email support with a clear subject line. Never send passwords, access tokens, verification codes, or complete payment information.",
    actions: [
      { label: "Read the Privacy Policy", href: "/privacy/en", icon: ShieldCheck },
    ],
  },
];

const accountDeletionSections = [
  {
    title: "Delete your account inside the app",
    body: "Open the Devu mobile app, go to More > Settings > Delete account, and complete the two-step confirmation. This permanently deletes eligible accounts and the workspace data you own. Workspace owners may first need to transfer ownership, remove members, or resolve an active subscription before the deletion can complete.",
  },
  {
    title: "Request deletion without signing in",
    body: "If you can no longer access the app or your account, you can request deletion by email. Send the request from the email address associated with your Devu account so we can verify that it is really you. We may ask for additional confirmation before completing the deletion.",
    actions: [
      { label: "Email an account deletion request", href: DELETION_REQUEST_MAILTO, icon: Mail },
    ],
  },
  {
    title: "How we verify your request",
    body: "We confirm the email address tied to the account, normally by requiring the request to come from that address or by sending a confirmation to it. This prevents anyone else from deleting your account. Requests are typically processed within 30 days.",
  },
  {
    title: "What is deleted",
    items: [
      "Your Devu account and profile: name, email, phone number, encrypted credentials, language, and workspace membership.",
      "Workspaces you own and their data, including clients, practitioners, venues, appointments, notes, custom fields, and uploaded photos.",
      "Integration records you control, including Google OAuth grants and WhatsApp configuration, which are removed or disconnected.",
      "Push-notification tokens associated with your account.",
    ],
  },
  {
    title: "What may be retained",
    body: "After deletion, operational data is removed or anonymized following a limited recovery and backup cycle. A limited set of records may be kept where the law requires it — for example billing and invoice records retained for tax and accounting purposes, and records needed for fraud prevention, security, or dispute resolution. Retained records are kept only for the period required and are not used for any other purpose.",
  },
  {
    title: "Data about your own clients",
    body: "If your business used Devu to store information about its clients, your business is the controller of that information, and deleting your account removes the workspace data you own. If you are an end client of a business that uses Devu and want your information removed, please contact that business directly. You may also contact us and we will help route the request.",
  },
  {
    title: "Questions",
    body: `For any question about account or data deletion, contact ${SUPPORT_EMAIL}.`,
    actions: [
      { label: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Account deletion question")}`, icon: Mail },
    ],
  },
];

function PublicHeader() {
  return (
    <header className="public-document-header">
      <a className="public-document-brand" href="/" aria-label="Devu home">
        <img src="/devu-logo.png" alt="Devu" />
      </a>
      <nav aria-label="Help and legal pages">
        <a href="/support/en">Support</a>
        <a href="/privacy/en">Privacy</a>
        <a href="/account-deletion">Delete account</a>
      </nav>
      <a className="public-document-app-link" href={APP_URL}>Open Devu <ExternalLink size={15} /></a>
    </header>
  );
}

function PublicFooter() {
  return (
    <footer className="public-document-footer">
      <span>© 2026 Devu</span>
      <div>
        <a href="/privacy/en">Privacy Policy</a>
        <a href="/support/en">Support</a>
        <a href="/account-deletion">Delete account</a>
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
      </div>
    </footer>
  );
}

function EnglishPublicPage({ title, subtitle, sections, icon: Icon, pageTitle }) {
  useEffect(() => {
    const previousTitle = document.title;
    const previousLanguage = document.documentElement.lang;
    document.title = pageTitle;
    document.documentElement.lang = "en";
    return () => {
      document.title = previousTitle;
      document.documentElement.lang = previousLanguage;
    };
  }, [pageTitle]);

  return (
    <div className="public-document-shell">
      <PublicHeader />
      <main className="content-page public-document-page">
        <div className="content-hero">
          <div className="content-icon"><Icon size={24} /></div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="content-body">
          {sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.body && <p>{section.body}</p>}
              {section.items && (
                <ul>
                  {section.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
              {section.actions && (
                <div className="public-document-actions">
                  {section.actions.map(({ label, href, icon: ActionIcon }) => (
                    <a href={href} key={href}>
                      <ActionIcon size={17} />
                      <span>{label}</span>
                      <ExternalLink size={14} />
                    </a>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}

export function EnglishPrivacyPage() {
  return (
    <EnglishPublicPage
      title="Privacy Policy"
      subtitle="Effective August 10, 2026. This policy explains how Devu collects, uses, shares, protects, retains, and deletes information across the Devu mobile app and service."
      sections={privacySections}
      icon={ShieldCheck}
      pageTitle="Privacy Policy | Devu"
    />
  );
}

export function EnglishSupportPage() {
  return (
    <EnglishPublicPage
      title="Devu Support"
      subtitle="Help for the Devu mobile app and service. Contact us directly or use the guidance below to resolve common account and data requests."
      sections={supportSections}
      icon={LifeBuoy}
      pageTitle="Support | Devu"
    />
  );
}

export function EnglishAccountDeletionPage() {
  return (
    <EnglishPublicPage
      title="Account & Data Deletion"
      subtitle="How to permanently delete your Devu account and the data it owns — inside the app, or by request if you can no longer sign in."
      sections={accountDeletionSections}
      icon={Trash2}
      pageTitle="Account Deletion | Devu"
    />
  );
}
