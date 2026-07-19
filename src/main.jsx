import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Check,
  ChevronDown,
  FileText,
  MessageCircle,
  ShieldCheck
} from "lucide-react";
import "./i18n.js";
import "./styles.css";
import {
  SiteNav,
  HeroSection,
  MinimalSection,
  WhatsAppSection,
  FeaturesSection,
  DemosSection
} from "./marketing-sections.jsx";
import { Pricing, FAQ, FinalCTA, SiteFooter } from "./kept-sections.jsx";
import CookieBanner from "./cookie-banner.jsx";

const SIGNUP_URL = "https://app.devuapp.com/#/register";
const LOGIN_URL = "https://app.devuapp.com/#/login";
const formatPrice = (value) => `₺${new Intl.NumberFormat("tr-TR").format(value)}`;

const navLinks = [
  { href: "/#product", label: "Özellikler" },
  { href: "/#pricing", label: "Fiyatlar" },
  { href: "/whatsapp-setup", label: "WhatsApp Rehberi" }
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
    title: "12. Google API Services User Data Policy — Limited Use",
    items: [
      "devu, Google API'lerinden alınan kullanıcı verilerini (Google Takvim olayları) yalnızca kullanıcının açıkça talep ettiği Hizmet'in (devu üzerinde oluşturulan/güncellenen randevuların kullanıcının Google Takvim'inde eş zamanlı görünmesi) ifası için kullanır.",
      "Google Takvim verileri ASLA reklam veya pazarlama amacıyla kullanılmaz.",
      "Google Takvim verileri ASLA üçüncü taraflara satılmaz veya devredilmez.",
      "Google Takvim verileri ASLA yapay zekâ veya makine öğrenmesi modellerinin eğitiminde kullanılmaz.",
      "Google Takvim verilerine ASLA insan tarafından erişilmez; istisnalar: (1) kullanıcının açık rızası, (2) güvenlik amaçlı (örn. ihlal soruşturması), (3) yasal yükümlülük, (4) anonim veya toplulaştırılmış iç işletme operasyonları.",
      "Tüm bu kapsam, Google API Services User Data Policy'nin 'Limited Use' şartlarına bağlıdır: https://developers.google.com/terms/api-services-user-data-policy"
    ]
  },
  {
    title: "13. Çerezler ve Tam Metinler",
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
    title: "Kısa özet",
    body: "Devu bir Meta Tech Provider olarak Meta'nın Embedded Signup akışını kullanır. Kurulum, Devu web panelinden açılan güvenli Facebook/WhatsApp penceresinde tamamlanır."
  },
  {
    title: "Başlamadan önce",
    items: [
      "Devu web hesabınıza işletme sahibi veya ayarları yönetebilen kullanıcı olarak giriş yapın.",
      "İşletmenin Meta Business portföyünü yönetebilen bir Facebook hesabınız olsun.",
      "WhatsApp Business Platform için tercihen yeni alınmış veya boşa çıkarılmış ayrı bir telefon numarası kullanın.",
      "Bu numara mevcut WhatsApp veya WhatsApp Business uygulamasında aktif olmamalıdır. Aktif bir numarayı taşımak istiyorsanız önce Meta'nın numara taşıma/kaldırma koşullarını kontrol edin.",
      "Bu numaranın SMS veya arama ile doğrulanabilir olduğundan emin olun.",
      "Meta'nın işletme adı, görünen ad ve mesajlaşma politikalarına uygun bilgiler kullanın."
    ]
  },
  {
    title: "1. Devu'da WhatsApp bağlantısını başlatın",
    items: [
      "Devu web panelinde WhatsApp > Konfigürasyon sayfasına gidin.",
      "Facebook ile WhatsApp bağla butonuna tıklayın.",
      "Açılan Meta penceresinde Facebook hesabınızla devam edin."
    ]
  },
  {
    title: "2. Meta penceresinde işletmeyi ve WhatsApp hesabını seçin",
    items: [
      "Meta size bağlı işletme portföylerini gösterir; doğru işletmeyi seçin.",
      "Var olan bir WhatsApp Business Account seçebilir veya Meta akışında yeni bir hesap oluşturabilirsiniz.",
      "Devu'nun WhatsApp mesajlarını gönderebilmesi ve şablonları yönetebilmesi için istenen izinleri onaylayın.",
      "Meta yalnızca gerekli WhatsApp varlıklarını paylaşır; katalog, reklam hesabı veya sayfa gibi gereksiz varlıklar Devu kurulumu için istenmez."
    ]
  },
  {
    title: "3. Telefon numarasını ekleyin veya seçin",
    items: [
      "Hatırlatmaların gönderileceği işletme numarasını seçin veya ekleyin. En iyi deneyim için bu numarayı yalnızca otomatik hatırlatmalar ve işletme iletişimi için ayırın.",
      "SMS veya arama ile doğrulama kodunu alın.",
      "Numaranın görünen adını ve profil bilgilerini Meta'nın istediği şekilde tamamlayın.",
      "Kurulum bittiğinde Meta, Devu'ya sizle ilgili gerekli verileri gönderir; bunları elle girmeniz gerekmez."
    ]
  },
  {
    title: "4. Devu'daki kontrol listesini tamamlayın",
    items: [
      "Bağlantı tamamlandıktan sonra Devu, Konfigürasyon sayfasında WABA ve Telefon Numarası ID değerlerini gösterir.",
      "Onboarding kontrol listesinde mesaj gönderim uygunluğu, telefon numarası, ödeme yöntemi ve onaylı şablon durumunu kontrol edin.",
      "Ödeme yöntemi eksikse WhatsApp Manager üzerinden Meta ödeme yöntemini ekleyin.",
      "En az bir hatırlatma şablonu onaylandıktan sonra otomatik hatırlatmalar gönderime hazır hale gelir."
    ]
  },
  {
    title: "5. Test edin ve doğrulayın",
    items: [
      "Konfigürasyon sayfasında WhatsApp otomasyonunu aktif bırakın.",
      "Test telefon numarasını uluslararası formatta girin. Örnek: +905XXXXXXXXX.",
      "Test mesajı göndererek numara, ödeme yöntemi ve gönderim izinlerinin birlikte çalıştığını doğrulayın.",
      "Bir yanlışlık olduğunu düşünüyorsanız WhatsApp > Mesaj Geçmişi sayfasında gönderim hatalarını ve Meta tarafından dönen hata kodlarını kontrol edin.",
      "Herhangi bir problem devam ederse devu destek ekibiyle iletişime geçin: destek@devuapp.com"
    ]
  },
  {
    title: "Sık karşılaşılan durumlar",
    items: [
      "Meta işletme doğrulaması, telefon adı incelemesi veya kalite durumu nedeniyle gönderimi geçici olarak sınırlayabilir.",
      "WhatsApp konuşma ücretleri Meta tarafından ayrıca tahsil edilir; devu aboneliğine dahil değildir.",
      "Şablonlar Meta onayından geçmeden randevu dışı otomatik hatırlatma olarak kullanılamaz.",
      "Bağlantıyı yenilemeniz gerekirse aynı sayfadaki Bağlantıyı yenile butonunu kullanabilirsiniz."
    ]
  },
  {
    title: "Önemli not",
    body: "Meta politikaları, şablon onayları, hesap uygunluğu ve WhatsApp konuşma ücretleri zaman içinde değişebilir. Devu bağlantı ve günlük hatırlatma akışını sadeleştirir; Meta Business hesabınızın uygunluğu, ödeme yöntemi ve mesajlaşma politikalarına uyum işletmenizin sorumluluğundadır."
  }
];

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

function MarketingPage() {
  return (
    <>
      <SiteNav />
      <HeroSection />
      <MinimalSection />
      <WhatsAppSection />
      <FeaturesSection />
      <DemosSection />
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
        subtitle="Meta Embedded Signup ile WhatsApp hatırlatma sistemini Devu'ya bağlama adımları. Tahmini süre: 5-15 dakika."
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
