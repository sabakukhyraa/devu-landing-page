import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  BellRing,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  CircleCheck,
  CircleUser,
  ClipboardClock,
  Clock3,
  FileText,
  Frown,
  MessageCircle,
  MousePointer2,
  Phone,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Smartphone,
  ThumbsDown,
  UsersRound,
  Users
} from "lucide-react";
import "./styles.css";

const SIGNUP_URL = "https://app.devuapp.com/#/register";
const LOGIN_URL = "https://app.devuapp.com/#/login";
const formatPrice = (value) => `₺${new Intl.NumberFormat("tr-TR").format(value)}`;

const navLinks = [
  { href: "/#product", label: "Özellikler" },
  { href: "/#pricing", label: "Fiyatlar" },
  { href: "/whatsapp-setup", label: "WhatsApp Rehberi" }
];

const stats = [
  { label: "Hatırlatma", value: "31" },
  { label: "Planlanan", value: "18" },
  { label: "Gelecek", value: "7" },
  { label: "Tamamlanan", value: "12" }
];

const timeline = [
  {
    time: "09:30",
    name: "Ayşe Koç",
    reason: "Cilt bakımı",
    status: "Hatırlatma gitti",
    tone: "green"
  },
  {
    time: "10:15",
    name: "Emre Arslan",
    reason: "Fizyoterapi",
    status: "Gelecek",
    tone: "blue"
  },
  {
    time: "11:00",
    name: "Selin Aydın",
    reason: "Danışmanlık",
    status: "Mesaj bekliyor",
    tone: "orange"
  },
  {
    time: "13:30",
    name: "Burak Şahin",
    reason: "Saç bakımı",
    status: "Tamamlandı",
    tone: "green"
  }
];

const painPoints = [
  {
    icon: MessageCircle,
    title: "Her danışanı ayrı ayrı aramak gerekir",
    body: "Asistan manuel olarak danışanları arar, randevu verir, uzmanlara bilgi verir. Hataya çok açık!"
  },
  {
    icon: MousePointer2,
    title: "Diğer uygulamalar çok kalabalık gelir",
    body: "Hizmet ekibi hızlı çalışmak ister. Gereksiz modüller ve özellikler günlük akışı yavaşlatır."
  },
  {
    icon: FileText,
    title: "Danışan verilerini takip etmek zordur",
    body: "Notlar, fotoğraflar, dosyalar, özel uyarılar ve geçmiş işlemler farklı kanallara yayılır."
  },
  {
    icon: Clock3,
    title: "Günün önceliği net değildir",
    body: "Randevu yaklaşır, gecikir veya tamamlanır; ama aksiyonlar aynı takvim listesinde kaybolur."
  },
];

const categories = [
  "Diş klinikleri",
  "Fizyoterapi ekipleri",
  "Psikologlar",
  "Diyetisyenler",
  "Kuaförler",
  "+20 daha fazlası",
];

const features = [
  {
    icon: BellRing,
    eyebrow: "WhatsApp",
    title: "Hatırlatmaları sen belirle!",
    body: "Randevudan kaç saat önce, hangi mesaj şablonuyla hatırlatma gideceğine sen karar verirsin.",
    metric: "Birincil özellik"
  },
  {
    icon: Sparkles,
    eyebrow: "Minimal arayüz",
    title: "Hızlıca günün randevularına bak!",
    body: "Yoğun bir günde menüler ve gereksiz özellikler arasında kaybolmadan yalnızca bugüne odaklanabilirsin.",
    metric: "Sade kullanım"
  },
  {
    icon: CalendarDays,
    eyebrow: "Takvim",
    title: "Ekip ve lokasyon bazlı net planlama.",
    body: "Hangi randevunun hangi uzmana ait olduğunu, hangi lokasyonda olduğunu ve durumunu tek bakışta kolayca görebilirsin.",
    metric: "Okunaklı plan"
  },
  {
    icon: UsersRound,
    eyebrow: "Danışanlar",
    title: "Kayıt, not, fotoğraf ve uyarılar bir arada.",
    body: "Danışan profili, randevu geçmişi ve özel uyarılar ile her randevuda doğru bağlamda çalışmanı sağlar.",
    metric: "Tek kaynak"
  }
];

const videoFeatures = [
  {
    id: "today",
    file: "/media/hero-today.mp4",
    eyebrow: "WhatsApp + bugün",
    title: "Bugünkü randevuların durumunu incele",
    body: "Asistan sabah ilk iş olarak 'Bugün' sayfasına göz atar, randevularını durumunu kontrol eder, gerekiyorsa danışanı arar ve randevuyu günceller.",
    caption: "Diş kliniği kategorisinden",
    variant: "today",
    icon: BellRing
  },
  {
    id: "calendar",
    file: "/media/calendar-flow.mp4",
    eyebrow: "Takvim akışı",
    title: "Yoğun günleri sade filtrelerle okuyun.",
    body: "Uzman, lokasyon ve durum filtreleriyle takvim gereksiz karmaşadan arınır.",
    variant: "calendar",
    icon: CalendarDays
  },
  {
    id: "client",
    file: "/media/client-profile.mp4",
    eyebrow: "Danışan profili",
    title: "Her randevuda doğru danışan bağlamı.",
    body: "Fotoğraflar, notlar, özel uyarılar ve geçmiş randevular tek profilde toplanır.",
    variant: "client",
    icon: UsersRound
  },
  {
    id: "whatsapp",
    file: "/media/whatsapp-reminders.mp4",
    eyebrow: "Hatırlatmalar",
    title: "WhatsApp süreci takip edilebilir hale gelir.",
    body: "Hangi randevuya mesaj gitti, hangisi bekliyor, hangisi aksiyon istiyor net görünür.",
    variant: "whatsapp",
    icon: MessageCircle
  }
];

const plans = [
  {
    name: "Başlangıç",
    monthlyPrice: 799,
    description: "Tek uzmanlı küçük işletmeler için sade başlangıç.",
    items: [
      "1 lokasyon",
      "1 uzman",
      "Randevu takvimi",
      "Danışan kayıtları",
      "Bugün ekranı",
      "Temel WhatsApp hatırlatmaları",
      "Web + mobil kullanım"
    ]
  },
  {
    name: "Ekip",
    monthlyPrice: 1499,
    description: "Asistanlı, çok uzmanlı işletmeler için günlük operasyon planı.",
    featured: true,
    items: [
      "Birden fazla uzman",
      "Asistan kullanımı",
      "Gelişmiş Bugün operasyon ekranı",
      "WhatsApp hatırlatmaları ve durum takibi",
      "Danışan fotoğrafları, notlar, uyarılar",
      "Google Takvim bağlantısı",
      "Öncelikli destek"
    ]
  }
];

const faqs = [
  {
    question: "devu'nun ana faydası nedir?",
    answer:
      "Birincil fayda WhatsApp randevu hatırlatmalarını günlük işletme akışıyla birleştirmektir. İkinci büyük fayda ise ekibin karmaşık bir yazılım değil, sade bir çalışma ekranı kullanmasıdır."
  },
  {
    question: "14 günlük deneme için kart gerekiyor mu?",
    answer:
      "Kayıt olup işletmenizi kurarak ürünün günlük akışınıza uyup uymadığını görebilirsiniz. Deneme süreci küçük ekipler için hızlı karar vermeyi kolaylaştıracak şekilde tasarlanır."
  },
  {
    question: "WhatsApp kurulumu nasıl çalışıyor?",
    answer:
      "devu, Meta WhatsApp Business API yapısına göre çalışır. Telefon numarası, Phone Number ID ve erişim anahtarı gibi bilgiler gerekir. Ayrıntılı adımlar için WhatsApp Kurulum Rehberi sayfasını hazırladık."
  },
  {
    question: "Mobil uygulama kimler için?",
    answer:
      "Özellikle asistanlar için. Bugünkü randevuları görmek, danışanı aramak, WhatsApp durumunu kontrol etmek ve randevu durumunu değiştirmek için tasarlandı."
  },
  {
    question: "İstediğim zaman iptal edebilir miyim?",
    answer:
      "Evet. V1 abonelik modeli aylık ve sade tutulacak. Yıllık taahhüt v1 kapsamına dahil değil."
  }
];

const termsSections = [
  {
    title: "1. Koşulların Kabulü",
    body: "DevuApp hizmetlerini kullanarak bu Kullanım Koşullarını kabul etmiş sayılırsınız. Kabul etmiyorsanız hizmeti kullanmayınız."
  },
  {
    title: "2. Hizmet Tanımı",
    body: "DevuApp, randevu, danışan yönetimi, WhatsApp hatırlatmaları, takvim görünümü, fotoğraf/not kaydı ve isteğe bağlı ödeme takibi için tasarlanmış bulut tabanlı bir yazılımdır."
  },
  {
    title: "3. Hesap ve Sorumluluk",
    items: [
      "Doğru ve güncel bilgilerle hesap oluşturmanız gerekir.",
      "Hesap güvenliği, şifre ve erişim kontrolü sizin sorumluluğunuzdadır.",
      "Hesabınız üzerinden yapılan işlemlerden siz sorumlusunuz.",
      "Yetkisiz erişim fark ettiğinizde bizi derhal bilgilendirmelisiniz."
    ]
  },
  {
    title: "4. Veri Sahipliği",
    items: [
      "Hesabınıza girdiğiniz danışan, randevu, fotoğraf ve işletme verileri size aittir.",
      "Hizmeti sunabilmek için bu verileri işleme, saklama ve yedekleme hakkı verirsiniz.",
      "Hesabınızı kapattığınızda verileriniz makul süre içinde silinir veya yasal zorunluluk varsa yalnızca gerekli süre saklanır."
    ]
  },
  {
    title: "5. Kabul Edilebilir Kullanım",
    items: [
      "Hizmeti yasa dışı amaçlarla kullanamazsınız.",
      "WhatsApp özelliğini spam, izinsiz pazarlama veya toplu rahatsız edici mesajlar için kullanamazsınız.",
      "Sisteme bot, scraper veya güvenliği tehlikeye atacak yöntemlerle erişemezsiniz.",
      "Diğer kullanıcıların hizmetten yararlanmasını engelleyemezsiniz."
    ]
  },
  {
    title: "6. WhatsApp Entegrasyonu",
    items: [
      "WhatsApp özellikleri Meta WhatsApp Business API üzerinden çalışır ve Meta politikalarına tabidir.",
      "Mesaj gönderimi için gerekli izinleri ve hukuki dayanakları almak sizin sorumluluğunuzdadır.",
      "Meta kaynaklı kesinti, politika değişikliği veya API maliyetlerinden DevuApp sorumlu değildir."
    ]
  },
  {
    title: "7. Ücretlendirme",
    body: "DevuApp aylık abonelik planlarıyla sunulur. Güncel planlar Başlangıç ve Ekip paketleridir. Fiyatlar, özellik kapsamı ve deneme koşulları zaman içinde güncellenebilir; önemli değişiklikler makul şekilde bildirilir."
  },
  {
    title: "8. Sorumluluk Sınırlaması",
    body: "Hizmet makul özenle sunulur ancak kesintisiz veya hatasız çalışma garantisi verilmez. Üçüncü taraf hizmetlerindeki kesintilerden, dolaylı zararlardan veya iş kayıplarından sorumluluk kabul edilmez."
  },
  {
    title: "9. İletişim",
    body: "Kullanım koşullarıyla ilgili sorularınız için DevuApp destek kanalları üzerinden bizimle iletişime geçebilirsiniz."
  }
];

const privacySections = [
  {
    title: "1. Giriş",
    body: "DevuApp olarak kişisel verilerin korunmasına önem veriyoruz. Bu politika, hizmeti kullandığınızda hangi verileri topladığımızı, nasıl kullandığımızı ve haklarınızı açıklar."
  },
  {
    title: "2. Topladığımız Veriler",
    items: [
      "Hesap verileri: ad, e-posta, şifrelenmiş parola, telefon ve işletme bilgileri.",
      "Danışan verileri: ad, telefon, e-posta, fotoğraf, not, özel uyarı ve randevu geçmişi.",
      "Randevu verileri: tarih, saat, süre, uzman, lokasyon, durum ve işlem sebebi.",
      "WhatsApp verileri: telefon numarası, mesaj şablonu, gönderim ve teslim durumu.",
      "Ödeme takip verileri: yalnızca bu özellik etkinleştirildiğinde tutar, vade ve ödeme durumu."
    ]
  },
  {
    title: "3. Verileri Kullanma Amaçlarımız",
    items: [
      "Hizmeti sağlamak, güvenli şekilde çalıştırmak ve destek vermek.",
      "Kullanıcı ayarlarına göre WhatsApp randevu hatırlatmaları göndermek.",
      "Doğrulama, şifre sıfırlama ve önemli ürün bildirimleri göndermek.",
      "Ürünü anonim veya toplulaştırılmış kullanım verileriyle iyileştirmek."
    ]
  },
  {
    title: "4. Üçüncü Taraf Hizmetler",
    body: "Altyapı, görsel depolama, e-posta, takvim bağlantısı ve WhatsApp mesajları için MongoDB Atlas, Cloudinary, Resend, Google Calendar API ve Meta WhatsApp Business API gibi hizmetler kullanılabilir. Veriler yalnızca hizmetin çalışması için gerekli kapsamda paylaşılır."
  },
  {
    title: "5. Güvenlik",
    items: [
      "Veriler aktarım sırasında HTTPS/TLS ile korunur.",
      "Şifreler hashlenmiş şekilde saklanır.",
      "Yetkilendirme tokenları ve erişim kontrolleri kullanılır.",
      "Hassas entegrasyon bilgileri kullanıcı hesabı kapsamında korunur."
    ]
  },
  {
    title: "6. Haklarınız",
    items: [
      "Verilerinize erişim talep edebilirsiniz.",
      "Yanlış veya eksik verilerin düzeltilmesini isteyebilirsiniz.",
      "Hesabınızın ve ilişkili verilerin silinmesini talep edebilirsiniz.",
      "WhatsApp mesajlaşma iznini ve ilgili ayarları istediğiniz zaman devre dışı bırakabilirsiniz."
    ]
  },
  {
    title: "7. Saklama Süresi",
    body: "Aktif hesap verileri hizmet sürdüğü sürece saklanır. Hesap kapatıldığında veriler makul süre içinde silinir; yasal yükümlülükler veya güvenlik kayıtları için gerekli bilgiler sınırlı süre tutulabilir."
  },
  {
    title: "8. İletişim",
    body: "Gizlilik politikası ve veri talepleri için DevuApp destek kanalları üzerinden bize ulaşabilirsiniz."
  }
];

const whatsappSections = [
  {
    title: "Gereksinimler",
    items: [
      "Bir Facebook hesabı.",
      "İşletmenize ait, kişisel WhatsApp'tan farklı bir telefon numarası.",
      "DevuApp hesabı.",
      "Meta Business hesabı ve WhatsApp Business API erişimi."
    ]
  },
  {
    title: "1. Meta Business hesabı oluşturun",
    items: [
      "business.facebook.com adresine gidin.",
      "İşletme adınızı, adınızı ve iş e-posta adresinizi girin.",
      "İşletme bilgilerinizi doğrulayın."
    ]
  },
  {
    title: "2. WhatsApp Business uygulaması oluşturun",
    items: [
      "developers.facebook.com üzerinde yeni bir Business uygulaması oluşturun.",
      "Uygulamanıza WhatsApp ürününü ekleyin.",
      "Uygulamayı Meta Business hesabınızla bağlayın."
    ]
  },
  {
    title: "3. Telefon numarası ekleyin",
    items: [
      "WhatsApp API kurulumu ekranından işletme telefon numaranızı ekleyin.",
      "SMS veya arama ile doğrulama kodunu alın.",
      "Numarayı doğrulayarak API kullanımına hazır hale getirin."
    ]
  },
  {
    title: "4. API bilgilerini DevuApp'e girin",
    items: [
      "Phone Number ID değerini kopyalayın.",
      "WhatsApp Business Account ID değerini kaydedin.",
      "Kalıcı erişim anahtarı oluşturun.",
      "DevuApp WhatsApp ayarlarına bu bilgileri girin ve test mesajı gönderin."
    ]
  },
  {
    title: "Önemli not",
    body: "Meta politikaları, şablon onayları ve konuşma ücretleri zaman içinde değişebilir. DevuApp, hatırlatma akışını sadeleştirir; Meta hesabınızın uygunluğu ve mesaj izinleri işletmenizin sorumluluğundadır."
  }
];

function ProductScene({ compact = false }) {
  return (
    <div className={`product-scene ${compact ? "product-scene-compact" : ""}`}>
      <div className="scene-topbar">
        <div>
          <span className="scene-kicker">WhatsApp hatırlatmaları</span>
          <strong>Perşembe, 16 Mayıs</strong>
        </div>
        <span className="scene-filter">
          <BellRing size={14} />
          31 mesaj
        </span>
      </div>

      <div className="attention-panel">
        <span>Hatırlatma gönderildi</span>
        <strong>09:30 · Ayşe Koç</strong>
        <p>Cilt bakımı · Deniz Arslan · Nişantaşı</p>
        <div className="attention-actions">
          <button>
            <Phone size={14} />
            Ara
          </button>
          <button>
            <MessageCircle size={14} />
            WhatsApp
          </button>
          <button>
            <CircleCheck size={14} />
            Gelecek işaretle
          </button>
        </div>
      </div>

      <div className="scene-stats">
        {stats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="scene-tabs">
        <span>Aktif</span>
        <span>Planlandı</span>
        <span>Gelecek</span>
        <span>Tamamlandı</span>
      </div>

      <div className="scene-timeline">
        {timeline.map((item) => (
          <div className="scene-row" key={`${item.time}-${item.name}`}>
            <time>{item.time}</time>
            <div>
              <strong>{item.name}</strong>
              <span>{item.reason}</span>
            </div>
            <em className={`status-${item.tone}`}>{item.status}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

function CalendarMockup() {
  const days = Array.from({ length: 35 }, (_, index) => index + 1);
  return (
    <div className="calendar-mockup">
      <div className="mockup-bar">
        <strong>Mayıs 2026</strong>
        <span>3 uzman · 2 lokasyon</span>
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

function ClientMockup() {
  return (
    <div className="client-mockup">
      <div className="client-head">
        <div className="avatar">AK</div>
        <div>
          <strong>Ayşe Koç</strong>
          <span>Cilt bakımı · Deniz Arslan</span>
        </div>
      </div>
      <div className="alert-note">Hassas cilt notu var</div>
      <div className="photo-grid">
        <span />
        <span />
        <span />
      </div>
      <div className="history-list">
        <p>16 Mayıs · Cilt bakımı</p>
        <p>02 Mayıs · Kontrol</p>
        <p>18 Nisan · İlk görüşme</p>
      </div>
    </div>
  );
}

function WhatsappMockup() {
  return (
    <div className="whatsapp-mockup">
      <div className="message-card sent">
        <span>Gönderildi</span>
        <p>Merhaba Ayşe Hanım, randevunuz bugün 09:30.</p>
      </div>
      <div className="message-card pending">
        <span>Bekliyor</span>
        <p>Emre Arslan için 24 saat hatırlatması planlandı.</p>
      </div>
      <div className="message-card done">
        <span>Otomatik onay</span>
        <p>Danışan randevuya geleceğini doğruladı.</p>
      </div>
    </div>
  );
}

function VisualFallback({ variant }) {
  if (variant === "calendar") return <CalendarMockup />;
  if (variant === "client") return <ClientMockup />;
  if (variant === "whatsapp") return <WhatsappMockup />;
  return <ProductScene compact />;
}

function VideoSlot({ src, variant, label, caption }) {
  const [videoAvailable, setVideoAvailable] = useState(true);

  return (
    <div className="video-slot">
      {videoAvailable && (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
          onError={() => setVideoAvailable(false)}
        />
      )}
      {!videoAvailable && <VisualFallback variant={variant} />}
        <div className="video-caption">
          <PlayCircle size={15} />
          <strong>{caption}</strong>
        </div>
    </div>
  );
}

function Header({ dark = false }) {
  return (
    <header className={`site-header ${dark ? "site-header-dark" : ""}`}>
      <a className="brand" href="/" aria-label="devu ana sayfa">
        <img src="/devu-logo.png" alt="devu" />
      </a>
      <nav aria-label="Ana navigasyon">
        {navLinks.map((link) => (
          <a href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className="header-login" href={LOGIN_URL}>
        Giriş
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-backdrop" aria-hidden="true">
        <ProductScene />
      </div>
      <Header />
      <div className="hero-content">
        <p className="eyebrow">WhatsApp hatırlatmaları + kolay randevu yönetimi</p>
        <h1>Basit, sade ve&nbsp;etkili!</h1>
        <p className="hero-copy">
          devu, randevu ile çalışan işletmelerin WhatsApp randevu hatırlatmalarını, danışan kayıtlarını ve günlük asistan akışını minimal bir çalışma ekranında toplar.
          <br />Farklı hizmet kategorileri için uygundur.
        </p>
        <div className="hero-actions">
          <a className="primary-cta" href={SIGNUP_URL}>
            14 Gün Ücretsiz Dene
            <ArrowRight size={18} />
          </a>
          <a className="secondary-cta" href="#demo">
            <PlayCircle size={18} />
            Demo İzle
          </a>
        </div>
        <p className="hero-note">Kredi kartı gerekmeden başlayın. Web ve mobil birlikte.</p>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="section problem-section">
      <div className="problem-heading">
        <p className="eyebrow">Günlük karmaşa</p>
        <h2>Randevu yönetiminde kritik: ortak&nbsp;iletişim</h2>
        <p>
          Devu sayesinde hem uzman, hem danışan hem de asistan aynı randevu bilgilerine sahip olur. Yanlış anlaşılmalar, unutulan aramalar ve dağınık notlar ortadan&nbsp;kalkar.
        </p>
      </div>
      <p className="without-devu">devu OLMADAN:</p>
      <div className="pain-grid">
        {painPoints.map((point) => {
          const Icon = point.icon;
          return (
            <article key={point.title} className="pain-card">
              <Icon size={22} />
              <div>
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </div>
            </article>
          );
        })}
      </div>
      <div className="pain-doodle" aria-label="Devu olmadan mutsuz randevu akışı">
        <ThumbsDown size={34} strokeWidth={2.4} />
        <Frown size={44} strokeWidth={2.2} />
        <span>çok karışık!</span>
      </div>
    </section>
  );
}

function ProductStory() {
  return (
    <section className="section product-story" id="product">
      <div className="section-heading narrow">
        <p className="eyebrow">Ürün</p>
        <h2>Neden devu?</h2>
        <p>Randevu ile çalışan küçük ve orta ölçekli hizmet ekipleri için çok ideal. <br />WhatsApp hatırlatmalarıyla modern ve profesyonel gözükürsün!</p>
      </div>
      <div className="feature-grid">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <article className="feature-card" key={feature.title}>
              <div className="feature-label">
                <Icon size={22} />
                <span>{feature.eyebrow}</span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <strong>{feature.metric}</strong>
            </article>
          );
        })}
      </div>
      <div className="category-strip" aria-label="Uygun işletme kategorileri">
        {categories.map((category) => (
          <span key={category}>{category}</span>
        ))}
      </div>
    </section>
  );
}

function Workflow() {
  const steps = [
    {
      icon: BriefcaseBusiness,
      title: "Hesap oluştur",
      body: "Giriş bilgilerini, uzmanları ve lokasyonları belirle."
    },
    {
      icon: Phone,
      title: "WhatsApp konfigürasyonu",
      body: "WhatsApp Business hesabınla Meta'dan bilgileri al ve devu'ya gir."
    },
    {
      icon: BellRing,
      title: "Hatırlatmaları ayarla",
      body: "WhatsApp hesabından danışanlara gidecek olan otomatik mesajları belirle."
    },
    {
      icon: UsersRound,
      title: "Danışanları oluştur",
      body: "Danışanların bilgilerini, fotoğraflarını, ilgili dosyalarını ve notlarını gir."
    },
    {
      icon: ClipboardClock,
      title: "Randevu oluştur",
      body: "Randevu bilgilerini, tarih/saat, uzman, lokasyon gir."
    },
  ];

  return (
    <section className="workflow">
      <div className="workflow-inner">
        <div className="workflow-intro">
          <p className="eyebrow">Kurulum</p>
          <h2>10 dakikada her şey hazır!</h2>
          <p className="workflow-copy">
            Bir kez kurun, hatırlatmalar ve günlük randevu akışı otomatik çalışsın.
          </p>
        </div>
        <div className="workflow-steps">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.title}>
                <span className="workflow-icon">
                  <Icon size={20} />
                </span>
                <strong className="workflow-number">
                  {String(index + 1).padStart(2, "0")}
                </strong>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function VideoFeatures() {
  return (
    <section className="section video-section" id="demo">
      <div className="video-heading">
        <p className="eyebrow">Ürün videoları</p>
        <h2>Demo videoları ile devu'ya daha yakından bak.</h2>
        <p>
          Aşağıda devu'nun farklı özelliklerini gösteren ve farklı senaryolar içeren kısa videolar bulabilirsin.
        </p>
      </div>
      <div className="video-feature-list">
        {videoFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <article className="video-feature" key={feature.id}>
              <div className="video-copy">
                <span>
                  <Icon size={14} />
                  {feature.eyebrow}
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </div>
              <VideoSlot
                src={feature.file}
                variant={feature.variant}
                label={feature.title}
                caption={feature.caption}
              />
              <strong className="feature-number">{String(index + 1).padStart(2, "0")}</strong>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Pricing() {
  const [billing, setBilling] = useState("monthly");
  const [yearlyPulse, setYearlyPulse] = useState(0);
  const yearly = billing === "yearly";

  function selectBilling(nextBilling) {
    setBilling(nextBilling);
    if (nextBilling === "yearly") {
      setYearlyPulse((current) => current + 1);
    }
  }

  return (
    <section className="section pricing-section" id="pricing">
      <div className="section-heading narrow">
        <p className="eyebrow">Fiyatlar</p>
        <h2>İki sade plan. <br />Aylık ya da yıllık.</h2>
        <p>WhatsApp hatırlatma ve minimal günlük operasyon akışını hızlıca test edin.</p>
      </div>
      <div className="pricing-controls">
        <div className="billing-toggle" aria-label="Faturalandırma dönemi">
          <button
            className={!yearly ? "active" : ""}
            type="button"
            onClick={() => selectBilling("monthly")}
          >
            Aylık
          </button>
          <button
            className={yearly ? "active" : ""}
            type="button"
            onClick={() => selectBilling("yearly")}
          >
            <span>Yıllık</span>
            <em
              className={`yearly-chip ${yearly ? "active" : ""}`}
              key={yearly ? `yearly-${yearlyPulse}` : "monthly-chip"}
            >
              2 ay ücretsiz
            </em>
          </button>
        </div>
      </div>
      <div className="pricing-grid">
        {plans.map((plan) => {
          const price = yearly
            ? formatPrice(plan.monthlyPrice * 10)
            : formatPrice(plan.monthlyPrice);

          return (
            <article
              className={`pricing-card ${plan.featured ? "featured" : ""}`}
              key={plan.name}
            >
              <div className="plan-top">
                <span className={`plan-badge ${plan.featured ? "" : "plan-badge-placeholder"}`}>
                  {plan.featured ? "En uygun seçim" : "Başlamak için"}
                </span>
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
              </div>
              <div className="price">
                <strong>{price}</strong>
                <span>{yearly ? "/ yıl" : "/ ay"}</span>
              </div>
              {yearly && (
                <p className="annual-equivalent">
                  {formatPrice(Math.round((plan.monthlyPrice * 10) / 12))} / ay
                </p>
              )}
              <a href={SIGNUP_URL}>14 gün ücretsiz dene</a>
              <ul>
                {plan.items.map((item) => (
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
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section faq-section" id="faq">
      <div className="section-heading narrow">
        <p className="eyebrow">Sıkça Sorulan Sorular</p>
        <h2>Satın almadan önce net olması gerekenler.</h2>
      </div>
      <div className="faq-list">
        {faqs.map((faq, index) => {
          const open = openIndex === index;
          return (
            <article className={open ? "open" : ""} key={faq.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? -1 : index)}
                aria-expanded={open}
              >
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

function FinalCTA() {
  return (
    <section className="final-cta">
      <div>
        <p className="eyebrow">Başlayın</p>
        <h2>İncele, <br />beğenmezsen <br />iptal et.</h2>
        <p>
          14 günlük denemede kurulumu yap, günlük akışınıza uyup uymadığına bak. Kredi kartı gerekmeden başla,<br /> istediğin zaman iptal et.
        </p>
      </div>
      <a className="primary-cta final-cta-button" href={SIGNUP_URL}>
        14 Gün Ücretsiz Dene
        <ArrowRight size={18} />
      </a>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <img src="/devu-logo.png" alt="devu" />
          <p>
            Randevu ve müşteri yönetim platformu. Hizmet sektöründeki işletmeler
            için tasarlandı.
          </p>
        </div>
        <div className="footer-column">
          <h3>Ürün</h3>
          <a href="/#product">Özellikler</a>
          <a href={LOGIN_URL}>Giriş Yap</a>
          <a href={SIGNUP_URL}>Başlayın</a>
        </div>
        <div className="footer-column">
          <h3>Kaynaklar</h3>
          <a href="/whatsapp-setup">WhatsApp Kurulum Rehberi</a>
        </div>
        <div className="footer-column">
          <h3>Yasal</h3>
          <a href="/privacy">Gizlilik Politikası</a>
          <a href="/terms">Kullanım Koşulları</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 DevuApp. Tüm hakları saklıdır.</span>
        <button type="button">EN</button>
      </div>
    </footer>
  );
}

function MarketingPage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <ProductStory />
      <Workflow />
      <VideoFeatures />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <SiteFooter />
    </>
  );
}

function LegalPage({ title, subtitle, sections, icon: Icon }) {
  return (
    <>
      <div className="page-shell">
        <Header dark />
        <main className="content-page">
          <div className="content-hero">
            <div className="content-icon">
              <Icon size={24} />
            </div>
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
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </main>
      </div>
      <SiteFooter />
    </>
  );
}

function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";

  if (path === "/terms") {
    return (
      <LegalPage
        title="Kullanım Koşulları"
        subtitle="Son güncelleme: Mayıs 2026"
        sections={termsSections}
        icon={FileText}
      />
    );
  }

  if (path === "/privacy") {
    return (
      <LegalPage
        title="Gizlilik Politikası"
        subtitle="Son güncelleme: Mayıs 2026"
        sections={privacySections}
        icon={ShieldCheck}
      />
    );
  }

  if (path === "/whatsapp-setup") {
    return (
      <LegalPage
        title="WhatsApp Kurulum Rehberi"
        subtitle="Meta Business API ile WhatsApp hatırlatma sistemini adım adım kurun. Tahmini süre: 15-30 dakika."
        sections={whatsappSections}
        icon={MessageCircle}
      />
    );
  }

  return <MarketingPage />;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
