import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft,
  ArrowRight,
  BellRing,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  Check,
  CheckCheck,
  ChevronDown,
  CircleCheck,
  CircleUser,
  ClipboardClock,
  Clock3,
  FileText,
  Frown,
  MessageCircle,
  Mic,
  MoreVertical,
  MousePointer2,
  Paperclip,
  Phone,
  PlayCircle,
  ShieldCheck,
  Smile,
  Sparkles,
  Smartphone,
  ThumbsDown,
  UsersRound,
  Users,
  Video
} from "lucide-react";
import "./styles.css";
import CookieBanner from "./cookie-banner.jsx";

const SIGNUP_URL = "https://app.devuapp.com/#/register";
const LOGIN_URL = "https://app.devuapp.com/#/login";
const formatPrice = (value) => `₺${new Intl.NumberFormat("tr-TR").format(value)}`;

const navLinks = [
  { href: "/#product", label: "Özellikler" },
  { href: "/#pricing", label: "Fiyatlar" },
  { href: "/whatsapp-setup", label: "WhatsApp Rehberi" }
];

const chatThread = [
  { type: "date", text: "Bugün" },
  {
    type: "sent",
    automated: true,
    body: (
      <>
        <p>
          Merhaba Merve 👋 Yarın{" "}
          <strong>16 Mayıs · 09:30</strong> Cilt Bakımı randevunu hatırlatırız.
        </p>
        <div className="chat-quick-replies" aria-label="WhatsApp hızlı yanıt seçenekleri">
          <span>Geleceğim</span>
          <span>İptal et</span>
        </div>
      </>
    ),
    appointmentStatus: "Otomatik mesaj",
    time: "20:00",
    status: "read"
  },
  {
    type: "received",
    quickReply: true,
    body: <p>Geleceğim</p>,
    time: "20:14"
  },
  {
    type: "sent",
    automated: true,
    body: (
      <p>
        Harika, randevun onaylandı. Seni <strong>09:30</strong>'da Nişantaşı
        şubemizde bekliyoruz 🌿
      </p>
    ),
    appointmentStatus: "Otomatik mesaj",
    time: "20:14",
    status: "read"
  },
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
    body: "Asistan sabah ilk iş olarak 'Bugün' sayfasına göz atar, randevuların durumunu kontrol eder, gerekiyorsa danışanları arar ve randevuyu günceller.",
    caption: "Diş kliniği kategorisinden",
    variant: "today",
    icon: BellRing
  },
  {
    id: "calendar",
    file: "/media/calendar-flow.mp4",
    eyebrow: "Takvim akışı",
    title: "Geleceği gözden geçir",
    body: "Önündeki birkaç haftayı kolayca gözden geçir, hangi randevuların hangi uzmanlara ait olduğunu ve hangi lokasyonda olduğunu tek bakışta gör.",
    caption: "Diş kliniği kategorisinden",
    variant: "calendar",
    icon: CalendarDays
  },
  {
    id: "client",
    file: "/media/client-profile.mp4",
    eyebrow: "Danışan profili",
    title: "Danışanlarını yakından tanı",
    body: "Fotoğraflar, notlar, özel uyarılar, geçmiş randevular ve ödemeler tek profilde toplanır.",
    caption: "Diş kliniği kategorisinden",
    variant: "client",
    icon: UsersRound
  },
  {
    id: "whatsapp",
    file: "/media/whatsapp-reminders.mp4",
    eyebrow: "Hatırlatmalar",
    title: "WhatsApp süreci takip edilebilir hale gelir.",
    body: "Hangi randevuya mesaj gitti, hangisi bekliyor, hangisi aksiyon istiyor net görünür.",
    caption: "Diş kliniği kategorisinden",
    variant: "whatsapp",
    icon: MessageCircle
  }
];

const plans = [
  {
    name: "Başlangıç",
    monthlyPrice: 799,
    description: "Tek uzmanlı küçük işletmeler için sade başlangıç.",
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
    description: "Asistanlı, çok uzmanlı işletmeler için günlük operasyon planı.",
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
    answer: (
      <>
        devu, Meta WhatsApp Business API yapısına göre çalışır. Telefon numarası, Phone Number ID ve erişim anahtarı gibi bilgiler gerekir. Ayrıntılı adımlar için{" "}
        <a href="/whatsapp-setup">WhatsApp Kurulum Rehberi</a> sayfasını hazırladık.<FootnoteRef n={5} />
      </>
    )
  },
  {
    question: "Mobil uygulama kimler için?",
    answer:
      "Mobil uygulama, gün içinde hareket halinde olan asistanlar ve uzmanlar için tasarlanır. Masaüstünde kurulum ve yönetim kolaylığı sağlanırken, mobil uygulama günlük operasyonun hızlı ve esnek şekilde yürütülmesine odaklanır. Danışanlar ürünün hiçbir platformunu kullanmaz, yalnızca WhatsApp üzerinden hatırlatmaları alır ve yanıt verirler."
  },
  {
    question: "İstediğim zaman iptal edebilir miyim?",
    answer:
      "Evet, aboneliğinizi istediğiniz zaman iptal edebilirsiniz. İptal durumunda mevcut abonelik dönemi sonuna kadar hizmetten yararlanmaya devam edersiniz, ardından yenileme olmaz."
  }
];

const PLACEHOLDER_SELLER = "Ali Kerem Ata · MURATREİS MAH. TIKNEFES SK. DEMSEL SITESI A1-A2 NO: 16/1 İÇ KAPI NO: 3 ÜSKÜDAR / İSTANBUL · Üsküdar VD · VKN 0920795402 · +90 543 528 47 34 · support@devuapp.com";

const termsSections = [
  {
    title: "1. Sağlayıcı Bilgileri",
    body: `Bu Platform, ${PLACEHOLDER_SELLER} tarafından işletilmektedir. Detaylı sağlayıcı bilgileri (unvan, adres, MERSİS, vergi dairesi/no, KEP, telefon, e-posta) Kullanım Koşulları'nın tam metninde yer alır.`
  },
  {
    title: "2. Koşulların Kabulü",
    body: "Platform'a kayıt olarak, hesap oluşturarak veya Hizmet'i kullanarak işbu Koşullar'ı okuduğunuzu, anladığınızı ve tamamına uyacağınızı kabul ve taahhüt etmiş sayılırsınız. Platform'u kullanabilmek için 18 yaşını doldurmuş ve tam fiil ehliyetine sahip olmanız gerekir."
  },
  {
    title: "3. Hizmetin Kapsamı",
    body: "devu; randevu yönetimi, danışan kaydı, WhatsApp hatırlatma, takvim entegrasyonu, ödeme takibi gibi fonksiyonları içeren bulut tabanlı bir SaaS ürünüdür. Fiziki ürün niteliği taşımaz; ödeme sonrası anında dijital olarak ifa edilir."
  },
  {
    title: "4. Hesap ve Güvenlik",
    items: [
      "Doğru, güncel ve eksiksiz bilgilerle hesap oluşturmakla yükümlüsünüz.",
      "Hesap erişim bilgilerinin (parola, oturum, MFA) güvenliğinden yalnızca siz sorumlusunuz.",
      "Hesabınız üzerinden gerçekleştirilen tüm işlemlerden sorumlusunuz.",
      "Yetkisiz erişim fark ettiğinizde derhal bizi bilgilendirmelisiniz.",
      "Çok kullanıcılı abonelikte, davet ettiğiniz alt kullanıcıların Koşullar'a uyumundan sorumlusunuz."
    ]
  },
  {
    title: "5. Kabul Edilebilir Kullanım",
    items: [
      "Platform'u yasaya, ahlaka veya genel adaba aykırı amaçlarla kullanamazsınız.",
      "WhatsApp hatırlatma fonksiyonunu spam, izinsiz pazarlama veya toplu rahatsız edici mesajlar için kullanamazsınız.",
      "Meta'nın WhatsApp Business Messaging Policy ve Commerce Policy kurallarına uymakla yükümlüsünüz.",
      "Bot, scraper, otomasyon aracı veya zararlı yazılımlarla yetkisiz erişim sağlayamazsınız.",
      "Hizmet'in kaynak kodunu tersine mühendislik, decompile veya disassemble edemezsiniz.",
      "Platform'u izinsiz olarak alt lisansa veremez, kiralayamaz, satamazsınız."
    ]
  },
  {
    title: "6. İçerik ve Fikri Mülkiyet",
    items: [
      "Platform'un kaynak kodu, tasarımı, devu markası ve logoları Sağlayıcı'nın münhasır fikri mülkiyetidir.",
      "Size, abonelik süresince Platform'u kullanmak üzere devredilemez, alt lisansa verilemez, münhasır olmayan bir kullanım hakkı tanınır.",
      "Platform'a girdiğiniz tüm içerik (danışan verisi, randevu, fotoğraf, şablon) size aittir; Sağlayıcı'ya yalnızca Hizmet'i sunmak için işleme, depolama ve yedekleme hakkı verirsiniz.",
      "WhatsApp™, Meta™, Google™ markaları ilgili sahiplerine aittir. Sağlayıcı, Meta veya WhatsApp'ın resmi ortağı değil; yalnızca lisanslı bir teknoloji sağlayıcı (Tech Provider) olarak hareket eder."
    ]
  },
  {
    title: "7. WhatsApp Entegrasyonu ve Meta Ücretleri (Önemli)",
    items: [
      "WhatsApp özellikleri Meta WhatsApp Business Cloud API üzerinden çalışır ve Meta politikalarına tabidir.",
      "Mesaj göndereceğiniz alıcılara dair KVKK rıza, ETK ticari elektronik ileti onayı ve İYS kaydını sağlamak yalnızca sizin sorumluluğunuzdadır.",
      "devu'ya ödediğiniz abonelik bedeli YALNIZCA yazılım hizmetinin karşılığıdır; WhatsApp mesajları için Meta tarafından AYRICA ücret tahsil edilir.",
      "Meta, 'Konuşma Bazlı Fiyatlandırma' (Conversation-Based Pricing) modeli uygular. Ücretler konuşma kategorisine (Hizmet, Pazarlama, Yardımcı, Kimlik Doğrulama), alıcı ülkesine ve Meta'nın güncel tarifesine göre değişir.",
      "Meta ücretleri, WhatsApp Business hesabınıza bağlı kart veya kredi limiti üzerinden doğrudan Meta tarafından tahsil edilir; Sağlayıcı bu akışta taraf değildir.",
      "Meta tarafından uygulanan askıya alma, kalite skoru düşmesi, hesap kapatma veya mesaj limiti kararları Sağlayıcı'nın kontrolünde değildir.",
      "Güncel Meta fiyatlandırma sayfası: developers.facebook.com/docs/whatsapp/pricing"
    ]
  },
  {
    title: "8. Ücretlendirme",
    items: [
      "Tüm bedeller KDV dahildir (KDV %20).",
      "Faturalandırma aylık veya yıllık dönemler hâlinde, iyzico altyapısı üzerinden yapılır.",
      "Abonelik dönem sonunda otomatik yenilenir; siz iptal etmediğiniz takdirde ücret otomatik tahsil edilir.",
      "Ödeme başarısız olursa 3 iş günü içinde 3 deneme yapılır; tüm denemeler başarısız olursa abonelik askıya alınır.",
      "Fiyat değişiklikleri yalnızca yenilenen dönemlerde geçerli olur ve en az 30 gün öncesinden e-posta ile bildirilir.",
      "Cayma hakkı ve iade detayları için İade ve Cayma Politikası'na bakınız."
    ]
  },
  {
    title: "9. Cayma Hakkının Bulunmaması",
    body: "Hizmet; Mesafeli Sözleşmeler Yönetmeliği m.15/1-(ğ) uyarınca 'elektronik ortamda anında ifa edilen hizmetler' kapsamında olduğundan 14 günlük cayma hakkı KULLANILAMAZ. Ancak aboneliğinizi her zaman iptal edebilirsiniz; mevcut dönem sonuna kadar Hizmet'ten yararlanır, sonraki dönem için ücret tahsil edilmez."
  },
  {
    title: "10. Sorumluluk Sınırlaması",
    items: [
      "Hizmet, ticari makul özen çerçevesinde sunulur; kesintisiz veya hatasız çalışma garantisi verilmez.",
      "Sağlayıcı'nın sorumluluğu, KULLANICI'nın son 12 ayda ödediği toplam abonelik bedeli ile sınırlıdır.",
      "Dolaylı zararlar, kar kaybı, iş kaybı veya itibar kaybı için tazminat talep edilemez.",
      "KASIT VEYA AĞIR KUSUR HÂLLERİ HARİÇTİR (TBK m.115 saklıdır). Sağlayıcı'nın ağır kusurundan kaynaklanan zararlar için bu sınırlamalar uygulanmaz.",
      "Üçüncü taraf hizmetlerden (Meta, Google, iyzico vb.) kaynaklanan kesintilerden Sağlayıcı sorumlu değildir."
    ]
  },
  {
    title: "11. Fesih",
    items: [
      "Herhangi bir gerekçe göstermeksizin Platform üzerinden aboneliğinizi iptal edebilirsiniz.",
      "Sağlayıcı; Koşullar'a aykırılık, yasalara/ahlaka aykırı kullanım, spam, teknik manipülasyon veya ödeme başarısızlığının 14 günü aşması hâllerinde aboneliği derhal feshedebilir.",
      "Fesih hâlinde makul süre öncesinden bildirim yapılır (zorunlu acil hâller dışında)."
    ]
  },
  {
    title: "12. Mücbir Sebep",
    body: "Doğal afet, savaş, salgın, yasal düzenleme, üçüncü taraf hizmet kesintisi (Meta, Google, iyzico vb.) gibi olağanüstü hâllerde Tarafların yükümlülükleri askıya alınır."
  },
  {
    title: "13. Değişiklikler",
    body: "Sağlayıcı, Koşullar'ı güncelleme hakkını saklı tutar. Önemli değişiklikler en az 30 gün öncesinden e-posta ile bildirilir; Hizmet'in kullanımına devam edilmesi güncel Koşullar'ın kabulü anlamına gelir."
  },
  {
    title: "14. Uyuşmazlık Çözümü",
    items: [
      "Türkiye Cumhuriyeti hukuku uygulanır.",
      "Tüketici niteliğindeki kullanıcılar için Ticaret Bakanlığı'nca ilan edilen parasal sınırlar dahilinde Tüketici Hakem Heyetleri; üzerindeki uyuşmazlıklarda Tüketici Mahkemeleri yetkilidir.",
      "Tacir veya tüzel kişi kullanıcılar için [İlgili Yetkili Mahkeme] Mahkemeleri ve İcra Daireleri yetkilidir."
    ]
  },
  {
    title: "15. İletişim ve Bütünleşik Belgeler",
    body: "Bu Koşullar; Mesafeli Satış Sözleşmesi, Ön Bilgilendirme Formu, KVKK Aydınlatma Metni, Açık Rıza Metni, Veri İşleme Sözleşmesi (DPA), İade Politikası ve Çerez Politikası ile birlikte tek bir bütünsel anlaşma oluşturur. Sorularınız için belirtilen Sağlayıcı iletişim kanallarını kullanabilirsiniz."
  }
];

const privacySections = [
  {
    title: "1. Veri Sorumlusu",
    body: `${PLACEHOLDER_SELLER}. Detaylı kimlik ve iletişim bilgileri KVKK Aydınlatma Metni'nin tam metninde yer alır. Bu özet metin, hukuki açıdan bağlayıcı tam metnin tüketici-dostu özetidir.`
  },
  {
    title: "2. Veri Sorumlusu / Veri İşleyen Ayrımı (Önemli)",
    items: [
      "Sizin hesap verileriniz (ad, e-posta, telefon, işletme bilgileri) için devu VERİ SORUMLUSUDUR.",
      "Sizin Platform'a girdiğiniz üçüncü kişi verileri (danışan, hasta, müşteri) için devu VERİ İŞLEYENDİR; veri sorumlusu sizsiniz.",
      "Danışan verilerinize ilişkin aydınlatma yükümlülüğü ve açık rıza alma sorumluluğu size aittir.",
      "B2B kullanımlarda ayrıca devu ile Veri İşleme Sözleşmesi (DPA) akdedilmesi gerekir."
    ]
  },
  {
    title: "3. Topladığımız Veriler",
    items: [
      "Hesap verileri: ad, e-posta, şifrelenmiş parola, telefon, işletme bilgileri.",
      "Otomatik veriler: IP, tarayıcı/cihaz, oturum kayıtları, gezinme verileri.",
      "Üçüncü kişi verileri (siz girdiğinizde): danışan kimliği, iletişimi, fotoğrafı, notu.",
      "ÖZEL NİTELİKLİ KİŞİSEL VERİ UYARISI: Danışan fotoğrafları, sağlık notları ve özel durum uyarıları KVKK m.6 anlamında özel nitelikli kişisel veridir. Bu veriler için ek güvenlik tedbirleri uygulanır; ilgili danışanlardan açık rıza alma yükümlülüğü size aittir.",
      "WhatsApp verileri: telefon numarası, mesaj parametresi, gönderim durumu.",
      "Faturalandırma verileri (kart bilgisi tutulmaz; iyzico tarafından işlenir)."
    ]
  },
  {
    title: "4. İşleme Amaçları ve Hukuki Sebepleri",
    items: [
      "Hesap oluşturma, kimlik doğrulama: sözleşmenin ifası (KVKK m.5/2-c).",
      "Hizmetin sunulması (randevu, WhatsApp): sözleşmenin ifası (KVKK m.5/2-c).",
      "Faturalama, ödeme: hukuki yükümlülük (KVKK m.5/2-ç).",
      "Destek ve şikayet süreçleri: sözleşmenin ifası + meşru menfaat.",
      "Güvenlik, suistimal tespiti: meşru menfaat (KVKK m.5/2-f).",
      "Pazarlama iletişimi: AÇIK RIZA (KVKK m.5/1) + ETK m.6 + İYS kaydı."
    ]
  },
  {
    title: "5. Yurt İçi ve Yurt Dışı Aktarımlar",
    items: [
      "Yurt içi: iyzico (ödeme), avukat/mahkeme/kamu (yasal zorunluluk).",
      "Yurt dışı — MongoDB Atlas (AB): veritabanı.",
      "Yurt dışı — Google Cloud Run (AB): uygulama sunucusu.",
      "Yurt dışı — Cloudinary (ABD/AB): görsel depolama.",
      "Yurt dışı — Resend (ABD): transactional e-posta.",
      "Yurt dışı — Meta Platforms (ABD/AB): WhatsApp Cloud API.",
      "Yurt dışı — Google LLC (ABD): Calendar API (opsiyonel).",
      "Yurt dışı — Google LLC / Google Analytics 4 (ABD): web sitesi/uygulama kullanım analizi. YALNIZCA Çerez Onay Banner'ından onay verirseniz aktif olur.",
      "Yurt dışı — Meta Platforms / Meta Pixel (ABD): reklam ölçümü, dönüşüm takibi, retargeting. YALNIZCA Çerez Onay Banner'ından onay verirseniz aktif olur.",
      "Tüm yurt dışı aktarımlar için kayıt sırasında AÇIK RIZANIZ alınır (KVKK m.9)."
    ]
  },
  {
    title: "6. Saklama Süreleri",
    items: [
      "Aktif hesap verileri: aboneliğiniz boyunca.",
      "Hesap kapatma sonrası: 30 gün kurtarma penceresi, sonra silinir/anonim hâle getirilir.",
      "Faturalandırma kayıtları: VUK m.253 uyarınca 10 yıl.",
      "5651 sayılı Kanun erişim logları: 1-2 yıl (mevzuat şartı).",
      "Pazarlama kayıtları: rıza geri alınana kadar."
    ]
  },
  {
    title: "7. Güvenlik Önlemleri",
    items: [
      "TLS/HTTPS ile aktarım şifrelemesi.",
      "Bcrypt ile parola hash'leme.",
      "Hassas alanlar için uygulama katmanında AES-256-GCM şifrelemesi.",
      "JWT tabanlı oturum + workspace düzeyinde erişim kontrolü.",
      "Express rate-limit, helmet, mongo-sanitize ile temel güvenlik kontrolleri.",
      "Otomatik yedekleme ve geri yükleme prosedürleri."
    ]
  },
  {
    title: "8. KVKK m.11 Haklarınız (Tam Liste)",
    items: [
      "1) Verilerinizin işlenip işlenmediğini öğrenme,",
      "2) İşlenmişse bilgi talep etme,",
      "3) İşleme amacını ve buna uygun kullanılıp kullanılmadığını öğrenme,",
      "4) Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,",
      "5) Eksik/yanlış işlenmişse düzeltilmesini isteme,",
      "6) Silinmesini veya yok edilmesini isteme,",
      "7) Düzeltme ve silmenin aktarım yapılan üçüncü kişilere bildirilmesini isteme,",
      "8) Münhasıran otomatik analiz sonucu aleyhinize çıkan sonuçlara itiraz etme,",
      "9) Hukuka aykırı işleme nedeniyle uğradığınız zararın giderilmesini talep etme."
    ]
  },
  {
    title: "9. Başvuru Usulü",
    items: [
      "E-posta, KEP veya yazılı ıslak imzalı dilekçe ile başvuru yapabilirsiniz.",
      "Başvuruda ad-soyad, T.C. kimlik no, adres, iletişim ve talep konusu yer almalıdır.",
      "Talebiniz en geç 30 (otuz) gün içinde ücretsiz sonuçlandırılır.",
      "Ek maliyet gerektirmesi hâlinde Kurul tarifesindeki ücret alınabilir."
    ]
  },
  {
    title: "10. Veri İhlali Durumunda",
    body: "KVKK m.12 uyarınca, kişisel veri ihlali tespit ettiğimizde 72 saat içinde Kişisel Verileri Koruma Kurulu'na ve en kısa sürede etkilenen ilgili kişilere bildirim yaparız."
  },
  {
    title: "11. Çocukların Gizliliği",
    body: "Platform 18 yaşından küçükler için tasarlanmamıştır. Danışan kayıtlarınızda 18 yaş altı veri yer alıyorsa, ilgili velayet sahibinden rıza alma yükümlülüğü size aittir."
  },
  {
    title: "12. Çerezler ve Tam Metinler",
    body: "Çerez kullanımı için ayrı Çerez Politikası, tüm KVKK detayları için tam KVKK Aydınlatma Metni yayımlanmıştır. Hukuki bağlayıcılığı tam metinler haizdir; bu özet sadece bilgilendirme amaçlıdır."
  }
];

const cookieSections = [
  {
    title: "1. Çerez Nedir?",
    body: "Çerezler; web sitelerinin ziyaretçilerin cihazlarına yerleştirdiği küçük metin dosyalarıdır. Çerezler dışında localStorage, sessionStorage ve piksel gibi teknolojiler de benzer amaçlarla kullanılabilir."
  },
  {
    title: "2. Çerez Türleri",
    items: [
      "Zorunlu çerezler: Platform'un çalışması için zorunlu (oturum, güvenlik). Onay gerekmez (yasal istisna).",
      "İşlevsellik çerezleri: Kullanıcı tercihleri (dil, görüntüleme). Onay gerekir.",
      "Performans/Analiz çerezleri: Kullanım ölçümü, hata teşhisi. Onay gerekir.",
      "Pazarlama çerezleri: Reklam takip, dönüşüm ölçüm. Onay gerekir."
    ]
  },
  {
    title: "3. Kullandığımız Zorunlu Çerezler",
    items: [
      "devu_token — kimlik doğrulama (JWT) — 7 gün",
      "devu_workspace_id — aktif workspace bağlamı — oturum süresince",
      "devu_chunk_reloaded — sürüm güncelleme reload kontrolü — oturum süresince"
    ]
  },
  {
    title: "4. İşlevsellik Çerezleri",
    items: [
      "devu_language — dil tercihi (tr/en) — 1 yıl",
      "devu_activeVenue — son seçilen lokasyon filtresi — 1 yıl"
    ]
  },
  {
    title: "5. Üçüncü Taraf Çerezler",
    items: [
      "Google Fonts (Google LLC) — yazı tipi sunumu; üçüncü taraf çerez yazmaz, IP loglanabilir.",
      "Google Analytics 4 (Google LLC) — performans/analiz kategorisinde; _ga, _ga_<container>, _gid çerezleri; saklama süresi 24 saat – 2 yıl; lokasyon ABD.",
      "Meta Pixel (Meta Platforms Inc.) — pazarlama kategorisinde; _fbp, _fbc çerezleri + tr pikseli; saklama süresi 90 gün; lokasyon ABD.",
      "Analytics ve Pixel çerezleri YALNIZCA Çerez Onay Banner üzerinden ilgili kategori onaylanırsa aktif olur; onay vermezseniz veri toplanmaz, ilgili sağlayıcılarla paylaşım yapılmaz.",
      "Reddetmeniz hâlinde Platform tüm temel işlevleriyle çalışmaya devam eder; yalnızca analiz/pazarlama verisi toplanmaz.",
      "Verdiğiniz onayı dilediğiniz an Çerez Tercihleri menüsünden veya tarayıcı ayarlarınızdan geri alabilirsiniz."
    ]
  },
  {
    title: "6. Çerez Yönetimi",
    items: [
      "Platform'a ilk girişinizde Çerez Onay Banner sunulur.",
      "Banner üzerinden zorunlu çerezleri veya tüm çerezleri kabul edebilir, kategorileri tek tek seçebilirsiniz.",
      "Onayınızı her zaman ayarlardan güncelleyebilirsiniz.",
      "Tarayıcı ayarlarından da çerezleri yönetebilirsiniz; ancak zorunlu çerezleri devre dışı bırakırsanız Platform bazı işlevlerini yitirir."
    ]
  }
];

const cancellationSections = [
  {
    title: "1. Hizmetin Niteliği",
    body: "devu, bulut tabanlı bir Yazılım Hizmetidir (SaaS). Hizmet, ödeme onayı ile birlikte dijital ortamda anında ifa edilir ve kullanıma açılır."
  },
  {
    title: "2. Cayma Hakkının Bulunmaması",
    body: "Mesafeli Sözleşmeler Yönetmeliği m.15/1-(ğ) uyarınca 'elektronik ortamda anında ifa edilen hizmetler' için 14 günlük cayma hakkı kullanılamaz. ALICI, ödeme akışı sırasında bu durum hakkında açıkça bilgilendirilmiş ve elektronik onay vermiştir."
  },
  {
    title: "3. Abonelik İptal Hakkı",
    items: [
      "Aboneliğinizi her zaman gerekçesiz iptal edebilirsiniz.",
      "İptal için: app.devuapp.com > Ayarlar > Abonelik > 'Aboneliği İptal Et'.",
      "İptal anında etki gösterir; e-posta veya başvuru gerekmez."
    ]
  },
  {
    title: "4. İptal Sonrası",
    items: [
      "Mevcut dönem ücreti İADE EDİLMEZ; dönem sonuna kadar hizmeti kullanmaya devam edersiniz.",
      "Bir sonraki dönem için ücret tahsil edilmez; otomatik yenileme durdurulur.",
      "Hesap erişimi abonelik bitiminde sonlanır.",
      "Veriler KVKK Saklama ve İmha Politikası uyarınca işlenir."
    ]
  },
  {
    title: "5. İstisnai İade Halleri",
    items: [
      "Hizmetin teknik sebeple HİÇ başlatılamaması — tam iade.",
      "Mükerrer veya yanlış tahsilat — otomatik iade veya bir sonraki döneme mahsup. 30 gün içinde bildirim şartı.",
      "Sağlayıcı tarafından hizmet sonlandırma — kullanılmayan günlerle orantılı iade."
    ]
  },
  {
    title: "6. İade Başvuru Usulü",
    body: "İade talebi için Sağlayıcı'nın e-posta veya KEP kanallarına; hesap bilgisi, tahsilat tarihi/tutarı, gerekçe ve (varsa) belge ile birlikte başvurabilirsiniz. Talep en geç 14 gün içinde sonuçlandırılır. Uygun bulunan iadeler 3-10 iş günü içinde ödeme yapılan karta yansır."
  },
  {
    title: "7. Meta WhatsApp Ücretleri İade Edilmez",
    body: "ALICI'nın WhatsApp üzerinden gönderdiği mesajlar için Meta tarafından kesilen ücretler Sağlayıcı'nın kontrolü dışındadır ve iade taleplerine konu edilemez. Bu ücretler için doğrudan Meta'ya başvurulması gerekir."
  }
];

const preInfoSections = [
  {
    title: "1. Ön Bilgilendirme Formu Nedir?",
    body: "6502 sayılı Kanun ve Mesafeli Sözleşmeler Yönetmeliği uyarınca, dijital ortamda satın alma yapmadan önce ALICI'nın aşağıdaki hususlarda açıkça bilgilendirilmesi zorunludur. Bu metin, satın alma akışı içinde ALICI'ya elektronik ortamda sunulan resmi ön bilgilendirme metnidir."
  },
  {
    title: "2. Sağlayıcı Bilgileri",
    body: `Unvan, adres, MERSİS, vergi dairesi/no, telefon, e-posta ve KEP adresi: ${PLACEHOLDER_SELLER}. Tam metin için Ön Bilgilendirme Formu PDF/markdown sürümüne bakınız.`
  },
  {
    title: "3. Hizmetin Temel Nitelikleri",
    items: [
      "Çoklu lokasyon ve uzman için randevu yönetimi.",
      "Danışan/müşteri kayıt sistemi (fotoğraf, not, uyarı).",
      "WhatsApp Cloud API üzerinden otomatik hatırlatma.",
      "Mesaj şablonu yönetimi ve interaktif buton ile onay/iptal akışı.",
      "Google Takvim entegrasyonu (opsiyonel).",
      "Ödeme/tahsilat takibi (opsiyonel).",
      "Bu hizmet fiziki ürün niteliği taşımaz; kargo, teslimat süreci yoktur."
    ]
  },
  {
    title: "4. Bedel ve Ödeme",
    items: [
      "Tüm bedeller KDV dahildir (KDV %20).",
      "Faturalandırma aylık veya yıllık (seçtiğiniz plana göre).",
      "Ödeme şekli: Kredi/Banka Kartı, iyzico altyapısı üzerinden.",
      "Otomatik yenileme aktiftir (iptal etmediğiniz sürece).",
      "Güncel plan ve fiyatlar /#pricing sayfasında yer alır."
    ]
  },
  {
    title: "5. Meta WhatsApp Mesaj Ücretleri — Ek Maliyet Uyarısı",
    items: [
      "devu abonelik bedeli YALNIZCA yazılım hizmetinin karşılığıdır.",
      "WhatsApp mesajları için Meta tarafından AYRICA ücret tahsil edilir (Conversation-Based Pricing).",
      "Ücretler konuşma kategorisine, alıcı ülkesine ve Meta tarifesine göre değişir.",
      "Meta ücretleri doğrudan ALICI'nın WhatsApp Business hesabına bağlı kart üzerinden Meta tarafından tahsil edilir.",
      "Güncel tarife: developers.facebook.com/docs/whatsapp/pricing"
    ]
  },
  {
    title: "6. Hizmetin İfası",
    body: "Hizmet, ödemenin başarıyla tamamlanmasıyla birlikte anında dijital olarak ifa edilir. Hiçbir kargo veya fiziki teslimat süreci bulunmamaktadır."
  },
  {
    title: "7. Cayma Hakkının Bulunmaması",
    body: "Yönetmelik m.15/1-(ğ) uyarınca elektronik ortamda anında ifa edilen hizmetler için 14 günlük cayma hakkı kullanılamaz. ALICI, ödeme onayı vermek suretiyle bu hakkı yitireceğini ve içinde bulunulan dönem ücretinin iade edilemeyeceğini kabul eder. Aboneliği iptal hakkı saklıdır."
  },
  {
    title: "8. Şikayet ve Başvuru Yolları",
    items: [
      "Sağlayıcı ile doğrudan iletişim için e-posta ve KEP adresleri.",
      "Tüketici uyuşmazlıkları için Tüketici Hakem Heyetleri / Tüketici Mahkemesi.",
      "Tüketici Bakanlığı online şikayet portalı: tuketicisikayeti.ticaret.gov.tr"
    ]
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
    <div
      className={`product-scene chat-scene ${compact ? "product-scene-compact" : ""}`}
      role="img"
      aria-label="DevuApp WhatsApp hatırlatma örneği"
    >
      <div className="chat-header">
        <button type="button" className="chat-icon-btn chat-back" aria-label="Geri">
          <ArrowLeft size={18} />
        </button>
        <div className="chat-avatar" aria-hidden="true">MG</div>
        <div className="chat-contact">
          <strong>Merve Göktürk</strong>
          <span>
            <i className="chat-presence" aria-hidden="true" />
            çevrimiçi
          </span>
        </div>
        <div className="chat-header-actions">
          <button type="button" className="chat-icon-btn" aria-label="Görüntülü ara">
            <Video size={18} />
          </button>
          <button type="button" className="chat-icon-btn" aria-label="Sesli ara">
            <Phone size={18} />
          </button>
          <button type="button" className="chat-icon-btn" aria-label="Daha fazla">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      <div className="chat-body">
        {chatThread.map((entry, index) => {
          if (entry.type === "date") {
            return (
              <div key={`date-${index}`} className="chat-date">
                <span>{entry.text}</span>
              </div>
            );
          }
          return (
            <div
              key={index}
              className={`chat-bubble chat-bubble-${entry.type}${entry.quickReply ? " chat-bubble-quick-reply" : ""}`}
            >
              {entry.automated && (
                <span className="chat-bubble-badge">
                  <Sparkles size={11} />
                  Beauty Studio · {entry.appointmentStatus}
                </span>
              )}
              <div className="chat-bubble-body">{entry.body}</div>
              <span className="chat-bubble-meta">
                <time>{entry.time}</time>
                {entry.type === "sent" && (
                  <CheckCheck
                    size={14}
                    className={`chat-receipt${entry.status === "read" ? " is-read" : ""}`}
                  />
                )}
              </span>
            </div>
          );
        })}

        <div className="chat-typing" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="chat-input">
        <button type="button" className="chat-icon-btn" aria-label="Emoji">
          <Smile size={18} />
        </button>
        <div className="chat-input-field">Mesaj yaz</div>
        <button type="button" className="chat-icon-btn" aria-label="Dosya ekle">
          <Paperclip size={18} />
        </button>
        <button type="button" className="chat-icon-btn" aria-label="Kamera">
          <Camera size={18} />
        </button>
        <button type="button" className="chat-mic-btn" aria-label="Sesli mesaj">
          <Mic size={16} />
        </button>
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
          <strong>Merve Koç</strong>
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
        <p>Merhaba Merve Hanım, randevunuz bugün 09:30.</p>
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

// ── Footnote sistem ────────────────────────────────────────────────────────
//
// Sayfa içinde dağıtılmış 5 superscript marker, ana sayfanın altındaki
// "Yasal Notlar" bölümündeki numaralı maddelere bağlanır.

function FootnoteRef({ n }) {
  return (
    <sup className="footnote-ref" id={`fnref-${n}`}>
      <a href={`#footnote-${n}`} aria-label={`Yasal not ${n}`}>
        {n}
      </a>
    </sup>
  );
}

const legalNotes = [
  "devu abonelik bedeli YALNIZCA yazılım hizmetinin karşılığıdır.",
  "WhatsApp mesajları için Meta tarafından AYRICA ücret tahsil edilir (Conversation-Based Pricing).",
  "Ücretler konuşma kategorisine, alıcı ülkesine ve Meta tarifesine göre değişir.",
  "Meta ücretleri doğrudan ALICI'nın WhatsApp Business hesabına bağlı kart üzerinden Meta tarafından tahsil edilir.",
  null, // index 4 — link maddesi aşağıda elle render edilir
];

function LegalNotes() {
  return (
    <section className="legal-notes" aria-label="WhatsApp ücretlendirme notları">
      <div className="legal-notes-inner">
        <ol>
          {legalNotes.map((text, index) => {
            const n = index + 1;
            return (
              <li id={`footnote-${n}`} key={n} value={n}>
                {n === 5 ? (
                  <>
                    Güncel tarife:{" "}
                    <a
                      href="https://developers.facebook.com/docs/whatsapp/pricing"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      developers.facebook.com/docs/whatsapp/pricing
                    </a>
                  </>
                ) : (
                  text
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
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
        <p className="eyebrow">WhatsApp hatırlatmaları<FootnoteRef n={1} /> + kolay randevu yönetimi</p>
        <h1>Basit, sade <br />ve&nbsp;etkili!</h1>
        <p className="hero-copy">
          devu, randevu ile çalışan işletmelerin günlük akışına WhatsApp hatırlatmalarını entegre eder.
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
        <p className="hero-note">Kredi kartı gerekmeden başlayın. Web ve mobil birlikte.<br />Farklı hizmet kategorileri için uygundur.</p>
        <p className="hero-note"></p>
        <div className="hero-showcase">
          <span className="hero-showcase-tag">
            <Sparkles size={12} />
            Otomatik WhatsApp hatırlatması
          </span>
          <ProductScene />
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="section problem-section">
      <div className="problem-heading">
        <p className="eyebrow">Günlük karmaşa</p>
        <h2><span style={{whiteSpace: "nowrap"}}>Ran<span className="highlight-devu">devu</span></span> yönetiminde kritik: ortak&nbsp;iletişim</h2>
        <p>
          Devu sayesinde hem uzman, hem danışan hem de asistan aynı randevu bilgilerine sahip olur. Yanlış anlaşılmalar, unutulan aramalar ve dağınık defterler ortadan&nbsp;kalkar.
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
        <h2>Neden <span className="highlight-devu">devu</span>?</h2>
        <p>Randevu ile çalışan küçük ve orta ölçekli hizmet ekipleri için çok ideal. <br />WhatsApp hatırlatmalarıyla modern ve profesyonel gözükürsün!</p>
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
      body: (<>WhatsApp Business hesabınla Meta'dan bilgileri al ve devu'ya gir.<FootnoteRef n={4} /></>)
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
        <h2>Demo videoları ile <span style={{whiteSpace: "nowrap"}}><span className="highlight-devu">devu</span>'ya</span> daha yakından bak.</h2>
        <p>
          Aşağıda devu'nun farklı özelliklerini gösteren ve farklı senaryolar içeren kısa videolar bulabilirsin.
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
        <p className="eyebrow">Fiyatlar<FootnoteRef n={2} /></p>
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
                <h3>{plan.name}<FootnoteRef n={1} /><sup style={{ color: "#dc4c3e", marginLeft: 1 }}>,</sup> <FootnoteRef n={2} /></h3>
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

function SiteFooter({ showLegalNotes = false }) {
  return (
    <footer className="site-footer">
      {showLegalNotes && <LegalNotes />}
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
          <a href="/terms">Kullanım Koşulları</a>
          <a href="/privacy">Gizlilik Politikası</a>
          <a href="/kvkk">KVKK Aydınlatma Metni</a>
          <a href="/cerez-politikasi">Çerez Politikası</a>
          <button
            type="button"
            className="footer-link-btn"
            onClick={() => window.dispatchEvent(new Event("devu:open-cookie-preferences"))}
          >
            Çerez Tercihleri
          </button>
          <a href="/mesafeli-satis-sozlesmesi">Mesafeli Satış Sözleşmesi</a>
          <a href="/on-bilgilendirme-formu">Ön Bilgilendirme Formu</a>
          <a href="/iade-politikasi">İade ve Cayma Politikası</a>
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
      <SiteFooter showLegalNotes />
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
        subtitle="Son güncelleme: Haziran 2026"
        sections={privacySections}
        icon={ShieldCheck}
      />
    );
  }

  if (path === "/kvkk") {
    return (
      <LegalPage
        title="KVKK Aydınlatma Metni"
        subtitle="Veri sorumlusu kimliği, işleme amaçları, yurt içi/yurt dışı aktarımlar ve KVKK m.11 kapsamındaki haklarınızın özeti. Haklarınızı kullanmak için Madde 9'daki başvuru kanallarından bize ulaşabilirsiniz."
        sections={privacySections}
        icon={ShieldCheck}
      />
    );
  }

  if (path === "/cerez-politikasi") {
    return (
      <LegalPage
        title="Çerez Politikası"
        subtitle="Platform'da kullanılan çerezler ve yönetim seçenekleri."
        sections={cookieSections}
        icon={ShieldCheck}
      />
    );
  }

  if (path === "/mesafeli-satis-sozlesmesi") {
    return (
      <LegalPage
        title="Mesafeli Satış Sözleşmesi (Özet)"
        subtitle="Bu sayfa bilgilendirme amaçlıdır. Hukuki olarak bağlayıcı tam sözleşme metni; satın alma akışında kişisel bilgileriniz ve seçtiğiniz plan ile birlikte düzenlenir, ödeme adımından önce elektronik onayınıza sunulur."
        sections={preInfoSections}
        icon={FileText}
      />
    );
  }

  if (path === "/on-bilgilendirme-formu") {
    return (
      <LegalPage
        title="Ön Bilgilendirme Formu"
        subtitle="6502 sayılı Kanun ve Mesafeli Sözleşmeler Yönetmeliği uyarınca, ALICI'ya satın alma öncesi sunulan resmi bilgilendirme."
        sections={preInfoSections}
        icon={FileText}
      />
    );
  }

  if (path === "/iade-politikasi") {
    return (
      <LegalPage
        title="İade ve Cayma Politikası"
        subtitle="Cayma hakkı istisnaları, abonelik iptal süreci ve istisnai iade halleri."
        sections={cancellationSections}
        icon={FileText}
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
    <CookieBanner />
  </React.StrictMode>
);
